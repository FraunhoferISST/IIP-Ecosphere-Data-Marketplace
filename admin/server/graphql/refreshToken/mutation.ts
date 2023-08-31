import { gql } from "graphql-tag";

export default gql`
  mutation refreshToken($accessToken: String!, $refreshToken: String!) {
    refreshTokens(accessToken: $accessToken, refreshToken: $refreshToken) {
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
