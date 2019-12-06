import React, {Component, Fragment} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import EventList from './EventList'
import PropTypes from 'prop-types';
import { AppBar, Toolbar, IconButton, Typography, Hidden, Drawer, Divider, CssBaseline, MenuItem, MenuList} from '@material-ui/core'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/icons/Menu';
import { withStyles } from '@material-ui/core/styles';

const drawerWidth = 240

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
    fontFamily: "'Crimson Text', serif",
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: '#20368f',
    color: '#ebebeb',
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#ebebeb',
    color: '#323232',
  },
  content: {
    flexGrow: 1,
    //padding: theme.palette.background.default,
    paddingLeft: theme.spacing(3),
    //marginTop: theme.spacing(0),
    fontFamily: "'Crimson Text', serif",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  titlenested: {
    paddingLeft: theme.spacing(2),
  },
})

class NavBar extends Component{
  constructor() {
    super()
    this.state={
      mobileOpen: false,
      name: '',
      id: '',
    }
  }

  componentDidMount() {
    axios.get('/api/createeventapi/')
      .then(response => {
        this.setState({
          name: response.data[response.data.length-1].name,
          id: response.data[response.data.length-1]._id,
        })
        console.log(response)
      })
      .catch((error) => {
        console.log(error);
      })
  }
  handleDrawerToggle = () => {
    this.setState({mobileOpen: !this.state.mobileOpen});
  }

  render() {
    const { classes, children, container } = this.props
    const { mobileOpen } = this.state
    const { id } = this.state

    const drawer = (
    <div>
      <Hidden smDown>
        <div className={classes.toolbar} />
      </Hidden>
      <MenuList>
        <MenuItem component={Link} to={`/homepage`}>
          <strong style={{fontSize: 30, fontFamily: "'Crimson Text', serif"}}>Home</strong>
        </MenuItem>

        <strong style={{fontSize: 30}} className={classes.titlenested}>Teams</strong>
        <MenuList className={classes.nested}>
          <MenuItem component={Link} to={`/teams/members`}>
            <label style={{fontSize: 20, fontFamily: "'Crimson Text', serif"}}>
              All Members
            </label>
          </MenuItem>
          <MenuItem component={Link} to={`/teams/addnewmembers`}>
            <label style={{fontSize: 20, fontFamily: "'Crimson Text', serif"}}>
              New Member
            </label>
          </MenuItem>
        </MenuList>

        <strong style={{fontSize: 25}} className={classes.titlenested}>File Manager</strong>
        <MenuList className={classes.nested}>
          <MenuItem component={Link} to={`/files/filemanager`}>
            <label style={{fontSize: 20, fontFamily: "'Crimson Text', serif"}}>
              View Files
            </label>
          </MenuItem>
          <MenuItem component={Link} to={`/files/addfiles`}>
            <label style={{fontSize: 20, fontFamily: "'Crimson Text', serif"}}>
              Add File
            </label>
          </MenuItem>
        </MenuList>

        <strong style={{fontSize: 25}} className={classes.titlenested}>Event</strong>
        <MenuList className={classes.nested}>
          <MenuItem component={Link} to={`/event/todo`}>
            <label style={{fontSize: 20, fontFamily: "'Crimson Text', serif"}}>
              Calendar
            </label>
          </MenuItem>
          <MenuItem component={Link} to={`/event/sor`}>
            <label style={{fontSize: 20, fontFamily: "'Crimson Text', serif"}}>
              S.O.R
            </label>
          </MenuItem>
        </MenuList>

        <strong style={{fontSize: 25}} className={classes.titlenested}> Logistics</strong>
        <MenuList className={classes.nested}>
          <MenuItem component={Link} to={`/logs/status`}>
            <label style={{fontSize: 20, fontFamily: "'Crimson Text', serif"}}>
              Outsource
            </label>
          </MenuItem>
          <MenuItem component={Link} to={`/logs/inventory`}>
            <label style={{fontSize: 20, fontFamily: "'Crimson Text', serif"}}>
              Inventory
            </label>
          </MenuItem>
        </MenuList>

        <strong style={{fontSize: 25}} className={classes.titlenested}>Media </strong>
        <MenuList className={classes.nested}>
          <MenuItem component={Link} to={`/media/publicity`}>
            <label style={{fontSize: 20, fontFamily: "'Crimson Text', serif"}}>
              Publicity
            </label>
          </MenuItem>
          <MenuItem component={Link} to={`/media/editor`}>
            <label style={{fontSize: 20, fontFamily: "'Crimson Text', serif"}}>
              Media Editor
            </label>
          </MenuItem>
          <MenuItem component={Link} to={`/media/attendance`}>
            <label style={{fontSize: 20, fontFamily: "'Crimson Text', serif"}}>
              Attendance
            </label>
          </MenuItem>
        </MenuList>

        <strong style={{fontSize: 25}} className={classes.titlenested}>Forum </strong>
        <MenuList className={classes.nested}>
          <MenuItem component={Link} to={`/forum`}>
            <label style={{fontSize: 20, fontFamily: "'Crimson Text', serif"}}>
              Chat
            </label>
          </MenuItem>
        </MenuList>

        <MenuItem component={Link} to='/eventlist'>
          <label style={{fontSize: 20, fontFamily: "'Crimson Text', serif"}}>
            <i>Other Projects</i>
          </label>
        </MenuItem>
      </MenuList>
      <Divider />
    </div>
  )

  return (
    <Fragment>
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            aria-label="open drawer"
            onClick={this.handleDrawerToggle}
            className={classes.navIconHide}
          >
            <Menu />
          </IconButton>
          <Typography variant="h4" color="inherit" noWrap>
            <header style={{fontSize: 40, fontFamily: "'Crimson Text', serif",}}>
              {this.state.name}
            </header>
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="">
        <Hidden mdUp>
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={this.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
            {children}
            {/*<Typography paragraph>
              </Typography>*/}
        </main>
    </div>
    </Fragment>
  )}
}

export default withStyles(styles)(NavBar)
