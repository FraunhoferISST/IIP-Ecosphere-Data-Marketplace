import {gql} from "@apollo/client/core";
import { cart } from "../../../../../../shared/gql/fragments/cart";

export default gql`
    query accountCartByAccountId($accountId: ID!, $shopId: ID!){
        accountCartByAccountId(
            accountId: $accountId
            shopId: $shopId
        ) {
            __typename
            ...CartCommon
        }
    }
    ${cart(gql)}
`;
