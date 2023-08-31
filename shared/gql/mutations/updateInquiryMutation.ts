import { inquiry } from "../fragments/inquiry";

export default (gql) => gql`
  mutation updateInquiry(
    $shopId: ID!
    $id: ID!
    $accountId: ID!
    $inquiry: InquiryInput!
  ) {
    updateInquiry(
      shopId: $shopId
      accountId: $accountId
      id: $id
      inquiry: $inquiry
    ) {
      ...InquiryCommon
    }
  }
  ${inquiry(gql)}
`;
