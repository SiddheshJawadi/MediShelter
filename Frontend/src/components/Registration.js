import React, { useState } from 'react'
import Axios from 'axios'
import '../components/css/Registration.css'

export default function Registration() {
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [contact, setContact] = useState('')
  const [dob, setDob] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    Axios.post('http://localhost:3000/register', {
      firstName: name,
      role: role,
      email: email,
      password: password,
      contact: contact,
      dob: dob,
    })
  }
  return (
    <div className="logIn-form">
      <form onSubmit={handleSubmit}>
        <p>First Name</p>
        <input
          className="Name"
          type="text"
          name="name"
          placeholder="First name"
          onChange={(e) => {
            setName(e.target.value)
          }}
        />

        <p> Company Role</p>
        <input
          className="Role"
          type="text"
          name="role"
          placeholder="Role"
          onChange={(e) => {
            setRole(e.target.value)
          }}
        />

        <p>Email</p>
        <input
          className="Email"
          type="text"
          name="email"
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value)
          }}
        />

        <p>Password</p>
        <input
          className="Password"
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value)
          }}
        />

        <p>Contact Number</p>
        <input
          className="Contact"
          type="text"
          name="contact"
          placeholder="Contact Number"
          onChange={(e) => {
            setContact(e.target.value)
          }}
        />

        <p>Date of Birth</p>
        <input
          className="DOB"
          type="date"
          name="dob"
          placeholder="Date of Birth"
          onChange={(e) => {
            setDob(e.target.value)
          }}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
