"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Timer from "./Timer"
import "./Dashboard.css"

const Dashboard = () => {
  const navigate = useNavigate()
  const [predictedBreak, setPredictedBreak] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [userName, setUserName] = useState("User")
  const [todayStats, setTodayStats] = useState({
    sessions: 0,
    totalTime: 0,
    streak: 0,
  })
  const [showUserMenu, setShowUserMenu] = useState(false)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    if (user && user.name) {
      setUserName(user.name)
    }
    // Fetch today's stats
    fetchTodayStats()
  }, [])

  const fetchTodayStats = async () => {
    try {
      const token = localStorage.getItem("token")
      const res = await fetch("https://timer-backend1.onrender.com/api/session/today-stats", {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.ok) {
        const data = await res.json()
        setTodayStats(data)
      }
    } catch (err) {
      console.error("Failed to fetch today's stats:", err)
    }
  }

  const handleLogout = async () => {
    const token = localStorage.getItem("token")
    try {
      await fetch("https://timer-backend1.onrender.com/api/session/end", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
    } catch (error) {
      console.error("Error ending session:", error.message)
    }
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    navigate("/")
  }

  const formatHours = (minutes) => {
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    if (hours === 0) return `${remainingMinutes}m`
    if (remainingMinutes === 0) return `${hours}h`
    return `${hours}h ${remainingMinutes}m`
  }

  return (
    <div className="dashboard">
      {/* Simplified Perfect Navbar */}
      <nav className="dashboard-navbar">
        <div className="navbar-container">
          {/* Brand Section */}
          <div className="nav-brand">
            <div className="brand-icon">🎯</div>
            <span className="brand-text">FocusBuzz</span>
            <div className="brand-tagline">Dashboard</div>
          </div>

          {/* Navigation Buttons */}
          <div className="nav-actions">
            <button className="nav-btn home-btn" onClick={() => navigate("/")}>
              <span className="btn-icon">🏠</span>
              <span className="btn-text">Home</span>
            </button>
            <button className="nav-btn analytics-btn" onClick={() => navigate("/performance")}>
              <span className="btn-icon">📊</span>
              <span className="btn-text">Analytics</span>
            </button>
            <button className="nav-btn tasks-btn" onClick={() => navigate("/tasks")}>
              <span className="btn-icon">📋</span>
              <span className="btn-text">Tasks</span>
            </button>

            {/* Enhanced User Profile Menu */}
            <div className="user-menu-wrapper">
              <button className="user-menu-btn" onClick={() => setShowUserMenu(!showUserMenu)}>
                <div className="user-avatar">
                  <span>{userName.charAt(0).toUpperCase()}</span>
                </div>
                <div className="user-info">
                  <span className="user-greeting">Hi, {userName}!</span>
                  <span className="user-status">🟢 Active</span>
                </div>
                <span className="dropdown-arrow">▼</span>
              </button>

              {showUserMenu && (
                <div className="user-dropdown">
                  <div className="dropdown-header">
                    <div className="user-info-large">
                      <div className="user-avatar-large">
                        <span>{userName.charAt(0).toUpperCase()}</span>
                      </div>
                      <div className="user-details">
                        <span className="user-name-large">{userName}</span>
                   
                        <span className="user-status-large">🟢 Active</span>
                      </div>
                    </div>
                  </div>
                  <div className="dropdown-menu">
                   
                    <button
                      className="dropdown-item"
                      onClick={() => {
                        navigate("/performance")
                        setShowUserMenu(false)
                      }}
                    >
                      <span className="dropdown-icon">📊</span>
                      <span>My Analytics</span>
                    </button>
                    <button
                      className="dropdown-item"
                      onClick={() => {
                        navigate("/help")
                        setShowUserMenu(false)
                      }}
                    >
                      <span className="dropdown-icon">❓</span>
                      <span>Help & Support</span>
                    </button>
                    <div className="dropdown-divider"></div>
                    <button className="dropdown-item logout-item" onClick={handleLogout}>
                      <span className="dropdown-icon">🚪</span>
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button className="nav-btn logout-btn" onClick={handleLogout}>
              <span className="btn-icon">🚪</span>
              <span className="btn-text">Logout</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="mobile-menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            <span className={`hamburger ${menuOpen ? "open" : ""}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>

        {/* Simplified Mobile Menu */}
        <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
          <div className="mobile-user-info">
            <div className="user-avatar-large">
              <span>{userName.charAt(0).toUpperCase()}</span>
            </div>
            <div className="user-details">
              <span className="user-name">Hi, {userName}!</span>
              <span className="user-status">🟢 Active</span>
            </div>
          </div>
          <div className="mobile-nav-links">
            <button className="mobile-nav-btn" onClick={() => navigate("/")}>
              <span className="btn-icon">🏠</span>
              <span>Home</span>
            </button>
            <button className="mobile-nav-btn" onClick={() => navigate("/performance")}>
              <span className="btn-icon">📊</span>
              <span>Analytics</span>
            </button>
            <button className="mobile-nav-btn" onClick={() => navigate("/tasks")}>
              <span className="btn-icon">📋</span>
              <span>Tasks</span>
            </button>
            <button className="mobile-nav-btn" onClick={() => navigate("/profile")}>
              <span className="btn-icon">👤</span>
              <span>My Profile</span>
            </button>
            <div className="mobile-divider"></div>
            <button className="mobile-nav-btn logout" onClick={handleLogout}>
              <span className="btn-icon">🚪</span>
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Welcome Section - Updated with 3 cards */}
      <section className="welcome-section">
        <div className="welcome-content">
          <div className="welcome-text">
            <h1 className="welcome-title">
              <span className="welcome-icon">👋</span>
              Welcome back, {userName}!
            </h1>
            <p className="welcome-subtitle">Ready to boost your productivity today?</p>
          </div>
          <div className="daily-stats">
            <div className="daily-stat-card">
              <div className="stat-icon-large">🎯</div>
              <div className="stat-info">
                <span className="stat-number-large">{todayStats.sessions}</span>
                <span className="stat-label-large">Sessions Today</span>
              </div>
            </div>
            <div className="daily-stat-card">
              <div className="stat-icon-large">⚡</div>
              <div className="stat-info">
                <span className="stat-number-large">{todayStats.streak}</span>
                <span className="stat-label-large">Day Streak</span>
              </div>
            </div>
            <div className="daily-stat-card">
              <div className="stat-icon-large">⏰</div>
              <div className="stat-info">
                <span className="stat-number-large">{formatHours(todayStats.totalTime)}</span>
                <span className="stat-label-large">Time Focused</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Dashboard Content - Clean and Focused */}
      <main className="dashboard-main">
        {/* Timer Section - Main Focus */}
        <section className="timer-section">
          <div className="section-header">
            <h2 className="section-title">
              <span className="section-icon">⏰</span>
              Focus Timer
            </h2>
            <p className="section-subtitle">Start your focused work session</p>
          </div>
          <div className="timer-container">
            <Timer initialMinutes={25} initialSeconds={0} setPredictedBreak={setPredictedBreak} />
          </div>
        </section>

        {/* Quick Actions */}
        <section className="quick-actions-section">
          <div className="section-header">
            <h2 className="section-title">
              <span className="section-icon">⚡</span>
              Quick Actions
            </h2>
          </div>
          <div className="action-grid">
            <button className="action-card" onClick={() => navigate("/tasks")}>
              <div className="action-icon">📋</div>
              <div className="action-content">
                <h3>Manage Tasks</h3>
                <p>Add, edit, and organize your tasks</p>
              </div>
            </button>
            <button className="action-card" onClick={() => navigate("/performance")}>
              <div className="action-icon">📈</div>
              <div className="action-content">
                <h3>View Performance</h3>
                <p>Detailed analytics and insights</p>
              </div>
            </button>
            <button className="action-card" onClick={() => navigate("/")}>
              <div className="action-icon">🏠</div>
              <div className="action-content">
                <h3>Home</h3>
                <p>Return to homepage</p>
              </div>
            </button>
          </div>
        </section>
      </main>

      {/* Clean Footer */}
      <footer className="dashboard-footer">
        <div className="footer-content">
          <div className="footer-quotes">
            <div className="quote-card">
              <div className="quote-icon">💡</div>
              <p>"Progress, not perfection. Every session counts."</p>
            </div>
            <div className="quote-card">
              <div className="quote-icon">🧠</div>
              <p>"Take breaks to recharge your focus and creativity."</p>
            </div>
          </div>
          <div className="footer-info">
            <p>© {new Date().getFullYear()} FocusBuzz. Built for productivity enthusiasts.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Dashboard
