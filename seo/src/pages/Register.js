import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import styled from 'styled-components'
import '../css/Register.css'

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #000b4f;
  text-shadow: 2px 3px 5px #6d6d6d;

  &:hover, &:link, &:visited, {
    text-decoration: none;
    color: #20368f;
  }
`;

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  }

  onSubmit = e => {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    }
    console.log(newUser)
    axios.post("https://smarteventorganizer.herokuapp.com/userslogin/register", newUser)
      .then(res => console.log(res.data))
    alert("Your account has been successfully created!")
    window.location = '/'
  }

  routeChangeBack = () => {
    this.props.history.push('/')
  }

  render() {
    const { errors } = this.state
    return (
      <div>
      <div id="mainregister">

        <div>
          <h2>
            Register with Us
          </h2>
          <p>
            Already have an account? <StyledLink to="/">Log in</StyledLink>
          </p>
        </div>

        <form noValidate onSubmit={this.onSubmit}>
        <table border="0">
          <tbody>
          <tr>
            <td align="right">
              <label htmlFor="name">Name:</label>
            </td>
            <td>
              <input
                onChange={this.onChange}
                value={this.state.name}
                error={errors.name}
                id="name"
                type="text"
                className="input"
              />
            </td>
          </tr>

          <tr>
            <td align="right">
              <label htmlFor="email">Email:</label>
            </td>
            <td>
              <input
                onChange={this.onChange}
                value={this.state.email}
                error={errors.email}
                id="email"
                type="email"
                className="input"
              />
            </td>
          </tr>

          <tr>
            <td align="right">
              <label htmlFor="password">Password: </label>
            </td>
            <td>
              <input
                onChange={this.onChange}
                value={this.state.password}
                error={errors.password}
                id="password"
                type="password"
                className="input"
              />
            </td>
          </tr>

          <tr>
            <td align="right">
              <label htmlFor="password2">Confirm Password</label>
            </td>
            <td>
              <input
                onChange={this.onChange}
                value={this.state.password2}
                error={errors.password2}
                id="password2"
                type="password"
                className="input"
              />
            </td>
          </tr>

          <tr>
            <td colSpan="2">
              <div>
                <button
                  type="submit"
                  className="loginbutton"
                >
                  Sign up
                </button>

                <button
                  onClick={this.routeChangeBack}
                  className="button"
                >
                  Back
                </button>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
        </form>

      </div>

      <div id="mainregister-mobile">

        <div>
          <h2>
            Register with Us
          </h2>
          <p>
            Already have an account? <StyledLink to="/">Log in</StyledLink>
          </p>
        </div>

        <form noValidate onSubmit={this.onSubmit}>
        <table border="0">
          <tbody>
          <tr>
            <td align="right">
              <label htmlFor="name">Name:</label>
            </td>
            <td>
              <input
                onChange={this.onChange}
                value={this.state.name}
                error={errors.name}
                id="name"
                type="text"
                className="input"
                style={{width: "250px",}}
              />
            </td>
          </tr>

          <tr>
            <td align="right">
              <label htmlFor="email">Email:</label>
            </td>
            <td>
              <input
                onChange={this.onChange}
                value={this.state.email}
                error={errors.email}
                id="email"
                type="email"
                className="input"
                style={{width: "250px",}}
              />
            </td>
          </tr>

          <tr>
            <td align="right">
              <label htmlFor="password">Password: </label>
            </td>
            <td>
              <input
                onChange={this.onChange}
                value={this.state.password}
                error={errors.password}
                id="password"
                type="password"
                className="input"
                style={{width: "250px",}}
              />
            </td>
          </tr>

          <tr>
            <td align="right">
              <label htmlFor="password2">Confirm Password</label>
            </td>
            <td>
              <input
                onChange={this.onChange}
                value={this.state.password2}
                error={errors.password2}
                id="password2"
                type="password"
                className="input"
                style={{width: "250px",}}
              />
            </td>
          </tr>

          <tr>
            <td colSpan="2">
              <div>
                <button
                  type="submit"
                  className="loginbutton"
                >
                  Sign up
                </button>

                <button
                  onClick={this.routeChangeBack}
                  className="button"
                >
                  Back
                </button>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
        </form>

      </div>
    </div>
    );
  }
}
export default Register;
