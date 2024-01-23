import React from 'react'
import './styles/Leave.css'
import { Link, Outlet } from 'react-router-dom';


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
          <nav className='ApplyHolidaysContainer'>
            <Link to='/leave/holidays' className='button-holidays'>List of Holidays</Link>
            <Link to='/leave/apply' className='button-apply'>Apply for Leave</Link>
            <Link to='/leave' className='button-back'>Summary</Link>
          </nav>
        </section>
        <section className='section section-leave'>
          <Outlet />
        </section>
      </main>
    </div>
  )
}

export default Leave