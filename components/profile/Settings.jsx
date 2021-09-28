import React, { useState, useEffect } from 'react';
import { TextField, Grid, InputAdornment } from '@material-ui/core';
import LinkIcon from '@mui/icons-material/Link';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Button } from '@material-ui/core';
import Router from 'next/router';
import { editUser } from './../../utils/apiCalls';
import delLocalStorage from './../../utils/delLocalStorage';
import GitHubLogin from 'react-github-login';

const Settings = ({ user }) => {
    const [account, setAccount] = useState(user);
    const [error, setError] = useState(null);
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => setAccount(user), [user]);

    const handleChange = e => setAccount({ ...account, [e.target.name]: e.target.value });

    const handleCancel = () => {
        setPassword('');
        Router.push(`/${user?.username}`);
    };

    const handleSubmit = async () => {
        setLoading(true);
        const data = { user: account, password: password };

        try {
            await editUser(data);
            delLocalStorage();
        } catch (error) {
            setError(error.response.data.message);
        }
        setLoading(false);
    };

    return (
        <>
            <h3>Account settings</h3>
            <hr></hr>
            <div className="mt-3 mb-3">
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Username" name="username" value={account?.username} onChange={handleChange}
                            variant="filled" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Full Name" name="fullName" value={account?.fullName} onChange={handleChange}
                            variant="filled" fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Bio" name="bio" value={account?.bio} onChange={handleChange}
                            variant="filled" fullWidth multiline minRows={2} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Personal Website" fullWidth name="personal"
                            InputProps={{
                                startAdornment: <InputAdornment position="start">
                                    <LinkIcon />
                                </InputAdornment>,
                            }}
                            variant="filled" value={account?.personal} onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Twitter Account" fullWidth name="twitter"
                            InputProps={{
                                startAdornment: <InputAdornment position="start">
                                    <TwitterIcon />
                                </InputAdornment>,
                            }}
                            variant="filled" value={account?.twitter} onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            className="mt-3" type="password"
                            label="Current Password" fullWidth variant="filled"
                            value={password} onChange={e => setPassword(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <span style={{ color: '#f50057' }}><b>{error}</b></span>
                    </Grid>
                    <Grid item xs={12} style={{ textAlign: "right" }}>
                        <Button color="secondary" variant="contained" onClick={handleCancel}>
                            Cancel
                        </Button>&nbsp;
                        <Button color="primary" variant="contained" onClick={handleSubmit} disabled={loading}>
                            {loading ? 'Loading...' : 'Save Changes'}
                        </Button><br />
                        <small>After saving changes you will be logged out!</small>
                    </Grid>
                    {/* <GitHubLogin clientId="6287857b8f86b1df9081"
                    redirectUri="" 
                    onSuccess={res => console.log(res)}
                    onFailure={res => console.log(res)} /> */}
                </Grid>
            </div>
        </>
    );
}

export default Settings;