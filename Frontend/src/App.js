import './App.css'
import React from 'react'
import MainHeader from './components/MainHeader/MainHeader'
import Registration from './components/Registration'
import Login from './components/Login'
import Home from './components/home'
import Patient from './components/Patient'
import RadiologistDoctor from './components/RadiologistDoctor'
import ReportDoctor from './components/ReportDoctor'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div>
      <MainHeader />

      <div>
        <Router>
          <Routes>
            <Route path="/registration" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/patient" element={<Patient />} />
            <Route path="/radiologistdoctor" element={<RadiologistDoctor />} />
            <Route path="/reportdoctor" element={<ReportDoctor />} />
          </Routes>
        </Router>
      </div>
    </div>
  )
}

export default App
