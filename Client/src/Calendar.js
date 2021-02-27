import React, {Component} from "react";
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
    paddingTop: '10px',
    marginLeft: '10px',
};

//const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

class Calendar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            shifts: []
        };
    }

    componentDidMount() {

        axios.get("/user/getCalendar", {withCredentials: true}).then((res) => {

            console.log(res.data);

            const shiftData = res.data;

            const toDisplay = shiftData.map((elem) => {
                return (
                    <Col>
                        <Card style={{}}>
                            <Card.Body>
                                <Card.Title>{elem.day}</Card.Title>
                                <Card.Text>
                                    {elem.username}
                                    <br/>
                                    {elem.startTime} - {elem.endTime}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                )
            })

            this.setState({shifts: toDisplay})
        })

    }


    render() {
        return (

            <Container fluid="md">
                <Row className="justify-content-md-end">
                    {this.state.shifts}
                </Row>

            </Container>
        );
    }
}

export default Calendar;

/*
<Table responsive="sm">
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

</Table>
*/
