import axios from 'axios';

let token;

if (typeof window !== 'undefined')
    token = JSON.parse(localStorage?.getItem('profile'))?.profile?.token;

const config = {
    headers: {
        Authorization: `Bearer ${token}`
    }
};

export const addPost = body => axios.post('/api/posts', body, config);