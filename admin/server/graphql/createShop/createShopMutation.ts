import { gql } from "graphql-tag";
import { shop } from "../../../../shared/gql/fragments/shop";

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
        ...ShopCommon
      }
    }
  }
  ${shop(gql)}
`;
