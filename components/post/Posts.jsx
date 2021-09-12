import React, { useState, useEffect } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import { Grid } from '@material-ui/core';
import Post from './Post';

const Posts = ({ posters }) => {
    const [posts, setPosts] = useState(posters);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);

    useEffect(() => setPosts(posters), [posters]);

    return (
        <InfiniteScroll
            style={{ overflow: "hidden" }}
            dataLength={posts?.length}
            // next={getMorePosts}
            hasMore={hasMore}
            loader={
                <div style={{ display: "flex", justifyContent: "center" }}>
                    Loading...
                </div>
            }
        >
            <Grid container spacing={2}>
                {posts?.map((p, i) => (<Post key={p?._id} post={p} />))}
            </Grid>
        </InfiniteScroll>
    );
}

export default Posts;