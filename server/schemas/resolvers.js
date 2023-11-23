const { User, Exercise, Workout } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate("workouts")
          .populate({
            path: "workouts",
            populate: "exercises",
          });

        return userData;
      }

      throw AuthenticationError;
    },
    //fetch all exercise.
    exercises: async () => {
      const exercises = await Exercise.find();
      return exercises;
    },
    //fetch all workout.
    workouts: async () => {
      const workouts = (await Workout.find({})).populate("exercises");
      return workouts;
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        console.log("can't find user");
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        console.log("pw wrong");
        throw AuthenticationError;
      }

      const token = signToken(user);
      return { token, user };
    },
    createWorkout: async (parent, { input }, context) => {
      if (context.user) {
        console.log(input);
        const workout = await Workout.create(input);
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { workouts: workout._id } },
          { new: true }
        );
        return workout;
      }
      throw AuthenticationError;
    },
    deleteWorkout: async (parent, { workoutId }, context) => {
      if (context.user) {
        const workout = await Workout.findOneAndDelete({
          _id: workoutId,
        });
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { workouts: workout._id } },
          { new: true }
        );
        return workout;
      }
      throw AuthenticationError;
    },
    updateWorkout: async (parent, { input }, context) => {
      if (context.user) {
        const updatedWorkout = await Workout.findOneAndUpdate(
          { _id: input._id },
          { $set: { exercises: input.exercises } },
          { new: true }
          );
          return updatedWorkout;
      }
      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;

//todo Resolvers for the following:
// updateExercise(input: ExerciseUpdate!): Exercise
// deleteExercise(input: ID!): Exercise

// createWorkout(input: WorkoutInput!): Workout
// updateWorkout(input: WorkoutUpdate!): Workout
// deleteWorkout(input: ID!): Workout

// //save exercise to user's profile.
// saveExercise: async (parent, { exerciseData }, context) => {
//   if (context.user) {
//     const updatedUser = await User.findByIdAndUpdate(
//       { _id: context.user._id },
//       //double check below @@@@@@@@
//       { $push: { savedExercises: exerciseData } },
//       { new: true }
//     );

//     return updatedUser;
//   }

//   throw AuthenticationError;
// },

// //remove saved exercise from user's profile.
// removeExercise: async (parent, { _id },context) => {
//   if (context.user) {
//     const updatedUser = await User.findByIdAndDelete (
//       { _id: context.user._id },
//       { $pull: { exercise: { _id } } },
//       { new: true }
//     )
//     return updatedUser;
//   }
//   throw new AuthenticationError('You need to be logged in to remove a book');
// },

// //create a new exercise.
// createExercise: async (parent, { input }) => {
//   const exercise = await Exercise.create(input);
//   return exercise;
// },

// //update an existing exercise data
// updateExercise: async (parent, { input }) => {
//   //not sure @@@@@
//   const exercise = await Exercise.updateOne(input);
//   return exercise;
// },

// //delete exercise data
// deleteExercise: async (parent, { input }) => {
//   const exercise = await Exercise.findbyIDAndDelete(input);
//   return exercise;
// },
