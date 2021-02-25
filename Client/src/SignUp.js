import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
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
            email: ''
        };
        this.formHandler = this.formHandler.bind(this)
    }

    formHandler(e){
        e.preventDefault();

        const user = {
            userName: this.state.userName,
            password: this.state.password,
            email: this.state.email
        }

        axios.post("/user/createUser", {user}).then( (res) => {
            console.log(res.data)
        });

    }

    render() {
        return (
            <div style={divStyle}>
                <Container>
                    <Form>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="username" placeholder="Enter Username" onChange={(e) => this.setState({userName: e.target.value})}/>
                            <Form.Text className="text-muted">
                                Case sensitive.
                            </Form.Text>
                        </Form.Group>


                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="username" placeholder="Enter email" onChange={(e) => this.setState({email: e.target.value})}/>
                            <Form.Text className="text-muted">
                                Case sensitive.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={(e) => this.setState({password: e.target.value})}/>
                        </Form.Group>

                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="I am not a robot." />
                        </Form.Group>

                        <Button variant="primary" onClick={this.formHandler}>
                            Submit
                        </Button>

                    </Form>
                </Container>
            </div>
        );
    }
}

export default SignUp;