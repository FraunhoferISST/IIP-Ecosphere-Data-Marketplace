import { gql } from "@apollo/client/core/core.cjs";

export default gql`
  mutation login($email: String, $password: String) {
    authenticate(
      serviceName: "password"
      params: { user: { email: $email }, password: $password }
    ) {
      tokens {
        refreshToken
        accessToken
      }
      user {
        id
      }
    }
  }
`;
