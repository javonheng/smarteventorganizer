import React, {Component} from 'react'
import logo from '../images/the-event.jpg'
import banner from '../images/event-planning.jpg'

export default function EDM (props) {
  return(
    <table style={{width: "800", cellSpacing: "0", cellPadding:"0", align:"center",}}>
      <tbody>
      <tr>
        <td style={{align: "left", valign:"top"}}>
          <table style={{width: "100%", cellspacing:"0", cellpadding:"10", border:"0"}}>
          <tbody>
            <tr>
              <td style={{align:"left", valign:"top"}}>
                <img src={logo} alt="logo" width="250"/>
              </td>
              <td style={{align:"right", valign:"top"}}>
                <br />
                <h1><strong>SMART EVENT ORGANIZER PTE LTD</strong></h1>
              </td>
            </tr>
            </tbody>
          </table>
        </td>
      </tr>

      <tr style={{height:"250", bgcolor: "#dfdfdf"}}>
        <td style={{align:"left", valign: "top"}}>
          <a href={`http://${props.data.bannerlink}`} target="_blank">
            <img src={banner} width="100%" border="0"/>
          </a>
        </td>
      </tr>

      <tr>
        <td style={{textAlign: "left", valign:"top"}}>
        <table style={{width: "100%", cellspacing:"5", cellpadding:"5", border:"0"}}>
          <tbody>
            <tr>
              <td style={{textAlign: "center", valign: "top", width:"33%"}}>
                <p>
                  {props.data.label1}
                  <br /><br />
                  <a href={`http://${props.data.link1}`} target="_blank" style={{textDecoration: "none", color: "#323232"}}>
                    Read more >
                  </a>
                </p>
              </td>
              <td style={{textAlign:"center", valign:"top", width:"33%"}}>
                <p>
                  {props.data.label2}
                  <br /><br />
                  <a href={`http://${props.data.link2}`} target="_blank" style={{textDecoration: "none", color: "#323232"}}>
                    Read more >
                  </a>
                </p>
              </td>
              <td style={{textAlign:"center", valign:"top", width:"33%"}}>
                <p>
                  {props.data.label3}
                  <br /><br />
                  <a href={`http://${props.data.link3}`} target="_blank" style={{textDecoration: "none", color: "#323232"}}>
                    Read more >
                  </a>
                </p>
              </td>
            </tr>
            </tbody>
          </table>
          <hr />
        </td>
      </tr>

      <tr>
        <td style={{align:"left", valign:"top"}}>
        <table style={{width: "100%", cellspacing: "5", cellpadding: "5", border: "0"}}>
          <tbody>
            <tr>
              <td style={{align: "left", valign: "top", width: "66%"}}>
                <p>
                  <iframe width="500" height="350" src="https://www.youtube.com/embed/DLX62G4lc44" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </p>
              </td>

              <td style={{textAlign: "left", valign: "top", width: "33%"}}>
                <h2> Summarize Pointers </h2>
                  <ul>
                    <li>{props.data.pointer1}</li>
                    <li>{props.data.pointer2}</li>
                    <li>{props.data.pointer3}</li>
                    <li>{props.data.pointer4}</li>
                    <li>{props.data.pointer5}</li>
                  </ul>

              </td>
            </tr>
            </tbody>
          </table>
        </td>
      </tr>
      </tbody>
    </table>
  )
}
