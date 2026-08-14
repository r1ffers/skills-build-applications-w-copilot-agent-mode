import { Router, Request, Response } from 'express';
import Activity from '../models/Activity';

const router = Router();

// Get all activities
router.get('/', async (req: Request, res: Response) => {
  try {
    const activities = await Activity.find()
      .populate('user', 'username email')
      .sort({ date: -1 });
    res.json(activities);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activities' });
  }
});

// Get activities by user
router.get('/user/:userId', async (req: Request, res: Response) => {
  try {
    const activities = await Activity.find({ user: req.params.userId })
      .populate('user', 'username email')
      .sort({ date: -1 });
    res.json(activities);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user activities' });
  }
});

// Get activity by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const activity = await Activity.findById(req.params.id).populate(
      'user',
      'username email'
    );
    if (!activity) {
      res.status(404).json({ error: 'Activity not found' });
      return;
    }
    res.json(activity);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activity' });
  }
});

// Create activity
router.post('/', async (req: Request, res: Response) => {
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

    const activity = new Activity({
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
  } catch (error) {
    res.status(500).json({ error: 'Failed to create activity' });
  }
});

// Update activity
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { type, duration, calories, distance, description, date } = req.body;

    const activity = await Activity.findByIdAndUpdate(
      req.params.id,
      { type, duration, calories, distance, description, date },
      { new: true }
    ).populate('user', 'username email');

    if (!activity) {
      res.status(404).json({ error: 'Activity not found' });
      return;
    }

    res.json(activity);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update activity' });
  }
});

// Delete activity
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const activity = await Activity.findByIdAndDelete(req.params.id);
    if (!activity) {
      res.status(404).json({ error: 'Activity not found' });
      return;
    }
    res.json({ message: 'Activity deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete activity' });
  }
});

export default router;
