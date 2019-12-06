import React, {Component} from 'react'
import axios from 'axios'
import Dropzone from 'react-dropzone'
import '../css/AddFiles.css'

class AddFiles extends Component {
  constructor(props) {
    super(props)
    this.state={
      events: [],
      isDragActive: false,
    }
  }

  onChangeState =() => {
    this.setState({
      isDragActive: true,
    })
  }

  onDrop = (acceptedFiles) => {
    console.log(acceptedFiles);
    var data = new FormData();
    //var imagedata = document.querySelector('input[type="file"]').files[0];
    data.append('file', acceptedFiles[0]);
    axios.post('/allfiles/upload', data)
      .then(window.alert(
        'Upload Successful'
      ))
      .catch(err => console.log(err))
  }

  componentDidMount() {
    axios.get('/createeventapi/')
      .then(response => {
        this.setState({ events: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  render() {
    const { events } = this.state

    return(
      <div className="dropzone">

       <Dropzone
        onDrop={this.onDrop}
        onDragOver={this.onChangeState}
        /*accept=""
        minSize=''
        maxSize=''*/
       >
         {({getRootProps, getInputProps, isDragActive}) => (
           <div {...getRootProps()}>
             <input {...getInputProps()} />
             {isDragActive ? "Drop Your Files Here!" : "Drop Your Files here or Click to Upload!"}
           </div>
         )}
       </Dropzone>
     </div>
    )
  }
}

export default AddFiles
