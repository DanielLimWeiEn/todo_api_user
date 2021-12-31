import logo from './logo.svg';
import './App.css';
import ToDoList from './ToDoList/ToDoList.js';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  apptitle: {
    textAlign: "center"
  }
})

function App() {
  const classes = useStyles();
  return (
    <div className="App">
      <header className="App-header">
        <Typography variant="h1" className={classes.apptitle}>To Do Stream</Typography>
        <hr />
        <ToDoList />
      </header>
    </div>
  );
}

export default App;
