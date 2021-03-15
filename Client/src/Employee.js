import React, {Component} from "react";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import ToggleButton from 'react-bootstrap/ToggleButton'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import axios from 'axios'

//Employee parameters for schedule based on shift size, 
//number of people, 
//opening and closing, 
//tag system to represent employees trained for each position

const divStyle = {
    paddingTop: '20px'
};

class Employee extends Component {


    constructor(props) {
        super(props);
        this.state = {
            username: ''
        };
    }

    componentDidMount() {

        axios.get('/user/getUserInfo', {withCredentials: true}).then((res) => {

            this.setState({username: res.data.username});
        });

    }

    

    render() {
        return (
        

            <Container>
            <Row>
            <Col>
            <div style={divStyle}> </div>
            <h2>Welcome, {this.state.username}! </h2>
            <h3>Click on a cell to show your availability!</h3>

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
<tr>
  <td>7:30-8:00</td>
  <td>
  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'  
/>
  </td>
  <td>
  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/>
  </td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
</tr>
<tr>
  <td>8:30-9:00</td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
</tr>
<tr>
  <td>9:30-10:00</td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
</tr>
</tbody>

<tbody>
<tr>
  <td>10:00-10:30</td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
</tr>
<tr>
  <td>10:30-11:00</td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
</tr>
<tr>
  <td>11:00-11:30</td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
</tr>
</tbody>

<tbody>
<tr>
  <td>11:30-12:00</td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
</tr>
<tr>
  <td>12:00-12:30</td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
</tr>
<tr>
  <td>12:30-1:00</td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
</tr>
</tbody>

<tbody>
<tr>
  <td>1:00-1:30</td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
</tr>
<tr>
  <td>1:30-2:00</td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
</tr>
<tr>
  <td>2:00-2:30</td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
</tr>
</tbody>
<tbody>
<tr>
  <td>2:30-3:00</td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
</tr>
<tr>
  <td>3:00-3:30</td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
</tr>
<tr>
  <td>3:30-4:00</td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
</tr>
</tbody>
<tbody>
<tr>
  <td>4:00-4:30</td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
</tr>
<tr>
  <td>4:30-5:00</td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
  <td>  <BootstrapSwitchButton
    checked={false}
    width={80}
    onlabel='Yes'
    offlabel='No'
/></td>
</tr>
</tbody>

</Table>
            </Col>
            </Row>
            </Container>


            
        );
    }
}

export default Employee;