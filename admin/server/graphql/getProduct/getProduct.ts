import getProductQuery from "~/server/graphql/getProduct/getProductQuery";
import type { Product } from "~/types";

const prepareResponse = ({ data: { product } }): Product => product;

export const getProduct = async (event, body) => {
  return event.context.apiClient
    .query({
      query: getProductQuery,
      variables: {
        ...body,
        shopId: event.context.cookies.shopId,
      },
    })
    .then((response) => {
      return prepareResponse(response);
    });
};
