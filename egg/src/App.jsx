import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MdEgg } from 'react-icons/md';
import { FiBarChart2, FiSettings } from 'react-icons/fi';
import { useEggTimer } from './hooks/useEggTimer';
import EggAnimation from './components/EggAnimation';
import TimerDisplay from './components/TimerDisplay';
import LevelSelector from './components/LevelSelector';
import Controls from './components/Controls';
import Statistics from './components/Statistics';
import Settings from './components/Settings';
import './App.css';

const THEMES = {
  orange: {
    primary: '#FF8C42',
    secondary: '#FF6B35',
    accent: '#F7931E',
    light: '#FFA500',
    gradient: 'linear-gradient(135deg, #ff8c42 0%, #ff6b35 25%, #f7931e 50%, #ffa500 75%, #ff8c42 100%)'
  },
  purple: {
    primary: '#9D4EDD',
    secondary: '#7209B7',
    accent: '#B5179E',
    light: '#C77DFF',
    gradient: 'linear-gradient(135deg, #9D4EDD 0%, #7209B7 25%, #B5179E 50%, #C77DFF 75%, #9D4EDD 100%)'
  },
  blue: {
    primary: '#00B4D8',
    secondary: '#0077B6',
    accent: '#0096C7',
    light: '#00D9FF',
    gradient: 'linear-gradient(135deg, #00B4D8 0%, #0077B6 25%, #0096C7 50%, #00D9FF 75%, #00B4D8 100%)'
  },
  pink: {
    primary: '#FF006E',
    secondary: '#D60061',
    accent: '#FB5607',
    light: '#FF4DCA',
    gradient: 'linear-gradient(135deg, #FF006E 0%, #D60061 25%, #FB5607 50%, #FF4DCA 75%, #FF006E 100%)'
  }
};

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
  const [currentTheme, setCurrentTheme] = useState(() => localStorage.getItem('eggTimerTheme') || 'orange');

  // Apply theme to document
  const applyTheme = (theme) => {
    const themeColors = THEMES[theme];
    document.documentElement.style.setProperty('--theme-primary', themeColors.primary);
    document.documentElement.style.setProperty('--theme-secondary', themeColors.secondary);
    document.documentElement.style.setProperty('--theme-accent', themeColors.accent);
    document.documentElement.style.setProperty('--theme-light', themeColors.light);
    document.documentElement.style.setProperty('--theme-gradient', themeColors.gradient);
    localStorage.setItem('eggTimerTheme', theme);
  };

  // Apply theme on mount and when theme changes
  useEffect(() => {
    applyTheme(currentTheme);
  }, [currentTheme]);

  const handleThemeChange = (theme) => {
    setCurrentTheme(theme);
    applyTheme(theme);
  };

  // Request notification permission on mount
  useEffect(() => {
    requestNotificationPermission();
  }, [requestNotificationPermission]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 200, damping: 25 }
    }
  };

  return (
    <div className="app-wrapper">
      <motion.div 
        className="app-container" 
        variants={containerVariants} 
        initial="hidden" 
        animate="visible"
      >
        <motion.header className="app-header" variants={itemVariants}>
          <motion.div className="header-top">
            <motion.div
              className="header-icon"
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            >
              <MdEgg size={60} />
            </motion.div>
            <motion.button
              className="stats-toggle"
              onClick={() => setShowStats(!showStats)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              title="View Statistics"
            >
              <FiBarChart2 size={24} />
            </motion.button>
            <motion.button
              className="settings-toggle"
              onClick={() => setShowSettings(true)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              title="Settings"
            >
              <FiSettings size={24} />
            </motion.button>
          </motion.div>
          <h1 className="app-title">Egg Boiling Timer</h1>
          <p className="app-subtitle">Perfect boiled eggs every time</p>
        </motion.header>

        {showStats && (
          <motion.div
            className="stats-container"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Statistics />
          </motion.div>
        )}

        <Settings isOpen={showSettings} onClose={() => setShowSettings(false)} currentTheme={currentTheme} onThemeChange={handleThemeChange} />

        <motion.main className="app-main" variants={itemVariants}>
          <TimerDisplay
            timeRemaining={timeRemaining}
            formatTime={formatTime}
            isRunning={isRunning}
            isCompleted={isCompleted}
          />

          <EggAnimation
            isRunning={isRunning}
            selectedLevel={selectedLevel}
            timeRemaining={timeRemaining}
            totalTime={selectedLevel ? EGG_LEVELS[selectedLevel].time : 0}
            isCompleted={isCompleted}
          />

          <LevelSelector
            levels={EGG_LEVELS}
            selectedLevel={selectedLevel}
            onSelectLevel={startTimer}
            isRunning={isRunning}
            timeRemaining={timeRemaining}
          />

          <Controls
            isRunning={isRunning}
            selectedLevel={selectedLevel}
            onPause={pauseTimer}
            onReset={resetTimer}
            onStart={startTimer}
            levels={EGG_LEVELS}
          />
        </motion.main>

        <motion.footer className="app-footer" variants={itemVariants}>
          <p className="footer-text">
            ✨ Choose your preferred boiling level and start cooking!
          </p>
        </motion.footer>
      </motion.div>
    </div>
  );
}

export default App;
