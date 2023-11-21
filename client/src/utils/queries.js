import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      workouts {
        _id
        name
      }
    }
  }
`;
export const QUERY_EXERCISE = gql`
  {
    exercises {
      _id: ID
      type: String
      name: String
      description: String
      target: String
    }
  }
`;

export const QUERY_WORKOUT = gql`
  {
    workouts {
      _id: ID
      type: String
      name: String
      description: String
      target: String
    }
  }
`;
