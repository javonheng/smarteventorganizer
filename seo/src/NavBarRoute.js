import React, {Component, Fragment} from 'react'
import { Route, Switch } from "react-router-dom"
import ProtectedRoute from './protected.route'
import axios from 'axios'

//import pages here
import HomePage from './pages/HomePage'
import NavBar from './pages/NavBar'
import AllMembers from './pages/AllMembers'
import AddMembers from './pages/AddMembers'
import FileManager from './pages/FileManager'
import AddFiles from './pages/AddFiles'
import LogsStatus from './pages/LogsStatus'
import Inventory from './pages/Inventory'
import EventToDo from './pages/EventToDo'
import EventSOR from './pages/EventSOR'
import Publicity from './pages/Publicity'
import Editor from './pages/Editor'
import Attendance from './pages/Attendance'
import Forum from './pages/Forum'

export default class NavBarRoute extends Component {

  render() {
    return(
    <div>
      <NavBar>
        <Switch>
          <Route
            path="/homepage"
            component={HomePage}
            exact
          />
          <Route
            path="/teams/members"
            component={AllMembers}
          />
          <Route
            path="/teams/addnewmembers"
            component={AddMembers}
          />
          <Route
            path="/files/filemanager"
            component={FileManager}
          />
          <Route
            path="/files/addfiles"
            component={AddFiles}
          />
          <Route
            path="/event/todo"
            component={EventToDo}
          />
          <Route
            path="/event/sor"
            component={EventSOR}
          />
          <Route
            path="/media/publicity"
            component={Publicity}
          />
          <Route
            path="/logs/status"
            component={LogsStatus}
          />
          <Route
            path="/logs/inventory"
            component={Inventory}
          />
          <Route
            path="/media/editor"
            component={Editor}
          />
          <Route
            path="/media/attendance"
            component={Attendance}
          />
          <Route
            path="/forum"
            component={Forum}
          />
        <br />
        </Switch>
      </NavBar>
    </div>
  )}
}
