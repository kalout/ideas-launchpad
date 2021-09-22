import React, { useState, useEffect } from 'react'
import { TextField, Button, Grid } from '@material-ui/core';

const Signup = ({ handleSignup, error }) => {
    const [form, setForm] = useState({ username: "", password: "", confirmPassword: "", firstName: "", lastName: "" });
    const [loading, setLoading] = useState(false);

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    useEffect(() => {
        if (error?.length > 0)
            setLoading(false);
    }, [error]);

    return (
        <div>
            <h2>Signup</h2>
            <hr></hr>
            <Grid container spacing={2} className="mb-2">
                <Grid item xs={6}>
                    <TextField variant="standard" name="firstName" label="First Name"
                        onChange={handleChange} fullWidth />
                </Grid>
                <Grid item xs={6}>
                    <TextField variant="standard" name="lastName" label="Last Name"
                        onChange={handleChange} fullWidth />
                </Grid>
            </Grid>
            <TextField variant="standard" name="username" label="Username"
                onChange={handleChange} className="mb-2" fullWidth />
            <TextField variant="standard" name="password" type="password" label="Password"
                onChange={handleChange} className="mt-2 mb-2" fullWidth />
            <TextField variant="standard" name="confirmPassword" type="password" label="Confirm Password"
                onChange={handleChange} className="mt-2 mb-2" fullWidth />
            <p style={{ color: "#f50057" }}><b>{error}</b></p>
            <Button color="primary" disabled={loading} onClick={() => {
                handleSignup(form);
                setLoading(true);
            }} variant="contained">
                <b>{!loading ? 'Signup' : 'Loading...'}</b>
            </Button>
        </div>
    );
}

export default Signup;