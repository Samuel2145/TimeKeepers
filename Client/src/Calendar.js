import React, {Component} from "react";
import {useState} from "react";
import Table from 'react-bootstrap/Table';
import axios from 'axios'
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import bigthink from "./img/bigthink.png";
import {LinkContainer} from "react-router-bootstrap";
import Button from "react-bootstrap/Button";

const divStyle = {
    paddingTop: '20px',
};

//const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


class Calendar extends Component {
    //const [data, setData] = useState([]);
    
    constructor(props) {
        super(props);
        this.state = {
            shifts: [],
            curr: new Date()
        };

    }
    
    updateSchedule()
    {
        axios.post("/user/getCalendar", {curr: this.state.curr}, {withCredentials: true}).then((res) => {

            const shiftData = res.data;
    
            let shiftBreakdown = [];
    
            for (let i = 0; i <= 23; i++) {
                let startHour;
                let startHalfhour;
                let endHour;
                let endHalfHour;
                
                startHour = i;
                startHalfhour = ":00";
                endHour = i;
                endHalfHour = ":30";
                shiftBreakdown.push([startHour + startHalfhour + " - " + endHour + endHalfHour])
                
                
                startHour = i;
                startHalfhour = ":30";
                endHour = i+1;
                endHalfHour = ":00";
                
                
                shiftBreakdown.push([startHour + startHalfhour + " - " + endHour + endHalfHour])
            }
    
            for (let i = 0; i <= 47; i++) {
                for (let j = 1; j <= 7; j++) {
                    shiftBreakdown[i][j] = {
                        username: "",
                        color: "#ffffff"
                    }
                }
            }
    
            for (let i = 0; i < shiftData.length; i++) {
    
                let day;
    
                switch (shiftData[i].day) {
                    case "Sunday":
                        day = 0;
                        break;
                    case "Monday":
                        day = 1;
                        break;
                    case "Tuesday":
                        day = 2;
                        break;
                    case "Wednesday":
                        day = 3;
                        break;
                    case "Thursday":
                        day = 4;
                        break;
                    case "Friday":
                        day = 5;
                        break;
                    case "Saturday":
                        day = 6;
                        break;
                }
                let startBlock = parseInt(shiftData[i].startTime.split(":")[0]);
                if (shiftData[i].startTime.slice(-2) === "PM" && startBlock != "12") {
                    startBlock += 12;
                }
                startBlock *= 2;
                if(parseInt(shiftData[i].startTime.split(":")[1] == "30"))
                {
                    startBlock++;
                }


                let endBlock = parseInt(shiftData[i].endTime.split(":")[0]);
                if (shiftData[i].endTime.slice(-2) === "PM"  && endBlock != "12") {
                    endBlock += 12;
                }
                endBlock *= 2;
                if(parseInt(shiftData[i].endTime.split(":")[1] == "30"))
                {
                    endBlock++;
                }

                for (let block = startBlock; block < endBlock; block++) {
                    console.log(shiftBreakdown[block][day+1])
                    if(shiftBreakdown[block][day+1].username != "" && !shiftData[i].username.includes(shiftBreakdown[block][day+1].username))
                    {
                        shiftData[i].username = shiftData[i].username + "\n" + shiftBreakdown[block][day+1].username
                    }
                    shiftBreakdown[block][day + 1] = {
                        username: shiftData[i].username,
                        color: shiftData[i].color
                    }
                }
    
            }
    
            this.setState({shifts: shiftBreakdown});
        })
    }


    componentDidMount() {
        
      this.updateSchedule();
    }

    



    render() {
      let curr = new Date(this.state.curr);
      var weekStartDate = new Date(curr.setDate(curr.getDate() - curr.getDay()));
      var weekStart = weekStartDate.getFullYear() + "-" + (parseInt(weekStartDate.getMonth())+1) + "-" + parseInt(weekStartDate.getDate());
        return (

            

            <Container fluid="md">
                <div style={divStyle}></div>
                <Row className="justify-content-md-end">
                    {/* {this.state.shifts} */}
                </Row>
                <Row className="justify-content-md-center">

                <Button type="button" id ="PreviousWeek" variant = "info"  onClick={()=> {this.setState({curr: new Date(this.state.curr.getFullYear(), this.state.curr.getMonth(), this.state.curr.getDate() - 7)}, () => {this.updateSchedule()}); }}>Previous Week</Button> 
                <h2> Week of {weekStart} </h2>
                <Button type="button" id ="NextWeek" variant = "info"  onClick={()=> {this.setState({curr: new Date(this.state.curr.getFullYear(), this.state.curr.getMonth(), this.state.curr.getDate() + 7)}, () => {this.updateSchedule()}); }}>Next Week</Button> 

                </Row>
                <div style={divStyle}></div>
                 
                <Table bordered responsive="sm">
                    <thead>
                    <tr>
                        <th>Time</th>
                        <th>Sunday</th>
                        <th>Monday</th>
                        <th>Tuesday</th>
                        <th>Wednesday</th>
                        <th>Thursday</th>
                        <th>Friday</th>
                        <th>Saturday</th>
                    </tr>
                    </thead>
                    <tbody>

                    {
                        this.state.shifts.map((i) =>
                            <tr>
                                <td>{i[0]}</td>
                                <td style={{"background-color": i[1].color, "white-space": "pre-wrap", "word-wrap": "break-word"}}>{i[1].username}</td>
                                <td style={{"background-color": i[2].color, "white-space": "pre-wrap", "word-wrap": "break-word"}}>{i[2].username}</td>
                                <td style={{"background-color": i[3].color, "white-space": "pre-wrap", "word-wrap": "break-word"}}>{i[3].username}</td>
                                <td style={{"background-color": i[4].color, "white-space": "pre-wrap", "word-wrap": "break-word"}}>{i[4].username}</td>
                                <td style={{"background-color": i[5].color, "white-space": "pre-wrap", "word-wrap": "break-word"}}>{i[5].username}</td>
                                <td style={{"background-color": i[6].color, "white-space": "pre-wrap", "word-wrap": "break-word"}}>{i[6].username}</td>
                                <td style={{"background-color": i[7].color, "white-space": "pre-wrap", "word-wrap": "break-word"}}>{i[7].username}</td>
                            </tr>
                        )
                    }

                    </tbody>
                </Table>

            </Container>

        );

    }
}


export default Calendar;