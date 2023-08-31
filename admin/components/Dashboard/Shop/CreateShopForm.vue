<template>
  <form>
    <v-card background="#f3f3f3">
      <v-card-header>
        <h2 class="sf-banner__title">Create your shop</h2>
      </v-card-header>
      <v-card-content>
        <p class="sf-banner__description" style="display: block">
          First you have to create a shop where you can place you offers. Give
          it a name and a concise description. You can edit this data at ay time
        </p>
        <SfInput v-model="name" name="name" label="Shop name" />
        <SfInput v-model="description" name="description" label="Description" />
        <SfAlert v-if="!createLoading" type="danger">
          <template #message>
            <p>Error occurred. {{ createError }}</p>
          </template>
        </SfAlert>
      </v-card-content>
      <template #button>
        <SfButton
          style="height: 100%"
          @click="createNewShop"
          :disabled="!name || !description"
        >
          Create shop
        </SfButton>
      </template>
    </v-card>
  </form>
</template>

<script>
export default {
  name: "CreateShopForm",
  setup() {
    const name = ref("");
    const description = ref("");
    const { create, createLoading, createError } = useShop();
    return {
      name,
      description,
      createLoading,
      createError,
      createNewShop: () =>
        create({ name: name.value, description: description.value }),
    };
  },
};
</script>

<style scoped></style>
