import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const divStyle = {
    paddingTop: '20px',
    
};


const UpdateInfo = (props) => {

    const [groupList, setGroupList] = useState([]);
    const [pass, setPass] = useState("");
    const [email, setEmail] = useState("");
    const [group, setGroup] = useState("");
    const [newGroup, setNewGroup] = useState("");

    useEffect(() => {
        axios.get("/user/getGroups").then((res) => {
            setGroupList(res.data);
        })
    }, [])


    const changeHandler = (e) => {
        setGroup(e.target.value);
    }

    const groupSubmit = (e) => {
        e.preventDefault();

        axios.post("/user/setNewGroup", { group }).then((res) => {
            console.log(res.data);
            window.location.href = "/update"
        })
    }

    const passSubmit = (e) => {
        e.preventDefault();

        axios.post("/user/setNewPassword", { pass }).then((res) => {
            console.log(res.data);
            window.location.href = "/update"
        })
    }

    const emailSubmit = (e) => {
        e.preventDefault();

        axios.post("/user/setNewEmail", { email }).then((res) => {
            console.log(res.data);
            window.location.href = "/update"
        })
    }

    return (
        <div>

            <div style={divStyle}></div>
            <Container>
                <h4>Update your information!</h4> 
                <Form>
                    Change Password:

                    <Form.Row className="align-items-center">
                        <Col xs="auto">

                            <Form.Label htmlFor="inlineFormInput" srOnly>
                                Name
                            </Form.Label>

                            <Form.Control
                                className="mb-2"
                                id="inlineFormInput"
                                type="password"
                                placeholder="Password"
                                onChange={(e) => { setPass(e.target.value) }}
                            />
                        </Col>


                        <Col xs="auto">
                            <Button type="submit" className="mb-2" onClick={passSubmit}>
                                Update Password
                            </Button>
                        </Col>
                    </Form.Row>


                    Change Email:
                    <Form.Row className="align-items-center">
                        <Col xs="auto">
                            <Form.Label htmlFor="inlineFormInput" srOnly>
                                Email
                            </Form.Label>
                            <Form.Control
                                className="mb-2"
                                id="inlineFormInput"
                                placeholder="Email"
                                onChange={(e) => { setEmail(e.target.value) }}
                            />
                        </Col>

                        <Col xs="auto">
                            <Button type="submit" className="mb-2" onClick={emailSubmit}>
                                Update Email
                            </Button>
                        </Col>
                    </Form.Row>

                 

                </Form>

                <div>
                    <div>Available Organizations:</div>
    
                    <input type={"text"} list={"Groups"} name={"GroupList"} onChange={changeHandler} />

                    <datalist id={"Groups"}>
                        {groupList.map((elem) => {
                            return (
                                <option value={elem}>{elem}</option>
                            )

                        })}
                    </datalist>

                    <span>&nbsp;</span>
                    <span>&nbsp;</span>
                    <span>&nbsp;</span>
                    <span>&nbsp;</span>
                    <span>&nbsp;</span>
                    <span>&nbsp;</span>

                    <Button type={"text"} onClick={groupSubmit}>
                        Change Organization
                    </Button>


                    <div>Create New Organization:</div> 
                    <Form.Row className="align-items-center">
                        <Col xs="auto">
                            <Form.Label htmlFor="inlineFormInput" srOnly>
                                Create Group:
                            </Form.Label>
                            <Form.Control
                                className="mb-2"
                                id="inlineFormInput"
                                placeholder="Add New Group"
                                onChange={(e) => setNewGroup(e.target.value)}
                            />
                        </Col>

                        <Col xs="auto">
                            <Button type="submit" className="mb-2" onClick={emailSubmit}>
                                Create Group
                            </Button>
                        </Col>
                    </Form.Row>
                </div>



            </Container>
        </div>
    )

}


export default UpdateInfo;