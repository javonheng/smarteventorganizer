import React, {Component} from 'react'
import axios from 'axios'
import '../css/LogsStatus.css'

const ProgressBar = (props) => {
  return (
    <div className="progress-bar">
      <Filler percentage={props.percentage}/>
    </div>
  )
}

const Filler = (props) => {
  let name = 'Start'
  if (props.percentage === 25) {
    name = 'QuotaionPhase'
  } if (props.percentage === 50) {
    name = 'PaymentPhase'
  } if (props.percentage === 75) {
    name = 'InProgress'
  } if (props.percentage === 100) {
    name = 'Completed'
  }
  return (
    <div className="filler"
      style={{ width: `${props.percentage}%` }}
    >
      {name}
    </div>
  )
}

const RentalDetails = props => (
  <tr>
    <td>{props.event.company}</td>
    <td>{props.event.description}</td>
    <td>
      <ProgressBar
        percentage={Math.min(Math.max(0, props.event.percentage), 100)}
      />
      <a href="#" onClick={() => { props.editEvent(props.event._id, props.event.company, props.event.description)} }>
        Update Status
      </a>
      </td>
    <td>
      <a href="#" onClick={() => { props.deleteEvent(props.event._id)} }>
        Delete
      </a>
    </td>
  </tr>
)

class LogsStatus extends Component {
  constructor(props) {
    super(props)
    this.state={
      events: [],
      percentage: 0,
      status: '',
      company: '',
      description: '',
      rental: [],
    }
  }

