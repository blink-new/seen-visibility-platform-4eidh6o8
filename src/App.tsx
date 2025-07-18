import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import PlugScan from './pages/PlugScan'
import { Toaster } from './components/ui/toaster'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/scan" element={<PlugScan />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  )
}

export default App