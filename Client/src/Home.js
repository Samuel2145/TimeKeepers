import React, { Component } from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavItem from 'react-bootstrap/NavItem';
import CardColumns from 'react-bootstrap/CardColumns';

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
       <Card style={{ width: '18rem' } }>
       <Card.Img variant="top" src={bigthink} />
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
    </Col>

      <Col>
    <Card style={{ width: '18rem' }}>
    <Card.Img variant="top" src={bigthink} />
        <Card.Body>
        <Card.Title>Admin Login</Card.Title>
        <Card.Text>
          Check preferences, and generate your schedule.
        </Card.Text>
        <Button variant="primary">Login</Button>
      </Card.Body>
    </Card>

    </Col>
      </Row>

      </Container>
    );
  }
}
 
export default Home;