import { gql } from "graphql-tag";

export default gql`
  query canAddReview(
    $shopId: ID!
    $accountId: ID!
    $attributedId: ID!
  ) {
    canAddReview(
      shopId: $shopId
      accountId: $accountId
      attributedId: $attributedId
    ) {
      canAddReview
    }
  }
`;
