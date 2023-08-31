import { gql } from "graphql-tag";
export default gql`
  mutation createUser($email: String, $password: String) {
    createUser(user: { email: $email, password: $password }) {
      loginResult {
        tokens {
          accessToken
        }
        user {
          id
        }
      }
    }
  }
`;
