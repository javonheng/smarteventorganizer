import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import Auth from '../Auth'
import '../css/LoginPage.css'
import styled from 'styled-components'

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #000b4f;
  text-shadow: 2px 3px 5px #6d6d6d;

  &:hover, &:link, &:visited, {
    text-decoration: none;
    color: #20368f;
  }
`;

class LoginLanding extends Component {
  constructor() {
    super()
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value })
  }

  login = () => {
    Auth.authenticate();
    this.props.history.push('/welcomepage')
  }

  onSubmit = e => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    }
    console.log(userData);

    axios.post("http://localhost:4000/userslogin/login", userData)
      .then(res => {if (res.data.success === true) {
        console.log(res.data)
        this.login()
      }})
      .catch(err => alert("Wrong Password!"))
  }

  render() {
    const { errors } = this.state

    return (
      <div>

        <form noValidate onSubmit={this.onSubmit}>
          <div style={{margin: "auto",}}>
            <label htmlFor="email">Email: </label>
            <input
              onChange={this.onChange}
              value={this.state.email}
              error={errors.email}
              id="email"
              type="email"
              className="input"
            />
          </div>

          <div>
            <label htmlFor="password">Password: </label>
            <input
              onChange={this.onChange}
              value={this.state.password}
              error={errors.password}
              id="password"
              type="password"
              className="input"
            />
          </div><br />

          <div>
            <button
              type="submit"
              className="loginbutton"
            >
              Login
            </button>
          </div>
        </form>

        <div>
          <p>
            Don't have an account? <StyledLink to="/register"><i>Register</i></StyledLink>
          </p>
        </div>

      </div>
    );
  }
}
export default LoginLanding;
