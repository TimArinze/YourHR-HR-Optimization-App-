import React, {useState, useEffect} from 'react'
import './styles/Home.css'
import { Outlet, useNavigate } from 'react-router-dom'


function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  if (!token) {
    navigate('/login')
  }
  const [user, setUser] = useState(null);
  
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
          navigate('/login')
          localStorage.removeItem('token')
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching user data:', error.message)
      }
    }
    getUser();
  // eslint-disable-next-line
  }, [token]);
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