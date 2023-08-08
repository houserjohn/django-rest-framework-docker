import React, { useState } from 'react';


import PageSelect from "./PageSelect";

const Pages = (props) => {
    const [pages_displayed, set_pages_displayed] = useState(1);
    const num_pages_displayed = 8;

    const pages_array = []
    for (let i = 0; i < num_pages_displayed; i++) {
        pages_array.push(pages_displayed+i)
    }

    const shift_pages_left = () => {
        set_pages_displayed(Math.max(1, pages_displayed-1))
    }

    const shift_pages_right = () => {
        set_pages_displayed(pages_displayed+1)
    }

    return (
        <div style={{
            width: "fit", 
            margin: "auto", 
            borderRadius: "0.5em", 
            borderColor:"white", 
            borderWidth: "0.1em", 
            borderStyle: "solid",
            height: "fit",
            backgroundColor: "white",
            marginTop: "0px",
            paddingTop: "0px",
            paddingBottom: "0px",
        }}>
            <button onClick={shift_pages_left} style={{ marginTop: "0px", marginBottom:"0px"}} disabled={pages_displayed === 1 ? "{true}" : ""}>
                &lt;
            </button>
            {
                pages_array.map((v,i) => 
                    <PageSelect key={i} text={v} num_pages={props.pageInfo.num_pages} page={props.pageInfo.page} setPageInfo={props.setPageInfo} setTableContents={props.setTableContents}/>
                )
            }
            <button onClick={shift_pages_right} style={{ marginTop: "0px", marginBottom:"0px"}} disabled={props.pageInfo.num_pages < pages_displayed+num_pages_displayed ? "{true}" : ""}>
                &gt;
            </button>
        </div>
    );
}

export default Pages