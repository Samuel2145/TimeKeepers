import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import userRouter from './Routes/UserRoutes.js';
import AlgoRouter from "./Routes/AlgoRoute.js";
import path from "path";

const PORT = process.env.PORT || 5000;
const app = express();

dotenv.config();

//app.use(morgan('dev'));

app.use(bodyParser.urlencoded({
    extended: true
}));

const dir = path.resolve(path.dirname(''));

app.use('/user', userRouter);
app.use('/algo', AlgoRouter)

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('Client/build'));

    app.get('*', (req,res) =>{
        res.sendFile(path.resolve(dir,'Client', 'build','index.html'));
    })
}

app.use(bodyParser.json());

app.listen(PORT, () => {
    console.log("Listening on port: " + PORT)
})

//export default DB_URL;
