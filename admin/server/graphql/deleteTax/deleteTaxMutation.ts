import { gql } from "graphql-tag";

export default gql`
  mutation deleteTaxRate($shopId: ID!, $taxRateId: ID!) {
    deleteTaxRate(input: { shopId: $shopId, taxRateId: $taxRateId }) {
      clientMutationId
    }
  }
`;
