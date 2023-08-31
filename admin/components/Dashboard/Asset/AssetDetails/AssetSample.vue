<template>
  <v-container>
    <v-row>
      <v-col>
        <reviews-aggregation />
        <reviews-aggregation
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import ReviewsAggregation from "~/components/Base/ReviewsAggregation.vue";

const { reviews } = useReviews();
</script>

<style scoped></style>
