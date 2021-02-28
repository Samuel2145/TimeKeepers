import {spawn} from 'child_process';
//import {PythonShell} from "python-shell";
import pkg from "python-shell"
import mysql from 'mysql'

const {PythonShell} = pkg;

const DB_URL = process.env.JAWSDB_MARIA_URL || 'mysql://n9qa33fb24h5ojln:w5ie9n0wkv2mlpvs@ao9moanwus0rjiex.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/zry2wsgus6t4stzn';


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


const conn = new Database(DB_URL);

//1. query all employees and convert to json objects
//2. query each employee's availabilities and convert to json objects
//3. query parameter and convert to json object
//4. send employee data
//5. send parameter data


export const createRoster = async (req, res) => {     
     
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
            //Object.keys(users).forEach(function(item){
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
                //Object.keys(availabilities).forEach(async function(day){   
                for (var day of Object.keys(availabilities)){

                    const availQ = "SELECT startHour, endHour FROM availability WHERE username=? AND day=?";                                      
                    const avails = await conn.query(availQ, [username,day]);
                        if(avails.length === 0) {
                        //    res.status(404).send('User \'' + username + "\' has no availabilities");
                        } else {                            
                        //push each availability to the corresponding day array
                        //avails.forEach(function(item) {          
                        for (item of avails){
                            availabilities[day].push([item.startHour, item.endHour])     
                            //console.log(availabilities[day])             
                        //});
                        }
                        }
                    }  
                //});
                
            //push a new employee to the roster
                roster.employees.push({
                    "username" : username,
                    "avails" : availabilities
                });

            }              
            //});
            
        }
        console.log(roster);
    }
    catch(error){
        console.log(error)
    }    
   
   for(var e in roster.employees){
   console.log(roster.employees[e].avails)
   }
};


// export const createRoster = (req, res) => {
    
//     var roster = {
//         "employees": []
//     };

//     const weekdays = ['SUNDAY', 'MONDAY', 'TUESDAY','WEDNESDAY','THURSDAY', 'FRIDAY','SATURADAY'];
//     const userQ = "SELECT username FROM user";
//     //get all users
//     var userQuery = conn.query(userQ);

//     userQuery
//     .on('error', function(err) {
//     // Handle error, an 'end' event will be emitted after this as well
//     })
//     .on('fields', function(fields) {
//     // the field packets for the rows to follow
//     })
//     .on('result', function(row) {
//     // Pausing the connnection is useful if your processing involves I/O    

//     processRow(row, function() {
//         let userName = row.username;
//         var availabilities = {
//             "SUNDAY": [],
//             "MONDAY": [],
//             "TUESDAY": [],
//             "WEDNESDAY": [],
//             "THURSDAY": [],
//             "FRIDAY": [],
//             "SATURDAY": [],
//         };
        
//         availabilities.map(function(day){                          
//             let availQ = "SELECT startHour, endHour FROM availability WHERE username=? AND day=?";                                      
//             var availQuery = conn.query(availQ, [username,day])

//             availQuery
//             .on('result', function(row) {
//                 // Pausing the connnection is useful if your processing involves I/O    
            
//                 processRow(row, function() {
//                     avails.map(function(item) {                            
//                         availabilities[day].push([row.startHour, row.endHour])                        
//                     })
                    
//                 });   
//             })
//             .on('end', function() {
//                 roster.employees.push({
//                     "username" : username,
//                     "avails" : availabilities
//             });       
//             });
//         });
//     });
//     })
//     .on('end', function() {
//     // all rows have been received
//     });

// }

export const AlgoTest = (req,res) => {
    
    const algo = new PythonShell('Algorithm/main.py', {mode: 'json'})

    algo.on('message', function (message) {
        // received a message sent from the Python script (a simple "print" statement)
        console.log(message);
    });

    algo.end(function (err,code,signal) {
        if (err) throw err;
        console.log('The exit code was: ' + code);
        console.log('The exit signal was: ' + signal);
        console.log('finished');
    });
}