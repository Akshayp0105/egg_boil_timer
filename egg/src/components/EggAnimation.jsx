import React from 'react';
import { motion } from 'framer-motion';
import '../styles/EggAnimation.css';

const EggAnimation = ({ isRunning, selectedLevel, timeRemaining, totalTime, isCompleted }) => {
  // Calculate boil progress (0 to 100)
  const progressPercentage = totalTime > 0 ? ((totalTime - timeRemaining) / totalTime) * 100 : 0;

  // Determine heat intensity based on progress
  const getHeatIntensity = () => {
    if (isCompleted) return 100;
    if (!isRunning) return Math.max(0, progressPercentage);
    return Math.min(100, progressPercentage + (isRunning ? 5 : 0));
  };

  const heatIntensity = getHeatIntensity();

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: 'spring', stiffness: 200, damping: 25 }
    }
  };

  return (
    <motion.div
      className="egg-animation-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="egg-and-thermometer">
        <div className={`egg-wrapper ${isRunning ? 'boiling' : ''} ${isCompleted ? 'completed' : ''}`}>
        {/* Pot container */}
        <div className="pot-container">
          {/* Water/steam visualization */}
          <motion.div
            className="water"
            style={{ height: `${Math.min(80, heatIntensity * 0.8)}%` }}
            animate={{ opacity: isRunning ? [0.6, 0.8] : 0.4 }}
            transition={{ duration: 1.5, repeat: isRunning ? Infinity : 0 }}
          >
            {isRunning && (
              <>
                <motion.div
                  className="bubble bubble-1"
                  animate={{ opacity: [0.8, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                ></motion.div>
                <motion.div
                  className="bubble bubble-2"
                  animate={{ opacity: [0, 0.8, 0] }}
                  transition={{ duration: 2.3, repeat: Infinity, delay: 0.3 }}
                ></motion.div>
                <motion.div
                  className="bubble bubble-3"
                  animate={{ opacity: [0, 0.8, 0] }}
                  transition={{ duration: 2.1, repeat: Infinity, delay: 0.6 }}
                ></motion.div>
                <motion.div
                  className="bubble bubble-4"
                  animate={{ opacity: [0.8, 0] }}
                  transition={{ duration: 2.2, repeat: Infinity, delay: 0.9 }}
                ></motion.div>
              </>
            )}
          </motion.div>

          {/* Egg - outer div stays centered via CSS; inner gets rotation so motion doesn't override translate */}
          <div className={`egg-main ${isCompleted ? 'cracked' : ''}`}>
            <motion.div
              className="egg-inner"
              animate={isRunning ? { rotate: [0, -0.6, 0.6, 0] } : {}}
              transition={{ duration: 1.2, repeat: isRunning ? Infinity : 0, ease: 'easeInOut' }}
            >
              {/* Egg white */}
              <div className="egg-white"></div>

              {/* Egg yolk with animation */}
              <motion.div
                className="egg-yolk"
              style={{
                backgroundColor: `hsl(${48 - heatIntensity * 0.2}, 100%, ${60 - heatIntensity * 0.15}%)`,
                opacity: 0.9 + heatIntensity * 0.001
              }}
              animate={
                selectedLevel === 'soft'
                  ? { scale: [1, 1.02, 1] }
                  : selectedLevel === 'medium'
                  ? { scale: [0.99, 1.01, 0.99] }
                  : { scale: [0.99, 1.005, 0.99] }
              }
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            ></motion.div>

            {/* Completion indicator */}
            {isCompleted && (
              <>
                <motion.div
                  className="crack crack-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                ></motion.div>
                <motion.div
                  className="crack crack-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                ></motion.div>
              </>
            )}
            </motion.div>
          </div>

          {/* Heat waves - wrapper ensures origin at exact center of egg */}
          {isRunning && (
            <div className="heat-wave-origin">
              <motion.div
                className="heat-wave heat-wave-1"
                animate={{ scale: [1, 1.4, 1.7], opacity: [0.5, 0.2, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
              />
              <motion.div
                className="heat-wave heat-wave-2"
                animate={{ scale: [1, 1.4, 1.7], opacity: [0.5, 0.2, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.65, ease: 'easeOut' }}
              />
              <motion.div
                className="heat-wave heat-wave-3"
                animate={{ scale: [1, 1.4, 1.7], opacity: [0.5, 0.2, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1.3, ease: 'easeOut' }}
              />
              <div className="heat-shimmer" aria-hidden="true" />
            </div>
          )}

          {/* Pot */}
          <div className="pot"></div>
          <div className="pot-handle"></div>

          {/* Heat indicator at bottom */}
          <div className="heat-indicator">
            <motion.div
              className="heat-level"
              animate={{ height: `${heatIntensity}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            ></motion.div>
          </div>
        </div>
        </div>

        {/* Thermometer bar - boiling progress */}
        <div className="thermometer-wrap">
          <div className="thermometer" title={`Boiling: ${Math.round(progressPercentage)}%`}>
            <span className="thermometer-label">Boiling</span>
            <div className="thermometer-tube">
              {[0, 25, 50, 75, 100].map((tick) => (
                <div key={tick} className="thermometer-tick" style={{ bottom: `${tick}%` }} />
              ))}
              <motion.div
                className="thermometer-fill"
                animate={{ height: `${progressPercentage}%` }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              />
            </div>
            <div className="thermometer-bulb">
              <motion.div
                className="thermometer-bulb-fill"
                animate={{ opacity: isRunning || progressPercentage > 0 ? 1 : 0.3 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Progress info */}
      <div className="progress-info">
        {selectedLevel && (
          <>
            <motion.p
              className="level-label"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {selectedLevel.label}
            </motion.p>
            <motion.p
              className="progress-bar-label"
              animate={{ opacity: isRunning ? 1 : 0.7 }}
              transition={{ duration: 0.5 }}
            >
              {isRunning ? 'Boiling...' : isCompleted ? 'Perfect!' : 'Ready to start'}
            </motion.p>
            {totalTime > 0 && (
              <motion.div className="progress-bar">
                <motion.div
                  className="progress-fill"
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                ></motion.div>
              </motion.div>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
};

export default EggAnimation;
