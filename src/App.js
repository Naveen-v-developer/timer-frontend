"use client"

import { useState, useEffect, lazy, Suspense } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"


// Lazy load pages
const HomePage = lazy(() => import("./pages/Home"))
const Dashboard = lazy(() => import("./pages/Dashboard"))
const Login = lazy(() => import("./components/Login"))
const Register = lazy(() => import("./components/Register"))
const Profile = lazy(() => import("./pages/Profile"))
const Tasks = lazy(() => import("./pages/TaskPage")) // ✅ Tasks page
const Performance = lazy(() => import("./pages/Performance")) // ✅ Performance page
const DemoPage = lazy(() => import("./pages/DemoPage")) // ✅ Demo page
const HelpPage = lazy(() => import("./pages/HelpPage")) // ✅ Help page

// Protect route for authentication
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token")
  return token ? children : <Navigate to="/login" />
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"))

  useEffect(() => {
    const checkLogin = () => {
      setIsLoggedIn(!!localStorage.getItem("token"))
    }
    window.addEventListener("storage", checkLogin)
    return () => window.removeEventListener("storage", checkLogin)
  }, [])

  return (
    <Router>
      <Suspense fallback={<div style={{ textAlign: "center", marginTop: "50px" }}>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tasks"
            element={
              <ProtectedRoute>
                <Tasks />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login onLogin={() => setIsLoggedIn(true)} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/performance" element={<Performance />} />
           <Route path="/demo" element={<DemoPage />} />
        <Route path="/help" element={<HelpPage />} />            
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
