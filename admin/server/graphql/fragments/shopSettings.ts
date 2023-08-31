import gql from "graphql-tag";

export const shopSettings = gql`
  fragment ShopSettingsCommon on ShopSettings {
    defaultTaxCode
    fallbackTaxServiceName
    primaryTaxServiceName
  }
`;
