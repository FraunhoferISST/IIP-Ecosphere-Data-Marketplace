<template>
  <div class="offer-card hover:bg-slate-50 cursor-pointer">
    <SfLink style="text-decoration: none" :link="localePath(`/p/${productGetters.getId(offer)}/${productGetters.getSlug(offer)}`)">
      <div class="offer-card-header">
        <div class="flex justify-between">
          <div class="flex items-center">
            <div v-if="horizontal" class="mr-4">
              <offer-image :src="avatar" :initials="offerInitials"/>
            </div>
            <h4 class="font-normal">
              <span>
                {{productGetters.getName(offer)}}
              </span>
              <span class="block text-slate-500 font-normal text-sm">
                {{ offer.productTitle}}
              </span>
            </h4>
          </div>
          <div v-if="!horizontal">
            <offer-image :src="avatar" :initials="offerInitials"/>
          </div>
          <div v-else>
            <template v-if="isFree">
              <div class="mt-4">
                <span class="bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900">
                  Free
                </span>
              </div>
            </template>
            <template v-else-if="hasCustomQuotes">
              <div class="mt-4">
                <span class="bg-gray-100 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                  Custom quotes
                </span>
              </div>
            </template>
            <div class="sf-price" v-else>
              <span class="sf-price__regular display-none">$200.00</span>
              <del class="sf-price__old">{{ regularPrice }}</del>
              <ins class="sf-price__special">{{ specialPrice }}</ins>
            </div>
            <div v-if="offer.avgRating && horizontal" class="flex mt-2">
              <SfRating
                class="sf-product-card__rating"
                :max="5"
                :score="offer.avgRating"
              />
              <span class="text-xs inline-block ml-1">({{ offer.reviewsTotalCount || 0 }})</span>
            </div>
          </div>
        </div>
        <div class="my-2" v-if="productTags.length > 0">
        <span v-for="tag in productTags" :key="tag" class="bg-gray-100 text-gray-500 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
          {{tag}}
        </span>
        </div>
      </div>
      <div class="offer-description mt-4 text-slate-600" v-if="offer.productDescription">
        <p class="font-light">
          {{ description }}
        </p>
      </div>
      <div class="offer-option" v-if="horizontal">
        <SfProperty
          class="desktop-only"
          :name="offer.attributeLabel"
          :value="offer.optionTitle"
          style="margin: 0 0 1rem 0;"
        />
      </div>
      <div class="offer-price mt-4 flex justify-between relative" v-if="!horizontal">
        <div>
          <template v-if="isFree">
            <div class="mt-4">
            <span class="bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900">
              Free
            </span>
            </div>
          </template>
          <template v-else-if="hasCustomQuotes">
            <div class="mt-4">
            <span class="bg-gray-100 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
              Custom quotes
            </span>
            </div>
          </template>
          <div class="sf-price" v-else>
            <del class="sf-price__old">{{ regularPrice }}</del>
            <ins class="sf-price__special">{{ specialPrice }}</ins>
          </div>
        </div>
        <div class="absolute" style="right: 0; bottom: 0; z-index: 10" v-if="isAuthenticated">
          <SfCircleIcon
            class="add-to-cart-circle-btn"
            :aria-label="`Add to Cart`"
            :has-badge="true"
            :disabled="false"
            @click.stop.prevent="onAddToCart"
          >
            <span class="sf-product-card__add-button--icons">
              <transition
                v-if="!isAddingToCart"
                name="sf-pulse"
                mode="out-in"
              >
                <slot name="add-to-cart-icon">
                  <SfIcon
                    key="add_to_cart"
                    icon="add_to_cart"
                    size="20px"
                    color="white"
                  />
                </slot>
              </transition>
              <transition v-else name="sf-pulse" mode="out-in">
                <slot name="adding-to-cart-icon">
                  <SfIcon
                    key="added_to_cart"
                    icon="added_to_cart"
                    size="20px"
                    color="white"
                  />
                </slot>
              </transition>
            </span>
          </SfCircleIcon>
        </div>
      </div>
      <div v-if="offer.avgRating && !horizontal" class="flex">
        <SfRating
          class="sf-product-card__rating"
          :max="5"
          :score="offer.avgRating"
        />
        <span class="text-xs inline-block ml-1">({{ offer.reviewsTotalCount || 0 }})</span>
      </div>
      <div v-if="isAuthenticated && horizontal" class="flex justify-end">
        <SfAddToCart
          v-model="productQuantity"
          @click.stop.prevent="() => addItemToCart.execute(offer, productQuantity)">
          <template #quantity-select-input>
            <span></span>
          </template>
        </SfAddToCart>
      </div>
    </SfLink>
  </div>
</template>

<script>
import {
  SfButton,
  SfIcon,
  SfProductCard,
  SfProductCardHorizontal,
  SfRating,
  SfCircleIcon,
  SfAddToCart,
  SfLink,
  SfQuantitySelector,
  SfProperty
} from "@storefront-ui/vue";
import { addBasePath } from "@vue-storefront/core";
import {useCart, productGetters, useUser} from "@vue-storefront/iiepmarket";
import {computed, ref} from "@nuxtjs/composition-api";
import OfferImage from "~/components/Common/OfferImage";

export default {
  name: "OfferCard",
  components: {
    OfferImage,
    SfButton,
    SfProperty,
    SfIcon,
    SfProductCard,
    SfCircleIcon,
    SfRating,
    SfLink,
    SfProductCardHorizontal,
    SfQuantitySelector,
    SfAddToCart,
  },
  props: {
    offer: {
      type: Object,
      required: true,
    },
    horizontal: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const { add: addItemToCart, isInCart } = useCart();
    const { isAuthenticated } = useUser();

    const productQuantity = ref(1);
    const isAddingToCart = ref(false);

    return {
      productQuantity,
      productGetters,
      productTags: computed(() => [...props.offer.distributions.map(({ type }) => type)]),
      avatar: computed(() => productGetters.getCoverImage(props.offer)),
      specialPrice: computed(() => props.offer.pricing.displayPrice),
      isFree: computed(() => props.offer.priceModel?.type === "free"),
      hasCustomQuotes: computed(() => props.offer.priceModel?.type === "customQuotes"),
      regularPrice: computed(() => props.offer.pricing.compareAtPrice?.displayAmount),
      description: computed(() => `${props.offer.productDescription?.slice(0, props.horizontal ? 200 : 70) ?? ""}...`),
      addItemToCart,
      isAddingToCart,
      isAuthenticated,
      offerInitials: computed(() => productGetters.getName(props.offer)?.[0] ?? ""),
      isInCart,
      addBasePath,
      onAddToCart: () => {
        isAddingToCart.value = true;
        setTimeout(() => {
          isAddingToCart.value = false;
        }, 1000);
        addItemToCart.execute(props.offer, 1);
      },
    };
  },
};
</script>

<style scoped lang="scss">
.offer-card {
  &:hover {
    .add-to-cart-circle-btn {
      opacity: 1;
    }
  }
}
.add-to-cart-circle-btn {
  transition: opacity 0.3s;
  opacity: 0;
}

</style>
