import {gql} from "@apollo/client/core";

export default gql`
    query catalogSearchFacets(
        $shopIds: [ID]!, 
    ){
        catalogSearchFacets(
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
