import { gql } from "graphql-tag";

export default gql`
    query searchInquiries(
        $shopIds: [ID]!
        $searchQuery: InquirySearchQuery
    ) {
        searchInquiries(
            shopIds: $shopIds
            searchQuery: $searchQuery
        ) {
            items {
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
                repliesCount
                account {
                    name
                    primaryEmailAddress
                }
            }
            count
            cursor
        }
    }
`;
