import express from 'express';
import bodyParser from 'body-parser'
import morgan from 'morgan'


let PORT = 5000;


const app = express();

//app.use(morgan('dev'));

app.use(bodyParser.urlencoded({
    extended: true
}));


app.listen(PORT, () => {
    console.log("Listening on port: " + PORT)
})