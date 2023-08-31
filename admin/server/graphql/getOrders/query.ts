import { gql } from "graphql-tag";
import { order } from "../../../../shared/gql/fragments/order";

const fragment = order(gql);

export default gql`
  query orders(
    $shopIds: [ID]!
    $first: ConnectionLimitInt = 30
    $after: ConnectionCursor = ""
    $sortOrder: SortOrder = desc
    $sortBy: OrdersSortByField = createdAt
    $filters: OrderFilterInput
  ) {
    orders(
      shopIds: $shopIds
      first: $first
      after: $after
      sortOrder: $sortOrder
      sortBy: $sortBy
      filters: $filters
    ) {
      nodes {
        ...OrderCommon
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        endCursor
        startCursor
      }
      totalCount
    }
  }
  ${fragment}
`;
