import React, { useState } from 'react';
import { Grid, TextField, Paper, Button } from '@material-ui/core';
import Router from 'next/router';
import ChipInput from 'material-ui-chip-input';
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    input: { height: 40 }
});

const Search = withStyles(styles)(props => {
    const { classes } = props;
    const [search, setSearch] = useState({ text: '', tags: [] });

    const handleAddTag = tag => setSearch({ ...search, tags: [...search?.tags, tag] });
    const handleDeleteTag = tag => setSearch({ ...search, tags: search?.tags?.filter(t => t !== tag) });
    const handleSearch = e => setSearch({ ...search, text: e.target.value });
    const handleSubmit = () => Router.push(`/?search=${search?.text}&tags=${search?.tags?.join(',')}`);

    return (
        <Grid container spacing={2} className="mb-2">
            <Grid xs={11} item>
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
                                style={{ height: "45px", marginTop: "-5px" }}>Search</Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
            <Grid xs={1} item>
                {/* sort button */}
            </Grid>
        </Grid>
    );
});

export default Search;