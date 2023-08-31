import { gql } from "graphql-tag";

export default gql`
  mutation archiveProduct($productId: ID!, $shopId: ID!) {
    archiveProducts(input: { productIds: [$productId], shopId: $shopId }) {
      products {
        title
        _id
      }
    }
  }
`;
