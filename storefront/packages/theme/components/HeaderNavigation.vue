<template>
  <div class="sf-header__navigation desktop" v-if="!isMobile">
    <SfHeaderNavigationItem
      v-for="(item, index) in navItems"
      :key="index"
      class="nav-item"
      v-e2e="`app-header-url_${item}`"
      :label="item"
      :link="localePath(`/${item}`)"
    />
  </div>
  <SfModal v-else :visible="isMobileMenuOpen">
    <SfHeaderNavigationItem
      v-for="(item, index) in navItems"
      :key="index"
      class="nav-item"
      v-e2e="`app-header-url_${item}`"
    >
      <template #mobile-navigation-item>
        <SfMenuItem
          :label="item"
          class="sf-header-navigation-item__menu-item"
          :link="localePath(`/${item}`)"
          @click="toggleMobileMenu"
        />
      </template>
    </SfHeaderNavigationItem>
  </SfModal>
</template>

<script>
import { SfMenuItem, SfModal } from "@storefront-ui/vue";
import { useUiState } from "~/composables";

export default {
  name: "HeaderNavigation",
  components: {
    SfMenuItem,
    SfModal,
  },
  props: {
    isMobile: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const { isMobileMenuOpen, toggleMobileMenu } = useUiState();
    const navItems = ["offers", "inquiries"];

    return {
      navItems,
      isMobileMenuOpen,
      toggleMobileMenu,
    };
  },
};
</script>

<style lang="scss" scoped>
.sf-header-navigation-item {
  ::v-deep &__item--mobile {
    display: block;
  }
}
.sf-modal {
  ::v-deep &__bar {
    display: none;
  }
  ::v-deep &__content {
    padding: var(--modal-content-padding, var(--spacer-base) 0);
  }
}
</style>
