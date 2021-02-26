import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import axios from 'axios';

const divStyle = {
    paddingTop: '10px',
};

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
        this.loginHandler = this.loginHandler.bind(this)
    }

    //sample user and pass    
    //mariaP@dummy.com
    //dummy5
    loginHandler(e){
        e.preventDefault();

        const user = {
            email: this.state.email,
            password: this.state.password
        }

        axios.post("/user/userLogin", {user}).then( (res) => {
            console.log(res.data)
            window.location.href = '/admin';
        });

    }

    render() {
        return (
            <div style={divStyle}>
                <Container>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="username" placeholder="Enter username" name="email" onChange={(e) => this.setState({email: e.target.value})}/>
                            <Form.Text className="text-muted">
                                Case sensitive.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" name="password" onChange={(e) => this.setState({password: e.target.value})}/>
                        </Form.Group>

                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="I am not a robot." />
                        </Form.Group>

                        <Button variant="primary" onClick={this.loginHandler}>
                            Submit
                        </Button>

                  </Form>
              </Container>
          </div>
        );
    }
}
 
export default Login;