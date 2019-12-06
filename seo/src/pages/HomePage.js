import React, {Component, Fragment} from 'react'
import axios from 'axios'
import {Hidden, CssBaseline} from '@material-ui/core'
import '../css/HomePage.css'

const NewsDetails = props => (
    <p>{props.event.news} &nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;
      <a href="#" onClick={() => { props.deleteNews(props.event._id)} }>
        Delete
      </a></p>
)

class HomePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      events: [],
      news: '',
      allnews: [],
    }
  }

  componentDidMount() {
    axios.get('/createeventapi/')
      .then(response => {
        this.setState({
          events: response.data[response.data.length-1],
        })
        console.log(this.state.events)
      })
      .catch((error) => {
        console.log(error);
      })
    axios.get('/updatenewsapi/')
      .then(response => {
        this.setState({
          allnews: response.data
        })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  routeChangeHome = () => {
    this.props.history.push('/welcomepage')
  }

  validateForm() {
    return (this.state.news != null)
  }

  onChangeNews = (e) => {
    this.setState({
      news: e.target.value
    })
  }

  onSubmit = (e) => {
    const newUpdate = {
      news: this.state.news,
    }
    console.log(newUpdate)
    if (this.validateForm()) {
      axios.post('/updatenewsapi/add', newUpdate)
        .then(res => console.log(res.data));
    }
  }

  deleteNews = (id) => {
    axios.delete('/updatenewsapi/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      allnews: this.state.allnews.filter(el => el._id !== id)
    })
  }

  newsList = () => {
    return this.state.allnews.map(currentevent => {
      return <NewsDetails event={currentevent} deleteNews={this.deleteNews} key={currentevent._id}/>;
    })
  }

  render() {
    const { events } = this.state

    return(
      <div>
      <div id="mainhomepage">
        <table border="0">
          <tbody>
            <tr>
              <td rowSpan="3">
                <header> Current Project: </header><br />
                <label>{this.state.events.name} </label>
                <br /><br />

                <label> Type: </label><br />
                  <p>{this.state.events.searchNames} </p>
                <label> Duration: </label><br />
                  <p> {this.state.events.startDate} - {this.state.events.endDate} </p>
                <label> Description: </label> <br />
                <p> {this.state.events.description} </p>
              </td>
            </tr>

            <tr>
              <td rowSpan="3">
                <div id="line2"></div>
              </td>
            </tr>

            <tr>
              <td rowSpan="3">
                <label>New Updates</label>
                { this.newsList() }
              </td>
            </tr>

            <tr>
              <td>
                <label> Add New Updates: </label>
                <form>
                  <textarea
                    name="news"
                    autoFocus
                    value={this.state.news}
                    onChange={this.onChangeNews}
                    placeholder="Add New Updates Here"
                    className="input" />
                  <br />

                  <button
                    type="submit"
                    text="Submit"
                    onClick={this.onSubmit}
                    disabled={!this.validateForm()}
                    className="button"
                  > Submit
                  </button>
                </form>
              </td>
            </tr>

          </tbody>
        </table>

        <button
          text="back"
          onClick={this.routeChangeHome}
          className="button"

        >Back To Main Page
        </button>

      </div>

      <div id="mainhomepage-mobile">
        <div>
          <header> Current Project: </header><br />
          <label>{this.state.events.name} </label>
          <br /><br />

          <label> Type: </label><br />
            <p>{this.state.events.searchNames} </p>
          <label> Duration: </label><br />
            <p> {this.state.events.startDate} - {this.state.events.endDate} </p>
          <label> Description: </label> <br />
          <p> {this.state.events.description} </p>

          <label>New Updates</label>
          { this.newsList() }
          <label> Add New Updates: </label>
          <form>
            <textarea
              name="news"
              autoFocus
              value={this.state.news}
              onChange={this.onChangeNews}
              placeholder="Add New Updates Here"
              className="input" />
            <br /><br />

            <button
              type="submit"
              text="Submit"
              onClick={this.onSubmit}
              disabled={!this.validateForm()}
              className="button"
            > Submit
            </button>
          </form>
        </div>

        <button
          text="back"
          onClick={this.routeChangeHome}
          className="button"

        >Back To Main Page
        </button>

      </div>
    </div>
    )
  }
}

export default HomePage
