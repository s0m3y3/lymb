import { gql } from '@apollo/client';

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
// updateWorkout(input: WorkoutUpdate!): Workout
// deleteWorkout(input: ID!): Workout