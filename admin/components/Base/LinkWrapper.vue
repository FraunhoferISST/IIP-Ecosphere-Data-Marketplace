<template>
  <NuxtLink :to="path" v-if="id">
    <slot></slot>
  </NuxtLink>
  <div v-else>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "LinkWrapper",
  props: ["id", "path"],
};
</script>

<style scoped></style>
