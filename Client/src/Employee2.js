import React, {useState, Component} from 'react';
import './App.css';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import axios from 'axios'
import {Button} from "react-bootstrap";

const divStyle = {
    paddingTop: '20px',
};


//tr, td
class Employee2 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            values: [],
            buttonData: []
        };
        this.clickHandler = this.clickHandler.bind(this)
        this.submitHandler = this.submitHandler.bind(this);
    }

    clickHandler(e) {

        e.preventDefault();

        const vals = this.state.values;

        if(vals.includes(e.target.value)){

            vals.splice(vals.indexOf(e.target.value), 1);

        }else{
            vals.push(e.target.value);
        }

        this.setState({values:vals}, () => {
            console.log(this.state.values);
        });

    }

    submitHandler(e) {

        e.preventDefault();

        const avails = this.state.values;

        //avails.sort();

        axios.post("/user/createAvailability", {avails}, {withCredentials: true}).then((res) => {
            console.log(res.data)
        }).catch( (err) => {
            console.log(err);
        })

    }

    componentDidMount() {

        axios.get('/user/getGroupParameterData', {withCredentials: true}).then((res) => {
            console.log(res.data);
            this.setState({buttonData: res.data})
        });

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

                    {
                        this.state.buttonData.map((i) => {

                            return (
                                <tr>
                                    <td>{i[0].sTime} - {i[0].eTime}</td>

                                    <td>
                                        <button value={i[1].col + "," + i[1].row} onClick={this.clickHandler}>
                                          Available
                                        </button>
                                    </td>

                                    <td>
                                      <button value={i[2].col + "," + i[2].row} onClick={this.clickHandler}>
                                        Available
                                      </button>
                                    </td>

                                    <td>
                                      <button value={i[3].col + "," + i[3].row} onClick={this.clickHandler}>
                                        Available
                                      </button>
                                    </td>

                                    <td>
                                      <button value={i[4].col + "," + i[4].row} onClick={this.clickHandler}>
                                        Available
                                      </button>
                                    </td>

                                    <td>
                                      <button value={i[5].col + "," + i[5].row} onClick={this.clickHandler}>
                                        Available
                                      </button>
                                    </td>

                                    <td>
                                      <button value={i[6].col + "," + i[6].row} onClick={this.clickHandler}>
                                        Available
                                      </button>
                                    </td>

                                    <td>
                                      <button value={i[7].col + "," + i[7].row} onClick={this.clickHandler}>
                                        Available
                                      </button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </Table>

                <Button variant="primary" onClick={this.submitHandler}>
                    Save Changes
                </Button>
            </Container>

        );
    }
}


export default Employee2;