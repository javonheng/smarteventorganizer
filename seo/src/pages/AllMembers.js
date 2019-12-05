import React, {Component} from 'react'
import axios from 'axios'
import FilterableTable from 'react-filterable-table'
import '../css/AllMembers.css'

class AllMembers extends Component {
  constructor(props) {
    super(props)
    this.state={
      events: [],
      newmemberdet: [],
      source: null,
      inputname: '',
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
      axios.get('http://localhost:5000/files')
        .then(response => {
          this.setState({ readfiles: response.data})
          console.log(this.state.readfiles)
        })
        .catch((error) => {
          console.log(error);
        })

    axios.get('http://localhost:4000/addmembersapi')
      .then(response => {
        this.setState({ newmemberdet: response.data })
        console.log(this.state.newmemberdet)
      })
      .catch((error) => {
        console.log(error);
      })
  }

  handleChange = (event) => {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
  }
  showpic(){
    return <img src={this.state.source}/>
  }

  showNewMember = (e) => {
    axios.get(`http://localhost:5000/image/${this.state.inputname}.png`, { responseType: 'arraybuffer'},)
      .then(response => {
        const base64 = btoa(
          new Uint8Array(response.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            '',
          ),
        );
        this.setState({ source: "data:image/png;base64," + base64 });
        console.log(this.state.source)
      })

    axios.get(`http://localhost:5000/image/${this.state.inputname}.jpg`, { responseType: 'arraybuffer'},)
      .then(response => {
        const base64 = btoa(
          new Uint8Array(response.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            '',
          ),
        );
        this.setState({ source: "data:image/jpg;base64," + base64 });
        console.log(this.state.source)
      })
  }

  deleteMember(id) {
    axios.delete('http://localhost:4000/addmembersapi/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      events: this.state.events.filter(el => el._id !== id)
    })
  }

  render() {
    const { events, newmemberdet } = this.state
    const fields = [
      { name: 'name', displayName: "Name", inputFilterable: true, exactFilterable: true, sortable: true},
      { name: 'company', displayName: "Company", inputFilterable: true, exactFilterable: true, sortable: true},
      { name: 'role', displayName: "Role", inputFilterable: true, exactFilterable: true, sortable: true},
      { name: 'contact', displayName: "Contact", inputFilterable: true, exactFilterable: true, sortable: true},
      { name: 'email', displayName: "Email", inputFilterable: true, exactFilterable: true, sortable: true},
      { name: 'isInternal', displayName: "Internal?", inputFilterable: true, exactFilterable: true, sortable: true}
    ]

    return(
      <div id="mainmembers">
        <div id="membertitle">
          <h1>Members Details</h1>
        </div>
        <div>
          <input
            type="text"
            name="inputname"
            value={this.state.inputname}
            onChange={this.handleChange}
            placeholder="Name of Person"
            className="input"
          /> &nbsp;&nbsp;&nbsp;
          <input
            type="button"
            value="View Member Photo"
            onClick={this.showNewMember}
            className="button"
          />
          <br/><br/>
          {this.showpic()}
        </div>

        <FilterableTable
          tableClassName="members-table"
          namespace="People"
          initialSort="name"
          data={newmemberdet}
          fields={fields}
          noRecordsMessage="There are no people to display"
          noFilteredRecordMessage="No people match your filters!"
          bottomPagerVisible={false}
          topPagerVisible={false}
          pageSizes={null}
          pageSize={500}
        />
      </div>
    )
  }
}

export default AllMembers
