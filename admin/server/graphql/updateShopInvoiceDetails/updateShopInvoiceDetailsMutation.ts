import { gql } from "graphql-tag";
import { shop } from "../../../../shared/gql/fragments/shop";

export default gql`
  mutation updateShopInvoiceDetails(
    $shopId: ID!
    $input: InvoiceDetailsInput!
  ) {
    updateShopInvoiceDetails(shopId: $shopId, input: $input) {
      ...ShopCommon
    }
  }
  ${shop(gql)}
`;
