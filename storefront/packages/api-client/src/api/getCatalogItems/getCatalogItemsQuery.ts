import {gql} from "@apollo/client/core";
import { catalogProduct } from "../../../../../../shared/gql/fragments/catalogProduct";

export default gql`
    query catalogItems(
        $shopIds: [ID]!, 
        $searchQuery: String = "", 
        $first: ConnectionLimitInt = 15, 
        $after: ConnectionCursor = "",
        $sortOrder: SortOrder = desc
        $sortBy: CatalogItemSortByField = createdAt
    ){
        catalogItems(
            shopIds: $shopIds, 
            searchQuery: $searchQuery 
            first: $first, 
            after: $after
            sortOrder: $sortOrder
            sortBy: $sortBy
            booleanFilters: [
                {
                    name: isVisible
                    value: true
                }
            ]            
        ) {
            nodes {
                _id
                createdAt
                ... on CatalogItemProduct {
                    __typename
                    _id
                    product {
                        ...ProductCommon
                    }
                }
            }
            pageInfo {
                endCursor
                hasNextPage
            }
            totalCount
        }
    }
    ${catalogProduct(gql)}
`;
