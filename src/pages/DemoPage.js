"use client"

import "./DemoPage.css"

export default function DemoPage() {
  return (
    <div className="demo-page">
      {/* Background Elements */}
      <div className="background-elements">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>

      {/* Header Section */}
      <header className="demo-header">
        <div className="header-content">
          <div className="badge">
            <span className="badge-icon">🎬</span>
            <span className="badge-text">Product Demo</span>
          </div>
          <h1 className="demo-title">
            <span className="title-gradient">FocusBuzz</span>
            <span className="title-normal"> in Action</span>
          </h1>
          <p className="demo-subtitle">
            Watch how FocusBuzz transforms your productivity workflow with intelligent focus
            sessions and seamless task management.
          </p>
        </div>
      </header>

      {/* Video Section */}
      <main className="video-section">
       <div className="video-wrapper">
  <div className="video-player">
    <iframe
      width="100%"
      height="100%"
      src="https://www.youtube.com/embed/5zHHHDrNmQg"
      title="FocusBuzz Demo"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  </div>
</div>


        {/* Video Info Stats */}
        <div className="video-info">
          <div className="video-stats">
            <div className="stat-item">
              <span className="stat-icon">⏱️</span>
              <span className="stat-text">3:20 min</span>
            </div>
            <div className="stat-item">
              <span className="stat-icon">🎯</span>
              <span className="stat-text">Full Demo</span>
            </div>
            <div className="stat-item">
              <span className="stat-icon">📱</span>
              <span className="stat-text">All Features</span>
            </div>
            <div className="stat-item">
              <span className="stat-icon">🎬</span>
              <span className="stat-text">HD Quality</span>
            </div>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="feature-highlights">
          <h2 className="highlights-title">What You'll See</h2>
          <div className="highlights-grid">
            <div className="highlight-card">
              <div className="highlight-icon">⏰</div>
              <h3>Smart Timer</h3>
              <p>Pomodoro technique with intelligent break suggestions</p>
            </div>
            <div className="highlight-card">
              <div className="highlight-icon">📊</div>
              <h3>Analytics</h3>
              <p>Detailed productivity insights and progress tracking</p>
            </div>
            <div className="highlight-card">
              <div className="highlight-icon">📋</div>
              <h3>Task Management</h3>
              <p>Seamless task organization and priority management</p>
            </div>
            <div className="highlight-card">
              <div className="highlight-icon">🎯</div>
              <h3>Focus Sessions</h3>
              <p>Distraction-free environment for maximum productivity</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
