const router = require('express').Router();
const {
  getExercise,
  createExercise,
  updateExercise,
  deleteExercise,
  getSingleExercise
} = require('../../controllers/exerciseController.js');

// /api/exercise
router.route('/')
  .get(getExercise)
  .post(createExercise);

// /api/exercise/:exerciseId
router
  .route('/:exerciseId')
  .get(getSingleExercise)
  .put(updateExercise)
  .delete(deleteExercise);

module.exports = router;
