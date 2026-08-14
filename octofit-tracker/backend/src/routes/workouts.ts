import { Router, Request, Response } from 'express';
import Workout from '../models/Workout';

const router = Router();

// Get all workouts
router.get('/', async (req: Request, res: Response) => {
  try {
    const workouts = await Workout.find();
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workouts' });
  }
});

// Get workout by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const workout = await Workout.findById(req.params.id);
    if (!workout) {
      res.status(404).json({ error: 'Workout not found' });
      return;
    }
    res.json(workout);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workout' });
  }
});

// Get workouts by difficulty
router.get('/difficulty/:difficulty', async (req: Request, res: Response) => {
  try {
    const workouts = await Workout.find({
      difficulty: req.params.difficulty,
    });
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workouts by difficulty' });
  }
});

// Create workout
router.post('/', async (req: Request, res: Response) => {
  try {
    const { title, description, difficulty, duration, exercises, targetCalories } =
      req.body;

    if (!title || !description || !difficulty || !duration || !exercises || !targetCalories) {
      res.status(400).json({
        error: 'Title, description, difficulty, duration, exercises, and targetCalories are required',
      });
      return;
    }

    const workout = new Workout({
      title,
      description,
      difficulty,
      duration,
      exercises,
      targetCalories,
    });

    const savedWorkout = await workout.save();
    res.status(201).json(savedWorkout);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create workout' });
  }
});

// Update workout
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { title, description, difficulty, duration, exercises, targetCalories } =
      req.body;

    const workout = await Workout.findByIdAndUpdate(
      req.params.id,
      { title, description, difficulty, duration, exercises, targetCalories },
      { new: true }
    );

    if (!workout) {
      res.status(404).json({ error: 'Workout not found' });
      return;
    }

    res.json(workout);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update workout' });
  }
});

// Delete workout
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const workout = await Workout.findByIdAndDelete(req.params.id);
    if (!workout) {
      res.status(404).json({ error: 'Workout not found' });
      return;
    }
    res.json({ message: 'Workout deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete workout' });
  }
});

export default router;
