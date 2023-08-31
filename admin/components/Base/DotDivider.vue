<template>
  <span
    :style="{ width: size, height: size, backgroundColor: color }"
    class="dot-divider"
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
  background-color: $text-slate-400;
  display: inline-block;
  height: 2px;
  width: 2px;
  border-radius: 50%;
}
</style>
