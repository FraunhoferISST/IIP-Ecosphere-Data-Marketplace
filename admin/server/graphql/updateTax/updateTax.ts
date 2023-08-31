import updateTaxMutation from "~/server/graphql/updateTax/updateTaxMutation";
import type { TaxRate } from "~/types";

const prepareResponse = ({
  data: {
    updateTaxRate: { taxRate },
  },
}): TaxRate => taxRate;

export const updateTax = (event, { id, ...rest }) => {
  return event.context.apiClient
    .mutate({
      mutation: updateTaxMutation,
      variables: {
        input: { taxRateId: id, ...rest, shopId: event.context.cookies.shopId },
      },
    })
    .then(async (response) => prepareResponse(response));
};
