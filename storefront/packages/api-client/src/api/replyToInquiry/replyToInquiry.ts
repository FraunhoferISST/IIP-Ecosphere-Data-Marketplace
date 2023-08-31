import replyToInquiryMutation from "./replyToInquiryMutation";
import type { Inquiry } from "../../../../../../shared/types";

const prepareResponse = ({ data: { replyToInquiry } }): Inquiry => replyToInquiry;

export const replyToInquiry = (
  context: Record<any, any>,
  { id, ...rest }: Record<any, any>
): Promise<Inquiry> => {
  return context.client
    .mutate({
      mutation: replyToInquiryMutation,
      variables: {
        inquiryReply: rest,
        id,
        shopId: context.config.state.getShopId(),
        accountId: context.config.state.getUserId(),
      },
    })
    .then((response) => prepareResponse(response));
};
