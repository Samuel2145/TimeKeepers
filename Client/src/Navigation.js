import React, {Component} from 'react';
import {Link, Route, Switch} from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavItem from 'react-bootstrap/NavItem';
import Home from "./Home";
import Employee from "./Employee";
import Admin from "./Admin";
import Employee2 from "./Employee2";
import Calendar from "./Calendar";
import Login from "./Login";
import SignUp from "./SignUp";
import axios from 'axios'

class Navigation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedIn: null
        };
        this.logoutHandler = this.logoutHandler.bind(this);
    }

    logoutHandler(e) {
        e.preventDefault();


        axios.post("/user/logout").then((res) => {
            console.log(res.data);
            window.location.href = '/';
        }).catch((error) => {
            console.log(error);
        });

    }

    componentDidMount() {

        axios.get('user/isLoggedIn').then((res) => {

            if (res.data.loggedIn === 0) {

                const temp = (
                    <div align={"center"}>
                        <NavItem eventkey={2} href="/login" style={{display: "inline-block"}}>
                            <Nav.Link as={Link} to="/login">Login</Nav.Link>
                        </NavItem>
                        <NavItem eventkey={4} href="/signup" style={{display: "inline-block"}}>
                            <Nav.Link as={Link} to="/signup">Create Account</Nav.Link>
                        </NavItem>
                    </div>
                );

                this.setState({loggedIn: temp});

            } else {

                const temp = (
                    <div align={"center"}>
                        <NavItem eventkey={4} href="/calendar" style={{display: "inline-block"}}>
                            <Nav.Link as={Link} to="/calendar">Calendar</Nav.Link>
                        </NavItem>
                        <NavItem style={{display: "inline-block"}}>
                            <Nav.Link onClick={this.logoutHandler}>Logout</Nav.Link>
                        </NavItem>
                    </div>
                )

                this.setState({loggedIn: temp});
            }
        });

    }


    render() {
        return (
            <div>
                <div>
                    <Navbar bg="primary" variant="dark">
                        <Navbar.Brand as={Link} to="/">Schedugator</Navbar.Brand>
                        <Navbar.Collapse>
                            <Nav className="ml-auto">
                                <NavItem eventkey={1} href="/">
                                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                                </NavItem>
                                {this.state.loggedIn}
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </div>
                <div>
                    <Switch>
                        <Route exact path='/' component={Home}/>
                        <Route exact path='/employee' component={Employee}/>
                        <Route exact path='/admin' component={Admin}/>
                        <Route exact path='/employee2' component={Employee2}/>
                        <Route exact path='/calendar' component={Calendar}/>
                        <Route exact path='/login' component={Login}/>
                        <Route exact path='/signup' component={SignUp}/>
                        <Route render={function () {
                            return <p>Not found</p>
                        }}/>
                    </Switch>
                </div>
            </div>
        );
    }
}

export default Navigation;
