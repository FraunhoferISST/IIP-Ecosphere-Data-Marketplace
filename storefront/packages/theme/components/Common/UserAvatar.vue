<template>
  <div class="user-avatar-container">
    <img :height="size" :width="size" class="user-avatar"
         src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50" alt="user avatar">
  </div>
</template>

<script>
export default {
  name: "UserAvatar",
  props: {
    size: {
      type: Number,
      default: 48,
    },
    src: {
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>
.user-avatar-container {
}
.user-avatar {
  border-radius: 50%;
}

</style>
