import {gql} from "@apollo/client/core";
import {cart} from "../../../../../../shared/gql/fragments/cart";

export default gql`
    mutation removeCartItems($cartItemIds: [ID]!, $cartId: ID!){
        removeCartItems(
            input: {
                cartItemIds: $cartItemIds,
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
