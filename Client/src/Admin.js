import React, { Component } from "react";
import Container from 'react-bootstrap/Container';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
////Employer parameters - shift size, work time needed

const divStyle = {
  paddingTop: '120px',
};

class Admin extends Component {
  render() {
    return (
    
      <Container>
        <Accordion defaultActiveKey="0">
  <Card>
    <Card.Header>
      <Accordion.Toggle as={Button} variant="link" eventKey="0">
        Schedule Settings
      </Accordion.Toggle>
    </Card.Header>
    <Accordion.Collapse eventKey="0">
      <Card.Body>
        <div><DropdownButton id="dropdown-basic-button" title="Shift Sizes">
  <Dropdown.Item href="#/action-1">1 Hour</Dropdown.Item>
  <Dropdown.Item href="#/action-2">1:30 Hour</Dropdown.Item>
  <Dropdown.Item href="#/action-3">2 Hour</Dropdown.Item>
</DropdownButton></div>
        <div style={divStyle}></div>
        
        <div>And more!</div>
        </Card.Body>
    </Accordion.Collapse>
  </Card>
</Accordion>
      </Container>
    );
  }
}
 
export default Admin;