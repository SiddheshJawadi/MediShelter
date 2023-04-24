import React, { useState } from 'react'
import axios from 'axios'
import '../components/css/Registration.css'

const ReportDoctor = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [file, setFile] = useState(null)

  const handleNameChange = (e) => {
    setName(e.target.value)
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('name', name)
    formData.append('email', email)
    formData.append('file', file)

    try {
      const response = await axios.post(
        'http://localhost:3000/report',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      )
      console.log(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="logIn-form">
      <form onSubmit={handleSubmit}>
        <label style={{ margin: '8px' }} htmlFor="email">
          Name:
          <input type="text" value={name} onChange={handleNameChange} />
        </label>
        <br />
        <label style={{ margin: '8px' }} htmlFor="email">
          Email:
          <input type="email" value={email} onChange={handleEmailChange} />
        </label>
        <br />
        <label style={{ margin: '8px' }} htmlFor="email">
          File:
          <input type="file" onChange={handleFileChange} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default ReportDoctor
