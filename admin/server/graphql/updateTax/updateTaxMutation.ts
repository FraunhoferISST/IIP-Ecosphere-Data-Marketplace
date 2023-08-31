import { gql } from "graphql-tag";

import { taxRate } from "~/server/graphql/fragments/taxRate";

export default gql`
  mutation updateTaxRate($input: UpdateTaxRateInput!) {
    updateTaxRate(input: $input) {
      taxRate {
        ...TaxRateCommon
      }
    }
  }
  ${taxRate}
`;
