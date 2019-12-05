import React, { Component } from 'react';
import { BudgetConsumer } from './store'

class InputRevenue extends Component {

  state = {
    revenue: [],
    revenueTitle: '',
    amount: '',
  }

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (dispatch, e) => {
    e.preventDefault()
    dispatch({
      type: "ADD_REVENUE",
      revenue: this.state.revenue,
    })
  }

  addRevenue = () => {
    this.setState({
      revenue: [
        ...this.state.revenue,
        {title: this.state.revenueTitle, amount: this.state.amount}
      ],
      revenueTitle: '',
      amount: '',
    })
  }
    render() {
        return (
          <BudgetConsumer>
          {value => {
            const { dispatch } = value
            return(
              <div className="card card-body">
                  <form onSubmit={this.handleSubmit.bind(this, dispatch)}>
                      <label>Revenue: &nbsp;</label>
                      <input
                          onChange={this.handleInput}
                          value={this.state.revenueTitle}
                          className="input"
                          name="revenueTitle"
                          style={{width: "150px"}}
                      /><br />
                      <label>Amount: &nbsp;</label>
                      <input
                          onChange={this.handleInput}
                          value={this.state.amount}
                          className="input"
                          style={{width: "150px"}}
                          name="amount"
                      /><br />
                      <button onClick={this.addRevenue} className="button" style={{width: "100px", marginTop: "10px",}}>Submit</button>
                  </form>
              </div>
            )
          }}
          </BudgetConsumer>
        )
    }
}

export default InputRevenue
