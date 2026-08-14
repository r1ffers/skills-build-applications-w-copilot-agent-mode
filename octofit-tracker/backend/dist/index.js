"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const users_1 = __importDefault(require("./routes/users"));
const teams_1 = __importDefault(require("./routes/teams"));
const activities_1 = __importDefault(require("./routes/activities"));
const leaderboard_1 = __importDefault(require("./routes/leaderboard"));
const workouts_1 = __importDefault(require("./routes/workouts"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
// Build API base URL
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
// Middleware
app.use(express_1.default.json());
// Connect to MongoDB
mongoose_1.default
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
app.use('/api/users', users_1.default);
app.use('/api/teams', teams_1.default);
app.use('/api/activities', activities_1.default);
app.use('/api/leaderboard', leaderboard_1.default);
app.use('/api/workouts', workouts_1.default);
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
