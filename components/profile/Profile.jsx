import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Grid } from '@material-ui/core';
import Post from './../post/Post';
import { useRouter } from 'next/router';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PersonIcon from '@mui/icons-material/Person';
import ArticleIcon from '@mui/icons-material/Article';
import Settings from '@mui/icons-material/Settings';
import { Bar } from 'react-chartjs-2';
import { options } from './graphOptions';

const randomHex = () => (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');

const Profile = ({ user, posts }) => {
    const router = useRouter();
    const src = `https://www.tinygraphs.com/spaceinvaders/${user?.username}?colors=${randomHex()}&colors=${randomHex()}`;
    const [regUser, setRegUser] = useState(null);
    const [value, setValue] = useState(router?.query?.tab === 'overview' ?
        0 : router?.query?.tab === 'posts' ? 1 : (router?.query?.tab === 'settings' && regUser?._id === user?.id)
            ? 2 : 0);

    useEffect(() => {
        if (!regUser)
            setRegUser(JSON.parse(localStorage?.getItem('profile'))?.profile?.user)
        setValue(router?.query?.tab === 'overview' ?
            0 : router?.query?.tab === 'posts' ? 1 : (router?.query?.tab === 'settings' && regUser?._id === user?.id)
                ? 2 : 0);
    }, [regUser, router?.query?.tab, user?.id]);

    const handleChange = (_, newValue) => {
        setValue(newValue);
        if (newValue === 0)
            router.push(`/${user?.username}?tab=overview`);
        else if (newValue === 1)
            router.push(`/${user?.username}?tab=posts`);
        else if (newValue === 2 && regUser?._id === user?.id)
            router.push(`/${user?.username}?tab=settings`);
    };

    const data = {
        labels: Object?.keys(user?.tagsFrequency),
        datasets: [{
            label: '# of times tags used',
            data: Object?.values(user?.tagsFrequency),
            backgroundColor: ['#0275d8'],
            borderColor: ['#292b2c'],
            borderWidth: 1
        }]
    };

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item md={4}>
                    <div style={{ textAlign: "center" }}>
                        <Image alt='pp' src={src} layout='responsive' width={300} height={300} />
                    </div>
                    <h2 style={{ color: '#636D76' }}>{user?.fullName}</h2>
                    <h4 style={{ marginTop: '-8px', color: '#535C66' }}>{user?.username}</h4>
                    <hr></hr>
                </Grid>

                <Grid item md={8}>
                    <Tabs value={value} onChange={handleChange} variant="fullWidth" className="mb-3">
                        <Tab value={0} label={
                            <div>
                                <PersonIcon style={{ marginBottom: "5px" }} />&nbsp;
                                <b style={{ letterSpacing: "1.1px", fontSize: "1.1rem" }}>Overview</b>
                            </div>}
                        />
                        <Tab value={1} label={
                            <div>
                                <ArticleIcon style={{ marginBottom: "5px" }} />&nbsp;
                                <b style={{ letterSpacing: "1.1px", fontSize: "1.1rem" }}>Ideas</b>
                            </div>}
                        />
                        {regUser?._id === user?.id && (
                            <Tab value={2} label={
                                <div>
                                    <Settings style={{ marginBottom: "5px" }} />&nbsp;
                                    <b style={{ letterSpacing: "1.1px", fontSize: "1.1rem" }}>Settings</b>
                                </div>}
                            />
                        )}
                    </Tabs>

                    {router?.query?.tab === 'overview' ? (
                        <>
                            <p id='bio'>{user?.bio}</p>
                            <hr></hr>
                            {user?.tagsFrequency && (
                                <>
                                    <Bar data={data} options={options} />
                                </>
                            )}
                        </>
                    ) : router?.query?.tab === 'posts' ? (
                        posts === 'None' ? (
                            <h6>This user has no ideas yet!</h6>
                        ) : (
                            <Grid container spacing={1}>
                                {posts?.map(post => <Post key={post.id} post={post} profileView={true} />)}
                            </Grid>
                        )
                    ) : (router?.query?.tab === 'settings' && regUser?._id === user?.id) ? (
                        <p>settings tab</p>
                    ) : (
                        <p id='bio'>{user?.bio}</p>
                    )}
                </Grid>
            </Grid>
        </div>
    );
}

export default Profile;