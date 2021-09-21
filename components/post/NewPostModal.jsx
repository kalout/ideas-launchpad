import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField, Button } from '@material-ui/core';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { addPost } from './../../utils/apiCalls';
import Router from 'next/router';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const NewPostModal = ({ open, handleClose }) => {
    const [form, setForm] = useState({ title: "", body: "", tags: [], status: "NEW" });
    const [error, setError] = useState('');

    const handleChange = e => {
        if (e.target.name === 'tags') setForm({ ...form, tags: e.target.value.split(',') });
        else setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = async () => {
        try {
            const res = await addPost(form);
            setForm({ title: "", body: "", tags: [], status: "NEW" });
            setError('');
            handleClose();
            if (res?.status === 200)
                Router.push('/');
        } catch (error) {
            setError(error?.response?.data?.message);
        }
    }

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
                <Typography variant="h4" component="h2">New Idea</Typography>
                <hr />
                <TextField variant="standard" name="title" label="Title" autoComplete="off"
                    onChange={handleChange} className="mb-2" fullWidth value={form?.title} />
                <small style={{ float: "right", marginTop: "-9px" }} className={form?.title?.length > 50 && 'text-danger'}>
                    {form?.title?.length} / 50
                </small>
                <TextField variant="standard" name="body" label="Body" multiline autoComplete="off"
                    onChange={handleChange} rows={6} className="mt-2 mb-2" fullWidth value={form?.body} />
                <small style={{ float: "right", marginTop: "-9px" }} className={form?.body?.length > 500 && 'text-danger'}>
                    {form?.body?.length} / 500
                </small>
                <TextField variant="standard" name="tags" label="Tags (comma separated)" autoComplete="off"
                    onChange={handleChange} className="mt-2 mb-2" fullWidth value={form?.tags} />
                <small style={{ float: "right", marginTop: "-9px" }} className={form?.tags?.length > 5 && 'text-danger'}>
                    {form?.tags?.length} / 5
                </small>
                <FormControl component="fieldset" className="mt-4 mb-2">
                    <FormLabel component="legend">Status</FormLabel>
                    <RadioGroup row value={form?.status} name="status" onChange={handleChange}>
                        <FormControlLabel value="NEW" control={<Radio color='primary' />} label="New" />
                        <FormControlLabel value="ONGOING" control={<Radio color='primary' />} label="Ongoing" />
                    </RadioGroup>
                </FormControl>
                <p className='mt-3' style={{ color: "#f50057" }}><b>{error}</b></p>
                <div className="mt-3">
                    <Button color="primary" variant="contained" onClick={handleSubmit}>
                        <AddBoxIcon />&nbsp;Submit
                    </Button>
                    &nbsp;&nbsp;
                    <Button color="secondary" variant="contained" onClick={() => {
                        setForm({ title: "", body: "", tags: [] });
                        handleClose();
                    }}>Cancel</Button>
                </div>
            </Box>
        </Modal>
    );
}

export default NewPostModal;