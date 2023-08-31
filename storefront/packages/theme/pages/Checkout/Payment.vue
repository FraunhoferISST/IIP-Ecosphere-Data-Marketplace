<template>
  <div>
    <VsfPaymentProvider :payment-method.sync="paymentMethod"/>
    <SfHeading
      :level="3"
      :title="$t('Delivery method')"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <div>
      <SfRadio v-for="(option, i) in availableFulfillmentOptions" :key="i"
        :label="option.fulfillmentMethod.carrier"
        :value="option.fulfillmentMethod"
        :selected="fulfillmentMethod"
        v-model="fulfillmentMethod"
        name="deliveryMethod"
        :description="option.fulfillmentMethod.carrier"
      >
        <template #label="{ label }">
          <div class="flex justify-between">
            <div>
              {{ label }}
            </div>
            <div class="shipping__label-price">{{ option.handlingPrice.displayAmount }}</div>
          </div>
        </template>
      </SfRadio>
    </div>
    <div v-e2e="'payment-summary-buttons'" class="mt-16 flex gap-x-4">
      <SfButton
        type="button"
        class="sf-button color-secondary summary__back-button"
        @click="router.push('/checkout/billing')"
      >
        {{ $t('Go back') }}
      </SfButton>
      <SfButton
        :disabled="!fulfillmentMethod || !paymentMethod"
        class="summary__action-button"
        @click="processToOverview"
      >
        {{ $t('Review order') }}
      </SfButton>
    </div>
  </div>
</template>

<script>
import {
  SfHeading,
  SfCheckbox,
  SfButton,
  SfIcon,
  SfAccordion,
  SfLink,
  SfRadio,
  SfImage,
  SfPayment
} from "@storefront-ui/vue";
import {ref, computed, useRouter} from "@nuxtjs/composition-api";
import { useCart } from "@vue-storefront/iiepmarket";

export default {
  name: "Payment",
  components: {
    SfHeading,
    SfCheckbox,
    SfButton,
    SfIcon,
    SfAccordion,
    SfLink,
    SfRadio,
    SfPayment,
    SfImage,
    VsfPaymentProvider: () => import("~/components/Checkout/VsfPaymentProvider"),
  },
  setup() {
    const router = useRouter();
    const { cart, setFulfillmentOption, setPaymentMethod } = useCart();

    const availableFulfillmentOptions = computed(() => cart.value.checkout?.fulfillmentGroups?.[0]?.availableFulfillmentOptions ?? []);

    const paymentMethod = ref(cart.value.paymentMethod);
    const fulfillmentMethod = ref(cart.value.checkout?.fulfillmentGroups?.[0]?.selectedFulfillmentOption?.fulfillmentMethod ??
      availableFulfillmentOptions[0]?.fulfillmentMethod);

    const processToOverview = async () => {
      await setFulfillmentOption.execute(cart.value.checkout.fulfillmentGroups[0]._id, fulfillmentMethod.value._id);
      await setPaymentMethod.execute({
        name: paymentMethod.value.name,
        displayName: paymentMethod.value.displayName,
        pluginName: paymentMethod.value.pluginName,
      });
      // router.push(context.root.localePath({ name: "overview" }));
      router.push("/checkout/overview");
    };

    return {
      router,
      cart,
      paymentMethod,
      fulfillmentMethod,
      availableFulfillmentOptions,
      processToOverview,
    };
  },
};
</script>

<style lang="scss" scoped>
>>> .sf-image {
  outline: none!important;
}
.title {
  margin: var(--spacer-xl) 0 var(--spacer-base) 0;
}
</style>
