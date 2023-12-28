import React from 'react'
import './styles/LeaveSummary.css'

function LeaveSummary() {
  const leaveData = [
    { type: 'Annual Leave', requested: 5, balance: 15, total: 20 },
    { type: 'Casual Leave', requested: 2, balance: 8, total: 10 },
    { type: 'Sick Leave', requested: 3, balance: 7, total: 10 },
    { type: 'Maternity Leave', requested: 12, balance: 3, total: 15 },
  ]
  return (
    <div>
      <table className='leave-table'>
        <thead className='leave-table-head'>
          <tr>
            <th>Type</th>
            <th>Total</th>
            <th>Requested</th>
            <th>Used</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {leaveData.map((item, index) => (
            <tr key={item.type} className={index % 2 === 0 ? 'odd' : 'even'}>
              <td className='leaveType'>{item.type}</td>
              <td>{item.total}</td>
              <td>{item.requested}</td>
              <td>{item.used}</td>
              <td>{item.balance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default LeaveSummary