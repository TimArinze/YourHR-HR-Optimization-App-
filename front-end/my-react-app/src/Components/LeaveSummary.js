import React, { useState, useEffect } from 'react'
import './styles/LeaveSummary.css'

function LeaveSummary() {
  const token = localStorage.getItem('token');
  const [user, setUser] = useState(null);
  const [leaveData, setLeaveData] = useState([]);
  const backendUrl = process.env.REACT_APP_BACKEND_URL_RENDER;
  
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch(`${backendUrl}/users/me`, {
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
  }, [token, backendUrl]);
  

  useEffect(() => {
    const getLeaveSummary = async () => {
      try {
        const response = await fetch(`${backendUrl}/leave/summary`, {
          method: 'GET',
          headers: {
            "X-Token": `${token}`,
          },
        });
      
        if (!response.ok) {
          throw new Error('Failed to fetch leave summary');
        }
        const data = await response.json();
        const {_id, userId, createdAt, updatedAt, __v, ...leave} = data.documents;
        // To avoid rendering maternity leave for male employees
        if (user.gender === 'Male') {
          const {MaternityLeave, ...rest} = leave;
          console.log(rest);
          setLeaveData(rest);
        } else {
          setLeaveData(leave);
        }
      } catch (error) {
        console.error('Error fetching leave summary:', error.message)
      }
    }
    getLeaveSummary();
  }, [user, backendUrl, token]); //dependency so that it waits for user to be set before fetching leave summary
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
          {Object.entries(leaveData).map(([leaveType, values], index) => (
            //Conditionally render the "Maternity Leave" row if the user is not male
            <tr key={leaveType} className={index % 2 === 0 ? 'odd' : 'even'}>
              <td className='leaveType'>{leaveType}</td>
              <td>{values.total}</td>
              <td>{values.requested}</td>
              <td>{values.used}</td>
              <td>{values.remaining}</td>
            </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  )
}

export default LeaveSummary