const Exercise = require('../models/Exercise');

module.exports = {
    async getSingleExercise(req, res) {
        try {
            const exercise = await Exercise.findOne({ _id: req.params.exerciseId });
            if (!exercise) {
                return res.status(404).json({ message: 'Exercise not found' });
            }
            res.status(200).json(exercise);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    async getExercise(req, res) {
        try {
            const allExercises = await Exercise.find();
            if (!allExercises) {
                return res.status(404).json({ message: 'Exercises not found' });
            }
            res.status(200).json(allExercises);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    async createExercise(req, res) {
        try {
            const exerciseData = await Exercise.create(req.body);
            res.json(exerciseData);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async updateExercise(req, res) {
        try {
            const updatedExercise = await Exercise.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.json(updatedExercise);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteExercise(req, res) {
        try {
            await Exercise.findByIdAndDelete(req.params.exerciseId);
            res.json({ message: 'Exercise deleted successfully' });
        } catch (err) {
            res.status(500).json(err);
        }
    },
};
