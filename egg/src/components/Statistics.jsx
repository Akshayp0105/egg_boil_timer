import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiTrendingUp, FiTarget, FiCheckCircle } from 'react-icons/fi';
import '../styles/Statistics.css';

const API_URL = 'http://localhost:5000/api';

const Statistics = () => {
  const [stats, setStats] = useState(null);
  const [completionRate, setCompletionRate] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const [statsRes, rateRes] = await Promise.all([
        fetch(`${API_URL}/stats`),
        fetch(`${API_URL}/stats/completion-rate`)
      ]);

      const statsData = await statsRes.json();
      const rateData = await rateRes.json();

      setStats(statsData.data);
      setCompletionRate(rateData.data.rate);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching stats:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    // setState runs in async callback, not synchronously in effect
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchStats();
  }, []);

  if (loading || !stats) return <div className="stats-loading">Loading statistics...</div>;

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <motion.div
      className="statistics-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h2 className="stats-title">Your Statistics</h2>

      <div className="stats-grid">
        <motion.div
          className="stat-card"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="stat-icon">
            <FiHistory size={32} />
          </div>
          <div className="stat-content">
            <div className="stat-label">Total Timers</div>
            <div className="stat-value">{stats.totalTimers}</div>
          </div>
        </motion.div>

        <motion.div
          className="stat-card"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="stat-icon">
            <FiTarget size={32} />
          </div>
          <div className="stat-content">
            <div className="stat-label">Completed</div>
            <div className="stat-value">{stats.completedTimers}</div>
          </div>
        </motion.div>

        <motion.div
          className="stat-card"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="stat-icon">
            <FiTrendingUp size={32} />
          </div>
          <div className="stat-content">
            <div className="stat-label">Success Rate</div>
            <div className="stat-value">{completionRate}%</div>
          </div>
        </motion.div>

        <motion.div className="stat-card">
          <div className="stat-label">Favorite Level</div>
          <div className="favorite-level">
            {stats.favoriteLevel === 'soft' && '🟡 Soft'}
            {stats.favoriteLevel === 'medium' && '🟠 Medium'}
            {stats.favoriteLevel === 'hard' && '🔴 Hard'}
          </div>
        </motion.div>
      </div>

      <div className="stats-breakdown">
        <h3>Usage by Level</h3>
        <div className="level-stats">
          <div className="level-stat">
            <span>Soft Boiled</span>
            <div className="stat-bar">
              <motion.div
                className="stat-bar-fill soft"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, (stats.sessionsByLevel.soft / Math.max(1, stats.totalTimers)) * 100)}%` }}
                transition={{ duration: 0.8 }}
              />
            </div>
            <span className="stat-number">{stats.sessionsByLevel.soft}</span>
          </div>

          <div className="level-stat">
            <span>Medium Boiled</span>
            <div className="stat-bar">
              <motion.div
                className="stat-bar-fill medium"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, (stats.sessionsByLevel.medium / Math.max(1, stats.totalTimers)) * 100)}%` }}
                transition={{ duration: 0.8, delay: 0.1 }}
              />
            </div>
            <span className="stat-number">{stats.sessionsByLevel.medium}</span>
          </div>

          <div className="level-stat">
            <span>Hard Boiled</span>
            <div className="stat-bar">
              <motion.div
                className="stat-bar-fill hard"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, (stats.sessionsByLevel.hard / Math.max(1, stats.totalTimers)) * 100)}%` }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
            </div>
            <span className="stat-number">{stats.sessionsByLevel.hard}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Statistics;
