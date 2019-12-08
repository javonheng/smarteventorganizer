import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import QRCode from 'qrcode.react'
import '../css/Attendance.css'
import { FacebookShareButton, FacebookIcon } from 'react-share'
import EDM from './EDM'
import domtoimage from 'dom-to-image'

/*const element = ()
ReactDOM.render(element, document.getElementById('html-text'))*/

const AttendeeDetails = props => (
  <tr>
    <td>{props.event.name}</td>
    <td>{props.event.event}</td>
    <td>{props.event.pax}</td>
    <td>{props.event.remarks}</td>
    <td>
      <input
        type="checkbox"
        onClick={() => {props.handlePresence(props.event._id, props.event.name, props.event.pax, props.event.event, props.event.remarks, props.event.isPresent)} }
      />
      {/*<a href="#" onClick={() => { props.handlePresence(props.event._id, props.event.name, props.event.pax, props.event.event, props.event.remarks, props.event.isPresent)} }>
        {props.event.isPresent.toString()}
      </a>*/}
    </td>
    <td>
      <a href="#" onClick={() => { props.deleteAttendee(props.event._id)} } style={{textDecoration: "none", color: "#323232", textShadow: "2px 3px 5px #6d6d6d",}}>
        Delete
      </a>
    </td>
  </tr>
)

class Attendance extends Component {
  constructor(props) {
    super(props)
    this.state={
      events: [],
      value: 'https://smarteventorganizer.herokuapp.com/signup',
      size: 128,
      fgColor: '#000000',
      bgColor: '#ffffff',
      level: 'L',
      includeMargin: false,
      attendees: [],
      label1: '',
      label2: '',
      label3: '',
      pointer1: '',
      pointer2: '',
      pointer3: '',
      pointer4: '',
      pointer5: '',
      bannerlink: '',
      link1: '',
      link2: '',
      link3: '',
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
    axios.get('/api/attendeesapi/')
      .then(response => {
        this.setState({ attendees: response.data })
        console.log(response)
      })
      .catch((error) => {
        console.log(error);
      })
  }

  routeChangeSignUp = () => {
    this.props.history.push('/signup')
  }

  deleteAttendee = (id) => {
    axios.delete('/api/attendeesapi/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      attendees: this.state.attendees.filter(el => el._id !== id)
    })
  }

  attendeesList() {
    return this.state.attendees.map(currentevent => {
      return <AttendeeDetails event={currentevent} deleteAttendee={this.deleteAttendee} key={currentevent._id} handlePresence={this.handlePresence}/>;
    })
  }

  handlePresence = (id, n, p, e, r, presc) => {
    const newPresence = {
      name: n,
      pax: p,
      event: e,
      remarks: r,
      isPresent: !presc,
    }
    console.log(newPresence)
    axios.post('/api/attendeesapi/update/'+id, newPresence)
      .then(res => console.log(res.data));
  }

  handleChange = (event) => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  downloadEDM = () => {
    /*domtoimage.toBlob(document.getElementById('edm'))
      .then(function (blob) {
    window.saveAs(blob, 'EDM.png')})*/

    domtoimage.toPng(document.getElementById('edm'), { quality: 0.95 })
    .then(function (dataUrl) {
        var link = document.createElement('a');
        link.download = 'EDM.png';
        link.href = dataUrl;
        link.click();
    });
  }

  downloadQR = () => {
  const canvas = document.getElementById("qr")
        {console.log(canvas)}
  const pngUrl = canvas
    .toDataURL("image/png")
    .replace("image/png", "image/octet-stream");
  let downloadLink = document.createElement("a");
  downloadLink.href = pngUrl;
  downloadLink.download = "qrcode.png";
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
};

