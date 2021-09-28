import axios from 'axios';

let token;

if (typeof window !== 'undefined')
    token = JSON.parse(localStorage?.getItem('profile'))?.profile?.token;

const config = { headers: { Authorization: `Bearer ${token}` } };

export const getPosts = page => axios.get(`/api/posts?page=${page}`);
export const addPost = body => axios.post('/api/posts', body, config);
export const getPostProposer = id => axios.get(`/api/posts/proposer/${id}`);
export const votePost = (id, vote) => axios.patch(`/api/posts/${id}/vote`, { voteType: Number(vote) }, config);
export const delPost = id => axios.delete(`/api/posts/${id}`, config);
export const editUser = data => axios.patch('/api/users', data, config);