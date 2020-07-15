import React, { Component } from 'react';
import ListNotification from './ListNotification';
import withAuth from '../hoc/withAuth';
import axios from 'axios';

class MainNotification extends Component {
  state = {
    notifications: []
  }
  componentDidMount() {
    axios.get(`${window.location.origin}/api/notifications?all`)
      .then((res) => {
        this.setState({ notifications: res.data })
      })
  }
  render() {
    return (
      <div className="todo-app container">
        <h4 className="center">Notification's</h4>
        <ListNotification notifications={this.state.notifications} />
      </div>
    );
  }
}

export default withAuth(MainNotification)
