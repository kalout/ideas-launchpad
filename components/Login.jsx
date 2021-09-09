import React, { useState, useEffect } from 'react'
import { TextField, Button } from '@material-ui/core';

const Login = ({ handleLogin, error }) => {
    const [form, setForm] = useState({ username: "", password: "" });
    const [loading, setLoading] = useState(false);

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    useEffect(() => {
        if (error?.length > 0)
            setLoading(false);
    }, [error]);

    return (
        <div>
            <h2>Login</h2>
            <hr></hr>
            <TextField variant="standard" name="username" label="Username"
                onChange={handleChange} className="mb-2" fullWidth />
            <TextField variant="standard" name="password" type="password" label="Password"
                onChange={handleChange} className="mt-2 mb-3" fullWidth />
            <p className="text-danger">{error}</p>
            <Button color="primary" disabled={loading} onClick={() => {
                handleLogin(form);
                setLoading(true);
            }} variant="contained">
                <b>{!loading ? 'Login' : 'Loading...'}</b>
            </Button>
        </div>
    );
}

export default Login;