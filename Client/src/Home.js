import React, {Component} from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavItem from 'react-bootstrap/NavItem';
import Nav from 'react-bootstrap/Nav';
import CardColumns from 'react-bootstrap/CardColumns';
import Employee from "./Employee";
import Admin from "./Admin";
import Calendar from "./Calendar";
import Login from "./Login";
import {Switch, Route, Link} from 'react-router-dom';
import {LinkContainer} from 'react-router-bootstrap'


import bigthink from './img/bigthink.png';
import adminpic from './img/employer2.jpg';
import employeepic  from './img/employeepic.jpg';

const divStyle = {
    paddingTop: '3.5rem',
};

class Home extends Component {
    render() {
        return (

            <Container fluid="md">
                <div style={divStyle}></div>
                <Row className="justify-content-md-end">
                    <Col>
                        <Card style={{}}>
                            <Card.Img variant="top" src={employeepic}/>
                            <Card.Body>
                                <Card.Title>Employee Login</Card.Title>
                                <Card.Text>
                                    <ul>
                                    <li>View your work schedule</li>
                                    <li>Make changes to your availabilities</li>
                                    <li>Request time off</li>
                                    <li>Update your personal information</li>
                                    </ul>
                                </Card.Text>
                                
                                <LinkContainer to="/employee">
                                    <Button>Login</Button>
                                </LinkContainer>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col>
                        <Card style={{}}>
                            <Card.Img variant="top" src={adminpic}/>
                            <Card.Body>
                                <Card.Title>Admin Login</Card.Title>
                                <Card.Text>
                                <ul>
                                    <li>View employee calendars</li>
                                    <li>Generate new work schedules</li>
                                    <li>Manually edit and refine work schedules</li>
                                    <li>Edit employee qualifications</li>
                                    </ul>
                                </Card.Text>
                                <LinkContainer to="/admin">
                                    <Button>Login</Button>
                                </LinkContainer>
                            </Card.Body>
                        </Card>

                    </Col>
                </Row>

            </Container>
        );
    }
}

export default Home;