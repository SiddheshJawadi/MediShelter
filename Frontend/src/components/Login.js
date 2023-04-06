import React, { useState } from 'react'
import Button from './Button/Button'
import Axios from 'axios'
import jwt_decode from 'jwt-decode'
import '../components/css/Login.css'

const Login = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await Axios.post('http://localhost:3000/login', {
        email: email,
        password: password,
      })
      if (response.data.token) {
        const decoded = jwt_decode(response.data.token)
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('userId', decoded.id)
        window.location.href = '/home'
      } else {
        alert('Incorrect Password')
      }
    } catch (error) {
      alert('An error occurred while logging in.')
      console.log(error)
    }
  }

  return (
    <div className="logIn-form">
      <form onSubmit={handleSubmit}>
        <input
          className="Email"
          type="text"
          name="email"
          placeholder="Email ..."
          onChange={(e) => {
            setEmail(e.target.value)
          }}
        />
        <input
          className="Password"
          type="password"
          name="password"
          placeholder="Password ..."
          onChange={(e) => {
            setPassword(e.target.value)
          }}
        />

        <div>
          <Button type="submit">Login</Button>
        </div>
      </form>
    </div>
  )
}

export default Login
