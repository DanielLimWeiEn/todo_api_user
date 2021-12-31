import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { Select, MenuItem } from '@material-ui/core';

class ToDoForm extends React.Component {
    constructor(props) {
        super(props);
        let defaultTask = "";
        let defaultBody = "";
        this.state = {
            api_url: props.api_url,
            task: defaultTask,
            body: defaultBody,
            defaultTaskValue: defaultTask,
            defaultBodyValue: defaultBody,
            urgency: 0
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTaskChange = this.handleTaskChange.bind(this);
        this.handleBodyChange = this.handleBodyChange.bind(this);
        this.handleCatChange = this.handleCatChange.bind(this);
    }

    // Form Submission
    handleSubmit(event) {
        event.preventDefault();
        this.formSubmit(event.target);
    }

    async formSubmit(formData) {
        let data = new FormData(formData);
        await fetch(this.state.api_url, {
            method: "POST",
            mode: "cors",
            body: data
        }).then(response => response.json())
        .then(response => this.props.updateToDoList(response));

        this.setState({
            task: this.state.defaultTaskValue,
            body: this.state.defaultBodyValue,
            urgency: 0
        })
    }

    // Event handlers
    handleTaskChange(event) {
        this.setState({
            task: event.target.value
        });
    }

    handleBodyChange(event) {
        this.setState({
            body: event.target.value
        });
    }

    handleCatChange(event) {
        this.setState({
            urgency: event.target.value
        });
    }

    render() {
        return (
            <Grid container>
                <Grid item xs></Grid>
                <Grid item xs={10}>
                <form
                    onSubmit={this.handleSubmit}
                    id="todoForm"
                    autoComplete="off">
                        <Grid container>
                            <Grid item xs={12}>
                                <TextField
                                    id="taskInput"
                                    label="Task Description"
                                    variant="outlined"
                                    type="text"
                                    name="todo[task]"
                                    value={this.state.task}
                                    onChange={this.handleTaskChange}
                                    fullWidth/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextareaAutosize
                                    id="body_input"
                                    label="Task Body"
                                    variant="outlined"
                                    type="text"
                                    name="todo[body]"
                                    value={this.state.body}
                                    onChange={this.handleBodyChange}
                                    style={{width: "99%", borderRadius: "2px"}}
                                    minRows={3}
                                    placeholder="Describe your task..."
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Select
                                    id="category_input"
                                    variant="filled"
                                    type="select"
                                    value={this.urgency}
                                    label="Urgency"
                                    onChange={this.handleCatChange}
                                    name="todo[category]">
                                    <MenuItem value="" selected disabled hidden>Select Urgency</MenuItem>
                                    <MenuItem value={true}>Urgent</MenuItem>
                                    <MenuItem value={false}>Not Urgent</MenuItem>
                                </Select>
                            </Grid>
                            <Grid item xs={2}>
                                <Button variant="contained"
                                    color="primary"
                                    type="submit"
                                    style={{height:"100%"}}>
                                Add Task
                                </Button>
                            </Grid>
                        </Grid>
                </form>
                </Grid>
                <Grid item xs></Grid>
            </Grid>
        );
    }
}

export default ToDoForm;