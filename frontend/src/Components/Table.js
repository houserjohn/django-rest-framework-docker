import React from 'react';
import Item from "./Item";

const Table = (props) => {
    return (
        <div style={{borderRadius: "1em", borderColor:"gray", borderWidth: "0.1em", borderStyle: "solid"}}>
            <table style={{width: "100%"}}>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Organization</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Notes</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    props.data.map((v, i) => (<Item 
                        key={v.id} 
                        data={v} 
                        setInspectVisible={props.setInspectVisible} 
                        inspectVisible={props.inspectVisible}
                        formData={props.formData}
                        setFormData={props.setFormData}
                        inspectMode={props.inspectMode}
                        setInspectMode={props.setInspectMode}
                        setTableContents={props.setTableContents}
                        tableContents={props.tableContents}
                    />))
                }
            </tbody>
            </table>
        </div>
    );
}

export default Table;