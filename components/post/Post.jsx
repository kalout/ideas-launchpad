import React, { useState, useEffect } from 'react';
import { Paper, Grid, Typography, CircularProgress, IconButton } from '@material-ui/core';
import Link from 'next/link';
import { getPostProposer } from './../../utils/apiCalls';
import moment from 'moment';
import Popover from '@mui/material/Popover';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import RemoveIcon from '@mui/icons-material/Remove';
import { votePost, delPost } from './../../utils/apiCalls';
import DeleteIcon from '@material-ui/icons/Delete';
import Router from 'next/router'

const Post = ({ post, profileView, view }) => {
    const [userId, setUserId] = useState('');
    const [proposer, setProposer] = useState();
    const [anchorEl, setAnchorEl] = useState(null);

    const [upVotes, setUpVotes] = useState(post?.upVotes);
    const [upVoted, setUpVoted] = useState(upVotes?.filter(id => id === userId)?.length > 0);

    const [downVotes, setDownVotes] = useState(post?.downVotes);
    const [downVoted, setDownVoted] = useState(downVotes?.filter(id => id === userId)?.length > 0);

    useEffect(() => setUserId(JSON.parse(localStorage.getItem('profile'))?.profile?.user?._id), []);

    useEffect(() => {
        setUpVoted(upVotes?.filter(id => id === userId)?.length > 0);
        setDownVoted(downVotes?.filter(id => id === userId)?.length > 0);
    }, [upVotes, downVotes, userId, post]);

    const handleVote = async vote => {
        await votePost(post._id, vote);
        if (vote === 1) {
            setDownVotes(downVotes?.filter(id => id !== userId));
            setUpVotes([...upVotes, userId]);
        } else if (vote === -1) {
            setUpVotes(upVotes?.filter(id => id !== userId));
            setDownVotes([...downVotes, userId]);
        } else if (vote === 0) {
            setUpVotes(upVotes?.filter(id => id !== userId));
            setDownVotes(downVotes?.filter(id => id !== userId));
        }
    }

    const handlePopoverOpen = (event) => setAnchorEl(event.currentTarget);
    const handlePopoverClose = () => setAnchorEl(null);
    const open = Boolean(anchorEl);

    const handleHover = async () => !proposer && setProposer((await getPostProposer(post?.creator))?.data);

    const handleClick = tag => Router.push(`/?tags=${tag}`);

    const handleDelete = async post => {
        try {
            await delPost(post._id);
            Router.push(`/${post?.creatorUsername}`);
        } catch (error) {
            console.log(error);
            console.log(error?.response?.data?.message);
        }
    };

    return (
        <>
            <Grid item xs={12} md={(profileView || view) ? 12 : 4}>
                <Paper elevation={3} style={{ padding: "15px" }} onMouseOver={handleHover}>
                    <Grid container>
                        <Grid item xs={9}>
                            <Typography variant="h5" component="h2">
                                <Link href={`/post/${post?._id}`}>{post.title}</Link>
                            </Typography>
                        </Grid>
                        <Grid item xs={3} style={{ textAlign: "right" }}>
                            <Chip label={post?.status} color={post?.status === 'NEW' ? 'warning' : 'primary'} variant="outlined" />
                            {(profileView && userId === post?.creator) && (
                                <IconButton style={{ color: "#f50057", margin: "-10px", marginLeft: "-5px" }} onClick={() => handleDelete(post)}>
                                    <DeleteIcon />
                                </IconButton>
                            )}
                        </Grid>
                    </Grid>

                    <hr />

                    <Typography variant="body1" component="pre" display="inline">
                        {!view ? (
                            <>
                                {post?.description?.substring(0, 200)?.replace(/(^[ \t]*\n)/gm, "")}
                                {post?.description?.length > 200 ? ' ...' : ''}
                            </>
                        ) : (
                            <>
                                {post?.description}
                            </>
                        )}
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
                                <Button size="small" variant="contained" color="primary" className='action-btn'
                                    disabled={upVoted} onClick={() => handleVote(1)}>
                                    <ExpandLessIcon />
                                </Button>&nbsp;
                                <Button size="small" variant="contained" color="primary" className='action-btn'
                                    disabled={!upVoted && !downVoted} onClick={() => handleVote(0)}>
                                    <RemoveIcon />
                                </Button>&nbsp;
                                <Button size="small" variant="contained" color="primary" className='action-btn'
                                    disabled={downVoted} onClick={() => handleVote(-1)}>
                                    <ExpandMoreIcon />
                                </Button>
                            </Grid>
                            <Grid item xs={4} style={{ textAlign: "right" }}>
                                <Typography variant="subtitle1" style={{ fontWeight: "bold", color: "rgb(161, 161, 161)" }}
                                    component="p">
                                    {upVotes?.length - downVotes?.length} Votes
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
                                    <Link href={`/${post?.creatorUsername}?tab=overview`}>{post?.creatorUsername}</Link>
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