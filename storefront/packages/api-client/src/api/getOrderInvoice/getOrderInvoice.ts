import getOrderInvoiceQuery from "./getOrderInvoiceQuery";

const prepareResponse = ({
  data: {
    orderInvoice: { invoice },
  },
}): string => invoice;

export const getOrderInvoice = (context: Record<any, any>, params: Record<any, any>): Promise<string> =>
  context.client
    .query({
      query: getOrderInvoiceQuery,
      variables: {
        ...params,
        accountId: context.config.state.getUserId(),
        shopId: context.config.state.getShopId(),
      },
    })
    .then((response) => {
      return prepareResponse(response);
    });
