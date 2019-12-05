import React, { Component } from 'react';
import { BudgetConsumer } from './store'

class InputBudget extends Component {
  state = {
    budget: ''
  }

  handleInput = (e) => {
    this.setState({ budget: e.target.value})
  }

  handleSubmit = (dispatch, e) => {
    e.preventDefault()
    dispatch({
      type: "ADD_BUDGET",
      budget: this.state.budget
    })
  }

    render() {
      return (
        <BudgetConsumer>
          {value => {
            const { dispatch } = value
              return (
                <div className="card card-body mb-3">
                    <label><strong>Your Budget</strong></label>
                    <form className="form-inline">
                        <input
                            onChange={this.handleInput}
                            value={this.state.budget}
                            className="input"
                            type="number"
                        /><br />
                        <button onClick={this.handleSubmit.bind(this, dispatch)} className="button" style={{width: "100px", marginTop: "10px",}}>Submit
                        </button>
                    </form>
                </div>
              )
            }}
          </BudgetConsumer>
        )
    }
}

export default InputBudget
