const { User, Exercise } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select('-__v -password');

        return userData;
      }

      throw AuthenticationError;
    },
      exercise: async () => {
      const exercises = await Exercise.find();
      return exercises;
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
        console.log("can't find user")
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        console.log("pw wrong")
        throw AuthenticationError;
      }

      const token = signToken(user);
      return { token, user };
    },

    createExercise: async (parent, { input }) => {
      const exercise = await Exercise.create(input);
      return exercise;
    },
  },
};

module.exports = resolvers;
