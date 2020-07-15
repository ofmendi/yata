import React, { Component } from 'react';
import { loggedIn, getProfile, logout } from '../AuthService';

export default function withAuth(AuthComponent) {
  return class AuthWrapped extends Component {
    constructor() {
      super();
      this.state = {
        user: null
      }
    }
    async componentDidMount() {
      let res = await loggedIn()
      if (!res) {
        this.props.history.replace('/login')
      }
      else {
        try {
          const profile = getProfile()
          this.setState({
            user: profile
          })
        }
        catch (err) {
          logout()
          this.props.history.replace('/login')
        }
      }
    }

    render() {
      if (this.state.user) {
        return (
          <AuthComponent history={this.props.history} user={this.state.user} {...this.props} />
        )
      }
      else {
        return null
      }
    }
  };
}

