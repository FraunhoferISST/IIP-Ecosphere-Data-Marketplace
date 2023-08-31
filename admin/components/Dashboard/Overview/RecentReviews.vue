<template>
  <div>
    <overview-heading>
      Recent reviews
      <template #link>
        <nuxt-link class="link" to="/reviews" v-if="reviews.length > 0">
          view all
        </nuxt-link>
      </template>
    </overview-heading>
    <data-viewer :loading="load.loading.value" :errors="load.error.value">
      <reviews-list :reviews="reviews.slice(0, 5)" v-if="reviews.length > 0" />
      <no-data v-else>No reviews yet</no-data>
    </data-viewer>
  </div>
</template>

<script setup lang="ts">
import DataViewer from "~/components/DataViewer.vue";
import OverviewHeading from "~/components/Dashboard/Overview/OverviewHeading.vue";
import ReviewsList from "~/components/Dashboard/Review/ReviewsList.vue";
import NoData from "~/components/Base/NoData.vue";

const { reviews, load } = useReviews();
load.execute();
</script>

<style scoped></style>
