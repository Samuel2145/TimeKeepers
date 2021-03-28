import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import black from './img/black.jpg';

//i use this for padding sometimes
const divStyle = {
    paddingTop: '3.5rem',
};

//use route /database
//included a basic way to display images!
class DatabaseConnections extends Component {
    render() {
        return (
            
            <Container>
            
            <div>
                Database Connections Test

                <div style={divStyle}></div>
                
                <img src={black} width="100px" height="100px" />
            </div>
            </Container>
        );
    }
}

export default DatabaseConnections;