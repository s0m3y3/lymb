const { Schema, model } = require('mongoose');
// const { Exercise } = require('./Index');
// const { Exercise } = require('./Index');

const exerciseSchema = new Schema (
    {
        type: {
            type: String, 
            // default: 'exercise',
            require: true
        },
        exerciseName: {
            type: String, 
            required: true,
            maxlength: 25,
        },
        description: {
            type: String, 
            required: true, 
            maxlength: 500
        }, 
        target: {
            type: String
        },
    }
)

const Exercise = model('exercise', exerciseSchema);

module.exports = Exercise;