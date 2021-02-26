import React, { Component } from "react";
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
import { Switch, Route, Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap'


import bigthink from './img/bigthink.png';

const divStyle = {
  paddingTop: '10px',
};

class Home extends Component {
  render() {
    return (

      <Container fluid>
        <Row className="justify-content-md-end">
          <Col>
            <Card style={{ width: '30rem' } }>
        <Card.Img variant="top" src={bigthink} />
        <Card.Body>
        <Card.Title>Employee Login</Card.Title>
        <Card.Text>
          Change your preferences or check your schedule.
        </Card.Text>
        <LinkContainer to="/employee">
          <Button>Login</Button>
        </LinkContainer>
      </Card.Body>
    </Card>
    </Col>

      <Col>
    <Card style={{ width: '30rem' }}>
    <Card.Img variant="top" src={bigthink} />
        <Card.Body>
        <Card.Title>Admin Login</Card.Title>
        <Card.Text>
          Check preferences, and generate your schedule.
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