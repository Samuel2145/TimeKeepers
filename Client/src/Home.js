import React, { Component } from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import NavItem from 'react-bootstrap/NavItem';

class Home extends Component {
  render() {
    return (
    
      <Container fluid>
        <Row>

       <Card style={{ width: '28rem' }}>
        <Card.Body>
        <Card.Title>Employee Login</Card.Title>
        <Card.Text>
          Change your preferences or check your schedule.
        </Card.Text>
        <NavItem eventkey={1} href="/login">
        <Button variant="primary">Login</Button>
        </NavItem>
        
      </Card.Body>
    </Card>

    <Card style={{ width: '28rem' }}>
        <Card.Body>
        <Card.Title>Admin Login</Card.Title>
        <Card.Text>
          Check preferences, and generate your schedule.
        </Card.Text>
        <Button variant="primary">Login</Button>
      </Card.Body>
    </Card>

    <Card style={{ width: '28rem' }}>
        <Card.Body>
        <Card.Title>Calendar</Card.Title>
        <Card.Text>
          Check the current work schedule.
        </Card.Text>
        <Button variant="primary">Login</Button>
      </Card.Body>
    </Card>
      </Row>

      </Container>
    );
  }
}
 
export default Home;