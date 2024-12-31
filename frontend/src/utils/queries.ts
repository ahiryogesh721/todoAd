import { gql } from "graphql-request";

export const GET_USER = gql`
  query ($email: String!, $password: String!) {
    getUser(email: $email, password: $password) {
      token
      user {
        email
        id
        todos {
          done
          id
          pvt
          task
        }
      }
    }
  }
`;
