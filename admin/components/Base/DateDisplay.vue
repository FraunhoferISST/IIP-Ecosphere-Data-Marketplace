<template>
  <span class="date-display">
    {{ dateString }}
  </span>
</template>

<script>
import { format } from "date-fns";
export default {
  name: "DateDisplay",
  props: {
    date: {
      type: [String, Date],
      required: true,
    },
    format: {
      type: String,
      default: "dd.MM.yyy HH:mm",
    },
  },
  computed: {
    dateString() {
      if (!this.date) {
        return "N/A";
      }
      return format(new Date(this.date), this.format);
    },
  },
};
</script>

<style scoped lang="scss">
.date-display {
  //@include font-style(0.85rem, $font_header, bold, $font_secondary_color);
}
</style>
