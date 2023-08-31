import {gql} from "graphql-tag";
import { catalogProduct} from "../../../../shared/gql/fragments/catalogProduct";

export default gql`
    query searchCatalog(
        $shopIds: [ID]!, 
        $searchQuery: SearchQuery,
        $brokerInfo: String,
    ){
        searchCatalog(
            shopIds: $shopIds, 
            searchQuery: $searchQuery
            brokerInfo: $brokerInfo
        ) {
            cursor
            count
            items {
                ... on CatalogItemProduct {
                    __typename
                    _id
                    product {
                        ...ProductCommon
                    }
                }
            }
        }
    }
    ${catalogProduct(gql)}
`;
