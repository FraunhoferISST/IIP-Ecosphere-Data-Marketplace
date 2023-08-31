<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <SfHeading
      v-e2e="'billing-heading'"
      :level="3"
      :title="$t('Billing address')"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <form @submit.prevent="handleSubmit(handleFormSubmit)">
      <div v-if="useAlreadyHasAddress">
        <SfAddressPicker
          class="grid grid-cols-2 gap-5"
          :selected="selectedAddressId"
          v-model="selectedAddressId"
          @change="newAddressSelected = ''"
        >
          <SfAddress :name="address._id" v-for="(address, i) in user.addressBook" :key="i">
            <span>{{ address.fullName }}</span>
            <span>{{ address.address1 }}</span>
            <span>{{ address.postal }}</span>
            <span>{{ address.city }}, {{ address.region }}</span>
            <span>{{ address.country }}</span>
            <span>{{ address.phone }}</span>
          </SfAddress>
        </SfAddressPicker>
        <div class="mt-5 mb-16">
          <SfRadio
            :label="$t('Add another address')"
            value="1"
            v-model="newAddressSelected"
            name="shippingMethod"
            :description="$t('Alternative Address Description')"
            @input="selectedAddressId = ''"
          >
          </SfRadio>
          <div v-if="newAddressSelected" style="background-color: #f1f2f3" class="pl-10 pr-6">
            <SfAccordion :open="$t('Alternative Address')" @click:open="selectedAddressId = ''" :multiple="false">
              <SfAccordionItem :header="$t('Alternative Address')" class="pb-0">
                <div class="form">
                  <ValidationProvider
                    name="firstName"
                    rules="required|min:2"
                    v-slot="{ errors }"
                    slim
                  >
                    <SfInput
                      v-e2e="'billing-firstName'"
                      v-model="form.firstName"
                      label="First name"
                      name="firstName"
                      class="form__element form__element--half"
                      required
                      :valid="!errors[0]"
                      :errorMessage="errors[0]"
                    />
                  </ValidationProvider>
                  <ValidationProvider
                    name="lastName"
                    rules="required|min:2"
                    v-slot="{ errors }"
                    slim
                  >
                    <SfInput
                      v-e2e="'billing-lastName'"
                      v-model="form.lastName"
                      label="Last name"
                      name="lastName"
                      class="form__element form__element--half form__element--half-even"
                      required
                      :valid="!errors[0]"
                      :errorMessage="errors[0]"
                    />
                  </ValidationProvider>
                  <ValidationProvider
                    name="streetName"
                    rules="required"
                    v-slot="{ errors }"
                    slim
                  >
                    <SfInput
                      v-e2e="'billing-streetName'"
                      v-model="form.address1"
                      label="Street name and House/Apartment number"
                      name="streetName"
                      class="form__element"
                      required
                      :valid="!errors[0]"
                      :errorMessage="errors[0]"
                    />
                  </ValidationProvider>
                  <ValidationProvider
                    name="city"
                    rules="required"
                    v-slot="{ errors }"
                    slim
                  >
                    <SfInput
                      v-e2e="'billing-city'"
                      v-model="form.city"
                      label="City"
                      name="city"
                      class="form__element form__element--half"
                      required
                      :valid="!errors[0]"
                      :errorMessage="errors[0]"
                    />
                  </ValidationProvider>
                  <ValidationProvider
                    name="state"
                    rules="required"
                    v-slot="{ errors }"
                    slim
                  >
                    <SfInput
                      v-e2e="'billing-state'"
                      v-model="form.region"
                      label="State/Province"
                      name="state"
                      required
                      class="form__element form__element--half form__element--half-even"
                      :valid="!errors[0]"
                      :errorMessage="errors[0]"
                    />
                  </ValidationProvider>
                  <ValidationProvider
                    name="country"
                    rules="required|min:2"
                    v-slot="{ errors }"
                    slim
                  >
                    <SfSelect
                      v-e2e="'billing-country'"
                      v-model="form.country"
                      label="Country"
                      name="country"
                      class="form__element form__element--half form__select sf-select--underlined"
                      required
                      :valid="!errors[0]"
                      :errorMessage="errors[0]"
                    >
                      <SfSelectOption
                        v-for="countryOption in countries"
                        :key="countryOption.key"
                        :value="countryOption.key"
                      >
                        {{ countryOption.label }}
                      </SfSelectOption>
                    </SfSelect>
                  </ValidationProvider>
                  <ValidationProvider
                    name="zipCode"
                    rules="required|min:2"
                    v-slot="{ errors }"
                    slim
                  >
                    <SfInput
                      v-e2e="'billing-zipcode'"
                      v-model="form.postal"
                      label="Zip-code"
                      name="zipCode"
                      class="form__element form__element--half form__element--half-even"
                      required
                      :valid="!errors[0]"
                      :errorMessage="errors[0]"
                    />
                  </ValidationProvider>
                  <ValidationProvider
                    name="phone"
                    rules="required"
                    v-slot="{ errors }"
                    slim
                  >
                    <SfInput
                      v-e2e="'billing-phone'"
                      v-model="form.phone"
                      label="Phone number"
                      name="phone"
                      class="form__element form__element--half"
                      style="margin-bottom: 0 !important;"
                      required
                      :valid="!errors[0]"
                      :errorMessage="errors[0]"
                    />
                  </ValidationProvider>
                  <ValidationProvider
                    name="name"
                    rules="required"
                    v-slot="{ errors }"
                    slim
                  >
                    <SfInput
                      v-e2e="'billing-company'"
                      v-model="form.company"
                      label="Company"
                      name="company"
                      class="form__element"
                      required
                      :valid="!errors[0]"
                      :errorMessage="errors[0]"
                    />
                  </ValidationProvider>
                </div>
              </SfAccordionItem>
            </SfAccordion>
          </div>
        </div>
      </div>
      <div class="form" v-else>
        <ValidationProvider
          name="firstName"
          rules="required|min:2"
          v-slot="{ errors }"
          slim
        >
          <SfInput
            v-e2e="'billing-firstName'"
            v-model="form.firstName"
            label="First name"
            name="firstName"
            class="form__element form__element--half"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          />
        </ValidationProvider>
        <ValidationProvider
          name="lastName"
          rules="required|min:2"
          v-slot="{ errors }"
          slim
        >
          <SfInput
            v-e2e="'billing-lastName'"
            v-model="form.lastName"
            label="Last name"
            name="lastName"
            class="form__element form__element--half form__element--half-even"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          />
        </ValidationProvider>
        <ValidationProvider
          name="streetName"
          rules="required"
          v-slot="{ errors }"
          slim
        >
          <SfInput
            v-e2e="'billing-streetName'"
            v-model="form.address1"
            label="Street name and House/Apartment number"
            name="streetName"
            class="form__element"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          />
        </ValidationProvider>
        <ValidationProvider
          name="city"
          rules="required"
          v-slot="{ errors }"
          slim
        >
          <SfInput
            v-e2e="'billing-city'"
            v-model="form.city"
            label="City"
            name="city"
            class="form__element form__element--half"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          />
        </ValidationProvider>
        <ValidationProvider
          name="state"
          slim
          rules="required"
          v-slot="{ errors }"
        >
          <SfInput
            v-e2e="'billing-state'"
            v-model="form.region"
            label="State/Province"
            name="state"
            class="form__element form__element--half form__element--half-even"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          />
        </ValidationProvider>
        <ValidationProvider
          name="country"
          rules="required|min:2"
          v-slot="{ errors }"
          slim
        >
          <SfSelect
            v-e2e="'billing-country'"
            v-model="form.country"
            label="Country"
            name="country"
            class="form__element form__element--half form__select sf-select--underlined"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          >
            <SfSelectOption
              v-for="countryOption in countries"
              :key="countryOption.key"
              :value="countryOption.key"
            >
              {{ countryOption.label }}
            </SfSelectOption>
          </SfSelect>
        </ValidationProvider>
        <ValidationProvider
          name="zipCode"
          rules="required|min:2"
          v-slot="{ errors }"
          slim
        >
          <SfInput
            v-e2e="'billing-zipcode'"
            v-model="form.postal"
            label="Zip-code"
            name="zipCode"
            class="form__element form__element--half form__element--half-even"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          />
        </ValidationProvider>
        <ValidationProvider
          name="phone"
          rules="required"
          v-slot="{ errors }"
          slim
        >
          <SfInput
            v-e2e="'billing-phone'"
            v-model="form.phone"
            label="Phone number"
            name="phone"
            class="form__element"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          />
        </ValidationProvider>
        <ValidationProvider
          name="name"
          rules="required"
          v-slot="{ errors }"
          slim
        >
          <SfInput
            v-e2e="'billing-company'"
            v-model="form.company"
            label="Company"
            name="company"
            class="form__element form__element--half"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          />
        </ValidationProvider>
      </div>
      <div class="form">
        <div class="form__action">
          <SfButton
            class="sf-button color-secondary form__back-button"
            type="button"
            disabled
            @click="router.push(localePath({ name: 'shipping' }))"
          >
            {{ $t('Go back') }}
          </SfButton>
          <SfButton
            v-e2e="'continue-to-payment'"
            class="form__action-button"
            type="submit"
          >
            {{ $t('Continue to payment') }}
          </SfButton>
        </div>
      </div>
    </form>
  </ValidationObserver>
