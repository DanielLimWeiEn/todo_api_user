import React from 'react';
import ToDoForm from './ToDoForm.js';
import ToDoItem from './ToDoItem.js';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const api_url = 'http://localhost:3001/api/v1/todos';

class TodoList extends React.Component {
    constructor(props) {
        super(props);
        // items[i] = to do number i;
        this.state = {
            items: [],
            temp: 0
        };
        this.updateToDoList = this.updateToDoList.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.filterUrgent = this.filterUrgent.bind(this);
        this.filterNotUrgent = this.filterNotUrgent.bind(this);
        this.showAll = this.showAll.bind(this);
    }

    componentDidMount() {
        this.getTasks();
    }

    filterUrgent() {
        this.setState({
            items: this.state.items.filter(x => x.category === true)
        });
    }

    filterNotUrgent() {
        this.setState({
            items: this.state.items.filter(x => x.category === false)
        });
    }

    showAll() {
        this.setState({
            items: this.state.temp
        });
    }

    getTasks() {
        fetch(api_url)
        .then(response => response.json())
        .then(responseItems => {
            this.setState({
                items: responseItems,
                temp: responseItems
            })
        });
    }

    updateToDoList(item) {
        let _items = this.state.items;
        _items.push(item);
        this.setState({
            items: _items,
        });
    }

    deleteItem(item) {
        // delete remotely then delete client side.
        let delete_url = api_url + `/${item.id}`;
        fetch(delete_url, {
            method: "DELETE"
        }).then(() => {
            let _items = this.state.items;
            let index = _items.indexOf(item);
            _items.splice(index, 1);
            this.setState({
                items: _items
            });
        })
    }

    render() {
        return (
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <ToDoForm api_url={api_url} updateToDoList={this.updateToDoList}/>
                </Grid>
                <Grid container spacing={1}>
                    <Grid item xs></Grid>
                    <Grid item xs={14}>
                        <Button variant="contained"
                        color="primary" onClick={this.filterNotUrgent}>
                            Filter by Not Urgent
                        </Button>
                        <Button variant="contained"
                        color="secondary" onClick={this.filterUrgent}>
                            Filter by Urgent
                        </Button>
                        <Button variant="contained"
                        color="success" onClick={this.showAll}>
                            Show All
                        </Button>
                    </Grid>
                    <Grid item xs></Grid>
                </Grid>
                <Grid item xs={12} id="todo_list">
                    {this.state.items.map(
                        (item) => <ToDoItem
                            key={item.id}
                            item={item}
                            deleteItem={this.deleteItem}
                            updateToDoList={this.updateToDoList}
                        />
                    )}
                </Grid>
            </Grid>
        )
    }
}

export default TodoList;