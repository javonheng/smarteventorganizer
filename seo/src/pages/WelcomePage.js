import React, { Component } from 'react'
import axios from 'axios'
import Auth from '../Auth'
import '../css/WelcomePage.css'

/* global gapi */
/* global FB */

class WelcomePage extends Component {
  constructor(props) {
    super(props)
    this.state= {
      newevent: [],
      name:'',
      users: [],
    }
  }

  componentDidMount(){
    /*axios.get('/userslogin/')
      .then(response => {
        this.setState({ users: response.data })
      })
      .catch((error) => {
        console.log(error);
      })*/
      console.log(localStorage.getItem('isLoggedIn'))
    axios.get('/api/createeventapi/')
      .then(response => {
        this.setState({
          newevent: response.data.map(user => user.name),
          name: response.data[response.data.length-1].name
        })
        console.log(response)
      })
      .catch((error) => {
        console.log(error);
      })
  }

  routeChangeNewEvent = () => {
    this.props.history.push('/createevent')
  }

  routeChangeLogout = () => {
    Auth.signout()
    this.props.history.push('/')
  }

  routeChangeExistingEvent = () => {
    this.props.history.push('/eventlist')
  }

  render() {

    return(
      <div id="mainwelcomepage">
        <h1>
          Welcome back {this.state.users.name}! Your current event: {this.state.name}
        </h1>
        <div className="line"></div>

        <table border="0">
          <tbody>
          <tr>
            <td>
              <button
                onClick={this.routeChangeNewEvent}
                id="newevent"
              >
                Create New Event
              </button>
              <br/>
            </td>
            <td>
              <button
                onClick={this.routeChangeExistingEvent}
                id="newevent"
              >
                View/Edit Existing Event
              </button>
              <br />
            </td>
          </tr>
          <tr>
            <td colSpan="2">
              <button
                onClick={this.routeChangeLogout}
                className="loginbutton"
              >Log Out
              </button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default WelcomePage
