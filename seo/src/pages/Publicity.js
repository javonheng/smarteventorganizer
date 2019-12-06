import React, {Component} from 'react'
import axios from 'axios'
import '../css/Publicity.css'
import { FacebookProvider, Share, Feed, ShareButton, Comments, CommentsCount, EmbeddedPost, Page, Group, MessageUs, SendToMessenger, MessengerCheckbox, CustomChat, Initialize,Subscribe, Status, Profile } from 'react-facebook'
import { FacebookShareButton, FacebookIcon } from 'react-share'

//doesn't load components until refreshed
class Publicity extends Component {
  constructor(props) {
    super(props)
    this.state={
      events: [],
      img: null,
      caption: '',
      url: '',
      postid: '',
      pageid: '',
      pagename: '',
      recipients: [],
      sender: '',
      subject: '',
      html: '',
      value: '',
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
    axios.get('/api/savedpresetapi/5d8c639d37df76d7fde95b4b')
      .then(response => {
        this.setState({
          postid: response.data.postid,
          pageid: response.data.pageid,
          pagename: response.data.pagename,
        })
      })
      .catch((error) => {
        console.log(error);
      })
  }
  savepreset = (e) => {
    e.preventDefault()
    const newpreset = {
      pageid: this.state.pageid,
      postid: this.state.postid,
      pagename: this.state.pagename,
    }
    axios.post('/api/savedpresetapi/update/5d8c639d37df76d7fde95b4b', newpreset)
      .then(res => console.log(res.data))
    window.location.reload()
  }

  captionChanged = (event) => {
    this.setState({
      caption: event.target.value
    })
  }
  fileChanged = (event) => {
    this.setState({
      img: event.target.files[0]
    })
  }
  urlChanged = (event) => {
    this.setState({
      url: event.target.value
    })
  }

  pagenameChanged = (event) => {
    this.setState({
      pagename: event.target.value
    })
  }
  postidChanged = (event) => {
    this.setState({
      postid: event.target.value
    })
  }
  pageidChanged = (event) => {
    this.setState({
      pageid: event.target.value
    })
  }

  validateForm = () => {
    return (
      this.state.recipients.length > 0 &&
      this.state.sender.length > 0 &&
      this.state.subject.length > 0 &&
      this.state.html.length > 0
    )
  }

  sendEmail = _ => {
  (async () => {
    const rawResponse = await fetch('/api/send-campaigns', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        recipients: this.state.recipients,
        sender: this.state.sender,
        subject: this.state.subject,
        html: this.state.html,
      })
    })
  })()
  alert('Emails sent out!')
  }

  handleChange = (event) => {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
  }

  handleRecipientsChange = (event) => {
    this.setState({
      value: event.target.value
    })
  }
  handleKeyDown = (e) => {
    if (['Enter', 'Tab', ','].includes(e.key)) {
      e.preventDefault()

      var email = this.state.value.trim()

      if (email) {
        this.setState({
          recipients: [...this.state.recipients, email],
          value: '',
        })
      }
    }
  }
  handleDelete = (toBeRemoved) => {
    this.setState({
      recipients: this.state.recipients.filter(email => email!== toBeRemoved)
    })
  }

  renderForm() {
    return (
      <form>
        <label style={{fontSize: "24px"}}><strong>Email Marketing</strong></label><br />

        <p> Sender: {this.state.sender} </p>
        <input
          name="sender"
          type="email"
          autoFocus
          value={this.state.sender}
          onChange={this.handleChange}
          placeholder="Sender's Email Address"
          required
          className="input"
        />
        <br />

        <p> Recipients(s):
        {this.state.recipients.map(email =>
          <div key={email}>
            {email}
            <button
              type="button"
              onClick={() => this.handleDelete(email)}
            > &times;
            </button>
          </div>
        )} {console.log(this.state.recipients)}</p>
        <input
          name="recipients"
          type="email"
          autoFocus
          multiple
          value={this.state.value}
          onChange={this.handleRecipientsChange}
          onKeyDown={this.handleKeyDown}
          placeholder="Recipient/s Email Address"
          className="input"
        /><br />

        <p> Subject: {this.state.subject} </p>
        <input
          name="subject"
          type="text"
          autoFocus
          value={this.state.subject}
          onChange={this.handleChange}
          placeholder="Subject Title"
          required
          className="input"
        />
        <br />

        <p> EDM Field: {this.state.html} </p>
        <textarea
          name="html"
          autoFocus
          rows={12}
          cols={80}
          value={this.state.html}
          onChange={this.handleChange}
          placeholder="Input html EDM here!"
          className="input"
         />
        <br />

        <button
          disabled={!this.validateForm()}
          type="submit"
          text="Submit"
          onClick={this.sendEmail}
          className="button"
        >
        Send Emails
        </button>
      </form>
    )
  }

  render() {
    const { events } = this.state
    return(
      <div id="mainpublicity">
        <h1>Marketing Tools</h1>

        <table border="0">
        <tbody>
          <tr>
            <td>
              {this.renderForm()}
            </td>

            <td>
              <button
                onClick={this.savepreset}
                className="button"
                style={{width: "200px"}}
              > Save Current Data
              </button><br /><br />

              <label style={{fontSize: "24px",}}><strong>Post to Facebook</strong></label>
              <br />
              <label>Caption: </label> &nbsp;&nbsp;&nbsp;
              <input
                type="text"
                onChange={this.captionChanged}
                className="input"
                style={{width: "250px"}}
              /><br />
              <label>Url Feature: </label> &nbsp;&nbsp;&nbsp;
              <input
                type="text"
                onChange={this.urlChanged}
                className="input"
                style={{width: "250px"}}
              />

              {/*<label>Image Upload: </label>
              <input
                type="file"
                onChange={this.fileChanged}
              />
            <br />*/}

            {/*Share Button*/}
              <FacebookShareButton
                url={this.state.url}
                quote={this.state.caption}
                hashtag="#SmartEventOrganizer"
                className="Demo__some-network__share-button"
                style={{paddingLeft: "250px", marginTop: "30px", cursor: "pointer",}}
              >
                <FacebookIcon
                  size={40}
                  square
                />
              </FacebookShareButton>
            </td>
          </tr>
        </tbody>
        </table>

      {/*<FacebookProvider appId="524775841688435">
        <ShareButton href="https://www.facebook.com/smartevent0rganizer/" layout="button">
          Share to Facebook
        </ShareButton>
      </FacebookProvider><br />*/}
      <table border="0" id="sm-table">
        <tbody>
        <tr>
          <td>
            <h2>Access Event Group</h2>
            {/*Group*/}
            <FacebookProvider appId="524775841688435">
              <Group
                href="https://www.facebook.com/groups/2676342119056112/"
                width="350"
                showSocialContext={true}
                showMetaData={true}
                skin="dark"
              />
            </FacebookProvider>
          </td>

          <td>
            <h2>Track Event Page Messages</h2>

            <FacebookProvider appId="524775841688435">
              <MessageUs messengerAppId="524775841688435" pageId="123215559072306"/>
            </FacebookProvider><br />
          </td>
        </tr>

        <tr>
          <td>
            <label>Post ID (only pages you own): </label>
            <input
              type="text"
              value={this.state.pageid}
              onChange={this.pageidChanged}
              className="input"
              style={{width: "250px"}}
            /><br /><br />
            <FacebookProvider appId="524775841688435">
              <MessageUs messengerAppId="524775841688435" pageId={this.state.pageid}/>
            </FacebookProvider><br />
          </td>

          <td>
            <h2>Access Event Page Timeline</h2>
            {/*Page*/}
            <FacebookProvider appId="524775841688435">
              <Page href="https://www.facebook.com/smartevent0rganizer/" tabs="timeline" width="2000" />
            </FacebookProvider>
          </td>
        </tr>

        <tr>
          <td>
            <h2> Track Pages You Like </h2>
            <label>Page Name: </label> &nbsp;&nbsp;&nbsp;
            <input
              type="text"
              value={this.state.pagename}
              onChange={this.pagenameChanged}
              className="input"
              style={{width: "250px"}}
            /><br /><br />
            <FacebookProvider appId="524775841688435">
              <Page href={`https://www.facebook.com/${this.state.pagename}`} tabs="timeline" width="800" />
            </FacebookProvider>
          </td>

          <td>
            <h2>Track Post</h2>
            <i>Click on the hours ago to view post id</i><br />
            {/*Embedded Post*/}
            <label>Post ID: </label>
            <input
              type="text"
              value={this.state.postid}
              onChange={this.postidChanged}
              className="input"
              style={{width: "250px"}}
            /><br /><br />
            <FacebookProvider appId="524775841688435">
              <EmbeddedPost href={`https://www.facebook.com/smartevent0rganizer/posts/${this.state.postid}`} width="800" data-show-text="true"/>
            </FacebookProvider>
          </td>
        </tr>

        <tr>
          <td>
          </td>

          <td>
            <h3>Page Comments</h3>
            <FacebookProvider appId="524775841688435">
              <Comments href="https://www.facebook.com/smartevent0rganizer/posts/123290612398134?comment_id=123442652382930" data-include-parent="true" width="350" colorscheme="dark"/>
            </FacebookProvider>
          </td>
        </tr>
        </tbody>
      </table>

    </div>
    )
  }
}

export default Publicity
