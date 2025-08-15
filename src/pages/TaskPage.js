"use client"

import { useState, useEffect } from "react"
import "./TaskPage.css"
import { useNavigate } from "react-router-dom"

const API_BASE_URL = "https://timer-backend-hxxq.onrender.com"

export default function TaskManager() {
  const [tasks, setTasks] = useState([])
  const [inputValue, setInputValue] = useState("")
  const [durationValue, setDurationValue] = useState(0)
  const [filter, setFilter] = useState("all")
  const [editingId, setEditingId] = useState(null)
  const [editValue, setEditValue] = useState("")
  const [editDuration, setEditDuration] = useState(0)
  const [popupMessage, setPopupMessage] = useState("")
  const [popupVisible, setPopupVisible] = useState(false)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const token = localStorage.getItem("token")

  const showPopup = (message) => {
    setPopupMessage(message)
    setPopupVisible(true)
    setTimeout(() => {
      setPopupVisible(false)
      setPopupMessage("")
    }, 3000)
  }

  // Fetch all tasks from API
  const fetchTasks = async () => {
    try {
      setLoading(true)
      const res = await fetch(`${API_BASE_URL}/api/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      if (res.ok) {
        setTasks(data)
      } else {
        showPopup(data.message || "Failed to fetch tasks")
      }
    } catch (err) {
      console.error("Fetch tasks failed:", err)
      showPopup("Failed to fetch tasks")
    } finally {
      setLoading(false)
    }
  }

  // Add new task
  const addTask = async (e) => {
    e.preventDefault()
    if (!inputValue.trim() || !durationValue || isNaN(Number(durationValue))) {
      showPopup("Please enter valid task and duration")
      return
    }

    try {
      setLoading(true)
      const res = await fetch(`${API_BASE_URL}/api/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          text: inputValue.trim(),
          estimatedTime: Number(durationValue),
        }),
      })
      const data = await res.json()

      if (res.ok) {
        setInputValue("")
        setDurationValue(0)
        fetchTasks()
        showPopup("Task added successfully!")
      } else {
        showPopup(data.message || "Failed to add task")
      }
    } catch (err) {
      console.error("Add task error:", err)
      showPopup("Error adding task")
    } finally {
      setLoading(false)
    }
  }

  // Delete task
  const deleteTask = async (id) => {
    try {
      setLoading(true)
      const res = await fetch(`${API_BASE_URL}/api/tasks/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })

      if (res.ok) {
        fetchTasks()
        showPopup("Task deleted successfully!")
      } else {
        showPopup("Failed to delete task")
      }
    } catch (err) {
      console.error("Delete task error:", err)
      showPopup("Failed to delete task")
    } finally {
      setLoading(false)
    }
  }

  // Toggle task completion
  const toggleComplete = async (id) => {
    try {
      setLoading(true)
      const res = await fetch(`${API_BASE_URL}/api/tasks/${id}/complete`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      })

      if (res.ok) {
        fetchTasks()
        showPopup("Task status updated!")
      } else {
        showPopup("Failed to update task status")
      }
    } catch (err) {
      console.error("Toggle complete error:", err)
      showPopup("Failed to update task status")
    } finally {
      setLoading(false)
    }
  }

  // Start editing task
  const startEdit = (id, text, estimatedTime) => {
    setEditingId(id)
    setEditValue(text)
    setEditDuration(estimatedTime)
  }

  // Save edited task
  const saveEdit = async () => {
    if (!editValue.trim() || !editDuration || isNaN(Number(editDuration))) {
      showPopup("Please enter valid task and duration")
      return
    }

    try {
      setLoading(true)
      const res = await fetch(`${API_BASE_URL}/api/tasks/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          text: editValue.trim(),
          estimatedTime: Number(editDuration),
        }),
      })

      if (res.ok) {
        setEditingId(null)
        setEditValue("")
        setEditDuration(0)
        fetchTasks()
        showPopup("Task updated successfully!")
      } else {
        showPopup("Failed to update task")
      }
    } catch (err) {
      console.error("Update task error:", err)
      showPopup("Failed to update task")
    } finally {
      setLoading(false)
    }
  }

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null)
    setEditValue("")
    setEditDuration(0)
  }

  // Clear all completed tasks
  const clearCompleted = async () => {
    const completedTasks = tasks.filter((task) => task.completed)

    try {
      setLoading(true)
      await Promise.all(
        completedTasks.map((task) =>
          fetch(`${API_BASE_URL}/api/tasks/${task._id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          }),
        ),
      )
      fetchTasks()
      showPopup(`Cleared ${completedTasks.length} completed tasks!`)
    } catch (err) {
      console.error("Clear completed error:", err)
      showPopup("Failed to clear completed tasks")
    } finally {
      setLoading(false)
    }
  }

  // Fetch tasks on mount
  useEffect(() => {
    fetchTasks()
  }, [])

  // ... rest of your UI rendering code



  // Fetch tasks on component mount
  useEffect(() => {
    if (token) {
      fetchTasks()
    } else {
      showPopup("Please login to access tasks")
    }
  }, [token])

  // Filter tasks based on current filter
  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed
    if (filter === "completed") return task.completed
    return true
  })

  const activeTasks = tasks.filter((task) => !task.completed).length
  const completedTasks = tasks.filter((task) => task.completed).length

  const formatDuration = (minutes) => {
    if (minutes < 60) {
      return `${minutes}min`
    } else {
      const hours = Math.floor(minutes / 60)
      const remainingMinutes = minutes % 60
      if (remainingMinutes === 0) {
        return `${hours}h`
      }
      return `${hours}h ${remainingMinutes}min`
    }
  }

  if (!token) {
    return (
      <div className="task-manager">
        <div className="container">
          <div className="auth-required">
            <h2>Authentication Required</h2>
            <p>Please login to access the task manager</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="task-manager">
      <div className="container">
        <header className="header">
          <div className="header-top">
            <button className="back-btn" onClick={() => navigate("/dashboard")}>
              <span className="back-icon">←</span>
              <span>Back to Dashboard</span>
            </button>
          </div>
          <h1>Task Manager Dashboard</h1>
          <p>Organize your tasks efficiently</p>
        </header>

        <form onSubmit={addTask} className="add-task-form">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Add a new task..."
            className="task-input"
            disabled={loading}
          />
          <input
            type="number"
            value={durationValue}
            onChange={(e) => setDurationValue(Number(e.target.value))}
            placeholder="Enter duration"
            min="0"
            step="1"
            className="duration-input"
            disabled={loading}
          />
          <button type="submit" className="add-btn" disabled={loading}>
            {loading ? "Adding..." : "Add Task"}
          </button>
        </form>

        <div className="stats">
          <div className="stat-item">
            <span className="stat-number">{activeTasks}</span>
            <span className="stat-label">Active</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{completedTasks}</span>
            <span className="stat-label">Completed</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{tasks.length}</span>
            <span className="stat-label">Total</span>
          </div>
        </div>

        <div className="filters">
          <button className={`filter-btn ${filter === "all" ? "active" : ""}`} onClick={() => setFilter("all")}>
            All
          </button>
          <button className={`filter-btn ${filter === "active" ? "active" : ""}`} onClick={() => setFilter("active")}>
            Active
          </button>
          <button
            className={`filter-btn ${filter === "completed" ? "active" : ""}`}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
        </div>

        <div className="task-list">
          {loading && tasks.length === 0 ? (
            <div className="loading-state">
              <p>Loading tasks...</p>
            </div>
          ) : filteredTasks.length === 0 ? (
            <div className="empty-state">
              <p>No tasks found</p>
              <span>Add a task to get started!</span>
            </div>
          ) : (
            filteredTasks.map((task) => (
              <div key={task._id} className={`task-item ${task.completed ? "completed" : ""}`}>
                <div className="task-content">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleComplete(task._id)}
                    className="task-checkbox"
                    disabled={loading}
                  />

                  {editingId === task._id ? (
                    <div className="edit-form">
                      <input
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="edit-input"
                        autoFocus
                        disabled={loading}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") saveEdit()
                          if (e.key === "Escape") cancelEdit()
                        }}
                      />
                      <input
                        type="number"
                        value={editDuration}
                        onChange={(e) => setEditDuration(Number(e.target.value))}
                        className="edit-duration-input"
                        min="0"
                        step="1"
                        placeholder="Enter duration"
                        disabled={loading}
                      />
                      <div className="edit-actions">
                        <button onClick={saveEdit} className="save-btn" disabled={loading}>
                          {loading ? "Saving..." : "Save"}
                        </button>
                        <button onClick={cancelEdit} className="cancel-btn" disabled={loading}>
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="task-info">
                      <span className="task-text">{task.text}</span>
                      <span className="task-duration">{formatDuration(task.estimatedTime)}</span>
                    </div>
                  )}
                </div>

                {editingId !== task._id && (
                  <div className="task-actions">
                    <button
                      onClick={() => startEdit(task._id, task.text, task.estimatedTime)}
                      className="edit-btn"
                      disabled={task.completed || loading}
                    >
                      Edit
                    </button>
                    <button onClick={() => deleteTask(task._id)} className="delete-btn" disabled={loading}>
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {completedTasks > 0 && (
          <div className="clear-completed">
            <button onClick={clearCompleted} className="clear-btn" disabled={loading}>
              {loading ? "Clearing..." : `Clear Completed (${completedTasks})`}
            </button>
          </div>
        )}

        {popupVisible && <div className="popup">{popupMessage}</div>}
      </div>
    </div>
  )
}
