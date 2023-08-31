import {gql} from "@apollo/client/core";
import { catalogProduct } from "../../../../../../shared/gql/fragments/catalogProduct";

export default gql`
    query searchCatalog(
        $shopIds: [ID]!, 
        $searchQuery: SearchQuery,
    ){
        searchCatalog(
            shopIds: $shopIds, 
            searchQuery: $searchQuery
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
