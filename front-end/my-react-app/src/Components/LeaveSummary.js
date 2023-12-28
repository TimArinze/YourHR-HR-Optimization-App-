import React from 'react'

function LeaveSummary() {
  const leaveData = [
    { type: 'Annual Leave', requested: 5, balance: 15, total: 20 },
    { type: 'Casual Leave', requested: 2, balance: 8, total: 10 },
    { type: 'Sick Leave', requested: 3, balance: 7, total: 10 },
    { type: 'Prolonged Sick Leave', requested: 10, balance: 5, total: 15 },
    { type: 'Maternity Leave', requested: 12, balance: 3, total: 15 },
  ]
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Requested</th>
            <th>Balance</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {leaveData.map((item) => (
            <tr key={item.type}>
              <td>{item.type}</td>
              <td>{item.requested}</td>
              <td>{item.balance}</td>
              <td>{item.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default LeaveSummary