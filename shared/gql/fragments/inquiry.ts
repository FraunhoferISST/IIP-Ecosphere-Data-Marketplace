import { catalogProduct } from "./catalogProduct";
import { account } from "./accountMinimal";
import { inquiryReply } from "./inquiryReply";

export const inquiry = (gql) => gql`
  fragment InquiryCommon on Inquiry {
    _id
    title
    description
    desiredPricing
    expirationDate
    expectedConsumptionVolume
    useCase
    published
    sourceTypes
    license
    categories
    createdAt
    updatedAt
    account {
      ...AccountMinimal
    }
    repliesCount
    replies {
      ...InquiryReplyCommon
    }
  }
  ${catalogProduct(gql)}
  ${account(gql)}
  ${inquiryReply(gql)}
`;
