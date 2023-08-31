import {gql} from "@apollo/client/core";
import { cart } from "../../../../../../shared/gql/fragments/cart";

export default gql`
    mutation addCartItems($items: [CartItemInput]!, $cartId: ID!){
        addCartItems(
            input: {
                items: $items,
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
