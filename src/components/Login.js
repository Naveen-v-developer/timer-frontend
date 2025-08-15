"use client"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import "./Login.css"

function Login() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ email: "", password: "" })
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
    console.log("🔄 Sending login request...", formData)

    try {
      const res = await fetch("https://timer-backend1.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      console.log("📦 Response received:", data)

      if (!res.ok) {
        console.warn("❌ Login failed:", data.msg || "Unknown error")
        setError(data.msg || "Login failed")
        setLoading(false)
        return
      }

      console.log("✅ Login successful. Token:", data.token)
      localStorage.setItem("token", data.token)
      localStorage.setItem("userId", data.user._id)
      localStorage.setItem("user", JSON.stringify(data.user))
      navigate("/dashboard")
    } catch (err) {
      console.error("🚨 Login error:", err)
      setError("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-wrapper">
        {/* Background Elements */}
        <div className="background-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>

        {/* Brand Header */}
        <div className="login-brand">
          <div className="brand-icon">🎯</div>
          <h1 className="brand-title">FocusBuzz</h1>
          <p className="brand-subtitle">Welcome back! Ready to boost your productivity?</p>
        </div>

        {/* Login Form */}
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-header">
            <h2 className="form-title">Sign In</h2>
            <p className="form-subtitle">Enter your credentials to access your account</p>
          </div>

          {error && (
            <div className="error-message">
              <span className="error-icon">⚠️</span>
              <span>{error}</span>
            </div>
          )}

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
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                className="form-input"
              />
              <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>

          <div className="form-options">
            <label className="remember-me">
             
            
              
            </label>
           
          </div>

          <button type="submit" disabled={loading} className="login-button" style={{ marginBottom: "32px" }}>
            {loading ? (
              <>
                <span className="loading-spinner"></span>
                <span>Signing in...</span>
              </>
            ) : (
              <>
                <span className="button-icon">🚀</span>
                <span>Sign In</span>
              </>
            )}
          </button>

          <div className="switch-link">
            <span>Don't have an account?</span>
            <Link to="/register" className="register-link">
              Create Account
            </Link>
          </div>
        </form>

        {/* Footer */}
        <div className="login-footer">
          <p>© 2024 FocusBuzz. Built for productivity enthusiasts.</p>
        </div>
      </div>
    </div>
  )
}

export default Login
