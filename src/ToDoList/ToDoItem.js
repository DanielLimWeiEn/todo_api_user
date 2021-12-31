import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import { Typography, Chip } from '@material-ui/core';
import ToDoForm2 from './ToDoForm2.js';

const useStyles = makeStyles({
    root: {
        height: "auto",
        padding: "2em",
        margin: "1em"
    },
    divider: {
        width: "25%",
        margin: "1em"
    },
    paper: {
        margin: "1em",
        padding: "2em",
        textAlign: "justify"
    },
    heading: {
        textAlign: "center"
    },
    todobody: {
        padding: "1em"
    },
})

export default function ToDoItem(props) {
    const classes = useStyles();
    function handleDelete() {
        props.deleteItem(props.item);
    }
    return (
        <Grid container spacing={0}>
            <Grid item xs={1}></Grid>
            <Grid item xs={10}>
                <Paper elevation={10} className={classes.paper}>
                    <Typography variant="h4" className={classes.heading}>
                       {props.item.task} 
                    </Typography>
                    <hr />
                    <p />
                    <Chip
                    variant="outlined"
                    color={props.item.category ? "secondary" : "primary"}
                    label={props.item.category ? "urgent" : "not urgent"}
                    />

                    <div className={classes.todobody}>
                        <Typography variant="body1">
                            {props.item.body} 
                        </Typography>
                    </div>
                
                    <hr />
                    <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        startIcon={<DeleteIcon />}
                        onClick={handleDelete}>
                            Delete
                    </Button>
                    <p />
                    <ToDoForm2 item={props.item} updateToDoList={props.updateToDoList}/>
                </Paper>
            </Grid>
        </Grid>
    );
}
