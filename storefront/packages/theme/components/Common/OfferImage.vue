<template>
  <img v-if="src" class="w-10 h-10" :src="src" alt="Default avatar">
  <div v-else-if="initials" class="inline-flex overflow-hidden relative justify-center items-center w-10 h-10 bg-gray-100 rounded-m dark:bg-gray-600">
    <span class="font-medium text-gray-600 dark:text-gray-300">{{ initials }}</span>
  </div>
</template>

<script>
export default {
  name: "OfferImage",
  props: {
    src: {
      type: String,
      required: true,
    },
    initials: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped>

</style>
