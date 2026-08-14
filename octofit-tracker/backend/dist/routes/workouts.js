"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Workout_1 = __importDefault(require("../models/Workout"));
const router = (0, express_1.Router)();
// Get all workouts
router.get('/', async (req, res) => {
    try {
        const workouts = await Workout_1.default.find();
        res.json(workouts);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch workouts' });
    }
});
// Get workout by ID
router.get('/:id', async (req, res) => {
    try {
        const workout = await Workout_1.default.findById(req.params.id);
        if (!workout) {
            res.status(404).json({ error: 'Workout not found' });
            return;
        }
        res.json(workout);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch workout' });
    }
});
// Get workouts by difficulty
router.get('/difficulty/:difficulty', async (req, res) => {
    try {
        const workouts = await Workout_1.default.find({
            difficulty: req.params.difficulty,
        });
        res.json(workouts);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch workouts by difficulty' });
    }
});
// Create workout
router.post('/', async (req, res) => {
    try {
        const { title, description, difficulty, duration, exercises, targetCalories } = req.body;
        if (!title || !description || !difficulty || !duration || !exercises || !targetCalories) {
            res.status(400).json({
                error: 'Title, description, difficulty, duration, exercises, and targetCalories are required',
            });
            return;
        }
        const workout = new Workout_1.default({
            title,
            description,
            difficulty,
            duration,
            exercises,
            targetCalories,
        });
        const savedWorkout = await workout.save();
        res.status(201).json(savedWorkout);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create workout' });
    }
});
// Update workout
router.put('/:id', async (req, res) => {
    try {
        const { title, description, difficulty, duration, exercises, targetCalories } = req.body;
        const workout = await Workout_1.default.findByIdAndUpdate(req.params.id, { title, description, difficulty, duration, exercises, targetCalories }, { new: true });
        if (!workout) {
            res.status(404).json({ error: 'Workout not found' });
            return;
        }
        res.json(workout);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update workout' });
    }
});
// Delete workout
router.delete('/:id', async (req, res) => {
    try {
        const workout = await Workout_1.default.findByIdAndDelete(req.params.id);
        if (!workout) {
            res.status(404).json({ error: 'Workout not found' });
            return;
        }
        res.json({ message: 'Workout deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete workout' });
    }
});
exports.default = router;
