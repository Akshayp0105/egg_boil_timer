import express from 'express';

const router = express.Router();

// In-memory storage for demo (replace with database in production)
let timerHistory = [];
let favoriteRecipes = [
  { id: 1, name: 'Soft Boiled', time: 360, description: 'Runny yolk, soft white' },
  { id: 2, name: 'Medium Boiled', time: 600, description: 'Creamy yolk, firm white' },
  { id: 3, name: 'Hard Boiled', time: 840, description: 'Fully cooked throughout' }
];

// Get all timer sessions
router.get('/history', (req, res) => {
  res.json({ success: true, data: timerHistory });
});

// Save timer session
router.post('/save-session', (req, res) => {
  const { level, duration, completed, startTime } = req.body;

  const session = {
    id: timerHistory.length + 1,
    level,
    duration,
    completed,
    startTime,
    endTime: new Date(),
    timestamp: new Date()
  };

  timerHistory.push(session);

  res.json({ 
    success: true, 
    message: 'Session saved successfully',
    data: session 
  });
});

// Clear history
router.delete('/history', (req, res) => {
  timerHistory = [];
  res.json({ success: true, message: 'History cleared' });
});

// Get recent sessions
router.get('/recent', (req, res) => {
  const recent = timerHistory.slice(-5).reverse();
  res.json({ success: true, data: recent });
});

export default router;
