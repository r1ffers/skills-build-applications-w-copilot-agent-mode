import mongoose, { Schema, Document } from 'mongoose';

export interface IWorkout extends Document {
  title: string;
  description: string;
  difficulty: string;
  duration: number; // in minutes
  exercises: {
    name: string;
    sets: number;
    reps: number;
    description?: string;
  }[];
  targetCalories: number;
  createdAt: Date;
  updatedAt: Date;
}

const workoutSchema = new Schema<IWorkout>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      required: true,
      enum: ['beginner', 'intermediate', 'advanced'],
    },
    duration: {
      type: Number,
      required: true,
    },
    exercises: [
      {
        name: {
          type: String,
          required: true,
        },
        sets: {
          type: Number,
          required: true,
        },
        reps: {
          type: Number,
          required: true,
        },
        description: String,
      },
    ],
    targetCalories: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Workout = mongoose.model<IWorkout>('Workout', workoutSchema);

export default Workout;
