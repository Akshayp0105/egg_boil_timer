import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiVolumeX, FiVolume2, FiSettings } from 'react-icons/fi';
import audioAlert from '../utils/audioAlert.js';
import '../styles/Settings.css';

function Settings({ isOpen, onClose, currentTheme, onThemeChange }) {
  const [volumeLevel, setVolumeLevel] = useState(() => {
    try {
      const s = localStorage.getItem('eggTimerSettings');
      return s ? (JSON.parse(s).volumeLevel ?? 70) : 70;
    } catch {
      return 70;
    }
  });
  const [notificationsEnabled, setNotificationsEnabled] = useState(() => {
    try {
      const s = localStorage.getItem('eggTimerSettings');
      return s ? (JSON.parse(s).notificationsEnabled !== false) : true;
    } catch {
      return true;
    }
  });
  const [soundsEnabled, setSoundsEnabled] = useState(() => {
    try {
      const s = localStorage.getItem('eggTimerSettings');
      return s ? (JSON.parse(s).soundsEnabled !== false) : true;
    } catch {
      return true;
    }
  });
  const [theme, setTheme] = useState(() => {
    try {
      const s = localStorage.getItem('eggTimerSettings');
      return s ? (JSON.parse(s).theme || 'orange') : 'orange';
    } catch {
      return 'orange';
    }
  });

  // Sync theme when parent currentTheme changes (e.g. theme picker in Settings)
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing theme from parent
    if (currentTheme) setTheme(currentTheme);
  }, [currentTheme]);

  // Save settings to localStorage
  const saveSettings = () => {
    const settings = {
      volumeLevel,
      notificationsEnabled,
      soundsEnabled,
      theme
    };
    localStorage.setItem('eggTimerSettings', JSON.stringify(settings));
  };

  // Handle theme change
  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    if (onThemeChange) {
      onThemeChange(newTheme);
    }
  };

  // Update audio volume
  const handleVolumeChange = (e) => {
    const newVolume = parseInt(e.target.value);
    setVolumeLevel(newVolume);
    audioAlert.setVolume(newVolume / 100);
  };

  // Toggle sounds
  const toggleSounds = () => {
    setSoundsEnabled(!soundsEnabled);
    audioAlert.setVolume(soundsEnabled ? 0 : volumeLevel / 100);
  };

  // Test sound
  const testSound = () => {
    if (soundsEnabled) {
      audioAlert.playMilestoneAlert();
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 300, damping: 30 }
    }
  };

  return (
    <motion.div
      className={`settings-overlay ${isOpen ? 'open' : ''}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isOpen ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
      style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
    >
      <motion.div
        className="settings-modal"
        variants={containerVariants}
        initial="hidden"
        animate={isOpen ? 'visible' : 'hidden'}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="settings-header">
          <h2 className="settings-title">
            <FiSettings size={20} className="settings-title-icon" />
            Settings
          </h2>
          <button type="button" className="settings-close" onClick={onClose} aria-label="Close">×</button>
        </div>

        <div className="settings-content">
          {/* Audio Settings */}
          <div className="settings-section">
            <h3 className="section-title">Audio</h3>

            <div className="setting-row">
              <label className="setting-label">Sounds</label>
              <button
                type="button"
                role="switch"
                aria-checked={soundsEnabled}
                className={`settings-switch ${soundsEnabled ? 'on' : ''}`}
                onClick={toggleSounds}
              >
                <span className="settings-switch-track" />
              </button>
            </div>

            <div className="setting-row">
              <label className="setting-label">Volume</label>
              <div className="volume-control">
                <FiVolumeX size={14} className="volume-icon volume-icon-muted" aria-hidden />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volumeLevel}
                  onChange={handleVolumeChange}
                  disabled={!soundsEnabled}
                  className="volume-slider"
                  aria-label="Volume level"
                />
                <FiVolume2 size={14} className="volume-icon" aria-hidden />
                <span className="volume-value" aria-live="polite">{volumeLevel}%</span>
              </div>
            </div>

            <button
              type="button"
              className="test-btn"
              onClick={testSound}
              disabled={!soundsEnabled}
            >
              Test sound
            </button>
          </div>

          {/* Notifications */}
          <div className="settings-section">
            <h3 className="section-title">Notifications</h3>

            <div className="setting-row">
              <label className="setting-label">Browser notifications</label>
              <button
                type="button"
                role="switch"
                aria-checked={notificationsEnabled}
                className={`settings-switch ${notificationsEnabled ? 'on' : ''}`}
                onClick={() => setNotificationsEnabled(!notificationsEnabled)}
              >
                <span className="settings-switch-track" />
              </button>
            </div>

            <p className="setting-hint">
              Alert when timer finishes, even if the app is in the background.
            </p>
          </div>

          {/* Theme */}
          <div className="settings-section">
            <h3 className="section-title">Theme</h3>

            <div className="theme-options">
              {['orange', 'purple', 'pink', 'blue'].map((themeColor) => (
                <button
                  key={themeColor}
                  type="button"
                  className={`theme-btn ${theme === themeColor ? 'active' : ''}`}
                  style={{
                    backgroundColor:
                      themeColor === 'orange' ? '#FF8C42' :
                      themeColor === 'purple' ? '#9D4EDD' :
                      themeColor === 'pink' ? '#FF006E' :
                      '#00B4D8'
                  }}
                  onClick={() => handleThemeChange(themeColor)}
                  title={themeColor.charAt(0).toUpperCase() + themeColor.slice(1)}
                >
                  {theme === themeColor && <span className="theme-check">✓</span>}
                </button>
              ))}
            </div>
          </div>

          {/* About */}
          <div className="settings-section info-section">
            <h3 className="section-title">About</h3>
            <p className="info-version">Egg Timer v1.0</p>
            <p className="info-desc">Timer with notifications and audio alerts.</p>
          </div>
        </div>

        <div className="settings-footer">
          <button
            type="button"
            className="save-btn"
            onClick={() => {
              saveSettings();
              onClose();
            }}
          >
            Save & close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Settings;
