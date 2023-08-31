import { gql } from "graphql-tag";

export default gql`
  query primaryShop {
    primaryShop {
      _id
      name
    }
  }
`;
