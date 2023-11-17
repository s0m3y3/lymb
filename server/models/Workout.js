const { Schema, models } = require('mongoose');
// const exerciseSchema = require('./Exercise');
// const { Workout } = require('./Index');
// const { Workout } = require('./Index');

const workoutSchema = new Schema (
    {
        workoutName: {
            type: String,
            // default: "Workout",
            require: true
        },
        description: {
            type: String, 
            required: true
        },
        // exercise: [exerciseSchema]

    }
)


const Workout = model('Workout', workoutSchema);

module.exports = Workout;