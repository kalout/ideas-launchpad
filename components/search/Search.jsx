import React, { useState } from 'react';
import { Grid, TextField, Paper, Button, Menu, MenuItem } from '@material-ui/core';
import Router from 'next/router';
import ChipInput from 'material-ui-chip-input';
import { withStyles } from "@material-ui/core/styles";
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const styles = theme => ({
    input: { height: 40 }
});

const Search = withStyles(styles)(props => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));

    const { classes } = props;
    const [search, setSearch] = useState({ text: '', tags: [] });

    const handleAddTag = tag => setSearch({ ...search, tags: [...search?.tags, tag] });
    const handleDeleteTag = tag => setSearch({ ...search, tags: search?.tags?.filter(t => t !== tag) });
    const handleSearch = e => setSearch({ ...search, text: e.target.value });
    const handleSubmit = () => Router.push(`/?search=${search?.text}&tags=${search?.tags?.join(',')}&order_by=`);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    return (
        <Grid container spacing={1} className="mb-3">
            <Grid xs={10} item>
                <Paper elevation={1} className="p-2 pt-3">
                    <Grid container spacing={1}>
                        <Grid item xs={5}>
                            <TextField fullWidth placeholder="Search Ideas" variant="outlined"
                                InputProps={{ className: classes.input }} InputLabelProps={{ shrink: true }}
                                onChange={handleSearch} />
                        </Grid>
                        <Grid item xs={5}>
                            <ChipInput
                                style={{ paddingTop: "0" }}
                                placeholder="Search Tags"
                                InputProps={{ className: classes.input }}
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                                variant="outlined"
                                value={search.tags}
                                onAdd={tag => handleAddTag(tag)}
                                onDelete={tag => handleDeleteTag(tag)}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <Button fullWidth color="primary" variant="contained" onClick={handleSubmit}
                                style={{ height: "45px", marginTop: "-5px" }}><SearchIcon />&nbsp;
                                {matches && 'Search'}</Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
            <Grid xs={2} item>
                <Button fullWidth color="primary" variant="contained"
                    style={{ height: "45px", marginTop: "10px" }}
                    id="basic-button"
                    aria-controls="basic-menu"
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    {matches && 'order by'}&nbsp;
                    {!open ? <ArrowDropDownIcon fontSize="large" /> : <ArrowDropUpIcon fontSize="large" />}
                </Button>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                    style={{ marginTop: "50px" }}
                >
                    <MenuItem onClick={() => {
                        handleClose();
                        Router?.replace({ query: { ...Router?.query, order_by: `date_-1` } });
                    }}>Newest</MenuItem>
                    <MenuItem onClick={() => {
                        handleClose();
                        Router?.replace({ query: { ...Router?.query, order_by: `date_1` } });
                    }}>Oldest</MenuItem>
                    <MenuItem onClick={() => {
                        handleClose();
                        Router?.replace({ query: { ...Router?.query, order_by: `votes_-1` } });
                    }}>Most Votes</MenuItem>
                    <MenuItem onClick={() => {
                        handleClose();
                        Router?.replace({ query: { ...Router?.query, order_by: `votes_1` } });
                    }}>Least Votes</MenuItem>
                </Menu>
            </Grid>
        </Grid>
    );
});

export default Search;