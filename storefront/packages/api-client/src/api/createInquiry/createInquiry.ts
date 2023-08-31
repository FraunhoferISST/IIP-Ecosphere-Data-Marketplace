import createInquiryMutation from "./createInquiryMutation";
import type { Inquiry } from "../../../../../../shared/types";

const prepareResponse = ({ data: { createInquiry } }): Inquiry => createInquiry;

export const createInquiry = (context: Record<any, any>, params: Record<any, any>): Promise<Inquiry> => {
  return context.client
    .mutate({
      mutation: createInquiryMutation,
      variables: {
        inquiry: params,
        shopId: context.config.state.getShopId(),
        accountId: context.config.state.getUserId(),
      },
    })
    .then((response) => prepareResponse(response));
};
