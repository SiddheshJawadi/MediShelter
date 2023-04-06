import './App.css'
import React from 'react'
import MainHeader from './components/MainHeader/MainHeader'
import Registration from './components/Registration'
import Login from './components/Login'
import Home from './components/home'
import UploadD from './components/uploadD'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
