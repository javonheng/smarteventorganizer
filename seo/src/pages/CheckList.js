import React, {Component} from 'react'
import axios from 'axios'
import '../css/CheckList.css'

export default class CheckList extends Component {
  constructor(props) {
    super(props)
    this.state = {
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
    axios.get('/createeventapi/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          newevent: response.data,
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
      console.log(this.state.newevent)
      })
    }

    handleChange = (event) => {
      const {name, checked} = event.target
      this.setState({
        [name]: checked
      })
    }

    routeChangeBack = () => {
      this.props.history.push('/eventlist')
    }

    toEventSOR = () => {
      if (window.confirm("Check your Standard Of Rates?") == true) {
        this.props.history.push('/event/SOR')
      } else {
        window.location.reload()
      }
    }

    toEventToDo = () => {
      if (window.confirm("Check your Agenda in Calendar?") == true) {
        this.props.history.push('/event/todo')
      } else {
        window.location.reload()
      }
    }

    toMembers = () => {
      if (window.confirm("Check your members involved?") == true) {
        this.props.history.push('/teams/members')
      } else {
        window.location.reload()
      }
    }

    toPublicity = () => {
      if (window.confirm("Go to publicity tools?") == true) {
        this.props.history.push('/media/publicity')
      } else {
        window.location.reload()
      }
    }

    toAttendance = () => {
      if (window.confirm("Check your Attendance?") == true) {
        this.props.history.push('/media/attendance')
      } else {
        window.location.reload()
      }
    }

    toFileManager = () => {
      if (window.confirm("View Files?") == true) {
        this.props.history.push('/files/filemanager')
      } else {
        window.location.reload()
      }
    }

    toRentals = () => {
      if (window.confirm("Check ongoing rentals?") == true) {
        this.props.history.push('/logs/status')
      } else {
        window.location.reload()
      }
    }

    toInventory = () => {
      if (window.confirm("Check current inventory?") == true) {
        this.props.history.push('/logs/inventory')
      } else {
        window.location.reload()
      }
    }

