import { useState, useEffect, useRef } from 'react';
import audioAlert from '../utils/audioAlert.js';

const EGG_LEVELS = {
  soft: { time: 6 * 60, label: 'Soft Boiled', color: '#FFE5B4' },
  medium: { time: 10 * 60, label: 'Medium Boiled', color: '#FFA500' },
  hard: { time: 14 * 60, label: 'Hard Boiled', color: '#FF8C00' }
};

/* ✅ UPDATED: backend URL (Render) */
const API_URL = `${import.meta.env.VITE_API_URL}/api`;

export const useEggTimer = () => {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const startTimeRef = useRef(null);

  /* 🔔 Notification */
  const showNotification = (message) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Egg Timer', {
        body: message,
        icon: '🥚',
        tag: 'egg-timer',
        requireInteraction: true
      });
    }
  };

  /* 💾 Save session to backend */
  const saveSession = async (completed) => {
    try {
      const duration = selectedLevel ? EGG_LEVELS[selectedLevel].time : 0;

      await fetch(`${API_URL}/timer/save-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          level: selectedLevel,
          duration,
          completed,
          startTime: startTimeRef.current
        })
      });

      await fetch(`${API_URL}/stats/update`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          level: selectedLevel,
          completed
        })
      });
    } catch (err) {
      console.error('Save session failed:', err);
    }
  };

  /* ⏱ Timer logic */
  useEffect(() => {
    let interval;

    if (isRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            setIsCompleted(true);
            audioAlert.playCompletionAlert();
            showNotification('Your egg is ready!');
            saveSession(true);
            return 0;
          }

          if ([60, 30, 10].includes(prev)) {
            audioAlert.playMilestoneAlert();
          }

          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeRemaining]);

  /* ▶ Start timer */
  const startTimer = (level) => {
    if (selectedLevel === level && isRunning) {
      setIsRunning(false);
      audioAlert.playPauseAlert();
      return;
    }

    startTimeRef.current = new Date();
    setSelectedLevel(level);
    setTimeRemaining(EGG_LEVELS[level].time);
    setIsRunning(true);
    setIsCompleted(false);
    audioAlert.playMilestoneAlert();
  };

  /* ⏸ Pause */
  const pauseTimer = () => {
    setIsRunning((prev) => !prev);
    audioAlert.playPauseAlert();
  };

  /* 🔁 Reset */
  const resetTimer = () => {
    setIsRunning(false);
    setTimeRemaining(0);
    setSelectedLevel(null);
    setIsCompleted(false);
    saveSession(false);
  };

  /* ⏳ Format time */
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  /* 🔔 Permission */
  const requestNotificationPermission = () => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  };

  return {
    selectedLevel,
    timeRemaining,
    isRunning,
    isCompleted,
    startTimer,
    pauseTimer,
    resetTimer,
    formatTime,
    requestNotificationPermission,
    EGG_LEVELS
  };
};
