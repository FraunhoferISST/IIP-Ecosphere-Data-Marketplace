<template>
  <card class="reviews-aggregation pa-3 pa-md-12">
    <div class="d-block d-md-flex">
      <div class="text-center">
        <div>
          <ve-progress
            :progress="avgRatingPercentage"
            :size="150"
            :thickness="3"
            :empty-thickness="3"
          >
            <template #default="{ counterTick }">
              <span>
                <b
                  style="
                    font-size: 2.6rem;
                    color: rgb(var(--v-theme-slate-500));
                  "
                  >{{ avgRating }}
                </b>
                /
              </span>
              <span>5</span>
            </template>
            <template #legend-caption>
              <p style="font-size: 0.8rem">
                <span>Based on {{ aggregation.totalCount }} reviews</span>
              </p>
            </template>
          </ve-progress>
        </div>
        <v-rating
          density="compact"
          size="small"
          half-increments
          color="accent"
          readonly
          v-model="aggregation.averageRating"
        ></v-rating>
      </div>
      <div class="fill-width ml-md-12">
        <div v-for="bar in bars" :key="bar.rating">
          <div class="bar my-3">
            <span class="text-slate-500">{{ bar.rating }} Stars</span>
            <span class="bar-progress-container bg-slate-200 mt-1">
              <span
                class="bar-progress"
                :style="{ width: `${bar.progress}%` }"
              ></span>
            </span>
            <span v-if="bar.progress" class="bar-percent text-slate-500">
              {{ bar.progress.toFixed(0) }}%
            </span>
          </div>
        </div>
      </div>
    </div>
  </card>
</template>

<script setup lang="ts">
import type { ReviewsAggregation } from "../../../shared/types";
import Card from "~/components/Base/Card.vue";

const { aggregation } = defineProps<{
  aggregation: ReviewsAggregation;
}>();

const totalRatingsCount =
  aggregation.counts.length === 0
    ? 0
    : aggregation.counts
        .map(({ count }) => count)
        .reduce((acc, currentVal) => acc + currentVal);

const getRatingStats = (rating) =>
  aggregation.counts.find(({ rating: r }) => r === rating);

const bars = [1, 2, 3, 4, 5]
  .map((rating) => ({
    rating,
    count: getRatingStats(rating)?.count ?? 0,
    progress: ((getRatingStats(rating)?.count ?? 0) * 100) / totalRatingsCount,
  }))
  .reverse();

const avgRating = computed<string>(() => aggregation?.averageRating.toFixed(1));
const avgRatingPercentage = computed<number>(
  () => (parseInt(avgRating.value) * 100) / 5
);
</script>

<style scoped lang="scss">
.reviews-aggregation {
  span {
    font-size: 0.8rem;
    font-weight: bold;
    color: rgb(var(--v-theme-slate-400));
  }
}
.bar {
  display: grid;
  gap: 16px;
  grid-template-columns: 50px 1fr 30px;
}

.bar-progress-container {
  display: block;
  height: 8px;
  position: relative;
  border-radius: 10px;
  .bar-progress {
    border-radius: 10px;
    position: absolute;
    display: block;
    height: 100%;
    left: 0;
    bottom: 0;
    background-color: #ffcc48;
  }
}
</style>
