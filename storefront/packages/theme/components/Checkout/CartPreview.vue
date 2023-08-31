<template>
  <div class="p-10" style="background-color: #f1f2f3">
    <SfOrderSummary>
      <template #summary>
          <SfProperty
            name="Products"
            :value="productsCount"
            class="
            sf-property--full-width sf-property--large
            sf-order-summary__property
          "
          />
          <SfProperty
            name="Subtotal"
            :value="productsTotal"
            class="
            sf-property--full-width sf-property--large
            sf-order-summary__property
          "
          />
          <SfProperty
            name="Tax total"
            :value="taxTotal"
            class="
            sf-property--full-width sf-property--large
            sf-order-summary__property
          "
          />
          <SfProperty
            name="Fulfillment"
            :value="fulfillmentTotal"
            class="
            sf-property--full-width sf-property--large
            sf-order-summary__property
          "
          />
          <SfDivider class="sf-order-summary__divider" />
          <SfProperty
            name="Total"
            :value="total"
            class="
            sf-property--full-width sf-property--large
            sf-order-summary__property
          "
          />
      </template>
      <template #promo>
        <slot name="action">
          <SfButton class="fill-width" @click="makeOrder" :disabled="!canMakeOrder">
            {{ $t("Make an order") }}
          </SfButton>
        </slot>
      </template>
    </SfOrderSummary>
  </div>
</template>

<script>
import {
  SfOrderSummary,
  SfDivider,
  SfHeading,
  SfButton,
  SfProperty
} from "@storefront-ui/vue";
import {useCart, useMakeOrder, useUser} from "@vue-storefront/iiepmarket";
import {computed, useRouter} from "@nuxtjs/composition-api";
export default {
  name: "CartPreview",
  components: {
    SfOrderSummary,
    SfDivider,
    SfHeading,
    SfButton,
    SfProperty,
  },
  setup() {
    const { cart } = useCart();
    const { user } = useUser();
    const { make } = useMakeOrder();
    const router = useRouter();

    const canMakeOrder = computed(() => cart.value &&
      cart.value.checkout?.fulfillmentGroups?.[0]?.selectedFulfillmentOption &&
      cart.value.paymentMethod
    );

    return {
      cart,
      canMakeOrder,
      productsCount: computed(() => cart.value.totalItemQuantity),
      productsTotal: computed(() => cart.value.checkout.summary.itemTotal.displayAmount),
      fulfillmentTotal: computed(() => cart.value.checkout.summary.fulfillmentTotal?.displayAmount),
      taxTotal: computed(() => cart.value.checkout.summary.taxTotal?.displayAmount),
      total: computed(() => cart.value.checkout.summary.total.displayAmount),
      makeOrder: () => make.execute(cart.value, cart.value.paymentMethod.name, user.value.primaryEmailAddress).then((placedOrder) => {
        router.push(`/checkout/thank-you?order=${placedOrder?.referenceId ?? ""}`);
      }),
    };
  },
};
</script>
