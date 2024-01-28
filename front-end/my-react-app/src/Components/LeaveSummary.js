import React, { useState, useEffect } from 'react'
import './styles/LeaveSummary.css'

function LeaveSummary() {
  const token = localStorage.getItem('token');
  const [user, setUser] = useState(null);
  const [leaveData, setLeaveData] = useState([]);
  
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch('http://localhost:5000/users/me', {
          method: 'GET',
          headers: {
            "X-Token": `${token}`,
          },
        });
      
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching user data:', error.message)
      }
    };
    getUser();
  // eslint-disable-next-line
  }, []);
  const isMale = user?.gender === 'Male';


  useEffect(() => {
    const getLeaveSummary = async () => {
      try {
        const response = await fetch('http://localhost:5000/leave/summary', {
          method: 'GET',
          headers: {
            "X-Token": `${token}`,
          },
        });
      
        if (!response.ok) {
          throw new Error('Failed to fetch leave summary');
        }
        const data = await response.json();
        setLeaveData(data);
      } catch (error) {
        console.error('Error fetching leave summary:', error.message)
      }
    }
    getLeaveSummary();
  // eslint-disable-next-line
  }, []);

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
            //Conditionally render the "Maternity Leave" row if the user is not male
            !(isMale && item.type === 'Maternity Leave') && (
            <tr key={item.type} className={index % 2 === 0 ? 'odd' : 'even'}>
              <td className='leaveType'>{item.type}</td>
              <td>{item.total}</td>
              <td>{item.requested}</td>
              <td>{item.used}</td>
              <td>{item.remaining}</td>
            </tr>
            )
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default LeaveSummary