  render() {
    const { events } = this.state
    var code = `<QRCode
      value={"${this.state.value}"}
      size={${this.state.size}}
      bgColor={"${this.state.bgColor}"}
      fgColor={"${this.state.fgColor}"}
      level={"${this.state.level}"}
      includeMargin={${this.state.includeMargin}}
    />`

    return(
      <div id="mainattendance">
        <h1> Generate QR Code for Attendance </h1>
        <table border="0">
        <tbody>
          <tr>
            <td>
              <div>

                <div>
                  <label>
                    Size (px):
                    <br />
                    <input
                      type="number"
                      onChange={(e) =>
                        this.setState({size: parseInt(e.target.value, 10) || 0})
                      }
                      value={this.state.size}
                      className="input"
                      style={{width: "75px", textAlign: "center"}}
                    />
                  </label>
                </div>

                <div>
                  <label>
                    Background Color:
                    <br />
                    <input
                      type="color"
                      onChange={(e) => this.setState({bgColor: e.target.value})}
                      value={this.state.bgColor}
                      style={{borderRadius: "15px", backgroundColor: "#6d6d6d"}}
                    />
                  </label>
                </div>

                <div>
                  <label>
                    Foreground Color:
                    <br />
                    <input
                      type="color"
                      onChange={(e) => this.setState({fgColor: e.target.value})}
                      value={this.state.fgColor}
                      style={{borderRadius: "15px", backgroundColor: "#6d6d6d"}}
                    />
                  </label>
                </div>

                <div>
                  <label>
                    Error Level:
                    <br />
                    <select
                      onChange={(e) => this.setState({level: e.target.value})}
                      value={this.state.level}
                      className="input"
                      style={{width: "50px"}}
                    >
                      <option value="L">L</option>
                      <option value="M">M</option>
                      <option value="Q">Q</option>
                      <option value="H">H</option>
                    </select>
                  </label>
                </div>

                <div>
                  <label>
                    Include Margin:
                    <br />
                    <input
                      type="checkbox"
                      checked={this.state.includeMargin}
                      onChange={(e) => this.setState({includeMargin: e.target.checked})}
                      className="input"
                    />
                  </label>
                </div>

                <div>
                  <label>
                    Re-direct Link:
                    <br />
                    <textarea
                      rows="6"
                      cols="30"
                      onChange={(e) => this.setState({value: e.target.value})}
                      value={this.state.value}
                      className="input"
                    />
                  </label>
                </div>

                <div>
                  <label>
                    Parameters:
                    <br />
                    <textarea rows="10" cols="30" disabled={true} value={code}
                      className="input"
                    />
                  </label>
                </div>

                <QRCode
                  id="qr"
                  value={this.state.value}
                  size={this.state.size}
                  fgColor={this.state.fgColor}
                  bgColor={this.state.bgColor}
                  level={this.state.level}
                  renderAs="canvas"
                  includeMargin={this.state.includeMargin}
                /><br />

                <button onClick={this.downloadQR} className="button">
                  Download QR
                </button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                <button
                  onClick={this.routeChangeSignUp}
                  className="button"
                > To QR Code Link
                </button>
              </div>
            </td>

            <td id="attendees">
              <table border="1">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Event</th>
                    <th>Pax</th>
                    <th>Remarks</th>
                    <th>Present</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody>
                  { this.attendeesList() }
                </tbody>
              </table>
            </td>
          </tr>

          <tr>
            <td colSpan="2">
              <h2>Poster Template</h2>

              <label>Label1:</label><br />
              <textarea
                name="label1"
                value={this.state.label1}
                onChange={this.handleChange}
                rows="5"
                cols="40"
                className="input"
              ></textarea><br />

              <label>Label2:</label><br />
              <textarea
                name="label2"
                value={this.state.label2}
                onChange={this.handleChange}
                rows="5"
                cols="40"
                className="input"
              ></textarea><br />
              <label>Label3:</label><br />
              <textarea
                name="label3"
                value={this.state.label3}
                onChange={this.handleChange}
                rows="5"
                cols="40"
                className="input"
              ></textarea><br />
              <label>Pointer1:</label><br />
              <input
                type="text"
                name="pointer1"
                value={this.state.pointer1}
                maxLength="30"
                onChange={this.handleChange}
                className="input"
                style={{width: "250px"}}
              /><br />
              <label>Pointer2:</label><br />
              <input
                type="text"
                name="pointer2"
                maxLength="30"
                value={this.state.pointer2}
                onChange={this.handleChange}
                className="input"
                style={{width: "250px"}}
              /><br />
              <label>Pointer3:</label><br />
              <input
                type="text"
                name="pointer3"
                maxLength="30"
                value={this.state.pointer3}
                onChange={this.handleChange}
                className="input"
                style={{width: "250px"}}
              /><br />
              <label>Pointer4:</label><br />
              <input
                type="text"
                name="pointer4"
                maxLength="30"
                value={this.state.pointer4}
                onChange={this.handleChange}
                className="input"
                style={{width: "250px"}}
              /><br />
              <label>Pointer5:</label><br />
              <input
                type="text"
                name="pointer5"
                maxLength="30"
                value={this.state.pointer5}
                onChange={this.handleChange}
                className="input"
                style={{width: "250px"}}
              /><br /><br />
              <label>Banner Link Address:</label><br />
              <input
                type="text"
                name="bannerlink"
                value={this.state.bannerlink}
                onChange={this.handleChange}
                className="input"
              /><br />
              <label>Link Address 1:</label><br />
              <input
                type="text"
                name="link1"
                value={this.state.link1}
                onChange={this.handleChange}
                className="input"
              /><br />
              <label>Link Address 2:</label><br />
              <input
                type="text"
                name="link2"
                value={this.state.link2}
                onChange={this.handleChange}
                className="input"
              /><br />
              <label>Link Address 3:</label><br />
              <input
                type="text"
                name="link3"
                value={this.state.link3}
                onChange={this.handleChange}
                className="input"
              /><br /><br />

              <button onClick={this.downloadEDM} className="button">
                Export As PNG
              </button>

              <div className="line"></div>

              <div id="edm">
                  <EDM
                    data={this.state}
                  />
                  <div style={{textAlign: "center"}}>
                    <p><strong>Scan to Register!</strong></p>
                      <QRCode
                        id="qr"
                        value={this.state.value}
                        size={this.state.size}
                        fgColor={this.state.fgColor}
                        bgColor={this.state.bgColor}
                        level={this.state.level}
                        renderAs="canvas"
                        includeMargin={this.state.includeMargin}
                      /><br />
                    </div>
                    <p style={{align:"center"}}>
                      <small>&copy; 2019 Javon Smart Event Organizer.
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;All Right Reserved</small>
                    </p>
                </div>
            </td>
          </tr>
        </tbody>
      </table>

    </div>
    )
  }
}

export default Attendance
