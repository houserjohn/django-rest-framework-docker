import React, { useState, useEffect } from 'react';
import Table from './Table';
import Button from './Button';
import Inspect from './Inspect';
import Pages from './Pages';
import axios from 'axios';
import { inspectModes } from '../Consts';

const Dashboard = () => {

    const [tableContents, setTableContents] = useState([])
    const [pageInfo, setPageInfo] = useState({
        page: 1, num_pages: 1
    })
    const [inspectVisible, setInspectVisible] = useState(false)
    const [inspectMode, setInspectMode] = useState(inspectModes.CREATE)

    const [formData, setFormData] = useState({
        id: "",
        name: "",
        organization: "",
        email: "",
        phone: "",
        notes: "",
    });

    async function getData() {
        const res = await axios.get("http://localhost:5000/sources/page/1");
        //console.log(res);
        setTableContents(res.data.sources)
        setPageInfo({page: res.data.page, num_pages: res.data.num_pages})
    }
    
    useEffect(() => {
        getData();
    }, []);


    function addNewSource() {
        setInspectMode(inspectModes.CREATE);
        setInspectVisible(true);
    }

    return (
        <div>
            <Inspect 
                display={inspectVisible} 
                setDisplay={setInspectVisible} 
                formData={formData} 
                setFormData={setFormData}
                inspectMode={inspectMode}
                setInspectMode={setInspectMode}
                setTableContents={setTableContents}
                tableContents={tableContents}
            />
            <div style={{width: "70%", margin: "auto"}}>
                <Button onClick={addNewSource}>Add source</Button>
                <Table 
                    data={tableContents} 
                    setInspectVisible={setInspectVisible} 
                    inspectVisible={inspectVisible}
                    formData={formData}
                    setFormData={setFormData}
                    inspectMode={inspectMode}
                    setInspectMode={setInspectMode}
                    setTableContents={setTableContents}
                    tableContents={tableContents}
                />
                <Pages pageInfo={pageInfo} setPageInfo={setPageInfo} setTableContents={setTableContents}/>
            </div>
        </div>
    );
}

export default Dashboard