const typeDefs = `
  type User {
    _id: ID!
    username: String!
    email: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    exercise: [Exercise] 
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    createExercise(input: ExerciseInput!): Exercise
  }

  input ExerciseInput {
    type: String!
    exerciseName: String!
    description: String!
    target: String
  }

  type Exercise {
    _id: ID!
    type: String!
    name: String!
    description: String!
    target: String
  }

`;

module.exports = typeDefs;
