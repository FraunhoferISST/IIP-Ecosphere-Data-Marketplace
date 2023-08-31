import {gql} from "@apollo/client/core";
import { cart } from "../../../../../../shared/gql/fragments/cart";

export default gql`
    mutation updateFulfillmentOptionsForGroup($fulfillmentGroupId: ID!, $cartId: ID!){
        updateFulfillmentOptionsForGroup(
            input: {
                fulfillmentGroupId: $fulfillmentGroupId,
                cartId: $cartId
            }
        ) {
            cart {
                ...CartCommon
            }
        }
    }
    ${cart(gql)}
`;
