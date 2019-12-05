import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import '../css/EditEvent.css'

export default class EditEvent extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this)
    this.onChangeDescription = this.onChangeDescription.bind(this)
    this.onChangeEndDate = this.onChangeEndDate.bind(this)
    this.onChangeStartDate = this.onChangeStartDate.bind(this)
    this.onChangeSearchNames = this.onChangeSearchNames.bind(this)
    this.onSubmit = this.onSubmit.bind(this)

    this.state = {
      startDate: '',
      endDate: '',
      name: '',
      focusedInput: null,
      searchNames: '',
      description: '',
      newevent: [],
      budget: null,
      location: null,
      agenda: null,
      sponsorship: null,
      marketing: null,
      participants: null,
      permits: null,
      contractors: null,
      risks: null,
      security: null,
      services: null,
      waste: null,
      traffic: null,
      food: null,
      siteplan: null,
      cleaning: null,
      others: null,
      ontheday: null,
    }
  }

  componentDidMount() {
    axios.get('http://localhost:4000/createeventapi/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          name: response.data.name,
          startDate: new Date(response.data.startDate),
          endDate: new Date(response.data.endDate),
          searchNames: response.data.searchNames,
          description: response.data.description,
          budget: response.data.budget,
          location: response.data.location,
          agenda: response.data.agenda,
          sponsorship: response.data.sponsorship,
          marketing: response.data.marketing,
          participants: response.data.participants,
          permits: response.data.permits,
          contractors: response.data.contractors,
          risks: response.data.risks,
          security: response.data.security,
          services: response.data.services,
          waste: response.data.waste,
          traffic: response.data.traffic,
          food: response.data.food,
          siteplan: response.data.siteplan,
          cleaning: response.data.cleaning,
          others: response.data.others,
          ontheday: response.data.ontheday,
        })
      console.log(response)
      })

      .catch(function (error) {
        console.log(error);
      })

    axios.get('http://localhost:4000/createeventapi/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            newevent: response.data.map(user => user.name),
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }
  routeChangeBack = () => {
    this.props.history.push('/eventlist')
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    })
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }

  onChangeStartDate(date) {
    this.setState({
      startDate: date
    })
  }
  onChangeEndDate(date) {
    this.setState({
      endDate: date
    })
  }
  onChangeSearchNames(e) {
    this.setState({
      searchNames: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const newEvent = {
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      name: this.state.name,
      searchNames: this.state.searchNames,
      description: this.state.description,
      budget: this.state.budget,
      location: this.state.location,
      agenda: this.state.agenda,
      sponsorship: this.state.sponsorship,
      marketing: this.state.marketing,
      participants: this.state.participants,
      permits: this.state.permits,
      contractors: this.state.contractors,
      risks: this.state.risks,
      security: this.state.security,
      services: this.state.services,
      waste: this.state.waste,
      traffic: this.state.traffic,
      food: this.state.food,
      siteplan: this.state.siteplan,
      cleaning: this.state.cleaning,
      others: this.state.others,
      ontheday: this.state.ontheday,
    }

    console.log(newEvent);

    axios.post('http://localhost:4000/createeventapi/update/' + this.props.match.params.id, newEvent)
      .then(res => console.log(res.data));

    window.location = '/welcomepage';
  }

  render() {
    return (
      <div id="editevent">
        <h1>Edit Event: </h1>
        <form onSubmit={this.onSubmit}>
          <div>
            <label>Event Name: </label> &nbsp;
            <input
                name="name"
                className="form-control"
                value={this.state.name}
                onChange={this.onChangeName}
                className="input"
              />
          </div>
          <br />

          <div>
            <label>Start Date: </label>
            <div>
              <DatePicker
                selected={this.state.startDate}
                onChange={this.onChangeStartDate}
                dateFormat="dd/MM/yyyy"
                className="input"
              />
            </div>
          </div>
          <div >
            <label>End Date: </label>
            <div>
              <DatePicker
                selected={this.state.endDate}
                onChange={this.onChangeEndDate}
                dateFormat="dd/MM/yyyy"
                className="input"
              />
            </div>
          </div>
          <input
            type="button"
            onClick={this.clear}
            value="Clear"
            className="button"
          />
          <br />

          <p> Type of Event: </p>
          <select
            value={this.state.searchNames}
            name="searchNames"
            onChange={this.onChangeSearchNames}
            className="input"
          >
            <option value="">-- Please choose a type of event </option>
            <option value="Concert">Concert</option>
            <option value="Carnival">Carnival</option>
            <option value="Meeting">Meeting</option>
            <option value="Auction">Auction</option>
            <option value="Exhibition">Exhibition</option>
            <option value="Coporate">Coporate</option>
            <option value="Birthday">Birthday</option>
            <option value="Wedding">Wedding</option>
            <option value="Showcase">Showcase</option>
            <option value="Launch">Launch</option>
            <option value="Talkshow">Talkshow</option>
            <option value="Conference">Conference</option>
            <option value="Seminar">Seminar</option>
            <option value="TeamBuilding">Team Building</option>
            <option value="Trade">Trade</option>
            <option value="Press">Press</option>
            <option value="Networking">Networking</option>
            <option value="Family">Family</option>

          </select>
          <p> Type of Event: {this.state.searchNames} </p>
          <br />

          <div>
            <label>Description: </label><br/>
            <textarea
              rows="10"
              cols="50"
              required
              value={this.state.description}
              onChange={this.onChangeDescription}
              className="input"
            />
          </div>
          <br />

          <div>
            <input type="submit" value="Edit Event" className="button" />
          </div>
        </form>

        <button
          text="Back"
          onClick={this.routeChangeBack}
          className="button"
        >
          Back
        </button>

      </div>
    )
  }
}
