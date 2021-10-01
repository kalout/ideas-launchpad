import React from 'react';
import connectDB from './../../database/connectDB';
import PostM from './../../database/models/post';
import Head from 'next/head';
import CircularProgress from '@mui/material/CircularProgress';
import { Container } from '@material-ui/core';
import Post from './../../components/post/Post';

const PostView = ({ post }) => {
    return (
        <>
            <Head>
                <title>{post?.title}</title>
            </Head>
            {(!post || Object?.keys(post)?.length === 0) ? (
                <span id='centery'><CircularProgress style={{ width: '100px', height: '100px' }} /></span>
            ) : (
                <Container maxWidth="md" className="mt-4">
                    <Post post={post} view={true} profileView={false} />
                </Container>
            )}
        </>
    );
}

export const getServerSideProps = async context => {
    await connectDB();
    const { postId } = context.query;
    const post = await PostM.findById(postId);

    return {
        props: {
            post: {
                _id: String(post?._id),
                title: post?.title,
                description: post?.description,
                upVotes: post?.upVotes,
                downVotes: post?.downVotes,
                tags: post?.tags,
                creator: post?.creator,
                creatorUsername: post?.creatorUsername,
                createdAt: String(post?.createdAt),
                status: post?.status
            }
        }
    }
}

export default PostView