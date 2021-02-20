import bcrypt from 'bcrypt'
import mysql from 'mysql'
import dotenv from 'dotenv';

const DB_URL = process.env.JAWSDB_MARIA_URL || 'mysql://n9qa33fb24h5ojln:w5ie9n0wkv2mlpvs@ao9moanwus0rjiex.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/zry2wsgus6t4stzn';
const conn = mysql.createConnection(DB_URL);

export const createUser = (req, res) => {

    bcrypt.genSalt(10, function(err,salt) {

        bcrypt.hash(req.body.user.password, salt, function(err, hash) {

            if (err){
                res.status(400).send('Could not hash password')
                throw err;
            }

            const userName = req.body.user.userName;
            const email = req.body.user.email;

            ///Need to talk to Alec about database design and how we want to put data in
            //const insertQ = "INSERT INTO employee (username, password, name, email, phoneNo, address) VALUES (\'"
            //                    + userName + "\', \'" + hash + "\', \'" + email + "\', \'" + phone + "\')";

            const insertQ = "INSERT INTO employee (username, password, email) VALUES (\'"
                                + userName + "\', \'" + hash + "\', \'" + email + "\')";

            conn.query(insertQ, function(err, result) {

                if(err){
                    res.status(400).send('Insertion failed');
                    throw err;
                }else{
                    res.status(200).send('Stored');
                }

            });
        });
    });
}


export const userLogin = (req, res) => {

    const email = req.body.user.email;
    const password = req.body.user.password;

    const insertQ = "SELECT password FROM employee WHERE email=\'" + email +"\'"

    conn.query(insertQ, function(err, result) {

        if(result.length === 0){
            res.status(404).send('User does not exist');
        }else{

            const hashed = result[0].password;

            bcrypt.compare(password,  hashed, (err, same) => {

                if(same){

                    //let token = jwt.sign(toSend, 'shhhhh');

                    //res.cookie('Token', token, {expire: 604800 + Date.now(), httpOnly: true}).status(200);
                    res.status(200).send("Successfully logged in");
                }else{
                    res.status(400).send('Password is incorrect!');
                }
            });
        }
    });
}
