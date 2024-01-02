import React, { useEffect, useState } from 'react'
import TableRow from './TableRow';
import axios from 'axios'
import { Button, TextField } from '@mui/material';
import { firstUpperCase } from './helper.js'
import './style.css'
import Drawer from '@mui/material/Drawer';
function CrudManager(props) {
    const TableHeaders = props.data.labels;
    const readBlock = props.data.readBlock;
    const editBlock = props.data.editBlock;
    const createBlock = props.data.createBlock;


    const manage = props.manage;
    const [apiData, setApiData] = useState([]);
    const [dataKeys, setDataKeys] = useState([]);
    const header = { "Access-Control-Allow-Origin": "*" }
    function getData() {

        axios.get(props.api, header).then((result) => {
            setDataKeys(Object.keys(result.data[0]));
            setApiData(result.data);
        }).catch((err) => {
            console.error(err);
        });
    }

    useEffect(() => {
        getData();
    }, [])

    function allowedToCreate(data) {
        return !Object.values(createBlock).includes(data);
    }

    function allowedToRead(data) {
        return !Object.values(readBlock).includes(data);
    }

    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };


    return (
        <div className='row'>

            {['right'].map((anchor) => (
                <React.Fragment key={anchor}>

                    <Button onClick={toggleDrawer(anchor, true)}>Create Record</Button>
                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                    >
                        <div className='row' style={{ padding: '10px', width: '500px' }}>
                            <div className='col-md-12'>
                                <h4>Create New Record</h4>
                                <form>
                                    {dataKeys.map((frmData, index) => {
                                        return (allowedToCreate(frmData)) ? (<div className='dynamic-form-element'><TextField key={index} label={firstUpperCase(frmData)} style={{ width: '100%' }} variant="standard" /></div>) : ""
                                    })}
                                    <Button variant='outlined' className='success'>Create New Record</Button>
                                </form>
                            </div>
                        </div>
                    </Drawer>
                </React.Fragment>
            ))}

            <div className='col-md-12'>
                <table className='table'>
                    <thead>
                        <tr>
                            {TableHeaders.map((data, index) => {

                                return (allowedToRead(data)) ? (<th key={index}>{data}</th>) : ""
                            })}
                            {
                                (manage) ? <><th>Remove</th><th>Edit</th></> : <></>
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            apiData.map((data, index) => {
                                return (<TableRow data={data} key={index} title={index} manage={manage} editBlock={editBlock} readBlock={readBlock} />)
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default CrudManager