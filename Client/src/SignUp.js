import React, {Component} from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import {ToggleButtonGroup, ToggleButton} from "react-bootstrap";
import axios from 'axios';

const divStyle = {
    paddingTop: '10px',
};

class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            email: '',
            isEmployer: 2,
        };
        this.formHandler = this.formHandler.bind(this)
    }

    formHandler(e) {
        e.preventDefault();

        const user = {
            userName: this.state.userName,
            password: this.state.password,
            email: this.state.email,
            isEmployer: this.state.isEmployer
        }

        //console.log(user);

        axios.post("/user/createUser", {user}).then((res) => {
            console.log(res);
            window.location.href = '/login';
        }).catch((error) => {
            console.log(error.response.data);
        });

    }

    render() {
        return (
            <div style={divStyle}>
                <Container>
                    <Form>

                        <Form.Group controlId="formBasicUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="username" placeholder="Enter Username"
                                          onChange={(e) => this.setState({userName: e.target.value})}/>
                        </Form.Group>


                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="username" placeholder="Enter email"
                                          onChange={(e) => this.setState({email: e.target.value})}/>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password"
                                          onChange={(e) => this.setState({password: e.target.value})}/>
                            <Form.Text className="text-muted">
                                Case sensitive.
                            </Form.Text>
                        </Form.Group>

                        

                        <Form.Group>
                            <ToggleButtonGroup type="radio" name="type">
                                <ToggleButton value="0" onClick={(e) => this.setState({isEmployer: e.target.value})}>
                                    Employee
                                </ToggleButton>
                                <ToggleButton value="1" onClick={(e) => this.setState({isEmployer: e.target.value})}>
                                    Employer
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </Form.Group>

                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="I am not a robot."/>
                        </Form.Group>

                        <Form.Group>
                            <Button variant="primary" onClick={this.formHandler}>
                                Submit
                            </Button>
                        </Form.Group>

                    </Form>
                </Container>
            </div>
        );
    }
}

export default SignUp;