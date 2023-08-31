<template>
  <div class="card" :style="styles" :class="classes">
    <div class="card-title">
      <slot name="title">
        <h3>{{ title }}</h3>
      </slot>
    </div>
    <slot> </slot>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    title: {
      type: String,
    },
    color: {
      type: String,
      default: "#f3f3f3",
    },
    padding: {
      type: String,
      default: "pa-5",
    },
    interactive: {
      type: Boolean,
      default: false,
    },
    outline: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    styles() {
      return {
        "--card-color": this.color,
      };
    },
    classes() {
      return [
        this.padding,
        this.interactive && "interactive",
        this.outline && "outline",
      ];
    },
  },
};
</script>

<style scoped lang="scss">
$border-width: 2px;
.card {
  border-radius: $b-radius;
  position: relative;
  background-color: var(--card-color);
  border-color: var(--card-color);
  &.interactive {
    cursor: pointer;
    &:before {
      transition: opacity 0.3s;
      opacity: 0;
      content: "";
      display: block;
      width: calc(100% + 0px);
      height: calc(100% + 0px);
      position: absolute;
      background-color: transparent;
      border: $border-width $primary solid;
      border-radius: inherit;
      left: 0px;
      top: 0;
    }
    &:hover {
      &:before {
        opacity: 1;
      }
    }
  }
  &.outline {
    transition: 0.3s;
    &:before {
      display: none;
    }
    background-color: transparent;
    border: $border-width solid var(--card-color);
    &.interactive {
      &:hover {
        border-color: $primary;
      }
    }
  }
}
</style>
