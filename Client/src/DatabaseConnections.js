import React, { Component } from "react";
import Container from "react-bootstrap/Container";

//i use this for padding sometimes
const divStyle = {
    paddingTop: '3.5rem',
};

//use route /database
class DatabaseConnections extends Component {
    render() {
        return (
            
            <Container>
            <div>Database Connections Test</div>
            </Container>
        );
    }
}

export default DatabaseConnections;