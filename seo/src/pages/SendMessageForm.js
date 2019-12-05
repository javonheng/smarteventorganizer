import React from 'react'
import '../css/Forum.css'

class SendMessageForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            message: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        this.setState({
            message: e.target.value
        })
        this.props.whenType(this.props.roomId)
    }

    handleSubmit(e) {
        e.preventDefault()
        this.props.sendMessage(this.state.message)
        this.setState({
            message: ''
        })
    }

    render() {
        return (
            <form
                onSubmit={this.handleSubmit}
                className="send-message-form">
                <input
                    disabled={this.props.disabled}
                    onChange={this.handleChange}
                    value={this.state.message}
                    placeholder="ENTER your message"
                    type="text" />
            </form>
        )
    }
}

export default SendMessageForm
