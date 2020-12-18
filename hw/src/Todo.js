import React, { Component } from 'react';
import './Todo.css';

class Todo extends Component {
  constructor(props){
    super(props);
    this.state={
      buttonText: "Complete"
    }
    this.completeTodo = this.completeTodo.bind(this);
  }

  
  completeTodo(event) {
      let thisID = event.target.parentNode.id;
      let data = {
        completed: true
      }
      let self = this;
      let xhr = new XMLHttpRequest();
      xhr.open("PUT", "https://cse204.work/todos/"+thisID, true);
      xhr.setRequestHeader("Content-type", "application/json");
      xhr.setRequestHeader("x-api-key","caf5f6-c59e05-1eb7f6-0dd5fe-9d1d23");
      xhr.send(JSON.stringify(data));
      let json_obj = false;
      xhr.onload = function(e){
        if (xhr.readyState===4){
          if (xhr.status===200){
            console.log(xhr.responseText);
            json_obj = JSON.parse(xhr.responseText);
            console.log(json_obj);
            self.setState({
              buttonText: "Completed"
            });
        }else{
          console.error(xhr.statusText);
        }
      }
    }
  }

  render() {
    
    return (
        <div id={this.props.id} className="todo">
            <p>{this.props.text}</p>
            <button className="complete_buttons" onClick={this.completeTodo}>{this.state.buttonText}</button>
            <button className="delete_buttons" onClick={this.props.removeDeletedTodo}>Delete</button>
      </div>
    );
  }
}

export default Todo;