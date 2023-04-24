import React, { useState, useEffect } from 'react'
import Button from './Button/Button'
import Navigation from '../components/MainHeader/Navigation'
import { Link } from 'react-router-dom'
import '../components/css/Navigation.css'
import '../components/css/Patient.css'
import axios from 'axios'

const Patient = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3000/patient', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((response) => {
        setName(response.data.name)
        setEmail(response.data.email)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.href = '/login'
  }

  return (
    <div>
      <div className="welcome">
        <h1>Welcome {name}!</h1>
        <p>Thanks for visiting. Feel free to look around.</p>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/patient">Home</Link>
          </li>
          <li>
            <Link to="/patient/prescription">Prescription</Link>
          </li>
          <li>
            <Link to="/patient/report">Report</Link>
          </li>
          <li>
            <Link to="/patient/about">Edit Profile</Link>
          </li>
          <li>
            <Button onClick={handleLogout}>Logout</Button>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Patient
