import React, { Component } from "react";
import { login, loggedIn } from './AuthService';

class LoginForm extends Component {
  constructor() {
    super()
    this.state = {
      username: "",
      password: ""
    }
  }

  async componentDidMount() {
    let res = await loggedIn()
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
    const res = await login(this.state.username, this.state.password)
    if (!res.token) {
      alert(res.data.non_field_errors ? (res.data.non_field_errors) : (res.data.username || res.data.password))
    } else {
      this.props.history.replace('/todos')
      window.location.reload();
    }
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSumbit}>
          <input id="username" placeholder="Username" type="text" onChange={this.handleChange} value={this.state.content} />
          <input id="password" placeholder="Password" type="password" onChange={this.handleChange} value={this.state.content} />
          <button className="btn waves-effect waves-light" type="submit" name="action">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm