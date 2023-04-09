import './App.css'
import React from 'react'
import MainHeader from './components/MainHeader/MainHeader'
import Registration from './components/Registration'
import Login from './components/Login'
import Home from './components/home'
import Patient from './components/Patient'
import RadiologistDoctor from './components/RadiologistDoctor'
import ReportDoctor from './components/ReportDoctor'
import UploadD from './components/uploadD'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import FileDownload from './components/download'
import EditProfile from './components/editProfile'

function App() {
  return (
    <div>
      <MainHeader/>
    
    <div>
      <Router>
        <Routes>
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/patient" element={<Patient />} />
          <Route path="/radiologistdoctor" element={<RadiologistDoctor />} />
          <Route path="/reportdoctor" element={<ReportDoctor />} />
          <Route path="/download" element ={<FileDownload/>}/>
          <Route path="/editprofile" element ={<EditProfile/>}/>
        </Routes>
      </Router>
    </div>
    </div>
  )
}

export default App
