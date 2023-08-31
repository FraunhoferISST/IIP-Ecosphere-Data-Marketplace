<template>
<div>
  <slot v-if="loading" name="loading">
    <div class="data-viewer-loader">
      <client-only>
        <vue-ellipse-progress :progress="50" color="black" loading :empty-thickness="0" :thickness="1" :size="40"/>
      </client-only>
    </div>
  </slot>
  <slot v-else-if="error" name="error">
    <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
      <h4 class="mb-4">
        Error occurred
      </h4>
      {{ error.message || error }}
    </div>
  </slot>
  <slot v-else>

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
};
</script>

<style scoped lang="scss">
.data-viewer-loader {
  display: flex;
  align-content: center;
  justify-content: center;
}

</style>
