import bcrypt from 'bcrypt'
import mysql from 'mysql'
import jwt from 'jsonwebtoken'
import * as joi from '../Validation.js'

const DB_URL = process.env.JAWSDB_MARIA_URL || 'mysql://n9qa33fb24h5ojln:w5ie9n0wkv2mlpvs@ao9moanwus0rjiex.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/zry2wsgus6t4stzn';
const conn = mysql.createConnection(DB_URL);

///Helper functions

const splitArray = (arr) => {

    const toRet = [];

    for(let i = 0; i < arr.length; i++){
        const start = arr[i];
        let end = start;
        for(let j = i+1; j < arr.length; j++){

            if(arr[j] === end+1){
                end = arr[j]
            }else{
                i = j-1;
                break;
            }
        }

        toRet.push({sOffset: start, eOffset: end+1});

        if(end === arr[arr.length-1]){
            break;
        }

    }

    return toRet;
}


const intToString = (num) => {

    if(num < 10){
        return "0" + num;
    }

    return "" + num;
}

const createQueries = (arr, user, day, start) => {

    if(arr.length === 0){
        return "";
    }

    let queries = "";

    arr.forEach( (elem) => {

        let s = start + elem.sOffset;
        let e = start + elem.eOffset;

        const sH = Math.floor(s/2);
        const sM = (s % 2) * 30;

        const eH = Math.floor(e/2);
        const eM = (e % 2) * 30;

        const sTime = intToString(sH) + ":" + intToString(sM) + ":00";
        const eTime = intToString(eH) + ":" + intToString(eM) + ":00";

        queries += "( '" + user + "', '" + day + "', '" + sTime + "', '" + eTime + "' ), "
    })

    return queries;
}

const intToTime = (value) => {

    let min = value % 100;
    let hour = Math.floor(value / 100);

    let identifier = "am"

    if(min !== 0){
        const multiplier = min / 25;
        min = min - 10*multiplier;
    }else{
        min = "00"
    }

    if(hour > 11){

        identifier = "pm"

        if(hour > 12)
            hour -= 12;

    }

    return "" + hour + ":" + min + identifier;
}

///Controller functions

///Creates a grouping with name and description
export const createGrouping = (req, res) => {

    const groupName = req.body.grouping.groupName;
    const description = req.body.grouping.description;

    const inputs = []
    inputs.push(groupName);
    inputs.push(description);

    const insertQ = "INSERT INTO grouping VALUES( ?, ?)"

    conn.query(insertQ, inputs,(err, result) => {

        if(err){
            res.status(400).send(`Insertion failed: ${err}`);
        }else{
            res.status(201).send('Stored');
        }

    });

}

/*  Takes in user input from employee page and cleans it up for insertion into database as availabilities
*   Deletes old availabilities to force the use of new ones
 */
