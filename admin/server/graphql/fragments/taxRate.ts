import gql from "graphql-tag";

export const taxRate = gql`
  fragment TaxRateCommon on TaxRate {
    country
    postal
    rate
    region
    sourcing
    taxCode
    _id
  }
`;
