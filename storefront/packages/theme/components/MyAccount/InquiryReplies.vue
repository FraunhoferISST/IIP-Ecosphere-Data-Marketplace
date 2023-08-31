<template>
  <div>
    <div class="text-sm">
      <span class="text-slate-500">Reply from </span>
      <span class="mx-1">{{ `${reply.account.firstName} ${reply.account.lastName}` }}</span>
      <span class="text-slate-500">at </span>
      <date-display class="mx-1" :date="reply.createdAt" format="dd.MM.yyy"/>
    </div>
    <p>
      {{ reply.message }}
    </p>
    <h5 v-if="reply.offers && reply.offers.length > 0">
      Included offers
    </h5>
    <div class="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
      <div v-for="offer in reply.offers" :key="offer.variant._id">
        <SfLink :link="localePath(`/p/${getSelectedVariant(offer.product, offer.variant._id)._id}/${offer.product.slug}`)" target="_blank">
          <div
            class="transition flex flex-row gap-1 p-2 hover:bg-slate-50 cursor-pointer no-underline">
            <div class="w-full">
              <h5 class="mt-0 mb-0 flex flex-row justify-between">
                {{ getSelectedVariant(offer.product, offer.variant._id).title }}
                <span>
                {{getSelectedVariant(offer.product, offer.variant._id).pricing[0].displayPrice}}
              </span>
              </h5>
              <div>
            <span class="text-xs text-slate-500 decoration-transparent">
              {{ getSelectedVariant(offer.product, offer.variant._id).optionTitle }}
            </span>
              </div>
            </div>
          </div>
        </SfLink>
      </div>
    </div>
    <div class="flex justify-between gap-x-2 mt-5">
      <div>
        <SfAlert type="success" v-if="accepted">
          <template #message>
            <p class="pl-4">
              You have marked this reply as accepted
            </p>
          </template>
        </SfAlert>
        <SfAlert type="warning" v-if="rejected">
          <template #message>
            <p class="pl-4">
              You have marked this reply as rejected
            </p>
          </template>
        </SfAlert>
      </div>
      <div class="flex justify-end gap-x-2">
        <SfButton v-if="!rejected" class="btn color-light py-2 px-4" @click="() => rejectReply()" :loading="reject.loading.value">Reject</SfButton>
        <SfButton v-if="!accepted" class="btn py-2 px-4" @click="() => acceptReply()" :loading="accept.loading.value">Accept</SfButton>
      </div>
    </div>
    <div class="bg-slate-100 mt-10" style="height: 2px"></div>
  </div>
</template>

<script>
import {
  SfButton,
  SfLink,
  SfAlert,
  SfIcon
} from "@storefront-ui/vue";
import {useInquiry} from "@vue-storefront/iiepmarket";
import {ref} from "@nuxtjs/composition-api";
import DateDisplay from "~/components/Base/DateDisplay";
import DotDivider from "@/components/Base/DotDivider";

export default {
  name: "InquiryReplies",
  components: {
    DotDivider,
    DateDisplay,
    SfButton,
    SfLink,
    SfAlert,
    SfIcon,
  },
  props: {
    reply: {
      type: Object,
      required: true,
    },
    inquiryId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { accept, reject } = useInquiry(props.inquiryId);
    const accepted = ref(props.reply.accepted);
    const rejected = ref(props.reply.rejected);
    const state = ref({...props.inquiry});
    return {
      state,
      accepted,
      rejected,
      accept,
      reject,
      acceptReply: () => accept.execute(props.reply._id).then(() => {
        accepted.value = true;
        rejected.value = false;
      }),
      rejectReply: () => reject.execute(props.reply._id).then(() => {
        accepted.value = false;
        rejected.value = true;
      }),
      getSelectedVariant: ((product, variantId) => product.variants.find(({ _id }) => _id === variantId)),
    };
  },
};
</script>

<style scoped lang="scss">
.btn {
  height: 30px !important;
  font-size: 0.7rem!important;
}
</style>
