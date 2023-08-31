<template>
  <data-viewer :loading="load.loading.value" style="min-height: 80vh">
    <div class="inquiry-card mt-16" v-if="inquiry">
      <div class="flex justify-between">
        <h4>
          {{ inquiry.title }}
        </h4>
        <div class="flex items-center" v-if="inquiry.desiredPricing">
         <span class="font-bold mr-2">
           {{ $t("Desired pricing") }}:
         </span>
          <span class="sf-price__regular">
          {{ inquiry.desiredPricing }}
        </span>
        </div>
      </div>
      <p class="my-8 text-slate-500">
        {{ inquiry.description }}
      </p>
      <div class="mt-10">
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
        <SfProperty
          v-if="inquiry.categories"
          class="desktop-only"
          name="Categories"
          :value="inquiry.categories.join(', ')"
          style="margin: 0 0 1rem 0;"
        />
        <SfProperty
          v-if="inquiry.expectedConsumptionVolume"
          class="desktop-only"
          name="Expected consumption volume"
          :value="inquiry.expectedConsumptionVolume"
          style="margin: 0 0 1rem 0;"
        />
        <SfProperty
          v-if="inquiry.licenses"
          class="desktop-only"
          name="Acceptable licenses"
          :value="inquiry.licenses"
          style="margin: 0 0 1rem 0;"
        />
      </div>
      <div class="mt-16 flex justify-between">
        <div>
          <span class="text-slate-500">Issued from </span>
          <span class="mx-1">{{ inquiryCreatorName }}</span>
          <span class="text-slate-500">at </span>
          <date-display class="mx-1" :date="inquiry.createdAt" format="dd.MM.yyy"/>
          <span v-if="inquiry.expirationDate">
            <dot-divider class="mb-1 mx-3"/>
            <span class="text-slate-500">expires at </span>
            <span>
              <date-display class="mx-1" :date="inquiry.expirationDate" format="dd.MM.yyy"/>
            </span>
          </span>
        </div>
        <div class="text-slate-500">
          <span>Replies: <b>{{inquiry.repliesCount}}</b></span>
        </div>
      </div>
      <inquiry-reply-form :id="inquiry._id" v-if="isAuthenticated"/>
      <div v-else class="py-10">
        <div class="p-4 text-sm text-gray-700 bg-gray-100 rounded-lg dark:bg-gray-700 dark:text-gray-300" role="alert">
          You must be logged in to reply to the inquiries
        </div>
      </div>
    </div>
  </data-viewer>
</template>
<script>
import {
  SfProperty,
  SfHeading,
  SfPrice,
  SfAddToCart,
  SfTabs,
  SfGallery,
  SfIcon,
  SfImage,
  SfBreadcrumbs,
  SfButton
} from "@storefront-ui/vue";

import RelatedProducts from "~/components/RelatedProducts.vue";
import {computed, useRoute} from "@nuxtjs/composition-api";
import {
  useInquiry, useUser
} from "@vue-storefront/iiepmarket";
import LazyHydrate from "vue-lazy-hydration";
import DataViewer from "~/components/DataViewer";
import VariantPicker from "@/components/Catalog/VariantPicker";
import DotDivider from "@/components/Base/DotDivider";
import ProductReviews from "@/components/Catalog/ProductReviews";
import DateDisplay from "~/components/Base/DateDisplay";
import InquiryReplyForm from "@/pages/Inquiry/_id/InquiryReplyForm";

export default {
  name: "Inquiry",
  transition: "fade",
  components: {
    InquiryReplyForm,
    DateDisplay,
    ProductReviews,
    DotDivider,
    VariantPicker,
    DataViewer,
    SfProperty,
    SfHeading,
    SfPrice,
    SfAddToCart,
    SfTabs,
    SfGallery,
    SfIcon,
    SfImage,
    SfBreadcrumbs,
    SfButton,
    RelatedProducts,
    LazyHydrate,
  },
  setup() {
    const route = useRoute();
    const {inquiry, load} = useInquiry(route.value.params.id);
    const { isAuthenticated } = useUser();

    load.execute();
    return {
      inquiry,
      load,
      isAuthenticated,
      inquiryCreatorName: computed(() => `${inquiry.value?.account?.firstName} ${inquiry.value?.account?.lastName}`),
    };
  },
};
</script>

