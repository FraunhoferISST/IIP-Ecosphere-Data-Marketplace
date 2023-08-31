<template>
<div>
  <data-viewer :loading="loadAggregation.loading.value" :error="loadAggregation.error.value" v-if="reviews.length > 0 && reviewsAggregation">
    <div class="flex justify-center">
      <reviews-aggregation style="max-width: 800px; min-width: 400px" :aggregation="reviewsAggregation"/>
    </div>
  </data-viewer>
  <data-viewer :loading="load.loading.value" :error="load.error.value">
    <div class="mb-10" v-if="showReviewForm && (!canAddReview.loading.value && !canAddReview.error.value)">
      <product-review-form :product-id="productId"/>
    </div>
    <div v-if="reviews.length > 0">
      <div class="mb-16" v-for="review in reviews" :key="review._id">
        <SfReview
          :author="review.account.name"
          :date="review.createdAt"
          :message="review.reviewBody || ''"
          :rating="review.reviewRating"
          :maxRating="5"
          :charLimit="200"
          readMoreText="More"
          hideFullText=""
        />
      </div>
    </div>
    <div v-else>
      <SfAlert message="Low in stock" type="info" >
        <template #message>
          <p class="pl-4">
            No one has left a review for this offer yet.
          </p>
        </template>
      </SfAlert>
    </div>
  </data-viewer>
</div>
</template>

<script>
import DataViewer from "@/components/DataViewer";
import {SfReview, SfAlert} from "@storefront-ui/vue";
import {useReviews} from "@vue-storefront/iiepmarket";
import ProductReviewForm from "@/components/Catalog/ProductReviewForm";
import ReviewsAggregation from "~/components/Base/ReviewsAggregation";
import {ref} from "@nuxtjs/composition-api";
export default {
  name: "ProductReviews",
  components: {ReviewsAggregation, ProductReviewForm, DataViewer, SfReview, SfAlert},
  props: {
    productId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const {reviews, load, reviewsAggregation, loadAggregation, canAddReview } = useReviews();

    const showReviewForm = ref(false);

    load.execute({ attributedProductId: props.productId });
    loadAggregation.execute({ attributedProductId: props.productId });
    canAddReview.execute(props.productId).then(result => showReviewForm.value = result).catch(e => console.error(e));

    return {
      showReviewForm,
      reviews,
      reviewsAggregation,
      load,
      loadAggregation,
      canAddReview,
    };
  },
};
</script>

<style scoped>

</style>
