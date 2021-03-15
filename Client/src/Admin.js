import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Button, Modal } from 'react-bootstrap';

const divStyle = {
    paddingTop: '20px',
};

    
function Admin() {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
      <Container>
            <Row>
            <Col>
            <div style={divStyle}> </div>
            <h2>Welcome, Admin! </h2>
            <h3>Tweak your preferences, and generate a new schedule!</h3>
            </Col>
            </Row>
            </Container>

            <div style={divStyle}> </div>
      
      <Container>

      <Form>
  <Form.Row>
  <Form.Group as={Col} controlId="formGridState">
      <Form.Label>Shift Size</Form.Label>
      <Form.Control as="select" defaultValue="Choose...">
        <option>Choose...</option>
        <option>1:00</option>
        <option>2:00</option>
        <option>3:00</option>
        <option>4:00</option>
        <option>5:00</option>
        <option>6:00</option>
        <option>7:00</option>
        <option>8:00</option>
      </Form.Control>
    </Form.Group>

    <Form.Group as={Col} controlId="formGridPassword">
      <Form.Label>Total Hours Needed this Week</Form.Label>
      <Form.Control type="password" placeholder="50" />
    </Form.Group>
  </Form.Row>
  </Form>
    
      

       
        <Row>
        <Button variant="success" block onClick={handleShow}>
          Generate Schedule
        </Button>
        </Row>
        
        
        

        
        


       </Container>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Generate Schedule</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to generate a new schedule?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
   
export default Admin;