export const createAvailability = (req, res) => {

    const userData = jwt.verify(req.cookies.UserInfo, 'shhhhh');

    const username = userData.username;
    const group = userData.Group;

    const avails = req.body.avails;

    const Sunday = [];
    const Monday = [];
    const Tuesday = [];
    const Wednesday = [];
    const Thursday = [];
    const Friday = [];
    const Saturday = [];

    avails.forEach( (elem) => {

        const temp = elem.split(",");

        switch(temp[0]){

            case "1":
                Sunday.push(parseInt(temp[1]));
                break;
            case "2":
                Monday.push(parseInt(temp[1]));
                break;
            case "3":
                Tuesday.push(parseInt(temp[1]));
                break;
            case "4":
                Wednesday.push(parseInt(temp[1]));
                break;
            case "5":
                Thursday.push(parseInt(temp[1]));
                break;
            case "6":
                Friday.push(parseInt(temp[1]));
                break;
            case "7":
                Saturday.push(parseInt(temp[1]));
                break;
        }
    });

    Sunday.sort((a,b) => {return a-b})
    Monday.sort((a,b) => {return a-b})
    Tuesday.sort((a,b) => {return a-b})
    Wednesday.sort((a,b) => {return a-b})
    Thursday.sort((a,b) => {return a-b})
    Friday.sort((a,b) => {return a-b})
    Saturday.sort((a,b) => {return a-b})

    const temp = {
        Sunday: splitArray(Sunday),
        Monday: splitArray(Monday),
        Tuesday: splitArray(Tuesday),
        Wednesday: splitArray(Wednesday),
        Thursday: splitArray(Thursday),
        Friday: splitArray(Friday),
        Saturday: splitArray(Saturday)
    }

    //console.log(temp);

    const getGroupParametersQ = "SELECT * FROM parameter WHERE groupName=?"
    const deleteOldQ = "DELETE FROM availability WHERE username=?"

    conn.query(getGroupParametersQ, [group], (err,result) => {

        if(err){
            res.status(400).send('Some error occurred');
        }else{

            //console.log(result);

            const startHour = result[0].scheduleStart;
            const endHour = result[0].scheduleEnd;

            //console.log(startHour);
            //console.log(endHour);

            let bulk = createQueries(temp.Sunday, username, "Sunday", startHour);
            bulk += createQueries(temp.Monday, username, "Monday", startHour);
            bulk += createQueries(temp.Tuesday, username, "Tuesday", startHour);
            bulk += createQueries(temp.Wednesday, username, "Wednesday", startHour);
            bulk += createQueries(temp.Thursday, username, "Thursday", startHour);
            bulk += createQueries(temp.Friday, username, "Friday", startHour);
            bulk += createQueries(temp.Saturday, username, "Saturday", startHour);


            const values = bulk.substring(0, bulk.length-2) + ";";
            
            conn.query(deleteOldQ, [username], (err, result) => {

                if(err){
                    res.status(400).send("Something went wrong!");
                }else{
                    const insertQ = "INSERT INTO availability (username,day,startHour,endHour) VALUES " + values;

                    conn.query(insertQ, (err, result) => {

                        if(err){
                            res.status(400).send(`Insertion failed: ${err}`);
                        }else{
                            res.status(201).send('Stored');
                        }

                    });
                }
            })
        }
    })
}

//Creates parameters from admin input
export const createParameter = (req, res) => {

    const userData = jwt.verify(req.cookies.UserInfo, 'shhhhh');

    const groupName = userData.Group;
    const shiftSize = req.body.parameter.shiftSize;
    const scheduleStart = req.body.parameter.scheduleStart;
    const scheduleEnd = req.body.parameter.scheduleEnd;
    const numSimultaneous = req.body.parameter.numSimultaneous;
    const maxWeeklyHours = req.body.parameter.maxWeeklyHours;
    const maxDailyHours = req.body.parameter.maxDailyHours;

    const insertQ = `INSERT INTO parameter(groupName, shiftSize, scheduleStart, scheduleEnd, numSimultaneous, maxWeeklyHours, maxDailyHours) VALUES( ?, ?, ?, ?, ?, ?, ?)`;

    conn.query(insertQ, [groupName, shiftSize, scheduleStart, scheduleEnd, numSimultaneous, maxWeeklyHours, maxDailyHours],(err, result) => {

        if(err){
            res.status(400).send(`Insertion failed: ${err}`);
        }else{
            res.status(201).send('Stored');
        }
    });
}

export const createShift = (req, res) => {

    const username = req.body.shift.username;
    const parameterID = req.body.shift.parameterID;
    const start = req.body.shift.start; 
    const end = req.body.shift.end;
    const type = req.body.shift.type;
    const isHoliday = req.body.shift.isHoliday;
    const score = req.body.shift.score;

    //const insertQ = `INSERT INTO shift(username, parameterID, start, end, type, isHoliday, score) VALUES('${username}',${parameterID},'${start}','${end}','${type}',${isHoliday},${score})`;
    const insertQ = "INSERT INTO shift (username, parameterID, start, end, type, isHoliday, score) VALUES( ?, ?, ?, ?, ?, ?, ?)"

    conn.query(insertQ, [username, parameterID, start, end, type, isHoliday, score],(err, result) => {

        if(err){
            res.status(400).send(`Insertion failed: ${err}`);
        }else{
            res.status(201).send('Stored');
        }

    });
}

