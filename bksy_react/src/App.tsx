import React, { useEffect, useState } from 'react';
import './App.css';
import { getTodos, addTodo, updateTodo, deleteTodo } from './API';
import { generate } from "shortid";
import { AddTodo } from "./components/AddTodo";
import { TodoItem } from "./components/TodoItem";
import Paper from "@material-ui/core/Paper";
import SearchBar from "material-ui-search-bar";

/* // Import interfaces
import { ITodo } from './interfaces'

const originalRows: ITodo[] = [

  {
    id: "45",
    projName: "Project React - Typescript",
    userName: "bob2",
    status: true
  }

] */

const App: React.FC = () => {
  
  const [rows, setRows] = useState([
    {
      id: "45",
      projName: "Project React - Typescript",
      userName: "bob2",
      isComplete: "Yes"
    }
  ]); 



  const [searched, setSearched] = useState<string>("");

  const requestSearch = (searchedVal: string) => {
  const filteredRows = rows.filter((row) => {
    return row.projName.toLowerCase().includes(searchedVal.toLowerCase());
  }); 
  setRows(filteredRows);
 };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  }; 

 /*  const [projName, setprojName] = useState('')
  const [userName, setuserName] = useState('') */

  fetch('api/users')
  .then(response => response.json())
  .then(data => console.log(data));

  fetch('api/todos')
  .then(response => response.json())
  .then(data => console.log(data)); 

  return (
    <main className='App'>
      <h1>My Todos</h1>
      <AddTodo
        onSubmit={data => {
          setRows(currentRows => [
            {
              id: generate(),
              ...data
            },
            ...currentRows
          ]);
        }}
      />
          <Paper>
       <SearchBar
      value={searched}
      onChange={(searchVal) => requestSearch(searchVal)}
      onCancelSearch={() => cancelSearch()}
    
      />     

     </Paper>  
       <TodoItem rows={rows}/>
      
  
    </main>
  )
}
  export default App;