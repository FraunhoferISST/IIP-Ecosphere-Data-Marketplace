import { gql } from "graphql-tag";
import { product } from "../../../../shared/gql/fragments/product";

export default gql`
  query product($shopId: ID!, $productId: ID!) {
    product(shopId: $shopId, productId: $productId) {
      ...ProductCommon
    }
  }
  ${product(gql)}
`;
