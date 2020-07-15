import React, { Component } from 'react';
import ListTodo from './ListTodo';
import AddTodo from './AddTodo';
import withAuth from '../hoc/withAuth';
import axios from 'axios';

class MainTodo extends Component {
  state = {
    todos: []
  }
  componentDidMount() {
    axios.get(`${window.location.origin}/api/todos/`)
      .then((res) => {
        this.setState({ todos: res.data })
      })
  }
  deleteTodo = (id) => {
    axios.delete(`${window.location.origin}/api/todos/${id}}/`)
      .then((res) => {
        const nTodos = this.state.todos.filter(todo => {
          return todo.id !== id
        })
        this.setState({ todos: nTodos })
      })
  }
  updateStatusTodo = (id) => {
    const utodo = this.state.todos.find((obj => obj.id === id));
    utodo.is_done = !utodo.is_done

    axios.put(`${window.location.origin}/api/todos/${id}}/`, utodo)
      .then((res) => {
        this.setState({ todos: this.state.todos })
      })
  }
  addTodo = (ntodo) => {
    axios.post(`${window.location.origin}/api/todos/`, ntodo)
      .then((res) => {
        ntodo.id = res.data.id
        let todos = [...this.state.todos, ntodo]
        this.setState({ todos })
      })
  }
  render() {
    return (
      <div className="todo-app container">
        <h4 className="center">Todo's</h4>
        <AddTodo addTodo={this.addTodo} />
        <ListTodo todos={this.state.todos} deleteTodo={this.deleteTodo} updateStatusTodo={this.updateStatusTodo} />
      </div>
    );
  }
}

export default withAuth(MainTodo)
