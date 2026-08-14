import express from 'express';
import cors from 'cors';
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

// Build API base URL
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

// CORS Configuration
const corsOptions = {
  origin: '*',
  credentials: false,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('✓ MongoDB connected'))
  .catch((err) => console.error('✗ MongoDB connection error:', err));

// Basic health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'OctoFit Tracker API is running',
    apiBaseUrl,
    environment: codespaceName ? 'codespaces' : 'localhost',
  });
});

// API routes
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 OctoFit Tracker API Server`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${codespaceName ? 'Codespaces' : 'Localhost'}`);
  console.log(`API Base URL: ${apiBaseUrl}`);
  console.log(`\nEndpoints:`);
  console.log(`  GET  ${apiBaseUrl}/api/health`);
  console.log(`  GET  ${apiBaseUrl}/api/users`);
  console.log(`  GET  ${apiBaseUrl}/api/activities`);
  console.log(`  GET  ${apiBaseUrl}/api/teams`);
  console.log(`  GET  ${apiBaseUrl}/api/leaderboard`);
  console.log(`  GET  ${apiBaseUrl}/api/workouts`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
});
