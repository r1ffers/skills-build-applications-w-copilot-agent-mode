import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import usersRouter from './routes/users';
import teamsRouter from './routes/teams';
import activitiesRouter from './routes/activities';
import leaderboardRouter from './routes/leaderboard';
import workoutsRouter from './routes/workouts';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Basic health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'OctoFit Tracker API is running' });
});

// API routes
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  const codespaceName = process.env.CODESPACE_NAME;
  if (codespaceName) {
    console.log(`Access at: https://${codespaceName}-${PORT}.app.github.dev`);
  }
});
