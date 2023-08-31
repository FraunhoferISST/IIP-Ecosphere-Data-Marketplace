<template>
  <div>
    <div class="highlighted highlighted--total">
      <SfProperty
        name="Order ID"
        :value="orderGetters.getId(order)"
        class="sf-property--full-width property"
      />
      <SfProperty
        name="Date"
        :value="orderGetters.getDate(order)"
        class="sf-property--full-width property"
      />
      <SfProperty
        name="Status"
        :value="orderGetters.getStatus(order)"
        class="sf-property--full-width property"
      />
      <SfProperty
        name="Total"
        :value="$n(orderGetters.getPrice(order), 'currency')"
        class="sf-property--full-width property"
      />
      <div class="my-4" style="border-top: 3px solid white"></div>
      <div v-if="invoice" class="text-right">
        <a
          class
          :href="`data:application/pdf;base64,${invoice}`"
          :download="`${order.referenceId}-invoice.pdf`"
        >
          {{ $t('Invoice') }}
          <SfIcon class="inline" icon="arrow_down" size="13px">
          </SfIcon>
        </a>
      </div>
    </div>
    <SfTable class="products">
      <SfTableHeading>
        <SfTableHeader class="products__name">{{ $t('Product') }}</SfTableHeader>
        <SfTableHeader>{{ $t('Quantity') }}</SfTableHeader>
        <SfTableHeader>{{ $t('Price') }}</SfTableHeader>
      </SfTableHeading>
      <SfTableRow v-for="(item, i) in orderGetters.getItems(order)" :key="i">
        <SfTableData class="products__name">
          <h4 style="font-size: 1.1rem">
            {{orderGetters.getItemName(item)}}
          </h4>
          <span>
            {{item.title}}
          </span>
        </SfTableData>
        <SfTableData>{{orderGetters.getItemQty(item)}}</SfTableData>
        <SfTableData>{{$n(orderGetters.getItemPrice(item), 'currency')}}</SfTableData>
      </SfTableRow>
    </SfTable>
    <data-viewer :loading="fulfillmentComp.load.loading.value" :error="fulfillmentComp.load.error.value">
      <div v-if="!fulfillment" class="my-6">
        <SfAlert message="Low in stock" type="info" >
          <template #message>
            <p class="pl-4">
              The order is currently being processed by the provider. As soon as your order is completed, the digital
              fulfillment will appear on this page.
            </p>
          </template>
        </SfAlert>
      </div>
      <div class="my-6" v-else>
        <fulfillment :fulfillment="fulfillment"/>
      </div>
    </data-viewer>
  </div>
</template>

<script>
import {
  SfTable,
  SfButton,
  SfProperty,
  SfLink,
  SfAlert,
  SfIcon
} from "@storefront-ui/vue";
import {orderGetters, useOrderFulfillment, useOrderInvoice} from "@vue-storefront/iiepmarket";
import DataViewer from "@/components/DataViewer";
import Fulfillment from "@/components/MyAccount/Fulfillment";

export default {
  name: "OrderDetails",
  components: {
    Fulfillment,
    DataViewer,
    SfTable,
    SfButton,
    SfProperty,
    SfLink,
    SfAlert,
    SfIcon,
  },
  props: {
    order: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const fulfillmentComp = useOrderFulfillment(props.order.referenceId);
    const invoiceComp = useOrderInvoice(props.order._id);
    fulfillmentComp.load.execute();
    invoiceComp.load.execute();
    return {
      fulfillmentComp,
      fulfillment: fulfillmentComp.fulfillment,
      invoice: invoiceComp.invoice,
      orderGetters,
      getVariantId: (item) => item.productConfiguration?.productVariantId ?? "",
      getProductSlug: (item) => item.productSlug ?? "",
    };
  },
};
</script>

<style scoped lang="scss">
.property {
  margin: 10px 0;
}

.product {
  &__properties {
    margin: var(--spacer-xl) 0 0 0;
  }
  &__property,
  &__action {
    font-size: var(--font-size--sm);
  }
  &__action {
    color: var(--c-gray-variant);
    font-size: var(--font-size--sm);
    margin: 0 0 var(--spacer-sm) 0;
    &:last-child {
      margin: 0;
    }
  }
  &__qty {
    color: var(--c-text);
  }
}
.products {
  --table-column-flex: 1;
  &__name {
    margin-right: var(--spacer-sm);
    @include for-desktop {
      --table-column-flex: 2;
    }
  }
}
.highlighted {
  box-sizing: border-box;
  width: 100%;
  background-color: var(--c-light);
  padding: var(--spacer-sm);
  --property-value-font-size: var(--font-size--base);
  --property-name-font-size: var(--font-size--base);
  &:last-child {
    margin-bottom: 0;
  }
  ::v-deep .sf-property__name {
    white-space: nowrap;
  }
  ::v-deep .sf-property__value {
    text-align: right;
  }
  &--total {
    margin-bottom: var(--spacer-sm);
  }
  @include for-desktop {
    padding: var(--spacer-xl);
    --property-name-font-size: var(--font-size--lg);
    --property-name-font-weight: var(--font-weight--medium);
    --property-value-font-size: var(--font-size--lg);
    --property-value-font-weight: var(--font-weight--semibold);
  }
}
</style>
