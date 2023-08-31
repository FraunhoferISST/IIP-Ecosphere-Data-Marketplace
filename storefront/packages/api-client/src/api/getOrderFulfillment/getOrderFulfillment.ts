import getOrderFulfillmentQuery from "./getOrderFulfillmentQuery";

const prepareResponse = (({ data: { accountOrderFulfillment: { fulfillment } }}) => fulfillment);

export const getOrderFulfillment = async (context:Record<any, any>, params:Record<any, any>): Promise<any> => {
  return context.client.query({
    query: getOrderFulfillmentQuery,
    variables: {
      ...params,
      accountId: context.config.state.getUserId(),
      shopId: context.config.state.getShopId(),
    },
  })
    .then((response) => {
      return prepareResponse(response);
    });
};
