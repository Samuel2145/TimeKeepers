import React, { useState, Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { LinkContainer } from 'react-router-bootstrap'
import { Button, Modal } from 'react-bootstrap';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import Table from 'react-bootstrap/Table';

const divStyle = {
  paddingTop: '20px',
};

const sampleData = [{ sTime: '8:00 am', eTime: '10:00 am' },
{ sTime: '10:00 am', eTime: '12:00 pm' },
{ sTime: '12:00 pm', eTime: '2:00 pm' },
{ sTime: '2:00 pm', eTime: '4:00 pm' },
{ sTime: '5:00 pm', eTime: '5:00 pm' }
]


//tr, td
class Employee2 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      index: []
    };
    this.clickHandler = this.clickHandler.bind(this)
  }

  clickHandler(e) {

    e.preventDefault();
    console.log("has been clicked")

  }

  componentDidMount() {

    const temp = [1, 2, 3, 4, 5, 6, 7]


    /* 
      const bData =
        <td>
          <BootstrapSwitchButton
            checked={false}
            width={80}
            onlabel='Yes'
            offlabel='No'
            onClick={this.clickHandler}
          />
        </td>
  
  
      const buttonData = [bData, bData, bData, bData, bData, bData, bData]
      */

    this.setState({
      index: temp
    })
  }

  render() {
    return (
      <Container>
        <div>Test Employee</div>

        <Table bordered responsive="sm">
          <thead>
            <tr>
              <th>Weekdays</th>
              <th>Sunday</th>
              <th>Monday</th>
              <th>Tuesday</th>
              <th>Wednesday</th>
              <th>Thursday</th>
              <th>Friday</th>
              <th>Saturday</th>
            </tr>
          </thead>

          <tbody>
            {sampleData.map((data) => {
              return (
                <tr>
                  <td>
                    {data.sTime}-{data.eTime}
                  </td>

                  {this.state.index.map((i) => {
                    return (<td>
                      <BootstrapSwitchButton
                        checked={false}
                        width={80}
                        onlabel='Yes'
                        offlabel='No'
                        onClick={this.clickHandler}
                      />
                    </td>)
                  })}
                </tr>
              )
            })}
          </tbody>
        </Table>
      </Container>

    );
  }
}


export default Employee2;