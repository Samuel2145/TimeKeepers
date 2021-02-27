import React, {Component} from "react";
import axios from 'axios'

//Employee parameters for schedule based on shift size, 
//number of people, 
//opening and closing, 
//tag system to represent employees trained for each position
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
            <div>
                Welcome {this.state.username}
            </div>
        );
    }
}

export default Employee;