import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../css/EventList.css'
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

const EventDetails = props => (
  <tr>
    <td>{props.event.name}</td>
    <td>{props.event.startDate.substring(0,10)}</td>
    <td>{props.event.endDate.substring(0,10)}</td>
    <td>{props.event.searchNames}</td>
    <td>{props.event.description}</td>
    <td>
      <StyledLink to={"/checklist/"+props.event._id}>View Checklist</StyledLink> | <StyledLink to={"/editevent/"+ props.event._id}>Edit</StyledLink> |
      <a href="#" onClick={() => { props.deleteEvent(props.event._id)}}>
        Delete
      </a>
    </td>
  </tr>
)

export default class EventList extends Component {
  constructor(props) {
    super(props);

    this.deleteEvent = this.deleteEvent.bind(this)

    this.state = {events: []};
  }

  routeChangeBack = () => {
    this.props.history.push('/welcomepage')
  }

  componentDidMount() {
    axios.get('http://localhost:4000/createeventapi/')
      .then(response => {
        this.setState({ events: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteEvent(id) {
    axios.delete('http://localhost:4000/createeventapi/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      events: this.state.events.filter(el => el._id !== id)
    })
  }

  eventList() {
    return this.state.events.map(currentevent => {
      return <EventDetails event={currentevent} deleteEvent={this.deleteEvent} key={currentevent._id}/>;
    })
  }

  render() {
    return (
      <div id="maineventlist">
        <h2><StyledLink to={"/homepage/"}>Go To Event Manager</StyledLink></h2>

        <label>Logged Events</label>
        <table className="table" border="0">
          <thead className="thead-light">
            <tr>
              <th>Name</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Type</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.eventList() }
          </tbody>
        </table>

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
