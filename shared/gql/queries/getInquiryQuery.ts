import { inquiry } from "../fragments/inquiry";

export default (gql) => gql`
  query inquiry(
    $shopId: ID!
    $id: ID!
  ) {
    inquiry(
      shopId: $shopId
      id: $id
    ) {
      ...InquiryCommon
    }
  }
  ${inquiry(gql)}
`;
