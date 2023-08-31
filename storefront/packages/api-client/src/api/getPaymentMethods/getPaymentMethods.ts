import getPaymentMethodsQuery from "./getPaymentMethodsQuery";
import {PaymentMethod} from "../../types";

const prepareResponse = ({ data: { availablePaymentMethods } }): PaymentMethod => availablePaymentMethods;

export const getPaymentMethods = async (context: Record<any, any>): Promise<PaymentMethod> => {
  return context.client.query({
    query: getPaymentMethodsQuery,
    variables: {
      shopId: context.config.state.getShopId(),
    },
  })
    .then((response) => {
      return prepareResponse(response);
    });
};
