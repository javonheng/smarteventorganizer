import React, { Component } from "react"
import ReactDOM from 'react-dom'
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom'
import '../css/QueryForm.css'

class QueryForm extends Component {
  constructor() {
    super()
    this.state = {
      isLoading: false,
      name: "",
      role: "",
      contact: "",
      email: "",
      subject: "",
      queries: ""
    }
  }

  sendEmail = _ => {
    (async () => {
      const rawResponse = await fetch('http://127.0.0.1:4000/send-email', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },

      //make sure to serialize your JSON body
        body: JSON.stringify({
          name: this.state.name,
          role: this.state.role,
          contact: this.state.contact,
          email: this.state.email,
          subject: this.state.subject,
          queries: this.state.queries
          })
        })
      //const content = await rawResponse.json()
      //.catch(err => console.log(err))
    })()

  alert('Thank you ' + this.state.name +', we will contact you shortly!')
  }

  routeChangeBack = () => {
    this.props.history.push('/')
  }

  validateForm() {
    return (
      this.state.name.length > 0 &&
      this.state.role.length > 0 &&
      this.state.contact.length > 0 &&
      this.state.email.length > 0 &&
      this.state.subject.length > 0 &&
      this.state.queries.length > 0
    )
  }

  handleChange = (event) => {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
  }
  handleSubmit = async event => {

    event.preventDefault();
    this.setState({ isLoading: true })
    this.setState({ name: "test" })
    this.setState({ isLoading: false })
  }

  handleConfirmationSubmit = async event => {

    event.preventDefault()
    this.setState({ isLoading: true })
  }

  render() {
    return(
      <div>
      <div id="mainqueryform">
        <h1>Do us a favour and fill this up. We will contact you shortly. Thank you!</h1>
        <form onSubmit={this.handleSubmit}>
          <table border="0" id="form">
          <tbody>
            <tr>
              <td rowSpan="6" id="makecenter">
                <h2>Form Information: </h2>
                <p> Name: <i>{this.state.name}</i> </p>
                <p> Role: <i>{this.state.role}</i> </p>
                <p> Contact: <i>{this.state.contact}</i> </p>
                <p> Email: <i>{this.state.email}</i> </p>
                <p> Subject Title: <i>{this.state.subject}</i> </p>
                <p> Queries: <i>{this.state.queries}</i> </p>
              </td>
              <td rowSpan="6">
                <div id="hline"></div>
              </td>
              <td>
                <input
                  name="name"
                  autoFocus
                  value={this.state.name}
                  onChange={this.handleChange}
                  placeholder="Full Name"
                  className="input"
                  maxLength="50"
                />
                  <br />
              </td>
            </tr>

            <tr>
              <td>
                <input
                  name="role"
                  autoFocus
                  value={this.state.role}
                  onChange={this.handleChange}
                  placeholder="Your Role/Position"
                  className="input"
                  maxLength="50"
                />
                <br />
              </td>
            </tr>

            <tr>
              <td>
                <input
                  name="contact"
                  autoFocus
                  type="tel"
                  value={this.state.contact}
                  onChange={this.handleChange}
                  placeholder="Contact"
                  className="input" />
                <br />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  name="email"
                  type="email"
                  autoFocus
                  value={this.state.email}
                  onChange={this.handleChange}
                  placeholder="Email Address"
                  className="input" />
                <br />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  name="subject"
                  autoFocus
                  value={this.state.subject}
                  onChange={this.handleChange}
                  placeholder="Subject Title"
                  className="input" />
                <br />
              </td>
            </tr>
            <tr>
              <td>
                <textarea
                  name="queries"
                  autoFocus
                  rows={5}
                  value={this.state.queries}
                  onChange={this.handleChange}
                  placeholder="Ask away with your queries!"
                  className="input" />
                <br />
              </td>
            </tr>

            <tr>
              <td colSpan="3">
                <button
                  onClick={this.routeChangeBack}
                  className="button"
                >
                Back
                </button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                <button
                  type="submit"
                  text="Submit"
                  onClick={this.sendEmail}
                  className="button"
                  disabled={!this.validateForm()}
                >
                Send
                </button>
                {console.log(this.sendEmail)}
              </td>
            </tr>
          </tbody>
          </table>
        </form>
      </div>

      <div id="mainqueryform-mobile">
        <h1>Do us a favour and fill this up. We will contact you shortly. Thank you!</h1>
        <form onSubmit={this.handleSubmit}>
          <div border="0" id="form-mobile">
              <div id="makecenter-mobile">
                <h2>Form Information: </h2>
                <p> Name: <i>{this.state.name}</i> </p>
                <p> Role: <i>{this.state.role}</i> </p>
                <p> Contact: <i>{this.state.contact}</i> </p>
                <p> Email: <i>{this.state.email}</i> </p>
                <p> Subject Title: <i>{this.state.subject}</i> </p>
                <p> Queries: <i>{this.state.queries}</i> </p>
              </div>
                <input
                  name="name"
                  autoFocus
                  value={this.state.name}
                  onChange={this.handleChange}
                  placeholder="Full Name"
                  className="input"
                  maxLength="50"
                />
                  <br /><br />
                <input
                  name="role"
                  autoFocus
                  value={this.state.role}
                  onChange={this.handleChange}
                  placeholder="Your Role/Position"
                  className="input"
                  maxLength="50"
                />
                <br /><br />
              <input
                name="contact"
                autoFocus
                type="tel"
                value={this.state.contact}
                onChange={this.handleChange}
                placeholder="Contact"
                className="input"
              />
                <br /><br />
              <input
                name="email"
                type="email"
                autoFocus
                value={this.state.email}
                onChange={this.handleChange}
                placeholder="Email Address"
                className="input"
              />
                <br /><br />
              <input
                name="subject"
                autoFocus
                value={this.state.subject}
                onChange={this.handleChange}
                placeholder="Subject Title"
                className="input"
              />
                <br /><br />
              <textarea
                name="queries"
                autoFocus
                rows={5}
                value={this.state.queries}
                onChange={this.handleChange}
                placeholder="Ask away with your queries!"
                className="input"
              />
                <br /><br />
              <button
                onClick={this.routeChangeBack}
                className="button"
              >
              Back
              </button> <br />

              <button
                type="submit"
                text="Submit"
                onClick={this.sendEmail}
                className="button"
                disabled={!this.validateForm()}
              >
              Send
              </button>
            {console.log(this.sendEmail)}
          </div>
        </form>
      </div>
    </div>
    )
  }
}

export default QueryForm
