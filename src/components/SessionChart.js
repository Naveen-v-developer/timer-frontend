"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Area,
  AreaChart,
} from "recharts"
import "./SessionChart.css"

const SessionChart = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [chartType, setChartType] = useState("bar")
  const [totalSessions, setTotalSessions] = useState(0)
  const [averageSessions, setAverageSessions] = useState(0)
  const [bestDay, setBestDay] = useState("")

  useEffect(() => {
    const fetchSessionData = async () => {
      try {
        setLoading(true)
        const token = localStorage.getItem("token")
        const res = await axios.get("https://timer-backend-hxxq.onrender.com/api/session/history", {
          headers: { Authorization: `Bearer ${token}` },
        })

        const grouped = {}
        const today = new Date()
        const last7Days = []

        for (let i = 6; i >= 0; i--) {
          const date = new Date(today)
          date.setDate(today.getDate() - i)
          const dateStr = date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })
          last7Days.push(dateStr)
          grouped[dateStr] = 0
        }

        res.data.forEach((session) => {
          const date = new Date(session.startTime).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })
          if (grouped[date] !== undefined) {
            grouped[date] += 1
          }
        })

        const chartData = last7Days.map((date) => ({
          date,
          sessions: grouped[date],
        }))

        setData(chartData)

        // Calculate statistics
        const total = chartData.reduce((sum, day) => sum + day.sessions, 0)
        const average = (total / 7).toFixed(1)
        const maxDay = chartData.reduce((max, day) => (day.sessions > max.sessions ? day : max), chartData[0])

        setTotalSessions(total)
        setAverageSessions(average)
        setBestDay(maxDay.date)
      } catch (err) {
        console.error("❌ Error fetching session data:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchSessionData()
  }, [])

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">{label}</p>
          <p className="tooltip-value">
            <span className="tooltip-icon">🎯</span>
            {`${payload[0].value} session${payload[0].value !== 1 ? "s" : ""}`}
          </p>
        </div>
      )
    }
    return null
  }

  const renderChart = () => {
    switch (chartType) {
      case "line":
        return (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(102, 126, 234, 0.1)" />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748b", fontSize: 12, fontWeight: 500 }}
            />
            <YAxis
              allowDecimals={false}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748b", fontSize: 12, fontWeight: 500 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="sessions"
              stroke="url(#lineGradient)"
              strokeWidth={3}
              dot={{ fill: "#667eea", strokeWidth: 2, r: 6 }}
              activeDot={{ r: 8, fill: "#764ba2" }}
            />
            <defs>
              <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#667eea" />
                <stop offset="100%" stopColor="#764ba2" />
              </linearGradient>
            </defs>
          </LineChart>
        )
      case "area":
        return (
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(102, 126, 234, 0.1)" />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748b", fontSize: 12, fontWeight: 500 }}
            />
            <YAxis
              allowDecimals={false}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748b", fontSize: 12, fontWeight: 500 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="sessions" stroke="#667eea" strokeWidth={2} fill="url(#areaGradient)" />
            <defs>
              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(102, 126, 234, 0.8)" />
                <stop offset="100%" stopColor="rgba(102, 126, 234, 0.1)" />
              </linearGradient>
            </defs>
          </AreaChart>
        )
      default:
        return (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(102, 126, 234, 0.1)" />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748b", fontSize: 12, fontWeight: 500 }}
            />
            <YAxis
              allowDecimals={false}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748b", fontSize: 12, fontWeight: 500 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="sessions" fill="url(#barGradient)" radius={[8, 8, 0, 0]} />
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#667eea" />
                <stop offset="100%" stopColor="#764ba2" />
              </linearGradient>
            </defs>
          </BarChart>
        )
    }
  }

  if (loading) {
    return (
      <div className="session-chart-container">
        <div className="chart-card">
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading your focus analytics...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="session-chart-container">
      <div className="chart-card">
        <div className="chart-header">
          <div className="header-content">
            <h2 className="chart-title">
              <span className="title-icon">📊</span>
              Daily Focus Sessions
            </h2>
            <p className="chart-subtitle">Your productivity journey over the last 7 days</p>
          </div>

          <div className="chart-controls">
            <div className="chart-type-selector">
              <button
                className={`chart-btn ${chartType === "bar" ? "active" : ""}`}
                onClick={() => setChartType("bar")}
              >
                📊
              </button>
              <button
                className={`chart-btn ${chartType === "line" ? "active" : ""}`}
                onClick={() => setChartType("line")}
              >
                📈
              </button>
              <button
                className={`chart-btn ${chartType === "area" ? "active" : ""}`}
                onClick={() => setChartType("area")}
              >
                🏔️
              </button>
            </div>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">🎯</div>
            <div className="stat-content">
              <span className="stat-number">{totalSessions}</span>
              <span className="stat-label">Total Sessions</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📈</div>
            <div className="stat-content">
              <span className="stat-number">{averageSessions}</span>
              <span className="stat-label">Daily Average</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🏆</div>
            <div className="stat-content">
              <span className="stat-number">{bestDay}</span>
              <span className="stat-label">Best Day</span>
            </div>
          </div>
        </div>

        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height={350}>
            {renderChart()}
          </ResponsiveContainer>
        </div>

        <div className="chart-footer">
          <div className="insight-card">
            <div className="insight-icon">💡</div>
            <div className="insight-content">
              <h4>Insight</h4>
              <p>
                {totalSessions === 0
                  ? "Start your first focus session to see your progress!"
                  : totalSessions >= 14
                    ? "Amazing consistency! You're building great focus habits."
                    : totalSessions >= 7
                      ? "Good progress! Try to maintain this momentum."
                      : "Keep going! Every session counts toward building your focus habit."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SessionChart
