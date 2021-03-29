import bcrypt from 'bcrypt'
import mysql from 'mysql'
import jwt from 'jsonwebtoken'
import * as joi from '../Validation.js'

const DB_URL = process.env.JAWSDB_MARIA_URL || 'mysql://n9qa33fb24h5ojln:w5ie9n0wkv2mlpvs@ao9moanwus0rjiex.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/zry2wsgus6t4stzn';
const conn = mysql.createConnection(DB_URL);

export const createGrouping = (req, res) => {

    const groupName = req.body.grouping.groupName;
    const description = req.body.grouping.description;


    const insertQ = `INSERT INTO grouping VALUES('${groupName}','${description}')`;

    conn.query(insertQ, (err, result) => {

        if(err){
            res.status(400).send(`Insertion failed: ${err}`);
        }else{
            res.status(201).send('Stored');
        }

    });

}



export const createAvailability = (req, res) => {

    const username = req.body.availability.username;
    const day = req.body.availability.day;
    const startHour = req.body.availability.startHour;
    const endHour = req.body.availability.endHour;

    const insertQ = `INSERT INTO availability(username,day,startHour,endHour) VALUES('${username}','${day}','${startHour}','${endHour}')`;

    conn.query(insertQ, (err, result) => {

        if(err){
            res.status(400).send(`Insertion failed: ${err}`);
        }else{
            res.status(201).send('Stored');
        }

    });

}

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

    const insertQ = `INSERT INTO shift(username, parameterID, start, end, type, isHoliday, score) VALUES('${username}',${parameterID},'${start}','${end}','${type}',${isHoliday},${score})`;

    conn.query(insertQ, (err, result) => {

        if(err){
            res.status(400).send(`Insertion failed: ${err}`);
        }else{
            res.status(201).send('Stored');
        }

    });

}

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
            const groupName = req.body.user.groupName || "group1";
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

export const userLogin = (req, res) => {

    const username = req.body.user.username;
    const password = req.body.user.password;

    const isValid = joi.userLogin.validate({Username: username, Password: password});

    if(isValid.error){
        res.status(400).send('Some field is incorrect')
        return;
    }

    //const insertQ = "SELECT password, isEmployer, groupName FROM user WHERE username=\'" + username +"\'" ;
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

export const getUserInfo = (req,res) => {

    const userData = jwt.verify(req.cookies.UserInfo, 'shhhhh');

    //console.log(userData)

    const toSend = {
        username : userData.username
    }

    res.status(200).send(JSON.stringify(toSend));
}

const intToTime = (value) => {

    let min = value % 100;
    let hour = value / 100;

    let identifier = "am"

    if(min !== 0){
        const multiplier = min % 25;
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

export const getGroupParameterData = (req,res) => {

    const userData = jwt.verify(req.cookies.UserInfo, 'shhhhh');

    //console.log(userData);
    //console.log(userData.Group)

    const groupQuery = `Select * FROM parameter WHERE groupName='${userData.Group}'`;

    //console.log(groupQuery)

    conn.query(groupQuery, (err, result) => {

        //console.log(result);

        const scheduleS = result[0].scheduleStart;
        const scheduleE = result[0].scheduleEnd;
        const shiftSize = result[0].shiftSize * 100;

        const time = [];

        for (let i = scheduleS; i <= scheduleE; i += shiftSize){
            time.push(intToTime(i))
        }


        if(time[time.length - 1] !== intToTime(scheduleE))
            time.push(intToTime(scheduleE));

        const toReturn = []

        for(let i = 0; i < time.length-1; i++){
            const startTime = time[i];
            const endTime = time[i+1];

            toReturn.push( {sTime: startTime, eTime: endTime})
        }


        res.status(200).send(toReturn);
    })

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

    //console.log(userData);

    let searchQ;
    let params = [];

    if(userData.isEmployer === 1){
        //params.push(userData.Group)
        searchQ = "SELECT username, start, end FROM shift WHERE parameterID=3";
    }else{
        params.push(userData.username);
        searchQ = "SELECT username, start, end FROM shift WHERE username=?" ;
    }

    conn.query(searchQ, params,(err,result) => {

        if(err){

            res.status(400).send('Something didnt work');
        }else{

            const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

            let shiftData = [];

            result.forEach((elem) => {

                const startData = new Date(elem.start);
                const endData = new Date(elem.end);

                const temporaryData = {
                    username: elem.username,
                    day: days[startData.getDay()],
                    startTime: startData.toLocaleTimeString('en-US'),
                    endTime: endData.toLocaleTimeString('en-US')
                }

                shiftData.push(temporaryData)
            })

            res.status(200).send(JSON.stringify(shiftData));
        }
    })

}
