import React, {Component} from 'react';
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
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

class App extends Component {
  render(){
    return(
      <HashRouter>
        <Navigation logoTitle = "Schedugator" />

        <main> 
          <Route exact path="/" component={Home} />
          <Route path="/employee" component={Employee} />
          <Route path="/admin" component={Admin} />  
        </main>
      </HashRouter>
    );
  }
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
