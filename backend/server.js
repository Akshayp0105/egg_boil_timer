import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import timerRoutes from './routes/timer.js';
import recipeRoutes from './routes/recipes.js';
import statsRoutes from './routes/stats.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/timer', timerRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/stats', statsRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Egg Timer Backend is running!' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!', message: err.message });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🥚 Egg Timer Backend running on port ${PORT}`);
});
