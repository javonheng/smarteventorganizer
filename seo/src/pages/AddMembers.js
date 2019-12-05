import React, {Component} from 'react'
import axios from 'axios'
import '../css/AddMembers.css'

class AddMembers extends Component {
  constructor(props) {
    super(props)
    this.state={
      events: [],
      file: null,   //for upload
      isInternal: '',
      name: '',
      company: '',
      role: '',
      contact: '',
      email: '',
      inputname: '',
    }
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

  onChangeFile = (e) => {
    this.setState({ file: e.target.files[0]})
  }

  handleChange = (event) => {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
  }

  validateForm() {
    return (
      this.state.name.length > 0 &&
      this.state.role.length > 0 &&
      this.state.contact.length > 0 &&
      this.state.email.length > 0 &&
      this.state.isInternal != null &&
      this.state.company.length > 0
    )
  }

  uploadAction = (e) => {
    e.preventDefault()
    var data = new FormData();
    //var imagedata = document.querySelector('input[type="file"]').files[0];
    data.append('file', this.state.file);

    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    axios.post('http://localhost:5000/upload', data, config)
      .then(res => console.log(res.data));

    const newMember = {
      name: this.state.name,
      company: this.state.company,
      role: this.state.role,
      contact: this.state.contact,
      email: this.state.email,
      isInternal: this.state.isInternal,
      }
      if (this.validateForm()) {
        axios.post('http://localhost:4000/addmembersapi/add', newMember)
          .then(res => console.log(res.data));
      }
  }

  render() {
    const { events } = this.state

    return(
        <div id="mainaddmembers">

          <div>
          <h1>Add New Member</h1>
          <form encType="multipart/form-data">
          <input
            name="name"
            autoFocus
            value={this.state.name}
            onChange={this.handleChange}
            placeholder="Full Name"
            className="input"
          />
            <br />
          <input
            name="company"
            autoFocus
            value={this.state.company}
            onChange={this.handleChange}
            placeholder="Your Company Name"
            className="input"
          />
          <br />
          <input
            name="role"
            autoFocus
            value={this.state.role}
            onChange={this.handleChange}
            placeholder="Your Role/Position"
            className="input"
          />
          <br />
          <input
            name="contact"
            autoFocus
            type="tel"
            value={this.state.contact}
            onChange={this.handleChange}
            placeholder="Contact"
            className="input"
          />
          <br />
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
          <label className="label-container">
            <input
              type="radio"
              name="isInternal"
              value="yes"
              checked={this.state.isInternal === "yes"}
              onChange={this.handleChange}
            /><span className="marked"></span> Internal
          </label>
          <label className="label-container">
            <input
              type="radio"
              name="isInternal"
              value="no"
              checked={this.state.isInternal === "no"}
              onChange={this.handleChange}
            /><span className="marked"></span> External
          </label>
          <br /><br />

            <div className="file-input-wrapper">
              <button className="btn-file-input">Choose File</button>
              <input
                type="file"
                name="file"
                id="file"
                onChange={this.onChangeFile}
              >
              </input>
            </div><br /><br />

            <button
              disabled={!this.validateForm()}
              type="submit"
              onClick={this.uploadAction}
              className="button"
            >
            Submit
            </button>
          </form>
          </div>
          <br />
        </div>
    )
  }
}

export default AddMembers