    onSubmit = () => {
      const updateChecklist = {
        startDate: this.state.newevent.startDate,
        endDate: this.state.newevent.endDate,
        name: this.state.newevent.name,
        searchNames: this.state.newevent.searchNames,
        description: this.state.newevent.description,
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
      axios.post('/createeventapi/update/'+this.props.match.params.id, updateChecklist)
        .then(res => console.log(res.data));

      window.location.reload();
    }

  render(){
    return (
      <div id="main-checklist">
      <div id="proj-details">
        <h3>Project: </h3>
        <label>{this.state.newevent.name} </label>
          <ul>
            <li>Type: {this.state.newevent.searchNames} </li>
            <li>Duration: {this.state.newevent.startDate} - {this.state.newevent.endDate} </li>
            <li>Description: {this.state.newevent.description}</li>
          </ul>

          <button
            text="Back"
            onClick={this.routeChangeBack}
            className="button"
          >
            Back
          </button>
        </div>

        <div id="checklist">

          <h3>Checklist</h3>
          <form>
            <label><input type="checkbox" name="budget" onChange={this.handleChange} checked={this.state.budget}/><a href="#" onClick={this.toEventSOR}>Budget</a></label> {console.log(this.state.budget)}
            <ul>
              <li>Prepare an event budget and monitor your spending</li>
            </ul>

            <label><input type="checkbox" name="location" onChange={this.handleChange} checked={this.state.location}/><a href="#" onClick={this.toEventToDo}>Location</a></label>
            <ul>
              <li>Select a location or venue for your event</li>
              <li>Transportation - Will people travel long distances to your event?</li>
              <li>Is there parking and easy access from MRT?</li>
              <li>When is your location available?</li>
            </ul>

            <label><input type="checkbox" name="agenda" onChange={this.handleChange} checked={this.state.agenda}/><a href="#" onClick={this.toEventToDo}>Agenda</a></label>
            <ul>
              <li>What is the goal of your event?</li>
              <li>Develop event timeline</li>
              <li>Book entertainment and MC if needed</li>
              <li>Submit deposit for their services if needed</li>
            </ul>

            <label><input type="checkbox" name="sponsorship" onChange={this.handleChange} checked={this.state.sponsorship}/><a href="#" onClick={this.toMembers}>Sponsorship</a></label>
            <ul>
              <li>Create sponsorship proposal</li>
              <li>Identify potential sponsors</li>
              <li>Deliver sponsorship packages and follow up within 1 week</li>
              <li>Use sponsorship testimonials and always acknowledge sponsors</li>
            </ul>

            <label><input type="checkbox" name="marketing" onChange={this.handleChange} checked={this.state.marketing}/><a href="#"  onClick={this.toPublicity}>Marketing & Promotions</a></label>
            <ul>
              <li>Develop Marketing/Communication Plan</li>
              <li>Design promotional material, basic text, logo</li>
              <li>Build a website and optimise it for search engines</li>
              <li>Distributions of flyers/posters/emails/brochures to community</li>
              <li>Submit event information to local event calendars to websites</li>
              <li>Submit a press release</li>
            </ul>

            <label><input type="checkbox" name="participants" onChange={this.handleChange} checked={this.state.participants}/><a href="#" onClick={this.toAttendance}>Participant Registration and Invitations</a></label>
            <ul>
              <li>Build an online registration form</li>
              <li>Host your online registration form on your website</li>
              <li>Determine what is included in the cost of registration (event t-shirt, pre-event dinner, etc)</li>
              <li>Deliver an email announcement to your past participants with link to your online registration form</li>
            </ul>

            <label><input type="checkbox" name="permits" onChange={this.handleChange} checked={this.state.permits}/><a href="#" onClick={this.toFileManager}>Permits & Licences</a></label>
            <ul>
              <li>Apply for an food permits required</li>
              <li>If using music, apply for a noise permit</li>
              <li>Request for approval to erect promotional signage</li>
              <li>Road closures - send applications early</li>
            </ul>

            <label><input type="checkbox" name="contractors" onChange={this.handleChange} checked={this.state.contractors}/><a href="#" onClick={this.toRentals}>Contractors</a></label>
            <ul>
              <li>Order equipment e.g. stage, lighting, PA systems, etc</li>
              <li>Book portable toilets, fireworks, marquee, generators</li>
              <li>Book and confirm all contractors in writing</li>
              <li>Check Insurance - public liability, staff, volunteers</li>
            </ul>

            <label><input type="checkbox" name="risks" onChange={this.handleChange} checked={this.state.risks}/><a href="#" onClick={this.toFileManager}>Risk Management</a></label>
            <ul>
              <li>Book first aid officers</li>
              <li>Conduct risk assessment involving all key stakeholders</li>
              <li>Create risk management plan</li>
              <li>Obtain relevant insurance and send copy to Council if required</li>
              <li>Contigency Plans - wet weather, low attendance</li>
            </ul>

            <label><input type="checkbox" name="security" onChange={this.handleChange} checked={this.state.security}/><a href="#" onClick={this.toFileManager}>Security Plan</a></label>
            <ul>
              <li>Book Security & two way radios</li>
              <li>Crowd Control</li>
              <li>Cash Security</li>
            </ul>

            <label><input type="checkbox" name="services" onChange={this.handleChange} checked={this.state.services}/><a href="#" onClick={this.toMembers}>Essential Services</a></label>
            <ul>
              <li>Notify Police, Ambulance Services and Fire Brigade</li>
            </ul>

            <label><input type="checkbox" name="waste" onChange={this.handleChange} checked={this.state.waste}/><a href="#" onClick={this.toFileManager}>Waste Management</a></label>
            <ul>
              <li>Develop waste management plan</li>
              <li>Promote reducing waste in marketing material</li>
            </ul>

            <label><input type="checkbox" name="traffic" onChange={this.handleChange} checked={this.state.traffic}/><a href="#" onClick={this.toFileManager}>Traffic Management</a></label>
            <ul>
              <li>Design traffic plan</li>
              <li>E.g. Signage, disabled parking, VIP parking, pedestrian access, marshals, car parking area, entry and exit points, lighting, road closures, promote alternative transport</li>
            </ul>

            <label><input type="checkbox" name="food" onChange={this.handleChange} checked={this.state.food}/><a href="#" onClick={this.toMembers}>Food Vendors</a></label>
            <ul>
              <li>Book Food Vendors and confirm in writing</li>
              <li>Request details of electrical requirements</li>
              <li>Request copy of Health Department Registration Certificate</li>
              <li>Application for temporary food premises permit</li>
            </ul>

            <label><input type="checkbox" name="siteplan" onChange={this.handleChange} checked={this.state.siteplan}/><a href="#" onClick={this.toFileManager}>Site Preparation and Plan</a></label>
            <ul>
              <li>Design plan of venue/event site</li>
            </ul>

            <label><input type="checkbox" name="cleaning" onChange={this.handleChange} checked={this.state.cleaning}/><a href="#" onClick={this.toFileManager}>Cleaning and Maintenance Plan</a></label>
            <ul>
              <li>Book toilet cleaners and extra paper if appropriate</li>
              <li>Clean up venue/mow lawn/clear area of debris</li>
            </ul>

            <label><input type="checkbox" name="others" onChange={this.handleChange} checked={this.state.others}/><a href="#" onClick={this.toInventory}>Others</a></label>
            <ul>
              <li>Organise volunteers and staff</li>
              <li>Prepare scripts or run sheets for ceremonies</li>
              <li>Organise awards/trophies/certificates & decorations</li>
            </ul>

            <label><input type="checkbox" name="ontheday" onChange={this.handleChange} checked={this.state.ontheday}/>On the Day:</label>
            <ul>
              <li>Gather Staff for full briefing</li>
              <li>Organise volunteer registration area & entertainers area</li>
              <li>Review chain of command in case of emergency </li>
            </ul>

            <button
              onClick={this.onSubmit}
              className="button"
            >
              Update
            </button>
          </form>
        </div>
        <div style={{clear:"both",}}></div>
      </div>
    )
  }
}
