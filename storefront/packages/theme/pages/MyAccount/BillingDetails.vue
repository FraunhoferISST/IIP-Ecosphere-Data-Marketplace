<template>
  <transition name="fade">
    <SfTabs
      v-if="edittingAddress"
      key="edit-address"
      :open-tab="1"
      class="tab-orphan"
    >
      <SfTab
        :title="isNewAddress ? 'Add the address' : 'Update the address'">
        <p class="message">
          {{ $t('Contact details updated') }}
        </p>

        <BillingAddressForm
          :address="activeAddress"
          :isNew="isNewAddress"
          @submit="saveAddress" />
      </SfTab>
    </SfTabs>

    <SfTabs
      v-else
      :open-tab="1"
      key="address-list"
      class="tab-orphan">
      <SfTab title="Billing details">
        <p class="message">
          {{ $t('Manage billing addresses') }}
        </p>
        <transition-group tag="div" name="fade" class="billing-list">
          <div
            v-for="(address, i) in addresses"
            :key="i"
            class="billing">
            <div class="billing__content">
              <div class="billing__address">
                <address>
                  <div>{{address.fullName}}</div>
                  <div>{{address.address1}}</div>
                  <div>
                    <span>{{address.postal}}</span>
                    <span>{{address.city}}</span>
                  </div>
                  <div>
                    <span>{{address.country}}, </span>
                    <span>{{address.region}}</span>
                  </div>
                  <div class="mt-3">{{address.phone}}</div>
                </address>
              </div>
            </div>
          </div>
        </transition-group>
<!--        <SfButton
          class="action-button"
          @click="changeAddress()">
          {{ $t('Add new address') }}
        </SfButton>-->
      </SfTab>
    </SfTabs>
  </transition>
</template>
<script>
import {
  SfTabs,
  SfButton,
  SfIcon
} from "@storefront-ui/vue";
import UserBillingAddress from "~/components/UserBillingAddress";
import BillingAddressForm from "~/components/MyAccount/BillingAddressForm";
import {useUserBilling, userBillingGetters, useUser} from "@vue-storefront/iiepmarket";
import { ref, computed } from "@nuxtjs/composition-api";
import { onSSR } from "@vue-storefront/core";

export default {
  name: "BillingDetails",
  components: {
    SfTabs,
    SfButton,
    SfIcon,
    UserBillingAddress,
    BillingAddressForm,
  },
  setup() {
    const { user } = useUser();

    const { billing, load: loadUserBilling, addAddress, deleteAddress, updateAddress } = useUserBilling();
    const addresses = computed(() => user.value?.addressBook ?? []);
    const edittingAddress = ref(false);
    const activeAddress = ref(undefined);
    const isNewAddress = computed(() => !activeAddress.value);

    const changeAddress = (address = undefined) => {
      activeAddress.value = address;
      edittingAddress.value = true;
    };

    const removeAddress = address => deleteAddress({ address });

    const saveAddress = async ({ form, onComplete, onError }) => {
      try {
        const actionMethod = isNewAddress.value ? addAddress : updateAddress;
        const data = await actionMethod({ address: form });
        edittingAddress.value = false;
        activeAddress.value = undefined;
        await onComplete(data);
      } catch (error) {
        onError(error);
      }
    };

    onSSR(async () => {
      await loadUserBilling();
    });

    return {
      user,
      changeAddress,
      updateAddress,
      removeAddress,
      saveAddress,
      userBillingGetters,
      addresses,
      edittingAddress,
      activeAddress,
      isNewAddress,
    };
  },
};
</script>

<style lang='scss' scoped>

.message {
  font-family: var(--font-family--primary);
  line-height: 1.6;
  font-size: var(--font-size--base);
  margin: 0 0 var(--spacer-base);
}

.billing-list {
  margin-bottom: var(--spacer-base);
}

.billing {
  display: flex;
  padding: var(--spacer-xl) 0;
  border-top: 1px solid var(--c-light);
  &:last-child {
    border-bottom: 1px solid var(--c-light);
  }
  &__content {
    flex: 1;
    color: var(--c-text);
    font-size: var(--font-size--base);
    font-weight: 300;
    line-height: 1.6;
  }
  &__actions {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
    @include for-desktop {
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;
    }
  }
  &__button-delete {
    color: var(--c-link);
    @include for-desktop {
      margin-left: var(--spacer-base);
    }
  }
  &__address {
    margin: 0;
    p {
      margin: 0;
    }
  }
  &__client-name {
    font-size: var(--font-size--base);
    font-weight: 500;
  }
}
.action-button {
  width: 100%;
  @include for-desktop {
    width: auto;
  }
}
.tab-orphan {
  @include for-mobile {
    ::v-deep .sf-tabs {
      &__title {
        display: none;
      }

      &__content {
        border: 0;
        padding: 0;
      }
    }
  }
}
</style>
