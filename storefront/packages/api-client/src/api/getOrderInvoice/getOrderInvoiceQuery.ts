import { gql } from "graphql-tag";

export default gql`
  query orderInvoice($shopId: ID!, $orderId: ID!, $languageCode: String) {
    orderInvoice(
      shopId: $shopId
      orderId: $orderId
      languageCode: $languageCode
    ) {
      invoice
    }
  }
`;
