import React from 'react';
import { motion } from 'framer-motion';
import '../styles/TimerDisplay.css';

const TimerDisplay = ({ timeRemaining, formatTime, isRunning, isCompleted }) => {
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: 'spring', stiffness: 200, damping: 25 }
    }
  };

  return (
    <motion.div
      className={`timer-display ${isRunning ? 'running' : ''} ${isCompleted ? 'completed' : ''}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="timer-value"
        animate={isRunning ? { scale: [1, 1.02, 1] } : {}}
        transition={{ duration: 1, repeat: Infinity }}
      >
        {formatTime(timeRemaining)}
      </motion.div>
      {isCompleted && (
        <motion.div
          className="completion-message"
          initial={{ opacity: 0, scale: 0.5, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          ✓ Perfect!
        </motion.div>
      )}
    </motion.div>
  );
};

export default TimerDisplay;
