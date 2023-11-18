const { Schema, model } = require('mongoose');

const exerciseSchema = new Schema ({
    type: {
        type: String,
        required: true
    },
    name: {
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
})
const Exercise = model('exercise', exerciseSchema);
module.exports = Exercise;