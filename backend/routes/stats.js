import express from 'express';

const router = express.Router();

// In-memory stats storage
let stats = {
  totalTimers: 0,
  completedTimers: 0,
  averageTime: 0,
  favoriteLevel: 'medium',
  sessionsByLevel: {
    soft: 0,
    medium: 0,
    hard: 0
  }
};

// Get statistics
router.get('/', (req, res) => {
  res.json({ success: true, data: stats });
});

// Update statistics
router.post('/update', (req, res) => {
  const { level, completed } = req.body;

  stats.totalTimers++;
  if (completed) stats.completedTimers++;
  
  if (level === 'soft' || level === 'medium' || level === 'hard') {
    stats.sessionsByLevel[level]++;
  }

  const maxLevel = Object.keys(stats.sessionsByLevel).reduce((a, b) =>
    stats.sessionsByLevel[a] > stats.sessionsByLevel[b] ? a : b
  );
  stats.favoriteLevel = maxLevel;

  res.json({ 
    success: true, 
    message: 'Stats updated',
    data: stats 
  });
});

// Reset statistics
router.post('/reset', (req, res) => {
  stats = {
    totalTimers: 0,
    completedTimers: 0,
    averageTime: 0,
    favoriteLevel: 'medium',
    sessionsByLevel: {
      soft: 0,
      medium: 0,
      hard: 0
    }
  };

  res.json({ success: true, message: 'Stats reset', data: stats });
});

// Get completion rate
router.get('/completion-rate', (req, res) => {
  const rate = stats.totalTimers > 0 
    ? Math.round((stats.completedTimers / stats.totalTimers) * 100) 
    : 0;

  res.json({ 
    success: true, 
    data: {
      total: stats.totalTimers,
      completed: stats.completedTimers,
      rate: rate
    }
  });
});

export default router;
