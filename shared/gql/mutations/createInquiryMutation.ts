import { inquiry } from "../fragments/inquiry";

export default (gql) => gql`
  mutation createInquiry(
    $shopId: ID!
    $accountId: ID!
    $inquiry: InquiryInput!
  ) {
    createInquiry(
      shopId: $shopId
      accountId: $accountId
      inquiry: $inquiry
    ) {
      ...InquiryCommon
    }
  }
  ${inquiry(gql)}
`;
