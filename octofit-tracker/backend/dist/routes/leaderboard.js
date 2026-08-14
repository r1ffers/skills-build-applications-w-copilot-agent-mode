"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Leaderboard_1 = __importDefault(require("../models/Leaderboard"));
const router = (0, express_1.Router)();
// Get leaderboard for a team
router.get('/team/:teamId', async (req, res) => {
    try {
        const leaderboard = await Leaderboard_1.default.find({ team: req.params.teamId })
            .populate('user', 'username email profile')
            .sort({ rank: 1 });
        res.json(leaderboard);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch leaderboard' });
    }
});
// Get all leaderboard entries
router.get('/', async (req, res) => {
    try {
        const leaderboard = await Leaderboard_1.default.find()
            .populate('user', 'username email profile')
            .populate('team', 'name')
            .sort({ totalCalories: -1 });
        res.json(leaderboard);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch leaderboard' });
    }
});
// Get user leaderboard entry
router.get('/user/:userId', async (req, res) => {
    try {
        const entry = await Leaderboard_1.default.findOne({ user: req.params.userId })
            .populate('user', 'username email profile')
            .populate('team', 'name');
        if (!entry) {
            res.status(404).json({ error: 'Leaderboard entry not found' });
            return;
        }
        res.json(entry);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch leaderboard entry' });
    }
});
// Create leaderboard entry
router.post('/', async (req, res) => {
    try {
        const { user, team } = req.body;
        if (!user || !team) {
            res.status(400).json({ error: 'User and team are required' });
            return;
        }
        const entry = new Leaderboard_1.default({
            user,
            team,
            totalCalories: 0,
            totalActivities: 0,
            totalDuration: 0,
            rank: 0,
        });
        const savedEntry = await entry.save();
        await savedEntry.populate('user', 'username email profile');
        await savedEntry.populate('team', 'name');
        res.status(201).json(savedEntry);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create leaderboard entry' });
    }
});
// Update leaderboard entry
router.put('/:id', async (req, res) => {
    try {
        const { totalCalories, totalActivities, totalDuration, rank } = req.body;
        const entry = await Leaderboard_1.default.findByIdAndUpdate(req.params.id, { totalCalories, totalActivities, totalDuration, rank }, { new: true })
            .populate('user', 'username email profile')
            .populate('team', 'name');
        if (!entry) {
            res.status(404).json({ error: 'Leaderboard entry not found' });
            return;
        }
        res.json(entry);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update leaderboard entry' });
    }
});
// Delete leaderboard entry
router.delete('/:id', async (req, res) => {
    try {
        const entry = await Leaderboard_1.default.findByIdAndDelete(req.params.id);
        if (!entry) {
            res.status(404).json({ error: 'Leaderboard entry not found' });
            return;
        }
        res.json({ message: 'Leaderboard entry deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete leaderboard entry' });
    }
});
exports.default = router;
