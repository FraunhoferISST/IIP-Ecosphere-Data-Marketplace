import { gql } from "graphql-tag";

export default gql`
  mutation publishProductsToCatalog($productIds: [ID]!) {
    publishProductsToCatalog(productIds: $productIds) {
      _id
    }
  }
`;
