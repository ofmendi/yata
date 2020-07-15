import React, { Component } from "react";
import { loggedIn, register } from './AuthService';

class RegistrationFrom extends Component {
  constructor() {
    super()
    this.state = {
      username: "",
      password: "",
      email: ""
    }
  }

  async componentDidMount() {
    const res = await loggedIn()
    if (res)
      this.props.history.replace('/');
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSumbit = async (e) => {
    e.preventDefault();
    const res = await register(this.state.username, this.state.password, this.state.email)
    if (!res.message) {
      alert(res.data.non_field_errors ? (res.data.non_field_errors) : (res.data.username || res.data.password || res.data.email))
    } else {
      alert(res.message)
      this.props.history.replace('/login')
      window.location.reload();
    }
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSumbit}>
          <input id="username" placeholder="Username" type="text" onChange={this.handleChange} value={this.state.content} />
          <input id="password" placeholder="Password" type="password" onChange={this.handleChange} value={this.state.content} />
          <input id="email" placeholder="E-Mail" type="email" onChange={this.handleChange} value={this.state.content} />
          <button className="btn waves-effect waves-light" type="submit" name="action">Register</button>
        </form>
      </div>
    );
  }
}

export default RegistrationFrom