import React, {useState, useEffect} from 'react'
import './styles/Home.css'
import { Outlet } from 'react-router-dom'


function Home() {
  const token = localStorage.getItem('token');
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const getUser = async () => {
      const response = await fetch('http://localhost:5000/users/me', {
        method: 'GET',
        headers: {
          "X-Token": `${token}`,
        }
      })
      const data = await response.json()
      setUser(data)
    };
    getUser();
  // eslint-disable-next-line
  }, []);
  if (!user) {
    return <div>Loading...</div>
  }
  return (
    <div className='body'>
      <header className='header'>
        <div className='header-container'>
          <div className='header-logo'>
            <a href='/'>
              <h1>YourHR</h1>
            </a>
            <p>Welcome, {user.firstName} </p>
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