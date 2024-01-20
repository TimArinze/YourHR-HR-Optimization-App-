import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './styles/Registration.css'

function Registration() {
  const navigate = useNavigate();
  const inputRef = useRef(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
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
    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, employeeID, firstName, lastName, DOB, DOJ, department, gender })
      });

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Registration failed');
      }

      alert('Account created successfully')
      navigate('/login')
    } catch (error) {
      console.error('Registration failed: ', error.message)
      alert(`Registration failed: ${error.message}`)
    }
  }

  return (
    <div className='RegistrationBody'>
      <div className='registersection'>
        <div className='title'>
          <h1>Registration</h1>
        </div>
        <form className='RegistrationForm' onSubmit={register}>
          <div className='user-details'>
            <div className='register-input-box'>
              <span className='details'>First Name</span>
              <input
                type='name'
                placeholder='Enter your first name'
                value={firstName}
                required
                onChange={e => setFirstName(e.target.value)}
              />
            </div>
            <div className='register-input-box'>
              <span className='details'>Last Name</span>
              <input
                type='name'
                placeholder='Enter your last name'
                value={lastName}
                required
                onChange={e => setLastName(e.target.value)}
              />
            </div>
            <div className='register-input-box'>
              <span className='details'>Email</span>
              <input
                type='email'
                placeholder='Enter your email'
                value={email}
                required
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className='register-input-box'>
              <span className='details'>Employee ID</span>
              <input
                type='employeeID'
                placeholder='Enter your ID'
                value={employeeID}
                required
                onChange={e => setEmployeeID(e.target.value)}
              />
            </div>
            <div className='register-input-box'>
              <span className='details'>Date of Birth</span>
              <input
                type='date'
                placeholder='Enter your date of birth'
                value={DOB}
                required
                onChange={e => setDOB(e.target.value)}
              />
            </div>
            <div className='register-input-box'>
              <span className='details'>Date of joining</span>
              <input
                type='date'
                placeholder='Date of joining'
                value={DOJ}
                required
                onChange={e => setDOJ(e.target.value)}
              />
            </div>
            <div className='register-input-box'>
              <span className='details'>Department</span>
              <select
                placeholder='Enter your email'
                value={department}
                required
                onChange={e => setDepartment(e.target.value)}
                className='register-select-box'
              >
                <option value="" disabled selected>Department</option>
                <option value="HR">HR</option>
                <option value="Finance">Finance</option>
                <option value="IT">IT</option>
                <option value="Sales">Sales</option>
                <option value="Marketing">Marketing</option>
                <option value="Engineering">Engineering</option>
                <option value="Operations">Operations</option>
              </select>
            </div>
            <div className='register-input-box'>
              <span className='details'>Gender</span>
              <select
                placeholder='Enter your email'
                value={gender}
                required
                onChange={e => setGender(e.target.value)}
                className='register-select-box'
              >
                <option value="" disabled selected>Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className='register-input-box'>
              <span className='details'>Password</span>
              <input
                type='password'
                placeholder='Enter your password'
                value={password}
                required
                onChange={handlePasswordChange}
              />
            </div>
            <div className='register-input-box'>
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
          <div className='register'>
            <button type='submit' className='registerButton'>
              Register
            </button>
          </div>
          <p className='askAccount'>Already have an account? <a href='/login'>Login</a></p>
        </form>
      </div>
    </div>
  )
}

export default Registration