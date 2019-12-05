import React, {Component} from 'react'
import axios from 'axios'
import '../css/Inventory.css'
// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
// Import Hamoni Sync
import Hamoni from "hamoni-sync";

class Inventory extends Component {
  constructor(props) {
    super(props)
    this.state={
      events: [],
      data: [],
      firstName: "",
      lastName: "",
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
      this.getData()
  }

  async getData() {
    const accountId = "5d9d1676-1b20-435a-8906-ebba486b82ac";
    const appId = "1e49e2a24d2c4a48b4f9725d22a379f7";
    let hamoni;

    const response = await fetch("https://api.sync.hamoni.tech/v1/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({ accountId, appId })
    });
    const token = await response.json();
      hamoni = new Hamoni(token);

      hamoni
        .connect()
        .then(() => {
          hamoni
            .get("datagrid")
            .then(listPrimitive => {
              this.listPrimitive = listPrimitive;

              this.setState({
                data: [...listPrimitive.getAll()]
              });

              listPrimitive.onItemAdded(item => {
                this.setState({ data: [...this.state.data, item.value] });
              });

              listPrimitive.onItemUpdated(item => {
                let data = [
                  ...this.state.data.slice(0, item.index),
                  item.value,
                  ...this.state.data.slice(item.index + 1)
                ];

                this.setState({ data: data });
              });

              listPrimitive.onSync(data => {
                this.setState({ data: data });
              });
            })
            .catch(error => console.log(error));
        })
        .catch(error => console.log(error));
  }

  handleChange = event => {
    if (event.target.name === "firstName")
      this.setState({ firstName: event.target.value });
    if (event.target.name === "lastName")
      this.setState({ lastName: event.target.value });
  }

  handleSubmit = event => {
    this.listPrimitive.add({
      firstName: this.state.firstName,
      lastName: this.state.lastName
    });
    this.setState({ firstName: "", lastName: "" });
    event.preventDefault();
  }

  renderEditable = cellInfo => {
    return (
      <div
        style={{ backgroundColor: "#829cd0", color: "#000b4f", borderRadius: "15px"}}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          let row = this.state.data[cellInfo.index];
          row[cellInfo.column.id] = e.target.innerHTML;
          this.listPrimitive.update(cellInfo.index, row);
        }}
        dangerouslySetInnerHTML={{
          __html: this.state.data[cellInfo.index][cellInfo.column.id]
        }}
      />
    );
  }

  render() {
    const { events,data } = this.state
    return(
      <div id="maininventory">
        <h1>Logistics Inventory List</h1>
        <div id="logs-search">
          <form onSubmit={this.handleSubmit}>
            <h3>Add new record</h3>
            <label>
              Item: &nbsp;
              <input
                type="text"
                name="firstName"
                value={this.state.firstName}
                onChange={this.handleChange}
                className="input"
                style={{width: "200px"}}
              />
            </label> <br />
            <label>
              Quantity: &nbsp;
              <input
                type="text"
                name="lastName"
                value={this.state.lastName}
                onChange={this.handleChange}
                className="input"
                style={{width: "75px"}}
              />
            </label><br /><br />
            {"   "}
            <input type="submit" value="Add" className="button" style={{width: "70px"}} />
          </form>
        </div>
        <br />
        <div id="inventory-table">
          <ReactTable
            data={data}
            columns={[
              {
                Header: "Item",
                accessor: "firstName",
                Cell: this.renderEditable
              },
              {
                Header: "Quantity",
                accessor: "lastName",
                Cell: this.renderEditable
              },
              {
                Header: "Total",
                id: "full",
                accessor: d => (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: d.firstName + ": " + d.lastName
                    }}
                  />
                )
              }
            ]}
            defaultPageSize={10}
            className="-striped -highlight"
            style={{maxWidth: "100%", wordWrap: "break-word",}}
          />
        </div>
      </div>
    )
  }
}

export default Inventory
