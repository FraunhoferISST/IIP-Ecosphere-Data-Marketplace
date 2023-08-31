<template>
  <div>
    <SfDivider/>
    <div class="py-8 flex justify-center">
      <review-form :review.sync="review" :done="reviewCreated">
        <template #action="{ valid, close }">
          <button
            class="color-primary sf-button my-6"
            @click="() => submitReview(close)"
            :disabled="!valid"
            :loading="addShopReview.loading.value"
          >
            Submit review
          </button>
          <SfAlert type="danger" v-if="addShopReview.error.value">
            <template #message>
              <p class="pl-4">
                {{errorMessage}}
              </p>
            </template>
          </SfAlert>
        </template>
      </review-form>
    </div>
    <SfDivider/>
  </div>
</template>

<script>
import {SfAlert, SfDivider} from "@storefront-ui/vue";

import ReviewForm from "~/components/Base/ReviewForm";
import {useReviews} from "@vue-storefront/iiepmarket";
import {computed, ref} from "@nuxtjs/composition-api";
export default {
  name: "VendorReviewForm",
  components: {ReviewForm, SfAlert, SfDivider},
  props: {
    shopId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { addShopReview } = useReviews();
    const review = ref({ reviewRating: null, reviewBody: ""});
    const reviewCreated = ref(false);
    return {
      review,
      reviewCreated,
      addShopReview,
      errorMessage: computed(()=> addShopReview.error.value?.message ?? "Some error occurred"),
      submitReview: (closeMethod) => addShopReview.execute({ ...review.value, attributedShopId: props.shopId })
        .then(() => {
          closeMethod();
          reviewCreated.value = true;
        }),
    };
  },
};
</script>

<style scoped>

</style>
