import React from 'react';
import InputBudget from './InputBudget';
import InputExpenses from './InputExpenses';
import DisplayBudget from './DisplayBudget';
import InputRevenue from './InputRevenue'
import '../css/EventSOR.css'

const Budget = () => {
    return (
        <div className="budget">
          <table border="0">
            <tbody>
              <tr>
                <td colSpan="2">
                  <InputBudget />
                </td>
              </tr>

              <tr>
                <td>
                  <InputExpenses />
                </td>
                <td>
                  <InputRevenue />
                </td>
              </tr>

              <tr>
                <td colSpan="2">
                  <DisplayBudget />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

    )
}

export default Budget
