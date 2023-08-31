import getCatalogItemQuery from "./getCatalogItemQuery";
import type { Product } from "../../types";

const prepareResponse = ({ data: { catalogItemProduct: { product } }}): Product => product;

export const getCatalogItem = async (context: Record<any, any>, params: Record<any, any>): Promise<object> =>
  context.client.query({
    query: getCatalogItemQuery,
    variables: params,
  })
    .then(response => prepareResponse(response));

