<template>
  <span
    :style="{ width: size, height: size, backgroundColor: color }"
    class="dot-divider bg-slate-500"
  ></span>
</template>

<script>
export default {
  name: "DotDivider",
  props: {
    size: {
      type: String,
      default: "4px",
    },
    color: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped>
.dot-divider {
  display: inline-block;
  height: 2px;
  width: 2px;
  border-radius: 50%;
}
</style>
