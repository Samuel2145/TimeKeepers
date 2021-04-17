import pkg from "python-shell";
import mysql from "mysql";
import jwt from 'jsonwebtoken';

const {PythonShell} = pkg;

const DB_URL = process.env.JAWSDB_MARIA_URL || 'mysql://n9qa33fb24h5ojln:w5ie9n0wkv2mlpvs@ao9moanwus0rjiex.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/zry2wsgus6t4stzn';

const conn = mysql.createConnection(DB_URL);


/*
* Basic Idea
* 1) The only time a schedule is generated is when the employer decides that it is time to generate the new schedule based on the given employee input
* 2) Thus since only employers can call this route, two things will be given.
*       isEmployer is 1 for them and they belong to a group (The business where they are employers)
* 3) Our query is simple then, we only want to find the availability of employees belonging to the employers group and use those to generate the schedule
* 4) The query described as userQ finds this for us, substituting the groupName with the one that is passed through the jwt belonging to that employer
* 5) We iterate over the results to build the roster array
* 6) We send this array to the algorithm in the form of a string
* 7) We can now print to console
*
* TO-DO
* 1) We need to get the data in a raw format to the backend which will then do two things,
*       a) send it as a response to the employer for the sake of speed, no need to requery database
*       b) store it in the database so that we can rerender it later when employer needs to see it again
*
*/

export const GenerateSchedule = (req,res) => {

    //JWT verification, commented out just to make testing easier
    const userData = jwt.verify(req.cookies.UserInfo, 'shhhhh');

    //Once again, for ease of testing, normally we would use userData.Group but you can set a test value here
    //const Group ='group1'
    
    const algo = new PythonShell('Algorithm/main.py')

    const userQ = "SELECT * FROM availability WHERE username IN (SELECT username FROM user WHERE groupName=? AND isEmployer=0)"
    const paramQ = "SELECT * FROM parameter WHERE groupName=?"

    ///Idea is to start new schedule in the coming week
    let currDate = new Date();
    const day = currDate.getDay();  ///0-6 will return 5 rn
    currDate.setDate(currDate.getDate() + (8-day));
    const year = currDate.getFullYear();
    const month = currDate.getMonth() + 1;
    const startingMonday = currDate.getDate();

    conn.query(paramQ, [userData.Group], (err,resp) => {

        const shiftSize = resp[0].shiftSize;
        const scheduleStart = resp[0].scheduleStart;
        const scheduleEnd = resp[0].scheduleEnd;
        const paramID = ""+ resp[0].parameterID;
        const numSimult = resp[0].numSimultaneous;
        const maxWeekly = resp[0].maxWeeklyHours * 2;
        const maxDaily = resp[0].maxDailyHours * 2;

        conn.query(userQ, [userData.Group],(err, result) => {


                //Create new map instance to store our {user, avails} object. User is key, avails is value
                let employees = new Map();

                //Iterate over query results, we will get an unordered list with repeating users but with different availabilities for certain days
                //If the user already exists on the map, we add on to their availability.
                // Else we create them and initialize them with a blank availabilities object, then add the availability
                for(let i = 0; i < result.length; i++){

                    const username = result[i].username;

                    //create entry on the map
                    if(!employees.has(username)){

                        let availabilities = {
                            "SUNDAY": [],
                            "MONDAY": [],
                            "TUESDAY": [],
                            "WEDNESDAY": [],
                            "THURSDAY": [],
                            "FRIDAY": [],
                            "SATURDAY": [],
                        };

                        employees.set(username,  availabilities);
                    }

                    //get value from map and add on whatever availability there needs to be put in

                    let valueToUpdate = employees.get(username);

                    const day = result[i].day;

                    const startHour = result[i].startHour;
                    const endHour = result[i].endHour;
                    const start = parseInt(startHour.substring(0,2))*2 + parseInt(startHour.substring(3,5))/30;
                    const end = parseInt(endHour.substring(0,2))*2 + parseInt(endHour.substring(3,5))/30;


                    valueToUpdate[day].push([start,end]);
                    employees.set(username, valueToUpdate);
                }
            //Create the roster object
            let roster = {
                "employees": [],
                "shiftSize": shiftSize,
                "scheduleStart" : scheduleStart,
                "scheduleEnd" : scheduleEnd,
                "numSimult" : numSimult,
                "maxWeekly" : maxWeekly,
                "maxDaily" : maxDaily,
                "paramID" : paramID,
                "year" : year,
                "month" : month,
                "start" : startingMonday
            };

                employees.forEach( (value, key) => {

                    roster.employees.push({
                        "username" : key,
                        "avails" : value
                    });

                });

                //Uncomment this to verify the structure of the roster object
                //console.log(roster);

                //Code that was already here
                const message = JSON.stringify(roster)

                //console.log(message);


                algo.send(message, {mode: 'json'})     
                
                algo.on('message', function (message) {
                    // received a message sent from the Python script (a simple "print" statement)

                    //const shifts = message.split('?');

                    //console.log(shifts[0]);
                    //console.log(shifts[12]);
                    const values = message.substring(0, message.length-2) + ";";

                    const deleteQ = "DELETE FROM shift WHERE parameterID IN (SELECT parameterID from parameter WHERE groupName=?) AND start >= ?"
                    let params = []
                    params.push(userData.Group)
                    params.push(String(year) + "-" + String(month).padStart(2,'0') + "-" + String(startingMonday) + " 00:00:00")
                    console.log(params)
                    
                    conn.query(deleteQ, params,(err,result) => {
                        console.log(err)
                        if(err){
                            //res.status(400).send('Deletion did not work');
                            console.log("Failed Deletion")
                        }else{
                            console.log("Deletion Successful")

                            const insertQ = "INSERT INTO shift (username, parameterID, start, end) VALUES " + values;

                            console.log(insertQ);

                            conn.query(insertQ, (err, result) => {

                            if(err){
                                console.log("Failed batch insertion")
                            }else{
                                console.log("Insertion successful")
                            }

                        })

                        }
                    });
                
                });          

                algo.end(function (err,code,signal) {
                    if (err) 
                    {
                        console.log('Error:', err)
                        res.status(406).send('Not Acceptable')
                    }                    
                    else{
                        res.status(200).send('Success!')
                    }
                    //console.log('The exit code was: ' + code);
                    //console.log('The exit signal was: ' + signal);
                    //console.log('finished');
                });
            })
    })
}
