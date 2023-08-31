import createTaxMutation from "~/server/graphql/createTax/createTaxMutation";
import type { TaxRate } from "~/types";

const prepareResponse = ({
  data: {
    createTaxRate: { taxRate },
  },
}): TaxRate => taxRate;

export const createTax = (event, body) => {
  return event.context.apiClient
    .mutate({
      mutation: createTaxMutation,
      variables: {
        ...body,
        shopId: event.context.cookies.shopId,
      },
    })
    .then(async (response) => prepareResponse(response));
};
