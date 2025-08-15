"use client"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import "./Register.css"

function Register() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ name: "", email: "", password: "" })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    console.log("🔄 Sending registration request...", formData)

    try {
      const res = await fetch("https://timer-backend-hxxq.onrender.com/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      console.log("📦 Response received:", data)

      if (!res.ok) {
        console.warn("❌ Registration failed:", data.message || "Unknown error")
        setError(data.message || "Registration failed")
        setLoading(false)
        return
      }

      console.log("✅ Registration successful")
      // Show success message and redirect to login
      alert("🎉 Registration successful! Please login to continue.")
      navigate("/login")
    } catch (err) {
      console.error("🚨 Registration error:", err)
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="register-container">
      <div className="register-wrapper">
        {/* Background Elements */}
        <div className="background-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>

        {/* Brand Header */}
        <div className="register-brand">
          <div className="brand-icon">🎯</div>
          <h1 className="brand-title">FocusBuzz</h1>
          <p className="brand-subtitle">Join thousands of users boosting their productivity!</p>
        </div>

        {/* Register Form */}
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-header">
            <h2 className="form-title">Create Account</h2>
            <p className="form-subtitle">Start your productivity journey today</p>
          </div>

          {error && (
            <div className="error-message">
              <span className="error-icon">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <div className="form-group">
            <div className="input-wrapper">
              <span className="input-icon">👤</span>
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <div className="input-wrapper">
              <span className="input-icon">📧</span>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <div className="input-wrapper">
              <span className="input-icon">🔒</span>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Create a strong password"
                value={formData.password}
                onChange={handleChange}
                required
                className="form-input"
                minLength="6"
              />
              <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>

          <div className="password-requirements">
            <p className="requirements-title">Password must contain:</p>
            <ul className="requirements-list">
              <li className={formData.password.length >= 6 ? "valid" : ""}>
                <span className="requirement-icon">{formData.password.length >= 6 ? "✅" : "⭕"}</span>
                At least 6 characters
              </li>
            </ul>
          </div>

          <div className="terms-agreement">
            <label className="terms-checkbox">
              <input type="checkbox" required />
              <span className="checkmark"></span>
              <span className="terms-text">
                I agree to the <Link to="/terms" className="terms-link">Terms of Service</Link> and{" "}
                <Link to="/privacy" className="terms-link">Privacy Policy</Link>
              </span>
            </label>
          </div>

          <button type="submit" disabled={loading} className="register-button">
            {loading ? (
              <>
                <span className="loading-spinner"></span>
                <span>Creating Account...</span>
              </>
            ) : (
              <>
                <span className="button-icon">✨</span>
                <span>Create Account</span>
              </>
            )}
          </button>

          <div className="switch-link">
            <span>Already have an account?</span>
            <Link to="/login" className="login-link">
              Sign In
            </Link>
          </div>
        </form>

        {/* Footer */}
        <div className="register-footer">
          <p>© 2024 FocusBuzz. Built for productivity enthusiasts.</p>
        </div>
      </div>
    </div>
  )
}

export default Register
