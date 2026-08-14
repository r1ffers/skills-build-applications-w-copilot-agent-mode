"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
// Middleware
app.use(express_1.default.json());
// Connect to MongoDB
mongoose_1.default
    .connect(MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));
// Basic health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'OctoFit Tracker API is running' });
});
// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    const codespaceName = process.env.CODESPACE_NAME;
    if (codespaceName) {
        console.log(`Access at: https://${codespaceName}-${PORT}.app.github.dev`);
    }
});
