// src/components/TypingIndicator

import React, { Component } from 'react'
class TypingIndicator extends Component {
  render() {
    if (this.props.typingUsers.length > 0) {
      return (
        <div>
          {`${this.props.typingUsers
            .slice(0, 2)
            .join(' and ')} is typing...`}
        </div>
      )
    }
    return <div />
  }
}
export default TypingIndicator
