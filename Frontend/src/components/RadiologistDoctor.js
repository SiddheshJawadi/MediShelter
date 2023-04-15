import React from 'react'
import { Link } from 'react-router-dom'
import '../components/css/Navigation.css'
import '../components/css/Patient.css'
import Button from './Button/Button'

function RadiologistDoctor() {
  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.href = '/login'
  }
  return (
    <div>
      <div>
        <div class="welcome">
          <h1>Welcome Doctor!</h1>
          <p>Thanks for visiting. Feel free to look around.</p>
        </div>
      </div>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/doctor">Home</Link>
            </li>
            <li>
              <Link to="/prescription">Prescription</Link>
            </li>
            <li>
              <Link to="/reportdoctor">Report</Link>
            </li>
            <li>
              <Link to="/about">Edit Profile</Link>
            </li>
            <li>
              <Button onClick={handleLogout}>Logout</Button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default RadiologistDoctor
