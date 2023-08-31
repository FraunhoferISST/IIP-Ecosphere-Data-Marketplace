import getAvailablePaymentMethodsQuery from "~/server/graphql/getAvailablePaymentMethods/getAvailablePaymentMethodsQuery";

const prepareResponse = ({ data: { availablePaymentMethods } }) =>
  availablePaymentMethods;

export const getAvailablePaymentMethods = (event, body): Promise<unknown> => {
  return event.context.apiClient
    .query({
      query: getAvailablePaymentMethodsQuery,
      variables: body,
    })
    .then((response) => {
      return prepareResponse(response);
    });
};
