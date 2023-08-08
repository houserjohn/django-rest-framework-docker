import React from 'react';
import axios from 'axios';

import { inspectModes } from '../Consts';

const Item = (props) => {

    async function deleteItem() {
        await axios.delete('//localhost:5000/sources/delete/'+props.data.id);  
        let tableContentsCopy = props.tableContents.slice()
        tableContentsCopy = tableContentsCopy.filter(v => v.id !== props.data.id)
        props.setTableContents(tableContentsCopy)
        console.log("deleted item with id "+ props.data.id)      
    }

    async function inspectItem() {
        props.setInspectMode(inspectModes.UPDATE);
        props.setFormData({
            id: "loading...",
            name: "loading...",
            organization: "loading....",
            email: "loading...",
            phone: "loading...",
            notes: "loading...",
        });
        props.setInspectVisible(true);
        const res = await axios.get('//localhost:5000/sources/view/'+props.data.id+'/');
        console.log(res);
        props.setFormData({
            id: res.data.id,
            name: res.data.name,
            organization: res.data.organization,
            email: res.data.email,
            phone: res.data.phone,
            notes: res.data.notes,
        });
    }

    return (
        <tr>
            <td>{props.data.id}</td>
            <td>{props.data.name}</td>
            <td>{props.data.organization}</td>
            <td>{props.data.email}</td>
            <td>{props.data.phone}</td>
            <td>{props.data.notes}</td>
            <td><button onClick={inspectItem}>View</button></td>
            <td><button onClick={deleteItem}>Delete</button></td>
        </tr>
    );
}

export default Item;