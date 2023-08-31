import getPaymentMethodsQuery from "~/server/graphql/getPaymentMethods/getPaymentMethodsQuery";

const prepareResponse = ({ data: { paymentMethods } }) => paymentMethods;

export const getPaymentMethods = (event): Promise<unknown> => {
  return event.context.apiClient
    .query({
      query: getPaymentMethodsQuery,
      variables: {
        shopId: event.context.cookies.shopId,
      },
    })
    .then((response) => {
      return prepareResponse(response);
    });
};
