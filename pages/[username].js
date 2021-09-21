import React from 'react';
import Head from 'next/head';
import connectDB from './../database/connectDB';
import User from './../database/models/user';
import { Container } from '@material-ui/core';
import CircularProgress from '@mui/material/CircularProgress';
import Profile from './../components/profile/Profile';

const ProfilePage = ({ user }) => {
    console.log(user);
    return (
        <div>
            <Head>
                <title>{user?.username} ({user?.fullName})</title>
            </Head>
            {!user ? (
                <span id='centery'><CircularProgress style={{ width: '100px', height: '100px' }} /></span>
            ) : (
                <Container maxWidth='md' className='mt-4'>
                    <Profile user={user} />
                </Container>
            )}
        </div>
    );
}

export const getStaticPaths = () => ({ paths: [], fallback: true }); // no pages will be built on build time

export const getStaticProps = async context => {
    await connectDB();
    const { username } = context.params;
    const user = await User.findOne({ username: username });

    return {
        props: {
            user: {
                id: String(user?._id),
                username: user.username,
                bio: user?.bio,
                fullName: username?.fullName || ''
            }
        }
    };
}

export default ProfilePage;