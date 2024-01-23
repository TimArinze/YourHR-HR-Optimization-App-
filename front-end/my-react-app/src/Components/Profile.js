import React, { useNavigate } from 'react'
import './styles/Profile.css'
import { useAuth } from '../Utils/auth'

function Profile() {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.logout()
    navigate('/login')
  }
  return (
    <div>
      <main>
        <section className='section section-profile'>
          <a href="/profile/personaldetails" className='button-profile'>Personal Details</a>
          <a href="/profile/employmentdetails" className='button-profile'>Employment Details</a>
          <button className='button-profile' id='logout' onClick={handleLogout}>Logout</button>
        </section>
      </main>
    </div>
  )
}

export default Profile