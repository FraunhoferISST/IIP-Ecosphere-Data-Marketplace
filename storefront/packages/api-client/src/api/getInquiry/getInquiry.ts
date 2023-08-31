import getInquiryQuery from "./getInquiryQuery";
import type { Inquiry } from "../../../../../../shared/types";

const prepareResponse = ({ data: { inquiry } }): Inquiry => inquiry;

export const getInquiry = (context: Record<any, any>, params: Record<any, any>): Promise<Inquiry> => {
  return context.client
    .query({
      query: getInquiryQuery,
      variables: {
        ...params,
        shopId: context.config.state.getShopId(),
      },
    })
    .then((response) => prepareResponse(response));
};
