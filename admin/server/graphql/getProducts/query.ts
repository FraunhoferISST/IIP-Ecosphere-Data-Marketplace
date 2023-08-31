import { gql } from "graphql-tag";
import { product } from "../../../../shared/gql/fragments/product";

export default gql`
  query products(
    $shopIds: [ID]!
    $first: ConnectionLimitInt = 15
    $after: ConnectionCursor = ""
    $isArchived: Boolean
    $isVisible: Boolean
    $query: String
    $sortOrder: SortOrder = desc
    $sortBy: ProductSortByField = createdAt
  ) {
    products(
      shopIds: $shopIds
      first: $first
      after: $after
      isArchived: $isArchived
      isVisible: $isVisible
      query: $query
      sortOrder: $sortOrder
      sortBy: $sortBy
    ) {
      nodes {
        ...ProductCommon
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
  ${product(gql)}
`;
