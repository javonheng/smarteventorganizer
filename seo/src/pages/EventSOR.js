import React, {Component} from 'react'
import axios from 'axios'
import Tabletop from 'tabletop'
import ReactDataSheet from 'react-datasheet';
import * as FileSaver from 'file-saver'
import '../css/EventSOR.css'
import * as XLSX from 'xlsx'
import { CSVLink } from 'react-csv'
// Be sure to include styles at some point, probably during your bootstrapping
import 'react-datasheet/lib/react-datasheet.css';
import Budget from './Budget'
import { BudgetProvider } from './store'

const ExportReactCSV = ({csvData, fileName}) => {
    let temp = []

    for(let i = 0; i < csvData.length; i++){
      let temp1 = []
      for(let j = 0; j < csvData[i].length; j++){
        temp1.push(csvData[i][j].value)
      }
      temp.push(temp1)
    }
    return (
        <button variant="warning" className="button">
            <CSVLink data={temp} filename={fileName} style={{textDecoration: "none", color: "#ededed"}}>Export</CSVLink>
        </button>
    )
}

class EventSOR extends Component {
  constructor(props) {
    super(props)
    this.state={
      events: [],
      sheetsdata: [],
      grid: [
        [
          {readOnly: true, value: '',},
          {value: 'Name', readOnly: true, width: '25%' },
          {value: 'Description', readOnly: true, width: '40%'},
          {value: 'Cost', readOnly: true, width: '20%'},
          {value: 'Quantity', readOnly: true, width: '10%'},
          {value: '', readOnly: true, width: '5%'},
        ],
        [{readOnly: true, value: 1}, {value: ''}, {value: ''}, {value: ''}, {value: ''}, {readOnly: true, value: '', rowSpan: 25}],
        [{readOnly: true, value: 2}, {value: ''}, {value: ''}, {value: ''}, {value: ''}],
        [{readOnly: true, value: 3}, {value: ''}, {value: ''}, {value: ''}, {value: ''}],
        [{readOnly: true, value: 4}, {value: ''}, {value: ''}, {value: ''}, {value: ''}],
        [{readOnly: true, value: 5}, {value: ''}, {value: ''}, {value: ''}, {value: ''}],
        [{readOnly: true, value: 6}, {value: ''}, {value: ''}, {value: ''}, {value: ''}],
        [{readOnly: true, value: 7}, {value: ''}, {value: ''}, {value: ''}, {value: ''}],
        [{readOnly: true, value: 8}, {value: ''}, {value: ''}, {value: ''}, {value: ''}],
        [{readOnly: true, value: 9}, {value: ''}, {value: ''}, {value: ''}, {value: ''}],
        [{readOnly: true, value: 10}, {value: ''}, {value: ''}, {value: ''}, {value: ''}],
        [{readOnly: true, value: 11}, {value: ''}, {value: ''}, {value: ''}, {value: ''}],
        [{readOnly: true, value: 12}, {value: ''}, {value: ''}, {value: ''}, {value: ''}],
        [{readOnly: true, value: 13}, {value: ''}, {value: ''}, {value: ''}, {value: ''}],
        [{readOnly: true, value: 14}, {value: ''}, {value: ''}, {value: ''}, {value: ''}],
        [{readOnly: true, value: 15}, {value: ''}, {value: ''}, {value: ''}, {value: ''}],
        [{readOnly: true, value: 16}, {value: ''}, {value: ''}, {value: ''}, {value: ''}],
        [{readOnly: true, value: 17}, {value: ''}, {value: ''}, {value: ''}, {value: ''}],
        [{readOnly: true, value: 18}, {value: ''}, {value: ''}, {value: ''}, {value: ''}],
        [{readOnly: true, value: 19}, {value: ''}, {value: ''}, {value: ''}, {value: ''}],
        [{readOnly: true, value: 20}, {value: ''}, {value: ''}, {value: ''}, {value: ''}],
        [{readOnly: true, value: 21}, {value: ''}, {value: ''}, {value: ''}, {value: ''}],
        [{readOnly: true, value: 22}, {value: ''}, {value: ''}, {value: ''}, {value: ''}],
        [{readOnly: true, value: 23}, {value: ''}, {value: ''}, {value: ''}, {value: ''}],
        [{readOnly: true, value: 24}, {value: ''}, {value: ''}, {value: ''}, {value: ''}],
        [{readOnly: true, value: 25}, {value: ''}, {value: ''}, {value: ''}, {value: ''}],

        [{readOnly: true, value: ''}, {readOnly: true, value: 'Total Cost', colSpan: 2}, {value: ''}, {value: '', readOnly: true}, { value: 'Save', component:
          (
            <button onClick={() => alert("clicked")}>
              Submit
            </button>
          )
          }],
      ]
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
    Tabletop.init({
      key: '10vFEuMnQf_ijIs7DchCBQ61NcSFZCFgK0KLHt8uS3F4',
      callback: googleData => {
        console.log('google sheet data --->', googleData)
        this.setState({
          sheetsdata: googleData
        })
      },
      simpleSheet: true
    })
  }

  render() {
    const { events, sheetsdata } = this.state
    var output = this.state.grid.map(function(obj) {
      return Object.keys(obj).sort().map(function (key) {
        return obj[key]
      })
    })

    return(
      <div>
        <div id="maineventsor">
          <BudgetProvider>
          <div id="make-center">
            <h1 id="top-left">
              Plan Your Finances
            </h1>
            <Budget />
          </div>
          </BudgetProvider>

          <div className="line"></div>

          <div className="clearfloat"></div>
          <div id="exceldata">
            <h2 id="mid-right">
              Export Excel
            </h2>
              <ReactDataSheet
                data={this.state.grid}
                valueRenderer={(cell) => cell.value}
                onCellsChanged={changes => {
                  const grid = this.state.grid.map(row => [...row])
                  changes.forEach(({cell, row, col, value}) => {
                    grid[row][col] = {...grid[row][col], value}
                  })
                this.setState({grid})
                }}
                onContextMenu={(e, cell, i, j) => cell.readOnly ? e.preventDefault() : null}
                //attributesRenderer={(cell) => {'data-hint': cell.hint || {}}}
              /><br />

              <ExportReactCSV
                csvData={this.state.grid}
                fileName={this.state.fileName}
              />
          </div>

          <div className="line"></div>
          <div className="clearfloat"></div>
          <div id="googledata">
            <table border="0">
              <tbody>
              <tr>
                <td valign="top">
                  <h2 id="btm-left">
                    <a href="https://docs.google.com/spreadsheets/d/10vFEuMnQf_ijIs7DchCBQ61NcSFZCFgK0KLHt8uS3F4/edit#gid=0" target="_blank">
                      Google Sheet Data
                    </a>
                  </h2>
                </td>

                <td>
                  {sheetsdata.map(obj => {
                    return (
                      <div key={obj.employee}>
                        <p>{obj.employee}</p>
                        <p>{obj.favDog}</p>
                        <img alt={obj.favDog} src={obj.img} />
                      </div>
                    )
                  })}
                </td>
              </tr>
              </tbody>
            </table>
          </div>

        </div>

        <div id="maineventsor-mobile">
          <BudgetProvider>
          <div id="make-center-mobile">
            <h1 id="top-left-mobile">
              Plan Your Finances
            </h1>
            <Budget />
          </div>
          </BudgetProvider>

          <div id="exceldata">
            <h2>
              Export Excel
            </h2>
            <ReactDataSheet
              data={this.state.grid}
              valueRenderer={(cell) => cell.value}
              onCellsChanged={changes => {
                const grid = this.state.grid.map(row => [...row])
                changes.forEach(({cell, row, col, value}) => {
                  grid[row][col] = {...grid[row][col], value}
                })
              this.setState({grid})
              }}
              onContextMenu={(e, cell, i, j) => cell.readOnly ? e.preventDefault() : null}
              //attributesRenderer={(cell) => {'data-hint': cell.hint || {}}}
            /><br />

            <ExportReactCSV
              csvData={this.state.grid}
              fileName={this.state.fileName}
            />
          </div>

          <div id="googledata-mobile">
            <table border="0">
              <tbody>
              <tr>
                <td valign="top">
                  <h2 id="btm-left-mobile">
                    <a href="https://docs.google.com/spreadsheets/d/10vFEuMnQf_ijIs7DchCBQ61NcSFZCFgK0KLHt8uS3F4/edit#gid=0" target="_blank">
                      Google Sheet Data
                    </a>
                  </h2>
                </td>

                <td id="gdata">
                  {sheetsdata.map(obj => {
                    return (
                      <div key={obj.employee}>
                        <p>{obj.employee}</p>
                        <p>{obj.favDog}</p>
                        <img alt={obj.favDog} src={obj.img} />
                      </div>
                    )
                  })}
                </td>
              </tr>
              </tbody>
            </table>
          </div>

        </div>
      </div>
    )
  }
}

export default EventSOR
