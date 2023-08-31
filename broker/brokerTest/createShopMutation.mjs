import { gql } from "graphql-tag";
export default gql`
  mutation createShop(
    $name: String!
    $description: String
    $defaultLanguage: String
    $currencyCode: String
  ) {
    createShop(
      input: {
        currencyCode: $currencyCode
        defaultLanguage: $defaultLanguage
        name: $name
        type: "primary"
        description: $description
      }
    ) {
      clientMutationId
      shop {
        _id
      }
    }
  }
`;
