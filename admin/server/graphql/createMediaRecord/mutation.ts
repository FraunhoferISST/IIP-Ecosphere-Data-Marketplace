import { gql } from "@apollo/client/core/core.cjs";

export default gql`
  mutation createMediaRecord($mediaRecord: MediaRecordInput!) {
    createMediaRecord(
      input: { shopId: $shopId, mediaRecord: false, product: $product }
    ) {
      clientMutationId
      product {
        _id
        title
      }
    }
  }
`;
