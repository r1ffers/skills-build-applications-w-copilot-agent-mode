"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Team_1 = __importDefault(require("../models/Team"));
const router = (0, express_1.Router)();
// Get all teams
router.get('/', async (req, res) => {
    try {
        const teams = await Team_1.default.find()
            .populate('leader', 'username email')
            .populate('members', 'username email');
        res.json(teams);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch teams' });
    }
});
// Get team by ID
router.get('/:id', async (req, res) => {
    try {
        const team = await Team_1.default.findById(req.params.id)
            .populate('leader', 'username email')
            .populate('members', 'username email');
        if (!team) {
            res.status(404).json({ error: 'Team not found' });
            return;
        }
        res.json(team);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch team' });
    }
});
// Create team
router.post('/', async (req, res) => {
    try {
        const { name, description, leader } = req.body;
        if (!name || !leader) {
            res.status(400).json({ error: 'Team name and leader are required' });
            return;
        }
        const team = new Team_1.default({
            name,
            description,
            leader,
            members: [leader],
        });
        const savedTeam = await team.save();
        await savedTeam.populate('leader', 'username email');
        await savedTeam.populate('members', 'username email');
        res.status(201).json(savedTeam);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create team' });
    }
});
// Update team
router.put('/:id', async (req, res) => {
    try {
        const { name, description } = req.body;
        const team = await Team_1.default.findByIdAndUpdate(req.params.id, { name, description }, { new: true })
            .populate('leader', 'username email')
            .populate('members', 'username email');
        if (!team) {
            res.status(404).json({ error: 'Team not found' });
            return;
        }
        res.json(team);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update team' });
    }
});
// Add member to team
router.post('/:id/members', async (req, res) => {
    try {
        const { memberId } = req.body;
        if (!memberId) {
            res.status(400).json({ error: 'Member ID is required' });
            return;
        }
        const team = await Team_1.default.findByIdAndUpdate(req.params.id, { $addToSet: { members: memberId } }, { new: true })
            .populate('leader', 'username email')
            .populate('members', 'username email');
        if (!team) {
            res.status(404).json({ error: 'Team not found' });
            return;
        }
        res.json(team);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to add member to team' });
    }
});
// Delete team
router.delete('/:id', async (req, res) => {
    try {
        const team = await Team_1.default.findByIdAndDelete(req.params.id);
        if (!team) {
            res.status(404).json({ error: 'Team not found' });
            return;
        }
        res.json({ message: 'Team deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete team' });
    }
});
exports.default = router;
