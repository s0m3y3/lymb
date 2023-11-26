import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const CREATE_EXERCISE = gql`
  mutation CreateExercise($input: ExerciseInput!) {
    createExercise(input: $input) {
      _id
      name
      description
      target
    }
  }
`;

export const DELETE_EXERCISE = gql`
  mutation deleteExercise($input: ExerciseInput!) {
    deleteExercise(input: $input) {
      _id
    }
  }
`;

export const UPDATE_EXERCISE = gql`
  mutation updateExercise($input: ExerciseInput!) {
    updateExercise(input: $input) {
      _id
      name
      description
      target
    }
  }
`;

//todo:
// saveExercise(input: ID!): User
// removeExercise(input: ID!): User

// createWorkout(input: WorkoutInput!): Workout
export const CREATE_WORKOUT = gql`
mutation Mutation($input: CreateWorkoutInput!) {
  createWorkout(input: $input) {
    _id
  }
}
`;

// updateWorkout(input: WorkoutUpdate!): Workout
export const UPDATE_WORKOUT = gql`
  mutation updateWorkout($input: WorkoutInput!) {
    updateWorkout(input: $input) {
      _id
      name
      description
    }
  }
`;

// deleteWorkout(input: ID!): Workout
export const DELETE_WORKOUT = gql`
  mutation Mutation($input: WorkoutInput!) {
    deleteWorkout(input: $input) {
      _id
    }
  }
`;

//add an exercise to a workout
export const ADD_EXERCISE_TO_WORKOUT = gql`
  mutation Mutation($input: WorkoutInput!) {
    updateWorkoutAddExercise(input: $input) {
      _id
    }
  }
`;

export const UPDATE_WORKOUT_NAME = gql`
mutation Mutation($input: WorkoutInput!) {
  updateWorkoutName(input: $input) {
    _id
    name
    description
  }
}`
