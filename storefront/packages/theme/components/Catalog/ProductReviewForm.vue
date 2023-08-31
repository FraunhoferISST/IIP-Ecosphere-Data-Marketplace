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
            :loading="addProductReview.loading.value"
          >
            Submit review
          </button>
          <SfAlert type="danger" v-if="addProductReview.error.value">
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
  name: "ProductReviewForm",
  components: {ReviewForm, SfAlert, SfDivider},
  props: {
    productId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { addProductReview } = useReviews();
    const review = ref({ reviewRating: null, reviewBody: ""});
    const reviewCreated = ref(false);
    return {
      review,
      reviewCreated,
      addProductReview,
      errorMessage: computed(()=> addProductReview.error.value?.message ?? "Some error occurred"),
      submitReview: (closeMethod) => addProductReview.execute({ ...review.value, attributedProductId: props.productId })
        .then(() => {
          closeMethod();
          reviewCreated.value = true;
        })
        .catch(() => {}),
    };
  },
};
</script>

<style scoped>

</style>
