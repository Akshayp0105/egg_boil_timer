import React from 'react';
import { motion } from 'framer-motion';
import { FiPlay, FiPause, FiRotateCcw } from 'react-icons/fi';
import '../styles/Controls.css';

const Controls = ({ isRunning, selectedLevel, onPause, onReset }) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: 'spring', stiffness: 300, damping: 24 }
    }
  };

  return (
    <motion.div
      className="controls-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {selectedLevel ? (
        <>
          <motion.button
            className={`control-btn pause-btn ${isRunning ? 'running' : ''}`}
            onClick={onPause}
            title={isRunning ? 'Pause Timer' : 'Resume Timer'}
            variants={buttonVariants}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="btn-icon"
              animate={isRunning ? { rotate: [0, 360] } : {}}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            >
              {isRunning ? <FiPause size={24} /> : <FiPlay size={24} />}
            </motion.div>
            <span className="btn-label">{isRunning ? 'Pause' : 'Resume'}</span>
          </motion.button>
          <motion.button
            className="control-btn reset-btn"
            onClick={onReset}
            title="Reset Timer"
            variants={buttonVariants}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="btn-icon"
              whileHover={{ rotate: -180 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <FiRotateCcw size={24} />
            </motion.div>
            <span className="btn-label">Reset</span>
          </motion.button>
        </>
      ) : (
        <motion.div
          className="no-selection-hint"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Select a boiling level to start cooking
        </motion.div>
      )}
    </motion.div>
  );
};

export default Controls;
