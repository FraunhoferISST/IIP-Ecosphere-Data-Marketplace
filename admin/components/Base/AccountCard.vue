<template>
  <link-wrapper :id="account._id" :path="linkPath">
    <div class="account-card-container full-width fill-height">
      <div class="position-relative">
        <entity-avatar
          :size="dense ? 40 : 60"
          :entity-id="account._id"
          :image-url="account.picture"
          :entity-title="accountName || 'N/A'"
        />
      </div>
      <div>
        <div class="d-flex justify-space-between">
          <div>
            <h3 class="account-card-title d-flex align-center">
              <span>
                {{ accountName || "N/A" }}
              </span>
              <dot-divider class="mx-2 mb-1" v-if="!dense" />
              <span
                class="text-slate-400"
                style="font-size: 0.9rem"
                v-if="!dense"
              >
                {{ account.primaryEmailAddress }}
              </span>
            </h3>
            <span
              class="text-slate-500"
              style="font-size: 0.9rem"
              v-if="dense && account.primaryEmailAddress"
            >
              {{ account.primaryEmailAddress }}
            </span>
          </div>
          <v-menu offset-x v-if="actions.length > 0">
            <template #activator="{ props }">
              <v-btn
                icon="more_vert"
                variant="flat"
                rounded
                size="small"
                v-bind="props"
              >
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="action in actions"
                :key="action.title"
                @click.stop.prevent="() => action.handler(account, index)"
              >
                <v-list-item-title>{{ action.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
        <div class="mt-0" v-if="!dense">
          <v-chip
            label
            size="x-small"
            color="accent"
            class="mr-2"
            v-for="(tag, i) in accountTags"
            :key="i"
          >
            {{ tag }}
          </v-chip>
        </div>
      </div>
    </div>
  </link-wrapper>
</template>

<script>
import EntityAvatar from "~/components/Base/EntityAvatar";
import LinkWrapper from "~/components/Base/LinkWrapper";
import DotDivider from "~/components/Base/DotDivider";

export default {
  name: "AccountCard",
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
    index: {
      type: Number,
      required: true,
    },
    actions: {
      type: Array,
      default: () => [],
    },
    dense: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    accountName() {
      return `${this.account?.firstName} ${this.account?.lastName}`;
    },
    accountTags() {
      return (this.account.groups.nodes ?? this.account.groups ?? [])
        .map(({ name }) => name)
        .filter((t) => t)
        .map((t) => (t.length > 40 ? `${t.slice(0, 40)}...` : t));
    },
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
  grid-gap: 20px;
}
.account-icons-container {
  height: 120%;
  top: -10%;
  right: -5px;
}

.account-card-title {
  color: $primary;
}
.account-card-id {
  position: relative;
  top: -10px;
  font-size: 0.7rem;
}
</style>
