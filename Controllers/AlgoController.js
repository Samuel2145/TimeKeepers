import {spawn} from 'child_process';
//import {PythonShell} from "python-shell";
import pkg from "python-shell"
import mysql from 'mysql'
import jwt from "jsonwebtoken";

const {PythonShell} = pkg;

const DB_URL = process.env.JAWSDB_MARIA_URL || 'mysql://n9qa33fb24h5ojln:w5ie9n0wkv2mlpvs@ao9moanwus0rjiex.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/zry2wsgus6t4stzn';

const conn = mysql.createConnection(DB_URL);

/*
class Database {
    constructor( config ) {
        this.connection = mysql.createConnection( config );
    }
    query( sql, args ) {
        return new Promise( ( resolve, reject ) => {
            this.connection.query( sql, args, ( err, rows ) => {
                if ( err )
                    return reject( err );
                resolve( rows );
            } );
        } );
    }
    close() {
        return new Promise( ( resolve, reject ) => {
            this.connection.end( err => {
                if ( err )
                    return reject( err );
                resolve();
            } );
        } );
    }
}

 */


//const conn = new Database(DB_URL);

//1. query all employees and convert to json objects
//2. query each employee's availabilities and convert to json objects
//3. query parameter and convert to json object
//4. send employee data
//5. send parameter data

/*
 async function CreateRoster(req, res){     
     
    try{
        var roster = {
                    "employees": []
                };           
        const userQ = "SELECT username FROM user";
        //get all users
        
        const users = await conn.query(userQ);
        if(users.length === 0){
            //res.status(404).send('no users exist');
        }else{
            
            //iterate through each user
            for (var item in Object.keys(users)){
                let username = users[item].username;
                let availabilities = {
                    "SUNDAY": [],
                    "MONDAY": [],
                    "TUESDAY": [],
                    "WEDNESDAY": [],
                    "THURSDAY": [],
                    "FRIDAY": [],
                    "SATURDAY": [],
                };
            
                
                //iterate through each day           
                for (var day of Object.keys(availabilities)){

                    const availQ = "SELECT startHour, endHour FROM availability WHERE username=? AND day=?";                                      
                    const avails = await conn.query(availQ, [username,day]);
                        if(avails.length === 0) {
                        //    res.status(404).send('User \'' + username + "\' has no availabilities");
                        } else {                            
         
                        for (item of avails){
                            let startHour = item.startHour
                            let endHour = item.endHour
                            let start = parseInt(startHour.substring(0,2))*2 + parseInt(startHour.substring(3,5))/30
                            let end = parseInt(endHour.substring(0,2))*2 + parseInt(endHour.substring(3,5))/30
                            availabilities[day].push([start, end])     

                        }
                        }
                    }    
                
            //push a new employee to the roster
                roster.employees.push({
                    "username" : username,
                    "avails" : availabilities
                });

            }              
        }
        return roster
    }
    catch(error){
        console.log(error)
    }    
};
 */

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
    //const userData = jwt.verify(req.cookies.UserInfo, 'shhhhh');

        //Once again, for ease of testing, normally we would use userData.Group but you can set a test value here
        const Group ='group1'
        
        const algo = new PythonShell('Algorithm/main.py')

        const userQ = "SELECT * FROM availability WHERE username IN (SELECT username FROM user WHERE groupName=? AND isEmployer=0)"
        const paramQ = "SELECT * FROM parameter WHERE groupName=?"


        conn.query(paramQ, [Group], (err,resp) => {

            const shiftSize = resp[0].shiftSize;
            const scheduleStart = resp[0].scheduleStart;
            const scheduleEnd = resp[0].scheduleEnd;
            const paramID = ""+ resp[0].parameterID;

            conn.query(userQ, [Group],(err, result) => {

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
                    "paramID" : paramID
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

                    const insertQ = "INSERT INTO shift (username, parameterID, start, end) VALUES " + values;

                    console.log(insertQ);

                    conn.query(insertQ, (err, result) => {

                        if(err){
                            console.log("Failed batch insertion")
                        }else{
                            console.log("No problem")
                        }

                    })

                });          

                algo.end(function (err,code,signal) {
                    if (err) 
                    {
                        console.log('Error:', err)
                        res.status(406).send('Not Acceptable')
                    }                    
                    else{
                        res.status(200).send('Something')
                    }
                    //console.log('The exit code was: ' + code);
                    //console.log('The exit signal was: ' + signal);
                    //console.log('finished');
                });
            })
        })
    }

