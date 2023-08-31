import { inquiry } from "../fragments/inquiry";

export default (gql) => gql`
  query searchInquiries(
    $shopIds: [ID]!
    $searchQuery: InquirySearchQuery
  ) {
    searchInquiries(
      shopIds: $shopIds
      searchQuery: $searchQuery
    ) {
      items {
        ...InquiryCommon
      }
      count
      cursor
    }
  }
  ${inquiry(gql)}
`;
