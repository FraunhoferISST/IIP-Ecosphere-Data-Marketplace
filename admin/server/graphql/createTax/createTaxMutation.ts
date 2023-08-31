import { gql } from "graphql-tag";

export default gql`
  mutation createTaxRate(
    $country: String
    $rate: Float!
    $shopId: ID!
    $taxCode: String
  ) {
    createTaxRate(
      input: {
        country: $country
        rate: $rate
        shopId: $shopId
        taxCode: $taxCode
      }
    ) {
      taxRate {
        country
        postal
        rate
        region
        sourcing
        taxCode
        _id
      }
    }
  }
`;
