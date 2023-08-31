<template>
  <div>
    <SfPayment
      :paymentMethods="paymentMethods"
      transition="sf-fade"
      :years='["2020","2021","2022","2025"]'
      :months='["January","February","March","April","May","June","July","August","September","October","November","December"]'
      :creditCards='["debit","mastercard","electron"]'
    >
      <template #billing-heading>
        <div></div>
      </template>
      <template #billing-form>
        <div></div>
      </template>
      <template #payment-methods>
        <SfRadio
          v-for="item in paymentMethods"
          :key="item.value"
          v-model="computedPaymentMethod"
          :label="item.displayName"
          description="Use the bank transfer to pay the order. You will find further instructions in the invoice"
          :value="item"
          name="paymentMethod"
          class="flex-1"
        >
<!--          <template #label>
            <SfImage
              :src="item.icon"
              :alt="item.name"
              class="payment-image"
              :height="20"
              :lazy="false"
            />
          </template>-->
        </SfRadio>
      </template>
    </SfPayment>
  </div>
</template>

<script>
import { SfPayment, SfImage, SfRadio } from "@storefront-ui/vue";
import {computed, ref} from "@nuxtjs/composition-api";
import {useShop} from "@vue-storefront/iiepmarket";
import {addBasePath} from "@vue-storefront/core";

export default {
  name: "VsfPaymentProvider",
  components: {
    SfPayment,
    SfImage,
    SfRadio,
  },
  props: {
    paymentMethod: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    const { paymentMethods, loadPaymentMethods } = useShop();

    const selectedMethod = ref(paymentMethods);
    const paymentMethodImageMap = {
      paypal: addBasePath("/icons/paypal.svg"),
    };

    const computedPaymentMethod = computed({
      get: () => props.paymentMethod,
      set: (val) => emit("update:paymentMethod", val),
    });

    const getPaymentMethodImage = (paymentMethodName) =>
      paymentMethodImageMap[paymentMethodName] ?? addBasePath("/icons/pay.png");
    const selectMethod = (method) => {
      selectedMethod.value = method;
      emit("update:paymentMethod");
    };

    loadPaymentMethods.execute();

    return {
      paymentMethods: computed(() => paymentMethods.value.map(pm => ({ ...pm, icon: getPaymentMethodImage(pm.name)}))),
      computedPaymentMethod,
      selectedMethod,
      selectMethod,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
