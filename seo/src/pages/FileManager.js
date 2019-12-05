import React, {Component} from 'react'
import axios from 'axios'
import '../css/FileManager.css'

class FileManager extends Component {
  constructor(props) {
    super(props)
    this.state={
      events: [],
      readfiles: [],
      file: null,
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
    /*axios.get('http://localhost:5000/files')
      .then(response => {
        this.setState({ readfiles: response.data})
        console.log(this.state.readfiles)
        console.log(this.state.readfiles[3].filename)
      })
      .catch((error) => {
        console.log(error);
      })*/
    axios.get('http://localhost:5005/files/')
      .then(response => {
        this.setState({ readfiles: response.data})
        console.log(this.state.readfiles)
        })
      .catch((error) => {
        console.log(error);
      })
  }

  fileChanged = (event) => {
    this.setState({
      file: event.target.files[0]
    })
  }

  deleteFile = (event) => {
    event.preventDefault()
    const id = event.target.id

    axios.delete('http://localhost:5005/files/'+id)
      .then(response => { console.log(response.data)});
  }

  uploadFile = (event) => {
    event.preventDefault()
    var data = new FormData();
    //var imagedata = document.querySelector('input[type="file"]').files[0];
    data.append('file', this.state.file);
    axios.post('http://localhost:5005/upload', data)
      .then(res => console.log(res.data));
  }

  render() {
    const { events, readfiles, file } = this.state
    /*let images = readfiles.map(image => {
          return (
            <div>
              <img key={image._id} src={'http://localhost:5000/files/'+image.filename} /><br/>

            </div>
          )
       })*/

    return(
        //{/*images*/}
      <div className="App">
        <header className="App-header">
          {/*<img src={} className="App-logo" alt="logo" />*/}
          <h1>File Manager</h1>
        </header>
        <div className="App-content">

          <div className="file-input-wrapper">
            <button className="btn-file-input">Choose File</button>
            <input
              type="file"
              name="file"
              onChange={this.fileChanged}
            >
            </input>
          </div>

          <button onClick={this.uploadFile} className="button">
            Upload
          </button>
          <table className="App-table">
            <thead>
              <tr>
                  <th>File</th>
                  <th>Uploaded</th>
                  <th>Size</th>
                  <th></th>
              </tr>
            </thead>
            <tbody>
              {readfiles.map((file, index) => {
                var d = new Date(file.uploadDate);
                return (
                  <tr key={index}>
                    <td>
                      <a href={`http://localhost:5005/files/${file.filename}`} target="_blank">{file.filename}</a>
                    </td>
                    <td>
                      {`${d.toLocaleDateString()} ${d.toLocaleTimeString()}`}
                    </td>
                    <td>
                      {(Math.round(file.length/100) / 10)+'KB'}
                    </td>
                    <td>
                      <button onClick={this.deleteFile} id={file._id} className="removebutton">
                        Remove
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default FileManager
