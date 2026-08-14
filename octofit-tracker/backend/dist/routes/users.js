"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = __importDefault(require("../models/User"));
const router = (0, express_1.Router)();
// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User_1.default.find().select('-password');
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});
// Get user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User_1.default.findById(req.params.id).select('-password');
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch user' });
    }
});
// Create user
router.post('/', async (req, res) => {
    try {
        const { username, email, password, profile } = req.body;
        if (!username || !email || !password) {
            res.status(400).json({ error: 'Username, email, and password are required' });
            return;
        }
        const user = new User_1.default({
            username,
            email,
            password, // In production, hash this!
            profile,
        });
        const savedUser = await user.save();
        res.status(201).json(savedUser);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
    }
});
// Update user
router.put('/:id', async (req, res) => {
    try {
        const { username, email, profile } = req.body;
        const user = await User_1.default.findByIdAndUpdate(req.params.id, { username, email, profile }, { new: true }).select('-password');
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update user' });
    }
});
// Delete user
router.delete('/:id', async (req, res) => {
    try {
        const user = await User_1.default.findByIdAndDelete(req.params.id);
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        res.json({ message: 'User deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
});
exports.default = router;
