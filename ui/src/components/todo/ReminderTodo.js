
import React, { Component } from 'react';
import { DateTimePicker } from '@progress/kendo-react-dateinputs'
import axios from 'axios';
import withAuth from '../hoc/withAuth';


class ReminderTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: new Date(),
      todo: {}
    };
  }

  async componentDidMount() {
    await axios.get(`${window.location.origin}/api/todos/${this.props.match.params.id}/`).then((res) => {
      this.setState({
        ...this.state,
        todo: res.data
      });
    }).catch((err) => {
      alert(err.response)
    })
  }

  handleChange = (event) => {
    this.setState({
      ...this.state,
      value: event.target.value
    });
  }

  handleClick = async () => {
    const reminder = {
      time: this.state.value,
      todo_id: this.state.todo.id
    }
    console.log(reminder)
    await axios.post(`${window.location.origin}/api/reminder/`, reminder).then((res) => {
      alert(res.data.message)
    })
    this.props.history.replace('/todos')
  }

  render() {
    return (
      <div>
        <div className="container">
          <h4 className="center">Reminder</h4>
          <p className="center">Todo: {this.state.todo.text}</p>
          <div className="col-md-6 center">
            <DateTimePicker
              id="picker"
              onChange={this.handleChange}
              value={this.state.value}
            />
            <span> </span>
            <button className="btn waves-effect waves-light" onClick={() => this.handleClick()} type="button" name="action">Remind</button>
          </div>

        </div>
      </div>
    )

  };
}


export default withAuth(ReminderTodo);