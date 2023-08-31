import mutation from "~/server/graphql/createInquiry/mutation";
import type { Inquiry } from "../../../../shared/types";

const prepareResponse = ({ data: { createInquiry } }): Inquiry => createInquiry;

export const createInquiry = (event, body): Promise<Inquiry> => {
  return event.context.apiClient
    .mutate({
      mutation,
      variables: {
        inquiry: body,
        shopId: event.context.cookies.shopId,
        accountId: event.context.cookies.userId,
      },
    })
    .then((response) => prepareResponse(response));
};
