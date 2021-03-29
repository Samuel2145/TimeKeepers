import React, { Component } from "react";
import Table from 'react-bootstrap/Table';
import axios from 'axios'
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import bigthink from "./img/bigthink.png";
import { LinkContainer } from "react-router-bootstrap";
import Button from "react-bootstrap/Button";

const divStyle = {
  paddingTop: '10px',
  marginLeft: '10px',
};

//const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


class Calendar extends Component {
  //const [data, setData] = useState([]);
  constructor(props) {
    super(props);
    this.state = {
      shifts: []
    };
    
  }

  componentDidMount() {

    axios.get("/user/getCalendar", { withCredentials: true }).then((res) => {

      console.log(res.data);

      const shiftData = res.data;

      // const toDisplay = shiftData.map((elem) => {
      //   return (
      //     <Col>
      //       <Card style={{}}>
      //         <Card.Body>
      //           <Card.Title>{elem.day}</Card.Title>
      //           <Card.Text>
      //             {elem.username}
      //             <br />
      //             {elem.startTime} - {elem.endTime}
      //           </Card.Text>
      //         </Card.Body>
      //       </Card>
      //     </Col>
      //   )
      // })
      var shiftBreakdown = [];

      for(let i = 0; i < 24; i++)
      {
        shiftBreakdown.push([i+":00 - " + (i+1)+":00"]);
      }
      for(let i = 0; i < shiftData.length; i++)
      {
        var day;
        if(shiftData[i].day == "Sunday")
        {
          day = 0;
        }
        if(shiftData[i].day == "Monday")
        {
          day = 1;
        }
        if(shiftData[i].day == "Tuesday")
        {
          day = 2;
        }
        if(shiftData[i].day == "Wednesday")
        {
          day = 3;
        }
        if(shiftData[i].day == "Thursday")
        {
          day = 4;
        }
        if(shiftData[i].day == "Friday")
        {
          day = 5;
        }
        if(shiftData[i].day == "Saturday")
        {
          day = 6;
        }

        var startBlock = parseInt(shiftData[i].startTime.split(":")[0]);
        if(shiftData[i].startTime.slice(-2) == "PM")
        {
          startBlock += 12;
        }
        var endBlock = parseInt(shiftData[i].endTime.split(":")[0]);
        if(shiftData[i].endTime.slice(-2) == "PM")
        {
          endBlock += 12;
        }
        for(var block = startBlock; block <= endBlock; block++)
        {
          shiftBreakdown[block][day+1] = shiftData[i].username;
        }
        
      }

      this.setState({ shifts: shiftBreakdown })
    })

  }

  
  render() {
    return (

      <Container fluid="md">
        <Row className="justify-content-md-end">
          {/* {this.state.shifts} */}
        </Row>

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
                    <td>{i[1]}</td>
                    <td>{i[2]}</td>
                    <td>{i[3]}</td>
                    <td>{i[4]}</td>
                    <td>{i[5]}</td>
                    <td>{i[6]}</td>
                    <td>{i[7]}</td>
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


/* <Table responsive="sm">
        <thead>
        <tr>
          <th>Weekdays</th>
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
        <tr>
          <td>7:30-8:00</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
        </tr>
        <tr>
          <td>8:00-8:30</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
        </tr>
        <tr>
          <td>8:30-9:00</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
        </tr>
        <tr>
          <td>9:00-9:30</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
        </tr>
        <tr>
          <td>9:30-10:00</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
        </tr>
        </tbody>

        <tbody>
        <tr>
          <td>10:00-10:30</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
        </tr>
        <tr>
          <td>10:30-11:00</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
        </tr>
        <tr>
          <td>11:00-11:30</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
        </tr>
        </tbody>

        <tbody>
        <tr>
          <td>11:30-12:00</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
        </tr>
        <tr>
          <td>12:00-12:30</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
        </tr>
        <tr>
          <td>12:30-1:00</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
        </tr>
        </tbody>

        <tbody>
        <tr>
          <td>1:00-1:30</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
        </tr>
        <tr>
          <td>1:30-2:00</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
        </tr>
        <tr>
          <td>2:00-2:30</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
        </tr>
        </tbody>
        <tbody>
        <tr>
          <td>2:30-3:00</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
        </tr>
        <tr>
          <td>3:00-3:30</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
        </tr>
        <tr>
          <td>3:30-4:00</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
        </tr>
        </tbody>
        <tbody>
        <tr>
          <td>4:00-4:30</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
        </tr>
        <tr>
          <td>4:30-5:00</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
        </tr>
        </tbody>

      </Table> */