import React from 'react';
import { Paper, Grid, Box, Typography, Button } from '@material-ui/core';
import Link from 'next/link';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const Post = ({ post }) => {
    return (
        <Grid item xs={3} md={4}>
            <Paper elevation={3}>
                <Box p={1} className="text-center">
                    <Box p={1}>
                        <Typography variant="h5" component="h2">
                            <Link href={`/post/${post?._id}`}>{post.title}</Link>
                        </Typography>
                    </Box>

                    <Box p={1}>
                        <Typography variant="h5" component="h3" display="inline" style={{ fontWeight: "600" }}>
                            {post?.upVotes?.length - post?.downVotes?.length} votes
                        </Typography>
                    </Box>

                    <Box p={1}>
                        <Button size="small" variant="contained" color="primary"><ExpandLessIcon /></Button>
                        &nbsp;
                        <Button size="small" variant="contained" color="primary"><ExpandMoreIcon /></Button>
                    </Box>
                </Box>
            </Paper>
        </Grid>
    );
}

export default Post;