import { gql } from "@apollo/client/core/core.cjs";

export default gql`
  mutation publishProductsToCatalog($productIds: [ID]!) {
    publishProductsToCatalog(productIds: $productIds) {
      _id
    }
  }
`;
