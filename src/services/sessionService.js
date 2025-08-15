const API_BASE_URL = "https://timer-backend1.onrender.com";

export const handleStartSession = async ({
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
}) => {
  play();
  clearTimer();
  setRatingSubmitted(false);
  setBreakPrediction(null);
  setIsBreakTime(false);
  setShowStartNewButton(false);

  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`${API_BASE_URL}/api/session/start`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      showTimedPopup("🎯 Focus session started!");
      setIsRunning(true);

      if (mode === "manual") {
        intervalRef.current = setInterval(
          () => setSeconds((prev) => prev + 1),
          1000
        );
      } else {
        setSeconds(countdownDuration);
        intervalRef.current = setInterval(() => {
          setSeconds((prev) => {
            if (prev <= 1) {
              clearInterval(intervalRef.current);
              playAlarm(true);
              handleEnd();
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }
    } else {
      const data = await res.json();
      setMessage(data.message || "Failed to start session.");
    }
  } catch (err) {
    console.error("Start error:", err);
    setMessage("Start failed");
  }
};

export const handleEndSession = async ({
  intervalRef,
  setIsRunning,
  setEnded,
  showTimedPopup,
  play,
  setMessage,
  setShowRating,
}) => {
  clearInterval(intervalRef.current);
  setIsRunning(false);
  setEnded(true);

  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_BASE_URL}/api/session/end`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (res.ok) {
      showTimedPopup("✅ Focus session ended!");
      play();
      setMessage(`✅ Session Ended: ${data.duration} minutes`);
      setShowRating(true);
    } else {
      setMessage(data.message || "Failed to end session.");
    }
  } catch (err) {
    console.error("End error:", err);
    setMessage("End failed");
  }
};

export const handleRatingSubmitService = async ({
  stopAlarm,
  setLoadingRating,
  setMessage,
  setBreakPrediction,
  setShowRating,
  setRatingSubmitted,
  showTimedPopup,
  startBreak,
  ratingValue,
}) => {
  if (!ratingValue) return;

  stopAlarm();
  setLoadingRating(true);
  setMessage("⏳ Submitting rating...");

  try {
    const token = localStorage.getItem("token");

    const sessionRes = await fetch(`${API_BASE_URL}/api/session/history`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const sessionData = await sessionRes.json();
    const latestSession = sessionData.find(
      (s) => s.durationMinutes !== undefined
    );

    if (!latestSession) {
      console.error("❌ No valid session with duration found.");
      setMessage("No valid session data found.");
      return;
    }

    const predictRes = await fetch(
      "https://timer-ml.onrender.com/api/predict/break-duration",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionLength: latestSession.durationMinutes,
          rating: ratingValue,
        }),
      }
    );

    const prediction = await predictRes.json();
    const breakDuration = parseFloat(
      prediction.recommended_break_duration
    );

    setBreakPrediction(breakDuration);
    setShowRating(false);
    setRatingSubmitted(true);
    setMessage("⭐ Rating submitted!");
    showTimedPopup("⭐ Rating submitted!");

    startBreak(breakDuration);
  } catch (error) {
    console.error("Rating submission error:", error);
    showTimedPopup("❌ Failed to submit rating.");
  } finally {
    setLoadingRating(false);
  }
};

export const startBreakSession = ({
  duration,
  setIsBreakTime,
  setRemainingBreak,
  setSeconds,
  setMessage,
  showTimedPopup,
  setShowStartNewButton,
  intervalRef,
}) => {
  const totalBreakSeconds = Math.ceil(duration * 60);

  setIsBreakTime(true);
  setRemainingBreak(totalBreakSeconds);
  setSeconds(0);
  setMessage(`🧘 Break Duration: ${duration.toFixed(2)} min`);
  showTimedPopup(`🧘 Break for ${duration.toFixed(2)} min`);

  intervalRef.current = setInterval(() => {
    setRemainingBreak((prev) => {
      if (prev <= 1) {
        clearInterval(intervalRef.current);
        setIsBreakTime(false);
        setMessage("✅ Break completed!");
        showTimedPopup("✅ Break done! Ready to refocus?");
        setShowStartNewButton(true);
        return 0;
      }
      return prev - 1;
    });
  }, 1000);
};
