import { gql } from "graphql-tag";
import { reviewsAggregation } from "../../../../shared/gql/fragments/reviewsAggregation";

export default gql`
  query reviewsAggregation(
    $shopId: ID!
    $accountId: ID
    $attributedShopId: ID
    $attributedProductId: ID
    $attributedAccountId: ID
  ) {
    reviewsAggregation(
      shopId: $shopId
      accountId: $accountId
      attributedShopId: $attributedShopId
      attributedProductId: $attributedProductId
      attributedAccountId: $attributedAccountId
    ) {
      ...ReviewsAggregationCommon
    }
  }
  ${reviewsAggregation(gql)}
`;
