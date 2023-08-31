<template>
  <div>
    <overview-heading>
      Recent inquiries
      <template #link>
        <nuxt-link class="link" to="/inquiries" v-if="inquiries.length > 0">
          view all
        </nuxt-link>
      </template>
    </overview-heading>
    <data-viewer :loading="load.loading.value" :errors="load.error.value">
      <inquiries-list
        :inquiries="inquiries.slice(0, 5)"
        v-if="inquiries.length > 0"
      />
      <no-data v-else>No inquiries yet</no-data>
    </data-viewer>
  </div>
</template>

<script setup lang="ts">
import DataViewer from "~/components/DataViewer.vue";
import OverviewHeading from "~/components/Dashboard/Overview/OverviewHeading.vue";
import InquiriesList from "~/components/Dashboard/Inquiry/InquiriesList.vue";
import NoData from "~/components/Base/NoData.vue";

const { inquiries, load } = useInquiries();
load.execute();
</script>

<style scoped></style>
