import { gql } from "graphql-tag";
import { shopSettings } from "@/server/graphql/fragments/shopSettings";

export default gql`
  query shopSettings($shopId: ID!) {
    shopSettings(shopId: $shopId) {
      ...ShopSettingsCommon
    }
  }
  ${shopSettings}
`;
