import query from "./query";
import type { Inquiry } from "../../../../../../shared/types";

const prepareResponse = ({ data: { accountInquiries: { inquiries } } }): Inquiry[] => inquiries;

export const getAccountInquiries = (context: Record<any, any>, params: Record<any, any>): Promise<Inquiry[]> => {
  return context.client
    .query({
      query,
      variables: {
        ...params,
        shopId: context.config.state.getShopId(),
      },
    })
    .then((response) => prepareResponse(response));
};
