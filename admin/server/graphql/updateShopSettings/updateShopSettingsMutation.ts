import { gql } from "graphql-tag";
import { shopSettings } from "@/server/graphql/fragments/shopSettings";

export default gql`
  mutation updateShopSettings($input: UpdateShopSettingsInput!) {
    updateShopSettings(input: $input) {
      shopSettings {
        ...ShopSettingsCommon
      }
    }
  }
  ${shopSettings}
`;
