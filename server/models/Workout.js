const { Schema, model } = require('mongoose');
const exerciseSchema = require('./Exercise');

const workoutSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    // exercise: [exerciseSchema]
    exercises: [{
        type: Schema.Types.ObjectId,
        ref: 'Exercise' // Reference to the Exercise model
    }]
})

const Workout = model('Workout', workoutSchema);
module.exports = Workout;