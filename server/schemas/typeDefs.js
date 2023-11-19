const typeDefs = `
  type User {
    _id: ID!
    username: String!
    email: String
    password: String
    savedExercises: [ID]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    users: [User]
    exercises: [Exercise]
    workouts: [Workout]
  }

  input ExerciseInput {
    _id: ID!
    type: String!
    name: String!
    description: String!
    target: String!
  }

  input ExerciseUpdate {
    type: String
    name: String
    description: String
    target: String
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveExercise(input: ID!): User
    removeExercise(input: ID!): User

    createExercise(input: ExerciseInput!): Exercise
    updateExercise(input: ExerciseUpdate!): Exercise
    deleteExercise(input: ID!): Exercise

    createWorkout(input: WorkoutInput!): Workout
    updateWorkout(input: WorkoutUpdate!): Workout
    deleteWorkout(input: ID!): Workout
  }

  type Exercise {
    _id: ID!
    type: String!
    name: String!
    description: String!
    target: String!
  }

  input WorkoutInput {
    _id: ID!
    name: String!
    exercises: [ID]
  }

  input WorkoutUpdate {
    _id: ID
    name: String
    exercises: [ID]
  }

  type Workout {
    _id: ID!
    name: String!
    exercises: [ID]
  }

`;

module.exports = typeDefs;
