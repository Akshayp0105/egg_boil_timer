import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Target, History, Star } from 'lucide-react';

const API_URL = `${import.meta.env.VITE_API_URL}/api`;

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
      // Fallback data for demo if backend is not running
      setStats({
        totalTimers: 24,
        completedTimers: 18,
        favoriteLevel: 'soft',
        sessionsByLevel: { soft: 12, medium: 8, hard: 4 }
      });
      setCompletionRate(75);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading || !stats) return <div className="loading-spinner">Analyzing culinary data...</div>;

  return (
    <div className="statistics-content">
      <div className="stats-header-mini">
        <TrendingUp size={24} className="text-primary" />
        <span className="text-gradient font-bold">Performance Analytics</span>
      </div>

      <div className="stats-overview-grid">
        <div className="mini-stat-card">
          <History size={16} className="text-dim" />
          <div className="mini-stat-info">
            <span className="mini-label">Total</span>
            <span className="mini-value">{stats.totalTimers}</span>
          </div>
        </div>
        <div className="mini-stat-card">
          <Target size={16} className="text-accent" />
          <div className="mini-stat-info">
            <span className="mini-label">Success</span>
            <span className="mini-value">{completionRate}%</span>
          </div>
        </div>
      </div>

      <div className="stats-breakdown-section">
        <h4 className="breakdown-title">Consumption habits</h4>
        <div className="usage-bars">
          {Object.entries(stats.sessionsByLevel).map(([level, count], idx) => {
            const percentage = stats.totalTimers > 0 ? (count / stats.totalTimers) * 100 : 0;
            return (
              <div key={level} className="usage-item">
                <div className="usage-info">
                  <span className="capitalize">{level}</span>
                  <span>{count}</span>
                </div>
                <div className="usage-bar-track">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ delay: idx * 0.1, duration: 1 }}
                    className={`usage-bar-fill fill-${level}`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="favorite-badge">
        <Star size={16} className="text-primary" />
        <span>Preferred Style: <strong className="capitalize">{stats.favoriteLevel}</strong></span>
      </div>

      <style jsx>{`
        .statistics-content {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .stats-header-mini {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 0.5rem;
        }
        .stats-overview-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        .mini-stat-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.05);
          padding: 1rem;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .mini-stat-info {
          display: flex;
          flex-direction: column;
        }
        .mini-label {
          font-size: 0.7rem;
          color: #A0A0B0;
          text-transform: uppercase;
        }
        .mini-value {
          font-weight: 700;
          font-size: 1.1rem;
        }
        .stats-breakdown-section {
          margin-top: 1rem;
        }
        .breakdown-title {
          font-size: 0.8rem;
          color: #A0A0B0;
          margin-bottom: 1rem;
          text-transform: uppercase;
        }
        .usage-bars {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .usage-item {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .usage-info {
          display: flex;
          justify-content: space-between;
          font-size: 0.9rem;
        }
        .usage-bar-track {
          height: 6px;
          background: rgba(255,255,255,0.05);
          border-radius: 10px;
          overflow: hidden;
        }
        .usage-bar-fill {
          height: 100%;
          border-radius: 10px;
        }
        .fill-soft { background: #FFE5B4; }
        .fill-medium { background: #FFA500; }
        .fill-hard { background: #FF8C00; }
        .favorite-badge {
          background: rgba(255, 159, 28, 0.1);
          border: 1px solid rgba(255, 159, 28, 0.2);
          padding: 12px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.9rem;
          margin-top: 1rem;
        }
        .capitalize { text-transform: capitalize; }
        .text-primary { color: #FF9F1C; }
        .text-accent { color: #2EC4B6; }
        .text-dim { color: #A0A0B0; }
        .loading-spinner {
          display: flex;
          justify-content: center;
          padding: 3rem;
          color: #A0A0B0;
        }
      `}</style>
    </div>
  );
};

export default Statistics;
