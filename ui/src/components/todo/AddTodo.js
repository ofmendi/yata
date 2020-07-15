import React, { Component } from "react";

class AddTodo extends Component {
  state = {
    content: '',
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSumbit = (e) => {
    e.preventDefault();
    const newtodo = { text: this.state.content }
    this.props.addTodo(newtodo)
    this.setState({ content: '' })
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSumbit}>
          <label htmlFor="content">Add new todo:</label>
          <input id="content" type="text" onChange={this.handleChange} value={this.state.content} />
        </form>
      </div>
    );
  }
}

export default AddTodo;