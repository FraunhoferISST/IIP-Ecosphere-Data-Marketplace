<template>
  <div class="fill-height">
    <v-carousel
      class="rounded-lg"
      show-arrows="hover"
      v-if="hasImages"
      height="300px"
      rounded="lg"
    >
      <v-carousel-item
        v-for="(image, i) in state.images"
        :key="i"
        :src="image.imageUrl"
        cover
      ></v-carousel-item>
    </v-carousel>
    <v-dialog v-model="dialog" max-width="1100px">
      <template #activator="{ props }">
        <component
          :is="hasImages ? 'div' : Card"
          v-bind="props"
          outline
          interactive
          :class="{ 'fill-height': !hasImages }"
          :style="{ 'border-style': hasImages ? 'none' : 'dashed' }"
        >
          <div
            class="d-flex justify-center align-center"
            :class="{ 'fill-height': !hasImages }"
          >
            <v-btn
              color="accent"
              variant="text"
              rounded="lg"
              flat
              append-icon="edit"
              :class="{ 'mt-2': hasImages }"
            >
              Edit images
            </v-btn>
          </div>
        </component>
      </template>
      <dialog-container>
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
        <template #action>
          <v-btn
            class="mr-6"
            variant="flat"
            rounded="lg"
            size="large"
            @click="dialog = false"
          >
            Cancel
          </v-btn>
          <v-btn
            class="mr-6"
            variant="flat"
            rounded="lg"
            size="large"
            color="success"
            @click="saveChanges"
          >
            Save changes
          </v-btn>
        </template>
      </dialog-container>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { Product, ProductVariant } from "@/types";
import Card from "~/components/Base/Card.vue";
import DialogContainer from "~/components/Base/DialogContainer.vue";
import { useToast } from "vue-toastification";
import { useProduct } from "~/composables/useProduct";

const { data } = defineProps<{
  data: Product | ProductVariant;
}>();

const { state, patch, sync } = useEditState<{ images: { imageUrl: string }[] }>(
  {
    images: (data.images ?? ["https://picsum.photos/300"]).map((i) => ({
      imageUrl: i,
    })),
  }
);

const dialog = ref(false);

const hasImages = computed(() => state.value.images.length > 0);
const isProduct = computed(() => "variants" in data);

const removeImage = (index: number) => {
  patch.value.images = patch.value.images.filter((image, i) => index !== i);
};

const saveChanges = () => {
  const composable = isProduct.value ? useProduct : useProductVariant;
  composable(data._id)
    .update.execute({
      images: patch.value.images
        .map(({ imageUrl }) => imageUrl)
        .filter((image) => image),
    })
    .then(() => {
      useToast().success("Images updated");
      sync();
      dialog.value = false;
    })
    .catch(useError().notify);
};
</script>

<style scoped></style>
