import mongoose, { Schema, Document } from 'mongoose';

export interface IActivity extends Document {
  user: mongoose.Types.ObjectId;
  type: string;
  duration: number; // in minutes
  calories: number;
  distance?: number; // in km
  description?: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

const activitySchema = new Schema<IActivity>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ['running', 'cycling', 'swimming', 'walking', 'gym', 'sports', 'other'],
    },
    duration: {
      type: Number,
      required: true,
    },
    calories: {
      type: Number,
      required: true,
    },
    distance: Number,
    description: String,
    date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Activity = mongoose.model<IActivity>('Activity', activitySchema);

export default Activity;
