<template>
  <v-avatar :size="size">
    <img v-if="imageUrl" :src="imageUrl" alt="Entity Avatar" />
    <span
      v-else
      class="entity-avatar-placeholder d-flex justify-center align-center"
    >
      <span>
        {{ entityAvatarPlaceholderText }}
      </span>
    </span>
  </v-avatar>
</template>

<script>
import {computed} from "@nuxtjs/composition-api";
export default {
  name: "EntityAvatar",
  props: {
    entityId: {
      type: String,
      required: true,
    },
    entityTitle: {
      type: String,
      default: "",
    },
    imageUrl: {
      type: String,
      required: false,
      default: "https://s3-eu-west-1.amazonaws.com/commercetools-maximilian/products/081223_1_large.jpg",
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
        props.entityTitle[0]?.toUpperCase()
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
