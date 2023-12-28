import React from 'react'
import './styles/Leave.css'
import { Routes, Route, Link } from 'react-router-dom';
import LeaveSummary from './LeaveSummary';
import LeaveApplication from './LeaveApplication';
import ListOfHolidays from './ListOfHolidays';

function Leave() {
  var currentDate = new Date()
  var formattedDate = currentDate.toLocaleDateString();
  
  return (
    <div>
      <main>
        <section className='section section-header-leave'>
          <div className='leaveSummaryTitle'>
            <h3>Your Leave Balance as of {formattedDate}</h3>
            <Link to='/leave/request/pending' className='button-pending'>Pending Requests ({})</Link>
          </div>
          <div className='ApplyHolidaysContainer'>
            <Link to='/leave/holidays' className='button-holidays'>List of Holidays</Link>
            <Link to='/leave/apply' className='button-apply'>Apply for Leave</Link>
            <Link to='/leave' className='button-back'>Summary</Link>
          </div>
        </section>
        <section className='section section-leave'>
          <Routes>
            <Route path='/' element={<LeaveSummary/> }></Route>
            <Route path='apply' element={<LeaveApplication/>}></Route>
            <Route path='holidays' element={<ListOfHolidays/>}></Route>
          </Routes>
        </section>
      </main>
    </div>
  )
}

export default Leave