<template>
  <card outline>
    <div class="review-head d-flex justify-space-between align-center">
      <div class="d-flex align-center">
        <account-mini-card :account="review.account" />
        <date-display
          class="ml-2"
          :date="review.createdAt"
          format="dd.MM.yyy"
          style="color: rgb(var(--v-theme-slate-400)); font-weight: bold"
        />
      </div>
      <v-rating
        density="compact"
        size="x-small"
        color="warning"
        readonly
        v-model="review.reviewRating"
      ></v-rating>
    </div>
    <p class="text-slate-500 mt-4">
      {{ review.reviewBody }}
    </p>
  </card>
</template>

<script setup lang="ts">
import Card from "~/components/Base/Card.vue";
import { Review } from "../../../shared/types";
import DateDisplay from "~/components/Base/DateDisplay.vue";
import AccountMiniCard from "~/components/Base/AccountMiniCard.vue";
import DotDivider from "~/components/Base/DotDivider.vue";

const { review } = defineProps<{
  review: Review;
}>();
</script>

<style scoped lang="scss">
.review-head {
  font-size: 0.8rem;
}
</style>
