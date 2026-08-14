import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import usersRouter from './routes/users';
import teamsRouter from './routes/teams';
import activitiesRouter from './routes/activities';
import leaderboardRouter from './routes/leaderboard';
import workoutsRouter from './routes/workouts';

console.log('[STARTUP] server.ts module loading...');

dotenv.config();

const app = express();
console.log('[STARTUP] Express app created');
const PORT = process.env.PORT || 8000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

// Build API base URL
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

console.log('[STARTUP] About to add CORS middleware');
console.log('[STARTUP] Current time:', new Date().toISOString());

// Direct CORS headers - no cors package
console.log('[STARTUP] Defining middleware function...');
const corsMiddleware = (req: any, res: any, next: any) => {
  // Try to write to a file to see if middleware is called
  try {
    const fs = require('fs');
    fs.appendFileSync('/tmp/middleware-called.txt', `${new Date().toISOString()} ${req.method} ${req.path}\n`);
  } catch (e) {
    // ignore
  }
  
  const origin = req.headers.origin;
  
  if (origin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else {
    res.setHeader('Access-Control-Allow-Origin', '*');
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, HEAD, PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Max-Age', '86400');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }
  
  next();
};

console.log('[STARTUP] Middleware function defined');
console.log('[STARTUP] Registering middleware with app.use()...');
app.use(corsMiddleware);
console.log('[STARTUP] Middleware registered');
console.log('[STARTUP] After middleware registration');

console.log('[STARTUP] CORS middleware added');
app.use(express.json());
console.log('[STARTUP] JSON middleware added');

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('✓ MongoDB connected'))
  .catch((err) => console.error('✗ MongoDB connection error:', err));

// Test route with CORS headers
app.get('/api/test-cors', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, HEAD, PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.json({ message: 'Test CORS endpoint - headers should be set', origin: req.headers.origin });
});

// Simple test route
app.get('/test', (req, res) => {
  res.json({ message: 'Simple test route' });
});

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
  console.log(`\n🚀 OctoFit Tracker API Server [BUILD: ${new Date().toISOString()}]`);
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
