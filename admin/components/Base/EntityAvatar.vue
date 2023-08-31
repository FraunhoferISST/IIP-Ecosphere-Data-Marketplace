<template>
  <v-avatar :size="size" color="slate-400" variant="tonal">
    <v-img v-if="imageUrl" :src="imageUrl" alt="Entity Avatar" />
    <span v-else>
      {{ entityAvatarPlaceholderText }}
    </span>
  </v-avatar>
</template>

<script>
export default {
  name: "EntityAvatar",
  props: {
    entityTitle: {
      type: String,
      default: "",
    },
    imageUrl: {
      type: String,
      required: false,
      default: "",
    },
    size: {
      type: [String, Number],
      required: false,
      default: 32,
    },
  },
  setup(props) {
    return {
      entityAvatarPlaceholderText: computed(() =>
        (props?.entityTitle ?? "")[0]?.toUpperCase()
      ),
    };
  },
};
</script>

<style scoped lang="scss">
.entity-avatar-placeholder {
  height: 100%;
  width: 100%;
  display: block;
  //background-color: $bg_card_secondary;
}
</style>
