const typeDefs = `
  type User {
    _id: ID!
    username: String!
    email: String
    password: String
    savedExercises: [ID]
    workouts: [Workout]
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
    workout(_id: String): Workout
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    createWorkout(input: CreateWorkoutInput!): Workout
    deleteWorkout(input: WorkoutInput!): Workout
    updateWorkout(input: WorkoutInput!): Workout
  }

  input CreateWorkoutInput {
    name: String!
    description: String!
    exercises: [String]
  }

  input WorkoutInput {
    _id: ID!
    name: String
    description: String
    exercises: [String]
  }

  input Exercise {
    _id: ID!
    type: String!
    name: String!
    description: String!
    target: String!
  }

  type Exercise {
    _id: ID!
    type: String!
    name: String!
    description: String!
    target: String!
  }
 
  type Workout {
    _id: ID!
    name: String!
    description: String!
    exercises: [Exercise]
  }
`;

module.exports = typeDefs;

// input ExerciseInput {
//   _id: ID!
//   type: String!
//   name: String!
//   description: String!
//   target: String!
// }

// input ExerciseUpdate {
//   type: String
//   name: String
//   description: String
//   target: String
// }
// input WorkoutInput {
//   _id: ID!
//   name: String!
//   exercises: [ID]
// }

// input WorkoutUpdate {
//   _id: ID
//   name: String
//   exercises: [ID]
// }

//mutations
// saveExercise(input: ID!): User
// removeExercise(input: ID!): User

// createExercise(input: ExerciseInput!): Exercise
// updateExercise(input: ExerciseUpdate!): Exercise
// deleteExercise(input: ID!): Exercise

// createWorkout(input: WorkoutInput!): Workout
// updateWorkout(input: WorkoutUpdate!): Workout
// deleteWorkout(input: ID!): Workout
