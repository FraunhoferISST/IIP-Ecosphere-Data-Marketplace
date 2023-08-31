import { inquiry } from "../fragments/inquiry";

export default (gql) => gql`
  mutation replyToInquiry(
    $shopId: ID!
    $id: ID!
    $accountId: ID!
    $inquiryReply: InquiryReplyInput!
  ) {
    replyToInquiry(
      shopId: $shopId
      accountId: $accountId
      id: $id
      inquiryReply: $inquiryReply
    ) {
      ...InquiryCommon
    }
  }
  ${inquiry(gql)}
`;
