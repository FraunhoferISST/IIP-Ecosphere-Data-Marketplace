import {gql} from "graphql-tag";
import { cart } from "../../../../../../shared/gql/fragments/cart";

export default gql`
    mutation updateCartItemsQuantity($items: [UpdateCartItemInput]!, $cartId: ID!){
        updateCartItemsQuantity(
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
