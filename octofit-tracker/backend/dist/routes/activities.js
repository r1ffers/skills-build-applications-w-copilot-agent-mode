"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Activity_1 = __importDefault(require("../models/Activity"));
const router = (0, express_1.Router)();
// Get all activities
router.get('/', async (req, res) => {
    try {
        const activities = await Activity_1.default.find()
            .populate('user', 'username email')
            .sort({ date: -1 });
        res.json(activities);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch activities' });
    }
});
// Get activities by user
router.get('/user/:userId', async (req, res) => {
    try {
        const activities = await Activity_1.default.find({ user: req.params.userId })
            .populate('user', 'username email')
            .sort({ date: -1 });
        res.json(activities);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch user activities' });
    }
});
// Get activity by ID
router.get('/:id', async (req, res) => {
    try {
        const activity = await Activity_1.default.findById(req.params.id).populate('user', 'username email');
        if (!activity) {
            res.status(404).json({ error: 'Activity not found' });
            return;
        }
        res.json(activity);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch activity' });
    }
});
// Create activity
router.post('/', async (req, res) => {
    try {
        const { user, type, duration, calories, distance, description, date } = req.body;
        if (!user || !type || !duration || calories === undefined) {
            res
                .status(400)
                .json({
                error: 'User, type, duration, and calories are required',
            });
            return;
        }
        const activity = new Activity_1.default({
            user,
            type,
            duration,
            calories,
            distance,
            description,
            date: date || new Date(),
        });
        const savedActivity = await activity.save();
        await savedActivity.populate('user', 'username email');
        res.status(201).json(savedActivity);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create activity' });
    }
});
// Update activity
router.put('/:id', async (req, res) => {
    try {
        const { type, duration, calories, distance, description, date } = req.body;
        const activity = await Activity_1.default.findByIdAndUpdate(req.params.id, { type, duration, calories, distance, description, date }, { new: true }).populate('user', 'username email');
        if (!activity) {
            res.status(404).json({ error: 'Activity not found' });
            return;
        }
        res.json(activity);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update activity' });
    }
});
// Delete activity
router.delete('/:id', async (req, res) => {
    try {
        const activity = await Activity_1.default.findByIdAndDelete(req.params.id);
        if (!activity) {
            res.status(404).json({ error: 'Activity not found' });
            return;
        }
        res.json({ message: 'Activity deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete activity' });
    }
});
exports.default = router;