export const getGroupParameterData = (req,res) => {

    const userData = jwt.verify(req.cookies.UserInfo, 'shhhhh');

    //console.log(userData);
    //console.log(userData.Group)

    const groupQuery = "Select * FROM parameter WHERE groupName=?";

    //console.log(groupQuery)

    conn.query(groupQuery, [userData.Group],(err, result) => {

        //console.log(result);

        const scheduleS = result[0].scheduleStart * 50;
        const scheduleE = result[0].scheduleEnd * 50;

        const time = [];

        for (let i = scheduleS; i <= scheduleE; i += 50){
            time.push(intToTime(i))
        }


        if(time[time.length - 1] !== intToTime(scheduleE))
            time.push(intToTime(scheduleE));

        const times = []

        for(let i = 0; i < time.length-1; i++){
            const startTime = time[i];
            const endTime = time[i+1];

            times.push( {sTime: startTime, eTime: endTime})
        }

        //console.log(times)

        const toReturn = [];

        for(let i = 0; i < times.length; i++){

            toReturn.push([]);
        }

        for(let i = 0; i < times.length; i++){

            toReturn[i][0] = times[i];

            for(let j = 1; j <= 7; j++){
                toReturn[i][j] = {row:i, col: j, bg: 'white'};
            }
        }

        res.status(200).send(toReturn);
    })
}

///Validates user input before creating new db entry. Also hashed password data
export const createUser = (req, res) => {

    const toValidate = {
        Username: req.body.user.userName,
        Password: req.body.user.password,
        Email: req.body.user.email,
        isEmployer: req.body.user.isEmployer
    }

    //console.log(toValidate)

    const isValid = joi.userCreation.validate(toValidate);

    //console.log(isValid);

    if(isValid.error){
        res.status(400).send('Some field is incorrect')
        return;
    }

    bcrypt.genSalt(10, function(err,salt) {

        bcrypt.hash(req.body.user.password, salt, function(err, hash) {

            if (err){
                res.status(400).send('Could not hash password');
                return;
            }

            const username = req.body.user.userName;
            const personName = req.body.user.personName || null;
            const groupName = req.body.user.groupName || null;
            const email = req.body.user.email;
            const phoneNumber = req.body.user.phoneNumber || null;
            const address = req.body.user.address || null;
            const isEmployer = req.body.user.isEmployer;
            const avgScore = req.body.user.avgScore || null;


            //We have to change queries to meet the specs of character escaping, the below is an example of how mysql does this efficiently
            //const insertQ = `INSERT INTO user VALUES('${username}','${hash}','${personName}','${groupName}','${email}','${phoneNumber}','${address}',${isEmployer},${avgScore})`;
            const insertQ = 'INSERT INTO user VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?)'

            //console.log(insertQ);

            conn.query(insertQ, [username, hash, personName, groupName, email, phoneNumber, address, isEmployer, avgScore],(err, result) => {

                if(err){
                    res.status(400).send(`Insertion failed: ${err}`);
                }else{
                    res.status(201).send('Stored');
                }

            });
        });
    });
}

///Validates user credentials to perform login
export const userLogin = (req, res) => {

    const username = req.body.user.username;
    const password = req.body.user.password;

    const isValid = joi.userLogin.validate({Username: username, Password: password});

    if(isValid.error){
        res.status(400).send('Some field is incorrect')
        return;
    }

    const insertQ = "SELECT password, isEmployer, groupName FROM user WHERE username=?" ;

    conn.query(insertQ, [username], (err, result) => {

        if(result.length !== 0){

            const hashed = result[0].password;

            bcrypt.compare(password,  hashed, (err, same) => {

                if(same){

                    const type = result[0].isEmployer;
                    const groupName = result[0].groupName;

                    const toSend  = {
                        username: username,
                        isEmployer: type,
                        Group: groupName
                    };

                    let token = jwt.sign(toSend, 'shhhhh');

                    res.cookie('UserInfo', token, {expire: 604800 + Date.now(), httpOnly: true}).status(200);
                    res.send({
                        isEmployer: type,
                        message: 'Successfully logged in'
                    });
                }else{
                    res.status(400).send('Password is incorrect!');
                }
            });

        }else{
            res.status(404).send('User does not exist');

        }
    });
}

///Simple example showing the functionality of jwt
export const getUserInfo = (req,res) => {

    const userData = jwt.verify(req.cookies.UserInfo, 'shhhhh');

    //console.log(userData)

    const toSend = {
        username : userData.username,
        isEmployer: userData.isEmployer
    }

    res.status(200).send(JSON.stringify(toSend));
}

