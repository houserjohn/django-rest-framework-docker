import axios from 'axios'

const PageSelect = (props) => {
    const selectedStyle = {
        backgroundColor: "gray",
    }


    async function clickPage () {
        const res = await axios.get("http://localhost:5000/sources/page/" + props.text);
        //console.log(res);
        props.setTableContents(res.data.sources)
        props.setPageInfo({page: res.data.page, num_pages: res.data.num_pages})
    }

    return (
        <button onClick={clickPage} style={props.page === props.text ? selectedStyle : {} } disabled={ props.text > props.num_pages ? "{true}" : "" }>
            {props.text}
        </button>
    );
}

export default PageSelect;