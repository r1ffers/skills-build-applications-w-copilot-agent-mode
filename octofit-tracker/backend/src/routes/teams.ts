import { Router, Request, Response } from 'express';
import Team from '../models/Team';
import User from '../models/User';

const router = Router();

// Get all teams
router.get('/', async (req: Request, res: Response) => {
  try {
    const teams = await Team.find()
      .populate('leader', 'username email')
      .populate('members', 'username email');
    res.json(teams);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch teams' });
  }
});

// Get team by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const team = await Team.findById(req.params.id)
      .populate('leader', 'username email')
      .populate('members', 'username email');
    if (!team) {
      res.status(404).json({ error: 'Team not found' });
      return;
    }
    res.json(team);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch team' });
  }
});

// Create team
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, description, leader } = req.body;

    if (!name || !leader) {
      res.status(400).json({ error: 'Team name and leader are required' });
      return;
    }

    const team = new Team({
      name,
      description,
      leader,
      members: [leader],
    });

    const savedTeam = await team.save();
    await savedTeam.populate('leader', 'username email');
    await savedTeam.populate('members', 'username email');
    res.status(201).json(savedTeam);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create team' });
  }
});

// Update team
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;

    const team = await Team.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true }
    )
      .populate('leader', 'username email')
      .populate('members', 'username email');

    if (!team) {
      res.status(404).json({ error: 'Team not found' });
      return;
    }

    res.json(team);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update team' });
  }
});

// Add member to team
router.post('/:id/members', async (req: Request, res: Response) => {
  try {
    const { memberId } = req.body;

    if (!memberId) {
      res.status(400).json({ error: 'Member ID is required' });
      return;
    }

    const team = await Team.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { members: memberId } },
      { new: true }
    )
      .populate('leader', 'username email')
      .populate('members', 'username email');

    if (!team) {
      res.status(404).json({ error: 'Team not found' });
      return;
    }

    res.json(team);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add member to team' });
  }
});

// Delete team
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const team = await Team.findByIdAndDelete(req.params.id);
    if (!team) {
      res.status(404).json({ error: 'Team not found' });
      return;
    }
    res.json({ message: 'Team deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete team' });
  }
});

export default router;
