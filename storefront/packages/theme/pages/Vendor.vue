<template>
  <div id="vendor">
    <data-viewer :loading="load.loading.value" :error="load.error.value">
      <LazyHydrate when-idle>
        <div style="background-color: var(--c-light)" class="p-20 my-16">
          <h2>
            {{ shop.name }}
          </h2>
          <p>
            Shop description here {{ shop.description }}
          </p>
          <div style="height: 1px; background-color: lightgray" class="mt-10 mb-5"></div>
          <p class="text-slate-400 text-sm">
            "{{ shop.name }}" is a part of the IIP-Ecosphere ecosystem.
          </p>
        </div>
      </LazyHydrate>
      <LazyHydrate when-idle>
        <SfTabs :open-tab="1" class="product__tabs">
          <SfTab title="Details">
            <div>
              <div>
                <SfProperty
                  name="Currency"
                  :value="`${shop.currency.code}, ${shop.currency.symbol}`"
                  class="product__property my-3"
                >
                </SfProperty>
                <SfProperty
                  name="Language"
                  :value="shop.language"
                  class="product__property my-3"
                >
                </SfProperty>
              </div>
              <h4 class="my-4">Addresses</h4>
              <div>
                <address v-for="(address, i) in shop.addressBook" :key="i">
                  <div>{{address.fullName}}</div>
                  <div>{{address.address1}}</div>
                  <div>
                    <span>{{address.postal}}</span>
                    <span>{{address.city}}</span>
                  </div>
                  <div>
                    <span>{{address.country}}, </span>
                    <span>{{address.region}}</span>
                  </div>
                  <div class="mt-3">{{address.phone}}</div>
                </address>
              </div>
              <h4 class="my-4">Emails</h4>
              <div>
                <div v-for="(email, i) in shop.emails" :key="i">
                  <div>{{email.address}}</div>
                </div>
              </div>
              <div v-if="shop.invoiceDetails">
                <h4 class="my-4">Banking information</h4>
                <div>
                  <SfProperty
                    name="IBAN"
                    :value="formatIban(shop.invoiceDetails.iban)"
                    class="product__property my-3"
                  >
                  </SfProperty>
                  <SfProperty
                    name="BIC"
                    :value="shop.invoiceDetails.bic"
                    class="product__property my-3"
                  >
                  </SfProperty>
                  <SfProperty
                    name="Tax identity number"
                    :value="shop.invoiceDetails.taxIdentityNumber"
                    class="product__property my-3"
                  >
                  </SfProperty>
                </div>
              </div>
            </div>
          </SfTab>
          <SfTab title="Read reviews" v-if="shopId">
            <vendor-reviews :shop-id="shopId"/>
          </SfTab>
        </SfTabs>
      </LazyHydrate>
    </data-viewer>
  </div>
</template>
<script>
import {
  SfHero,
  SfProductCard,
  SfImage,
  SfHeading,
  SfArrow,
  SfButton,
  SfTabs,
  SfProperty,
  SfAddressPicker
} from "@storefront-ui/vue";
import LazyHydrate from "vue-lazy-hydration";
import {addBasePath} from "@vue-storefront/core";
import {useShop} from "@vue-storefront/iiepmarket";
import VendorReviews from "@/components/Vendor/VendorReviews";
import DataViewer from "@/components/DataViewer";

export default {
  name: "Home",
  components: {
    DataViewer,
    VendorReviews,
    SfHero,
    SfProductCard,
    SfImage,
    SfHeading,
    SfArrow,
    SfButton,
    LazyHydrate,
    SfTabs,
    SfProperty,
    SfAddressPicker,
  },
  setup() {
    const {shop, shopId, load} = useShop();

    load.execute();

    return {
      shopId,
      shop,
      load,
      addBasePath,
      formatIban: (iban = "") =>
        iban
          ? iban
            .trim()
            .match(/.{1,4}/g)
            .join(" ")
          : "",
    };
  },
};
</script>

<style lang="scss" scoped>
#vendor{
  min-height: 90vh;
}

.hero {
  margin: var(--spacer-xl) auto var(--spacer-lg);
  --hero-item-background-position: center;
  @include for-desktop {
    margin: var(--spacer-xl) auto var(--spacer-2xl);
  }

  ::v-deep .sf-hero__control {
    &--right, &--left {
      display: none;
    }
  }
}
</style>
