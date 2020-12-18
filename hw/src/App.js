import React, { Component } from 'react';
import './App.css';
import Todo from './Todo';
import NewTodo from './NewTodo';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      todos: []
    };
    this.removeDeletedTodo = this.removeDeletedTodo.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.sortTodo = this.sortTodo.bind(this);
  }
  removeDeletedTodo(event){
    let thisID = event.target.parentNode.id;
    let remainingTodos = this.state.todos.filter((todo) => {
      // Looping through all todos, if the id of the current todo DOES NOT equal the id of the todo we want to delete, keep it
      if (todo.id !== thisID) {
        return todo;
      }
    });
    this.setState({todos: remainingTodos});
    
    let xhr = new XMLHttpRequest();
    xhr.open("DELETE", "https://cse204.work/todos/"+thisID, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.setRequestHeader("x-api-key", "caf5f6-c59e05-1eb7f6-0dd5fe-9d1d23");
    xhr.send();
    xhr.onload = function(e){
      if (xhr.readyState===4){
        if (xhr.status===200){
        }else{
          console.error(xhr.statusText);
        }
      }
    }
  }
  addTodo(event){
    event.preventDefault();
    console.log(event.target.id);
    let takeText = event.target.childNodes[0].value;
    if (takeText===""){
        alert("Please input the text body of the new ToDo before you hit SUBMIT");
    }else{
      var data = {
          text: takeText
      }
    }
    let self = this;
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "https://cse204.work/todos", true);

    xhr.setRequestHeader("Content-type", "application/json");
    xhr.setRequestHeader("x-api-key", "caf5f6-c59e05-1eb7f6-0dd5fe-9d1d23");
    xhr.send(JSON.stringify(data));
    xhr.onload = function(e){
      if (xhr.readyState===4){
        if (xhr.status===200){
          let todo = JSON.parse(this.responseText);
          console.log(todo);
         
          self.setState({
            todos: [todo, ...self.state.todos]
          });
          /* if (this.state.todos){
            this.setState({todos: todo});
          }
          else{
            let newArr = this.state.todos;
            newArr.push(todo);
            console.log(this.id);
            this.setState({todos:newArr});
          } */
          
        }else{
          console.error(xhr.statusText);
        }
      }
    }
  }

  componentDidMount(){
    //Make initial AJAX call to list todos
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "https://cse204.work/todos", true);
    xhr.setRequestHeader("x-api-key","caf5f6-c59e05-1eb7f6-0dd5fe-9d1d23");
    xhr.send();
    let json_obj = false;
    xhr.onload = function(e){
      if (xhr.readyState===4){
        if (xhr.status===200){
          console.log(xhr.responseText);
          json_obj = JSON.parse(xhr.responseText);
          this.setState ({todos: json_obj});
        }else{
          console.error(xhr.statusText);
        }
      }
    }.bind(this);
  }

  sortTodo(){
    this.state.todos.sort(function (a, b) {
      return a.text.localeCompare(b.text);
    })
    
    
  }


  render() {
    return (
      <div className="App">
        <h1>Yiqing Zhang's ToDo App</h1>
        <section id="list">
          <button className="sort" onClick={this.sortTodo}>Click to sort todos</button>
          <NewTodo addTodo={this.addTodo}/>
          {
            this.state.todos.map((todo) => 
            <Todo key={todo.id} id={todo.id} text={todo.text} removeDeletedTodo={this.removeDeletedTodo}/>)
          }
        </section>
      </div>
    );
  }
}

export default App;
