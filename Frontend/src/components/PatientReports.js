import React, { useState, useEffect } from 'react'
import axios from 'axios'

function Reports() {
  const [reports, setReports] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:3000/patient/reports', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((response) => {
        setReports(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const downloadFile = (filename) => {
    const token = localStorage.getItem('token')
    axios
      .get(`http://localhost:3000/patient/reports/${filename}`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob',
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', filename)
        document.body.appendChild(link)
        link.click()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div>
      <h1>Reports</h1>
      <table>
        <thead>
          <tr>
            <th>Patient Name</th>
            <th>Filename</th>
            <th>Download</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report._id}>
              <td>{report.Patientname}</td>
              <td>{report.filename}</td>
              <td>
                <button onClick={() => downloadFile(report.filename)}>
                  Download
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Reports
