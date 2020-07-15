import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import Navbar from './Navbar';
import Home from './Home';
import LoginForm from './LoginForm';
import MainTodo from './todo/MainTodo';
import RegistrationFrom from './RegistrationFrom';
import MainNotification from './notification/MainNotification';
import ReminderTodo from './todo/ReminderTodo';


class router extends Component {

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Home} />
          <Route exact path="/todos" component={MainTodo} />
          <Route exact path="/todos/:id" component={ReminderTodo} />
          <Route path="/notifications" component={MainNotification} />
          <Route path="/login" component={LoginForm} />
          <Route path="/registration" component={RegistrationFrom} />
        </div>
      </BrowserRouter>
    );
  }
}

export default router;
