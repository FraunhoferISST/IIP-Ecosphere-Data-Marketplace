<template>
<div>
  <h4 class="mb-4">
    Order Fulfillment
  </h4>
  <div v-for="(item, i) in fulfillment" :key="i">
    <div class="mb-4">
      <b>{{ item.variantTitle }}</b>
    </div>
    <div v-for="(dist,j) in getDistributionGroupDists(item.distributionsGroups)" :key="j">
      <div class="p-3 hover:bg-slate-50 cursor-pointer" @click="() => selectDist(dist)">
        {{ dist.title }}
        <span v-for="prop in getDistProps(dist)" :key="prop.key" style="font-size: 0.8rem">
          <span class="text-slate-500">
            <dot-divider class="mx-2 mb-1" size="2px"/>
            {{ prop.value }}
          </span>
        </span>
      </div>
    </div>
  </div>
  <SfModal v-model="modal" class="dist-modal">
    <h4 class="mb-6">
      {{selectedDist ? selectedDist.title : ''}}
    </h4>
    <div v-if="selectedDist">
      <div v-for="prop in getDistProps(selectedDist)" :key="prop.key">
        <SfProperty class="my-3" :name="prop.key" :value="prop.value"/>
      </div>
      <h5>
        Credentials
      </h5>
      <div>
        <div>
          <SfProperty class="my-3" name="Access URL" :value="selectedDist.accessUrl"/>
        </div>
        <SfProperty class="my-3" name="User" :value="selectedDist.user"/>
        <SfProperty class="my-3" name="Password" :value="selectedDist.password"/>
      </div>
    </div>
  </SfModal>
</div>
</template>

<script>
import {SfModal, SfProperty} from "@storefront-ui/vue";
import DotDivider from "~/components/Base/DotDivider";
import {ref} from "@nuxtjs/composition-api";
export default {
  name: "Fulfillment",
  components: {DotDivider, SfModal, SfProperty},
  props: {
    fulfillment: {
      type: Array,
      required: true,
    },
  },
  setup() {
    const modal = ref(false);
    const selectedDist = ref(null);
    return {
      modal,
      selectedDist,
      getDistributionGroupDists: (distGroups) => distGroups.map(({ distributions }) => distributions).flat(),
      getDistProps: (dist) => Object.entries(dist)
        .filter(([k, v]) => !["title", "user", "accessUrl", "password"].includes(k) && v)
        .map(([key, value]) => ({
          key,
          value,
        })),
      selectDist: (dist) => {
        selectedDist.value = dist;
        modal.value = true;
      },
      closeModal: () => modal.value = false,
    };
  },
};
</script>

<style lang="scss">
.dist-modal {
  .sf-modal__container{
    width: 65vw;
    min-width: 400px;
  }
}

</style>
