"use client"

import { useState, useEffect, useRef } from "react"
import "./Timer.css"
import popup from "../assets/popup.wav";
import { playAlarm, stopAlarm } from "../components/sounds";
import {
  handleStartSession,
  handleEndSession,
  handleRatingSubmitService,
  startBreakSession,
} from "../services/sessionService";


function play() {
  console.log("Playing popup sound...")
}


 




const Timer = () => {
  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [ended, setEnded] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [popupMessage, setPopupMessage] = useState("")
  const [showRating, setShowRating] = useState(false)
  const [breakPrediction, setBreakPrediction] = useState(null)
  const [message, setMessage] = useState("")
  const [isBreakTime, setIsBreakTime] = useState(false)
  const [showStartNewButton, setShowStartNewButton] = useState(false)
  const [ratingSubmitted, setRatingSubmitted] = useState(false)
  const [loadingRating, setLoadingRating] = useState(false)
  const [remainingBreak, setRemainingBreak] = useState(0)
  const [mode, setMode] = useState("manual")
  const [countdownDuration, setCountdownDuration] = useState(300)
  const [nextTask, setNextTask] = useState(null)
  const [loadingTask, setLoadingTask] = useState(false)
  const [showTaskPopup, setShowTaskPopup] = useState(false)
  const intervalRef = useRef(null)

  const formatTime = (totalSec) => {
    const mins = String(Math.floor(totalSec / 60)).padStart(2, "0");
    const secs = String(totalSec % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  };



  const showTimedPopup = (text) => {
    setPopupMessage(text)
    setShowPopup(true)
    setTimeout(() => setShowPopup(false), 3000)
  }

  const clearTimer = () => {
    clearInterval(intervalRef.current)
    setIsRunning(false)
    setEnded(false)
    setSeconds(0)
  }

  const fetchNextTask = async () => {
    setLoadingTask(true)
    const token = localStorage.getItem("token")
    try {
      const res = await fetch("https://timer-backend-hxxq.onrender.com/api/tasks/next", {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      console.log("Next Task Response:", data)
      setNextTask(data)
    } catch (err) {
      console.error("Failed to fetch next task:", err)
      setNextTask({
        _id: "mock-id",
        text: "Complete project documentation",
        estimatedTime: 25,
      })
    } finally {
      setLoadingTask(false)
    }
  }

  const handleStart = () => {
     handleStartSession({
       play,
       clearTimer,
       setRatingSubmitted,
       setBreakPrediction,
       setIsBreakTime,
       setShowStartNewButton,
       showTimedPopup,
       setIsRunning,
       mode,
       setSeconds,
       countdownDuration,
       intervalRef,
       playAlarm,
       handleEnd,
       setMessage,
     });
   };

  const handleEnd = () => {
    handleEndSession({
      intervalRef,
      setIsRunning,
      setEnded,
      showTimedPopup,
      play,
      setMessage,
      setShowRating,
    })
  }

  const handleRatingSubmit = (ratingValue) => {
    handleRatingSubmitService({
      stopAlarm,
      setLoadingRating,
      setMessage,
      setBreakPrediction,
      setShowRating,
      setRatingSubmitted,
      showTimedPopup,
      ratingValue,
      startBreak: (duration) =>
        startBreakSession({
          duration,
          setIsBreakTime,
          setRemainingBreak,
          setSeconds,
          setMessage,
          showTimedPopup,
          setShowStartNewButton,
          intervalRef,
        }),
    })
  }

  useEffect(() => {
    fetchNextTask()
    return () => clearInterval(intervalRef.current)
  }, [])

  return (
    <div className="timercard">
      <div className="timer">
        {showPopup && (
          <div className="popup">
            <p>{popupMessage}</p>
          </div>
        )}
        {message && <p className="message-text">{message}</p>}

        <div className="mode-select">
          <button
            className="view-task-btn"
            onClick={() => setShowTaskPopup(true)}
            disabled={!nextTask || isRunning || isBreakTime}
          >
            <span className="btn-icon">🔄</span>
            View Next Task
          </button>
          <div className="mode-selector">
            <label>Session Mode:</label>
            <select value={mode} onChange={(e) => setMode(e.target.value)}>
              <option value="manual">Manual (Start/Stop)</option>
              <option value="countdown">Countdown (Auto-End)</option>
            </select>
          </div>
          {mode === "countdown" && (
            <div className="custom-duration-input">
              <label>Duration (minutes):</label>
            <input
  type="number"
  min="1"
  max="120"
  value={countdownDuration ? countdownDuration / 60 : ""}
  onChange={(e) => {
    const minutes = Number(e.target.value);
    if (!isNaN(minutes) && minutes > 0) {
      setCountdownDuration(minutes * 60);
    }
  }}
/>

              
            </div>
          )}
        </div>

        {showTaskPopup && nextTask && (
          <div className="modal-overlay">
            <div className="task-popup">
              <div className="popup-header">
                <h3>📝 Next Task</h3>
                <button className="close-btn" onClick={() => setShowTaskPopup(false)}>
                  ×
                </button>
              </div>
              <div className="task-details">
                <p>
                  <strong>Task:</strong> {nextTask.text}
                </p>
                <p>
                  <strong>Estimated Time:</strong> {nextTask.estimatedTime} minutes
                </p>
              </div>
              <div className="popup-buttons">
                <button
                  className="start-task-btn"
                  onClick={() => {
                    setShowTaskPopup(false)
                    handleStart(nextTask.estimatedTime)
                  }}
                >
                  <span className="btn-icon">▶</span>
                  Start Task
                </button>
                <button className="cancel-btn" onClick={() => setShowTaskPopup(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="timerbox">
          {!ended && (
            <>
              <h2 className="session-type">{isBreakTime ? "🌿 Break Time" : "⏰ Focus Session"}</h2>
              <div className="time-display">
                <span className="time-text">{isBreakTime ? formatTime(remainingBreak) : formatTime(seconds)}</span>
              </div>
            </>
          )}
          {!ended && !isBreakTime && (
            <div className="timer-buttons">
              <button className="start-btn" onClick={handleStart} disabled={isRunning}>
                <span className="btn-icon">▶</span>
                Start
              </button>
              <button className="end-btn" onClick={handleEnd}>
                <span className="btn-icon">⏹</span>
                End
              </button>
            </div>
          )}
        </div>

        {isBreakTime && (
          <div className="break-info">
            <div className="break-progress">
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width: `${((breakPrediction * 60 - remainingBreak) / (breakPrediction * 60)) * 100}%`,
                  }}
                ></div>
              </div>
              <p>⏳ Remaining break time: {formatTime(remainingBreak)}</p>
            </div>
          </div>
        )}

        {isBreakTime && nextTask && (
          <div className="complete-task-box">
            <div className="task-info">
              <p>
                📝 Task: <strong>{nextTask.text}</strong>
              </p>
            </div>
            <button
              className="complete-task-button"
              onClick={async () => {
                const token = localStorage.getItem("token")
                try {
                  const res = await fetch(`https://timer-backend-hxxq.onrender.com/api/tasks/${nextTask._id}/complete`, {
                    method: "PATCH",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${token}`,
                    },
                  })
                  if (res.ok) {
                    showTimedPopup("✅ Task marked as completed!")
                    setNextTask(null)
                    fetchNextTask()
                  } else {
                    showTimedPopup("❌ Failed to complete task.")
                  }
                } catch (err) {
                  console.error("Complete task error:", err)
                  showTimedPopup("❌ Error completing task.")
                }
              }}
            >
              <span className="btn-icon">✅</span>
              Mark Task as Completed
            </button>
          </div>
        )}

        {ended && !ratingSubmitted && (
          <div className="session-ended">
            <div className="celebration">🎉</div>
            <h3>Session Completed!</h3>
            <p>Reflect on your progress. Ready to rate your focus?</p>
          </div>
        )}

        {showRating && (
          <div className="modal-overlay">
            <div className="rating-modal">
              <h3>🌟 Rate your focus session</h3>
              {loadingRating ? (
                <div className="submitting-message">
                  <div className="spinner"></div>
                  <p>Submitting your rating...</p>
                </div>
              ) : (
                <div className="rating-buttons">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      className="rating-btn"
                      onClick={() => handleRatingSubmit(num)}
                      disabled={loadingRating}
                    >
                      <span className="rating-number">{num}</span>
                      <span className="rating-stars">{"⭐".repeat(num)}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {ratingSubmitted && breakPrediction !== null && (
          <div className="break-duration-box">
            <h3>🧘 Recommended Break</h3>
            <div className="break-stats">
              <div className="break-stat">
                <span className="stat-label">Predicted Duration</span>
                <span className="stat-value">{breakPrediction} min</span>
              </div>
              <div className="break-stat">
                <span className="stat-label">Remaining Time</span>
                <span className="stat-value">{formatTime(remainingBreak)}</span>
              </div>
            </div>
            {isBreakTime && <small className="break-note">Relax and recharge! 💆‍♀️</small>}
          </div>
        )}

        {showStartNewButton && (
          <div className="restart-session">
            <button className="restart-btn" onClick={handleStart}>
              <span className="btn-icon">🔄</span>
              Start New Focus Session
            </button>
          </div>
        )}

        <div className="motivational-quote">
          <div className="quote-icon">🚀</div>
          <p>"Every minute focused is a step toward your goal."</p>
        </div>
      </div>
    </div>
  )
}

export default Timer
