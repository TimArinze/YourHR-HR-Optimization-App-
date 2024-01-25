import React, { useState, useEffect, useRef } from 'react'
import './styles/Login.css'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Utils/auth';

function Login() {
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const auth = useAuth();

  const handleLogin = async (e) => {
    //Implement your authentication logic here.
    e.preventDefault();

    // Creating a Base64-encoded string of "email:password"
    const credentials = `${email}:${password}`
    const base64Credentials = btoa(credentials);

    try {
      const response = await fetch('http://localhost:5000/connect', {
        method: 'GET',
        headers: {
          Authorization: `Basic ${base64Credentials}`,
          "Content-Type": "application/json"
        },
      })
      //For a basic example, just checking if the fields are not empty
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Login failed')
      }
      const { token } = await response.json()
      localStorage.setItem('token', token)
      auth.login(token)
      navigate('/', { replace: true })
    } catch (error) {
      console.error('Login failed: ', error.message)
      alert(`Login failed: Incorrect username or password`)
    }
  }
  return (
    <div>
      <div className='background-container'>
        <div className='container'>
          <div className='section-body'>
            <h2 className='section-title'>Welcome</h2>
            <p>Let's Build Tomorrow Together</p>
          </div>
          <form id="loginForm" className="login-form">
            <input
              type="email"
              placeholder='Email' 
              id='email' 
              name="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}  
              required
            />
            <input
              type="password"
              placeholder='password' 
              id='password'
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type='button' className='button' onClick={handleLogin}>
              Login
            </button>
            <p className='askAccount'>Already have an account? <a href='/register'>Register</a></p>
          </form>
          </div>
        </div>
      </div>
  )
}

export default Login