<style lang="scss" scoped>
::v-deep .sf-gallery__thumb {
  .sf-image, .sf-image--placeholder {
    width: 80px !important;
    height: 80px !important;
  }
}

::v-deep .sf-gallery__big-image .sf-image {
  width: 100% !important;
  height: 100% !important
}

#product {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1272px;
    margin: 0 auto;
  }
}

.product {
  &__header {
    --heading-title-color: var(--c-link);
    --heading-title-font-weight: var(--font-weight--bold);
    --heading-padding: 0;
    margin: 0 var(--spacer-sm);
    display: flex;
    justify-content: space-between;
    @include for-desktop {
      --heading-title-font-weight: var(--font-weight--semibold);
      margin: 0 auto;
    }
  }

  &__drag-icon {
    animation: moveicon 1s ease-in-out infinite;
  }

  &__price-and-rating {
    margin: 0 var(--spacer-sm) var(--spacer-base);
    align-items: center;
    @include for-desktop {
      display: flex;
      justify-content: space-between;
      margin: var(--spacer-sm) 0 var(--spacer-lg) 0;
    }
  }

  &__count {
    @include font(
        --count-font,
        var(--font-weight--normal),
        var(--font-size--sm),
        1.4,
        var(--font-family--secondary)
    );
    color: var(--c-text);
    text-decoration: none;
    margin: 0 0 0 var(--spacer-xs);
  }

  &__description {
    @include font(
        --product-description-font,
        var(--font-weight--light),
        var(--font-size--base),
        1.6,
        var(--font-family--primary)
    );
  }

  &__select-size {
    margin: 0 var(--spacer-sm);
    @include for-desktop {
      margin: 0;
    }
  }

  &__colors {
    @include font(
        --product-color-font,
        var(--font-weight--normal),
        var(--font-size--lg),
        1.6,
        var(--font-family--secondary)
    );
    display: flex;
    align-items: center;
    margin-top: var(--spacer-xl);
  }

  &__color-label {
    margin: 0 var(--spacer-lg) 0 0;
  }

  &__color {
    margin: 0 var(--spacer-2xs);
  }

  &__add-to-cart {
  }

  &__guide,
  &__compare,
  &__save {
    display: block;
    margin: var(--spacer-xl) 0 var(--spacer-base) auto;
  }

  &__compare {
    margin-top: 0;
  }

  &__tabs {
    --tabs-title-z-index: 0;
    margin: var(--spacer-lg) auto var(--spacer-2xl);
    --tabs-title-font-size: var(--font-size--lg);
    @include for-desktop {
      margin-top: var(--spacer-2xl);
    }
  }

  &__property {
    &__button {
      --button-font-size: var(--font-size--base);
    }
  }

  &__review {
    padding-bottom: 24px;
    border-bottom: var(--c-light) solid 1px;
    margin-bottom: var(--spacer-base);
  }

  &__additional-info {
    color: var(--c-link);
    @include font(
        --additional-info-font,
        var(--font-weight--light),
        var(--font-size--sm),
        1.6,
        var(--font-family--primary)
    );

    &__title {
      font-weight: var(--font-weight--normal);
      font-size: var(--font-size--base);
      margin: 0 0 var(--spacer-sm);

      &:not(:first-child) {
        margin-top: 3.5rem;
      }
    }

    &__paragraph {
      margin: 0;
    }
  }

  &__gallery {
    flex: 1;
  }
}

.breadcrumbs {
  margin: var(--spacer-base) auto var(--spacer-lg);
}

@keyframes moveicon {
  0% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(0, 30%, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}
</style>