  componentDidMount() {
    axios.get('/createeventapi/')
      .then(response => {
        this.setState({ events: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
    axios.get('/rentalstatusapi/')
      .then(response => {
        this.setState({ rental: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  percentageLimits = (min, value, max) => {
    return Math.min(Math.max(min, value), max);
  }

  handleClick1 = (e) => {
    const { name, value } = e.target
      this.setState({
        percentage: 25,
        [name]: value
      })
  }
  handleClick2 = (e) => {
    const { name, value } = e.target
      this.setState({
        percentage: 50,
        [name]: value
      })
  }
  handleClick3 = (e) => {
    const { name, value } = e.target
      this.setState({
        percentage: 75,
        [name]: value
      })
  }
  handleClick4 = (e) => {
    const { name, value } = e.target
      this.setState({
        percentage: 100,
        [name]: value
      })
  }
  handleClick5 = (e) => {
    const { name, value } = e.target
      this.setState({
        percentage: 0,
        [name]: value
      })
  }

  onChangeName = (e) => {
    this.setState({
      company: e.target.value
    })
  }

  onChangeDescription = (e) => {
    this.setState({
      description: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const newRental = {
      company: this.state.company,
      percentage: this.state.percentage,
      description: this.state.description,
    }
    console.log(newRental);
    axios.post('/rentalstatusapi/add', newRental)
      .then(res => console.log(res.data));
    window.location.reload()
  }

  editEvent = (id, com, desc) => {
    const newperc = window.prompt("Progress of Rental Status? (0, 25, 50, 100)")

    const newRental = {
      company: com,
      percentage: newperc,
      description: desc,
    }

    console.log(newRental);

    axios.post('/rentalstatusapi/update/'+id, newRental)
      .then(res => console.log(res.data));
    window.location.reload()
  }

  deleteEvent = (id) => {
    axios.delete('/rentalstatusapi/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      rental: this.state.rental.filter(el => el._id !== id)
    })
  }

  rentalList() {
    return this.state.rental.map(currentevent => {
      return <RentalDetails
                event={currentevent}
                deleteEvent={this.deleteEvent}
                key={currentevent._id}
                editEvent={this.editEvent}
              />
    })
  }

  render() {
    const { events } = this.state
    return(
      <div>
        <div id="mainlogstat">
        {/*}<label>
        <ProgressBar
          percentage={Math.min(Math.max(0, this.state.percentage), 100)}
        />
          <input
            type="radio"
            name="status"
            value="quotation"
            onChange={this.handleClick1}
            checked={this.state.status === "quotation"}
          /> Quotation Phase |
          <input
            type="radio"
            name="status"
            value="payment"
            onChange={this.handleClick2}
            checked={this.state.status === "payment"}
          /> Payment Phase |
          <input
            type="radio"
            name="status"
            value="progress"
            onChange={this.handleClick3}
            checked={this.state.status === "progress"}
          /> In Progress |
          <input
            type="radio"
            name="status"
            value="completed"
            onChange={this.handleClick4}
            checked={this.state.status === "completed"}
          /> Completed |
          <input
            type="radio"
            name="status"
            value="reset"
            onChange={this.handleClick5}
            checked={this.state.status === "reset"}
          /> Clear &nbsp;
        </label>
        </div><br />*/}
          <h1>Rental Tracking App</h1>

          <div id="rentalform">
            <form onSubmit={this.handleSubmit}>
              Company: &nbsp;&nbsp; <br />
              <input
                type="text"
                name="company"
                value={this.state.company}
                onChange={this.onChangeName}
                className="input"
                style={{width: "300px"}}
                required
              /><br /><br />
              Description: &nbsp;&nbsp; <br />
              <textarea
                rows="10"
                cols="50"
                required
                value={this.state.description}
                onChange={this.onChangeDescription}
                className="input"
                style={{width: "300px"}}
              /> <br />
              Progress: &nbsp;&nbsp;
              <input
                type="radio"
                name="status"
                value="empty"
                checked
                onChange={this.handleClick5}
              /> Start - 0%

              <br /><br />
              <input
                type="submit"
                name="Submit"
                value="Add New Rental Company"
                className="button"
                style={{width: "200px",}}
              />
            </form>
          </div>

        <div id="rentallist">
            <table border="1">
              <thead className="thead-light">
                <tr>
                  <th>Company Name</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Completed</th>
                </tr>
              </thead>
              <tbody>
                { this.rentalList() }
              </tbody>
            </table>
          </div>
        </div>

        <div id="mainlogstat-mobile">
        {/*}<label>
        <ProgressBar
          percentage={Math.min(Math.max(0, this.state.percentage), 100)}
        />
          <input
            type="radio"
            name="status"
            value="quotation"
            onChange={this.handleClick1}
            checked={this.state.status === "quotation"}
          /> Quotation Phase |
          <input
            type="radio"
            name="status"
            value="payment"
            onChange={this.handleClick2}
            checked={this.state.status === "payment"}
          /> Payment Phase |
          <input
            type="radio"
            name="status"
            value="progress"
            onChange={this.handleClick3}
            checked={this.state.status === "progress"}
          /> In Progress |
          <input
            type="radio"
            name="status"
            value="completed"
            onChange={this.handleClick4}
            checked={this.state.status === "completed"}
          /> Completed |
          <input
            type="radio"
            name="status"
            value="reset"
            onChange={this.handleClick5}
            checked={this.state.status === "reset"}
          /> Clear &nbsp;
        </label>
        </div><br />*/}
          <h1>Rental Tracking App</h1>

          <div id="rentalform-mobile">
            <form onSubmit={this.handleSubmit}>
              Company: &nbsp;&nbsp; <br />
              <input
                type="text"
                name="company"
                value={this.state.company}
                onChange={this.onChangeName}
                className="input"
                style={{width: "300px"}}
                required
              /><br /><br />
              Description: &nbsp;&nbsp; <br />
              <textarea
                rows="10"
                cols="50"
                required
                value={this.state.description}
                onChange={this.onChangeDescription}
                className="input"
                style={{width: "300px"}}
              /> <br />
              Progress: &nbsp;&nbsp;
              <input
                type="radio"
                name="status"
                value="empty"
                checked
                onChange={this.handleClick5}
              /> Start - 0%

              <br /><br />
              <input
                type="submit"
                name="Submit"
                value="Add New Rental Company"
                className="button"
                style={{width: "200px",}}
              />
            </form>
          </div>

        <div id="rentallist-mobile">
            <table border="1">
              <thead className="thead-light">
                <tr>
                  <th>Company Name</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Completed</th>
                </tr>
              </thead>
              <tbody>
                { this.rentalList() }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

export default LogsStatus
