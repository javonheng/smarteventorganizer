import React from 'react';
import {BudgetConsumer} from './store'

const BalanceDisplay = () => {
    return (
      <BudgetConsumer>
          {value => {
            const totalExpense = value.expenses.length > 0 ? (
              value.expenses.reduce((acc, curr) => {
                acc += parseInt(curr.amount)
                return acc
              }, 0)) : 0
              const totalRevenue = value.revenue.length > 0 ? (
                value.revenue.reduce((acc, curr) => {
                  acc += parseInt(curr.amount)
                  return acc
                }, 0)) : 0
              return (
                <div className="row">
                    <div className="col-lg-4">
                        <div className="card">
                            <div className="card-header">Budget: </div>
                            <div className="card-body">
                                <label className="text-center card-title">{value.budget}</label>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="card">
                            <div className="card-header">Expenses: </div>
                            <div className="card-body">
                                <label className="text-center card-title">{totalExpense}</label>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="card">
                            <div className="card-header">Revenue: </div>
                            <div className="card-body">
                                <label className="text-center card-title">{totalRevenue}</label>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="card">
                            <div className="card-header">Balance</div>
                            <div className="card-body">
                                <label className="text-center card-title">
                                  {value.budget - totalExpense + totalRevenue}
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            )
          }}
        </BudgetConsumer>
    )
}

export default BalanceDisplay
