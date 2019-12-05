import 'react-dates/initialize'
import React, {Component} from 'react'
import DatePicker from 'react-datepicker'
import axios from 'axios'
import moment from 'moment'
import "react-datepicker/dist/react-datepicker.css";
import "../css/CreateEvent.css"

class CreateEvent extends Component {

  constructor(props){
    super(props)

    this.onChangeName = this.onChangeName.bind(this)
    this.onChangeDescription = this.onChangeDescription.bind(this)
    this.onChangeEndDate = this.onChangeEndDate.bind(this)
    this.onChangeStartDate = this.onChangeStartDate.bind(this)
    this.onChangeSearchNames = this.onChangeSearchNames.bind(this)
    this.onSubmit = this.onSubmit.bind(this)

    this.state = {
      startDate: new Date(),
      endDate: null,
      name: '',
      focusedInput: null,
      searchNames: '',
      description: '',
      newevent: [],
      budget: false,
      location: false,
      agenda: false,
      sponsorship: false,
      marketing: false,
      participants: false,
      permits: false,
      contractors: false,
      risks: false,
      security: false,
      services: false,
      waste: false,
      traffic: false,
      food: false,
      siteplan: false,
      cleaning: false,
      others: false,
      ontheday: false,

    }
  }

  componentDidMount() {
  axios.get('http://localhost:4000/createeventapi/')
    .then(response => {
        this.setState({
          newevent: response.data.map(newevent1 => newevent1.name),
        })
    })
    .catch((error) => {
      console.log(error);
    })
  }

  clear = () => {
    this.setState({
      startDate: null,
      endDate: null,
    })
  }
  routeChangeHome = () => {
    this.props.history.push('/welcomepage')
  }

  validateForm() {
    return (
      this.state.name.length > 0 &&
      this.state.searchNames != null &&
      this.state.description.length > 0
    )
  }
  /*validateDate() {
    let startDate = new Date(this.state.startDate);
    let endDate = new Date(this.state.endDate);
    return ( endDate >= startDate)
  }*/

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

  onChangeSearchNames(e) {
    this.setState({
      searchNames: e.target.value
    })
  }

  onChangeStartDate(date) {
    this.setState({
      startDate: date
    })
  }
  onChangeEndDate(date) {
    //if(this.validateDate()) {
      this.setState({
        endDate: date
      })
    //}
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
    if (this.validateForm()) {
      axios.post('http://localhost:4000/createeventapi/add', newEvent)
        .then(res => console.log(res.data));
    }
    window.location = '/welcomepage';
  }

  render() {
    //const { data } = this.state;
    return(
      <div id="main">

        <header>Create Event:</header>

        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Event Name: </label><br />
            <input
                name="name"
                className="form-control"
                value={this.state.name}
                onChange={this.onChangeName}
                className="input"
              />
          </div>
          <br />

          <div className="form-group">
            <label>Start Date: </label>
            <div>
              <DatePicker
                selected={this.state.startDate}
                onChange={this.onChangeStartDate}
                //dateFormat="dd/MM/yyyy"
                className="input"
              />
            </div>
          </div>
          <div className="form-group">
            <label>End Date: </label>
            <div>
              <DatePicker
                selected={this.state.endDate}
                onChange={this.onChangeEndDate}
                //dateFormat="dd/MM/yyyy"
                className="input"
              />
            </div>
          </div>
          <input
            type="button"
            onClick={this.clear}
            value="Clear"
            className="clear"
          />

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

          <div className="form-group">
            <label>Description: </label><br/>
            <textarea
              rows="10"
              cols="50"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
              className="input"
            />
          </div>
          <br />

          <div className="form-group">
            <input
            type="submit"
            disabled={!this.validateForm()}
            value="Create Event"
            className="button"
            style={{width: "150px",}}
          />
          </div>
        </form>

          <button
            text="Home"
            onClick={this.routeChangeHome}
            className="button"
          >
            Home
          </button>

      </div>
    )
  }
}

export default CreateEvent
