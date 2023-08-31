<template>
  <div>
    <slot v-if="loading" name="loading">
      <div class="data-viewer-loader">
        <client-only>
          <ve-progress
            :progress="50"
            color="black"
            loading
            :empty-thickness="0"
            :thickness="1"
            :size="40"
          />
        </client-only>
      </div>
    </slot>
    <slot v-else-if="!error"> </slot>
    <slot v-else name="error">
      <v-alert color="error" variant="tonal">
        Some Error occurred
        <div>
          <b>{{ errorMessage }}</b>
        </div>
        <div>
          {{ error.code }}
        </div>
        <div>
          {{ errorStatusCode }}
        </div>
        <div>
          {{ errorDescription }}
        </div>
      </v-alert>
    </slot>
  </div>
</template>

<script>
export default {
  name: "DataViewer",
  props: {
    loading: {
      type: Boolean,
      default: true,
    },
    error: {
      default: false,
    },
  },
  computed: {
    errorMessage() {
      return (
        this.error?.response?.data?.message ?? this.error?.message ?? this.error
      );
    },
    errorDescription() {
      return this.error?.response?.data?.description;
    },
    errorStatusCode() {
      return this.error?.response?.data?.statusCode;
    },
  },
};
</script>

<style scoped lang="scss">
.data-viewer-loader {
  display: flex;
  align-content: center;
  justify-content: center;
}
</style>
