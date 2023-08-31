<template>
  <div class="inquiry-card p-6 cursor-pointer hover:bg-slate-50">
    <div class="flex justify-between">
      <h4>{{ inquiry.title }}</h4>
      <div class="flex items-center" v-if="inquiry.desiredPricing">
        <SfIcon
          class="inline-block mr-2"
          icon="credits"
          :coverage="1"
        />
        <span class="sf-price__regular">
          {{ inquiry.desiredPricing }}
        </span>
      </div>
    </div>
    <p class="my-8 text-slate-500">
      {{ inquiry.description }}
    </p>
    <div>
      <SfProperty
        v-if="inquiry.useCase"
        class="desktop-only"
        name="Use case"
        :value="inquiry.useCase"
        style="margin: 0 0 1rem 0;"
      />
      <SfProperty
        v-if="inquiry.sourceTypes"
        class="desktop-only"
        name="Source types"
        :value="inquiry.sourceTypes.join(', ')"
        style="margin: 0 0 1rem 0;"
      />
    </div>
    <div class="flex justify-between items-end">
      <div>
        <span class="text-slate-500">Issued from </span>
        <span class="mx-1">{{ `${inquiry.account.firstName} ${inquiry.account.lastName}` }}</span>
        <span class="text-slate-500">at </span>
        <date-display class="mx-1" :date="inquiry.createdAt" format="dd.MM.yyy"/>
        <span v-if="inquiry.expirationDate">
          <dot-divider class="mb-1 mx-3"/>
          <span class="text-slate-500">expires at </span>
          <span>
            <date-display class="mx-1" :date="inquiry.expirationDate" format="dd.MM.yyy"/>
          </span>
        </span>
        <dot-divider class="mb-1 mx-3"/>
        <span class="text-slate-500">Replies: </span>
        <span> {{ inquiry.repliesCount }}</span>
      </div>
      <slot name="action" :inquiry="inquiry">
        <SfButton class="btn color-light" v-if="showApplyOfferBtn">
          {{ $t('Apply offer') }}
        </SfButton>
        <SfButton class="btn color-light" v-else>
          {{ $t('Details') }}
        </SfButton>
      </slot>
    </div>
  </div>
</template>

<script>
import {
  SfButton,
  SfIcon,
  SfLink,
  SfProperty
} from "@storefront-ui/vue";
import DotDivider from "@/components/Base/DotDivider";
import DateDisplay from "@/components/Base/DateDisplay";

export default {
  name: "InquiryCard",
  components: {
    DateDisplay,
    DotDivider,
    SfButton,
    SfIcon,
    SfLink,
    SfProperty,
  },
  props: {
    inquiry: {
      type: Object,
      required: true,
    },
    showApplyOfferBtn: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style scoped lang="scss">

</style>
