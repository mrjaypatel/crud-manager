import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { Button, TextField } from '@mui/material';
import axios from 'axios';
import { firstUpperCase } from './helper.js'
import { useNavigate } from 'react-router-dom';

function EditRow(props) {
    const editBlock = (props.editBlock) ? props.editBlock : [];
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

 


    const [formFields, setFormFields] = useState(props.data);


    var fields = Object.keys(formFields);




    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submit");
        console.log(formFields);
        // axios.post("https://6590255acbf74b575eca847c.mockapi.io/api/v1/crud",{name: name, age: age, email: email}).then(response => {

        // console.log(response);
        // navigate("/");
        // });
    }


    function doChange(fieldName, value) {
        setFormFields((prevData) => ({
            ...prevData,
            [fieldName]: value,
        }));
        localStorage.setItem(props.data.id + "_" + fieldName, value);
        // setFormFields();
        console.log(fieldName);
    }




    return (
        <>

            {/* {formFields} */}
            {['right'].map((anchor) => (
                <React.Fragment key={anchor}>

                    <Button onClick={toggleDrawer(anchor, true)}>Edit</Button>
                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                    >
                        <div className='row' style={{ padding: '10px', width: '500px' }}>
                            <div className='col-md-12'>
                                <h4>Edit Details</h4>
                                <form onSubmit={handleSubmit}>
                                    {
                                        fields.map((field, index) => {
                                            return (
                                                <div key={index} className="dynamic-form-element">
                                                    {(!Object.values(editBlock).includes(field)) ? <> <TextField variant="standard" name={field} value="" onChange={(e) => doChange(field, e.target.value)} label={firstUpperCase(field)} /><br /> </>:""}

                                                </div>)
                                        })
                                    }

                                    {/* <TextField id="test" label="Test" variant="standard" type='text' /><br />
                                    <TextField id="name" label="Name" variant="standard" /><br />
                                    <TextField id="age" label="Age" variant="standard" type='number' value={props.data.age} onChange={(e) => setAge(e.target.value)} /><br />
                                    <TextField id="email" label="Email" variant="standard" type='email' value={props.data.email} onChange={(e) => setEmail(e.target.value)} /><br /><br /> */}
                                    <Button variant="outlined" type='submit'>Update</Button>
                                </form>
                            </div>
                        </div>
                    </Drawer>
                </React.Fragment>
            ))}
        </>
    )
}

export default EditRow