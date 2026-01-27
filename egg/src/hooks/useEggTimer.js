import { useState, useEffect, useRef } from 'react';
import audioAlert from '../utils/audioAlert.js';

const EGG_LEVELS = {
  soft: { time: 6 * 60, label: 'Soft Boiled', color: '#FFE5B4' },
  medium: { time: 10 * 60, label: 'Medium Boiled', color: '#FFA500' },
  hard: { time: 14 * 60, label: 'Hard Boiled', color: '#FF8C00' }
};

const API_URL = 'http://localhost:5000/api';

export const useEggTimer = () => {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const startTimeRef = useRef(null);

  // Show notification
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

  // Save session to backend
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

      // Update stats
      await fetch(`${API_URL}/stats/update`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          level: selectedLevel,
          completed
        })
      });
    } catch (error) {
      console.error('Error saving session:', error);
    }
  };

  // Timer logic with API integration
  useEffect(() => {
    let interval;

    if (isRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            audioAlert.playCompletionAlert();
            showNotification('Your egg is ready!');
            setIsCompleted(true);
            saveSession(true);
            return 0;
          }

          if (prev === 60 || prev === 30 || prev === 10) {
            audioAlert.playMilestoneAlert();
          }

          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- saveSession/showNotification are stable
  }, [isRunning, timeRemaining]);

  // Start timer with selected level
  const startTimer = (level) => {
    if (selectedLevel === level && isRunning) {
      setIsRunning(false);
      audioAlert.playPauseAlert();
      return;
    }

    if (selectedLevel !== level) {
      startTimeRef.current = new Date();
      setSelectedLevel(level);
      setTimeRemaining(EGG_LEVELS[level].time);
      setIsRunning(true);
      setIsCompleted(false);
      audioAlert.playMilestoneAlert();
    }
  };

  // Pause timer
  const pauseTimer = () => {
    setIsRunning(!isRunning);
    audioAlert.playPauseAlert();
  };

  // Reset timer
  const resetTimer = () => {
    setIsRunning(false);
    setTimeRemaining(0);
    setSelectedLevel(null);
    setIsCompleted(false);
    saveSession(false);
  };

  // Format time display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Request notification permission
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
