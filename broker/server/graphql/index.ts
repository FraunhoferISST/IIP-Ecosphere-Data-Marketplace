import { login } from "~/server/graphql/login";
import { getViewer } from "~/server/graphql/getViewer";
import { getPrimaryShop } from "~/server/graphql/getPrimaryShop";
import { getAccount } from "~/server/graphql/getAccount";
import { searchCatalog} from "~/server/graphql/searchCatalog";
import { searchInquiries} from "~/server/graphql/searchInquiries";

export default {
  login,
  getViewer,
  getPrimaryShop,
  getAccount,
  searchCatalog,
  searchInquiries,
};
