import React, { Component } from 'react';
import {BudgetConsumer} from './store'

class RevenueList extends Component {
    render() {
        return (
            <div className="card mt-5">
                <table className="table-bordered">
                    <thead>
                        <tr>
                            <th>Revenue List</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <BudgetConsumer>
                      {value => {
                        const revenueList = value.revenue.length > 0 ? (
                          value.revenue.map((revenue, index) => {
                            return (
                              <tr key={index}>
                                <td>{revenue.title}</td>
                                <td>{revenue.amount}</td>
                              </tr>
                            )
                          })
                        ) : (
                          <tr>
                            <td> No Listed Revenue Yet </td>
                          </tr>
                        )
                        return <tbody>{revenueList}</tbody>
                      }}
                    </BudgetConsumer>
                </table>
            </div>
        )
    }
}

export default RevenueList
