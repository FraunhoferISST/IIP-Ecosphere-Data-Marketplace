import gql from "graphql-tag";
import { order } from "../../../../shared/gql/fragments/order";

export default gql`
  query orderById($id: ID!, $shopId: ID!) {
    orderById(id: $id, shopId: $shopId) {
      ...OrderCommon
    }
  }
  ${order(gql)}
`;
