<template>
  <SfFooter :column="4" multiple class="footer">
    <SfFooterColumn :title="$t('About us')">
      <SfList>
        <SfListItem
          v-for="item in aboutUs"
          :key="item.title"
        >
          <SfMenuItem
            :link="item.link"
            :label="$t(item.title)"
          />
        </SfListItem>
      </SfList>
    </SfFooterColumn>
    <SfFooterColumn :title="$t('Data privacy and imprint')">
      <SfList>
        <SfListItem
          v-for="item in paymentsDelivery"
          :key="item"
        >
          <SfMenuItem
            :link="item.link"
            :label="$t(item.title)"
          />
        </SfListItem>
      </SfList>
    </SfFooterColumn>
  </SfFooter>
</template>

<script>
import {SfFooter, SfList, SfImage, SfMenuItem} from "@storefront-ui/vue";
import {addBasePath} from "@vue-storefront/core";

export default {
  components: {
    SfFooter,
    SfList,
    SfImage,
    SfMenuItem,
  },
  setup() {
    return {
      addBasePath,
      aboutUs: [
        {title: "Data marketplace", link: "https://www.iip-ecosphere.de/angebote/datenmarktplatz/"},
        {title: "IIP-Ecosphere", link: "https://www.iip-ecosphere.de/"},
        {title: "Store", link: "/vendor"}
      ],
      paymentsDelivery: [{title: "Data privacy", link: "/dataprivacy"}, {title: "Imprint", link: "/imprint"}],
      isMobile: false,
      desktopMin: 1024,
    };
  },
};
</script>

<style lang="scss">

.footer {
  margin-bottom: 3.75rem;
  @include for-desktop {
    margin-bottom: 0;
  }

  &__socials {
    display: flex;
    justify-content: space-between;
    margin: 0 auto var(--spacer-lg);
    padding: var(--spacer-base) var(--spacer-xl);
    @include for-desktop {
      justify-content: flex-start;
      padding: var(--spacer-xs) 0;
      margin: 0 auto;
    }
  }

  &__social-image {
    margin: 0 var(--spacer-2xs) 0 0;
  }
}

.sf-footer {
  @include for-desktop {
    border-top: var(--spacer-xs) solid var(--c-primary);
    padding-bottom: 0;
    margin-top: var(--spacer-2xl);
  }

  &__container {
    margin: var(--spacer-sm);
    @include for-desktop {
      max-width: 69rem;
      margin: 0 auto;
    }
  }
}
</style>
