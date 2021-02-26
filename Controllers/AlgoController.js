import {spawn} from 'child_process';
import {PythonShell} from "python-shell";

export const AlgoTest = (req,res) => {


    const algo = new PythonShell('test.py')

    /*algo.on('message', function (message) {
        // received a message sent from the Python script (a simple "print" statement)
        console.log(message);
    });

    algo.end(function (err,code,signal) {
        if (err) throw err;
        console.log('The exit code was: ' + code);
        console.log('The exit signal was: ' + signal);
        console.log('finished');
    });*/

    /*let dataToSend;
    const python = spawn('python3', ['test.py']);

    python.stdout.on('data', (data) => {
        console.log('Pipe data from python script ...');
        dataToSend = data.toString();
        console.log(dataToSend);
    });

    python.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
        res.send(dataToSend)
    });*/


}