import React, { Component, Fragment } from "react"
import {BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom'
import LoginLanding from './LoginLanding'
import Register from './Register'
import '../css/LoginPage.css'
import { Provider } from "react-redux";
import store from "../store";
/* global gapi */

class LoginPage extends Component {
  constructor() {
    super()
    this.state={
    }
  }

  routeChangeQueryForm = () => {
    this.props.history.push('/queryform')
  }

  render() {

    return (
      <Provider store={store}>
        <Switch>
          <Fragment>
            <div id="main">
              <div className="line"></div>
              <h1 className="header">YOUR FRIENDLY SMART EVENT ORGANIZER</h1>

              <Route exact path="/" component={LoginLanding} />
              <Route exact path="/register" component={Register} />


              <div className="line"></div>
              <button
                onClick={this.routeChangeQueryForm}
                className="loginbutton"
              >
                Contact Admin
              </button>
              {console.log(this.routeChangeQueryForm)}
            </div>
          </Fragment>
        </Switch>
      </Provider>
    );
  }
}

export default LoginPage
