"use client"

import { useNavigate } from "react-router-dom"
import "./HomePage.css"
import { useState, useEffect } from 'react';

const HomePage = () => {
  const navigate = useNavigate()

  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  // Check login status on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleGetStarted = () => {
    navigate("/login")
  }
   const handleNavLinkClick = (href) => {
    closeMobileMenu()
    if (href.startsWith("#")) {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  const handleDashboardClick = () => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard');
    } else {
      setShowLoginPopup(true);
      setTimeout(() => setShowLoginPopup(false), 3000);
    }
  };

  return (
    <div className="home-container">
      {/* Modern Navbar */}
       <nav className="home-navbar">
        <div className="navbar-container">
          <div className="navbar-brand">
            <div className="brand-icon">🎯</div>
            <span className="brand-text">FocusBuzz</span>
          </div>

          {/* Desktop Navigation */}
          <div className="navbar-links">
            <a href="#home" className="nav-link active" onClick={() => handleNavLinkClick("#home")}>
              Home
            </a>
            <a href="#features" className="nav-link" onClick={() => handleNavLinkClick("#features")}>
              Features
            </a>
            <a href="#how-it-works" className="nav-link" onClick={() => handleNavLinkClick("#how-it-works")}>
              How It Works
            </a>
            <button className="nav-link dashboard-link" onClick={handleDashboardClick}>
              <span className="btn-icon">📊</span>
              Dashboard
            </button>
          </div>

          {/* Desktop Actions */}
          <div className="navbar-actions">
            <button className="nav-btn login-btn" onClick={() => navigate("/login")}>
              <span className="btn-icon">🔑</span>
              Login
            </button>
            <button className="nav-btn register-btn" onClick={() => navigate("/register")}>
              <span className="btn-icon">✨</span>
              Register
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className={`mobile-menu-toggle ${isMobileMenuOpen ? "active" : ""}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <span className="hamburger">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMobileMenuOpen ? "open" : ""}`}>
          <div className="mobile-menu-content">
            <div className="mobile-nav-links">
              <a href="#home" className="mobile-nav-link" onClick={() => handleNavLinkClick("#home")}>
                <span className="mobile-link-icon">🏠</span>
                Home
              </a>
              <a href="#features" className="mobile-nav-link" onClick={() => handleNavLinkClick("#features")}>
                <span className="mobile-link-icon">✨</span>
                Features
              </a>
              <a href="#how-it-works" className="mobile-nav-link" onClick={() => handleNavLinkClick("#how-it-works")}>
                <span className="mobile-link-icon">🔄</span>
                How It Works
              </a>
              <button
                className="mobile-nav-link"
                onClick={() => {
                  handleDashboardClick()
                  closeMobileMenu()
                }}
              >
                <span className="mobile-link-icon">📊</span>
                Dashboard
              </button>
            </div>

            <div className="mobile-nav-actions">
              <button
                className="mobile-nav-btn login"
                onClick={() => {
                  navigate("/login")
                  closeMobileMenu()
                }}
              >
                <span className="btn-icon">🔑</span>
                Login
              </button>
              <button
                className="mobile-nav-btn register"
                onClick={() => {
                  navigate("/register")
                  closeMobileMenu()
                }}
              >
                <span className="btn-icon">✨</span>
                Register
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && <div className="mobile-menu-overlay" onClick={closeMobileMenu}></div>}
      </nav>

      {/* Hero Section */}
      <section className="hero-section" id="home">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-icon">🚀</span>
            <span>Boost Your Productivity</span>
          </div>
          <h1 className="hero-title">
            Master Your Focus with
            <span className="gradient-text"> FocusBuzz</span>
          </h1>
          <p className="hero-subtitle">
            Intelligent focus tracking with AI-powered break suggestions. Transform your productivity with smart session
            management and real-time insights.
          </p>
          <div className="hero-actions">
            <button className="cta-button primary" onClick={handleGetStarted}>
              <span className="btn-icon">🎯</span>
              Start Your Journey
            </button>
            <button className="cta-button secondary" onClick={() => navigate("/demo")}>
              <span className="btn-icon">👀</span>
              Watch Demo
            </button>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">10K+</span>
              <span className="stat-label">Active Users</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">50K+</span>
              <span className="stat-label">Focus Sessions</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">95%</span>
              <span className="stat-label">Satisfaction</span>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="floating-card card-1">
            <div className="card-icon">⏰</div>
            <div className="card-content">
              <h4>Focus Timer</h4>
              <p>25:00</p>
            </div>
          </div>
          <div className="floating-card card-2">
            <div className="card-icon">📊</div>
            <div className="card-content">
              <h4>Today's Progress</h4>
              <p>8 sessions</p>
            </div>
          </div>
          <div className="floating-card card-3">
            <div className="card-icon">🎯</div>
            <div className="card-content">
              <h4>Focus Score</h4>
              <p>92%</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section" id="features">
        <div className="section-header">
          <div className="section-badge">
            <span className="badge-icon">✨</span>
            <span>Features</span>
          </div>
          <h2 className="section-title">Everything You Need to Stay Focused</h2>
          <p className="section-subtitle">
            Powerful tools designed to help you maximize productivity and maintain focus
          </p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">⏱️</div>
            <h3>Smart Focus Timer</h3>
            <p>Track your study or work sessions with a distraction-free timer that adapts to your workflow.</p>
            <div className="feature-highlight">Pomodoro Compatible</div>
          </div>

          <div className="feature-card featured">
            <div className="feature-badge">Most Popular</div>
            <div className="feature-icon">🤖</div>
            <h3>AI Break Suggestions</h3>
            <p>Get custom break durations based on your session length and focus rating using advanced algorithms.</p>
            <div className="feature-highlight">AI Powered</div>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Real-Time Feedback</h3>
            <p>Submit feedback after each session to improve future recommendations and track your progress.</p>
            <div className="feature-highlight">Instant Insights</div>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📈</div>
            <h3>Progress Dashboard</h3>
            <p>Visualize your focus history and track your improvement over time with beautiful charts.</p>
            <div className="feature-highlight">Visual Analytics</div>
          </div>

          <div className="feature-card">
            <div className="feature-icon">✅</div>
            <h3>Task Management</h3>
            <p>Organize your daily tasks, mark them complete, and stay on top of your goals effortlessly.</p>
            <div className="feature-highlight">Goal Tracking</div>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Secure & Private</h3>
            <p>Your data is stored safely and privately with enterprise-grade security measures.</p>
            <div className="feature-highlight">Bank-Level Security</div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section" id="how-it-works">
        <div className="section-header">
          <div className="section-badge">
            <span className="badge-icon">🔄</span>
            <span>Process</span>
          </div>
          <h2 className="section-titleh">How FocusBuzz Works</h2>
          <p className="section-subtitle">Simple steps to transform your productivity</p>
        </div>

        <div className="steps-container">
          <div className="step-item">
            <div className="step-number">1</div>
            <div className="step-content">
              <h3>Start Your Session</h3>
              <p>Begin a focus session when you're ready to dive deep into your work.</p>
            </div>
          </div>

          <div className="step-connector"></div>

          <div className="step-item">
            <div className="step-number">2</div>
            <div className="step-content">
              <h3>Focus Without Distractions</h3>
              <p>Work in a distraction-free environment with our minimalist timer interface.</p>
            </div>
          </div>

          <div className="step-connector"></div>

          <div className="step-item">
            <div className="step-number">3</div>
            <div className="step-content">
              <h3>Rate Your Experience</h3>
              <p>End the session and provide feedback about your focus level and productivity.</p>
            </div>
          </div>

          <div className="step-connector"></div>

          <div className="step-item">
            <div className="step-number">4</div>
            <div className="step-content">
              <h3>Get Smart Recommendations</h3>
              <p>Receive AI-powered break duration suggestions based on your session data.</p>
            </div>
          </div>

          <div className="step-connector"></div>

          <div className="step-item">
            <div className="step-number">5</div>
            <div className="step-content">
              <h3>Track Your Progress</h3>
              <p>Review your focus sessions and improvement trends on your personal dashboard.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <div className="cta-icon">🔐</div>
          <h2>Ready to Master Your Focus?</h2>
          <p>"Every focused minute takes you one step closer to your goals — log in and take control of your time."</p>
          <button className="cta-button primary large" onClick={handleGetStarted}>
            <span className="btn-icon">🚀</span>
            Get Started Now
          </button>
          <div className="cta-features">
            <div className="cta-feature">
              <span className="feature-check">✅</span>
              <span>Free to start</span>
            </div>
            <div className="cta-feature">
              <span className="feature-check">✅</span>
              <span>No credit card required</span>
            </div>
            <div className="cta-feature">
              <span className="feature-check">✅</span>
              <span>Setup in 2 minutes</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="brand-icon">🎯</div>
            <span className="brand-text">FocusBuzz</span>
          </div>
          <p className="footer-tagline">Start your journey with FocusBuzz and master your focus!</p>
          <div className="footer-links">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <a href="#contact">Contact</a>
            <a href="#support">Support</a>
          </div>
          <div className="footer-bottom">
            <p>Made with ❤️ for students and professionals</p>
            <p>© 2024 FocusBuzz. All rights reserved.</p>
          </div>
        </div>
      </footer>
      {showLoginPopup && (
        <div className="login-popup">
          <div className="popup-content">
            <span className="popup-icon">🔒</span>
            <span>Please login to access the dashboard</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default HomePage
