import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import EditIcon from '@material-ui/icons/Edit';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import {Select, MenuItem} from "@material-ui/core";

class ToDoForm2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            update: "",
            body: "",
            urgency: 0
        };
        this.handleUpdate = this.handleUpdate.bind(this);
        this.updateForm = this.updateForm.bind(this);
        this.toggle = this.toggle.bind(this);
        this.handleUpdateBody = this.handleUpdateBody.bind(this);
        this.handleUpdateChange = this.handleUpdateChange.bind(this);
        this.handleCatChange = this.handleCatChange.bind(this);
    }
    // Event handlers
    toggle() {
        this.setState({
            show: !this.state.show
        });
    }

    handleUpdateChange(event) {
        this.setState({
            update: event.target.value
        });
    }

    handleUpdateBody(event) {
        this.setState({
            body: event.target.value
        });
    }

    handleCatChange(event) {
        this.setState({
            urgency: event.target.value
        });
    }

    // Form Submissions
    handleUpdate(event) {
        event.preventDefault();
        this.updateForm(event.target);
    }

    async updateForm(formData) {
        let data = new FormData(formData);
        let update_url = `http://localhost:3001/api/v1/todos/${this.props.item.id}`;
        fetch(update_url, {
            method: "PATCH",
            mode: "cors",
            body: data
        }).then(response => response.json())
        .then(response => this.props.updateToDoList(response));

        this.setState({
            update: "",
            body: "",
            urgency: 0
        });
    }

    render() {
        return <div>
            <Button onClick={this.toggle} variant="contained"
            color="success" size="small" startIcon={<EditIcon />}>
                Edit
            </Button>
            <p />
            <div>
            {this.state.show && (
                <Grid container>
                    <Grid item xs={10}>
                        <form onSubmit={this.handleUpdate}
                        id="todoForm2" autoComplete="off">
                            <Grid container>
                                <Grid item xs={12}>
                                    <TextField name="todo[task]"
                                        value={this.state.update}
                                        onChange={this.handleUpdateChange}
                                        id="updateInput"
                                        label="Update Description"
                                        type="text"
                                        variant="outlined"
                                        fullWidth/>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextareaAutosize name="todo[body]"
                                        value={this.state.body}
                                        onChange={this.handleUpdateBody}
                                        id="updateBody"
                                        label="Task Body"
                                        type="text"
                                        variant="outlined"
                                        placeholder="Update Body..."
                                        style={{
                                            width: "99%",
                                            borderRadius: "2px"
                                        }}
                                        minRows={3}/>
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
                                        <MenuItem value="" selected disabled hidden>Update Urgency</MenuItem>
                                        <MenuItem value={true}>Urgent</MenuItem>
                                        <MenuItem value={false}>Not Urgent</MenuItem>
                                    </Select>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button variant="contained"
                                    color="success"
                                    size="small"
                                    type="submit">
                                        Update
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                </Grid>)}
            </div>
        </div>
    }
}

export default ToDoForm2;