</template>

<script>
import {
  SfHeading,
  SfInput,
  SfButton,
  SfSelect,
  SfRadio,
  SfCheckbox,
  SfAddressPicker,
  SfAccordion
} from "@storefront-ui/vue";
import {computed, ref, useRouter} from "@nuxtjs/composition-api";
import { useUserBilling, useUser, useCart } from "@vue-storefront/iiepmarket";
import { required, min, digits } from "vee-validate/dist/rules";
import { ValidationProvider, ValidationObserver, extend } from "vee-validate";

const COUNTRIES = [
  { key: "DE", label: "Germany" },
  { key: "US", label: "United States" },
  { key: "UK", label: "United Kingdom" },
  { key: "IT", label: "Italy" },
  { key: "PL", label: "Poland" }
];

extend("required", {
  ...required,
  message: "This field is required",
});
extend("min", {
  ...min,
  message: "The field should have at least {length} characters",
});
extend("digits", {
  ...digits,
  message: "Please provide a valid phone number",
});

export default {
  name: "Billing",
  components: {
    SfHeading,
    SfInput,
    SfButton,
    SfSelect,
    SfRadio,
    SfCheckbox,
    ValidationProvider,
    ValidationObserver,
    SfAddressPicker,
    SfAccordion,
  },
  setup(props, context) {
    const router = useRouter();
    const { user } = useUser();
    const { addAddress } = useUserBilling();
    const { cart, setAddress } = useCart();

    const newAddressSelected = ref("");
    const selectedAddressId = ref(cart.value?.checkout.fulfillmentGroups[0]?.shippingAddress?._id ?? user.value.addressBook[0]?._id);
    const form = ref(user.value.addressBook?.length > 0 ? { ...user.value.addressBook[0] } : {
      firstName: user.value.firstName,
      lastName: user.value.lastName,
      fullName: `${user.value.firstName} ${user.value.lastName}`,
      address1: "",
      city: "",
      region: "",
      country: "DE",
      company: "",
      postal: "",
      phone: "",
    });

    const cartSelectedAddressId = computed(() => cart.value?.checkout.fulfillmentGroups[0]?.shippingAddress?._id);
    const selectedAddress = computed(() => user.value.addressBook.find(({ _id }) => _id === selectedAddressId.value));
    const useAlreadyHasAddress = computed(() => user.value.addressBook?.length > 0);

    const handleFormSubmit = async () => {
      if (selectedAddress.value) {
        await setAddress.execute(selectedAddress.value);
      } else {
        const alternativeAddress = {
          ...form.value,
          fullName: `${form.value.firstName} ${form.value.lastName}`,
          phone: form.value.phone.toString(),
          isCommercial: true,
        };
        await addAddress({
          address: alternativeAddress,
        });
        await setAddress.execute(alternativeAddress);
      }
      router.push(context.root.localePath({ name: "payment" }));
    };

    return {
      user,
      router,
      form,
      newAddressSelected,
      selectedAddressId,
      cartSelectedAddressId,
      countries: COUNTRIES,
      useAlreadyHasAddress,
      handleFormSubmit,
    };
  },
};
</script>
<style lang="scss" scoped>
.title {
  margin: var(--spacer-xl) 0 var(--spacer-base) 0;
}
.form {
  &__select {
    display: flex;
    align-items: center;
    --select-option-font-size: var(--font-size--lg);
    ::v-deep .sf-select__dropdown {
      font-size: var(--font-size--lg);
      margin: 0;
      color: var(--c-text);
      font-family: var(--font-family--secondary);
      font-weight: var(--font-weight--normal);
    }
  }
  @include for-desktop {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
  &__element {
    margin: 0 0 var(--spacer-xl) 0;
    @include for-desktop {
      flex: 0 0 100%;
    }
    &--half {
      @include for-desktop {
        flex: 1 1 50%;
      }
      &-even {
        @include for-desktop {
          padding: 0 0 0 var(--spacer-xl);
        }
      }
    }
  }
  &__group {
    display: flex;
    align-items: center;
  }
  &__action {
    @include for-desktop {
      flex: 0 0 100%;
      display: flex;
    }
  }
  &__action-button, &__back-button {
    --button-width: 100%;
    @include for-desktop {
      --button-width: auto;
    }
  }
  &__action-button {
    &--secondary {
      @include for-desktop {
        order: -1;
        --button-margin: 0;
        text-align: left;
      }
    }
     &--add-address {
      width: 100%;
      margin: 0;
      @include for-desktop {
        margin: 0 0 var(--spacer-lg) 0;
        width: auto;
      }
    }
  }
  &__back-button {
    margin: var(--spacer-xl) 0 var(--spacer-sm);
    &:hover {
      color:  white;
    }
    @include for-desktop {
      margin: 0 var(--spacer-xl) 0 0;
    }
  }
  &__back-button {
    margin: 0 0 var(--spacer-sm) 0;
    @include for-desktop {
      margin: 0 var(--spacer-xl) 0 0;
    }
  }
}
.payment-methods {
  @include for-desktop {
    display: flex;
    padding: var(--spacer-lg) 0;
    border: 1px solid var(--c-light);
    border-width: 1px 0;
  }
}
.payment-method {
  --radio-container-align-items: center;
  --ratio-content-margin: 0 0 0 var(--spacer-base);
  --radio-label-font-size: var(--font-base);
  --radio-background: transparent;
  white-space: nowrap;
  border: 1px solid var(--c-light);
  border-width: 1px 0 0 0;
  &:last-child {
    border-width: 1px 0;
  }
  --radio-background: transparent;
  @include for-desktop {
    border: 0;
    --radio-border-radius: 4px;
  }
}
</style>
