import { Container } from '@material-ui/core';
import Head from 'next/head';
import Post from './../database/models/post';
import connectDB from './../database/connectDB';
import Posts from './../components/post/Posts';

const Index = ({ posts }) => {
    return (
        <>
            <Head>
                <title>Home</title>
            </Head>
            <Container maxWidth="lg" className="p-3">
                <h1>Home</h1>
                <Posts posters={posts} />
            </Container>
        </>
    );
}

export const getStaticProps = async context => {
    await connectDB();
    const page = 1, LIMIT = 12, startIndex = (Number(page) - 1) * LIMIT;
    let posts = await Post.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

    return {
        props: {
            posts: posts?.map(post => ({
                _id: String(post?._id),
                title: post?.title,
                description: post?.description,
                upVotes: post?.upVotes,
                downVotes: post?.downVotes,
                tags: post?.tags,
                createdAt: String(post?.createdAt),
                creator: post?.creator,
                status: post?.status ? post?.status : '',
                creatorUsername: post?.creatorUsername ? post?.creatorUsername : '',
            }))
        },
        revalidate: 5
    }
}

export default Index;