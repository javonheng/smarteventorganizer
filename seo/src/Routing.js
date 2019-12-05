import React, {Component, Fragment} from 'react'
import { Route, Switch, Redirect } from "react-router-dom"
import ProtectedRoute from './protected.route'
import Auth from './Auth'
import axios from 'axios'

//import pages here
import LoginPage from './pages/LoginPage'
import QueryForm from './pages/QueryForm'
import WelcomePage from './pages/WelcomePage'
import CreateEvent from './pages/CreateEvent'
import EventList from './pages/EventList'
import EditEvent from './pages/EditEvent'
import CheckList from './pages/CheckList'
import HomePage from './pages/HomePage'
import NavBarRoute from './NavBarRoute'
import SignUpForm from './pages/SignUpForm'
import Register from './pages/Register'

const PrivateRoute = ({ component: Component, ...rest }) => (
<Route {...rest} render={props =>
  Auth.getAuth() ? ( <Component {...props} />) : (<Redirect to={{pathname: "/"}}/>)}
  />);

export default class Routing extends Component {

  render() {
    return(
    <div>
      <Switch>
        <Route
          path="/"
          component={LoginPage}
          exact
        />
        <Route
          path="/register"
          component={Register}
          exact
        />
        <Route
          path="/queryform"
          component={QueryForm}
          exact
        />
        <PrivateRoute
          path="/welcomepage"
          component={WelcomePage}
          exact
        />
        <PrivateRoute
          path="/createevent"
          component={CreateEvent}
          exact
        />
        <PrivateRoute
          path="/eventlist"
          component={EventList}
          exact
        />
        <PrivateRoute
          path="/editevent/:id"
          component={EditEvent}
          exact
        />
        <PrivateRoute
          path="/checklist/:id"
          component={CheckList}
          exact
        />
        <PrivateRoute
          path="/homepage"
          component={NavBarRoute}
          exact
        />
        <PrivateRoute
          path="/teams/members"
          component={NavBarRoute}
        />
        <PrivateRoute
          path="/teams/addnewmembers"
          component={NavBarRoute}
        />
        <PrivateRoute
          path="/files/filemanager"
          component={NavBarRoute}
        />
        <PrivateRoute
          path="/files/addfiles"
          component={NavBarRoute}
        />
        <PrivateRoute
          path="/event/todo"
          component={NavBarRoute}
        />
        <PrivateRoute
          path="/event/sor"
          component={NavBarRoute}
        />
        <PrivateRoute
          path="/media/publicity"
          component={NavBarRoute}
        />
        <PrivateRoute
          path="/logs/status"
          component={NavBarRoute}
        />
        <PrivateRoute
          path="/logs/inventory"
          component={NavBarRoute}
        />
        <PrivateRoute
          path="/media/editor"
          component={NavBarRoute}
        />
        <PrivateRoute
          path="/media/attendance"
          component={NavBarRoute}
        />
        <PrivateRoute
          path="/forum"
          component={NavBarRoute}
        />
        <Route
          path="/signup"
          component={SignUpForm}
        />
      </Switch>
    </div>
  )}
}
