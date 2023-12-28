import React from 'react'
import './styles/Profile.css'

function Profile() {
  return (
    <div>
      <main>
        <section className='section section-profile'>
          <a href="/profile/personaldetails" className='button-profile'>Personal Details</a>
          <a href="/profile/employmentdetails" className='button-profile'>Employment Details</a>
        </section>
      </main>
    </div>
  )
}

export default Profile