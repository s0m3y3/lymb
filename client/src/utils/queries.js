import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
    }
}
`
export const QUERY_EXERCISE = gql`
  {
    exercise {
      _id: ID!
      type: String!
      name: String!
      description: String!
      target: String
    }
}
`