import React from 'react'
import { useNavigate } from 'react-router-dom';
import './styles/LeaveApplication.css'

function LeaveApplication() {
  
  const navigate = useNavigate()

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
    <div>
        <h2 className='leaveAppTitle'>Leave Application Form</h2>
        <form onSubmit={handleSubmit} className='leaveForm'>
          <div className='leave-section'>
            <div className='leaveFormContainer'>
              <h3>From Date</h3>
              <input type="date" className='leaveInputBox'/>
            </div>

            <div className='leaveFormContainer'>
              <h3>To Date</h3>
              <input type='date' className='leaveInputBox'/>
            </div>
          </div>
          <div className='leave-section'>
            <div className='leaveFormContainer'>
              <h3>Leave Type</h3>
              <select className='leaveInputBox'>
                <option value="annual">Annual Leave</option>
                <option value="casual">Casual Leave</option>
                <option value="sick">Sick Leave</option>
                <option value="prolongedsick">Prolonged Sick Leave</option>
                <option value="maternity">Maternity Leave</option>
              </select>
            </div>
            <div className='leaveFormContainer'>
              <h3>Leave Reason</h3>
              <select className='leaveInputBox'>
                <option value="{}">Personal Time Off</option>
                <option value="Travel Plans">Travel Plans</option>
                <option value="Family Event">Family Event</option>
                <option value="Family Emergency">Family Emergency</option>
                <option value="emergency">Emergency</option>
                <option value="sick">Sick</option>
              </select>
            </div>
          </div>
          <div className='leaveFormContainer'>
            <h3>Message</h3>
            <textarea rows="4"></textarea>
          </div>
          <br />
          <div className='leaveActive'>
          <div className='attachment'>
            <h3>Add Attachment</h3>
            <input type='file' />
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