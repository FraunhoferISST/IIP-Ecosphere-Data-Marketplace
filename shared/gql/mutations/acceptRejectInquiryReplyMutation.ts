import { inquiry } from "../fragments/inquiry";

export default (gql) => gql`
  mutation acceptRejectInquiryReply(
    $shopId: ID!
    $id: ID!
    $input: AcceptRejectInquiryReplyInput!
  ) {
    acceptRejectInquiryReply(
      shopId: $shopId
      id: $id
      input: $input
    ) {
      ...InquiryCommon
    }
  }
  ${inquiry(gql)}
`;
