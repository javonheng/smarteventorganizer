import React, { Component } from 'react';

const BudgetContext = React.createContext();
const reducer = (state, action) => {
  switch(action.type) {
    case "ADD_BUDGET":
    return {
      ...state,
      budget: action.budget
    }
    case "ADD_EXPENSES":
    return {
      ...state,
      expenses: action.expenses
    }
    case "ADD_REVENUE":
    return {
      ...state,
      revenue: action.revenue
    }
    default:
    return state
  }
}
class BudgetProvider extends Component {

    state = {
        budget: '',
        expenses: [],
        revenue: [],
        dispatch: action => this.setState(state => reducer(state, action))
    }
    render() {
        return(
            <BudgetContext.Provider value={this.state}>
                {this.props.children}
            </BudgetContext.Provider>
        )
    }
}

const BudgetConsumer = BudgetContext.Consumer;

export { BudgetProvider, BudgetConsumer }
