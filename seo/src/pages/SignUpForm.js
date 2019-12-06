import React, { Component } from 'react'
import axios from 'axios'
import '../css/SignUpForm.css'

export default class SignUpForm extends Component {
  constructor(props) {
    super(props)
    this.state={
      name: '',
      event: '',
      events: [],
      remarks: '',
      pax: '',
      isPresent: false,
      selectedEvent: {},
    }
  }

  componentDidMount() {
    axios.get('/api/createeventapi/')
      .then(response => {
        this.setState({ events: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
      console.log(this.state.events)
  }

  onChangeName = (e) => {
    this.setState({
      name: e.target.value
    })
  }

  onChangeEvent = (e) => {
    this.setState({
      event: e.target.value,
    })
    axios.get('/api/createeventapi/'+e.target.value) //or this.state.event (id)
      .then(response => {
        this.setState({ selectedEvent: response.data.name })
      })
      .catch((error) => {
        console.log(error);
      })
    console.log(this.state.selectedEvent.name)
    console.log(this.state.selectedEvent)
  }

  onChangePax = (e) => {
    this.setState({
      pax: e.target.value
    })
  }

  onChangeRemarks = (e) => {
    this.setState({
      remarks: e.target.value
    })
  }

  validateForm() {
    return (
      this.state.name.length > 0 &&
      this.state.event != null &&
      this.state.pax.length > 0
    )
  }

  onSubmit = (e) => {
    e.preventDefault();

    const newAttendee = {
      name: this.state.name,
      event: this.state.selectedEvent,
      pax: this.state.pax,
      remarks: this.state.remarks,
      isPresent: this.state.isPresent,
    }

    if (this.validateForm()) {
      axios.post('/attendeesapi/add', newAttendee)
        .then(res => console.log(res.data));
    }
    alert('Received! See you there! ')
  }

  render() {
    return(
      <div>
        <div id="mainsignup">

          <div className="breakline"><span> Please Sign Up for the Event! </span></div>
          <div id="form-details">
            <h3>Event Details:</h3>
            <ul>
              <li>Name: <strong>{this.state.selectedEvent.name}</strong></li>
              <li>Start Date: <strong>{this.state.selectedEvent.startDate}</strong></li>
              <li>End Date: <strong>{this.state.selectedEvent.endDate}</strong></li>
              <li>Type of Event: <strong>{this.state.selectedEvent.searchNames}</strong></li>
              <li>Event Description: <strong>{this.state.selectedEvent.description}</strong></li>
            </ul>
          </div><br />

          <form onSubmit={this.onSubmit}>
            <div>
              <label>Name: </label><br />
              <input
                name="name"
                value={this.state.name}
                onChange={this.onChangeName}
                className="input"
                style={{width: "300px",}}
              /><br />

              <label>Event: </label><br />
              <select
                name="event"
                onChange={this.onChangeEvent}
                className="input"
                style={{width: "250px",}}
              >
                <option value="">-</option>
                {this.state.events.map(name =>
                    <option key={name._id} value={name._id}>{name.name}</option>
                )}
              </select><br/>

              <label>Number of people attending: </label><br />
              <input
                name="pax"
                type="number"
                value={this.state.pax}
                onChange={this.onChangePax}
                className="input"
                style={{width: "100px",}}
              /><br />

              <label>Remarks: </label><br/>
              <textarea
                rows="10"
                cols="50"
                value={this.state.remarks}
                onChange={this.onChangeRemarks}
                className="input"
              />
            <br />

              <input
                type="submit"
                value="Submit"
                className="button"
              />
            </div><br />
          </form>
        </div>

        <div id="mainsignup-mobile">

          <div className="breakline-mobile"><span> Please Sign Up for the Event! </span></div>
          <div id="form-details-mobile">
            <h3>Event Details:</h3>
            <ul>
              <li>Name: <strong>{this.state.selectedEvent.name}</strong></li>
              <li>Start Date: <strong>{this.state.selectedEvent.startDate}</strong></li>
              <li>End Date: <strong>{this.state.selectedEvent.endDate}</strong></li>
              <li>Type of Event: <strong>{this.state.selectedEvent.searchNames}</strong></li>
              <li>Event Description: <strong>{this.state.selectedEvent.description}</strong></li>
            </ul>
          </div><br />

          <form onSubmit={this.onSubmit}>
            <div>
              <label>Name: </label><br />
              <input
                name="name"
                value={this.state.name}
                onChange={this.onChangeName}
                className="input"
                style={{width: "300px",}}
              /><br />

              <label>Event: </label><br />
              <select
                name="event"
                onChange={this.onChangeEvent}
                className="input"
                style={{width: "250px",}}
              >
                <option value="">-</option>
                {this.state.events.map(name =>
                    <option key={name._id} value={name._id}>{name.name}</option>
                )}
              </select><br/>

              <label>Number of people attending: </label><br />
              <input
                name="pax"
                type="number"
                value={this.state.pax}
                onChange={this.onChangePax}
                className="input"
                style={{width: "100px",}}
              /><br />

              <label>Remarks: </label><br/>
              <textarea
                rows="10"
                cols="50"
                value={this.state.remarks}
                onChange={this.onChangeRemarks}
                className="input"
              />
            <br />

              <input
                type="submit"
                value="Submit"
                className="button"
              />
            </div><br />
          </form>
        </div>
      </div>
    )
  }
}
