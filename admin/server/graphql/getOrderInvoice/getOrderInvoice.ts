import getOrderInvoiceQuery from "~/server/graphql/getOrderInvoice/getOrderInvoiceQuery";

const prepareResponse = ({
  data: {
    orderInvoice: { invoice },
  },
}): string => invoice;

export const getOrderInvoice = (event, body): Promise<string> =>
  event.context.apiClient
    .query({
      query: getOrderInvoiceQuery,
      variables: {
        ...body,
        shopId: event.context.cookies.shopId,
      },
    })
    .then((response) => {
      return prepareResponse(response);
    });
