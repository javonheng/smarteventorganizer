import React, {Component} from 'react'
import axios from 'axios'
import { Calendar, momentLocalizer, Views } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import '../css/EventToDo.css'
import moment from 'moment'
import EventComponents from './EventComponents'
import { gapi } from 'gapi-script';
/* global gapi */

//create database for agendas wevents
const localizer = momentLocalizer(moment)
const CALENDAR_ID = 'oq1633ud4rvn92oksimbfg2t1o@group.calendar.google.com'
const API_KEY = 'AIzaSyDKqXOscie7waNofasqsFeeaNMj4VQ0Uco'
const propTypes = {}

class EventToDo extends Component {
  constructor(...args) {
    super(...args)
    this.state={
      events: [],
      gevents: [], //google events
      newagenda: [], //shows updated agenda created from web
    }
  }

  componentDidMount() {

    axios.get('/api/createeventapi/')
      .then(response => {
        this.setState({ events: response.data })
      console.log(this.state.events)
      })
      .catch((error) => {
        console.log(error);
      })
    this.getGEvents()
    axios.get('/api/addagendasapi/')
      .then(response => {
        this.setState({ newagenda: response.data })
      console.log(this.state.newagenda)
      })
      .catch((error) => {
        console.log(error);
      })
  }

  getGEvents(){
    let that = this;
    function start() {
      gapi.client.init({
        'apiKey': API_KEY
      }).then(function() {
        return gapi.client.request({
          'path': `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events`,
        })
      }).then( (response) => {
        let gevents = response.result.items
        that.setState({
          gevents
        }, ()=>{
          console.log(that.state.gevents);
        })
      }, function(reason) {
        console.log(reason);
      });
    }
  gapi.load('client', start)
}

eventStyleGetter = (event, start, end, isSelected) => {
    console.log(event);
    var style = {
        backgroundColor: 'lightblue',
        borderRadius: '0px',
        opacity: 0.8,
        color: 'black',
        display: 'block',
    };
    return {
        style: style
    };
}

  onEventClick = (pEvent) => {
    console.log(pEvent)
    const r = window.confirm(pEvent.title+" - "+pEvent.desc+". Would you like to remove this event?")

     if(r === true){
         axios.delete('/api/addagendasapi/'+ pEvent.id)
           .then(response => { console.log(response.data)});
         this.setState({
           newagenda: this.state.newagenda.filter(el => el._id !== pEvent.id)
         })
      }
    }

getEvents = () => {
  const events = []
  const ggevents = []
  const webevents = []
  this.state.events.map(event => {
       return events.push({
        start: new Date(event.startDate),
        end: new Date(event.endDate),
        title: event.name,
        desc: event.description,
      })
    })
  this.state.gevents.map(event => {
    return ggevents.push({
      start: new Date(event.start.dateTime),
      end: new Date(event.end.dateTime),
      title: event.summary,
      desc: event.description,
    })
  })

  this.state.newagenda.map(event => {
    return webevents.push({
      start: new Date(event.start),
      end: new Date(event.end),
      title: event.title,
      desc: event.desc,
      id: event._id,
    })
  })
    const combineevents = events.concat(ggevents)
    const allevents = combineevents.concat(webevents)
    return allevents
  }

  handleSelect = ({start, end}) => {
   /*var startDate = moment(slotInfo.start.toLocaleString()).format("YYYY-MM-DDm:ss");
   var endDate = moment(slotInfo.end.toLocaleString()).format("YYYY-MM-DDm:ss");
   console.log(startDate); //shows the start time chosen
   console.log(endDate); //shows the end time chosen*/

   const title = window.prompt('New Event name:')
   const desc = window.prompt('Event Description:')

    const newAgenda = {
      start: start,
      end: end,
      title: title,
      desc: desc,
    }
    axios.post('/api/addagendasapi/add', newAgenda)
      .then(res => console.log(res.data));
    window.location.reload()
 }

  render() {
    const { events } = this.state

    return(
      <div id="maineventtodo">
        <h1>
          Plan Your Schedule
        </h1>
        <div id="calendar">
          <Calendar
            selectable
            localizer={localizer}
            events={this.getEvents()}
            defaultView={Views.MONTH}
            defaultDate={new Date()}
            onSelectEvent={event => this.onEventClick(event)}
            onSelectSlot={this.handleSelect}
            startAccessor="start"
            endAccessor="end"
            popup={true}
            eventPropGetter={this.eventStyleGetter}
            /*components={{
              event: EventComponents
            }}*/
          />
        </div>
      </div>
    )
  }
}

EventToDo.propTypes = propTypes

export default EventToDo
