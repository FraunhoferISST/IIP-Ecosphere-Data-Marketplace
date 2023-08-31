import updateInquiryMutation from "~/server/graphql/updateInquiry/updateInquiryMutation";
import type { Inquiry } from "../../../../shared/types";

const prepareResponse = ({ data: { updateInquiry } }): Inquiry => updateInquiry;

export const updateInquiry = (
  event,
  { id, _id, createdAt, updatedAt, account, shop, ...rest }
): Promise<Inquiry> => {
  return event.context.apiClient
    .mutate({
      mutation: updateInquiryMutation,
      variables: {
        inquiry: rest,
        id,
        shopId: event.context.cookies.shopId,
        accountId: event.context.cookies.userId,
      },
    })
    .then((response) => prepareResponse(response));
};
