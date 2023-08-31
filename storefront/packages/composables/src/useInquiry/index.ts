import {UseRequest, useRequest} from "../useRequest";
import {computed, ComputedRef} from "@nuxtjs/composition-api";
import type {Inquiry} from "@vue-storefront/iiepmarket-api";
import {Context, sharedRef, useVSFContext} from "@vue-storefront/core";

interface UseInquiry {
    inquiry: ComputedRef<Inquiry>;
    load: UseRequest;
    update: UseRequest;
    reply: UseRequest;
    accept: UseRequest;
    reject: UseRequest;
}

export const useInquiry = (id: string): UseInquiry => {
  const context: Context = useVSFContext();
  const inquiry = sharedRef<Inquiry>(null, "useInquiry-inquiry");

  const load = useRequest(() =>
    context.$iiepmarket.api.getInquiry({id}).then((response: Inquiry) => {
      inquiry.value = response;
    })
  );

  const update = useRequest((patch) => {
    return context.$iiepmarket.api.updateInquiry({...patch, id}).then((response: Inquiry) => {
      inquiry.value = response;
    });
  }
  );

  const reply = useRequest((inquiryReply: object) =>
    context.$iiepmarket.api.replyToInquiry({...inquiryReply, id}).then((response: Inquiry) => {
      inquiry.value = response;
    })
  );

  const accept = useRequest((replyId: string) =>
    context.$iiepmarket.api.acceptRejectInquiryReply({
      id,
      replyId,
      accepted: true,
      rejected: false,
    }).then((response: Inquiry) => {
      inquiry.value = response;
    }));

  const reject = useRequest((replyId: string) =>
    context.$iiepmarket.api.acceptRejectInquiryReply({
      id,
      replyId,
      accepted: false,
      rejected: true,
    }).then((response: Inquiry) => {
      inquiry.value = response;
    }));

  return {
    inquiry: computed(() => inquiry.value),
    load,
    update,
    reply,
    accept,
    reject,
  };
};
