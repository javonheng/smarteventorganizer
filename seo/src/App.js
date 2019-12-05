import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Router, Route, Link} from 'react-router-dom'
import MessengerCustomerChat from 'react-messenger-customer-chat';

import Routing from './Routing'
//import files here

function App () {
    return(
      <div>
        <Routing />
        <MessengerCustomerChat
          pageId="123215559072306"
          appId="524775841688435"
          htmlRef="welcomepage, eventlist"
          loggedInGreeting="Hello! How can I help you?"
          loggedOutGreeting="See you again soon!"
          greetingDialogDelay={1}
          themeColor="#20368f"
          minimized={false}
        />
      </div>
    )
}

export default App;
