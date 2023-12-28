import React from 'react'
import './styles/Profile.css'

function Profile() {
  return (
    <div>
      <main>
        <section className='section section-profile'>
          <button href="/profile/personaldetails" className='button-profile'>Personal Details</button>
          <button href="/profile/employmentdetails" className='button-profile'>Employment Details</button>
        </section>
      </main>
    </div>
  )
}

export default Profile