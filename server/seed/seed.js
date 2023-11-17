//This seed generate random data for testing only. 
const connection = require('../config/connection');
const { Exercise } = require('../models');

const exerciseData = require('./exercise.json')

connection.on('error', (err) => err);

connection.once('open', async () => {
    try {
        // Delete the collection if it exists
        await Exercise.collection.drop();
        console.log('Exercise collection dropped.');
    
        // Insert exercise data from exercise.json
        const insertedExercises = await Exercise.insertMany(exerciseData);
        console.log(`${insertedExercises.length} exercises inserted successfully.`);
      } catch (error) {
        console.error('Error seeding exercises:', error);
      } finally {
        process.exit(0);
      }
});