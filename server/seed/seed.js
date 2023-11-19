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
    //drops exercise data
    let exerciseCheck = await connection.db.listCollections({ name: 'exercise' }).toArray();
    // console.log(exerciseCheck)
    if (exerciseCheck.length) {
      await connection.dropCollection('exercise');
      console.log('Exercise db dropped.');
    }
    //seed exercise data
    await Exercise.collection.insertMany(exerciseData);
    console.log('Exercises seeded.');

    //drops workout data
    let workoutCheck = await connection.db.listCollections({ name: 'workout' }).toArray();
    if (workoutCheck.length) {
      await connection.dropCollection('workout');
      console.log('Workout db dropped.');
    }



//todo: grab _ID from databaseExercise by using name from workoutData. Then delete name in workoutData and replace it with ID.

//     const databaseExercise = await Workout.find();
//     workoutData.forEach((workout) => {
//       // Iterate through each exercise in the current workout
//       workout.exercises.forEach((exercise) => {
//           const foundExercise = databaseExercise.find(
//               (dbExercise) => dbExercise.name === exercise.name
//           );
  
//           if (foundExercise) {
//               // If a matching exercise is found in the database, replace the name with its ID
//               exercise.id = foundExercise._id.toString(); // Store the ID in the exercise object
//               delete exercise.name; // Remove the 'name' property
//           }
//       });
//   });
// console.log(workoutData)





    //seed workout
    await Workout.collection.insertMany(workoutData);
    // console.log('Workouts seeded.');

    //drops users data
    let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (userCheck.length) {
    await connection.dropCollection('users');
    console.log('Users db dropped.');
    }

    //Grabs workout from database - needed for _ID. 
    const databaseWorkout = await Workout.find();

    //function that randomly returns, 0-3 workout
    async function getRandomWorkoutIDs() {
      //random number generator, 0-3
      const numWorkouts = Math.floor(Math.random() * 4);
      //grabs workout.
      const setWorkout = databaseWorkout.slice(0, numWorkouts);
      //pulls only workout ID. 
      const setWorkoutID = setWorkout.map((workout) => workout._id);
      return setWorkoutID;
    }

    //to hash the password in userdata
    const hashedUsers = await Promise.all(
      userData.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10); // Hash the password
        //generate random 0-3 workouts for users
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
    //send hashedUser to database.
    await User.collection.insertMany(hashedUsers);   
    // console.log('Users seeded.');

    console.log('FINISHED seeding Data.');
    process.exit(0);
  } 
  catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
});