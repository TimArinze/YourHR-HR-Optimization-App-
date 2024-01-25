import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './styles/LeaveApplication.css'

function LeaveApplication() {
  
  const navigate = useNavigate()
  const inputRef = useRef(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [leaveType, setLeaveType] = useState('');
  const [leaveReason, setLeaveReason] = useState('');
  const [attachment, setAttachment] = useState('');
  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implent logic for submitting the form
    // For now, just close the modal
  };

  const handleCancel = () => {
    // Use history.push to navigate a to different route
    navigate('/leave')
  }

  return (
    <div className='LASection'>
      <div className='LATitle'>
        <h2 className='leaveAppTitle'>Leave Application Form</h2>
      </div>
      <form onSubmit={handleSubmit} className='LeaveForm'>
        <div className='leave-section'>
          <div className='LA-input-box'>
            <span className='LADetails'>From Date</span>
              <input
                type="date"
                placeholder='Starting date'
                value={fromDate}
                required
                onChange={e => setFromDate(e.target.value)}
              />
          </div>
          <div className='LA-input-box'>
            <span className='LADetails'>To Date</span>
              <input
                type="date"
                placeholder='Stopping date'
                value={toDate}
                required
                onChange={e => setToDate(e.target.value)}
              />
          </div>
          <div className='LA-input-box'>
            <span className='LADetails'>Leave Type</span>
              <select
                className='LA-select-box'
                value={leaveType}
                required
                onChange={e => setLeaveType(e.target.value)}
                placeholder='Select Leave Type'
              >
                <option value="" disabled selected>Select Leave Type</option>
                <option value="annual">Annual Leave</option>
                <option value="casual">Casual Leave</option>
                <option value="sick">Sick Leave</option>
                <option value="prolongedsick">Prolonged Sick Leave</option>
                <option value="maternity">Maternity Leave</option>
              </select>
          </div>
          <div className='LA-input-box'>
            <span className='LADetails'>Leave Reason</span>
              <select
                className='LA-select-box'
                value={leaveReason}
                required
                onChange={e => setLeaveReason(e.target.value)}
                placeholder='What is the reason for your leave?'
              >
                <option value="" disabled selected>What is the reason for your leave?</option>
                <option value="{}">Personal Time Off</option>
                <option value="Travel Plans">Travel Plans</option>
                <option value="Family Event">Family Event</option>
                <option value="Family Emergency">Family Emergency</option>
                <option value="emergency">Emergency</option>
                <option value="sick">Sick</option>
              </select>
          </div>
          <div className='LA-input-box'>
            <span className="LADetails">Add Attachment</span>
              <input
                type='file'
                placeholder='Add Attachment'
                value={attachment}
                onChange={e => setAttachment(e.target.value)}
              />
          </div>
          <div className='leaveButton'>
            <button type='submit' id='leaveapply'>Apply</button>
            <button onClick={handleCancel} id='leavecancel'>Cancel</button>
          </div>
          </div>
        </form>
    </div>
  )
}

export default LeaveApplication