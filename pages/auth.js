import React, { useState } from 'react';
import Login from './../components/Login';
import Signup from './../components/Signup';
import axios from 'axios';
import Head from 'next/head';
import Router from 'next/router';
import { Paper, Grid, Button } from '@material-ui/core';
import setLocalStorage from './../utils/setLocalStorage';

const Auth = () => {
    const [haveAccount, setHaveAccount] = useState(true);

    // Login
    const [loginError, setLoginError] = useState("");
    const handleLogin = form => axios.post('/api/users/login', form)
        .then(({ data }) => {
            setLocalStorage(data);
            Router.push('/');
        })
        .catch(error => setLoginError(error?.response?.data?.message));

    // Signup
    const [signupError, setSignupError] = useState("");
    const handleSignup = form => axios.post('/api/users/signup', form)
        .then(({ data }) => {
            setLocalStorage(data);
            Router.push('/');
        })
        .catch(error => setSignupError(error?.response?.data?.message));

    return (
        <div id="auth_form">
            <Head>
                <title>Authentication</title>
            </Head>
            <Grid container spacing={2}>
                <Grid item md={6} sm={12}>
                    <h1>Auth</h1>
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