export const getGroups = (req,res) => {

    const searchQ = "SELECT groupName FROM parameter";

    conn.query(searchQ, (err,result) => {

        const toSend =[];

        result.forEach( (elem) => {
            toSend.push(elem.groupName);
        })
        res.status(200).send(toSend);

    })

}

export const setNewGroup = (req, res) => {

    //console.log(req.body);
    const userData = jwt.verify(req.cookies.UserInfo, 'shhhhh');

    const updateQ = "UPDATE user SET groupName=? WHERE username=?";

    conn.query(updateQ, [req.body.group, userData.username], (err, result) => {

        if(err){
            res.status(400).send("Something went wrong")
        }else{
            res.status(200).send("New group set!")
        }

    })

}

export const setNewEmail = (req, res) => {

    const userData = jwt.verify(req.cookies.UserInfo, 'shhhhh');

    const updateQ = "UPDATE user SET email=? WHERE username=?";

    conn.query(updateQ, [req.body.email, userData.username], (err, result) => {

        if(err){
            res.status(400).send("Something went wrong")
        }else{
            res.status(200).send("New group set!")
        }

    })
}

export const setNewPassword = (req, res) => {

    const userData = jwt.verify(req.cookies.UserInfo, 'shhhhh');

    const updateQ = "UPDATE user SET password=? WHERE username=?";

    bcrypt.genSalt(10, function(err,salt) {

        bcrypt.hash(req.body.pass, salt, function(err, hash) {

            conn.query(updateQ, [hash, userData.username], (err,result) => {

                if(err){
                    res.status(400).send("Couldn't update");
                }else{
                    res.status(200).send("Password updated");
                }

            });
        });
    });

}

export const isLoggedIn = (req, res) => {

    if(!req.cookies.UserInfo){
        res.status(200).send({loggedIn: 0});
        return;
    }

    res.status(200).send({loggedIn:1});
}

export const Logout = (req,res) => {

    res.clearCookie('UserInfo', {path: '/'});
    res.send('Successfully logged out');
}

export const getCalendar = (req,res) => {

    if(!req.cookies.UserInfo){
        res.status(400).send('Not logged in!')
        return;
    }

    const userData = jwt.verify(req.cookies.UserInfo, 'shhhhh');

    let searchQ;
    let params = [];
    let curr = new Date(req.body.curr);
    let weekStartDate = new Date(curr.setDate(curr.getDate() - curr.getDay()));
    let weekStart = weekStartDate.getFullYear() + "-" + (parseInt(weekStartDate.getMonth())+1) + "-" + parseInt(weekStartDate.getDate());
    let weekEndDate = new Date(curr.setDate(curr.getDate() - curr.getDay()+6));
    let weekEnd = weekEndDate.getFullYear() + "-" + (parseInt(weekEndDate.getMonth())+1) + "-" +parseInt(weekEndDate.getDate());

    if(userData.isEmployer === 1){
        params.push(userData.Group)
        searchQ = "SELECT username, start, end FROM grouping NATURAL JOIN shift WHERE grouping.groupName = ? AND start BETWEEN ? AND ? ORDER BY username ASC";
    }else{
        params.push(userData.username);
        searchQ = "SELECT username, start, end FROM shift WHERE username=? AND start BETWEEN ? AND ?"
    }

    params.push(weekStart);
    params.push(weekEnd);

    conn.query(searchQ, params,(err,result) => {

        if(err){
            res.status(400).send('Something didnt work');
        }else{


            const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            const colors = ["#f9d5e5", "#eeac99", "#e06377", "#c83349", "#5b9aa0", "#d6d4e0", "#b8a9c9", "#622569"];
            let currIndex = 0;
            let shiftData = [];

            result.forEach((elem) => {

                const startData = new Date(elem.start);
                const endData = new Date(elem.end);

                const dataLength = shiftData.length;
                let pickedColor;

                if(dataLength === 0 || shiftData[dataLength-1].username !== elem.username){
                    pickedColor = colors[currIndex];
                    currIndex++;
                }else{
                    pickedColor = shiftData[dataLength-1].color;
                }

                const temporaryData = {
                    username: elem.username,
                    day: days[startData.getDay()],
                    startTime: startData.toLocaleTimeString('en-US'),
                    endTime: endData.toLocaleTimeString('en-US'),
                    color: pickedColor
                }

                shiftData.push(temporaryData)
            })

            res.status(200).send(JSON.stringify(shiftData));
        }
    })

}
