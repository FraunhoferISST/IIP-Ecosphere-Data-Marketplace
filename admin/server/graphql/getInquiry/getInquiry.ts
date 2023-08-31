import getInquiryQuery from "~/server/graphql/getInquiry/getInquiryQuery";
import type { Inquiry } from "../../../../shared/types";

const prepareResponse = ({ data: { inquiry } }): Inquiry => inquiry;

export const getInquiry = (event, body): Promise<Inquiry> => {
  return event.context.apiClient
    .query({
      query: getInquiryQuery,
      variables: {
        ...body,
        shopId: event.context.cookies.shopId,
      },
    })
    .then((response) => prepareResponse(response));
};
