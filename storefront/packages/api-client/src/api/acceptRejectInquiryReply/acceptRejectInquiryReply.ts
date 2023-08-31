import replyToInquiryMutation from "./acceptRejectInquiryReplyMutation";
import type { Inquiry } from "../../../../../../shared/types";

const prepareResponse = ({ data: { acceptRejectInquiryReply } }): Inquiry => acceptRejectInquiryReply;

export const acceptRejectInquiryReply = (
  context: Record<any, any>,
  { id, ...rest }: Record<any, any>
): Promise<Inquiry> => {
  return context.client
    .mutate({
      mutation: replyToInquiryMutation,
      variables: {
        input: rest,
        id,
        shopId: context.config.state.getShopId(),
      },
    })
    .then((response) => prepareResponse(response));
};
