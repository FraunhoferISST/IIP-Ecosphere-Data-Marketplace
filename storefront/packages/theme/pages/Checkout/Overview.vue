<template>
  <div class="sf-confirm-order">
    <slot name="heading" v-bind="{ orderTitle, orderTitleLevel }">
      <SfHeading
        :title="orderTitle"
        :level="orderTitleLevel"
        class="
          sf-heading--left sf-heading--no-underline
          sf-confirm-order__heading
        "
      />
    </slot>
    <slot name="table" v-bind="{ tableHeaders, orderItems }">
      <SfTable class="sf-table--bordered sf-confirm-order__table">
        <SfTableHeading class="sf-confirm-order__table-row">
          <SfTableHeader
            v-for="tableHeader in tableHeaders"
            :key="tableHeader"
            class="sf-confirm-order__table-header"
            :class="{
              'sf-confirm-order__table-description':
                tableHeader === 'Description',
            }"
          >
            {{ tableHeader }}
          </SfTableHeader>
        </SfTableHeading>
        <SfTableRow
          v-for="(product, index) in orderItems"
          :key="index"
          class="sf-confirm-order__table-row"
          data-testid="product-table-row"
        >
          <SfTableData
            class="sf-confirm-order__table-description"
            data-testid="product-description-table-data"
          >
            <div class="sf-confirm-order__product-title">
              {{ product.title }} - {{product.variantTitle }}
            </div>
            <div class="sf-confirm-order__product-sku">{{ product.sku }}</div>
          </SfTableData>
          <SfTableData class="sf-confirm-order__table-data">{{
              product.quantity
            }}</SfTableData>

          <SfTableData class="sf-confirm-order__table-data">{{
              product.attributes.map(({ label, value }) => [label, value].join(": ")).join("")
            }}</SfTableData>

          <SfTableData class="sf-confirm-order__table-data">
            <span v-if="product.taxCode && product.tax">{{product.taxCode}} - {{product.tax.displayAmount}}</span>
            <span v-else>{{product.taxCode}}</span>

          </SfTableData>

          <SfTableData class="sf-confirm-order__table-data">
            <SfPrice
              :regular="product.subtotal.displayAmount"
              class="sf-confirm-order__product-price"
            />
          </SfTableData>
        </SfTableRow>
      </SfTable>
    </slot>
  </div>
</template>
<script>
import {
  SfHeading,
  SfTable,
  SfCheckbox,
  SfDivider,
  SfPrice,
  SfProperty,
  SfLink
} from "@storefront-ui/vue";
import {cartGetters, useCart} from "@vue-storefront/iiepmarket";
import {computed} from "@nuxtjs/composition-api";
export default {
  name: "Overview",
  components: {
    SfHeading,
    SfTable,
    SfCheckbox,
    SfDivider,
    SfPrice,
    SfProperty,
    SfLink,
  },
  props: {
    orderTitle: {
      type: String,
      default: "Order details",
    },
    orderTitleLevel: {
      type: Number,
      default: 2,
    },
    order: {
      type: Object,
      default: () => ({}),
    },
    propertiesNames: {
      type: Array,
      default: () => ["Subtotal", "Shipping", "Total price"],
    },
    tableHeaders: {
      type: Array,
      default: () => ["Title", "Quantity", "Option", "Tax", "Amount"],
    },
  },
  setup() {
    const { cart } = useCart();
    return {
      cart,
      orderItems: computed(() => cartGetters.getItems(cart.value)),
    };
  },
  data() {
    return {
      terms: false,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "~@storefront-ui/shared/styles/components/templates/SfConfirmOrder.scss";
</style>
