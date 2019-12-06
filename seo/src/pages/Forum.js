import React, {Component} from 'react'
import axios from 'axios'
import {ChatManager, TokenProvider} from '@pusher/chatkit-client'
import MessageList from './MessageList'
import SendMessageForm from './SendMessageForm'
import RoomList from './RoomList'
import NewRoomForm from './NewRoomForm'
import '../css/Forum.css'
import TypingIndicator from './TypingIndicator'

const tokenUrl = "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/59de55eb-eac4-4331-b736-c1d2d44a9f90/token";
const instanceLocator = "v1:us1:59de55eb-eac4-4331-b736-c1d2d44a9f90";

class Forum extends Component {
  constructor(props) {
    super(props)
    this.state={
      events: [],
      roomId: null,
      messages: [],
      joinableRooms: [],
      joinedRooms: [],
      user: '',
      typingUsers: [],
    }
    this.sendMessage = this.sendMessage.bind(this)
    this.subscribeToRoom = this.subscribeToRoom.bind(this)
    this.getRooms = this.getRooms.bind(this)
    this.createRoom = this.createRoom.bind(this)
  }

 async omponentDidMount() {
    axios.get('/createeventapi/')
      .then(response => {
        this.setState({ events: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  handleSubmit = () => {
    const chatManager = new ChatManager({
      instanceLocator,
      userId: this.state.user,
      tokenProvider: new TokenProvider({
          url: tokenUrl
      })
    })

    chatManager.connect()
      .then(currentUser => {
        this.currentUser = currentUser
        this.getRooms()
        console.log('Succesful Connection')
      })
      .catch(err => console.log('error on connecting: ', err))
  }

  handleChange = (e) => {
    const {name, value} = e.target
    this.setState({
      [name]: value
    })
  }
  getRooms() {
        this.currentUser.getJoinableRooms()
        .then(joinableRooms => {
            this.setState({
                joinableRooms,
                joinedRooms: this.currentUser.rooms
            })
        })
        .catch(err => console.log('error on joinableRooms: ', err))
    }

    subscribeToRoom(roomId) {
        this.setState({ messages: [] })
        this.currentUser.subscribeToRoom({
            roomId: roomId,
            hooks: {
                onMessage: message => {
                    console.log("Received Message:", message)
                    this.setState({
                        messages: [...this.state.messages, message]
                    })
                },
                onUserStartedTyping: user => {
                  console.log(`User ${user.name} started typing`)
                  this.setState({
                    typingUsers: [...this.state.typingUsers, user.name],
                  })
                },
                onUserStoppedTyping: user => {
                  console.log(`User ${user.name} stopped typing`)
                  this.setState({
                    typingUsers: this.state.typingUsers.filter(
                      username => username !== user.name
                    ),
                  })
                },
            }
        })
        .then(room => {
            this.setState({
                roomId: room.id
            })
            this.getRooms()
        })
        .catch(err => console.log('error on subscribing to room: ', err))
    }

    sendtypingIndicators = (roomId) => {
      this.currentUser.isTypingIn({
        roomId: roomId
      })
      .then(() => {
        console.log("Typing Indicators Success!")
      })
      .catch(err => {
        console.log(`Error sending typing indicator: ${err}`)
      })
    }

    sendMessage(text) {
        this.currentUser.sendMessage({
            text,
            roomId: this.state.roomId
        })
    }

    createRoom(name) {
        this.currentUser.createRoom({
            name
        })
        .then(room => this.subscribeToRoom(room.id))
        .catch(err => console.log('error with createRoom: ', err))
    }

  render() {
    const { events } = this.state
    return(
      <div id="mainforum">
        <h1>Chat Forum</h1>
          <form>
            <label>Chat ID: </label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input
              type="text"
              name="user"
              value={this.state.user}
              onChange={this.handleChange}
              className="input"
              style={{width: "250px",}}
            /> <br /><br />
            <button
              type="button"
              value="Start"
              onClick={this.handleSubmit}
              className="button"
              style={{width: "100px",}}
            >Start
            </button>
          </form>

        <div className="forum">
          <RoomList
            subscribeToRoom={this.subscribeToRoom}
            rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}
            roomId={this.state.roomId}
          />
          <MessageList
            roomId={this.state.roomId}
            messages={this.state.messages}
          />
          <SendMessageForm
            disabled={!this.state.roomId}
            sendMessage={this.sendMessage}
            whenType={this.sendtypingIndicators}
            roomId={this.state.roomId}
          />
          <NewRoomForm createRoom={this.createRoom}
          />
          <TypingIndicator typingUsers={this.state.typingUsers}
          />
        </div>
      </div>
    )
  }
}

export default Forum
