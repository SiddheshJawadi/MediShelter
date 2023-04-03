import React, { useState } from 'react'
import Button from './Button/Button'
import Axios from 'axios'
import '../components/css/Login.css'

const Login = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await Axios.post('http://localhost:3000/login', {
      email: email,
      password: password,
    })
    if (response) {
      if (response.data.message == 'Login Approved') {
        window.location.href = '/home'
      } else {
        alert('Incorrect Password')
      }
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
