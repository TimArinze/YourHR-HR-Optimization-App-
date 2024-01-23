import React from 'react'
import './styles/Home.css'
import { Outlet } from 'react-router-dom'
import { useAuth } from '../Utils/auth'


function Home() {
  const auth = useAuth();
  const token = auth.token;
  return (
    <div className='body'>
      <header className='header'>
        <div className='header-container'>
          <div className='header-logo'>
            <a href='/'>
              <h1>YourHR</h1>
            </a>
            <p>Welcome, {token} </p>
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
                <a href='/helpdesk' className='nav-link'>Help Desk</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <Outlet />
    </div>
  )
}

export default Home