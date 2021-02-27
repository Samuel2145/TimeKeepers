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
            username: '',
            password: ''
        };
        this.loginHandler = this.loginHandler.bind(this)
    }

    //sample user and pass    
    //maria@dummy.com
    //dummy5
    loginHandler(e){
        e.preventDefault();

        const user = {
            username: this.state.username,
            password: this.state.password
        }

        axios.post("/user/userLogin", {user}).then( (res) => {
            const type = res.data.isEmployer;

            if(type === 0){
                window.location.href = '/employee';
            }else if(type === 1){
                window.location.href = '/admin';
            }

        }).catch((error) => {
            console.log(error);
        });

    }

    render() {
        return (
            <div style={divStyle}>
                <Container>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="username" placeholder="Enter username" name="email" onChange={(e) => this.setState({username: e.target.value})}/>
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