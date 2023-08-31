<template>
  <div>
    <div v-if="done" class="px-5 py-3 bg-slate-100">
      <p>
        Thank you for your opinion
      </p>
    </div>
    <button
      data-cy="add-review"
      v-else
      class="color-primary sf-button"
      @click="showModal"
    >
      Add your review
    </button>
    <SfModal v-model="modal" class="dist-modal">
      <h4 class="mb-6">
        Your review
      </h4>
      <h5>Overall rating</h5>
      <star-rating :show-rating="false" :star-size="30" v-model="computedReview.reviewRating"/>
      <h5>Describe your experience</h5>
      <SfTextarea :maxlength="400" :cols="35" :rows="6" v-model="computedReview.reviewBody"></SfTextarea>
      <slot name="action" :valid="valid" :close="closeModal">
        <button
          class="color-primary sf-button"
          @click="emitSave"
        >
          Submit review
        </button>
      </slot>
    </SfModal>
  </div>
</template>

<script>
import {SfModal, SfTextarea} from "@storefront-ui/vue";
import {computed, ref} from "@nuxtjs/composition-api";

export default {
  name: "ReviewForm",
  components: {
    SfModal,
    SfTextarea,
  },
  props: {
    review: {
      reviewBody: {
        type: String,
        required: true,
      },
      reviewRating: {
        type: Number,
        required: true,
      },
    },
    done: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const modal = ref(false);

    const computedReview = computed({
      get: () => props.review,
      set: (val) => emit("update:review", val),
    });
    return {
      modal,
      computedReview,
      valid: computed(() => computedReview.value.reviewRating !== null && computedReview.value.reviewRating !== undefined),
      showModal: () => modal.value = true,
      closeModal: () => modal.value = false,
      emitSave: () => emit("save"),
    };
  },
};
</script>

<style scoped>

</style>
