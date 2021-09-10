import React, { useEffect, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Router from 'next/router';

const Navbar = () => {
    const [user, setUser] = useState('');

    useEffect(() => {
        if (localStorage?.getItem('profile'))
            setUser(JSON.parse(localStorage?.getItem('profile'))?.profile?.user);
    }, []);

    return (
        <AppBar position="static" className="display-flex">
            <Container maxWidth="lg">
                <Toolbar>
                    <div style={{ flex: "1", display: "flex" }}>
                        <Typography variant="h5" id="logo" component="div" className="mt-2 cursor"
                            onClick={() => Router?.push('/')}>
                            Ideas Launchpad
                        </Typography>
                    </div>
                    {user && <Button color="inherit" className="ml-auto"><b>{user?.username}</b></Button>}
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Navbar;