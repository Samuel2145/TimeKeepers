import React, { Component } from 'react';
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";



class Navigation extends Component {
  render() {
    //array to hold navlink names, doesn't work for default home so we wont keep this for now
    const sections = ['Home', 'Employee', 'Admin', 'Calendar',];
    //.map loops through each index of array
    //return {navLinks}
    const navLinks = sections.map( section => {
      return (
          <li><a href={'#' + section}>{section}</a></li>
      )

    });
    return(
<HashRouter>
  <nav>
    <h2 className = "logo" >{this.props.logoTitle}</h2>
    <ul>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/employee">Employee</NavLink></li>
      <li><NavLink to="/admin">Admin</NavLink></li>
    </ul>
  </nav>

</HashRouter>
    );
  }
}

export default Navigation;
