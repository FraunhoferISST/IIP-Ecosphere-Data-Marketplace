import { gql } from "graphql-tag";
import { review } from "../../../../shared/gql/fragments/review";

export default gql`
  query reviews(
    $shopId: ID!
    $accountId: ID
    $attributedShopId: ID
    $attributedProductId: ID
    $attributedAccountId: ID
  ) {
    reviews(
      shopId: $shopId
      accountId: $accountId
      attributedShopId: $attributedShopId
      attributedProductId: $attributedProductId
      attributedAccountId: $attributedAccountId
    ) {
      reviews {
        ...ReviewCommon
        attributedShop {
          _id
          name
        }
        attributedProduct {
          _id
          title
        }
        attributedAccount {
          _id
          name
          firstName
          lastName
        }
      }
    }
  }
  ${review(gql)}
`;
