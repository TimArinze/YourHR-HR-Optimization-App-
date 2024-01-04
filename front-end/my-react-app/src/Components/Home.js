import React from 'react'
import './styles/Home.css'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './Dashboard'
import Leave from './Leave'
import Profile from './Profile'
import LeaveSummary from './LeaveSummary'
import ListOfHolidays from './ListOfHolidays'
import LeaveApplication from './LeaveApplication'
import ProfilePersonal from './ProfilePersonal'


function Home() {
  return (
    <div className='body'>
      <header className='header'>
        <div className='header-container'>
          <div className='header-logo'>
            <a href='/'>
              <h1>YourHR</h1>
            </a>
          </div>
          <input className='menu-btn' type='checkbox' id='menu-btn' />
          <label className='menu-icon' htmlFor='menu-btn'>
            <span className='navicon'></span>
          </label>
          <nav className='navbar-menu'>
            <ul className='nav'>
              <li className='nav-item'>
                <a href='/' className='nav-link'>Dashboard</a>
              </li>
              <li className='nav-item'>
                <a href='/profile' className='nav-link'>Profile</a>
              </li>
              <li className='nav-item'>
                <a href='/leave' className='nav-link'>Leave</a>
              </li>
              <li className='nav-item'>
                <a href='/payroll' className='nav-link'>Payroll</a>
              </li>
              <li className='nav-item'>
                <a href='/helpdesk' className='nav-link'>Help Desk</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <Routes>
        <Route path='/' element={<Dashboard/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
        <Route path='/home' element={<Dashboard/>}></Route>
        <Route path='/profile' element={<Profile/>}></Route>
        <Route path='profile/personaldetails' element={<ProfilePersonal/>}></Route>
        <Route path='profile/employmentdetails' element=''></Route>
        <Route path='/leave/*' element={<Leave/>}>
        </Route>
      </Routes>
    </div>
  )
}

export default Home