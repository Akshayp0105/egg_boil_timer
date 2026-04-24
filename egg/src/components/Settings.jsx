import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Bell, Palette, Info, X } from 'lucide-react';
import audioAlert from '../utils/audioAlert.js';

function Settings({ isOpen, onClose }) {
  const [volumeLevel, setVolumeLevel] = useState(() => {
    try {
      const s = localStorage.getItem('eggTimerSettings');
      return s ? (JSON.parse(s).volumeLevel ?? 70) : 70;
    } catch { return 70; }
  });
  
  const [notificationsEnabled, setNotificationsEnabled] = useState(() => {
    try {
      const s = localStorage.getItem('eggTimerSettings');
      return s ? (JSON.parse(s).notificationsEnabled !== false) : true;
    } catch { return true; }
  });

  const saveSettings = () => {
    const settings = { volumeLevel, notificationsEnabled };
    localStorage.setItem('eggTimerSettings', JSON.stringify(settings));
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseInt(e.target.value);
    setVolumeLevel(newVolume);
    audioAlert.setVolume(newVolume / 100);
  };

  const testSound = () => {
    audioAlert.playMilestoneAlert();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="settings-backdrop"
            onClick={onClose}
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="settings-modal-premium glass-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div className="header-title">
                <Palette size={20} className="text-primary" />
                <h2>System Preferences</h2>
              </div>
              <button onClick={onClose} className="close-btn-round"><X size={18} /></button>
            </div>

            <div className="modal-body">
              <section className="setting-group">
                <div className="group-label">
                  <Volume2 size={16} />
                  <span>Audio Control</span>
                </div>
                <div className="volume-slider-container">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volumeLevel}
                    onChange={handleVolumeChange}
                    className="premium-slider"
                  />
                  <span className="volume-percentage">{volumeLevel}%</span>
                </div>
                <button onClick={testSound} className="secondary-button test-btn-mini">
                  Test Acoustics
                </button>
              </section>

              <section className="setting-group">
                <div className="group-label">
                  <Bell size={16} />
                  <span>Notifications</span>
                </div>
                <div className="toggle-row">
                  <span className="toggle-label">Push Alerts</span>
                  <button 
                    className={`premium-toggle ${notificationsEnabled ? 'active' : ''}`}
                    onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                  >
                    <div className="toggle-thumb" />
                  </button>
                </div>
              </section>

              <section className="setting-group about-group">
                <div className="group-label">
                  <Info size={16} />
                  <span>Information</span>
                </div>
                <div className="info-content">
                  <p>OVUM PRO v2.1.4</p>
                  <p className="text-dim">High-precision induction timing engine</p>
                </div>
              </section>
            </div>

            <div className="modal-footer">
              <button 
                className="primary-button save-btn-premium" 
                onClick={() => { saveSettings(); onClose(); }}
              >
                Apply Changes
              </button>
            </div>
          </motion.div>
        </>
      )}

      <style jsx>{`
        .settings-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0,0,0,0.6);
          backdrop-filter: blur(4px);
          z-index: 1000;
        }
        .settings-modal-premium {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 90%;
          max-width: 450px;
          z-index: 1001;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .header-title {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .header-title h2 {
          font-size: 1.25rem;
          font-weight: 700;
        }
        .close-btn-round {
          background: rgba(255,255,255,0.05);
          border: none;
          color: white;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: var(--transition);
        }
        .close-btn-round:hover {
          background: rgba(255,255,255,0.1);
        }
        .setting-group {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        .group-label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.8rem;
          color: #A0A0B0;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .volume-slider-container {
          display: flex;
          align-items: center;
          gap: 15px;
        }
        .premium-slider {
          flex: 1;
          accent-color: var(--primary);
          height: 4px;
          background: rgba(255,255,255,0.1);
          border-radius: 2px;
          outline: none;
        }
        .volume-percentage {
          font-family: var(--font-display);
          font-weight: 600;
          width: 40px;
        }
        .test-btn-mini {
          padding: 8px 16px;
          font-size: 0.8rem;
          align-self: flex-start;
        }
        .toggle-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: rgba(255,255,255,0.02);
          padding: 12px 16px;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.05);
        }
        .premium-toggle {
          width: 44px;
          height: 24px;
          background: rgba(255,255,255,0.1);
          border-radius: 100px;
          border: none;
          position: relative;
          cursor: pointer;
          transition: var(--transition);
        }
        .premium-toggle.active {
          background: var(--primary);
        }
        .toggle-thumb {
          position: absolute;
          top: 3px;
          left: 3px;
          width: 18px;
          height: 18px;
          background: white;
          border-radius: 50%;
          transition: var(--transition);
        }
        .premium-toggle.active .toggle-thumb {
          transform: translateX(20px);
        }
        .info-content {
          font-size: 0.9rem;
        }
        .save-btn-premium {
          width: 100%;
          height: 48px;
        }
      `}</style>
    </AnimatePresence>
  );
}

export default Settings;
