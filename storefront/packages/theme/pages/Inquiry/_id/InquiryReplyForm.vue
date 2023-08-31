<template>
  <div class="mt-16">
    <SfAlert type="info" v-if="replySend">
      <template #message>
        <p class="pl-4">
          Your suggestion was sent successfully!
        </p>
      </template>
    </SfAlert>
    <template v-else>
      <SfTabs>
        <SfTab title="Reply to inquiry">
          <div>
            <SfCheckbox
                     label="Include offers"
                     v-model="includeOffers"
            >
            </SfCheckbox>
            <p class="mb-10 ml-8">
              Choose fitting items from your catalog and add them directly to your offer. This will help the customer to
              decide faster on a purchase, if there is something suitable that matches his requirements.
            </p>
            <div v-if="includeOffers">
              <SfInput
                v-model="searchInput"
                @input="debouncedSearch"
                label="Search in your catalog"
                required
              />
            </div>
            <div v-if="includeOffers">
              <div class="grid gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-3" v-if="items.length > 0">
                <div v-for="variant in items" :key="variant._id">
                  <div
                    class="transition border-solid	border-2 border-slate-50	flex flex-row gap-4 p-3 hover:bg-slate-50 cursor-pointer"
                    :class="{'bg-slate-200': isVariantSelected(variant._id), 'border-slate-200': isVariantSelected(variant._id) }"
                    @click="() => toggleVariantSelection(variant._id, variant.productCatalogId)">
                    <div class="w-full">
                      <h5 class="mt-0 mb-1 flex flex-row justify-between">
                        <span>
                          <SfIcon
                            v-if="isVariantSelected(variant._id)"
                            color="green"
                            icon="check"
                            size="xs"
                            style="position: absolute"
                            class="inline-block"
                          />
                        <span :class="{'ml-6': isVariantSelected(variant._id)}">
                          {{ variant.title }}
                        </span>
                        </span>
                        <span>{{ variant.pricing.displayPrice }}</span>
                      </h5>
                      <div>
                        <span class="text-xs text-slate-500 decoration-transparent">
                          {{ variant.optionTitle }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else>
                <div class="p-4 text-sm text-gray-700 bg-gray-100 rounded-lg dark:bg-gray-700 dark:text-gray-300" role="alert">
                  It looks like there are no offers that could be find
                </div>
              </div>
            </div>
            <div class="mt-16">
              <SfTextarea v-model="message" label="Leave a message" class="sf-area" rows="6" style="width: 100%"
                          cols="40" placeholder="You can leave a message within your offer and provide a contact information"></SfTextarea>
            </div>
          </div>
        </SfTab>
      </SfTabs>
      <div class="flex justify-end">
        <SfButton :loading="reply.loading.value" @click="replyToOffer" :disabled="!message">
          {{ $t('Apply offer') }}
        </SfButton>
      </div>
    </template>
  </div>

</template>
<script>
import {
  SfHeading,
  SfAddToCart,
  SfTabs,
  SfInput,
  SfTextarea,
  SfButton,
  SfCheckbox,
  SfRadio,
  SfIcon,
  SfAlert
} from "@storefront-ui/vue";

import {
  useCatalogItems,
  useInquiry
} from "@vue-storefront/iiepmarket";
import DataViewer from "~/components/DataViewer";
import InquiryCard from "~/components/Inquiries/InquiryCard";
import {ref} from "@nuxtjs/composition-api";
import _ from "lodash";

export default {
  name: "InquiryReplyForm",
  components: {
    InquiryCard,
    DataViewer,
    SfHeading,
    SfIcon,
    SfAddToCart,
    SfTabs,
    SfButton,
    SfInput,
    SfTextarea,
    SfAlert,
    SfRadio,
    SfCheckbox,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { reply } = useInquiry(props.id);
    const {items, load} = useCatalogItems();

    const replySend = ref(false);
    const includeOffers = ref(false);
    const searchInput = ref("");
    const message = ref("");
    const selectedVariants = ref([]);

    const selectVariant = (variantId, productId) => {
      selectedVariants.value.push({variantId, productId});
    };
    const deselectVariant = (variantId) => {
      selectedVariants.value = selectedVariants.value.filter(({variantId: alreadySelectedVariantId}) => variantId !== alreadySelectedVariantId);
    };
    const isVariantSelected = (variantId) => {
      return selectedVariants.value.find(({variantId: alreadySelectedVariantId}) => variantId === alreadySelectedVariantId);
    };
    const toggleVariantSelection = (variantId, productId) => {
      if (isVariantSelected(variantId)) {
        return deselectVariant(variantId);
      }
      selectVariant(variantId, productId);
    };

    const replyToOffer = () => reply.execute({ offers: selectedVariants.value, message: message.value})
      .then(() => replySend.value = true);

    const searchItems = () => load.execute({ query: searchInput.value });
    searchItems();
    const debouncedSearch = _.debounce(searchItems, 500);
    return {
      replySend,
      message,
      searchInput,
      includeOffers,
      load,
      items,
      reply,
      debouncedSearch,
      toggleVariantSelection,
      isVariantSelected,
      replyToOffer,
    };
  },
};
</script>

<style lang="scss">
</style>
