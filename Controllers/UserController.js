import bcrypt from 'bcrypt'
import mysql from 'mysql'
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken'

const DB_URL = process.env.JAWSDB_MARIA_URL || 'mysql://n9qa33fb24h5ojln:w5ie9n0wkv2mlpvs@ao9moanwus0rjiex.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/zry2wsgus6t4stzn';
const conn = mysql.createConnection(DB_URL);

export const createUser = (req, res) => {

    bcrypt.genSalt(10, function(err,salt) {

        bcrypt.hash(req.body.user.password, salt, function(err, hash) {

            if (err){
                res.status(400).send('Could not hash password');
                return;
            }

            const userName = req.body.user.userName;
            const email = req.body.user.email;
            const type = req.body.user.type;

            ///Need to talk to Alec about database design and how we want to put data in
            //const insertQ = "INSERT INTO employee (username, password, name, email, phoneNo, address) VALUES (\'"
            //                    + userName + "\', \'" + hash + "\', \'" + email + "\', \'" + phone + "\')";

            const insertQ = "INSERT INTO users (username, password, email, isEmployer) VALUES (\'"
                                + userName + "\', \'" + hash + "\', \'" + email + "\', \'" + type +"\')";

            conn.query(insertQ, (err, result) => {

                if(err){
                    res.status(400).send('Insertion failed (Username or email already in use)');
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

    const insertQ = "SELECT password, isEmployer FROM user WHERE username=\'" + username +"\'" ;

    conn.query(insertQ, (err, result) => {

        if(err){
            res.status(404).send('User does not exist');
        }else{

            const hashed = result[0].password;

            bcrypt.compare(password,  hashed, (err, same) => {

                if(same){

                    const type = result[0].isEmployer;

                    const toSend  = {
                        username: username,
                        isEmployer: type
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
        }
    });
}

export const getUserInfo = (req,res) => {

    const userData = jwt.verify(req.cookies.UserInfo, 'shhhhh');

    console.log(userData)

    const toSend = {
        username : userData.username
    }

    res.status(200).send(JSON.stringify(toSend));
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

    const username = userData.username;
    
    const searchQ = "SELECT username, start, end FROM shift WHERE username=\'" + username +"\'" ;

    conn.query(searchQ, (err,result) => {

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
