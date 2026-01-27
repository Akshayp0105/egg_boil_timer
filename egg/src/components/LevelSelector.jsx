import React from 'react';
import { motion } from 'framer-motion';
import { MdEgg } from 'react-icons/md';
import '../styles/LevelSelector.css';

const LevelSelector = ({ levels, selectedLevel, onSelectLevel, isRunning }) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: 'spring', stiffness: 300, damping: 24 }
    }
  };

  return (
    <motion.div
      className="level-selector"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h2 className="selector-title">Choose Your Boil Level</h2>
      <motion.div className="levels-grid">
        {Object.entries(levels).map(([key, level]) => (
          <motion.button
            key={key}
            className={`level-btn ${selectedLevel === key ? 'active' : ''} ${
              isRunning && selectedLevel !== key ? 'disabled' : ''
            }`}
            onClick={() => onSelectLevel(key)}
            disabled={isRunning && selectedLevel !== key}
            title={`${level.label} - ${Math.floor(level.time / 60)} minutes`}
            variants={itemVariants}
            whileHover={selectedLevel !== key && !isRunning ? { scale: 1.05 } : {}}
            whileTap={selectedLevel !== key && !isRunning ? { scale: 0.98 } : {}}
          >
            <motion.div
              className="level-content"
              animate={selectedLevel === key ? { rotate: [0, 5, -5, 0] } : {}}
              transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 2 }}
            >
              <motion.div
                className="level-icon"
                animate={selectedLevel === key ? { y: [0, -8, 0] } : {}}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <MdEgg size={40} />
              </motion.div>
              <div className="level-text">
                <div className="level-name">{level.label}</div>
                <div className="level-time">{Math.floor(level.time / 60)}m {level.time % 60}s</div>
              </div>
            </motion.div>
          </motion.button>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default LevelSelector;
