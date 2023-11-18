const connection = require('../config/connection');
const { Exercise, User, Workout } = require('../models');

//importing json data for seeding. 
const exerciseData = require('./exercise.json')
const userData = require('./users.json')
const workoutData = require('./workout.json')

//connects to mongoDB
connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

connection.once('open', async () => {
  try {
    let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (userCheck.length) {
      await connection.dropCollection('users');
      console.log('Users db dropped.');
    }
    await User.collection.insertMany(userData);
    console.log('Users seeded.');

    let exerciseCheck = await connection.db.listCollections({ name: 'exercise' }).toArray();
    if (exerciseCheck.length) {
      await connection.dropCollection('exercise');
      console.log('Exercise db dropped.');
    }
    await Exercise.collection.insertMany(exerciseData);
    console.log('Exercises seeded.');

    let workoutCheck = await connection.db.listCollections({ name: 'workout' }).toArray();
    if (workoutCheck.length) {
      await connection.dropCollection('workout');
      console.log('Workout db dropped.');
    }
    await Workout.collection.insertMany(workoutData);
    console.log('Workouts seeded.');

    console.log('FINISHED seeding Data.');
    process.exit(0);
  } 
  catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
});