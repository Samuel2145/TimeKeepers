import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavItem from 'react-bootstrap/NavItem';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Home from "./Home";
import Employee from "./Employee";
import Admin from "./Admin";
import Calendar from "./Calendar";
import Login from "./Login";

class Navigation extends Component {
  render() {
    return (
      <div>
        <div>
          <Navbar bg = "primary" variant ="dark">
            <Navbar.Brand as={Link} to="/" >Schedugator</Navbar.Brand>
            <Navbar.Collapse>
              <Nav className="mr-auto">
                <NavItem eventkey={1} href="/">
                  <Nav.Link as={Link} to="/" >Home</Nav.Link>
                </NavItem>
                <NavItem eventkey={2} href="/employee">
                  <Nav.Link as={Link} to="/login" >Employee Portal</Nav.Link>
                </NavItem>
                <NavItem eventkey={3} href="/admin">
                  <Nav.Link as={Link} to="/login" >Admin Portal</Nav.Link>
                </NavItem>
                <NavItem eventkey={4} href="/calendar">
                  <Nav.Link as={Link} to="/calendar" >Calendar</Nav.Link>
                </NavItem>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
        <div>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/employee' component={Login} />
            <Route exact path='/admin' component={Admin} />
            <Route exact path='/calendar' component={Calendar} />
            <Route exact path='/login' component={Login} />
            <Route render={function () {
              return <p>Not found</p>
            }} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default Navigation;
