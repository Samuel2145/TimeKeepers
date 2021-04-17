import React, {useState} from 'react';
import './App.css';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import {LinkContainer} from 'react-router-bootstrap'
import {Button, Modal} from 'react-bootstrap';
import axios from 'axios'

const divStyle = {
    paddingTop: '20px',
};

const timeToInt = (time) => {

    const inInt = parseInt(time.substring(0, 2)) * 2 + parseInt(time.substring(3, 5)) / 30;

    if(time.includes('PM'))
        return inInt + 24;

    return inInt;
}

function Admin() {
    const [show, setShow] = useState(false);
    const [shiftSize, setShiftSize] = useState(0);
    const [sTime, setSTime] = useState(0);
    const [eTime, setETime] = useState(0);
    const [simult, setSimult] = useState(0);
    const [maxWeekHours, setMaxWeekHours] = useState(0);
    const [maxDayHours, setMaxDayHours] = useState(0);


    //const handleClose = () => setShow(false);
    //const handleShow = () => setShow(true);

    const onSubmit = () => {

        const parameter = {
            shiftSize: shiftSize,
            scheduleStart: sTime,
            scheduleEnd: eTime,
            numSimultaneous : simult,
            maxWeeklyHours: maxWeekHours,
            maxDailyHours: maxDayHours
        }

        //console.log(parameters)

        axios.post('/user/createParameter', {parameter}, {withCredentials: true}).then( (res) => {

            console.log(res.data);
            setShow(false);

            axios.get("/algo/newSchedule", {withCredentials: true}).then( (res) => {
                setTimeout( () => {
                    window.location.href = "/calendar";
                }, 200);
            })

        })

    }

    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <div style={divStyle}></div>
                        <h2>Welcome, Admin! </h2>
                        <h3>Tweak your preferences, and generate a new schedule!</h3>
                    </Col>
                </Row>
            </Container>

            <div style={divStyle}></div>

            <Container>

                <Form>

                    <Form.Row>

                        <Form.Group as={Col} controlId="formGridState">
                            <Form.Label>Shift Size</Form.Label>
                            <Form.Control as="select" defaultValue="Choose..." onChange={(e) => {setShiftSize(timeToInt(e.target.value)) }}>
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

                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Number of Simultaneous Shifts</Form.Label>
                            <Form.Control type="email" placeholder="5" onChange={(e) => {setSimult(parseInt(e.target.value))}}/>
                        </Form.Group>

                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridState">
                            <Form.Label>Start Time</Form.Label>
                            <Form.Control as="select" defaultValue="Choose..." onChange={(e) => {setSTime(timeToInt(e.target.value)) }}>
                                <option>Choose...</option>
                                <option>7:00 AM</option>
                                <option>8:00 AM</option>
                                <option>9:00 AM</option>
                                <option>10:00 AM</option>
                                <option>11:00 AM</option>
                                <option>12:00 AM</option>
                                <option>1:00 PM</option>
                                <option>2:00 PM</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridState">
                            <Form.Label>End Time</Form.Label>
                            <Form.Control as="select" defaultValue="Choose..." onChange={(e) => {setETime(timeToInt(e.target.value)) }}>
                                <option>Choose...</option>
                                <option>2:00 PM</option>
                                <option>3:00 PM</option>
                                <option>4:00 PM</option>
                                <option>5:00 PM</option>
                                <option>6:00 PM</option>
                                <option>7:00 PM</option>
                                <option>8:00 PM</option>
                                <option>9:00 PM</option>
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Maximum Weekly Hours</Form.Label>
                            <Form.Control type="email" placeholder="30" onChange={(e) => {setMaxWeekHours(parseInt(e.target.value))}}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Maximum Daily Hours</Form.Label>
                            <Form.Control type="email" placeholder="6" onChange={(e) => {setMaxDayHours(parseInt(e.target.value))}}/>
                        </Form.Group>
                    </Form.Row>
                </Form>

                <div
                    clasName="Form"
                    style={{display: "flex", justifyContent: "center"}}
                >
                    <Row>
                        <LinkContainer to="/calendar">
                            <Button variant="primary" width={80}>
                                View Schedule
                            </Button>
                        </LinkContainer>
                    </Row>
                </div>
                <div style={divStyle}></div>


                <Row className="justify-content-md-center">
                    <Button variant="success" width={100} onClick={()=> {setShow(true)}}>
                        Save Parameters
                    </Button>

                    <div> &nbsp; </div>

                    <Button variant="success" width={100} onClick={()=> {setShow(true)}}>
                        Generate Schedule
                    </Button>
                    
                </Row>


            </Container>

            <Modal show={show} onHide={()=> {setShow(false)}}>
                <Modal.Header closeButton>
                    <Modal.Title>Generate Schedule</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to generate a new schedule?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => { setShow(false)}}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={onSubmit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}


export default Admin;