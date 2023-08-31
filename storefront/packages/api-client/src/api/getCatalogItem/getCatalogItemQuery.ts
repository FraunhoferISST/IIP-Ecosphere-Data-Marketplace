import {gql} from "graphql-tag";
import { catalogProduct } from "../../../../../../shared/gql/fragments/catalogProduct";

export default gql`
    query catalogItemProduct($shopId: ID, $slugOrId: String!){
        catalogItemProduct(shopId: $shopId, slugOrId: $slugOrId) {
            ... on CatalogItemProduct {
                __typename
                _id
                product {
                    ...ProductCommon
                }
            }
        }
    }
    ${catalogProduct(gql)}
`;
