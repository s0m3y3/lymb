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
        description
        exercises{
          name
        _id
        }
      }
    }
  }
`;
export const QUERY_EXERCISE = gql`
  {
    exercises {
      _id
      description
      name
      target
      type
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
    }
  }
`;

export const QUERY_SINGLE_WORKOUT = gql`
query Query($_id: String) {
  workout(_id: $_id) {
    _id
    name
    description
    exercises {
      _id
      name
    }
  }
}`