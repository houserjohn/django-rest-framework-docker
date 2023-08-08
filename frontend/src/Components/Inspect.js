import React from 'react';
import axios from 'axios';
import { inspectModes } from '../Consts';

const Inspect = (props) => {
    const FIELDS = {
        ID: "id",
        NAME: "name",
        ORGANIZATION: "organization",
        EMAIL: "email",
        PHONE: "phone",
        NOTES: "notes",
    };

    const visibleStyle = {
        position: "absolute", 
        backgroundColor: "white", 
        width: "80%",
        left: "10%",
        top: "10%",
        height: "80%",
        borderRadius: "1em",
        borderStyle: "solid",
        display: "block",
    };

    const invisibleStyle = {
        position: "absolute", 
        backgroundColor: "white", 
        width: "80%",
        left: "10%",
        top: "10%",
        height: "80%",
        borderRadius: "1em",
        borderStyle: "solid",
        display: "none",
    };

    const onChange = (e, field) => {
        let newData = {};
        Object.assign(newData, props.formData) // copy data
        if (field === FIELDS.ID) newData.id = e.target.value;
        else if (field === FIELDS.NAME) newData.name = e.target.value;
        else if (field === FIELDS.ORGANIZATION) newData.organization = e.target.value;
        else if (field === FIELDS.EMAIL) newData.email = e.target.value;
        else if (field === FIELDS.PHONE) newData.phone = e.target.value;
        else if (field === FIELDS.NOTES) newData.notes = e.target.value;
        props.setFormData(newData);
    }

    async function sendDataToServer (data, URL) {
        try {
            const res = await axios.post(URL, data);
            console.log("data sent to server with res: " + res)
            console.log(res)
            return res; 
        } catch (error) {
            console.log(error.response); 

         }
        
    }

    async function onSubmit(event) {
        event.preventDefault();
        
        if (props.inspectMode === inspectModes.CREATE) {
            let res = await sendDataToServer(props.formData, "//localhost:5000/sources/create/");
            
            console.log(res);
            let tableContentsCopy = props.tableContents.slice()
            tableContentsCopy.push({
                id: res.data.id,
                name: res.data.name,
                organization: res.data.organization,
                email: res.data.email,
                phone: res.data.phone,
                notes: res.data.notes,
            })
            props.setTableContents(tableContentsCopy)
        } else if (props.inspectMode === inspectModes.UPDATE) {
            let res = await sendDataToServer(props.formData, "//localhost:5000/sources/update/"+props.formData.id)
            let tableContentsCopy = props.tableContents.slice()
            tableContentsCopy.forEach((v, i) => {
                if (v.id === props.formData.id) {
                    tableContentsCopy[i] = {
                        id: res.data.id,
                        name: res.data.name,
                        organization: res.data.organization,
                        email: res.data.email,
                        phone: res.data.phone,
                        notes: res.data.notes,
                    }
                }
            })
            props.setTableContents(tableContentsCopy)
        }

        props.setFormData({
            id: "",
            name: "",
            organization: "",
            email: "",
            phone: "",
            notes: "",
        });
        props.setDisplay(false);
    }

    const onClose = (event) => {
        event.preventDefault();

        props.setDisplay(false);

        props.setFormData({
            id: "",
            name: "",
            organization: "",
            email: "",
            phone: "",
            notes: "",
        });
    }
    
    return (
        <div style={ props.display ? visibleStyle : invisibleStyle}>
            <button 
                onClick={onClose}
                style={{marginLeft:"80%"}}
            >
                Close 
            </button>
            <form onSubmit={onSubmit}>
                <label for="id">Id:</label><br/>
                <input type="text" disabled id="id" name="id" value={props.formData.id} onChange={(e) => onChange(e, FIELDS.ID)}/><br/>
                <label for="name">Name:</label><br/>
                <input type="text" id="name" name="name" value={props.formData.name} onChange={(e) => onChange(e, FIELDS.NAME)}/><br/>
                <label for="organization">Organization:</label><br/>
                <input type="text" id="organization" name="organization" onChange={(e) => onChange(e, FIELDS.ORGANIZATION)} value={props.formData.organization}  /><br></br>
                <label for="email">Email:</label><br/>
                <input type="text" id="email" name="email"onChange={(e) => onChange(e, FIELDS.EMAIL)} value={props.formData.email}/><br></br>
                <label for="phone">Phone:</label><br/>
                <input type="text" id="phone" name="phone"onChange={(e) => onChange(e, FIELDS.PHONE)} value={props.formData.phone}/><br></br>
                <label for="notes">Notes:</label><br/>
                <input type="text" id="notes" name="notes"onChange={(e) => onChange(e, FIELDS.NOTES)} value={props.formData.notes}/><br></br>
                <input type="submit" value={props.inspectMode === inspectModes.CREATE ? "Create" : "Update"}/>
            </form>
        </div>
    )
}

export default Inspect;