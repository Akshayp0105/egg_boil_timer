import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, 
  Settings as SettingsIcon, 
  BarChart3, 
  Play, 
  Pause, 
  RotateCcw, 
  Rocket,
  Bell,
  CheckCircle2,
  Trophy,
  AlertTriangle
} from 'lucide-react';
import { useEggTimer } from './hooks/useEggTimer';
import Scene3D from './components/Scene3D';
import Statistics from './components/Statistics';
import Settings from './components/Settings';
import SteamParticles from './components/SteamParticles';
import './App.css';

function App() {
  const {
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
  } = useEggTimer();

  const [showStats, setShowStats] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  
  const progress = selectedLevel 
    ? ((EGG_LEVELS[selectedLevel].time - timeRemaining) / EGG_LEVELS[selectedLevel].time) * 100 
    : 0;

  useEffect(() => {
    requestNotificationPermission();
  }, [requestNotificationPermission]);

  // Funnier Labels Mapping
  const funLabels = {
    soft: { title: "THE GOOEY ONE", desc: "Liquid gold inside" },
    medium: { title: "THE BALANCED", desc: "Best of both worlds" },
    hard: { title: "ROCK SOLID", desc: "Industrial strength" }
  };

  return (
    <div className="app-container cyber-theme">
      {/* Background FX */}
      <div className="bg-scanline"></div>
      <div className="bg-glow"></div>
      
      {/* Navigation */}
      <nav className="nav-bar glass-card cyber-border">
        <div className="nav-logo">
          <Zap className="logo-icon pulse-glow" />
          <span className="logo-text">YOLKTRON<span className="logo-sub">3000</span></span>
        </div>
        <div className="nav-actions">
          <motion.button 
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowStats(!showStats)} 
            className="nav-btn"
          >
            <BarChart3 size={20} />
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.1, rotate: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowSettings(true)} 
            className="nav-btn"
          >
            <SettingsIcon size={20} />
          </motion.button>
        </div>
      </nav>

      <main className="main-content">
        <div className="content-grid">
          {/* 3D Visualizer Section */}
          <section className="visualizer-section">
            <div className="visualizer-container">
              <SteamParticles isRunning={isRunning} />
              <Scene3D 
                isRunning={isRunning} 
                progress={progress} 
                level={selectedLevel} 
              />
              
              <AnimatePresence>
                {isCompleted && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.5, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="completion-badge-mega"
                  >
                    <Trophy className="completion-icon bounce" />
                    <div className="completion-text">
                      <span className="mega-title">MISSION COMPLETE</span>
                      <span className="mega-sub">Target acquired & boiled</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <div className="timer-display-premium cyber-panel">
              <span className="timer-label-cyber">
                {selectedLevel ? funLabels[selectedLevel].title : 'AWAITING INPUT...'}
              </span>
              <h2 className="timer-value glitch-text" data-text={formatTime(timeRemaining)}>
                {formatTime(timeRemaining)}
              </h2>
              <div className="progress-track-cyber">
                <motion.div 
                  className="progress-bar-neon"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </section>

          {/* Controls & Selection Section */}
          <section className="controls-section glass-card cyber-border">
            <div className="section-header-cyber">
              <Rocket size={18} className="text-primary" />
              <h3 className="section-title">SELECT INTENSITY</h3>
            </div>
            
            <div className="level-grid">
              {Object.entries(EGG_LEVELS).map(([key, level]) => (
                <button
                  key={key}
                  onClick={() => startTimer(key)}
                  className={`level-card-cyber ${selectedLevel === key ? 'active' : ''}`}
                >
                  <div className="level-info">
                    <span className="level-name-cyber">{funLabels[key].title}</span>
                    <span className="level-desc-cyber">{funLabels[key].desc}</span>
                  </div>
                  <div className="level-meta-cyber">
                    <span className="level-time-cyber">{level.time / 60}m</span>
                    <div className="level-dot" style={{ background: level.color }}></div>
                  </div>
                </button>
              ))}
            </div>

            <div className="action-buttons">
              {!isRunning && timeRemaining === 0 ? (
                <button 
                  className="primary-button cyber-btn-main" 
                  disabled={!selectedLevel}
                  onClick={() => selectedLevel && startTimer(selectedLevel)}
                >
                  <Play size={22} fill="currentColor" />
                  INITIATE BOIL SEQUENCE
                </button>
              ) : (
                <div className="active-controls">
                  <button className="control-btn pause-btn-cyber" onClick={pauseTimer}>
                    {isRunning ? <Pause size={20} /> : <Play size={20} />}
                    {isRunning ? 'HALT' : 'RESUME'}
                  </button>
                  <button className="control-btn reset-btn-cyber" onClick={resetTimer}>
                    <RotateCcw size={20} />
                    ABORT
                  </button>
                </div>
              )}
            </div>

            <div className="status-terminal">
              <div className="terminal-line">
                <span className="prompt">{'>'}</span>
                <span className="text">
                  {isRunning ? 'THERMAL ACTIVITY DETECTED' : 'SYSTEM IDLE'}
                </span>
              </div>
              <div className="terminal-line">
                <span className="prompt">{'>'}</span>
                <span className="text">
                  {selectedLevel ? `CALIBRATED FOR: ${selectedLevel.toUpperCase()}` : 'WAITING FOR COMMAND'}
                </span>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Overlays */}
      <AnimatePresence>
        {showStats && (
          <motion.div 
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            className="sidebar-overlay-cyber glass-card"
          >
            <div className="sidebar-header">
              <h3>DATABASE ACCESS</h3>
              <button onClick={() => setShowStats(false)} className="close-btn-cyber">_</button>
            </div>
            <Statistics />
          </motion.div>
        )}
      </AnimatePresence>

      <Settings 
        isOpen={showSettings} 
        onClose={() => setShowSettings(false)} 
      />

      <footer className="app-footer-cyber">
        <div className="footer-line"></div>
        <p>TERMINAL ID: Y-3000-EGG • NO CHICKENS WERE HARMED</p>
      </footer>
    </div>
  );
}

export default App;
