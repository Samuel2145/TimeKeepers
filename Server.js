import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import userRouter from './Routes/UserRoutes.js';
import path from "path";
import mysql from 'mysql'

const PORT = process.env.PORT || 5000;
//const DB_URL = process.env.JAWSDB_MARIA_URL || 'mysql://n9qa33fb24h5ojln:w5ie9n0wkv2mlpvs@ao9moanwus0rjiex.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/zry2wsgus6t4stzn';
const app = express();

dotenv.config();

//app.use(morgan('dev'));

app.use(bodyParser.urlencoded({
    extended: true
}));

const dir = path.resolve(path.dirname(''));

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('Client/build'));

    app.get('*', (req,res) =>{
        res.sendFile(path.resolve(dir,'Client', 'build','index.html'));
    })
}

app.use(bodyParser.json());

app.use('/user', userRouter)

app.listen(PORT, () => {
    console.log("Listening on port: " + PORT)
})

//export default DB_URL;
