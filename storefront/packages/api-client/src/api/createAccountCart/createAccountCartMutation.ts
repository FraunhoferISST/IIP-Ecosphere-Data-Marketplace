import {gql} from "@apollo/client/core";
import { cart } from "../../../../../../shared/gql/fragments/cart";

export default gql`
    mutation createCart($items: [CartItemInput]!, $shopId: ID!){
        createCart(
            input: {
                items: $items
                shopId: $shopId
            }
        ) {
            token
            incorrectPriceFailures {
                productConfiguration {
                    productId
                    productVariantId
                }
                providedPrice {
                    amount
                }
            }
            minOrderQuantityFailures {
                minOrderQuantity
            }
            cart {
                ...CartCommon
            }
        }
    }
    ${cart(gql)}
`;
