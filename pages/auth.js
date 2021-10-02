import React, { useState } from 'react';
import Login from '../components/auth/Login';
import Signup from '../components/auth/Signup';
import axios from 'axios';
import Head from 'next/head';
import Router from 'next/router';
import { Paper, Grid, Button } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import setLocalStorage from './../utils/setLocalStorage';

const useStyles = makeStyles(theme => ({ paperRoot: { backgroundColor: '#0275d8' } }));

const Auth = () => {
    const classes = useStyles();
    const [haveAccount, setHaveAccount] = useState(true);

    // Login
    const [loginError, setLoginError] = useState("");
    const handleLogin = async form => {
        try {
            const { data } = await axios.post('/api/users/login', form);
            if (data?.token && data?.user) {
                setLocalStorage(data);
                Router.push('/');
            } else {
                window.location.reload();
            }
        } catch (error) {
            setLoginError(error?.response?.data?.message)
        }
    }

    // Signup
    const [signupError, setSignupError] = useState("");
    const handleSignup = async form => {
        try {
            const { data } = await axios.post('/api/users/signup', form);
            if (data?.token && data?.user) {
                setLocalStorage(data);
                Router.push('/');
            } else {
                window.location.reload();
            }
        } catch (error) {
            setSignupError(error?.response?.data?.message)
        }
    }

    return (
        <div id="auth_form">
            <Head>
                <title>Authentication</title>
            </Head>
            <Grid container spacing={0}>
                <Grid item md={6} sm={12}>
                    <Paper className="p-3" classes={{ root: classes.paperRoot }} style={{ color: 'white' }}>
                        <h2>Launchpad</h2>
                        <hr></hr>
                        <h3>Easily find the idea for your next app, and contribute with other developers</h3>
                    </Paper>
                </Grid>
                <Grid item md={6} sm={12}>
                    <Paper className="p-3">
                        {haveAccount ?
                            <Login handleLogin={handleLogin} error={loginError} /> :
                            <Signup handleSignup={handleSignup} error={signupError} />
                        }
                        <Button onClick={() => setHaveAccount(!haveAccount)} className="mt-3">
                            {haveAccount ? "Don't have an account? Sign Up" : "Already have an account? Log in"}
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}

export default Auth;