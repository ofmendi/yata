import axios from 'axios';

const base = window.location.origin

export const login = async (username, password) => {
  try {
    let res = await axios.post(`${base}/api/login/`, {
      username,
      password
    })
    return res.data
  } catch (err) {
    return err.response
  }
};

export const register = async (username, password, email) => {
  try {
    let res = await axios.post(`${base}/api/registration/`, {
      username,
      password,
      email
    })
    return res.data
  } catch (err) {
    return err.response
  }
};

export const loggedIn = async () => {

  try {
    let result = await axios.get(`${base}/api/whoami/`)
    if (result.status === 200) {
      sessionStorage.setItem('payload', JSON.stringify(result.data.message))
      return true
    }
  } catch (err) {
    sessionStorage.removeItem('payload')
    return false
  }
};

export const logout = async () => {
  sessionStorage.removeItem('payload');
  try {
    let result = await axios.get(`${base}/api/logout/`)
    if (result.status === 200) {
      return true
    }
  } catch (err) {
    return false
  }
};

export const getProfile = () => {
  return JSON.parse(sessionStorage.getItem('payload'))
};
