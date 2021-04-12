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
            buttonData: [],
            selecting: false,
            type: 0
        };
        this.clickHandler = this.clickHandler.bind(this)
        this.submitHandler = this.submitHandler.bind(this)
        this.dragHandler = this.dragHandler.bind(this)
    }

    clickHandler(e) {

        const dataCopy = [...this.state.buttonData];

        const pos = e.target.id.split(",")
        const x = parseInt(pos[0]);
        const y = parseInt(pos[1]);

        const color = dataCopy[y][x].bg
        let newType;

        if (color === 'white') {
            newType = 1;
        } else {
            newType = 2;
        }

        this.setState({selecting: !this.state.selecting, type: newType}, () => {
            this.dragHandler(e);
        })
    }

    dragHandler(e) {

        if (this.state.selecting === true) {
            const dataCopy = [...this.state.buttonData];

            const pos = e.target.id.split(",")

            const x = parseInt(pos[0]);
            const y = parseInt(pos[1]);

            if (this.state.type === 1) {
                dataCopy[y][x].bg = "blue";
            } else if (this.state.type === 2) {
                dataCopy[y][x].bg = "white";
            }

            this.setState({buttonData: dataCopy});

        }
    }

    submitHandler(e) {

        e.preventDefault();

        const avails = [];

        for (let i = 1; i < 8; i++) {
            for (let j = 0; j < this.state.buttonData.length; j++) {

                if (this.state.buttonData[j][i].bg === 'blue') {
                    avails.push(i + "," + j);
                }

            }
        }

        axios.post("/user/createAvailability", {avails}, {withCredentials: true}).then((res) => {
          console.log(res.data)
        }).catch( (err) => {
          console.log(err);
        })

    }


    componentDidMount() {

        axios.get('/user/getGroupParameterData', {withCredentials: true}).then((res) => {
            //console.log(res.data);
            this.setState({buttonData: res.data}, () => {
                console.log(this.state.buttonData);
            })
        });

    }

    render() {
        return (
            <Container>
                <div>Test Employee</div>

                <div>
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

                        <tbody onClick={this.clickHandler}>

                        {
                            this.state.buttonData.map((i) => {

                                return (
                                    <tr>
                                        <td>{i[0].sTime} - {i[0].eTime}</td>

                                        <td style={{cursor: "pointer", background: i[1].bg}}
                                            id={i[1].col + "," + i[1].row} onMouseOver={this.dragHandler}>
                                            Available
                                        </td>

                                        <td style={{cursor: "pointer", background: i[2].bg}}
                                            id={i[2].col + "," + i[2].row} onMouseOver={this.dragHandler}>
                                            Available
                                        </td>

                                        <td style={{cursor: "pointer", background: i[3].bg}}
                                            id={i[3].col + "," + i[3].row} onMouseOver={this.dragHandler}>
                                            Available
                                        </td>

                                        <td style={{cursor: "pointer", background: i[4].bg}}
                                            id={i[4].col + "," + i[4].row} onMouseOver={this.dragHandler}>
                                            Available
                                        </td>

                                        <td style={{cursor: "pointer", background: i[5].bg}}
                                            id={i[5].col + "," + i[5].row} onMouseOver={this.dragHandler}>
                                            Available
                                        </td>

                                        <td style={{cursor: "pointer", background: i[6].bg}}
                                            id={i[6].col + "," + i[6].row} onMouseOver={this.dragHandler}>
                                            Available
                                        </td>

                                        <td style={{cursor: "pointer", background: i[7].bg}}
                                            id={i[7].col + "," + i[7].row} onMouseOver={this.dragHandler}>
                                            Available
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </Table>
                </div>

                <Button variant="primary" onClick={this.submitHandler}>
                    Save Changes
                </Button>
            </Container>

        );
    }
}


export default Employee2;