import { useRequest } from "~/composables/useRequest";
import type { Review, ReviewsAggregation } from "~/types";
import type { UseAsyncState } from "~/types/composables";
import type { ComputedRef } from "@vue/runtime-core";

export const useReviews = (): {
  reviews: ComputedRef<Review[]>;
  reviewsAggregation: ComputedRef<ReviewsAggregation>;
  load: UseAsyncState<object, void>;
  loadAggregation: UseAsyncState<object, void>;
} => {
  const { $api: api } = useNuxtApp();
  const reviews = ref<Review[]>([]);
  const reviewsAggregation = ref<ReviewsAggregation>(null);

  const load = useRequest<object, void>((query: object = {}) =>
    api
      .handle("getReviews", {
        ...query,
      })
      .then((response: Review[]) => {
        reviews.value = response;
      })
  );

  const loadAggregation = useRequest<object, void>((query: object = {}) =>
    api
      .handle("getReviewsAggregation", {
        ...query,
      })
      .then((response: ReviewsAggregation) => {
        reviewsAggregation.value = response;
      })
  );

  return {
    reviews: computed(() => reviews.value),
    reviewsAggregation: computed(() => reviewsAggregation.value),
    load,
    loadAggregation,
  };
};
