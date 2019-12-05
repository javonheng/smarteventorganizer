import React, { Component } from 'react';
import { BudgetConsumer } from './store'
import '../css/EventSOR.css'

class InputExpenses extends Component {

  state = {
    expenses: [],
    expenseTitle: '',
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
      type: "ADD_EXPENSES",
      expenses: this.state.expenses,
    })
  }

  addExpenses = () => {
    this.setState({
      expenses: [
        ...this.state.expenses,
        {title: this.state.expenseTitle, amount: this.state.amount}
      ],
      expenseTitle: '',
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
                      <label>Expenses: &nbsp;</label>
                      <input
                          onChange={this.handleInput}
                          value={this.state.expenseTitle}
                          name="expenseTitle"
                          className="input"
                          style={{width: "150px"}}
                      /><br />
                      <label>Amount: &nbsp;</label>
                      <input
                          onChange={this.handleInput}
                          value={this.state.amount}
                          name="amount"
                          className="input"
                          style={{width: "150px"}}
                      /><br />
                      <button onClick={this.addExpenses} className="button" style={{width: "100px", marginTop: "10px",}}>Submit</button>
                  </form>
              </div>
            )
          }}
          </BudgetConsumer>
        )
    }
}

export default InputExpenses
