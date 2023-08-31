import { Context, useVSFContext } from "@vue-storefront/core";
import type { Review } from "@vue-storefront/iiepmarket-api";
import {UseRequest, useRequest} from "../useRequest";
import {ComputedRef, computed, ref} from "@nuxtjs/composition-api";

type ReviewsAggregation = {
    totalCount?: number
}
type NewReviewInput = {
    reviewRating: number
    reviewBody?: string
}
type NewProductReviewInput = {
    attributedProductId: string
} & NewReviewInput

type NewShopReviewInput = {
    attributedShopId: string
} & NewReviewInput

interface UseReviews {
    reviews: ComputedRef<Review[]>,
    reviewsAggregation: ComputedRef<ReviewsAggregation>,
    load: UseRequest,
    loadAggregation: UseRequest,
    addProductReview: UseRequest,
    addShopReview: UseRequest,
    canAddReview: UseRequest,
}

export const useReviews = (): UseReviews => {
  const context: Context = useVSFContext();
  const reviews = ref<Review[]>([]);
  const reviewsAggregation = ref<ReviewsAggregation>(null);

  const load = useRequest((query: object = {}) =>
    context.$iiepmarket.api.getReviews({
      ...query,
    })
      .then((response: Review[]) => {
        reviews.value = response;
      })
  );

  const loadAggregation = useRequest((query: object = {}) =>
    context.$iiepmarket.api.getReviewsAggregation({
      ...query,
    })
      .then((response: ReviewsAggregation) => {
        reviewsAggregation.value = response;
      })
  );

  const addProductReview = useRequest((review: NewProductReviewInput) =>
    context.$iiepmarket.api.addProductReview(review));

  const addShopReview = useRequest((review: NewShopReviewInput) =>
    context.$iiepmarket.api.addShopReview(review));

  const canAddReview = useRequest((attributedId: string) =>
    context.$iiepmarket.api.canAddReview({ attributedId }));

  return {
    reviews: computed(() => reviews.value),
    reviewsAggregation: computed(() => reviewsAggregation.value),
    load,
    loadAggregation,
    addProductReview,
    addShopReview,
    canAddReview,
  };
};
