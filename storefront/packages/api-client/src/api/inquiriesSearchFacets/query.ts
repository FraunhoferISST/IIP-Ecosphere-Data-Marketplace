import {gql} from "@apollo/client/core";

export default gql`
    query inquiriesSearchFacets(
        $shopIds: [ID]!, 
    ){
        inquiriesSearchFacets(
            shopIds: $shopIds, 
        ) {
            facets {
                title
                property
                values {
                    value
                    count
                }
            }
        }
    }
`;
