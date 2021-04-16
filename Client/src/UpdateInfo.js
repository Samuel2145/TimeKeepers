import React, {useState, useEffect} from 'react';
import axios from 'axios';


const UpdateInfo = (props) => {

    const [groupList, setGroupList] = useState([]);
    const [pass, setPass] = useState("");
    const [email, setEmail] = useState("");
    const [group, setGroup] = useState("");

    useEffect(() => {
        axios.get("/user/getGroups").then( (res) => {
            setGroupList(res.data);
        })
    }, [])


    const changeHandler = (e) => {
        setGroup(e.target.value);
    }

    const groupSubmit = (e) => {
        e.preventDefault();

        axios.post("/user/setNewGroup", {group}).then( (res) => {
            console.log(res.data);
            window.location.href ="/update"
        })
    }

    const passSubmit = (e) => {
        e.preventDefault();

        axios.post("/user/setNewPassword", {pass}).then( (res) => {
            console.log(res.data);
            window.location.href ="/update"
        })
    }

    const emailSubmit = (e) => {
        e.preventDefault();

        axios.post("/user/setNewEmail", {email}).then( (res) => {
            console.log(res.data);
            window.location.href ="/update"
        })
    }

    return(
        <div>

            <div>
                <label htmlFor={"Pass"}>Change Password</label>
                <input type={"text"} name={"Pass"} onChange={(e) => { setPass(e.target.value)}}/>
                <button type={"text"} onClick={passSubmit}>
                    Update Password
                </button>
            </div>

            <div>
                <label htmlFor={"Email"}>Change Email</label>
                <input type={"text"} name={"Email"} onChange={(e) => { setEmail(e.target.value)}}/>
                <button type={"text"} onClick={emailSubmit}>
                    Update Email
                </button>
            </div>

            <div>
                <label htmlFor={"GroupList"}>Available Groups</label>
                <input type={"text"} list={"Groups"} name={"GroupList"} onChange={changeHandler}/>

                <datalist id={"Groups"}>
                    {groupList.map((elem) => {
                        return (
                            <option value={elem}>{elem}</option>
                        )

                    })}
                </datalist>

                <button type={"text"} onClick={groupSubmit}>
                    Change Group
                </button>
            </div>
        </div>
    )

}


export default UpdateInfo;