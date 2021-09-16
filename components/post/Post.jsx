import React, { useState } from 'react';
import { Paper, Grid, Typography, Avatar, CircularProgress } from '@material-ui/core';
import Link from 'next/link';
import { getPostProposer } from './../../utils/apiCalls';
import moment from 'moment';
import Popover from '@mui/material/Popover';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const Post = ({ post }) => {
    const [proposer, setProposer] = useState();
    const [anchorEl, setAnchorEl] = useState(null);

    const handlePopoverOpen = (event) => setAnchorEl(event.currentTarget);
    const handlePopoverClose = () => setAnchorEl(null);
    const open = Boolean(anchorEl);

    const handleHover = async () => {
        if (!proposer) {
            const { data } = await getPostProposer(post?.creator);
            setProposer(data);
        }
    }

    return (
        <>
            <Grid item xs={12} md={4}>
                <Paper elevation={3} style={{ padding: "15px" }} onMouseOver={handleHover}>
                    <Typography variant="h5" component="h2">
                        <Link href={`/post/${post?._id}`}>{post.title}</Link>
                    </Typography>
                    <hr />

                    <Typography variant="body1" component="p" display="inline">
                        {post?.description?.substring(0, 200)}{post?.description?.length > 200 ? ' ...' : ''}
                    </Typography>

                    <div className="mt-3">
                        <Grid container>
                            <Grid item xs={6}>
                                <Typography variant="subtitle1" style={{ fontWeight: "bold", color: "rgb(161, 161, 161)" }}
                                    component="p">Proposer :&nbsp;
                                    <span className="proposer" aria-owns={open ? 'mouse-over-popover' : undefined}
                                        aria-haspopup="true"
                                        onMouseEnter={handlePopoverOpen}
                                        onMouseLeave={handlePopoverClose}
                                    >
                                        {post?.creatorUsername}
                                    </span>
                                </Typography>
                            </Grid>
                            <Grid item xs={6} style={{ textAlign: "right" }}>
                                <Typography variant="subtitle1" style={{ fontWeight: "bold", color: "rgb(161, 161, 161)" }}
                                    component="p">
                                    {moment(post?.createdAt)?.format('DD/MM/YYYY')?.split('/')?.join(' / ')}
                                </Typography>
                            </Grid>
                        </Grid>
                    </div>
                </Paper>
            </Grid>

            <Popover
                id="mouse-over-popover"
                sx={{
                    pointerEvents: 'none',
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
            >
                <div style={{ padding: "15px", maxWidth: "400px" }}>
                    {!proposer ?
                        <CircularProgress size={20} /> :
                        <>
                            <Typography variant="h6" component="h5">{proposer?.username}</Typography>
                            <hr></hr>
                            <Typography variant="body1" component="p">{proposer?.bio}</Typography>
                        </>
                    }
                </div>
            </Popover>
        </>
    );
}

export default Post;