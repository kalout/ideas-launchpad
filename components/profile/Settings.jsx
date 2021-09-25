import React, { useState, useEffect } from 'react';
import { TextField, Grid, InputAdornment } from '@material-ui/core';
import LinkIcon from '@mui/icons-material/Link';
import TwitterIcon from '@mui/icons-material/Twitter';

const Settings = ({ user }) => {
    const [account, setAccount] = useState(user);
    const [error, setError] = useState(false);
    const [password, setPassword] = useState('');

    const handleChange = e => setAccount({ ...account, [e.target.name]: e.target.value });

    useEffect(() => setAccount(user), [user]);

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
                </Grid>
            </div>
        </>
    );
}

export default Settings;