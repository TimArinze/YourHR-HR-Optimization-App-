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
  const [daysCount, setDaysCount] = useState(0);
  const [leaveType, setLeaveType] = useState('');
  const [leaveReason, setLeaveReason] = useState('');
  const [attachment, setAttachment] = useState('');
  const [holidays, setHolidays] = useState([]);
  const [year] = useState(new Date().getFullYear());

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
  useEffect(() => {
    let firstDate = new Date(fromDate);
    let lastDate = new Date(toDate);
    if (firstDate.getFullYear() !== lastDate.getFullYear()) {
      // eslint-disable-next-line
      Promise.all([
        fetch(`http://localhost:5000/holidays/${year}`, { cache: "no-store"}),
        fetch(`http://localhost:5000/holidays/${year + 1}`, { cache: "no-store"})
      ])
        .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
        .then(([data1, data2]) => setHolidays([...data1, ...data2]))
        .catch(err => console.log(err));
    }
    else {
      // eslint-disable-next-line
      fetch(`http://localhost:5000/holidays/${year}`, { cache: "no-store"})
        .then(res => res.json())
        .then(data => setHolidays(data))
        .catch(err => console.log(err));
    }
  }, [fromDate, toDate, year]);
  
  const holidaysBetweenDates = holidays.filter(holidays => {
    const holidayDate = new Date(holidays.date);
    return holidayDate >= new Date(fromDate) && holidayDate <= new Date(toDate);
  })
  const holidaysCount = holidaysBetweenDates.length;

  const subtractWeekendsAndLeaves = (fromDate, toDate) => {
    //Ensuring that the input is valid date objects
     if (!(fromDate instanceof Date) || !(toDate instanceof Date)) {
       throw new Error('Both fromDate and toDate must be valid Date objects')
     }
    // Ensuring fromDate is before toDate
    if (fromDate > toDate) {
      alert('Start Date must be before End Date')
    }
    // Initializing
    let weekdaysCount = 0

    let currentDate = new Date(fromDate);
    while (currentDate <= toDate) {
      // checking if the current day is a weekday (Monday to Friday)
      if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
        weekdaysCount++;
      }

      // Move to the next day
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return weekdaysCount;
  }
  useEffect (() => {
    try {
      // Parsing fromDate and toDate as Date objects
      const startDate = new Date(fromDate);
      const endDate = new Date(toDate);

      // checking if either date is not valid
      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        throw new Error('Invalid date format');
      }
      const numbers = subtractWeekendsAndLeaves(startDate, endDate);
      const netDays = numbers - holidaysCount;
      setDaysCount(netDays);
    } catch (error) {
      console.error('Error calculating weeksdays:', error.message)
    }
  }, [fromDate, toDate, holidaysCount])

  return (
    <div className='LASection'>
      <div className='LATitle'>
        <h2 className='leaveAppTitle'>Leave Application Form</h2>
      </div>
      <form onSubmit={handleSubmit} className='LeaveForm'>
        <div className='leave-section'>
          <div className='LA-input-box'>
            <span className='LADetails'>Start Date</span>
              <input
                type="date"
                placeholder='Starting date'
                value={fromDate}
                required
                onChange={e => setFromDate(e.target.value)}
              />
          </div>
          <div className='LA-input-box'>
            <span className='LADetails'>End Date</span>
              <input
                type="date"
                placeholder='Stopping date'
                value={toDate}
                required
                onChange={e => setToDate(e.target.value)}
              />
          </div>
          <div className='LA-display-box'>
            <span className='LADetails'>Numbers of days to be deducted</span>
            <div className='LA-display-box'>{daysCount}</div>
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