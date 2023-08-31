<template>
  <v-container fluid class="pa-0">
    <v-row>
      <v-col cols="12">
        <h2>Edit images</h2>
      </v-col>
      <v-col
        cols="12"
        class="d-flex"
        v-for="(image, i) in patch.images"
        :key="i"
      >
        <v-avatar rounded="0" v-if="image.imageUrl">
          <v-img :src="image.imageUrl" alt="John"></v-img>
        </v-avatar>
        <v-text-field
          class="mx-4"
          label="Image Url"
          variant="outlined"
          density="compact"
          type="url"
          hide-details
          v-model="image.imageUrl"
        ></v-text-field>
        <v-btn
          icon="delete"
          color="error"
          size="small"
          variant="text"
          @click="() => removeImage(i)"
        >
        </v-btn>
      </v-col>
      <v-col cols="12">
        <v-btn
          v-if="multiple ? true : patch.images.length < 1"
          color="accent"
          variant="text"
          rounded="lg"
          flat
          append-icon="add"
          @click="
            () =>
              patch.images.push({
                imageUrl: 'https://picsum.photos/300',
              })
          "
        >
          Add image
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
const { modelValue, multiple = true } = defineProps<{
  modelValue: string[] | string;
  multiple?: boolean;
}>();
const emit = defineEmits<{
  (e: "update:modelValue", val: string[] | string): void;
}>();

const initialValue = multiple
  ? (modelValue as string[])
  : [modelValue as string];

const { patch } = useEditState<{ images: { imageUrl: string }[] }>({
  images: (initialValue ?? []).map((i) => ({
    imageUrl: i,
  })),
});

watch(patch.value, () => {
  const images = patch.value.images
    .map(({ imageUrl }) => imageUrl)
    .filter((image) => image);
  emit("update:modelValue", multiple ? images : images[0]);
});

const removeImage = (index: number) => {
  patch.value.images = patch.value.images.filter((image, i) => index !== i);
};
</script>

<style scoped></style>
