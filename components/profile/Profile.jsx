import React from 'react';
import Image from 'next/image';
import { Grid } from '@material-ui/core';

const randomHex = () => (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');

const Profile = ({ user }) => {
    const src = `https://www.tinygraphs.com/spaceinvaders/${user?.username}?colors=${randomHex()}&colors=${randomHex()}`;

    return (
        <div>
            <Grid container spacing={1}>
                <Grid item xs={12} md={4}>
                    <div style={{ textAlign: "center" }}>
                        <Image alt='pp' src={src} layout='responsive' width={300} height={300} />
                    </div>
                    <h2 style={{ color: '#636D76' }}>{'user?.fullName'}</h2>
                    <h3 style={{ marginTop: '-8px', color: '#535C66' }}>{user?.username}</h3>
                </Grid>
                <Grid item xs={12} md={8}>
                    <p id='bio'>{user?.bio}</p>
                </Grid>
            </Grid>
        </div>
    );
}

export default Profile;