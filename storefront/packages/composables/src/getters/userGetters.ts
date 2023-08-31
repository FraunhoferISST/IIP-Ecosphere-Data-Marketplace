import { UserGetters } from "@vue-storefront/core";
import type {Account, EmailRecord} from "@vue-storefront/iiepmarket-api";

const getFirstName = (user: Account): string => user?.firstName ?? "";

const getLastName = (user: Account): string => user?.lastName ?? "";

const getFullName = (user: Account): string => user?.name ?? "";

const getEmailAddress = (user: Account): string => user?.primaryEmailAddress ?? "";

const getEmails = (user: Account): EmailRecord[] => user?.emailRecords ?? [];

export const userGetters: UserGetters<Account> = {
  getFirstName,
  getLastName,
  getFullName,
  getEmailAddress,
  getEmails,
};
