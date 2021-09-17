import React, { useState } from 'react';
import { Paper, Grid, Typography, Avatar, CircularProgress } from '@material-ui/core';
import Link from 'next/link';
import { getPostProposer } from './../../utils/apiCalls';
import moment from 'moment';
import Popover from '@mui/material/Popover';
import Chip from '@mui/material/Chip';
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

    const handleClick = tag => console.log(tag);

    return (
        <>
            <Grid item xs={12} md={4}>
                <Paper elevation={3} style={{ padding: "15px" }} onMouseOver={handleHover}>
                    <Grid container>
                        <Grid item xs={9}>
                            <Typography variant="h5" component="h2">
                                <Link href={`/post/${post?._id}`}>{post.title}</Link>
                            </Typography>
                        </Grid>
                        <Grid item xs={3} style={{ textAlign: "right" }}>
                            <Chip label={post?.status} color={post?.status === 'NEW' ? 'warning' : 'primary'} variant="outlined" />
                        </Grid>
                    </Grid>

                    <hr />

                    <Typography variant="body1" component="p" display="inline">
                        {post?.description?.substring(0, 200)}{post?.description?.length > 200 ? ' ...' : ''}
                    </Typography>

                    <div className="mt-3">
                        {post?.tags?.map((tag, index) => (
                            <span key={index} onClick={() => handleClick(tag)}>
                                <Chip label={tag} className="tag" style={{ marginBottom: "5px", marginRight: "5px" }} />
                            </span>
                        ))}
                    </div>

                    <div className="mt-3">
                        <Grid container>
                            <Grid item xs={8}>
                                buttons hon
                            </Grid>
                            <Grid item xs={4} style={{ textAlign: "right" }}>
                                <Typography variant="subtitle1" style={{ fontWeight: "bold", color: "rgb(161, 161, 161)" }}
                                    component="p">
                                    {post?.upVotes - post?.downVotes} Votes
                                </Typography>
                            </Grid>
                        </Grid>
                    </div>

                    <hr></hr>

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
                </Paper>
            </Grid>

            <Popover
                id="mouse-over-popover" sx={{ pointerEvents: 'none' }} open={open} anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                onClose={handlePopoverClose} disableRestoreFocus
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