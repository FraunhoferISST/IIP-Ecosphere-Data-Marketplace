import { gql } from "graphql-tag";
import { taxRate } from "~/server/graphql/fragments/taxRate";

export default gql`
  query getTaxes($shopId: ID!) {
    taxRates(shopId: $shopId) {
      nodes {
        ...TaxRateCommon
      }
    }
  }
  ${taxRate}
`;
