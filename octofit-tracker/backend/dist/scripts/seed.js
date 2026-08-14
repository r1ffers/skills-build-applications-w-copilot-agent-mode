"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = __importDefault(require("../models/User"));
const Team_1 = __importDefault(require("../models/Team"));
const Activity_1 = __importDefault(require("../models/Activity"));
const Workout_1 = __importDefault(require("../models/Workout"));
const Leaderboard_1 = __importDefault(require("../models/Leaderboard"));
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose_1.default.connect(connectionString);
        console.log('Connected to octofit_db');
        // Clear existing data
        await User_1.default.deleteMany({});
        await Team_1.default.deleteMany({});
        await Activity_1.default.deleteMany({});
        await Workout_1.default.deleteMany({});
        await Leaderboard_1.default.deleteMany({});
        console.log('Cleared existing data');
        // Create sample users
        const users = await User_1.default.create([
            {
                username: 'alice_fitness',
                email: 'alice@example.com',
                password: 'hashed_password_1',
                profile: {
                    firstName: 'Alice',
                    lastName: 'Johnson',
                    avatar: 'https://i.pravatar.cc/150?img=1',
                },
            },
            {
                username: 'bob_runner',
                email: 'bob@example.com',
                password: 'hashed_password_2',
                profile: {
                    firstName: 'Bob',
                    lastName: 'Smith',
                    avatar: 'https://i.pravatar.cc/150?img=2',
                },
            },
            {
                username: 'carol_cyclist',
                email: 'carol@example.com',
                password: 'hashed_password_3',
                profile: {
                    firstName: 'Carol',
                    lastName: 'Williams',
                    avatar: 'https://i.pravatar.cc/150?img=3',
                },
            },
            {
                username: 'david_swimmer',
                email: 'david@example.com',
                password: 'hashed_password_4',
                profile: {
                    firstName: 'David',
                    lastName: 'Brown',
                    avatar: 'https://i.pravatar.cc/150?img=4',
                },
            },
            {
                username: 'eve_crossfit',
                email: 'eve@example.com',
                password: 'hashed_password_5',
                profile: {
                    firstName: 'Eve',
                    lastName: 'Davis',
                    avatar: 'https://i.pravatar.cc/150?img=5',
                },
            },
        ]);
        console.log(`Created ${users.length} users`);
        // Create teams
        const teams = await Team_1.default.create([
            {
                name: 'Fitness Warriors',
                description: 'A team dedicated to fitness and wellness',
                leader: users[0]._id,
                members: [users[0]._id, users[1]._id, users[2]._id],
            },
            {
                name: 'Endurance Legends',
                description: 'For those who love long-distance activities',
                leader: users[3]._id,
                members: [users[3]._id, users[4]._id],
            },
        ]);
        console.log(`Created ${teams.length} teams`);
        // Assign teams to users
        await User_1.default.updateMany({ _id: { $in: [users[0]._id, users[1]._id, users[2]._id] } }, { team: teams[0]._id });
        await User_1.default.updateMany({ _id: { $in: [users[3]._id, users[4]._id] } }, { team: teams[1]._id });
        console.log('Updated users with team assignments');
        // Create activities
        const activities = await Activity_1.default.create([
            {
                user: users[0]._id,
                type: 'running',
                duration: 45,
                calories: 450,
                distance: 6.5,
                description: 'Morning run in the park',
                date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            },
            {
                user: users[0]._id,
                type: 'gym',
                duration: 60,
                calories: 350,
                description: 'Strength training session',
                date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
            },
            {
                user: users[1]._id,
                type: 'running',
                duration: 50,
                calories: 500,
                distance: 7.2,
                description: 'Evening run',
                date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
            },
            {
                user: users[2]._id,
                type: 'cycling',
                duration: 90,
                calories: 600,
                distance: 25,
                description: 'Long distance cycling',
                date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
            },
            {
                user: users[3]._id,
                type: 'swimming',
                duration: 60,
                calories: 550,
                distance: 2,
                description: 'Swimming laps at the pool',
                date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            },
            {
                user: users[4]._id,
                type: 'gym',
                duration: 75,
                calories: 400,
                description: 'CrossFit workout',
                date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
            },
            {
                user: users[4]._id,
                type: 'sports',
                duration: 60,
                calories: 420,
                description: 'Basketball game',
                date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
            },
        ]);
        console.log(`Created ${activities.length} activities`);
        // Create workouts
        const workouts = await Workout_1.default.create([
            {
                title: 'Beginner Running Routine',
                description: 'Perfect for those just starting their running journey',
                difficulty: 'beginner',
                duration: 30,
                exercises: [
                    {
                        name: 'Warm-up walk',
                        sets: 1,
                        reps: 5,
                        description: 'Walk for 5 minutes',
                    },
                    {
                        name: 'Running intervals',
                        sets: 5,
                        reps: 1,
                        description: 'Alternate 2 minutes running with 1 minute walking',
                    },
                    {
                        name: 'Cool-down walk',
                        sets: 1,
                        reps: 5,
                        description: 'Walk for 5 minutes to cool down',
                    },
                ],
                targetCalories: 300,
            },
            {
                title: 'Advanced CrossFit Workout',
                description: 'High-intensity functional training',
                difficulty: 'advanced',
                duration: 45,
                exercises: [
                    {
                        name: 'Barbell clean and jerk',
                        sets: 5,
                        reps: 3,
                    },
                    {
                        name: 'Box jumps',
                        sets: 4,
                        reps: 8,
                    },
                    {
                        name: 'Wall balls',
                        sets: 3,
                        reps: 15,
                    },
                    {
                        name: 'Rope climbs',
                        sets: 3,
                        reps: 5,
                    },
                ],
                targetCalories: 500,
            },
            {
                title: 'Intermediate Strength Training',
                description: 'Build muscle and strength with progressive overload',
                difficulty: 'intermediate',
                duration: 60,
                exercises: [
                    {
                        name: 'Bench press',
                        sets: 4,
                        reps: 6,
                    },
                    {
                        name: 'Squats',
                        sets: 4,
                        reps: 6,
                    },
                    {
                        name: 'Deadlifts',
                        sets: 3,
                        reps: 5,
                    },
                    {
                        name: 'Pull-ups',
                        sets: 3,
                        reps: 8,
                    },
                ],
                targetCalories: 400,
            },
        ]);
        console.log(`Created ${workouts.length} workouts`);
        // Create leaderboard entries
        const leaderboardEntries = await Leaderboard_1.default.create([
            {
                user: users[0]._id,
                team: teams[0]._id,
                totalCalories: 800,
                totalActivities: 2,
                totalDuration: 105,
                rank: 1,
            },
            {
                user: users[1]._id,
                team: teams[0]._id,
                totalCalories: 500,
                totalActivities: 1,
                totalDuration: 50,
                rank: 2,
            },
            {
                user: users[2]._id,
                team: teams[0]._id,
                totalCalories: 600,
                totalActivities: 1,
                totalDuration: 90,
                rank: 3,
            },
            {
                user: users[3]._id,
                team: teams[1]._id,
                totalCalories: 550,
                totalActivities: 1,
                totalDuration: 60,
                rank: 1,
            },
            {
                user: users[4]._id,
                team: teams[1]._id,
                totalCalories: 820,
                totalActivities: 2,
                totalDuration: 135,
                rank: 2,
            },
        ]);
        console.log(`Created ${leaderboardEntries.length} leaderboard entries`);
        console.log('Database seeding complete!');
        await mongoose_1.default.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
