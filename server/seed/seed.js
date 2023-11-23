const connection = require('../config/connection');
const { Exercise, User, Workout } = require('../models');
const bcrypt = require('bcrypt'); //for password hashing

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
    //DROP exercise data
    let exerciseCheck = await connection.db.listCollections({ name: 'exercises' }).toArray();
    // console.log(exerciseCheck)
    if (exerciseCheck.length) {
      await connection.dropCollection('exercises');
      console.log('Exercise db dropped.');
    }
    //SEED exerciseData
    await Exercise.collection.insertMany(exerciseData);
    // console.log('Exercise seeded.');

    //DROP workout data
    let workoutCheck = await connection.db.listCollections({ name: 'workouts' }).toArray();
    if (workoutCheck.length) {
      await connection.dropCollection('workouts');
      console.log('Workout db dropped.');
    }

    //GET exercise database, used for its unique IDs.
    const databaseExercises = await Exercise.find();
    // Map each exercise name from workoutData to the corresponding ID from the databaseExercises
    workoutData.forEach((workout) => {
      workout.exercises.forEach((exercise) => {
        const matchedExercise = databaseExercises.find(
          (dbExercise) => dbExercise.name === exercise.name
        );
        // If an exercise name matched, update the workoutData to include _id string.
        if (matchedExercise) {
          exercise._id = matchedExercise._id; // Assign the ID
          delete exercise.name; // delete exercise name in json. 
        }
      });
    });

    //SEED workout
    await Workout.collection.insertMany(workoutData);

    //DROP users data
    let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (userCheck.length) {
      await connection.dropCollection('users');
      console.log('Users db dropped.');
    }

    //GET workout from database - needed for _ID. 
    const databaseWorkout = await Workout.find();

    //function that randomly returns, 1-4 workout, to be used for user's workout 
    async function getRandomWorkoutIDs() {
      //random number generator, 1-4
      const numWorkouts = Math.floor(Math.random() * 4)+1;
      const selectedIndices = new Set(); //to be returned after loop

      while (selectedIndices.size < numWorkouts) {
        let index = Math.floor(Math.random() * databaseWorkout.length);
        // Check if the index is already selected, generate another if it is
        while (selectedIndices.has(index)) {
          index = Math.floor(Math.random() * databaseWorkout.length);
        }
        selectedIndices.add(index);
      }
      //add new random-workout into setWorkoutID
      const setWorkoutID = [...selectedIndices].map(
        (index) => databaseWorkout[index]._id
      );
      return setWorkoutID;
    }

    //to hash the password in userdata
    const hashedUsers = await Promise.all(
      userData.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10); // Hash the password
        //generate random 1-4 workouts for users
        setWorkout = await getRandomWorkoutIDs();
        // Create new user with hashed password
        return {
          username: user.username,
          email: user.email,
          password: hashedPassword,
          workouts: setWorkout
        };
      })
    );

    //SEED hashedUser to database.
    await User.collection.insertMany(hashedUsers);   
    // console.log('Users seeded.');

    console.log('FINISHED running seeding.js');
    process.exit(0);
  } 
  catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
});