import React, { Component } from 'react';
import './NewTodo.css';

class NewTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.changeText = this.changeText.bind(this);
    
  }

  changeText(event) {
    this.setState({value: event.target.value});
  }
  render() {
    return (
        <div id="main">
            <form id="myForm" onSubmit={this.props.addTodo}>
                <input type="text" value={this.state.value} onChange={this.changeText} /> &emsp;
                <input type="submit" value="Submit" id="gorgeButton" /> <br/><br/>
            </form>
        </div>
    );
  }
}

export default NewTodo;