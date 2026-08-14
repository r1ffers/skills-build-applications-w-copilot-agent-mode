import mongoose, { Schema, Document } from 'mongoose';

export interface ILeaderboard extends Document {
  user: mongoose.Types.ObjectId;
  team: mongoose.Types.ObjectId;
  totalCalories: number;
  totalActivities: number;
  totalDuration: number; // in minutes
  rank: number;
  updatedAt: Date;
}

const leaderboardSchema = new Schema<ILeaderboard>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    team: {
      type: Schema.Types.ObjectId,
      ref: 'Team',
      required: true,
    },
    totalCalories: {
      type: Number,
      default: 0,
    },
    totalActivities: {
      type: Number,
      default: 0,
    },
    totalDuration: {
      type: Number,
      default: 0,
    },
    rank: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Leaderboard = mongoose.model<ILeaderboard>('Leaderboard', leaderboardSchema);

export default Leaderboard;
