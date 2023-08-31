<template>
  <div class="account-card-container full-width fill-height">
    <div class="position-relative">
      <entity-avatar
        :size="40"
        :entity-id="account._id"
        :image-url="account.picture"
        :entity-title="`${account.firstName} ${account.lastName}` || 'N/A'"
      />
    </div>
    <div class="d-flex flex-column justify-center">
      <h3 class="account-card-title">
        <link-wrapper :id="account._id" :path="linkPath">
          <span>
            {{ `${account.firstName} ${account.lastName}` || "N/A" }}
          </span>
        </link-wrapper>
      </h3>
      <span
        class="text-slate-500"
        style="font-size: 0.9rem"
        v-if="account.primaryEmailAddress"
      >
        {{ account.primaryEmailAddress }}
      </span>
    </div>
  </div>
</template>

<script>
import EntityAvatar from "~/components/Base/EntityAvatar";
import LinkWrapper from "~/components/Base/LinkWrapper";
import DotDivider from "~/components/Base/DotDivider";

export default {
  name: "AccountMiniCard",
  components: {
    DotDivider,
    LinkWrapper,
    EntityAvatar,
  },
  props: {
    account: {
      type: Object,
      required: true,
    },
  },
  computed: {
    linkPath() {
      return `/accounts/${this.account._id}`;
    },
  },
};
</script>

<style scoped lang="scss">
a {
  text-decoration: none;
}
.account-card-container {
  transition: 0.3s;
  display: grid;
  grid-template-columns: max-content 1fr;
  grid-gap: 16px;
}

.account-card-title {
  color: $primary;
}
</style>
