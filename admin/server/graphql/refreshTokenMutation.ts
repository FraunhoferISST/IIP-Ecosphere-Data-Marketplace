import { gql } from "@apollo/client/core/core.cjs";

export default gql`
  mutation refreshToken($accessToken: String!, $refreshToken: String!) {
    refreshTokens(accessToken: $accessToken, refreshToken: $refreshToken) {
      tokens {
        refreshToken
        accessToken
      }
    }
  }
`;
