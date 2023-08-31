import updateInquiryMutation from "./updateInquiryMutation";
import type { Inquiry } from "../../../../../../shared/types";

const prepareResponse = ({ data: { updateInquiry } }): Inquiry => updateInquiry;

export const updateInquiry = (
  context: Record<any, any>,
  { id, _id, createdAt, updatedAt, account, shop, replies, repliesCount, ...rest }: Record<any, any>
): Promise<Inquiry> => {
  return context.client
    .mutate({
      mutation: updateInquiryMutation,
      variables: {
        inquiry: rest,
        id,
        shopId: context.config.state.getShopId(),
        accountId: context.config.state.getUserId(),
      },
    })
    .then((response) => prepareResponse(response));
};
