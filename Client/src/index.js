import React, {Component} from 'react';
import {
    Route,
    NavLink,
    HashRouter
} from "react-router-dom";
import {BrowserRouter} from 'react-router-dom';
import ReactDOM from 'react-dom';
//import './index.css';
//import App from './App';
import Navigation from './Navigation';
//import Header from './Header';
import * as serviceWorker from './serviceWorker';
import Calendar from './Calendar'
import Home from "./Home";
import Employee from "./Employee";
import Admin from "./Admin";
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
    render() {
        return (
            <div id="App">
                <Navigation/>
            </div>
        );
    }
}

ReactDOM.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>,
    document.getElementById('root')
);

serviceWorker.unregister();
