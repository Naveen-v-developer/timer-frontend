"use client"

import { useNavigate } from "react-router-dom"
import SessionChart from "../components/SessionChart"
import "./Performance.css"

const Performance = () => {
  const navigate = useNavigate()

  return (
    <div className="performance-page">
      {/* Performance Header */}
      <header className="performance-header">
        <button className="back-btn" onClick={() => navigate("/dashboard")}>
          <span className="back-icon">←</span>
          <span>Back to Dashboard</span>
        </button>
        <div className="header-content">
          <h1 className="page-title">
            <span className="title-icon">📊</span>
            Performance Analytics
          </h1>
          <p className="page-subtitle">Track your productivity and focus patterns</p>
        </div>
      </header>

      {/* Analytics Content */}
      <main className="performance-main">
        <SessionChart />
      </main>
    </div>
  )
}

export default Performance
