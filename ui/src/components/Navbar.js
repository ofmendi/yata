import React, { Component } from 'react';
import { NavLink, Link } from "react-router-dom";
import { loggedIn, logout } from './AuthService';
import axios from 'axios';


class Navbar extends Component {
  constructor() {
    super()
    this.state = {
      auth: false,
      length: 0
    }
  }

  async componentDidMount() {
    this.interval_notification = setInterval(this.getNewNotifications, 5000);

    let res = await loggedIn()
    this.setState({
      auth: res,
      length: 0
    })
  }
  componentWillUnmount() {
    clearInterval(this.interval_notification);
  }
  handleLogout = async (e) => {
    e.preventDefault();
    await logout()
    window.location.reload();
  }
  getNewNotifications = async () => {
    if (this.state.auth) {
      axios.get(`${window.location.origin}/api/notifications`).then(res => {
        this.setState({ ...this.state, length: res.data.length })
      }).catch((err) => {
        window.location.replace(`${window.location.origin}/login`)
      })
    }
  }
  render() {
    const nav = this.state.auth ? (
      <span>
        <li><NavLink to='/todos'>Todos</NavLink></li>
        <li><NavLink to='/notifications'>Notifications({this.state.length})</NavLink></li>
        <li onClick={this.handleLogout}><NavLink to='/login'>Logout</NavLink></li>
      </span>
    ) : (
        <span>
          <li><NavLink to='/login'>Login</NavLink></li>
          <li><NavLink to='/registration'>Registration</NavLink></li>
        </span>
      )
    return (
      <nav className="nav-wrapper red darken-3">
        <div className="container">
          <Link to="/" className="brand-logo">YATA</Link>
          <ul className="right">
            <li><NavLink to="/">Home</NavLink></li>
            {nav}
          </ul>
        </div>
      </nav>
    )
  }
}

export default Navbar