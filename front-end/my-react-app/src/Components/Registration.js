import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './styles/Registration.css'

function Registration() {
  const navigate = useNavigate();
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [employeeID, setEmployeeID] = useState('');
  const [DOB, setDOB] = useState('');
  const [gender, setGender] = useState('');
  const [DOJ, setDOJ] = useState('');
  const [department, setDepartment] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordsMatch(e.target.value === confirmPassword);
  };
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value)
    setPasswordsMatch(e.target.value === password);
  }
  const register = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName, lastName, email, employeeID, DOB, gender, DOJ, department, password})
    });
    if (response.ok === false) {
      alert('Email address or employee ID already exists')
    } else {
      alert('Account created successfully')
      navigate('/login')
    }
  }

  return (
    <div>
      <body className='RegistrationBody'>
        <div className='title'>
          <h1>Registration</h1>
        </div>
        <form className='RegistrationForm' action='#'>
          <div className='user-details'>
            <div className='input-box'>
              <span className='details'>First Name</span>
              <input
                type='name'
                placeholder='Enter your first name'
                value={firstName}
                required
              />
            </div>
            <div className='input-box'>
              <span className='details'>Last Name</span>
              <input
                type='name'
                placeholder='Enter your last name'
                value={lastName} 
                required
              />
            </div>
            <div className='input-box'>
              <span className='details'>Email</span>
              <input
                type='email'
                placeholder='Enter your email'
                value={email}
                required
              />
            </div>
            <div className='input-box'>
              <span className='details'>Password</span>
              <input
                type='password'
                placeholder='Enter your password'
                value={password}
                required
              />
            </div>
            <div className='input-box'>
              <span className='details'>Confirm Password</span>
              <input
                type='text'
                placeholder='Confirm your password'
                onChange={handleConfirmPasswordChange}
                value={confirmPassword}
                required />
            </div>
          </div>
          <div className='passwordMatch'>
            {passwordsMatch ? (
              <span className='passwordMatchText'>Passwords match</span>
            ) : (
              <span className='passwordMatchText'>Passwords do not match</span>
            )}
          </div>
          <div className='button'>
            <button type='submit' className='submitButton'>
              Register
            </button>
          </div>
          <p className='askAccount'>Already have an account? <a href='/login'>Login</a></p>
        </form>
      </body>
    </div>
  )
}

export default Registration