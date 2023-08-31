import { gql } from "graphql-tag";
import {inquiry} from "../../../../../../shared/gql/fragments/inquiry";

export default gql`
    query accountInquiries(
        $shopId: ID!
    ) {
        accountInquiries(
            shopId: $shopId
        ) {
            inquiries {
                ...InquiryCommon
            }
        }
    }
    ${inquiry(gql)}
`;
