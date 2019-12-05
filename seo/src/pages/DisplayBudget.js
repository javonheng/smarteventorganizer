import React from "react";
import BalanceDisplay from './BalanceDisplay';
import ExpenseList from './ExpenseList';
import RevenueList from './RevenueList'

const DisplayBudget = () => {
    return (
        <div className="card card-body">
            <h3 className="text-center">Your Budget Info</h3>
            <table border="0">
              <tbody>
              <tr>
                <td colSpan="2">
                  <BalanceDisplay />
                </td>
              </tr>
              <tr>
                <td>
                  <ExpenseList />
                </td>
                <td>
                  <RevenueList />
                </td>
              </tr>
              </tbody>
            </table>
        </div>
    )
}

export default DisplayBudget
