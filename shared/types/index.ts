export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
    { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
    { [SubKey in K]: Maybe<T[SubKey]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  Date: any
  DateTime: any
  JSONObject: any
  ConnectionCursor: any
  ConnectionLimitInt: any
  Email: any
  JSON: any
}

export enum DistanceUnit {
  Cm = "cm",
  Ft = "ft",
  In = "in"
}

export enum MassUnit {
  G = "g",
  Kg = "kg",
  Lb = "lb",
  Oz = "oz"
}

export type ImageSizes = {
  __typename?: "ImageSizes"
  large?: Maybe<Scalars["String"]>
  medium?: Maybe<Scalars["String"]>
  original?: Maybe<Scalars["String"]>
  small?: Maybe<Scalars["String"]>
  thumbnail?: Maybe<Scalars["String"]>
}

export type ImageInfo = {
  __typename?: "ImageInfo"
  URLs?: Maybe<ImageSizes>
  _id?: Maybe<Scalars["ID"]>
  priority?: Maybe<Scalars["Int"]>
  productId?: Maybe<Scalars["ID"]>
  variantId?: Maybe<Scalars["ID"]>
}

export type Money = {
  __typename?: "Money"
  amount: Scalars["Float"]
  currency: Currency
  displayAmount: Scalars["String"]
}

export type MoneyInput = {
  amount: Scalars["Float"]
  currencyCode: Scalars["String"]
}

export type Rate = {
  __typename?: "Rate"
  amount: Scalars["Float"]
  displayPercent: Scalars["String"]
  percent: Scalars["Float"]
}

export type Mutation = {
  __typename?: "Mutation"
  echo?: Maybe<Scalars["String"]>
  archiveMediaRecord: ArchiveMediaRecordPayload
  createMediaRecord: CreateMediaRecordPayload
  deleteMediaRecord: DeleteMediaRecordPayload
  updateMediaRecordPriority: UpdateMediaRecordPriorityPayload
  createShop: CreateShopPayload
  updateShop: UpdateShopPayload
  updateGlobalSettings: UpdateGlobalSettingsPayload
  updateShopSettings: UpdateShopSettingsPayload
  retryFailedEmail: RetryFailedEmailPayload
  verifySMTPEmailSettings: VerifySmtpEmailSettingsInputPayload
  updateTemplate: UpdateTemplatePayload
  createAddressValidationRule: CreateAddressValidationRulePayload
  deleteAddressValidationRule: DeleteAddressValidationRulePayload
  updateAddressValidationRule: UpdateAddressValidationRulePayload
  addAccountAddressBookEntry?: Maybe<AddAccountAddressBookEntryPayload>
  addAccountEmailRecord?: Maybe<AddAccountEmailRecordPayload>
  createAccount?: Maybe<CreateAccountPayload>
  removeAccountAddressBookEntry?: Maybe<RemoveAccountAddressBookEntryPayload>
  removeAccountEmailRecord?: Maybe<RemoveAccountEmailRecordPayload>
  sendResetAccountPasswordEmail?: Maybe<SendResetAccountPasswordEmailPayload>
  setAccountDefaultEmail?: Maybe<SetAccountDefaultEmailPayload>
  updateAccountAddressBookEntry?: Maybe<UpdateAccountAddressBookEntryPayload>
  updateAccount?: Maybe<UpdateAccountPayload>
  updateGroupsForAccounts?: Maybe<UpdateGroupsForAccountsPayload>
  grantAdminUIAccess: GrantOrRevokeAdminUiAccessPayload
  revokeAdminUIAccess: GrantOrRevokeAdminUiAccessPayload
  updateAdminUIAccess: UpdateAdminUiAccessPayload
  addAccountToGroup?: Maybe<AddAccountToGroupPayload>
  createAccountGroup?: Maybe<CreateAccountGroupPayload>
  removeAccountFromGroup?: Maybe<RemoveAccountFromGroupPayload>
  removeAccountGroup?: Maybe<RemoveAccountGroupPayload>
  updateAccountGroup?: Maybe<UpdateAccountGroupPayload>
  inviteShopMember?: Maybe<InviteShopMemberPayload>
  archiveProducts: ArchiveProductsPayload
  archiveProductVariants: ArchiveProductVariantsPayload
  updateProductsVisibility: UpdateProductsVisibilityPayload
  createProduct: CreateProductPayload
  createProductVariant: CreateProductVariantPayload
  cloneProducts: CloneProductsPayload
  cloneProductVariants: CloneProductVariantsPayload
  updateProduct: UpdateProductPayload
  updateProductVariant: UpdateProductVariantPayload
  addTagsToProducts: ProductTagsOperationPayload
  removeTagsFromProducts: ProductTagsOperationPayload
  publishProductsToCatalog?: Maybe<Array<Maybe<CatalogItemProduct>>>
  addTag: AddTagPayload
  removeTag: RemoveTagPayload
  setTagHeroMedia: SetTagHeroMediaPayload
  updateTag: UpdateTagPayload
  updateProductVariantPrices: UpdateProductVariantPricesPayload
  recalculateReservedSimpleInventory: RecalculateReservedSimpleInventoryPayload
  updateSimpleInventory: UpdateSimpleInventoryPayload
  addCartItems: AddCartItemsPayload
  createCart: CreateCartPayload
  reconcileCarts: ReconcileCartsPayload
  removeCartItems: RemoveCartItemsPayload
  setEmailOnAnonymousCart: SetEmailOnAnonymousCartPayload
  updateCartItemsQuantity: UpdateCartItemsQuantityPayload
  selectFulfillmentOptionForGroup: SelectFulfillmentOptionForGroupPayload
  setShippingAddressOnCart: SetShippingAddressOnCartPayload
  updateFulfillmentOptionsForGroup: UpdateFulfillmentOptionsForGroupPayload
  addOrderFulfillmentGroup: AddOrderFulfillmentGroupPayload
  cancelOrderItem: CancelOrderItemPayload
  createRefund: CreateRefundPayload
  moveOrderItems: MoveOrderItemsPayload
  placeOrder: PlaceOrderPayload
  splitOrderItem: SplitOrderItemPayload
  updateOrder: UpdateOrderPayload
  updateOrderFulfillmentGroup: UpdateOrderFulfillmentGroupPayload
  approveOrderPayments: ApproveOrderPaymentsPayload
  captureOrderPayments: CaptureOrderPaymentsPayload
  enablePaymentMethodForShop: EnablePaymentMethodForShopPayload
  createDiscountCode?: Maybe<CreateDiscountCodePayload>
  updateDiscountCode?: Maybe<UpdateDiscountCodePayload>
  deleteDiscountCode?: Maybe<DeleteDiscountCodePayload>
  applyDiscountCodeToCart: ApplyDiscountCodeToCartPayload
  removeDiscountCodeFromCart: RemoveDiscountCodeFromCartPayload
  createSurcharge: CreateSurchargePayload
  deleteSurcharge: DeleteSurchargePayload
  updateSurcharge: UpdateSurchargePayload
  createTaxRate?: Maybe<CreateTaxRatePayload>
  updateTaxRate?: Maybe<UpdateTaxRatePayload>
  deleteTaxRate?: Maybe<DeleteTaxRatePayload>
  createNavigationItem?: Maybe<CreateNavigationItemPayload>
  createNavigationTree: CreateNavigationTreePayload
  deleteNavigationItem?: Maybe<DeleteNavigationItemPayload>
  publishNavigationChanges?: Maybe<PublishNavigationChangesPayload>
  updateNavigationItem?: Maybe<UpdateNavigationItemPayload>
  updateNavigationTree?: Maybe<UpdateNavigationTreePayload>
  generateSitemaps: GenerateSitemapsPayload
  updateShopInvoiceDetails: Shop
  createDigitalFulfillmentMethod: CreateDigitalFulfillmentMethodPayload
  updateDigitalFulfillmentMethod: UpdateDigitalFulfillmentMethodPayload
  deleteDigitalFulfillmentMethod: DeleteDigitalFulfillmentMethodPayload
  createOrderFulfillment: CreateOrderFulfillmentPayload
  setCartPaymentMethod: CartPaymentMethod
  addProductReview: Review
  addShopReview: Review
  addAccountReview: Review
  createInquiry: Inquiry
  updateInquiry: Inquiry
  replyToInquiry: Inquiry
  acceptRejectInquiryReply: Inquiry
  markOrderAsPaid: Order
  createUser?: Maybe<CreateUserResult>
  verifyEmail?: Maybe<Scalars["Boolean"]>
  resetPassword?: Maybe<LoginResult>
  sendVerificationEmail?: Maybe<Scalars["Boolean"]>
  sendResetPasswordEmail?: Maybe<Scalars["Boolean"]>
  addEmail?: Maybe<Scalars["Boolean"]>
  changePassword?: Maybe<Scalars["Boolean"]>
  twoFactorSet?: Maybe<Scalars["Boolean"]>
  twoFactorUnset?: Maybe<Scalars["Boolean"]>
  impersonate?: Maybe<ImpersonateReturn>
  refreshTokens?: Maybe<LoginResult>
  logout?: Maybe<Scalars["Boolean"]>
  authenticate?: Maybe<LoginResult>
  verifyAuthentication?: Maybe<Scalars["Boolean"]>
}

export type MutationEchoArgs = {
  str?: Maybe<Scalars["String"]>
}

export type MutationArchiveMediaRecordArgs = {
  input: ArchiveMediaRecordInput
}

export type MutationCreateMediaRecordArgs = {
  input: CreateMediaRecordInput
}

export type MutationDeleteMediaRecordArgs = {
  input: DeleteMediaRecordInput
}

export type MutationUpdateMediaRecordPriorityArgs = {
  input: UpdateMediaRecordPriorityInput
}

export type MutationCreateShopArgs = {
  input: CreateShopInput
}

export type MutationUpdateShopArgs = {
  input: UpdateShopInput
}

export type MutationUpdateGlobalSettingsArgs = {
  input: UpdateGlobalSettingsInput
}

export type MutationUpdateShopSettingsArgs = {
  input: UpdateShopSettingsInput
}

export type MutationRetryFailedEmailArgs = {
  input: RetryFailedEmailInput
}

export type MutationVerifySmtpEmailSettingsArgs = {
  input: VerifySmtpEmailSettingsInput
}

export type MutationUpdateTemplateArgs = {
  input: UpdateTemplateInput
}

export type MutationCreateAddressValidationRuleArgs = {
  input: CreateAddressValidationRuleInput
}

export type MutationDeleteAddressValidationRuleArgs = {
  input: DeleteAddressValidationRuleInput
}

export type MutationUpdateAddressValidationRuleArgs = {
  input: UpdateAddressValidationRuleInput
}

export type MutationAddAccountAddressBookEntryArgs = {
  input: AddAccountAddressBookEntryInput
}

export type MutationAddAccountEmailRecordArgs = {
  input: AddAccountEmailRecordInput
}

export type MutationCreateAccountArgs = {
  input: CreateAccountInput
}

export type MutationRemoveAccountAddressBookEntryArgs = {
  input: RemoveAccountAddressBookEntryInput
}

export type MutationRemoveAccountEmailRecordArgs = {
  input: RemoveAccountEmailRecordInput
}

export type MutationSendResetAccountPasswordEmailArgs = {
  input: SendResetAccountPasswordEmailInput
}

export type MutationSetAccountDefaultEmailArgs = {
  input: SetAccountDefaultEmailInput
}

export type MutationUpdateAccountAddressBookEntryArgs = {
  input: UpdateAccountAddressBookEntryInput
}

export type MutationUpdateAccountArgs = {
  input: UpdateAccountInput
}

export type MutationUpdateGroupsForAccountsArgs = {
  input: UpdateGroupsForAccountsInput
}

export type MutationGrantAdminUiAccessArgs = {
  input: GrantOrRevokeAdminUiAccessInput
}

export type MutationRevokeAdminUiAccessArgs = {
  input: GrantOrRevokeAdminUiAccessInput
}

export type MutationUpdateAdminUiAccessArgs = {
  input: UpdateAdminUiAccessInput
}

export type MutationAddAccountToGroupArgs = {
  input: AddAccountToGroupInput
}

export type MutationCreateAccountGroupArgs = {
  input: CreateAccountGroupInput
}

export type MutationRemoveAccountFromGroupArgs = {
  input: RemoveAccountFromGroupInput
}

export type MutationRemoveAccountGroupArgs = {
  input: RemoveAccountGroupInput
}

export type MutationUpdateAccountGroupArgs = {
  input: UpdateAccountGroupInput
}

export type MutationInviteShopMemberArgs = {
  input: InviteShopMemberInput
}

export type MutationArchiveProductsArgs = {
  input: ArchiveProductsInput
}

export type MutationArchiveProductVariantsArgs = {
  input: ArchiveProductVariantsInput
}

export type MutationUpdateProductsVisibilityArgs = {
  input: UpdateProductsVisibilityInput
}

export type MutationCreateProductArgs = {
  input: CreateProductInput
}

export type MutationCreateProductVariantArgs = {
  input: CreateProductVariantInput
}

export type MutationCloneProductsArgs = {
  input: CloneProductsInput
}

export type MutationCloneProductVariantsArgs = {
  input: CloneProductVariantsInput
}

export type MutationUpdateProductArgs = {
  input: UpdateProductInput
}

export type MutationUpdateProductVariantArgs = {
  input: UpdateProductVariantInput
}

export type MutationAddTagsToProductsArgs = {
  input: ProductTagsOperationInput
}

export type MutationRemoveTagsFromProductsArgs = {
  input: ProductTagsOperationInput
}

export type MutationPublishProductsToCatalogArgs = {
  productIds: Array<Maybe<Scalars["ID"]>>
}

export type MutationAddTagArgs = {
  input: AddTagInput
}

export type MutationRemoveTagArgs = {
  input: RemoveTagInput
}

export type MutationSetTagHeroMediaArgs = {
  input: SetTagHeroMediaInput
}

export type MutationUpdateTagArgs = {
  input: UpdateTagInput
}

export type MutationUpdateProductVariantPricesArgs = {
  input: UpdateProductVariantPricesInput
}

export type MutationRecalculateReservedSimpleInventoryArgs = {
  input: RecalculateReservedSimpleInventoryInput
}

export type MutationUpdateSimpleInventoryArgs = {
  input: UpdateSimpleInventoryInput
}

export type MutationAddCartItemsArgs = {
  input: AddCartItemsInput
}

export type MutationCreateCartArgs = {
  input: CreateCartInput
}

export type MutationReconcileCartsArgs = {
  input: ReconcileCartsInput
}

export type MutationRemoveCartItemsArgs = {
  input: RemoveCartItemsInput
}

export type MutationSetEmailOnAnonymousCartArgs = {
  input: SetEmailOnAnonymousCartInput
}

export type MutationUpdateCartItemsQuantityArgs = {
  input: UpdateCartItemsQuantityInput
}

export type MutationSelectFulfillmentOptionForGroupArgs = {
  input: SelectFulfillmentOptionForGroupInput
}

export type MutationSetShippingAddressOnCartArgs = {
  input: SetShippingAddressOnCartInput
}

export type MutationUpdateFulfillmentOptionsForGroupArgs = {
  input: UpdateFulfillmentOptionsForGroupInput
}

export type MutationAddOrderFulfillmentGroupArgs = {
  input: AddOrderFulfillmentGroupInput
}

export type MutationCancelOrderItemArgs = {
  input: CancelOrderItemInput
}

export type MutationCreateRefundArgs = {
  input: CreateRefundInput
}

export type MutationMoveOrderItemsArgs = {
  input: MoveOrderItemsInput
}

export type MutationPlaceOrderArgs = {
  input: PlaceOrderInput
}

export type MutationSplitOrderItemArgs = {
  input: SplitOrderItemInput
}

export type MutationUpdateOrderArgs = {
  input: UpdateOrderInput
}

export type MutationUpdateOrderFulfillmentGroupArgs = {
  input: UpdateOrderFulfillmentGroupInput
}

export type MutationApproveOrderPaymentsArgs = {
  input: ApproveOrderPaymentsInput
}

export type MutationCaptureOrderPaymentsArgs = {
  input: CaptureOrderPaymentsInput
}

export type MutationEnablePaymentMethodForShopArgs = {
  input: EnablePaymentMethodForShopInput
}

export type MutationCreateDiscountCodeArgs = {
  input: CreateDiscountCodeInput
}

export type MutationUpdateDiscountCodeArgs = {
  input: UpdateDiscountCodeInput
}

export type MutationDeleteDiscountCodeArgs = {
  input: DeleteDiscountCodeInput
}

export type MutationApplyDiscountCodeToCartArgs = {
  input: ApplyDiscountCodeToCartInput
}

export type MutationRemoveDiscountCodeFromCartArgs = {
  input: RemoveDiscountCodeFromCartInput
}

export type MutationCreateSurchargeArgs = {
  input: CreateSurchargeInput
}

export type MutationDeleteSurchargeArgs = {
  input: DeleteSurchargeInput
}

export type MutationUpdateSurchargeArgs = {
  input: UpdateSurchargeInput
}

export type MutationCreateTaxRateArgs = {
  input: CreateTaxRateInput
}

export type MutationUpdateTaxRateArgs = {
  input: UpdateTaxRateInput
}

export type MutationDeleteTaxRateArgs = {
  input: DeleteTaxRateInput
}

export type MutationCreateNavigationItemArgs = {
  input: CreateNavigationItemInput
}

export type MutationCreateNavigationTreeArgs = {
  input: CreateNavigationTreeInput
}

export type MutationDeleteNavigationItemArgs = {
  input: DeleteNavigationItemInput
}

export type MutationPublishNavigationChangesArgs = {
  input: PublishNavigationChangesInput
}

export type MutationUpdateNavigationItemArgs = {
  input: UpdateNavigationItemInput
}

export type MutationUpdateNavigationTreeArgs = {
  input: UpdateNavigationTreeInput
}

export type MutationGenerateSitemapsArgs = {
  input?: Maybe<GenerateSitemapsInput>
}

export type MutationUpdateShopInvoiceDetailsArgs = {
  shopId: Scalars["ID"]
  input: InvoiceDetailsInput
}

export type MutationCreateDigitalFulfillmentMethodArgs = {
  input: CreateDigitalFulfillmentMethodInput
}

export type MutationUpdateDigitalFulfillmentMethodArgs = {
  input: UpdateDigitalFulfillmentMethodInput
}

export type MutationDeleteDigitalFulfillmentMethodArgs = {
  input: DeleteDigitalFulfillmentMethodInput
}

export type MutationCreateOrderFulfillmentArgs = {
  input: CreateOrderFulfillmentInput
}

export type MutationSetCartPaymentMethodArgs = {
  input: SetCartPaymentMethodInput
}

export type MutationAddProductReviewArgs = {
  input: ProductReviewInput
}

export type MutationAddShopReviewArgs = {
  input: ShopReviewInput
}

export type MutationAddAccountReviewArgs = {
  input: AccountReviewInput
}

export type MutationCreateInquiryArgs = {
  shopId: Scalars["ID"]
  accountId: Scalars["ID"]
  inquiry: InquiryInput
}

export type MutationUpdateInquiryArgs = {
  shopId: Scalars["ID"]
  accountId: Scalars["ID"]
  id: Scalars["ID"]
  inquiry: InquiryInput
}

export type MutationReplyToInquiryArgs = {
  shopId: Scalars["ID"]
  accountId: Scalars["ID"]
  id: Scalars["ID"]
  inquiryReply: InquiryReplyInput
}

export type MutationAcceptRejectInquiryReplyArgs = {
  shopId: Scalars["ID"]
  id: Scalars["ID"]
  input: AcceptRejectInquiryReplyInput
}

export type MutationMarkOrderAsPaidArgs = {
  shopId: Scalars["ID"]
  referenceId: Scalars["ID"]
}

export type MutationCreateUserArgs = {
  user: CreateUserInput
}

export type MutationVerifyEmailArgs = {
  token: Scalars["String"]
}

export type MutationResetPasswordArgs = {
  token: Scalars["String"]
  newPassword: Scalars["String"]
}

export type MutationSendVerificationEmailArgs = {
  email: Scalars["String"]
}

export type MutationSendResetPasswordEmailArgs = {
  email: Scalars["String"]
}

export type MutationAddEmailArgs = {
  newEmail: Scalars["String"]
}

export type MutationChangePasswordArgs = {
  oldPassword: Scalars["String"]
  newPassword: Scalars["String"]
}

export type MutationTwoFactorSetArgs = {
  secret: TwoFactorSecretKeyInput
  code: Scalars["String"]
}

export type MutationTwoFactorUnsetArgs = {
  code: Scalars["String"]
}

export type MutationImpersonateArgs = {
  accessToken: Scalars["String"]
  impersonated: ImpersonationUserIdentityInput
}

export type MutationRefreshTokensArgs = {
  accessToken: Scalars["String"]
  refreshToken: Scalars["String"]
}

export type MutationAuthenticateArgs = {
  serviceName: Scalars["String"]
  params: AuthenticateParamsInput
}

export type MutationVerifyAuthenticationArgs = {
  serviceName: Scalars["String"]
  params: AuthenticateParamsInput
}

export type Query = {
  __typename?: "Query"
  ping: Scalars["String"]
  primaryShop?: Maybe<Shop>
  primaryShopId?: Maybe<Scalars["ID"]>
  shop?: Maybe<Shop>
  shopBySlug?: Maybe<Shop>
  shops?: Maybe<ShopConnection>
  globalSettings: GlobalSettings
  shopSettings: ShopSettings
  emailJobs: EmailJobConnection
  emailTemplates?: Maybe<TemplateConnection>
  addressValidation: AddressValidationResults
  addressValidationServices: Array<Maybe<AddressValidationService>>
  addressValidationRules: AddressValidationRuleConnection
  systemInformation: SystemInformation
  account?: Maybe<Account>
  accounts: AccountConnection
  customers: AccountConnection
  viewer?: Maybe<Account>
  group?: Maybe<Group>
  groups?: Maybe<GroupConnection>
  invitations: InvitationConnection
  roles?: Maybe<RoleConnection>
  product?: Maybe<Product>
  products?: Maybe<ProductConnection>
  catalogItems?: Maybe<CatalogItemConnection>
  catalogItemProduct?: Maybe<CatalogItemProduct>
  vendors?: Maybe<VendorConnection>
  productsByTagId: TagProductConnection
  tag?: Maybe<Tag>
  tags?: Maybe<TagConnection>
  simpleInventory?: Maybe<SimpleInventoryInfo>
  anonymousCartByCartId?: Maybe<Cart>
  accountCartByAccountId?: Maybe<Cart>
  orderById?: Maybe<Order>
  orders: OrderConnection
  ordersByAccountId: OrdersByAccountIdConnection
  orderByReferenceId?: Maybe<Order>
  refunds?: Maybe<Array<Maybe<Refund>>>
  refundsByPaymentId?: Maybe<Array<Maybe<Refund>>>
  availablePaymentMethods: Array<Maybe<PaymentMethod>>
  paymentMethods: Array<Maybe<PaymentMethod>>
  discountCodes?: Maybe<DiscountCodeConnection>
  surcharges: SurchargeConnection
  surchargeById?: Maybe<Surcharge>
  taxCodes: Array<Maybe<TaxCode>>
  taxServices: Array<Maybe<TaxService>>
  taxRates?: Maybe<TaxRateConnection>
  navigationTreeById?: Maybe<NavigationTree>
  navigationItemsByShopId?: Maybe<NavigationItemConnection>
  sitemap?: Maybe<Sitemap>
  searchCatalog: CatalogSearchResult
  catalogSearchFacets: CatalogSearchFacetsResult
  fieldsTemplates: FieldsTemplatesResult
  digitalFulfillmentMethod: DigitalFulfillmentMethod
  digitalFulfillmentMethods: Methods
  accountOrderFulfillment: OrderFulfilment
  orderFulfillment: OrderFulfilment
  orderInvoice: OrderInvoice
  reviews: Reviews
  canAddReview: CanAddReviews
  reviewsAggregation?: Maybe<ReviewsAggregation>
  searchInquiries: InquiriesSearchResult
  inquiriesSearchFacets: CatalogSearchFacetsResult
  accountInquiries: AccountInquiriesResult
  inquiry: Inquiry
  twoFactorSecret?: Maybe<TwoFactorSecretKey>
  getUser?: Maybe<User>
}

export type QueryShopArgs = {
  id: Scalars["ID"]
}

export type QueryShopBySlugArgs = {
  slug: Scalars["String"]
}

export type QueryShopsArgs = {
  shopIds?: Maybe<Array<Maybe<Scalars["ID"]>>>
  after?: Maybe<Scalars["ConnectionCursor"]>
  before?: Maybe<Scalars["ConnectionCursor"]>
  first?: Maybe<Scalars["ConnectionLimitInt"]>
  last?: Maybe<Scalars["ConnectionLimitInt"]>
  offset?: Maybe<Scalars["Int"]>
  sortOrder?: Maybe<SortOrder>
  sortBy?: Maybe<GroupSortByField>
}

export type QueryShopSettingsArgs = {
  shopId: Scalars["ID"]
}

export type QueryEmailJobsArgs = {
  shopIds: Array<Maybe<Scalars["ID"]>>
  after?: Maybe<Scalars["ConnectionCursor"]>
  before?: Maybe<Scalars["ConnectionCursor"]>
  first?: Maybe<Scalars["ConnectionLimitInt"]>
  last?: Maybe<Scalars["ConnectionLimitInt"]>
  offset?: Maybe<Scalars["Int"]>
}

export type QueryEmailTemplatesArgs = {
  shopId: Scalars["ID"]
  after?: Maybe<Scalars["ConnectionCursor"]>
  before?: Maybe<Scalars["ConnectionCursor"]>
  first?: Maybe<Scalars["ConnectionLimitInt"]>
  last?: Maybe<Scalars["ConnectionLimitInt"]>
  offset?: Maybe<Scalars["Int"]>
}

export type QueryAddressValidationArgs = {
  address: AddressInput
  shopId: Scalars["ID"]
}

export type QueryAddressValidationRulesArgs = {
  after?: Maybe<Scalars["ConnectionCursor"]>
  before?: Maybe<Scalars["ConnectionCursor"]>
  first?: Maybe<Scalars["ConnectionLimitInt"]>
  last?: Maybe<Scalars["ConnectionLimitInt"]>
  offset?: Maybe<Scalars["Int"]>
  serviceNames?: Maybe<Array<Maybe<Scalars["String"]>>>
  shopId: Scalars["ID"]
  sortOrder?: Maybe<SortOrder>
  sortBy?: Maybe<AddressValidationRuleSortByField>
}

export type QuerySystemInformationArgs = {
  shopId: Scalars["ID"]
}

export type QueryAccountArgs = {
  id: Scalars["ID"]
}

export type QueryAccountsArgs = {
  groupIds?: Maybe<Array<Maybe<Scalars["ID"]>>>
  notInAnyGroups?: Maybe<Scalars["Boolean"]>
  after?: Maybe<Scalars["ConnectionCursor"]>
  before?: Maybe<Scalars["ConnectionCursor"]>
  first?: Maybe<Scalars["ConnectionLimitInt"]>
  last?: Maybe<Scalars["ConnectionLimitInt"]>
  offset?: Maybe<Scalars["Int"]>
  sortOrder?: Maybe<SortOrder>
  sortBy?: Maybe<AccountSortByField>
}

export type QueryCustomersArgs = {
  after?: Maybe<Scalars["ConnectionCursor"]>
  before?: Maybe<Scalars["ConnectionCursor"]>
  first?: Maybe<Scalars["ConnectionLimitInt"]>
  last?: Maybe<Scalars["ConnectionLimitInt"]>
  offset?: Maybe<Scalars["Int"]>
  sortOrder?: Maybe<SortOrder>
  sortBy?: Maybe<AccountSortByField>
}

export type QueryGroupArgs = {
  id: Scalars["ID"]
}

export type QueryGroupsArgs = {
  shopId: Scalars["ID"]
  after?: Maybe<Scalars["ConnectionCursor"]>
  before?: Maybe<Scalars["ConnectionCursor"]>
  first?: Maybe<Scalars["ConnectionLimitInt"]>
  last?: Maybe<Scalars["ConnectionLimitInt"]>
  offset?: Maybe<Scalars["Int"]>
  sortOrder?: Maybe<SortOrder>
  sortBy?: Maybe<GroupSortByField>
}

export type QueryInvitationsArgs = {
  shopIds?: Maybe<Array<Maybe<Scalars["ID"]>>>
  after?: Maybe<Scalars["ConnectionCursor"]>
  before?: Maybe<Scalars["ConnectionCursor"]>
  first?: Maybe<Scalars["ConnectionLimitInt"]>
  last?: Maybe<Scalars["ConnectionLimitInt"]>
  offset?: Maybe<Scalars["Int"]>
  sortOrder?: Maybe<SortOrder>
  sortBy?: Maybe<AccountSortByField>
}

export type QueryRolesArgs = {
  shopId: Scalars["ID"]
  after?: Maybe<Scalars["ConnectionCursor"]>
  before?: Maybe<Scalars["ConnectionCursor"]>
  first?: Maybe<Scalars["ConnectionLimitInt"]>
  last?: Maybe<Scalars["ConnectionLimitInt"]>
  offset?: Maybe<Scalars["Int"]>
  sortOrder?: Maybe<SortOrder>
  sortBy?: Maybe<RoleSortByField>
}

export type QueryProductArgs = {
  productId: Scalars["ID"]
  shopId: Scalars["ID"]
}

export type QueryProductsArgs = {
  isArchived?: Maybe<Scalars["Boolean"]>
  isVisible?: Maybe<Scalars["Boolean"]>
  isExactMatch?: Maybe<Scalars["Boolean"]>
  metafieldKey?: Maybe<Scalars["String"]>
  metafieldValue?: Maybe<Scalars["String"]>
  priceMax?: Maybe<Scalars["Float"]>
  priceMin?: Maybe<Scalars["Float"]>
  productIds?: Maybe<Array<Maybe<Scalars["ID"]>>>
  query?: Maybe<Scalars["String"]>
  shopIds: Array<Maybe<Scalars["ID"]>>
  tagIds?: Maybe<Array<Maybe<Scalars["ID"]>>>
  after?: Maybe<Scalars["ConnectionCursor"]>
  before?: Maybe<Scalars["ConnectionCursor"]>
  first?: Maybe<Scalars["ConnectionLimitInt"]>
  last?: Maybe<Scalars["ConnectionLimitInt"]>
  offset?: Maybe<Scalars["Int"]>
  sortOrder?: Maybe<SortOrder>
  sortBy?: Maybe<ProductSortByField>
}

export type QueryCatalogItemsArgs = {
  shopIds: Array<Maybe<Scalars["ID"]>>
  tagIds?: Maybe<Array<Maybe<Scalars["ID"]>>>
  booleanFilters?: Maybe<Array<Maybe<CatalogBooleanFilter>>>
  searchQuery?: Maybe<Scalars["String"]>
  after?: Maybe<Scalars["ConnectionCursor"]>
  before?: Maybe<Scalars["ConnectionCursor"]>
  first?: Maybe<Scalars["ConnectionLimitInt"]>
  last?: Maybe<Scalars["ConnectionLimitInt"]>
  offset?: Maybe<Scalars["Int"]>
  sortOrder?: Maybe<SortOrder>
  sortByPriceCurrencyCode?: Maybe<Scalars["String"]>
  sortBy?: Maybe<CatalogItemSortByField>
}

export type QueryCatalogItemProductArgs = {
  shopId?: Maybe<Scalars["ID"]>
  slugOrId?: Maybe<Scalars["String"]>
}

export type QueryVendorsArgs = {
  shopIds?: Maybe<Array<Maybe<Scalars["ID"]>>>
  tagIds?: Maybe<Array<Maybe<Scalars["ID"]>>>
  after?: Maybe<Scalars["ConnectionCursor"]>
  before?: Maybe<Scalars["ConnectionCursor"]>
  first?: Maybe<Scalars["ConnectionLimitInt"]>
  last?: Maybe<Scalars["ConnectionLimitInt"]>
  offset?: Maybe<Scalars["Int"]>
  sortOrder?: Maybe<SortOrder>
}

export type QueryProductsByTagIdArgs = {
  shopId: Scalars["ID"]
  tagId: Scalars["ID"]
  query?: Maybe<Scalars["String"]>
  after?: Maybe<Scalars["ConnectionCursor"]>
  before?: Maybe<Scalars["ConnectionCursor"]>
  first?: Maybe<Scalars["ConnectionLimitInt"]>
  last?: Maybe<Scalars["ConnectionLimitInt"]>
  offset?: Maybe<Scalars["Int"]>
}

export type QueryTagArgs = {
  slugOrId: Scalars["String"]
  shopId: Scalars["ID"]
  shouldIncludeInvisible?: Maybe<Scalars["Boolean"]>
}

export type QueryTagsArgs = {
  shopId: Scalars["ID"]
  filter?: Maybe<Scalars["String"]>
  excludedTagIds?: Maybe<Array<Maybe<Scalars["ID"]>>>
  isTopLevel?: Maybe<Scalars["Boolean"]>
  shouldIncludeDeleted?: Maybe<Scalars["Boolean"]>
  shouldIncludeInvisible?: Maybe<Scalars["Boolean"]>
  after?: Maybe<Scalars["ConnectionCursor"]>
  before?: Maybe<Scalars["ConnectionCursor"]>
  first?: Maybe<Scalars["ConnectionLimitInt"]>
  last?: Maybe<Scalars["ConnectionLimitInt"]>
  offset?: Maybe<Scalars["Int"]>
  sortOrder?: Maybe<SortOrder>
  sortBy?: Maybe<TagSortByField>
}

export type QuerySimpleInventoryArgs = {
  shopId: Scalars["ID"]
  productConfiguration: ProductConfigurationInput
}

export type QueryAnonymousCartByCartIdArgs = {
  cartId: Scalars["ID"]
  cartToken: Scalars["String"]
}

export type QueryAccountCartByAccountIdArgs = {
  accountId: Scalars["ID"]
  shopId: Scalars["ID"]
}

export type QueryOrderByIdArgs = {
  id: Scalars["ID"]
  shopId: Scalars["ID"]
  token?: Maybe<Scalars["String"]>
}

export type QueryOrdersArgs = {
  filters?: Maybe<OrderFilterInput>
  shopIds?: Maybe<Array<Maybe<Scalars["ID"]>>>
  after?: Maybe<Scalars["ConnectionCursor"]>
  before?: Maybe<Scalars["ConnectionCursor"]>
  first?: Maybe<Scalars["ConnectionLimitInt"]>
  last?: Maybe<Scalars["ConnectionLimitInt"]>
  offset?: Maybe<Scalars["Int"]>
  sortOrder?: Maybe<SortOrder>
  sortBy?: Maybe<OrdersSortByField>
}

export type QueryOrdersByAccountIdArgs = {
  accountId: Scalars["ID"]
  orderStatus?: Maybe<Array<Maybe<Scalars["String"]>>>
  shopIds: Array<Maybe<Scalars["ID"]>>
  after?: Maybe<Scalars["ConnectionCursor"]>
  before?: Maybe<Scalars["ConnectionCursor"]>
  first?: Maybe<Scalars["ConnectionLimitInt"]>
  last?: Maybe<Scalars["ConnectionLimitInt"]>
  offset?: Maybe<Scalars["Int"]>
  sortOrder?: Maybe<SortOrder>
  sortBy?: Maybe<OrdersByAccountIdSortByField>
}

export type QueryOrderByReferenceIdArgs = {
  id: Scalars["ID"]
  shopId: Scalars["ID"]
  token?: Maybe<Scalars["String"]>
}

export type QueryRefundsArgs = {
  orderId: Scalars["ID"]
  shopId: Scalars["ID"]
  token?: Maybe<Scalars["String"]>
}

export type QueryRefundsByPaymentIdArgs = {
  orderId: Scalars["ID"]
  paymentId: Scalars["ID"]
  shopId: Scalars["ID"]
  token?: Maybe<Scalars["String"]>
}

export type QueryAvailablePaymentMethodsArgs = {
  shopId: Scalars["ID"]
}

export type QueryPaymentMethodsArgs = {
  shopId: Scalars["ID"]
}

export type QueryDiscountCodesArgs = {
  shopId: Scalars["ID"]
  filters?: Maybe<DiscountCodeFilterInput>
  after?: Maybe<Scalars["ConnectionCursor"]>
  before?: Maybe<Scalars["ConnectionCursor"]>
  first?: Maybe<Scalars["ConnectionLimitInt"]>
  last?: Maybe<Scalars["ConnectionLimitInt"]>
  offset?: Maybe<Scalars["Int"]>
}

export type QuerySurchargesArgs = {
  shopId: Scalars["ID"]
  after?: Maybe<Scalars["ConnectionCursor"]>
  before?: Maybe<Scalars["ConnectionCursor"]>
  first?: Maybe<Scalars["ConnectionLimitInt"]>
  last?: Maybe<Scalars["ConnectionLimitInt"]>
  offset?: Maybe<Scalars["Int"]>
  sortOrder?: Maybe<SortOrder>
  sortBy?: Maybe<SurchargeSortByField>
}

export type QuerySurchargeByIdArgs = {
  shopId: Scalars["ID"]
  surchargeId: Scalars["ID"]
}

export type QueryTaxCodesArgs = {
  shopId: Scalars["ID"]
}

export type QueryTaxServicesArgs = {
  shopId: Scalars["ID"]
}

export type QueryTaxRatesArgs = {
  shopId: Scalars["ID"]
  after?: Maybe<Scalars["ConnectionCursor"]>
  before?: Maybe<Scalars["ConnectionCursor"]>
  first?: Maybe<Scalars["ConnectionLimitInt"]>
  last?: Maybe<Scalars["ConnectionLimitInt"]>
  offset?: Maybe<Scalars["Int"]>
}

export type QueryNavigationTreeByIdArgs = {
  id: Scalars["ID"]
  language: Scalars["String"]
  shopId: Scalars["ID"]
  shouldIncludeSecondary?: Maybe<Scalars["Boolean"]>
}

export type QueryNavigationItemsByShopIdArgs = {
  shopId: Scalars["ID"]
  after?: Maybe<Scalars["ConnectionCursor"]>
  before?: Maybe<Scalars["ConnectionCursor"]>
  first?: Maybe<Scalars["ConnectionLimitInt"]>
  last?: Maybe<Scalars["ConnectionLimitInt"]>
  offset?: Maybe<Scalars["Int"]>
  sortOrder?: Maybe<SortOrder>
  sortBy?: Maybe<NavigationItemSortByField>
}

export type QuerySitemapArgs = {
  handle: Scalars["String"]
  shopUrl: Scalars["String"]
}

export type QuerySearchCatalogArgs = {
  searchQuery?: Maybe<SearchQuery>
  shopIds: Array<Maybe<Scalars["ID"]>>
}

export type QueryCatalogSearchFacetsArgs = {
  shopIds: Array<Maybe<Scalars["ID"]>>
}

export type QueryFieldsTemplatesArgs = {
  searchQuery?: Maybe<InquirySearchQuery>
  shopIds?: Maybe<Array<Maybe<Scalars["ID"]>>>
}

export type QueryDigitalFulfillmentMethodArgs = {
  methodId: Scalars["ID"]
  shopId: Scalars["ID"]
}

export type QueryDigitalFulfillmentMethodsArgs = {
  shopId: Scalars["ID"]
}

export type QueryAccountOrderFulfillmentArgs = {
  shopId: Scalars["ID"]
  accountId: Scalars["ID"]
  orderReferenceId: Scalars["ID"]
}

export type QueryOrderFulfillmentArgs = {
  shopId: Scalars["ID"]
  orderId: Scalars["ID"]
}

export type QueryOrderInvoiceArgs = {
  shopId: Scalars["ID"]
  orderId: Scalars["ID"]
  languageCode?: Maybe<Scalars["String"]>
}

export type QueryReviewsArgs = {
  shopId: Scalars["ID"]
  accountId?: Maybe<Scalars["ID"]>
  attributedShopId?: Maybe<Scalars["ID"]>
  attributedProductId?: Maybe<Scalars["ID"]>
  attributedAccountId?: Maybe<Scalars["ID"]>
}

export type QueryCanAddReviewArgs = {
  shopId: Scalars["ID"]
  accountId: Scalars["ID"]
  attributedId: Scalars["ID"]
}

export type QueryReviewsAggregationArgs = {
  shopId: Scalars["ID"]
  accountId?: Maybe<Scalars["ID"]>
  attributedShopId?: Maybe<Scalars["ID"]>
  attributedProductId?: Maybe<Scalars["ID"]>
  attributedAccountId?: Maybe<Scalars["ID"]>
}

export type QuerySearchInquiriesArgs = {
  searchQuery?: Maybe<InquirySearchQuery>
  shopIds: Array<Maybe<Scalars["ID"]>>
}

export type QueryInquiriesSearchFacetsArgs = {
  shopIds: Array<Maybe<Scalars["ID"]>>
}

export type QueryAccountInquiriesArgs = {
  shopId: Scalars["ID"]
}

export type QueryInquiryArgs = {
  shopId: Scalars["ID"]
  id: Scalars["ID"]
}

export type FakeData = {
  __typename?: "FakeData"
  doNotUse?: Maybe<Scalars["String"]>
}

export type Currency = Node & {
  __typename?: "Currency"
  _id: Scalars["ID"]
  code: Scalars["String"]
  decimal?: Maybe<Scalars["String"]>
  format: Scalars["String"]
  rate?: Maybe<Scalars["Float"]>
  scale?: Maybe<Scalars["Int"]>
  symbol: Scalars["String"]
  thousand?: Maybe<Scalars["String"]>
}

export enum SortOrder {
  Asc = "asc",
  Desc = "desc"
}

export type Node = {
  _id: Scalars["ID"]
}

export type Deletable = {
  isDeleted: Scalars["Boolean"]
}

export type NodeEdge = {
  cursor: Scalars["ConnectionCursor"]
  node?: Maybe<Node>
}

export type PageInfo = {
  __typename?: "PageInfo"
  endCursor?: Maybe<Scalars["ConnectionCursor"]>
  hasNextPage: Scalars["Boolean"]
  hasPreviousPage: Scalars["Boolean"]
  startCursor?: Maybe<Scalars["ConnectionCursor"]>
}

export type EmailRecord = {
  __typename?: "EmailRecord"
  address?: Maybe<Scalars["String"]>
  provides?: Maybe<Scalars["String"]>
  verified?: Maybe<Scalars["Boolean"]>
}

export type EmailRecordInput = {
  address?: Maybe<Scalars["String"]>
  provides?: Maybe<Scalars["String"]>
  verified?: Maybe<Scalars["Boolean"]>
}

export type MetafieldInput = {
  description?: Maybe<Scalars["String"]>
  key: Scalars["String"]
  namespace?: Maybe<Scalars["String"]>
  scope?: Maybe<Scalars["String"]>
  value?: Maybe<Scalars["String"]>
  valueType?: Maybe<Scalars["String"]>
}

export type Metafield = {
  __typename?: "Metafield"
  description?: Maybe<Scalars["String"]>
  key?: Maybe<Scalars["String"]>
  namespace?: Maybe<Scalars["String"]>
  scope?: Maybe<Scalars["String"]>
  value?: Maybe<Scalars["String"]>
  valueType?: Maybe<Scalars["String"]>
}

export type AddressInput = {
  address1: Scalars["String"]
  address2?: Maybe<Scalars["String"]>
  addressName?: Maybe<Scalars["String"]>
  city: Scalars["String"]
  company?: Maybe<Scalars["String"]>
  country: Scalars["String"]
  firstName?: Maybe<Scalars["String"]>
  fullName: Scalars["String"]
  isBillingDefault?: Maybe<Scalars["Boolean"]>
  isCommercial?: Maybe<Scalars["Boolean"]>
  isShippingDefault?: Maybe<Scalars["Boolean"]>
  lastName?: Maybe<Scalars["String"]>
  metafields?: Maybe<Array<Maybe<MetafieldInput>>>
  phone: Scalars["String"]
  postal: Scalars["String"]
  region: Scalars["String"]
}

export type Address = {
  __typename?: "Address"
  _id?: Maybe<Scalars["ID"]>
  address1: Scalars["String"]
  address2?: Maybe<Scalars["String"]>
  city: Scalars["String"]
  company?: Maybe<Scalars["String"]>
  country: Scalars["String"]
  firstName?: Maybe<Scalars["String"]>
  fullName: Scalars["String"]
  isBillingDefault?: Maybe<Scalars["Boolean"]>
  isCommercial: Scalars["Boolean"]
  isShippingDefault?: Maybe<Scalars["Boolean"]>
  lastName?: Maybe<Scalars["String"]>
  metafields?: Maybe<Array<Maybe<Metafield>>>
  phone: Scalars["String"]
  postal: Scalars["String"]
  region: Scalars["String"]
}

export type AddressConnection = {
  __typename?: "AddressConnection"
  edges?: Maybe<Array<Maybe<AddressEdge>>>
  nodes?: Maybe<Array<Maybe<Address>>>
  pageInfo: PageInfo
  totalCount: Scalars["Int"]
}

export type AddressEdge = {
  __typename?: "AddressEdge"
  cursor: Scalars["ConnectionCursor"]
  node?: Maybe<Address>
}

export type Subscription = {
  __typename?: "Subscription"
  tick: Scalars["Int"]
}

export type MediaRecordInfo = {
  __typename?: "MediaRecordInfo"
  name: Scalars["String"]
  size: Scalars["Int"]
  type: Scalars["String"]
  updatedAt: Scalars["DateTime"]
  uploadedAt: Scalars["DateTime"]
}

export type MediaRecordMetadata = {
  __typename?: "MediaRecordMetadata"
  isArchived: Scalars["Boolean"]
  ownerId?: Maybe<Scalars["String"]>
  priority?: Maybe<Scalars["Int"]>
  productId?: Maybe<Scalars["String"]>
  shopId: Scalars["String"]
  type?: Maybe<Scalars["String"]>
  variantId?: Maybe<Scalars["String"]>
}

export type MediaRecord = {
  __typename?: "MediaRecord"
  _id: Scalars["ID"]
  metadata: MediaRecordMetadata
  original: MediaRecordInfo
}

export type MediaRecordInfoInput = {
  name: Scalars["String"]
  size: Scalars["Int"]
  tempStoreId: Scalars["String"]
  type: Scalars["String"]
  updatedAt: Scalars["DateTime"]
  uploadedAt: Scalars["DateTime"]
}

export type MediaRecordMetadataInput = {
  priority?: Maybe<Scalars["Int"]>
  productId?: Maybe<Scalars["ID"]>
  type?: Maybe<Scalars["String"]>
  variantId?: Maybe<Scalars["ID"]>
}

export type MediaRecordInput = {
  metadata: MediaRecordMetadataInput
  original: MediaRecordInfoInput
}

export type ArchiveMediaRecordInput = {
  clientMutationId?: Maybe<Scalars["String"]>
  mediaRecordId: Scalars["ID"]
  shopId: Scalars["ID"]
}

export type CreateMediaRecordInput = {
  clientMutationId?: Maybe<Scalars["String"]>
  mediaRecord: MediaRecordInput
  shopId: Scalars["ID"]
}

export type DeleteMediaRecordInput = {
  clientMutationId?: Maybe<Scalars["String"]>
  mediaRecordId: Scalars["ID"]
  shopId: Scalars["ID"]
}

export type UpdateMediaRecordPriorityInput = {
  clientMutationId?: Maybe<Scalars["String"]>
  mediaRecordId: Scalars["ID"]
  priority: Scalars["Int"]
  shopId: Scalars["ID"]
}

export type ArchiveMediaRecordPayload = {
  __typename?: "ArchiveMediaRecordPayload"
  clientMutationId?: Maybe<Scalars["String"]>
  mediaRecord: MediaRecord
}

export type CreateMediaRecordPayload = {
  __typename?: "CreateMediaRecordPayload"
  clientMutationId?: Maybe<Scalars["String"]>
  mediaRecord: MediaRecord
}

export type DeleteMediaRecordPayload = {
  __typename?: "DeleteMediaRecordPayload"
  clientMutationId?: Maybe<Scalars["String"]>
  mediaRecord: MediaRecord
}

export type UpdateMediaRecordPriorityPayload = {
  __typename?: "UpdateMediaRecordPriorityPayload"
  clientMutationId?: Maybe<Scalars["String"]>
  mediaRecord: MediaRecord
}

export type CreateShopInput = {
  clientMutationId?: Maybe<Scalars["String"]>
  currencyCode?: Maybe<Scalars["String"]>
  defaultLanguage?: Maybe<Scalars["String"]>
  defaultTimezone?: Maybe<Scalars["String"]>
  description?: Maybe<Scalars["String"]>
  name: Scalars["String"]
  type?: Maybe<Scalars["String"]>
}

export type CreateShopPayload = {
  __typename?: "CreateShopPayload"
  clientMutationId?: Maybe<Scalars["String"]>
  shop: Shop
}

export type ShopBrandAssets = {
  __typename?: "ShopBrandAssets"
  navbarBrandImage?: Maybe<ImageSizes>
  navbarBrandImageId?: Maybe<Scalars["String"]>
}

export type ShopLogoUrls = {
  __typename?: "ShopLogoUrls"
  primaryShopLogoUrl?: Maybe<Scalars["String"]>
}

export type StorefrontUrls = {
  __typename?: "StorefrontUrls"
  storefrontAccountProfileUrl?: Maybe<Scalars["String"]>
  storefrontHomeUrl?: Maybe<Scalars["String"]>
  storefrontLoginUrl?: Maybe<Scalars["String"]>
  storefrontOrderUrl?: Maybe<Scalars["String"]>
  storefrontOrdersUrl?: Maybe<Scalars["String"]>
}

export type ShopParcelSize = {
  __typename?: "ShopParcelSize"
  height?: Maybe<Scalars["Float"]>
  length?: Maybe<Scalars["Float"]>
  weight?: Maybe<Scalars["Float"]>
  width?: Maybe<Scalars["Float"]>
}

export type UnitOfLength = {
  __typename?: "UnitOfLength"
  default?: Maybe<Scalars["Boolean"]>
  label?: Maybe<Scalars["String"]>
  uol?: Maybe<Scalars["String"]>
}

export type UnitOfMeasure = {
  __typename?: "UnitOfMeasure"
  default?: Maybe<Scalars["Boolean"]>
  label?: Maybe<Scalars["String"]>
  uom?: Maybe<Scalars["String"]>
}

export type Shop = Node & {
  __typename?: "Shop"
  _id: Scalars["ID"]
  addressBook?: Maybe<Array<Maybe<Address>>>
  allowGuestCheckout?: Maybe<Scalars["Boolean"]>
  baseUOL?: Maybe<Scalars["String"]>
  baseUOM?: Maybe<Scalars["String"]>
  brandAssets?: Maybe<ShopBrandAssets>
  currency: Currency
  defaultParcelSize?: Maybe<ShopParcelSize>
  description?: Maybe<Scalars["String"]>
  emails?: Maybe<Array<Maybe<EmailRecord>>>
  keywords?: Maybe<Scalars["String"]>
  language: Scalars["String"]
  name: Scalars["String"]
  shopLogoUrls?: Maybe<ShopLogoUrls>
  shopType?: Maybe<Scalars["String"]>
  slug?: Maybe<Scalars["String"]>
  storefrontUrls?: Maybe<StorefrontUrls>
  timezone?: Maybe<Scalars["String"]>
  unitsOfLength?: Maybe<Array<Maybe<UnitOfLength>>>
  unitsOfMeasure?: Maybe<Array<Maybe<UnitOfMeasure>>>
  groups?: Maybe<GroupConnection>
  roles?: Maybe<RoleConnection>
  tags?: Maybe<TagConnection>
  defaultNavigationTree?: Maybe<NavigationTree>
  defaultNavigationTreeId?: Maybe<Scalars["String"]>
  invoiceDetails?: Maybe<InvoiceDetails>
}

export type ShopGroupsArgs = {
  after?: Maybe<Scalars["ConnectionCursor"]>
  before?: Maybe<Scalars["ConnectionCursor"]>
  first?: Maybe<Scalars["ConnectionLimitInt"]>
  last?: Maybe<Scalars["ConnectionLimitInt"]>
  offset?: Maybe<Scalars["Int"]>
  sortOrder?: Maybe<SortOrder>
  sortBy?: Maybe<GroupSortByField>
}

export type ShopRolesArgs = {
  after?: Maybe<Scalars["ConnectionCursor"]>
  before?: Maybe<Scalars["ConnectionCursor"]>
  first?: Maybe<Scalars["ConnectionLimitInt"]>
  last?: Maybe<Scalars["ConnectionLimitInt"]>
  offset?: Maybe<Scalars["Int"]>
  sortOrder?: Maybe<SortOrder>
  sortBy?: Maybe<RoleSortByField>
}

export type ShopTagsArgs = {
  isTopLevel?: Maybe<Scalars["Boolean"]>
  shouldIncludeDeleted?: Maybe<Scalars["Boolean"]>
  after?: Maybe<Scalars["ConnectionCursor"]>
  before?: Maybe<Scalars["ConnectionCursor"]>
  first?: Maybe<Scalars["ConnectionLimitInt"]>
  last?: Maybe<Scalars["ConnectionLimitInt"]>
  offset?: Maybe<Scalars["Int"]>
  sortOrder?: Maybe<SortOrder>
  sortBy?: Maybe<TagSortByField>
}

export type ShopDefaultNavigationTreeArgs = {
  language: Scalars["String"]
  shouldIncludeSecondary?: Maybe<Scalars["Boolean"]>
}

export type ShopConnection = {
  __typename?: "ShopConnection"
  edges?: Maybe<Array<Maybe<ShopEdge>>>
  nodes?: Maybe<Array<Maybe<Shop>>>
  pageInfo: PageInfo
  totalCount: Scalars["Int"]
}

export type ShopEdge = NodeEdge & {
  __typename?: "ShopEdge"
  cursor: Scalars["ConnectionCursor"]
  node?: Maybe<Shop>
}

export type StorefrontUrlsInput = {
  storefrontAccountProfileUrl?: Maybe<Scalars["String"]>
  storefrontHomeUrl?: Maybe<Scalars["String"]>
  storefrontLoginUrl?: Maybe<Scalars["String"]>
  storefrontOrderUrl?: Maybe<Scalars["String"]>
  storefrontOrdersUrl?: Maybe<Scalars["String"]>
}

export type ShopLogoUrlsInput = {
  primaryShopLogoUrl?: Maybe<Scalars["String"]>
}

export type ShopParcelSizeInput = {
  height?: Maybe<Scalars["Float"]>
  length?: Maybe<Scalars["Float"]>
  weight?: Maybe<Scalars["Float"]>
  width?: Maybe<Scalars["Float"]>
}

export type UpdateShopInput = {
  addressBook?: Maybe<Array<Maybe<AddressInput>>>
  allowGuestCheckout?: Maybe<Scalars["Boolean"]>
  baseUOL?: Maybe<Scalars["String"]>
  baseUOM?: Maybe<Scalars["String"]>
  brandAssets?: Maybe<Scalars["ID"]>
  clientMutationId?: Maybe<Scalars["String"]>
  currency?: Maybe<Scalars["String"]>
  defaultParcelSize?: Maybe<ShopParcelSizeInput>
  description?: Maybe<Scalars["String"]>
  emails?: Maybe<Array<Maybe<EmailRecordInput>>>
  keywords?: Maybe<Scalars["String"]>
  language?: Maybe<Scalars["String"]>
  name?: Maybe<Scalars["String"]>
  shopId: Scalars["ID"]
  shopLogoUrls?: Maybe<ShopLogoUrlsInput>
  slug?: Maybe<Scalars["String"]>
  storefrontUrls?: Maybe<StorefrontUrlsInput>
  timezone?: Maybe<Scalars["String"]>
}

export type UpdateShopPayload = {
  __typename?: "UpdateShopPayload"
  clientMutationId?: Maybe<Scalars["String"]>
  shop: Shop
}

export type GlobalSettings = {
  __typename?: "GlobalSettings"
  doNotUse?: Maybe<Scalars["String"]>
}

export type ShopSettings = {
  __typename?: "ShopSettings"
  doNotUse?: Maybe<Scalars["String"]>
  canSellVariantWithoutInventory: Scalars["Boolean"]
  defaultTaxCode?: Maybe<Scalars["String"]>
  fallbackTaxServiceName?: Maybe<Scalars["String"]>
  primaryTaxServiceName?: Maybe<Scalars["String"]>
  shouldNavigationTreeItemsBeAdminOnly: Scalars["Boolean"]
  shouldNavigationTreeItemsBePubliclyVisible: Scalars["Boolean"]
  shouldNavigationTreeItemsBeSecondaryNavOnly: Scalars["Boolean"]
  sitemapRefreshPeriod: Scalars["String"]
}

export type UpdateGlobalSettingsInput = {
  clientMutationId?: Maybe<Scalars["String"]>
  settingsUpdates: GlobalSettingsUpdates
}

export type GlobalSettingsUpdates = {
  doNotUse?: Maybe<Scalars["String"]>
}

export type UpdateGlobalSettingsPayload = {
  __typename?: "UpdateGlobalSettingsPayload"
  clientMutationId?: Maybe<Scalars["String"]>
  globalSettings: GlobalSettings
}

export type UpdateShopSettingsInput = {
  clientMutationId?: Maybe<Scalars["String"]>
  settingsUpdates: ShopSettingsUpdates
  shopId: Scalars["ID"]
}

export type ShopSettingsUpdates = {
  doNotUse?: Maybe<Scalars["String"]>
  canSellVariantWithoutInventory?: Maybe<Scalars["Boolean"]>
  defaultTaxCode?: Maybe<Scalars["String"]>
  fallbackTaxServiceName?: Maybe<Scalars["String"]>
  primaryTaxServiceName?: Maybe<Scalars["String"]>
  shouldNavigationTreeItemsBeAdminOnly?: Maybe<Scalars["Boolean"]>
  shouldNavigationTreeItemsBePubliclyVisible?: Maybe<Scalars["Boolean"]>
  shouldNavigationTreeItemsBeSecondaryNavOnly?: Maybe<Scalars["Boolean"]>
  sitemapRefreshPeriod?: Maybe<Scalars["String"]>
}

export type UpdateShopSettingsPayload = {
  __typename?: "UpdateShopSettingsPayload"
  clientMutationId?: Maybe<Scalars["String"]>
  shopSettings: ShopSettings
}

export type EmailJobData = {
  __typename?: "EmailJobData"
  to: Scalars["String"]
  subject: Scalars["String"]
}

export type EmailJob = {
  __typename?: "EmailJob"
  _id: Scalars["ID"]
  updated: Scalars["DateTime"]
  status: Scalars["String"]
  data: EmailJobData
  createdAt: Scalars["DateTime"]
  updatedAt: Scalars["DateTime"]
}

export type EmailJobEdge = {
  __typename?: "EmailJobEdge"
  cursor: Scalars["ConnectionCursor"]
  node?: Maybe<EmailJob>
}

export type EmailJobConnection = {
  __typename?: "EmailJobConnection"
  edges?: Maybe<Array<Maybe<EmailJobEdge>>>
  nodes?: Maybe<Array<Maybe<EmailJob>>>
  pageInfo: PageInfo
  totalCount: Scalars["Int"]
}

export type RetryFailedEmailInput = {
  clientMutationId?: Maybe<Scalars["String"]>
  jobId: Scalars["ID"]
  shopId: Scalars["ID"]
}

export type RetryFailedEmailPayload = {
  __typename?: "RetryFailedEmailPayload"
  clientMutationId?: Maybe<Scalars["String"]>
  emailSent: Scalars["Boolean"]
}

export type VerifySmtpEmailSettingsInput = {
  shopId: Scalars["ID"]
}

export type VerifySmtpEmailSettingsInputPayload = {
  __typename?: "VerifySMTPEmailSettingsInputPayload"
  clientMutationId?: Maybe<Scalars["String"]>
  isVerified: Scalars["Boolean"]
}

export type Template = Node & {
  __typename?: "Template"
  _id: Scalars["ID"]
  language?: Maybe<Scalars["String"]>
  name?: Maybe<Scalars["String"]>
  shopId: Scalars["ID"]
  subject?: Maybe<Scalars["String"]>
  template?: Maybe<Scalars["String"]>
  title?: Maybe<Scalars["String"]>
}

export type TemplateEdge = {
  __typename?: "TemplateEdge"
  cursor: Scalars["ConnectionCursor"]
  node?: Maybe<Template>
}

export type TemplateConnection = {
  __typename?: "TemplateConnection"
  edges?: Maybe<Array<Maybe<TemplateEdge>>>
  nodes?: Maybe<Array<Maybe<Template>>>
  pageInfo: PageInfo
  totalCount: Scalars["Int"]
}

export type UpdateTemplateInput = {
  clientMutationId?: Maybe<Scalars["String"]>
  id: Scalars["ID"]
  shopId: Scalars["ID"]
  subject?: Maybe<Scalars["String"]>
  template?: Maybe<Scalars["String"]>
  title?: Maybe<Scalars["String"]>
}

export type UpdateTemplatePayload = {
  __typename?: "UpdateTemplatePayload"
  clientMutationId?: Maybe<Scalars["String"]>
  template: Template
}

export type AddressValidationService = {
  __typename?: "AddressValidationService"
  displayName: Scalars["String"]
  name: Scalars["String"]
  supportedCountryCodes?: Maybe<Array<Maybe<Scalars["String"]>>>
}

export type AddressValidationError = {
  __typename?: "AddressValidationError"
  details?: Maybe<Scalars["String"]>
  source?: Maybe<Scalars["String"]>
  summary: Scalars["String"]
  type: Scalars["String"]
}

export type SuggestedAddress = {
  __typename?: "SuggestedAddress"
  address1: Scalars["String"]
  address2?: Maybe<Scalars["String"]>
  city: Scalars["String"]
  country: Scalars["String"]
  postal: Scalars["String"]
  region: Scalars["String"]
}

export type AddressValidationResults = {
  __typename?: "AddressValidationResults"
  suggestedAddresses: Array<Maybe<SuggestedAddress>>
  validationErrors: Array<Maybe<AddressValidationError>>
}

export type AddressValidationRule = Node & {
  __typename?: "AddressValidationRule"
  _id: Scalars["ID"]
  countryCodes?: Maybe<Array<Maybe<Scalars["String"]>>>
  createdAt: Scalars["DateTime"]
  serviceName: Scalars["String"]
  shopId: Scalars["ID"]
  updatedAt: Scalars["DateTime"]
}

export type CreateAddressValidationRuleInput = {
  clientMutationId?: Maybe<Scalars["String"]>
  countryCodes?: Maybe<Array<Maybe<Scalars["String"]>>>
  serviceName: Scalars["String"]
  shopId: Scalars["ID"]
}

export type DeleteAddressValidationRuleInput = {
  clientMutationId?: Maybe<Scalars["String"]>
  ruleId: Scalars["ID"]
  shopId: Scalars["ID"]
}

export type UpdateAddressValidationRuleInput = {
  clientMutationId?: Maybe<Scalars["String"]>
  countryCodes?: Maybe<Array<Maybe<Scalars["String"]>>>
  ruleId: Scalars["ID"]
  serviceName: Scalars["String"]
  shopId: Scalars["ID"]
}

export type CreateAddressValidationRulePayload = {
  __typename?: "CreateAddressValidationRulePayload"
  addressValidationRule: AddressValidationRule
  clientMutationId?: Maybe<Scalars["String"]>
}

export type DeleteAddressValidationRulePayload = {
  __typename?: "DeleteAddressValidationRulePayload"
  addressValidationRule: AddressValidationRule
  clientMutationId?: Maybe<Scalars["String"]>
}

export type UpdateAddressValidationRulePayload = {
  __typename?: "UpdateAddressValidationRulePayload"
  addressValidationRule: AddressValidationRule
  clientMutationId?: Maybe<Scalars["String"]>
}

export type AddressValidationRuleEdge = NodeEdge & {
  __typename?: "AddressValidationRuleEdge"
  cursor: Scalars["ConnectionCursor"]
  node?: Maybe<AddressValidationRule>
}

export type AddressValidationRuleConnection = {
  __typename?: "AddressValidationRuleConnection"
  edges?: Maybe<Array<Maybe<AddressValidationRuleEdge>>>
  nodes?: Maybe<Array<Maybe<AddressValidationRule>>>
  pageInfo: PageInfo
  totalCount: Scalars["Int"]
}

export enum AddressValidationRuleSortByField {
  Id = "_id",
  CreatedAt = "createdAt",
  ServiceName = "serviceName",
  UpdatedAt = "updatedAt"
}

export type Plugin = {
  __typename?: "Plugin"
  name: Scalars["String"]
  version?: Maybe<Scalars["String"]>
}

export type DatabaseInformation = {
  __typename?: "DatabaseInformation"
  version: Scalars["String"]
}

export type SystemInformation = {
  __typename?: "SystemInformation"
  apiVersion: Scalars["String"]
  mongoVersion: DatabaseInformation
  plugins?: Maybe<Array<Maybe<Plugin>>>
}

export enum AccountSortByField {
  Id = "_id",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt"
}

export enum AddressType {
  Billing = "billing",
  Shipping = "shipping"
}

export type AddAccountAddressBookEntryInput = {
  accountId: Scalars["ID"]
  address: AddressInput
  clientMutationId?: Maybe<Scalars["String"]>
}

export type CreateAccountInput = {
  bio?: Maybe<Scalars["String"]>
  emails: Array<Maybe<EmailRecordInput>>
  name?: Maybe<Scalars["String"]>
  picture?: Maybe<Scalars["String"]>
  shopId: Scalars["ID"]
  userId: Scalars["ID"]
  username?: Maybe<Scalars["String"]>
  clientMutationId?: Maybe<Scalars["String"]>
}

export type UpdateAccountAddressBookEntryInput = {
  accountId: Scalars["ID"]
  addressId: Scalars["ID"]
  clientMutationId?: Maybe<Scalars["String"]>
  type?: Maybe<AddressType>
  updates: AddressInput
}

export type RemoveAccountAddressBookEntryInput = {
  accountId: Scalars["ID"]
  addressId: Scalars["ID"]
  clientMutationId?: Maybe<Scalars["String"]>
}

export type SendResetAccountPasswordEmailInput = {
  clientMutationId?: Maybe<Scalars["String"]>
  email: Scalars["String"]
}

export type UpdateAccountInput = {
  accountId?: Maybe<Scalars["ID"]>
  bio?: Maybe<Scalars["String"]>
  clientMutationId?: Maybe<Scalars["String"]>
  currencyCode?: Maybe<Scalars["String"]>
  firstName?: Maybe<Scalars["String"]>
  language?: Maybe<Scalars["String"]>
  lastName?: Maybe<Scalars["String"]>
  name?: Maybe<Scalars["String"]>
  note?: Maybe<Scalars["String"]>
  picture?: Maybe<Scalars["String"]>
  username?: Maybe<Scalars["String"]>
}

export type AddAccountEmailRecordInput = {
  accountId?: Maybe<Scalars["ID"]>
  clientMutationId?: Maybe<Scalars["String"]>
  email: Scalars["Email"]
}

export type RemoveAccountEmailRecordInput = {
  accountId?: Maybe<Scalars["ID"]>
  clientMutationId?: Maybe<Scalars["String"]>
  email: Scalars["Email"]
}

export type SetAccountDefaultEmailInput = {
  accountId?: Maybe<Scalars["ID"]>
  clientMutationId?: Maybe<Scalars["String"]>
  email: Scalars["Email"]
}

export type UpdateGroupsForAccountsInput = {
  accountIds: Array<Maybe<Scalars["ID"]>>
  clientMutationId?: Maybe<Scalars["String"]>
  groupIds: Array<Maybe<Scalars["ID"]>>
}

export type Account = Node & {
  __typename?: "Account"
  _id: Scalars["ID"]
  addressBook?: Maybe<AddressConnection>
  adminUIShops?: Maybe<Array<Maybe<Shop>>>
  bio?: Maybe<Scalars["String"]>
  createdAt: Scalars["DateTime"]
  currency?: Maybe<Currency>
  emailRecords?: Maybe<Array<Maybe<EmailRecord>>>
  firstName?: Maybe<Scalars["String"]>
  language?: Maybe<Scalars["String"]>
  lastName?: Maybe<Scalars["String"]>
  metafields?: Maybe<Array<Maybe<Metafield>>>
  name?: Maybe<Scalars["String"]>
  note?: Maybe<Scalars["String"]>
  picture?: Maybe<Scalars["String"]>
  preferences?: Maybe<Scalars["JSONObject"]>
  primaryEmailAddress: Scalars["Email"]
  updatedAt?: Maybe<Scalars["DateTime"]>
  userId: Scalars["String"]
  username?: Maybe<Scalars["String"]>
  groups?: Maybe<GroupConnection>
}

export type AccountAddressBookArgs = {
  after?: Maybe<Scalars["ConnectionCursor"]>
  before?: Maybe<Scalars["ConnectionCursor"]>
  first?: Maybe<Scalars["ConnectionLimitInt"]>
  last?: Maybe<Scalars["ConnectionLimitInt"]>
  offset?: Maybe<Scalars["Int"]>
}

export type AccountGroupsArgs = {
  after?: Maybe<Scalars["ConnectionCursor"]>
  before?: Maybe<Scalars["ConnectionCursor"]>
  first?: Maybe<Scalars["ConnectionLimitInt"]>
  last?: Maybe<Scalars["ConnectionLimitInt"]>
  offset?: Maybe<Scalars["Int"]>
  sortOrder?: Maybe<SortOrder>
  sortBy?: Maybe<GroupSortByField>
}

export type BasicAccount = Node & {
  __typename?: "BasicAccount"
  _id: Scalars["ID"]
  acceptsMarketing?: Maybe<Scalars["Boolean"]>
  emails?: Maybe<Array<Maybe<EmailRecord>>>
  groups?: Maybe<Array<Maybe<Scalars["String"]>>>
  name?: Maybe<Scalars["String"]>
  profile?: Maybe<Array<Maybe<Profile>>>
  shopId?: Maybe<Scalars["String"]>
  state?: Maybe<Scalars["String"]>
  userId?: Maybe<Scalars["String"]>
  createdAt?: Maybe<Scalars["DateTime"]>
  updatedAt?: Maybe<Scalars["DateTime"]>
  adminUIShopIds?: Maybe<Array<Maybe<Scalars["String"]>>>
}

export type Profile = {
  __typename?: "Profile"
  addressBook?: Maybe<Array<Maybe<Address>>>
}

export type AccountConnection = {
  __typename?: "AccountConnection"
  edges?: Maybe<Array<Maybe<AccountEdge>>>
  nodes?: Maybe<Array<Maybe<Account>>>
  pageInfo: PageInfo
  totalCount: Scalars["Int"]
}

export type AccountEdge = NodeEdge & {
  __typename?: "AccountEdge"
  cursor: Scalars["ConnectionCursor"]
  node?: Maybe<Account>
}

export type AddAccountAddressBookEntryPayload = {
  __typename?: "AddAccountAddressBookEntryPayload"
  address?: Maybe<Address>
  addressEdge?: Maybe<AddressEdge>
  clientMutationId?: Maybe<Scalars["String"]>
}

export type AddAccountEmailRecordPayload = {
  __typename?: "AddAccountEmailRecordPayload"
  account?: Maybe<Account>
  clientMutationId?: Maybe<Scalars["String"]>
}

export type CreateAccountPayload = {
  __typename?: "CreateAccountPayload"
  account?: Maybe<BasicAccount>
  clientMutationId?: Maybe<Scalars["String"]>
}

export type SendResetAccountPasswordEmailPayload = {
  __typename?: "SendResetAccountPasswordEmailPayload"
  clientMutationId?: Maybe<Scalars["String"]>
  email: Scalars["String"]
}

export type RemoveAccountAddressBookEntryPayload = {
  __typename?: "RemoveAccountAddressBookEntryPayload"
  address?: Maybe<Address>
  clientMutationId?: Maybe<Scalars["String"]>
}

export type RemoveAccountEmailRecordPayload = {
  __typename?: "RemoveAccountEmailRecordPayload"
  account?: Maybe<Account>
  clientMutationId?: Maybe<Scalars["String"]>
}

export type SetAccountDefaultEmailPayload = {
  __typename?: "SetAccountDefaultEmailPayload"
  account?: Maybe<Account>
  clientMutationId?: Maybe<Scalars["String"]>
}

export type UpdateAccountAddressBookEntryPayload = {
  __typename?: "UpdateAccountAddressBookEntryPayload"
  address?: Maybe<Address>
  clientMutationId?: Maybe<Scalars["String"]>
}

export type UpdateAccountPayload = {
  __typename?: "UpdateAccountPayload"
  account: Account
  clientMutationId?: Maybe<Scalars["String"]>
}

export type UpdateGroupsForAccountsPayload = {
  __typename?: "UpdateGroupsForAccountsPayload"
  clientMutationId?: Maybe<Scalars["String"]>
  accounts: Array<Maybe<Account>>
}

export type GrantOrRevokeAdminUiAccessInput = {
  clientMutationId?: Maybe<Scalars["String"]>
  accountId: Scalars["String"]
  shopId: Scalars["String"]
}

export type UpdateAdminUiAccessInput = {
  clientMutationId?: Maybe<Scalars["String"]>
  accountIds: Array<Maybe<Scalars["String"]>>
  shopIds: Array<Maybe<Scalars["String"]>>
}

export type GrantOrRevokeAdminUiAccessPayload = {
  __typename?: "GrantOrRevokeAdminUIAccessPayload"
  clientMutationId?: Maybe<Scalars["String"]>
  account?: Maybe<Account>
}

export type UpdateAdminUiAccessPayload = {
  __typename?: "UpdateAdminUIAccessPayload"
  clientMutationId?: Maybe<Scalars["String"]>
  accounts?: Maybe<Array<Maybe<Account>>>
}

export enum GroupSortByField {
  Id = "_id",
  CreatedAt = "createdAt",
  Name = "name",
  UpdatedAt = "updatedAt"
}

export type GroupInput = {
  description?: Maybe<Scalars["String"]>
  name: Scalars["String"]
  slug?: Maybe<Scalars["String"]>
  permissions?: Maybe<Array<Maybe<Scalars["String"]>>>
}

export type UpdateGroupInput = {
  description?: Maybe<Scalars["String"]>
  name?: Maybe<Scalars["String"]>
  slug?: Maybe<Scalars["String"]>
  permissions?: Maybe<Array<Maybe<Scalars["String"]>>>
}

export type CreateAccountGroupInput = {
  clientMutationId?: Maybe<Scalars["String"]>
  group: GroupInput
  shopId?: Maybe<Scalars["ID"]>
}

export type UpdateAccountGroupInput = {
  clientMutationId?: Maybe<Scalars["String"]>
  group: UpdateGroupInput
  groupId: Scalars["ID"]
  shopId?: Maybe<Scalars["ID"]>
}

export type RemoveAccountGroupInput = {
  clientMutationId?: Maybe<Scalars["String"]>
  groupId: Scalars["ID"]
  shopId?: Maybe<Scalars["ID"]>
}

export type AddAccountToGroupInput = {
  accountId: Scalars["ID"]
  clientMutationId?: Maybe<Scalars["String"]>
  groupId: Scalars["ID"]
}

export type RemoveAccountFromGroupInput = {
  accountId: Scalars["ID"]
  clientMutationId?: Maybe<Scalars["String"]>
  groupId: Scalars["ID"]
}

export type Group = Node & {
  __typename?: "Group"
  _id: Scalars["ID"]
  createdAt: Scalars["DateTime"]
  createdBy?: Maybe<Account>
  description?: Maybe<Scalars["String"]>
  name: Scalars["String"]
  shop?: Maybe<Shop>
  slug: Scalars["String"]
  updatedAt: Scalars["DateTime"]
  permissions?: Maybe<Array<Maybe<Scalars["String"]>>>
}

export type GroupConnection = {
  __typename?: "GroupConnection"
  edges?: Maybe<Array<Maybe<GroupEdge>>>
  nodes?: Maybe<Array<Maybe<Group>>>
  pageInfo: PageInfo
  totalCount: Scalars["Int"]
}

export type GroupEdge = NodeEdge & {
  __typename?: "GroupEdge"
  cursor: Scalars["ConnectionCursor"]
  node?: Maybe<Group>
}

export type AddAccountToGroupPayload = {
  __typename?: "AddAccountToGroupPayload"
  clientMutationId?: Maybe<Scalars["String"]>
  group?: Maybe<Group>
}

export type CreateAccountGroupPayload = {
  __typename?: "CreateAccountGroupPayload"
  clientMutationId?: Maybe<Scalars["String"]>
  group?: Maybe<Group>
}

export type UpdateAccountGroupPayload = {
  __typename?: "UpdateAccountGroupPayload"
  clientMutationId?: Maybe<Scalars["String"]>
  group?: Maybe<Group>
}

export type RemoveAccountFromGroupPayload = {
  __typename?: "RemoveAccountFromGroupPayload"
  clientMutationId?: Maybe<Scalars["String"]>
  group: Group
}

export type RemoveAccountGroupPayload = {
  __typename?: "RemoveAccountGroupPayload"
  clientMutationId?: Maybe<Scalars["String"]>
  group?: Maybe<Group>
}

export type InviteShopMemberInput = {
  clientMutationId?: Maybe<Scalars["String"]>
  email: Scalars["String"]
  groupId?: Maybe<Scalars["ID"]>
  groupIds?: Maybe<Array<Maybe<Scalars["ID"]>>>
  name: Scalars["String"]
  shopId: Scalars["ID"]
  shouldGetAdminUIAccess?: Maybe<Scalars["Boolean"]>
}

export type InviteShopMemberPayload = {
  __typename?: "InviteShopMemberPayload"
  account?: Maybe<Account>
  clientMutationId?: Maybe<Scalars["String"]>
}

export type InvitationConnection = {
  __typename?: "InvitationConnection"
  edges?: Maybe<Array<Maybe<InvitationEdge>>>
  nodes?: Maybe<Array<Maybe<Invitation>>>
  pageInfo: PageInfo
  totalCount: Scalars["Int"]
}

export type InvitationEdge = NodeEdge & {
  __typename?: "InvitationEdge"
  cursor: Scalars["ConnectionCursor"]
  node?: Maybe<Invitation>
}

export type Invitation = Node & {
  __typename?: "Invitation"
  _id: Scalars["ID"]
  email: Scalars["String"]
  groups: Array<Maybe<Group>>
  shop?: Maybe<Shop>
  invitedBy?: Maybe<Account>
}

export enum RoleSortByField {
  Id = "_id",
  Name = "name"
}

export type Role = Node & {
  __typename?: "Role"
  _id: Scalars["ID"]
  name: Scalars["String"]
}

export type RoleConnection = {
  __typename?: "RoleConnection"
  edges?: Maybe<Array<Maybe<RoleEdge>>>
  nodes?: Maybe<Array<Maybe<Role>>>
  pageInfo: PageInfo
  totalCount: Scalars["Int"]
}

export type RoleEdge = NodeEdge & {
  __typename?: "RoleEdge"
  cursor: Scalars["ConnectionCursor"]
  node?: Maybe<Role>
}

export type Product = {
  __typename?: "Product"
  _id: Scalars["ID"]
  createdAt: Scalars["DateTime"]
  currentProductHash?: Maybe<Scalars["String"]>
  description?: Maybe<Scalars["String"]>
  isDeleted: Scalars["Boolean"]
  isVisible: Scalars["Boolean"]
  media?: Maybe<Array<Maybe<ImageInfo>>>
  metaDescription?: Maybe<Scalars["String"]>
  metafields: Array<Maybe<Metafield>>
  originCountry?: Maybe<Scalars["String"]>
  pageTitle?: Maybe<Scalars["String"]>
  productType?: Maybe<Scalars["String"]>
  publishedAt?: Maybe<Scalars["DateTime"]>
  publishedProductHash?: Maybe<Scalars["String"]>
  shop: Shop
  shouldAppearInSitemap?: Maybe<Scalars["Boolean"]>
  slug?: Maybe<Scalars["String"]>
  socialMetadata?: Maybe<Array<Maybe<SocialMetadata>>>
  supportedFulfillmentTypes: Array<Maybe<FulfillmentType>>
  tagIds?: Maybe<Array<Maybe<Scalars["ID"]>>>
  tags?: Maybe<TagConnection>
  title?: Maybe<Scalars["String"]>
  updatedAt?: Maybe<Scalars["DateTime"]>
  variants: Array<Maybe<ProductVariant>>
  vendor?: Maybe<Scalars["String"]>
  /** @deprecated Use `pricing` */
  price?: Maybe<ProductPriceRange>
  pricing: ProductPricingInfo
  owners?: Maybe<Array<Scalars["String"]>>
  rating?: Maybe<Scalars["Int"]>
  dataClassification?: Maybe<DataClassificationEnum>
  themes?: Maybe<Array<ThemesEnum>>
}

export type ProductMediaArgs = {
  shouldIncludeVariantMedia?: Maybe<Scalars["Boolean"]>
}

export type ProductTagsArgs = {
  after?: Maybe<Scalars["ConnectionCursor"]>
  before?: Maybe<Scalars["ConnectionCursor"]>
  first?: Maybe<Scalars["ConnectionLimitInt"]>
  last?: Maybe<Scalars["ConnectionLimitInt"]>
  offset?: Maybe<Scalars["Int"]>
  sortOrder?: Maybe<SortOrder>
  sortBy?: Maybe<TagSortByField>
}

export type ProductVariantsArgs = {
  shouldIncludeHidden?: Maybe<Scalars["Boolean"]>
  shouldIncludeArchived?: Maybe<Scalars["Boolean"]>
}

export type ProductVariant = {
  __typename?: "ProductVariant"
  _id: Scalars["ID"]
  attributeLabel?: Maybe<Scalars["String"]>
  barcode?: Maybe<Scalars["String"]>
  createdAt?: Maybe<Scalars["DateTime"]>
  height?: Maybe<Scalars["Float"]>
  index?: Maybe<Scalars["Int"]>
  isDeleted: Scalars["Boolean"]
  isVisible: Scalars["Boolean"]
  length?: Maybe<Scalars["Float"]>
  media?: Maybe<Array<Maybe<ImageInfo>>>
  metafields: Array<Maybe<Metafield>>
  minOrderQuantity?: Maybe<Scalars["Int"]>
  optionTitle?: Maybe<Scalars["String"]>
  options: Array<Maybe<ProductVariant>>
  originCountry?: Maybe<Scalars["String"]>
  shop: Shop
  sku?: Maybe<Scalars["String"]>
  title?: Maybe<Scalars["String"]>
  updatedAt?: Maybe<Scalars["DateTime"]>
  weight?: Maybe<Scalars["Float"]>
  width?: Maybe<Scalars["Float"]>
  /** @deprecated Use `pricing` */
  compareAtPrice?: Maybe<Scalars["Float"]>
  /** @deprecated Use `pricing` */
  price?: Maybe<Scalars["Float"]>
  pricing: ProductPricingInfo
  isTaxable?: Maybe<Scalars["Boolean"]>
  taxCode?: Maybe<Scalars["String"]>
  taxDescription?: Maybe<Scalars["String"]>
  distributions?: Maybe<Array<Maybe<Distribution>>>
  dataQuality?: Maybe<DataQuality>
  priceModel?: Maybe<PriceModel>
  versionInfo?: Maybe<Scalars["String"]>
  versionNotes?: Maybe<Scalars["String"]>
  updateCycle?: Maybe<Scalars["String"]>
  assetType?: Maybe<Scalars["String"]>
  templates?: Maybe<Array<Maybe<FieldsTemplate>>>
  templatesFields?: Maybe<Scalars["JSON"]>
}

export type ProductVariantOptionsArgs = {
  shouldIncludeHidden?: Maybe<Scalars["Boolean"]>
  shouldIncludeArchived?: Maybe<Scalars["Boolean"]>
}

export type ArchiveProductsPayload = {
  __typename?: "ArchiveProductsPayload"
  clientMutationId?: Maybe<Scalars["String"]>
  products: Array<Maybe<Product>>
}

export type ArchiveProductVariantsPayload = {
  __typename?: "ArchiveProductVariantsPayload"
  clientMutationId?: Maybe<Scalars["String"]>
  variants: Array<Maybe<ProductVariant>>
}

export type UpdateProductsVisibilityPayload = {
  __typename?: "UpdateProductsVisibilityPayload"
  clientMutationId?: Maybe<Scalars["String"]>
  updatedCount?: Maybe<Scalars["Int"]>
}

export type CreateProductPayload = {
  __typename?: "CreateProductPayload"
  clientMutationId?: Maybe<Scalars["String"]>
  product: Product
}

export type CreateProductVariantPayload = {
  __typename?: "CreateProductVariantPayload"
  clientMutationId?: Maybe<Scalars["String"]>
  variant: ProductVariant
}

export type CloneProductsPayload = {
  __typename?: "CloneProductsPayload"
  clientMutationId?: Maybe<Scalars["String"]>
  products: Array<Maybe<Product>>
}

export type CloneProductVariantsPayload = {
  __typename?: "CloneProductVariantsPayload"
  clientMutationId?: Maybe<Scalars["String"]>
  variants: Array<Maybe<ProductVariant>>
}

export type UpdateProductPayload = {
  __typename?: "UpdateProductPayload"
  clientMutationId?: Maybe<Scalars["String"]>
  product: Product
}

export type UpdateProductVariantPayload = {
  __typename?: "UpdateProductVariantPayload"
  clientMutationId?: Maybe<Scalars["String"]>
  variant: ProductVariant
}

export type ProductEdge = {
  __typename?: "ProductEdge"
  cursor: Scalars["ConnectionCursor"]
  node?: Maybe<Product>
}

export type ProductConnection = {
  __typename?: "ProductConnection"
  edges?: Maybe<Array<Maybe<ProductEdge>>>
  nodes?: Maybe<Array<Maybe<Product>>>
  pageInfo: PageInfo
  totalCount: Scalars["Int"]
}

export type ArchiveProductsInput = {
  productIds: Array<Maybe<Scalars["ID"]>>
  shopId: Scalars["ID"]
}

export type ArchiveProductVariantsInput = {
  shopId: Scalars["ID"]
  variantIds: Array<Maybe<Scalars["ID"]>>
}

export type UpdateProductsVisibilityInput = {
  isVisible: Scalars["Boolean"]
  productIds: Array<Maybe<Scalars["ID"]>>
  shopId: Scalars["ID"]
}

export type CreateProductInput = {
  product?: Maybe<ProductInput>
  shopId: Scalars["ID"]
  shouldCreateFirstVariant?: Maybe<Scalars["Boolean"]>
}

export type CreateProductVariantInput = {
  productId: Scalars["ID"]
  shopId: Scalars["ID"]
  variant?: Maybe<ProductVariantInput>
}

export type CloneProductsInput = {
  productIds: Array<Maybe<Scalars["ID"]>>
  shopId: Scalars["ID"]
}

export type CloneProductVariantsInput = {
  shopId: Scalars["ID"]
  variantIds: Array<Maybe<Scalars["ID"]>>
}

export type UpdateProductInput = {
  product: ProductInput
  productId: Scalars["ID"]
  shopId: Scalars["ID"]
}

export type ProductInput = {
  _id?: Maybe<Scalars["String"]>
  description?: Maybe<Scalars["String"]>
  facebookMsg?: Maybe<Scalars["String"]>
  googleplusMsg?: Maybe<Scalars["String"]>
  isDeleted?: Maybe<Scalars["Boolean"]>
  isVisible?: Maybe<Scalars["Boolean"]>
  metaDescription?: Maybe<Scalars["String"]>
  metafields?: Maybe<Array<Maybe<MetafieldInput>>>
  originCountry?: Maybe<Scalars["String"]>
  pageTitle?: Maybe<Scalars["String"]>
  pinterestMsg?: Maybe<Scalars["String"]>
  productType?: Maybe<Scalars["String"]>
  shouldAppearInSitemap?: Maybe<Scalars["Boolean"]>
  slug?: Maybe<Scalars["String"]>
  supportedFulfillmentTypes?: Maybe<Array<Maybe<FulfillmentType>>>
  tagIds?: Maybe<Array<Maybe<Scalars["ID"]>>>
  title?: Maybe<Scalars["String"]>
  twitterMsg?: Maybe<Scalars["String"]>
  vendor?: Maybe<Scalars["String"]>
  owners?: Maybe<Array<Scalars["String"]>>
  dataClassification?: Maybe<DataClassificationEnum>
  themes?: Maybe<Array<ThemesEnum>>
}

export type ProductVariantInput = {
  _id?: Maybe<Scalars["String"]>
  attributeLabel?: Maybe<Scalars["String"]>
  barcode?: Maybe<Scalars["String"]>
  height?: Maybe<Scalars["Float"]>
  index?: Maybe<Scalars["Int"]>
  isDeleted?: Maybe<Scalars["Boolean"]>
  isVisible?: Maybe<Scalars["Boolean"]>
  length?: Maybe<Scalars["Float"]>
  metafields?: Maybe<Array<Maybe<MetafieldInput>>>
  minOrderQuantity?: Maybe<Scalars["Int"]>
  optionTitle?: Maybe<Scalars["String"]>
  originCountry?: Maybe<Scalars["String"]>
  sku?: Maybe<Scalars["String"]>
  title?: Maybe<Scalars["String"]>
  weight?: Maybe<Scalars["Float"]>
  width?: Maybe<Scalars["Float"]>
  compareAtPrice?: Maybe<Scalars["Float"]>
  price?: Maybe<Scalars["Float"]>
  isTaxable?: Maybe<Scalars["Boolean"]>
  taxCode?: Maybe<Scalars["String"]>
  taxDescription?: Maybe<Scalars["String"]>
  distributions?: Maybe<Array<Maybe<DistributionInput>>>
  dataQuality?: Maybe<DataQualityInput>
  priceModel?: Maybe<PriceModelInput>
  versionInfo?: Maybe<Scalars["String"]>
  versionNotes?: Maybe<Scalars["String"]>
  updateCycle?: Maybe<Scalars["String"]>
  assetType?: Maybe<Scalars["String"]>
  templates?: Maybe<Array<Maybe<Scalars["ID"]>>>
  templatesFields?: Maybe<Scalars["JSON"]>
}

export type UpdateProductVariantInput = {
  shopId: Scalars["ID"]
  variant: ProductVariantInput
  variantId: Scalars["ID"]
}

export enum ProductSortByField {
  Id = "_id",
  CreatedAt = "createdAt",
  Title = "title",
  UpdatedAt = "updatedAt"
}

export type ProductConfiguration = {
  __typename?: "ProductConfiguration"
  productId: Scalars["ID"]
  productVariantId: Scalars["ID"]
}

export type WriteError = {
  __typename?: "WriteError"
  documentId?: Maybe<Scalars["Int"]>
  errorMsg?: Maybe<Scalars["String"]>
}

export type ProductTagsOperationInput = {
  clientMutationId?: Maybe<Scalars["String"]>
  productIds?: Maybe<Array<Maybe<Scalars["ID"]>>>
  shopId: Scalars["ID"]
  tagIds?: Maybe<Array<Maybe<Scalars["ID"]>>>
}

export type ProductTagsOperationPayload = {
  __typename?: "ProductTagsOperationPayload"
  clientMutationId?: Maybe<Scalars["String"]>
  foundCount?: Maybe<Scalars["Int"]>
  notFoundCount?: Maybe<Scalars["Int"]>
  updatedCount?: Maybe<Scalars["Int"]>
  writeErrors?: Maybe<Array<Maybe<WriteError>>>
}

export enum SocialNetwork {
  Facebook = "facebook",
  Googleplus = "googleplus",
  Pinterest = "pinterest",
  Twitter = "twitter"
}

export enum CatalogBooleanFilterName {
  IsLowQuantity = "isLowQuantity",
  IsSoldOut = "isSoldOut",
  IsBackorder = "isBackorder",
  IsDeleted = "isDeleted",
  IsVisible = "isVisible"
}

export type CatalogBooleanFilter = {
  name: CatalogBooleanFilterName
  value: Scalars["Boolean"]
}

export type SocialMetadata = {
  __typename?: "SocialMetadata"
  message?: Maybe<Scalars["String"]>
  service?: Maybe<SocialNetwork>
}

export type CatalogProductOrVariant = {
  barcode?: Maybe<Scalars["String"]>
  createdAt?: Maybe<Scalars["DateTime"]>
  height?: Maybe<Scalars["Float"]>
  length?: Maybe<Scalars["Float"]>
  metafields?: Maybe<Array<Maybe<Metafield>>>
  minOrderQuantity?: Maybe<Scalars["Int"]>
  originCountry?: Maybe<Scalars["String"]>
  shop: Shop
  sku?: Maybe<Scalars["String"]>
  title?: Maybe<Scalars["String"]>
  updatedAt?: Maybe<Scalars["DateTime"]>
  weight?: Maybe<Scalars["Float"]>
  width?: Maybe<Scalars["Float"]>
}

export type CatalogProduct = CatalogProductOrVariant &
    Node & {
  __typename?: "CatalogProduct"
  _id: Scalars["ID"]
  barcode?: Maybe<Scalars["String"]>
  createdAt: Scalars["DateTime"]
  description?: Maybe<Scalars["String"]>
  height?: Maybe<Scalars["Float"]>
  isDeleted: Scalars["Boolean"]
  isVisible: Scalars["Boolean"]
  length?: Maybe<Scalars["Float"]>
  media?: Maybe<Array<Maybe<ImageInfo>>>
  metaDescription?: Maybe<Scalars["String"]>
  metafields?: Maybe<Array<Maybe<Metafield>>>
  minOrderQuantity?: Maybe<Scalars["Int"]>
  originCountry?: Maybe<Scalars["String"]>
  pageTitle?: Maybe<Scalars["String"]>
  parcel?: Maybe<ShippingParcel>
  primaryImage?: Maybe<ImageInfo>
  productId: Scalars["ID"]
  productType?: Maybe<Scalars["String"]>
  shop: Shop
  sku?: Maybe<Scalars["String"]>
  slug?: Maybe<Scalars["String"]>
  socialMetadata?: Maybe<Array<Maybe<SocialMetadata>>>
  supportedFulfillmentTypes: Array<Maybe<FulfillmentType>>
  title?: Maybe<Scalars["String"]>
  updatedAt: Scalars["DateTime"]
  variants?: Maybe<Array<Maybe<CatalogProductVariant>>>
  vendor?: Maybe<Scalars["String"]>
  weight?: Maybe<Scalars["Float"]>
  width?: Maybe<Scalars["Float"]>
  tagIds?: Maybe<Array<Maybe<Scalars["ID"]>>>
  tags?: Maybe<TagConnection>
  pricing: Array<Maybe<ProductPricingInfo>>
  isBackorder: Scalars["Boolean"]
  isLowQuantity: Scalars["Boolean"]
  isSoldOut: Scalars["Boolean"]
  owners?: Maybe<Array<Scalars["String"]>>
  avgRating?: Maybe<Scalars["Float"]>
  reviewsTotalCount?: Maybe<Scalars["Int"]>
  dataClassification?: Maybe<DataClassificationEnum>
  themes?: Maybe<Array<ThemesEnum>>
  images?: string[]
}

export type CatalogProductTagsArgs = {
  after?: Maybe<Scalars["ConnectionCursor"]>
  before?: Maybe<Scalars["ConnectionCursor"]>
  first?: Maybe<Scalars["ConnectionLimitInt"]>
  last?: Maybe<Scalars["ConnectionLimitInt"]>
  offset?: Maybe<Scalars["Int"]>
  sortOrder?: Maybe<SortOrder>
  sortBy?: Maybe<TagSortByField>
}

export type CatalogProductVariant = CatalogProductOrVariant &
    Node & {
  __typename?: "CatalogProductVariant"
  _id: Scalars["ID"]
  attributeLabel: Scalars["String"]
  barcode?: Maybe<Scalars["String"]>
  createdAt?: Maybe<Scalars["DateTime"]>
  height?: Maybe<Scalars["Float"]>
  index: Scalars["Int"]
  length?: Maybe<Scalars["Float"]>
  media?: Maybe<Array<Maybe<ImageInfo>>>
  metafields?: Maybe<Array<Maybe<Metafield>>>
  minOrderQuantity?: Maybe<Scalars["Int"]>
  optionTitle?: Maybe<Scalars["String"]>
  options?: Maybe<Array<Maybe<CatalogProductVariant>>>
  originCountry?: Maybe<Scalars["String"]>
  primaryImage?: Maybe<ImageInfo>
  shop: Shop
  sku?: Maybe<Scalars["String"]>
  title?: Maybe<Scalars["String"]>
  updatedAt?: Maybe<Scalars["DateTime"]>
  variantId: Scalars["ID"]
  weight?: Maybe<Scalars["Float"]>
  width?: Maybe<Scalars["Float"]>
  pricing: Array<Maybe<ProductPricingInfo>>
  canBackorder: Scalars["Boolean"]
  inventoryAvailableToSell?: Maybe<Scalars["Int"]>
  inventoryInStock?: Maybe<Scalars["Int"]>
  isBackorder: Scalars["Boolean"]
  isLowQuantity: Scalars["Boolean"]
  isSoldOut: Scalars["Boolean"]
  isTaxable: Scalars["Boolean"]
  taxCode?: Maybe<Scalars["String"]>
  taxDescription?: Maybe<Scalars["String"]>
  distributions?: Maybe<Array<Maybe<Distribution>>>
  dataQuality?: Maybe<DataQuality>
  priceModel?: Maybe<PriceModel>
  versionInfo?: Maybe<Scalars["String"]>
  versionNotes?: Maybe<Scalars["String"]>
  updateCycle?: Maybe<Scalars["String"]>
  assetType?: Maybe<Scalars["String"]>
  templates?: Maybe<Array<Maybe<FieldsTemplate>>>
  templatesFields?: Maybe<Scalars["JSON"]>
}

export type CatalogItem = {
  _id: Scalars["ID"]
  createdAt?: Maybe<Scalars["DateTime"]>
  shop: Shop
  updatedAt?: Maybe<Scalars["DateTime"]>
}

export type CatalogItemProduct = CatalogItem &
    Node & {
  __typename?: "CatalogItemProduct"
  _id: Scalars["ID"]
  createdAt: Scalars["DateTime"]
  product?: Maybe<CatalogProduct>
  shop: Shop
  updatedAt: Scalars["DateTime"]
}

export type CatalogItemContent = CatalogItem &
    Node & {
  __typename?: "CatalogItemContent"
  _id: Scalars["ID"]
  createdAt: Scalars["DateTime"]
  shop: Shop
  updatedAt: Scalars["DateTime"]
}

export type CatalogItemEdge = {
  __typename?: "CatalogItemEdge"
  cursor: Scalars["ConnectionCursor"]
  node?: Maybe<CatalogItem>
}

export type CatalogItemConnection = {
  __typename?: "CatalogItemConnection"
  edges?: Maybe<Array<Maybe<CatalogItemEdge>>>
  nodes?: Maybe<Array<Maybe<CatalogItem>>>
  pageInfo: PageInfo
  totalCount: Scalars["Int"]
}

export type Catalog = Node & {
  __typename?: "Catalog"
  _id: Scalars["ID"]
  createdAt: Scalars["DateTime"]
  shop: Shop
  updatedAt: Scalars["DateTime"]
}

export enum CatalogItemSortByField {
  Id = "_id",
  CreatedAt = "createdAt",
  Featured = "featured",
  MinPrice = "minPrice",
  UpdatedAt = "updatedAt"
}

export type Vendor = {
  __typename?: "Vendor"
  name?: Maybe<Scalars["String"]>
}

export type VendorEdge = {
  __typename?: "VendorEdge"
  cursor: Scalars["ConnectionCursor"]
  node?: Maybe<Vendor>
}

export type VendorConnection = {
  __typename?: "VendorConnection"
  edges?: Maybe<Array<Maybe<VendorEdge>>>
  nodes?: Maybe<Array<Maybe<Vendor>>>
  pageInfo: PageInfo
  totalCount: Scalars["Int"]
}

export type AddTagInput = {
  clientMutationId?: Maybe<Scalars["String"]>
  displayTitle?: Maybe<Scalars["String"]>
  heroMediaUrl?: Maybe<Scalars["String"]>
  isVisible: Scalars["Boolean"]
  metafields?: Maybe<Array<Maybe<MetafieldInput>>>
  name: Scalars["String"]
  shopId: Scalars["ID"]
  slug?: Maybe<Scalars["String"]>
}

export type AddTagPayload = {
  __typename?: "AddTagPayload"
  clientMutationId?: Maybe<Scalars["String"]>
  shopId: Scalars["ID"]
  tag: Tag
}

export type TagProduct = {
  __typename?: "TagProduct"
  _id: Scalars["ID"]
  createdAt: Scalars["DateTime"]
  position?: Maybe<Scalars["Int"]>
  title?: Maybe<Scalars["String"]>
}

export type TagProductEdge = {
  __typename?: "TagProductEdge"
  cursor: Scalars["ConnectionCursor"]
  node?: Maybe<TagProduct>
}

export type TagProductConnection = {
  __typename?: "TagProductConnection"
  edges?: Maybe<Array<Maybe<TagProductEdge>>>
  nodes?: Maybe<Array<Maybe<TagProduct>>>
  pageInfo: PageInfo
  totalCount: Scalars["Int"]
}

export type RemoveTagInput = {
  clientMutationId?: Maybe<Scalars["String"]>
  id: Scalars["ID"]
  shopId: Scalars["ID"]
}

export type RemoveTagPayload = {
  __typename?: "RemoveTagPayload"
  clientMutationId?: Maybe<Scalars["String"]>
  tag: Tag
}

export type SetTagHeroMediaInput = {
  clientMutationId?: Maybe<Scalars["String"]>
  fileRecord?: Maybe<Scalars["JSONObject"]>
  id: Scalars["ID"]
  shopId: Scalars["ID"]
}

export type SetTagHeroMediaPayload = {
  __typename?: "SetTagHeroMediaPayload"
  clientMutationId?: Maybe<Scalars["String"]>
  tag: Tag
}

export type Tag = Node &
    Deletable & {
  __typename?: "Tag"
  _id: Scalars["ID"]
  createdAt: Scalars["DateTime"]
  displayTitle?: Maybe<Scalars["String"]>
  featuredProductIds?: Maybe<Array<Maybe<Scalars["ID"]>>>
  heroMediaUrl?: Maybe<Scalars["String"]>
  isDeleted: Scalars["Boolean"]
  isTopLevel: Scalars["Boolean"]
  isVisible: Scalars["Boolean"]
  metafields?: Maybe<Array<Maybe<Metafield>>>
  name: Scalars["String"]
  position?: Maybe<Scalars["Int"]>
  shop: Shop
  slug?: Maybe<Scalars["String"]>
  subTagIds: Array<Maybe<Scalars["ID"]>>
  updatedAt: Scalars["DateTime"]
  subTags?: Maybe<TagConnection>
}

export type TagSubTagsArgs = {
  after?: Maybe<Scalars["ConnectionCursor"]>
  before?: Maybe<Scalars["ConnectionCursor"]>
  first?: Maybe<Scalars["ConnectionLimitInt"]>
  last?: Maybe<Scalars["ConnectionLimitInt"]>
  offset?: Maybe<Scalars["Int"]>
  sortOrder?: Maybe<SortOrder>
  sortBy?: Maybe<TagSortByField>
}

export enum TagSortByField {
  Id = "_id",
  CreatedAt = "createdAt",
  Name = "name",
  Position = "position",
  UpdatedAt = "updatedAt"
}

export type TagEdge = NodeEdge & {
  __typename?: "TagEdge"
  cursor: Scalars["ConnectionCursor"]
  node?: Maybe<Tag>
}

export type TagConnection = {
  __typename?: "TagConnection"
  edges?: Maybe<Array<Maybe<TagEdge>>>
  nodes?: Maybe<Array<Maybe<Tag>>>
  pageInfo: PageInfo
  totalCount: Scalars["Int"]
}

export type UpdateTagInput = {
  clientMutationId?: Maybe<Scalars["String"]>
  displayTitle?: Maybe<Scalars["String"]>
  featuredProductIds?: Maybe<Array<Maybe<Scalars["ID"]>>>
  heroMediaUrl?: Maybe<Scalars["String"]>
  id: Scalars["ID"]
  isVisible: Scalars["Boolean"]
  metafields?: Maybe<Array<Maybe<MetafieldInput>>>
  name: Scalars["String"]
  shopId: Scalars["ID"]
  slug?: Maybe<Scalars["String"]>
}

export type UpdateTagPayload = {
  __typename?: "UpdateTagPayload"
  clientMutationId?: Maybe<Scalars["String"]>
  tag: Tag
}

export type ProductPricingInfo = {
  __typename?: "ProductPricingInfo"
  compareAtPrice?: Maybe<Money>
  currency: Currency
  currencyExchangePricing?: Maybe<CurrencyExchangeProductPricingInfo>
  displayPrice: Scalars["String"]
  maxPrice: Scalars["Float"]
  minPrice: Scalars["Float"]
  price?: Maybe<Scalars["Float"]>
}

export type ProductPricingInfoCurrencyExchangePricingArgs = {
  currencyCode: Scalars["String"]
}

export type CurrencyExchangeProductPricingInfo = {
  __typename?: "CurrencyExchangeProductPricingInfo"
  compareAtPrice?: Maybe<Money>
  currency: Currency
  displayPrice: Scalars["String"]
  maxPrice: Scalars["Float"]
  minPrice: Scalars["Float"]
  price?: Maybe<Scalars["Float"]>
}

export type ProductPriceRange = {
  __typename?: "ProductPriceRange"
  max?: Maybe<Scalars["Float"]>
  min?: Maybe<Scalars["Float"]>
  range?: Maybe<Scalars["String"]>
}

export type UpdateProductVariantPricesInput = {
  prices: ProductVariantPricesInput
  shopId: Scalars["ID"]
  variantId: Scalars["ID"]
}

export type ProductVariantPricesInput = {
  compareAtPrice?: Maybe<Scalars["Float"]>
  price?: Maybe<Scalars["Float"]>
}

export type UpdateProductVariantPricesPayload = {
  __typename?: "UpdateProductVariantPricesPayload"
  clientMutationId?: Maybe<Scalars["String"]>
  variant: ProductVariant
}

export type CartItem = Node & {
  __typename?: "CartItem"
  inventoryAvailableToSell?: Maybe<Scalars["Int"]>
  isBackorder: Scalars["Boolean"]
  isLowQuantity: Scalars["Boolean"]
  isSoldOut: Scalars["Boolean"]
  _id: Scalars["ID"]
  addedAt: Scalars["DateTime"]
  attributes?: Maybe<Array<Maybe<CartItemAttribute>>>
  compareAtPrice?: Maybe<Money>
  createdAt: Scalars["DateTime"]
  imageURLs?: Maybe<ImageSizes>
  metafields?: Maybe<Array<Maybe<Metafield>>>
  optionTitle?: Maybe<Scalars["String"]>
  parcel?: Maybe<ShippingParcel>
  price: Money
  priceWhenAdded: Money
  productConfiguration: ProductConfiguration
  productSlug?: Maybe<Scalars["String"]>
  productTags?: Maybe<TagConnection>
  productType?: Maybe<Scalars["String"]>
  productVendor?: Maybe<Scalars["String"]>
  quantity: Scalars["Int"]
  shop: Shop
  subtotal: Money
  title: Scalars["String"]
  updatedAt: Scalars["DateTime"]
  variantTitle?: Maybe<Scalars["String"]>
  isTaxable: Scalars["Boolean"]
  tax?: Maybe<Money>
  taxCode?: Maybe<Scalars["String"]>
  taxableAmount?: Maybe<Money>
  taxes?: Maybe<Array<Maybe<CalculatedTax>>>
}

export type CartItemProductTagsArgs = {
  after?: Maybe<Scalars["ConnectionCursor"]>
  before?: Maybe<Scalars["ConnectionCursor"]>
  first?: Maybe<Scalars["ConnectionLimitInt"]>
  last?: Maybe<Scalars["ConnectionLimitInt"]>
  offset?: Maybe<Scalars["Int"]>
  sortOrder?: Maybe<SortOrder>
  sortBy?: Maybe<TagSortByField>
}

export type SimpleInventoryInfo = {
  __typename?: "SimpleInventoryInfo"
  canBackorder?: Maybe<Scalars["Boolean"]>
  inventoryInStock?: Maybe<Scalars["Int"]>
  inventoryReserved?: Maybe<Scalars["Int"]>
  isEnabled?: Maybe<Scalars["Boolean"]>
  lowInventoryWarningThreshold?: Maybe<Scalars["Int"]>
  productConfiguration: ProductConfiguration
}

export type RecalculateReservedSimpleInventoryInput = {
  productConfiguration: ProductConfigurationInput
  shopId: Scalars["ID"]
}

export type RecalculateReservedSimpleInventoryPayload = {
  __typename?: "RecalculateReservedSimpleInventoryPayload"
  clientMutationId?: Maybe<Scalars["String"]>
  inventoryInfo: SimpleInventoryInfo
}

export type UpdateSimpleInventoryInput = {
  canBackorder?: Maybe<Scalars["Boolean"]>
  clientMutationId?: Maybe<Scalars["String"]>
  inventoryInStock?: Maybe<Scalars["Int"]>
  isEnabled?: Maybe<Scalars["Boolean"]>
  lowInventoryWarningThreshold?: Maybe<Scalars["Int"]>
  productConfiguration: ProductConfigurationInput
  shopId: Scalars["ID"]
}

export type UpdateSimpleInventoryPayload = {
  __typename?: "UpdateSimpleInventoryPayload"
  clientMutationId?: Maybe<Scalars["String"]>
  inventoryInfo: SimpleInventoryInfo
}

export type Cart = Node & {
  __typename?: "Cart"
  _id: Scalars["ID"]
  account?: Maybe<Account>
  checkout?: Maybe<Checkout>
  createdAt: Scalars["DateTime"]
  email?: Maybe<Scalars["String"]>
  expiresAt?: Maybe<Scalars["DateTime"]>
  items?: Maybe<CartItemConnection>
  missingItems?: Maybe<Array<Maybe<CartItem>>>
  referenceId?: Maybe<Scalars["String"]>
  shop: Shop
  totalItemQuantity: Scalars["Int"]
  updatedAt: Scalars["DateTime"]
  surcharges: Array<Maybe<AppliedSurcharge>>
  taxSummary?: Maybe<TaxSummary>
  paymentMethod?: Maybe<CartPaymentMethod>
}

export type CartItemsArgs = {
  after?: Maybe<Scalars["ConnectionCursor"]>
  before?: Maybe<Scalars["ConnectionCursor"]>
  first?: Maybe<Scalars["ConnectionLimitInt"]>
  last?: Maybe<Scalars["ConnectionLimitInt"]>
  offset?: Maybe<Scalars["Int"]>
  sortOrder?: Maybe<SortOrder>
  sortBy?: Maybe<CartItemsSortByField>
}

export enum CartItemsSortByField {
  Id = "_id",
  AddedAt = "addedAt"
}

export type CartItemConnection = {
  __typename?: "CartItemConnection"
  edges?: Maybe<Array<Maybe<CartItemEdge>>>
  nodes?: Maybe<Array<Maybe<CartItem>>>
  pageInfo: PageInfo
  totalCount: Scalars["Int"]
}

export type CartItemEdge = NodeEdge & {
  __typename?: "CartItemEdge"
  cursor: Scalars["ConnectionCursor"]
  node?: Maybe<CartItem>
}

export type CartItemAttribute = {
  __typename?: "CartItemAttribute"
  label?: Maybe<Scalars["String"]>
  value?: Maybe<Scalars["String"]>
}

export enum CartReconciliationMode {
  KeepAccountCart = "keepAccountCart",
  KeepAnonymousCart = "keepAnonymousCart",
  Merge = "merge"
}

export type CreateCartInput = {
  clientMutationId?: Maybe<Scalars["String"]>
  items: Array<Maybe<CartItemInput>>
  shopId: Scalars["ID"]
}

export type CartItemInput = {
  metafields?: Maybe<Array<Maybe<MetafieldInput>>>
  price: MoneyInput
  productConfiguration: ProductConfigurationInput
  quantity: Scalars["Int"]
}

export type ProductConfigurationInput = {
  productId: Scalars["ID"]
  productVariantId: Scalars["ID"]
}

export type AddCartItemsInput = {
  cartId: Scalars["ID"]
  cartToken?: Maybe<Scalars["String"]>
  clientMutationId?: Maybe<Scalars["String"]>
  items: Array<Maybe<CartItemInput>>
}

export type RemoveCartItemsInput = {
  cartId: Scalars["ID"]
  cartItemIds: Array<Maybe<Scalars["ID"]>>
  cartToken?: Maybe<Scalars["String"]>
  clientMutationId?: Maybe<Scalars["String"]>
}

export type UpdateCartItemInput = {
  cartItemId: Scalars["ID"]
  quantity: Scalars["Int"]
}

export type UpdateCartItemsQuantityInput = {
  cartId: Scalars["ID"]
  cartToken?: Maybe<Scalars["String"]>
  clientMutationId?: Maybe<Scalars["String"]>
  items: Array<Maybe<UpdateCartItemInput>>
}

export type ReconcileCartsInput = {
  anonymousCartId: Scalars["ID"]
  cartToken: Scalars["String"]
  clientMutationId?: Maybe<Scalars["String"]>
  mode?: Maybe<CartReconciliationMode>
  shopId: Scalars["ID"]
}

export type SetEmailOnAnonymousCartInput = {
  cartId: Scalars["ID"]
  cartToken: Scalars["String"]
  clientMutationId?: Maybe<Scalars["String"]>
  email: Scalars["String"]
}

export type IncorrectPriceFailureDetails = {
  __typename?: "IncorrectPriceFailureDetails"
  currentPrice: Money
  productConfiguration: ProductConfiguration
  providedPrice: Money
}

export type MinOrderQuantityFailureDetails = {
  __typename?: "MinOrderQuantityFailureDetails"
  minOrderQuantity: Scalars["Int"]
  productConfiguration: ProductConfiguration
  quantity: Scalars["Int"]
}

export type CreateCartPayload = {
  __typename?: "CreateCartPayload"
  cart?: Maybe<Cart>
  clientMutationId?: Maybe<Scalars["String"]>
  incorrectPriceFailures: Array<Maybe<IncorrectPriceFailureDetails>>
  minOrderQuantityFailures: Array<Maybe<MinOrderQuantityFailureDetails>>
  token?: Maybe<Scalars["String"]>
}

export type AddCartItemsPayload = {
  __typename?: "AddCartItemsPayload"
  cart?: Maybe<Cart>
  clientMutationId?: Maybe<Scalars["String"]>
  incorrectPriceFailures: Array<Maybe<IncorrectPriceFailureDetails>>
  minOrderQuantityFailures: Array<Maybe<MinOrderQuantityFailureDetails>>
}

export type RemoveCartItemsPayload = {
  __typename?: "RemoveCartItemsPayload"
  cart: Cart
  clientMutationId?: Maybe<Scalars["String"]>
}

export type UpdateCartItemsQuantityPayload = {
  __typename?: "UpdateCartItemsQuantityPayload"
  cart: Cart
  clientMutationId?: Maybe<Scalars["String"]>
}

export type ReconcileCartsPayload = {
  __typename?: "ReconcileCartsPayload"
  cart: Cart
  clientMutationId?: Maybe<Scalars["String"]>
}

export type SetEmailOnAnonymousCartPayload = {
  __typename?: "SetEmailOnAnonymousCartPayload"
  cart: Cart
  clientMutationId?: Maybe<Scalars["String"]>
}

export type FulfillmentData = {
  __typename?: "FulfillmentData"
  shippingAddress?: Maybe<Address>
}

export type FulfillmentOption = {
  __typename?: "FulfillmentOption"
  fulfillmentMethod?: Maybe<FulfillmentMethod>
  handlingPrice: Money
  price: Money
}

export type FulfillmentGroup = Node & {
  __typename?: "FulfillmentGroup"
  _id: Scalars["ID"]
  availableFulfillmentOptions: Array<Maybe<FulfillmentOption>>
  data?: Maybe<FulfillmentData>
  items: Array<Maybe<CartItem>>
  selectedFulfillmentOption?: Maybe<FulfillmentOption>
  shippingAddress?: Maybe<Address>
  shop: Shop
  type: FulfillmentType
}

export type SetShippingAddressOnCartInput = {
  address: AddressInput
  addressId?: Maybe<Scalars["String"]>
  cartId: Scalars["ID"]
  cartToken?: Maybe<Scalars["String"]>
  clientMutationId?: Maybe<Scalars["String"]>
}

export type SetShippingAddressOnCartPayload = {
  __typename?: "SetShippingAddressOnCartPayload"
  cart: Cart
  clientMutationId?: Maybe<Scalars["String"]>
}

export type UpdateFulfillmentOptionsForGroupInput = {
  cartId: Scalars["ID"]
  cartToken?: Maybe<Scalars["String"]>
  clientMutationId?: Maybe<Scalars["String"]>
  fulfillmentGroupId: Scalars["ID"]
}

export type UpdateFulfillmentOptionsForGroupPayload = {
  __typename?: "UpdateFulfillmentOptionsForGroupPayload"
  cart: Cart
  clientMutationId?: Maybe<Scalars["String"]>
}

export type SelectFulfillmentOptionForGroupInput = {
  cartId: Scalars["ID"]
  cartToken?: Maybe<Scalars["String"]>
  clientMutationId?: Maybe<Scalars["String"]>
  fulfillmentGroupId: Scalars["ID"]
  fulfillmentMethodId: Scalars["ID"]
}

export type SelectFulfillmentOptionForGroupPayload = {
  __typename?: "SelectFulfillmentOptionForGroupPayload"
  cart: Cart
  clientMutationId?: Maybe<Scalars["String"]>
}

export type CartSummary = {
  __typename?: "CartSummary"
  discountTotal: Money
  effectiveTaxRate?: Maybe<Rate>
  fulfillmentTotal?: Maybe<Money>
  itemTotal: Money
  taxTotal?: Maybe<Money>
  taxableAmount: Money
  total: Money
  surchargeTotal?: Maybe<Money>
}

export type Checkout = {
  __typename?: "Checkout"
  fulfillmentGroups: Array<Maybe<FulfillmentGroup>>
  summary: CartSummary
}

export enum OrderFulfillmentGroupItemsSortByField {
  Id = "_id",
  AddedAt = "addedAt"
}

export enum OrdersByAccountIdSortByField {
  Id = "_id",
  CreatedAt = "createdAt"
}

export enum OrdersSortByField {
  Id = "_id",
  CreatedAt = "createdAt"
}

export type OrderConnection = {
  __typename?: "OrderConnection"
  edges?: Maybe<Array<Maybe<OrderEdge>>>
  nodes?: Maybe<Array<Maybe<Order>>>
  pageInfo: PageInfo
  totalCount: Scalars["Int"]
}

export type OrdersByAccountIdConnection = {
  __typename?: "OrdersByAccountIdConnection"
  edges?: Maybe<Array<Maybe<OrdersByAccountIdEdge>>>
  nodes?: Maybe<Array<Maybe<Order>>>
  pageInfo: PageInfo
  totalCount: Scalars["Int"]
}

export type OrderEdge = NodeEdge & {
  __typename?: "OrderEdge"
  cursor: Scalars["ConnectionCursor"]
  node?: Maybe<Order>
}

export type OrdersByAccountIdEdge = NodeEdge & {
  __typename?: "OrdersByAccountIdEdge"
  cursor: Scalars["ConnectionCursor"]
  node?: Maybe<Order>
}

export type OrderItemConnection = {
  __typename?: "OrderItemConnection"
  edges?: Maybe<Array<Maybe<OrderItemEdge>>>
  nodes?: Maybe<Array<Maybe<OrderItem>>>
  pageInfo: PageInfo
  totalCount: Scalars["Int"]
}

export type OrderItemEdge = NodeEdge & {
  __typename?: "OrderItemEdge"
  cursor: Scalars["ConnectionCursor"]
  node?: Maybe<OrderItem>
}

export type OrderItemAttribute = {
  __typename?: "OrderItemAttribute"
  label?: Maybe<Scalars["String"]>
  value?: Maybe<Scalars["String"]>
}

export type OrderSummary = {
  __typename?: "OrderSummary"
  discountTotal: Money
  effectiveTaxRate: Rate
  fulfillmentTotal: Money
  itemTotal: Money
  taxTotal: Money
  taxableAmount: Money
  total: Money
  surchargeTotal?: Maybe<Money>
}

export type OrderItem = Node & {
  __typename?: "OrderItem"
  _id: Scalars["ID"]
  addedAt?: Maybe<Scalars["DateTime"]>
  attributes?: Maybe<Array<Maybe<OrderItemAttribute>>>
  cancelReason?: Maybe<Scalars["String"]>
  createdAt: Scalars["DateTime"]
  imageURLs?: Maybe<ImageSizes>
  metafields?: Maybe<Array<Maybe<Metafield>>>
  optionTitle?: Maybe<Scalars["String"]>
  parcel?: Maybe<ShippingParcel>
  price: Money
  productConfiguration: ProductConfiguration
  productSlug?: Maybe<Scalars["String"]>
  productTags?: Maybe<TagConnection>
  productType?: Maybe<Scalars["String"]>
  productVendor?: Maybe<Scalars["String"]>
  quantity: Scalars["Int"]
  shop: Shop
  status: Scalars["String"]
  subtotal: Money
  title: Scalars["String"]
  updatedAt: Scalars["DateTime"]
  variantTitle?: Maybe<Scalars["String"]>
  isTaxable: Scalars["Boolean"]
  tax: Money
  taxCode?: Maybe<Scalars["String"]>
  taxableAmount: Money
  taxes: Array<Maybe<CalculatedTax>>
}

export type OrderItemProductTagsArgs = {
  after?: Maybe<Scalars["ConnectionCursor"]>
  before?: Maybe<Scalars["ConnectionCursor"]>
  first?: Maybe<Scalars["ConnectionLimitInt"]>
  last?: Maybe<Scalars["ConnectionLimitInt"]>
  offset?: Maybe<Scalars["Int"]>
  sortOrder?: Maybe<SortOrder>
  sortBy?: Maybe<TagSortByField>
}

export type ShippingOrderFulfillmentGroupData = {
  __typename?: "ShippingOrderFulfillmentGroupData"
  shippingAddress: Address
}

export type OrderFulfillmentGroupData = ShippingOrderFulfillmentGroupData

export type OrderFulfillmentGroup = Node & {
  __typename?: "OrderFulfillmentGroup"
  _id: Scalars["ID"]
  data?: Maybe<OrderFulfillmentGroupData>
  displayStatus: Scalars["String"]
  items?: Maybe<OrderItemConnection>
  selectedFulfillmentOption: FulfillmentOption
  shippingLabelUrl?: Maybe<Scalars["String"]>
  shop: Shop
  status: Scalars["String"]
  summary: OrderSummary
  totalItemQuantity: Scalars["Int"]
  tracking?: Maybe<Scalars["String"]>
  trackingUrl?: Maybe<Scalars["String"]>
  type: FulfillmentType
  taxSummary?: Maybe<TaxSummary>
}

export type OrderFulfillmentGroupDisplayStatusArgs = {
  language: Scalars["String"]
}

export type OrderFulfillmentGroupItemsArgs = {
  after?: Maybe<Scalars["ConnectionCursor"]>
  before?: Maybe<Scalars["ConnectionCursor"]>
  first?: Maybe<Scalars["ConnectionLimitInt"]>
  last?: Maybe<Scalars["ConnectionLimitInt"]>
  offset?: Maybe<Scalars["Int"]>
  sortOrder?: Maybe<SortOrder>
  sortBy?: Maybe<OrderFulfillmentGroupItemsSortByField>
}

export type Order = Node & {
  __typename?: "Order"
  _id: Scalars["ID"]
  account?: Maybe<Account>
  billingName?: Maybe<Scalars["String"]>
  cartId?: Maybe<Scalars["ID"]>
  createdAt: Scalars["DateTime"]
  displayStatus: Scalars["String"]
  email?: Maybe<Scalars["String"]>
  fulfillmentGroups: Array<Maybe<OrderFulfillmentGroup>>
  notes: Array<Maybe<OrderNote>>
  payments?: Maybe<Array<Maybe<Payment>>>
  referenceId: Scalars["String"]
  refunds?: Maybe<Array<Maybe<Refund>>>
  shop: Shop
  status: Scalars["String"]
  summary: OrderSummary
  totalItemQuantity: Scalars["Int"]
  updatedAt: Scalars["DateTime"]
  surcharges: Array<Maybe<AppliedSurcharge>>
}

export type OrderDisplayStatusArgs = {
  language: Scalars["String"]
}

export type OrderNote = {
  __typename?: "OrderNote"
  account: Account
  content: Scalars["String"]
  createdAt: Scalars["DateTime"]
  updatedAt: Scalars["DateTime"]
}

export type Refund = Node & {
  __typename?: "Refund"
  _id: Scalars["ID"]
  amount: Money
  createdAt: Scalars["DateTime"]
  paymentDisplayName: Scalars["String"]
  paymentId: Scalars["ID"]
  reason?: Maybe<Scalars["String"]>
}

export type OrderFulfillmentGroupItemInput = {
  addedAt?: Maybe<Scalars["DateTime"]>
  price: Scalars["Float"]
  productConfiguration: ProductConfigurationInput
  quantity: Scalars["Int"]
}

export type OrderFulfillmentGroupDataInput = {
  shippingAddress?: Maybe<AddressInput>
}

export type OrderFulfillmentGroupInput = {
  data?: Maybe<OrderFulfillmentGroupDataInput>
  items: Array<Maybe<OrderFulfillmentGroupItemInput>>
  selectedFulfillmentMethodId: Scalars["ID"]
  shopId: Scalars["ID"]
  totalPrice?: Maybe<Scalars["Float"]>
  type: FulfillmentType
}

export type OrderFulfillmentGroupExistingOrderInput = {
  data?: Maybe<OrderFulfillmentGroupDataInput>
  items?: Maybe<Array<Maybe<OrderFulfillmentGroupItemInput>>>
  selectedFulfillmentMethodId: Scalars["ID"]
  shopId: Scalars["ID"]
  totalPrice?: Maybe<Scalars["Float"]>
  type: FulfillmentType
}

export type OrderInput = {
  cartId?: Maybe<Scalars["String"]>
  currencyCode: Scalars["String"]
  email: Scalars["String"]
  fulfillmentGroups: Array<Maybe<OrderFulfillmentGroupInput>>
  shopId: Scalars["String"]
}

export type PaymentInput = {
  amount: Scalars["Float"]
  billingAddress?: Maybe<AddressInput>
  data?: Maybe<Scalars["JSONObject"]>
  method: PaymentMethodName
}

export type AddOrderFulfillmentGroupInput = {
  clientMutationId?: Maybe<Scalars["String"]>
  fulfillmentGroup: OrderFulfillmentGroupExistingOrderInput
  moveItemIds?: Maybe<Array<Maybe<Scalars["ID"]>>>
  orderId: Scalars["ID"]
}

export type CancelOrderItemInput = {
  cancelQuantity: Scalars["Int"]
  clientMutationId?: Maybe<Scalars["String"]>
  itemId: Scalars["ID"]
  orderId: Scalars["ID"]
  reason?: Maybe<Scalars["String"]>
}

export type CreateRefundInput = {
  amount: Scalars["Float"]
  orderId: Scalars["ID"]
  paymentId: Scalars["ID"]
  reason?: Maybe<Scalars["String"]>
}

export type PlaceOrderInput = {
  clientMutationId?: Maybe<Scalars["String"]>
  order: OrderInput
  payments?: Maybe<Array<Maybe<PaymentInput>>>
}

export type MoveOrderItemsInput = {
  clientMutationId?: Maybe<Scalars["String"]>
  fromFulfillmentGroupId: Scalars["ID"]
  itemIds: Array<Maybe<Scalars["ID"]>>
  orderId: Scalars["ID"]
  toFulfillmentGroupId: Scalars["ID"]
}

export type SplitOrderItemInput = {
  clientMutationId?: Maybe<Scalars["String"]>
  itemId: Scalars["ID"]
  newItemQuantity: Scalars["Int"]
  orderId: Scalars["ID"]
}

export type UpdateOrderInput = {
  clientMutationId?: Maybe<Scalars["String"]>
  email?: Maybe<Scalars["String"]>
  orderId: Scalars["ID"]
  status?: Maybe<Scalars["String"]>
}

export type UpdateOrderFulfillmentGroupInput = {
  clientMutationId?: Maybe<Scalars["String"]>
  orderFulfillmentGroupId: Scalars["ID"]
  orderId: Scalars["ID"]
  status?: Maybe<Scalars["String"]>
  tracking?: Maybe<Scalars["String"]>
  trackingUrl?: Maybe<Scalars["String"]>
}

export type AddOrderFulfillmentGroupPayload = {
  __typename?: "AddOrderFulfillmentGroupPayload"
  clientMutationId?: Maybe<Scalars["String"]>
  newFulfillmentGroupId: Scalars["ID"]
  order: Order
}

export type CancelOrderItemPayload = {
  __typename?: "CancelOrderItemPayload"
  clientMutationId?: Maybe<Scalars["String"]>
  order: Order
}

export type CreateRefundPayload = {
  __typename?: "CreateRefundPayload"
  clientMutationId?: Maybe<Scalars["String"]>
  order: Order
}

export type MoveOrderItemsPayload = {
  __typename?: "MoveOrderItemsPayload"
  clientMutationId?: Maybe<Scalars["String"]>
  order: Order
}

export type PlaceOrderPayload = {
  __typename?: "PlaceOrderPayload"
  clientMutationId?: Maybe<Scalars["String"]>
  orders: Array<Maybe<Order>>
  token?: Maybe<Scalars["String"]>
}

export type SplitOrderItemPayload = {
  __typename?: "SplitOrderItemPayload"
  clientMutationId?: Maybe<Scalars["String"]>
  newItemId: Scalars["ID"]
  order: Order
}

export type UpdateOrderPayload = {
  __typename?: "UpdateOrderPayload"
  clientMutationId?: Maybe<Scalars["String"]>
  order: Order
}

export type UpdateOrderFulfillmentGroupPayload = {
  __typename?: "UpdateOrderFulfillmentGroupPayload"
  clientMutationId?: Maybe<Scalars["String"]>
  order: Order
}

export enum OrderFulfillmentStatus {
  Completed = "completed",
  New = "new",
  Processing = "processing"
}

export enum OrderPaymentStatus {
  Completed = "completed",
  Created = "created"
}

export enum OrderStatus {
  Canceled = "canceled",
  Completed = "completed",
  New = "new",
  Processing = "processing"
}

export type CreatedAtInput = {
  gte?: Maybe<Scalars["DateTime"]>
  lte?: Maybe<Scalars["DateTime"]>
}

export type OrderFilterInput = {
  createdAt?: Maybe<CreatedAtInput>
  fulfillmentStatus?: Maybe<Array<Maybe<OrderFulfillmentStatus>>>
  paymentStatus?: Maybe<Array<Maybe<OrderPaymentStatus>>>
  searchField?: Maybe<Scalars["String"]>
  status?: Maybe<OrderStatus>
}

export type Payment = Node & {
  __typename?: "Payment"
  _id: Scalars["ID"]
  amount: Money
  billingAddress?: Maybe<Address>
  captureErrorCode?: Maybe<Scalars["String"]>
  captureErrorMessage?: Maybe<Scalars["String"]>
  cardBrand?: Maybe<Scalars["String"]>
  createdAt: Scalars["DateTime"]
  data?: Maybe<PaymentData>
  displayName: Scalars["String"]
  isAuthorizationCanceled: Scalars["Boolean"]
  isCaptured: Scalars["Boolean"]
  method: PaymentMethod
  mode?: Maybe<Scalars["String"]>
  processor?: Maybe<Scalars["String"]>
  refunds?: Maybe<Array<Maybe<Refund>>>
  riskLevel?: Maybe<RiskLevel>
  status: PaymentStatus
  transactionId?: Maybe<Scalars["String"]>
  userMarkedAsPaid?: Maybe<Scalars["Boolean"]>
}

export enum PaymentStatus {
  Adjustments = "adjustments",
  Approved = "approved",
  Canceled = "canceled",
  Completed = "completed",
  Created = "created",
  Error = "error",
  PartialRefund = "partialRefund",
  Refunded = "refunded"
}

export enum RiskLevel {
  Elevated = "elevated",
  Highest = "highest",
  Normal = "normal"
}

export type PaymentData = FakeData | BankTransferData

export enum PaymentMethodName {
  BankTransfer = "bank_transfer",
  None = "none"
}

export type PaymentMethodData = FakeData

export type PaymentMethod = {
  __typename?: "PaymentMethod"
  canRefund: Scalars["Boolean"]
  data?: Maybe<PaymentMethodData>
  displayName: Scalars["String"]
  isEnabled: Scalars["Boolean"]
  name: Scalars["String"]
  pluginName: Scalars["String"]
}

export type EnablePaymentMethodForShopInput = {
  clientMutationId?: Maybe<Scalars["String"]>
  isEnabled: Scalars["Boolean"]
  paymentMethodName: Scalars["String"]
  shopId: Scalars["ID"]
}

export type EnablePaymentMethodForShopPayload = {
  __typename?: "EnablePaymentMethodForShopPayload"
  clientMutationId?: Maybe<Scalars["String"]>
  paymentMethods: Array<Maybe<PaymentMethod>>
}

export type ApproveOrderPaymentsInput = {
  clientMutationId?: Maybe<Scalars["String"]>
  orderId: Scalars["ID"]
  paymentIds: Array<Maybe<Scalars["ID"]>>
  shopId: Scalars["ID"]
}

export type ApproveOrderPaymentsPayload = {
  __typename?: "ApproveOrderPaymentsPayload"
  clientMutationId?: Maybe<Scalars["String"]>
  order: Order
}

export type CaptureOrderPaymentsInput = {
  clientMutationId?: Maybe<Scalars["String"]>
  orderId: Scalars["ID"]
  paymentIds: Array<Maybe<Scalars["ID"]>>
  shopId: Scalars["ID"]
}

export type CaptureOrderPaymentsPayload = {
  __typename?: "CaptureOrderPaymentsPayload"
  clientMutationId?: Maybe<Scalars["String"]>
  order: Order
}

export type DiscountCode = {
  __typename?: "DiscountCode"
  _id: Scalars["ID"]
  calculation?: Maybe<DiscountCalculation>
  code: Scalars["String"]
  conditions?: Maybe<DiscountConditions>
  description?: Maybe<Scalars["String"]>
  discount?: Maybe<Scalars["String"]>
  discountMethod?: Maybe<DiscountMethod>
  label?: Maybe<Scalars["String"]>
  shop: Shop
  transactions?: Maybe<Array<Maybe<DiscountTransaction>>>
}

export type DiscountTransaction = {
  __typename?: "DiscountTransaction"
  appliedAt?: Maybe<Scalars["DateTime"]>
  cartId: Scalars["String"]
  userId: Scalars["String"]
}

export type DiscountConditionOrder = {
  __typename?: "DiscountConditionOrder"
  endDate?: Maybe<Scalars["DateTime"]>
  max?: Maybe<Scalars["Float"]>
  min: Scalars["Float"]
  startDate?: Maybe<Scalars["DateTime"]>
}

export type DiscountConditions = {
  __typename?: "DiscountConditions"
  accountLimit?: Maybe<Scalars["Int"]>
  audience?: Maybe<Array<Maybe<Scalars["String"]>>>
  enabled: Scalars["Boolean"]
  order?: Maybe<DiscountConditionOrder>
  permissions?: Maybe<Array<Maybe<Scalars["String"]>>>
  products?: Maybe<Array<Maybe<Scalars["String"]>>>
  redemptionLimit?: Maybe<Scalars["Int"]>
  tags?: Maybe<Array<Maybe<Scalars["String"]>>>
}

export type DiscountCalculation = {
  __typename?: "DiscountCalculation"
  method?: Maybe<DiscountCalculationMethod>
}

export enum DiscountMethod {
  Code = "code",
  Rate = "rate"
}

export enum DiscountCalculationMethod {
  Credit = "credit",
  Discount = "discount",
  Sale = "sale",
  Shipping = "shipping"
}

export type ApplyDiscountCodeToCartInput = {
  cartId: Scalars["ID"]
  discountCode: Scalars["String"]
  shopId: Scalars["ID"]
  token?: Maybe<Scalars["String"]>
}

export type RemoveDiscountCodeFromCartInput = {
  cartId: Scalars["ID"]
  discountId: Scalars["ID"]
  shopId: Scalars["ID"]
  token?: Maybe<Scalars["String"]>
}

export type DiscountCodeFilterInput = {
  searchField?: Maybe<Scalars["String"]>
}

export type ApplyDiscountCodeToCartPayload = {
  __typename?: "ApplyDiscountCodeToCartPayload"
  cart: Cart
  clientMutationId?: Maybe<Scalars["String"]>
}

export type RemoveDiscountCodeFromCartPayload = {
  __typename?: "RemoveDiscountCodeFromCartPayload"
  cart: Cart
  clientMutationId?: Maybe<Scalars["String"]>
}

export type DiscountCodeEdge = {
  __typename?: "DiscountCodeEdge"
  cursor: Scalars["ConnectionCursor"]
  node?: Maybe<DiscountCode>
}

export type DiscountCodeConnection = {
  __typename?: "DiscountCodeConnection"
  edges?: Maybe<Array<Maybe<DiscountCodeEdge>>>
  nodes?: Maybe<Array<Maybe<DiscountCode>>>
  pageInfo: PageInfo
  totalCount: Scalars["Int"]
}

export type DiscountCalculationInput = {
  method?: Maybe<DiscountCalculationMethod>
}

export type DiscountCodeInput = {
  calculation?: Maybe<DiscountCalculationInput>
  code: Scalars["String"]
  conditions?: Maybe<DiscountConditionsInput>
  description?: Maybe<Scalars["String"]>
  discount?: Maybe<Scalars["String"]>
  discountMethod?: Maybe<DiscountMethod>
  label?: Maybe<Scalars["String"]>
  transactions?: Maybe<Array<Maybe<DiscountTransactionInput>>>
}

export type DiscountTransactionInput = {
  appliedAt?: Maybe<Scalars["DateTime"]>
  cartId: Scalars["String"]
  userId: Scalars["String"]
}

export type DiscountConditionOrderInput = {
  endDate?: Maybe<Scalars["DateTime"]>
  max?: Maybe<Scalars["Float"]>
  min: Scalars["Float"]
  startDate?: Maybe<Scalars["DateTime"]>
}

export type DiscountConditionsInput = {
  accountLimit?: Maybe<Scalars["Int"]>
  audience?: Maybe<Array<Maybe<Scalars["String"]>>>
  enabled: Scalars["Boolean"]
  order?: Maybe<DiscountConditionOrderInput>
  permissions?: Maybe<Array<Maybe<Scalars["String"]>>>
  products?: Maybe<Array<Maybe<Scalars["String"]>>>
  redemptionLimit?: Maybe<Scalars["Int"]>
  tags?: Maybe<Array<Maybe<Scalars["String"]>>>
}

export type CreateDiscountCodeInput = {
  clientMutationId?: Maybe<Scalars["String"]>
  discountCode?: Maybe<DiscountCodeInput>
  shopId: Scalars["ID"]
}

export type CreateDiscountCodePayload = {
  __typename?: "CreateDiscountCodePayload"
  clientMutationId?: Maybe<Scalars["String"]>
  discountCode?: Maybe<DiscountCode>
}

export type UpdateDiscountCodeInput = {
  clientMutationId?: Maybe<Scalars["String"]>
  discountCode?: Maybe<DiscountCodeInput>
  discountCodeId: Scalars["ID"]
  shopId: Scalars["ID"]
}

export type UpdateDiscountCodePayload = {
  __typename?: "UpdateDiscountCodePayload"
  clientMutationId?: Maybe<Scalars["String"]>
  discountCode?: Maybe<DiscountCode>
}

export type DeleteDiscountCodeInput = {
  clientMutationId?: Maybe<Scalars["String"]>
  discountCodeId: Scalars["ID"]
  shopId: Scalars["ID"]
}

export type DeleteDiscountCodePayload = {
  __typename?: "DeleteDiscountCodePayload"
  clientMutationId?: Maybe<Scalars["String"]>
  discountCode?: Maybe<DiscountCode>
}

export enum SurchargePropertyType {
  Bool = "bool",
  Float = "float",
  Int = "int",
  String = "string"
}

export type AppliedSurcharge = Node & {
  __typename?: "AppliedSurcharge"
  _id: Scalars["ID"]
  amount: Money
  fulfillmentGroupId?: Maybe<Scalars["ID"]>
  message?: Maybe<Scalars["String"]>
  surchargeDefinitionId: Scalars["ID"]
}

export type AppliedSurchargeMessageArgs = {
  language: Scalars["String"]
}

export type Surcharge = Node & {
  __typename?: "Surcharge"
  _id: Scalars["ID"]
  amount: Money
  attributes?: Maybe<Array<Maybe<SurchargeAttributeRestrictions>>>
  createdAt: Scalars["DateTime"]
  destination?: Maybe<SurchargeDestinationRestrictions>
  message: Scalars["String"]
  messagesByLanguage?: Maybe<Array<Maybe<SurchargeMessagesByLanguage>>>
  methodIds?: Maybe<Array<Maybe<Scalars["ID"]>>>
  shopId: Scalars["ID"]
  type: SurchargeTypeEnum
  updatedAt?: Maybe<Scalars["DateTime"]>
}

export type SurchargeMessageArgs = {
  language: Scalars["String"]
}

export type SurchargeAttributeRestrictions = {
  __typename?: "SurchargeAttributeRestrictions"
  operator?: Maybe<Scalars["String"]>
  property?: Maybe<Scalars["String"]>
  propertyType?: Maybe<SurchargePropertyType>
  value?: Maybe<Scalars["String"]>
}

export type SurchargeConnection = {
  __typename?: "SurchargeConnection"
  edges?: Maybe<Array<Maybe<SurchargeEdge>>>
  nodes?: Maybe<Array<Maybe<Surcharge>>>
  pageInfo: PageInfo
  totalCount: Scalars["Int"]
}

export type SurchargeDestinationRestrictions = {
  __typename?: "SurchargeDestinationRestrictions"
  country?: Maybe<Array<Maybe<Scalars["String"]>>>
  postal?: Maybe<Array<Maybe<Scalars["String"]>>>
  region?: Maybe<Array<Maybe<Scalars["String"]>>>
}

export type SurchargeEdge = {
  __typename?: "SurchargeEdge"
  cursor: Scalars["ConnectionCursor"]
  node?: Maybe<Surcharge>
}

export type SurchargeMessagesByLanguage = {
  __typename?: "SurchargeMessagesByLanguage"
  content: Scalars["String"]
  language: Scalars["String"]
}

export enum SurchargeSortByField {
  CreatedAt = "createdAt"
}

export enum SurchargeTypeEnum {
  Surcharge = "surcharge"
}

export type CreateSurchargeInput = {
  clientMutationId?: Maybe<Scalars["String"]>
  shopId: Scalars["ID"]
  surcharge: SurchargeInput
}

export type DeleteSurchargeInput = {
  clientMutationId?: Maybe<Scalars["String"]>
  shopId: Scalars["ID"]
  surchargeId: Scalars["ID"]
}

export type MessagesByLanguageInput = {
  content: Scalars["String"]
  language: Scalars["String"]
}

export type SurchargeAttributeRestrictionsInput = {
  operator?: Maybe<Scalars["String"]>
  property?: Maybe<Scalars["String"]>
  propertyType?: Maybe<SurchargePropertyType>
  value?: Maybe<Scalars["String"]>
}

export type SurchargeDestinationRestrictionsInput = {
  country?: Maybe<Array<Maybe<Scalars["String"]>>>
  postal?: Maybe<Array<Maybe<Scalars["String"]>>>
  region?: Maybe<Array<Maybe<Scalars["String"]>>>
}

export type SurchargeInput = {
  amount: Scalars["Float"]
  attributes?: Maybe<Array<Maybe<SurchargeAttributeRestrictionsInput>>>
  destination?: Maybe<SurchargeDestinationRestrictionsInput>
  messagesByLanguage: Array<Maybe<MessagesByLanguageInput>>
  methodIds?: Maybe<Array<Maybe<Scalars["ID"]>>>
  type: SurchargeTypeEnum
}

export type UpdateSurchargeInput = {
  clientMutationId?: Maybe<Scalars["String"]>
  shopId: Scalars["ID"]
  surcharge: SurchargeInput
  surchargeId: Scalars["ID"]
}

export type CreateSurchargePayload = {
  __typename?: "CreateSurchargePayload"
  clientMutationId?: Maybe<Scalars["String"]>
  surcharge: Surcharge
}

export type DeleteSurchargePayload = {
  __typename?: "DeleteSurchargePayload"
  clientMutationId?: Maybe<Scalars["String"]>
  surcharge: Surcharge
}

export type UpdateSurchargePayload = {
  __typename?: "UpdateSurchargePayload"
  clientMutationId?: Maybe<Scalars["String"]>
  surcharge: Surcharge
}

export type ShippingParcel = {
  __typename?: "ShippingParcel"
  containers?: Maybe<Scalars["String"]>
  distanceUnit?: Maybe<DistanceUnit>
  height?: Maybe<Scalars["Float"]>
  length?: Maybe<Scalars["Float"]>
  massUnit?: Maybe<MassUnit>
  weight?: Maybe<Scalars["Float"]>
  width?: Maybe<Scalars["Float"]>
}

export enum FulfillmentType {
  Digital = "digital",
  Pickup = "pickup",
  Shipping = "shipping"
}

export type FulfillmentMethod = Node & {
  __typename?: "FulfillmentMethod"
  _id: Scalars["ID"]
  carrier?: Maybe<Scalars["String"]>
  displayName: Scalars["String"]
  fulfillmentTypes: Array<Maybe<FulfillmentType>>
  group?: Maybe<Scalars["String"]>
  name: Scalars["String"]
}

export type TaxCode = {
  __typename?: "TaxCode"
  code: Scalars["String"]
  label: Scalars["String"]
}

export type TaxService = {
  __typename?: "TaxService"
  displayName: Scalars["String"]
  name: Scalars["String"]
  pluginName: Scalars["String"]
}

export enum TaxSource {
  Destination = "destination",
  Origin = "origin"
}

export type CalculatedTax = {
  __typename?: "CalculatedTax"
  _id: Scalars["ID"]
  jurisdictionId?: Maybe<Scalars["String"]>
  sourcing: TaxSource
  tax: Money
  taxName: Scalars["String"]
  taxRate: Rate
  taxableAmount: Money
}

export type TaxSummary = {
  __typename?: "TaxSummary"
  calculatedAt: Scalars["DateTime"]
  calculatedByTaxServiceName?: Maybe<Scalars["String"]>
  referenceId?: Maybe<Scalars["String"]>
  tax: Money
  taxableAmount: Money
  taxes: Array<Maybe<CalculatedTax>>
}

export type TaxRate = {
  __typename?: "TaxRate"
  _id: Scalars["ID"]
  country?: Maybe<Scalars["String"]>
  postal?: Maybe<Scalars["String"]>
  rate: Scalars["Float"]
  region?: Maybe<Scalars["String"]>
  shop: Shop
  sourcing: TaxSource
  taxCode?: Maybe<Scalars["String"]>
}

export type CreateTaxRateInput = {
  clientMutationId?: Maybe<Scalars["String"]>
  country?: Maybe<Scalars["String"]>
  postal?: Maybe<Scalars["String"]>
  rate: Scalars["Float"]
  region?: Maybe<Scalars["String"]>
  shopId: Scalars["ID"]
  sourcing?: Maybe<TaxSource>
  taxCode?: Maybe<Scalars["String"]>
}

export type CreateTaxRatePayload = {
  __typename?: "CreateTaxRatePayload"
  clientMutationId?: Maybe<Scalars["String"]>
  taxRate: TaxRate
}

export type UpdateTaxRateInput = {
  clientMutationId?: Maybe<Scalars["String"]>
  country?: Maybe<Scalars["String"]>
  postal?: Maybe<Scalars["String"]>
  rate: Scalars["Float"]
  region?: Maybe<Scalars["String"]>
  shopId: Scalars["ID"]
  sourcing?: Maybe<TaxSource>
  taxCode?: Maybe<Scalars["String"]>
  taxRateId: Scalars["ID"]
}

export type UpdateTaxRatePayload = {
  __typename?: "UpdateTaxRatePayload"
  clientMutationId?: Maybe<Scalars["String"]>
  taxRate: TaxRate
}

export type DeleteTaxRateInput = {
  clientMutationId?: Maybe<Scalars["String"]>
  shopId: Scalars["ID"]
  taxRateId: Scalars["ID"]
}

export type DeleteTaxRatePayload = {
  __typename?: "DeleteTaxRatePayload"
  clientMutationId?: Maybe<Scalars["String"]>
  taxRate: TaxRate
}

export type TaxRateEdge = {
  __typename?: "TaxRateEdge"
  cursor: Scalars["ConnectionCursor"]
  node?: Maybe<TaxRate>
}

export type TaxRateConnection = {
  __typename?: "TaxRateConnection"
  edges?: Maybe<Array<Maybe<TaxRateEdge>>>
  nodes?: Maybe<Array<Maybe<TaxRate>>>
  pageInfo: PageInfo
  totalCount: Scalars["Int"]
}

export enum NavigationItemSortByField {
  Id = "_id",
  CreatedAt = "createdAt"
}

export type NavigationItemConnection = {
  __typename?: "NavigationItemConnection"
  edges?: Maybe<Array<Maybe<NavigationItemEdge>>>
  nodes?: Maybe<Array<Maybe<NavigationItem>>>
  pageInfo: PageInfo
  totalCount: Scalars["Int"]
}

export type NavigationItemEdge = NodeEdge & {
  __typename?: "NavigationItemEdge"
  cursor: Scalars["ConnectionCursor"]
  node?: Maybe<NavigationItem>
}

export type NavigationItem = Node & {
  __typename?: "NavigationItem"
  _id: Scalars["ID"]
  createdAt: Scalars["DateTime"]
  data?: Maybe<NavigationItemData>
  draftData?: Maybe<NavigationItemData>
  hasUnpublishedChanges?: Maybe<Scalars["Boolean"]>
  metadata?: Maybe<Scalars["JSONObject"]>
  shopId: Scalars["ID"]
}

export type NavigationItemData = {
  __typename?: "NavigationItemData"
  classNames?: Maybe<Scalars["String"]>
  content?: Maybe<Array<Maybe<NavigationItemContent>>>
  contentForLanguage?: Maybe<Scalars["String"]>
  isUrlRelative?: Maybe<Scalars["Boolean"]>
  shouldOpenInNewWindow?: Maybe<Scalars["Boolean"]>
  url?: Maybe<Scalars["String"]>
}

export type NavigationItemContent = {
  __typename?: "NavigationItemContent"
  language: Scalars["String"]
  value?: Maybe<Scalars["String"]>
}

export type NavigationTree = Node & {
  __typename?: "NavigationTree"
  _id: Scalars["ID"]
  draftItems?: Maybe<Array<Maybe<NavigationTreeItem>>>
  hasUnpublishedChanges?: Maybe<Scalars["Boolean"]>
  items?: Maybe<Array<Maybe<NavigationTreeItem>>>
  name: Scalars["String"]
  shopId: Scalars["ID"]
}

export type NavigationTreeItem = {
  __typename?: "NavigationTreeItem"
  expanded?: Maybe<Scalars["Boolean"]>
  isPrivate?: Maybe<Scalars["Boolean"]>
  isSecondary?: Maybe<Scalars["Boolean"]>
  isVisible?: Maybe<Scalars["Boolean"]>
  items?: Maybe<Array<Maybe<NavigationTreeItem>>>
  navigationItem: NavigationItem
}

export type CreateNavigationTreePayload = {
  __typename?: "CreateNavigationTreePayload"
  clientMutationId?: Maybe<Scalars["String"]>
  navigationTree: NavigationTree
}

export type CreateNavigationItemInput = {
  clientMutationId?: Maybe<Scalars["String"]>
  navigationItem: NavigationItemInput
}

export type UpdateNavigationItemInput = {
  clientMutationId?: Maybe<Scalars["String"]>
  id: Scalars["ID"]
  navigationItem: NavigationItemInput
  shopId: Scalars["ID"]
}

export type DeleteNavigationItemInput = {
  clientMutationId?: Maybe<Scalars["String"]>
  id: Scalars["ID"]
  shopId: Scalars["ID"]
}

export type UpdateNavigationTreeInput = {
  clientMutationId?: Maybe<Scalars["String"]>
  id: Scalars["ID"]
  navigationTree: NavigationTreeInput
  shopId: Scalars["ID"]
}

export type PublishNavigationChangesInput = {
  clientMutationId?: Maybe<Scalars["String"]>
  id: Scalars["ID"]
  shopId: Scalars["ID"]
}

export type NavigationItemInput = {
  draftData?: Maybe<NavigationItemDataInput>
  metadata?: Maybe<Scalars["JSONObject"]>
  shopId: Scalars["ID"]
}

export type NavigationItemDataInput = {
  classNames?: Maybe<Scalars["String"]>
  content?: Maybe<Array<Maybe<NavigationItemContentInput>>>
  isUrlRelative?: Maybe<Scalars["Boolean"]>
  shouldOpenInNewWindow?: Maybe<Scalars["Boolean"]>
  url?: Maybe<Scalars["String"]>
}

export type NavigationItemContentInput = {
  language: Scalars["String"]
  value?: Maybe<Scalars["String"]>
}

export type NavigationTreeInput = {
  draftItems?: Maybe<Array<Maybe<NavigationTreeItemInput>>>
  name?: Maybe<Scalars["String"]>
}

export type NavigationTreeItemInput = {
  expanded?: Maybe<Scalars["Boolean"]>
  isPrivate?: Maybe<Scalars["Boolean"]>
  isSecondary?: Maybe<Scalars["Boolean"]>
  isVisible?: Maybe<Scalars["Boolean"]>
  items?: Maybe<Array<Maybe<NavigationTreeItemInput>>>
  navigationItemId: Scalars["ID"]
}

export type CreateNavigationTreeInput = {
  clientMutationId?: Maybe<Scalars["String"]>
  draftItems?: Maybe<Array<Maybe<NavigationTreeItemInput>>>
  name: Scalars["String"]
  shopId: Scalars["ID"]
}

export type CreateNavigationItemPayload = {
  __typename?: "CreateNavigationItemPayload"
  clientMutationId?: Maybe<Scalars["String"]>
  navigationItem?: Maybe<NavigationItem>
}

export type UpdateNavigationItemPayload = {
  __typename?: "UpdateNavigationItemPayload"
  clientMutationId?: Maybe<Scalars["String"]>
  navigationItem?: Maybe<NavigationItem>
}

export type DeleteNavigationItemPayload = {
  __typename?: "DeleteNavigationItemPayload"
  clientMutationId?: Maybe<Scalars["String"]>
  navigationItem?: Maybe<NavigationItem>
}

export type UpdateNavigationTreePayload = {
  __typename?: "UpdateNavigationTreePayload"
  clientMutationId?: Maybe<Scalars["String"]>
  navigationTree?: Maybe<NavigationTree>
}

export type PublishNavigationChangesPayload = {
  __typename?: "PublishNavigationChangesPayload"
  clientMutationId?: Maybe<Scalars["String"]>
  navigationTree?: Maybe<NavigationTree>
}

export type GenerateSitemapsInput = {
  clientMutationId?: Maybe<Scalars["String"]>
  shopId: Scalars["ID"]
}

export type GenerateSitemapsPayload = {
  __typename?: "GenerateSitemapsPayload"
  clientMutationId?: Maybe<Scalars["String"]>
  wasJobScheduled: Scalars["Boolean"]
}

export type Sitemap = {
  __typename?: "Sitemap"
  createdAt: Scalars["Date"]
  handle: Scalars["String"]
  shopId: Scalars["String"]
  xml: Scalars["String"]
}

export enum DataClassificationEnum {
  Public = "Public",
  Internal = "Internal",
  Confidential = "Confidential",
  Restricted = "Restricted"
}

export enum ThemesEnum {
  Agriculture = "Agriculture",
  Culture = "Culture",
  Economy = "Economy",
  Education = "Education",
  Energy = "Energy",
  Environment = "Environment",
  Finance = "Finance",
  Fisheries = "Fisheries",
  Health = "Health",
  Infrastructure = "Infrastructure",
  International = "International",
  Justice = "Justice",
  Population = "Population",
  Public = "Public",
  Sector = "Sector",
  Regional = "Regional",
  Science = "Science",
  Society = "Society",
  Sports = "Sports",
  Technology = "Technology",
  Transport = "Transport"
}

export type InvoiceDetails = {
  __typename?: "InvoiceDetails"
  bic: Scalars["String"]
  iban: Scalars["String"]
  taxIdentityNumber: Scalars["String"]
  additionalInfo?: Maybe<Scalars["String"]>
}

export type InvoiceDetailsInput = {
  bic: Scalars["String"]
  iban: Scalars["String"]
  taxIdentityNumber: Scalars["String"]
  additionalInfo?: Maybe<Scalars["String"]>
}

export type CatalogSearchResult = {
  __typename?: "CatalogSearchResult"
  items: Array<Maybe<CatalogItemProduct>>
  cursor?: Maybe<Scalars["String"]>
  count?: Maybe<Scalars["Int"]>
}

export type FacetValues = {
  __typename?: "FacetValues"
  value: Scalars["String"]
  count: Scalars["Int"]
}

export type Facet = {
  __typename?: "Facet"
  title?: Maybe<Scalars["String"]>
  property: Scalars["String"]
  values: Array<Maybe<FacetValues>>
}

export type CatalogSearchFacetsResult = {
  __typename?: "CatalogSearchFacetsResult"
  facets: Array<Maybe<Facet>>
}

export type Filters = {
  assetType?: Maybe<Array<Maybe<Scalars["String"]>>>
  originCountry?: Maybe<Array<Maybe<Scalars["String"]>>>
  maxPrice?: Maybe<Scalars["Int"]>
  minPrice?: Maybe<Scalars["Int"]>
  priceModel?: Maybe<Array<Maybe<Scalars["String"]>>>
  option?: Maybe<Array<Maybe<Scalars["String"]>>>
  vendor?: Maybe<Array<Maybe<Scalars["String"]>>>
  tax?: Maybe<Array<Maybe<Scalars["String"]>>>
  dataClassification?: Maybe<Array<Maybe<DataClassificationEnum>>>
  themes?: Maybe<Array<Maybe<ThemesEnum>>>
  distributionFormat?: Maybe<Array<Maybe<Scalars["String"]>>>
  distributionType?: Maybe<Array<Maybe<Scalars["String"]>>>
  distributionSize?: Maybe<Scalars["String"]>
  language?: Maybe<Array<Maybe<Scalars["String"]>>>
}

export type SearchQuery = {
  query?: Maybe<Scalars["String"]>
  filters?: Maybe<Filters>
  pageSize?: Maybe<Scalars["Int"]>
  cursor?: Maybe<Scalars["String"]>
}

export enum PriceModelType {
  Free = "free",
  Once = "once",
  Subscription = "subscription",
  CustomQuotes = "customQuotes"
}

export type TimeRange = {
  __typename?: "TimeRange"
  from: Scalars["String"]
  to?: Maybe<Scalars["String"]>
}

export type PriceModel = {
  __typename?: "PriceModel"
  type: PriceModelType
  paymentPeriod?: Maybe<Scalars["String"]>
  timeRange?: Maybe<TimeRange>
  volume?: Maybe<Scalars["String"]>
  quantity?: Maybe<Scalars["String"]>
}

export type Distribution = {
  __typename?: "Distribution"
  title: Scalars["String"]
  description?: Maybe<Scalars["String"]>
  format?: Maybe<Scalars["String"]>
  size?: Maybe<Scalars["String"]>
  mimeType?: Maybe<Scalars["String"]>
  type?: Maybe<Scalars["String"]>
  encryption?: Maybe<Scalars["String"]>
  volume?: Maybe<Scalars["String"]>
  modifiedAt?: Maybe<Scalars["String"]>
  createdAt?: Maybe<Scalars["String"]>
  language?: Maybe<Scalars["String"]>
  accessUrl?: Maybe<Scalars["String"]>
  user?: Maybe<Scalars["String"]>
  password?: Maybe<Scalars["String"]>
  metafields?: Maybe<Array<Maybe<Metafield>>>
}

export enum DataQualityRange {
  High = "high",
  Low = "low",
  Medium = "medium"
}

export type DataQuality = {
  __typename?: "DataQuality"
  completeness?: Maybe<DataQualityRange>
  accuracy?: Maybe<DataQualityRange>
}

export type AssetMetadata = {
  distributions?: Maybe<Array<Maybe<Distribution>>>
  dataQuality?: Maybe<DataQuality>
  priceModel?: Maybe<PriceModel>
}

export type DistributionInput = {
  title: Scalars["String"]
  description?: Maybe<Scalars["String"]>
  format?: Maybe<Scalars["String"]>
  size?: Maybe<Scalars["String"]>
  mimeType?: Maybe<Scalars["String"]>
  type?: Maybe<Scalars["String"]>
  encryption?: Maybe<Scalars["String"]>
  volume?: Maybe<Scalars["String"]>
  modifiedAt?: Maybe<Scalars["String"]>
  createdAt?: Maybe<Scalars["String"]>
  language?: Maybe<Scalars["String"]>
  accessUrl?: Maybe<Scalars["String"]>
  user?: Maybe<Scalars["String"]>
  password?: Maybe<Scalars["String"]>
  metafields?: Maybe<Array<Maybe<MetafieldInput>>>
}

export type TimeRangeInput = {
  from: Scalars["String"]
  to?: Maybe<Scalars["String"]>
}

export type PriceModelInput = {
  type: PriceModelType
  paymentPeriod?: Maybe<Scalars["String"]>
  timeRange?: Maybe<TimeRangeInput>
  volume?: Maybe<Scalars["String"]>
  quantity?: Maybe<Scalars["String"]>
}

export type DataQualityInput = {
  completeness?: Maybe<DataQualityRange>
  accuracy?: Maybe<DataQualityRange>
}

export enum CustomFieldType {
  Text = "text",
  Boolean = "boolean",
  Select = "select",
  CustomSelect = "customSelect"
}

export type CustomField = {
  __typename?: "CustomField"
  title: Scalars["String"]
  attributeName: Scalars["String"]
  type: CustomFieldType
  description?: Maybe<Scalars["String"]>
  enum?: Maybe<Array<Maybe<Scalars["String"]>>>
  fullWidth?: Maybe<Scalars["Boolean"]>
  multiple?: Maybe<Scalars["Boolean"]>
}

export type FieldsTemplate = {
  __typename?: "FieldsTemplate"
  id: Scalars["ID"]
  title: Scalars["String"]
  priority?: Maybe<Scalars["Int"]>
  fields?: Maybe<Array<Maybe<CustomField>>>
  description?: Maybe<Scalars["String"]>
}

export type FieldsTemplatesResult = {
  __typename?: "FieldsTemplatesResult"
  templates: Array<Maybe<FieldsTemplate>>
}

export type CartPaymentMethod = {
  __typename?: "CartPaymentMethod"
  displayName: Scalars["String"]
  name: Scalars["String"]
  pluginName: Scalars["String"]
}

export type FulfillmentDistribution = {
  __typename?: "FulfillmentDistribution"
  title: Scalars["String"]
  description?: Maybe<Scalars["String"]>
  format?: Maybe<Scalars["String"]>
  size?: Maybe<Scalars["String"]>
  mimeType?: Maybe<Scalars["String"]>
  type?: Maybe<Scalars["String"]>
  accessUrl?: Maybe<Scalars["String"]>
  user?: Maybe<Scalars["String"]>
  password?: Maybe<Scalars["String"]>
  encryption?: Maybe<Scalars["String"]>
  volume?: Maybe<Scalars["String"]>
  modifiedAt?: Maybe<Scalars["String"]>
  createdAt?: Maybe<Scalars["String"]>
  language?: Maybe<Scalars["String"]>
  metafields?: Maybe<Array<Maybe<Metafield>>>
}

export type DistributionGroup = {
  __typename?: "DistributionGroup"
  title: Scalars["String"]
  distributions: Array<Maybe<FulfillmentDistribution>>
}

export type OrderFulfilmentOption = {
  __typename?: "OrderFulfilmentOption"
  productId: Scalars["ID"]
  variantId: Scalars["ID"]
  variantTitle?: Maybe<Scalars["String"]>
  quantity: Scalars["Int"]
  distributionsGroups: Array<Maybe<DistributionGroup>>
}

export type OrderFulfilment = {
  __typename?: "OrderFulfilment"
  fulfillment?: Maybe<Array<Maybe<OrderFulfilmentOption>>>
}

export type OrderInvoice = {
  __typename?: "OrderInvoice"
  invoice: Scalars["String"]
}

export type Methods = {
  __typename?: "Methods"
  methods: Array<Maybe<DigitalFulfillmentMethod>>
}

export type DigitalFulfillmentMethod = {
  __typename?: "DigitalFulfillmentMethod"
  _id: Scalars["ID"]
  cost?: Maybe<Scalars["Float"]>
  fulfillmentTypes: Array<Maybe<FulfillmentType>>
  group: Scalars["String"]
  handling: Scalars["Float"]
  isEnabled: Scalars["Boolean"]
  label: Scalars["String"]
  name: Scalars["String"]
  rate: Scalars["Float"]
}

export type DigitalFulfillmentMethodInput = {
  cost?: Maybe<Scalars["Float"]>
  fulfillmentTypes: Array<Maybe<FulfillmentType>>
  group: Scalars["String"]
  handling: Scalars["Float"]
  isEnabled: Scalars["Boolean"]
  label: Scalars["String"]
  name: Scalars["String"]
  rate: Scalars["Float"]
}

export type FulfillmentDistributionInput = {
  title: Scalars["String"]
  description?: Maybe<Scalars["String"]>
  accessUrl?: Maybe<Scalars["String"]>
  format?: Maybe<Scalars["String"]>
  size?: Maybe<Scalars["String"]>
  mimeType?: Maybe<Scalars["String"]>
  type?: Maybe<Scalars["String"]>
  user?: Maybe<Scalars["String"]>
  password?: Maybe<Scalars["String"]>
  encryption?: Maybe<Scalars["String"]>
  volume?: Maybe<Scalars["String"]>
  modifiedAt?: Maybe<Scalars["String"]>
  createdAt?: Maybe<Scalars["String"]>
  language?: Maybe<Scalars["String"]>
  metafields?: Maybe<Array<Maybe<MetafieldInput>>>
}

export type DistributionGroupInput = {
  title: Scalars["String"]
  distributions: Array<Maybe<FulfillmentDistributionInput>>
}

export type OrderFulfilmentOptionInput = {
  productId: Scalars["ID"]
  variantId: Scalars["ID"]
  variantTitle?: Maybe<Scalars["String"]>
  quantity: Scalars["Int"]
  distributionsGroups: Array<Maybe<DistributionGroupInput>>
}

export type CartPaymentMethodInput = {
  displayName: Scalars["String"]
  name: Scalars["String"]
  pluginName: Scalars["String"]
}

export type CreateDigitalFulfillmentMethodInput = {
  method: DigitalFulfillmentMethodInput
  shopId: Scalars["ID"]
}

export type UpdateDigitalFulfillmentMethodInput = {
  method: DigitalFulfillmentMethodInput
  methodId: Scalars["ID"]
  shopId: Scalars["ID"]
}

export type DeleteDigitalFulfillmentMethodInput = {
  methodId: Scalars["ID"]
  shopId: Scalars["ID"]
}

export type CreateOrderFulfillmentInput = {
  orderId: Scalars["ID"]
  shopId: Scalars["ID"]
  fulfillment: Array<Maybe<OrderFulfilmentOptionInput>>
}

export type SetCartPaymentMethodInput = {
  cartId: Scalars["ID"]
  shopId: Scalars["ID"]
  paymentMethod: CartPaymentMethodInput
}

export type CreateDigitalFulfillmentMethodPayload = {
  __typename?: "CreateDigitalFulfillmentMethodPayload"
  method: DigitalFulfillmentMethod
}

export type UpdateDigitalFulfillmentMethodPayload = {
  __typename?: "UpdateDigitalFulfillmentMethodPayload"
  method: DigitalFulfillmentMethod
}

export type DeleteDigitalFulfillmentMethodPayload = {
  __typename?: "DeleteDigitalFulfillmentMethodPayload"
  method: DigitalFulfillmentMethod
}

export type CreateOrderFulfillmentPayload = {
  __typename?: "CreateOrderFulfillmentPayload"
  fulfillment: Array<Maybe<OrderFulfilmentOption>>
}

export type RatingsCount = {
  __typename?: "RatingsCount"
  rating: Scalars["Int"]
  count: Scalars["Int"]
}

export type ReviewsAggregation = {
  __typename?: "ReviewsAggregation"
  averageRating?: Maybe<Scalars["Float"]>
  totalCount?: Maybe<Scalars["Int"]>
  counts?: Maybe<Array<Maybe<RatingsCount>>>
}

export type ReviewAccount = {
  __typename?: "ReviewAccount"
  _id: Scalars["ID"]
  name?: Maybe<Scalars["String"]>
  firstName?: Maybe<Scalars["String"]>
  lastName?: Maybe<Scalars["String"]>
  picture?: Maybe<Scalars["String"]>
}

export type ReviewAttributedProduct = {
  __typename?: "ReviewAttributedProduct"
  _id: Scalars["ID"]
  title?: Maybe<Scalars["String"]>
}

export type ReviewAttributedShop = {
  __typename?: "ReviewAttributedShop"
  _id: Scalars["ID"]
  name?: Maybe<Scalars["String"]>
}

export type Review = {
  __typename?: "Review"
  _id: Scalars["ID"]
  reviewBody?: Maybe<Scalars["String"]>
  reviewRating: Scalars["Int"]
  attributedShopId?: Maybe<Scalars["ID"]>
  attributedProductId?: Maybe<Scalars["ID"]>
  attributedAccountId?: Maybe<Scalars["ID"]>
  attributedShop?: Maybe<ReviewAttributedShop>
  attributedProduct?: Maybe<ReviewAttributedProduct>
  attributedAccount?: Maybe<ReviewAccount>
  account: ReviewAccount
  createdAt: Scalars["String"]
  published: Scalars["Boolean"]
}

export type Reviews = {
  __typename?: "Reviews"
  reviews: Array<Maybe<Review>>
}

export type CanAddReviews = {
  __typename?: "CanAddReviews"
  canAddReview: Scalars["Boolean"]
}

export type ProductReviewInput = {
  shopId: Scalars["ID"]
  accountId: Scalars["ID"]
  attributedProductId: Scalars["ID"]
  reviewBody?: Maybe<Scalars["String"]>
  reviewRating: Scalars["Int"]
}

export type AccountReviewInput = {
  shopId: Scalars["ID"]
  accountId: Scalars["ID"]
  attributedAccountId: Scalars["ID"]
  reviewBody?: Maybe<Scalars["String"]>
  reviewRating: Scalars["Int"]
}

export type ShopReviewInput = {
  shopId: Scalars["ID"]
  accountId: Scalars["ID"]
  attributedShopId: Scalars["ID"]
  reviewBody?: Maybe<Scalars["String"]>
  reviewRating: Scalars["Int"]
}

export type InquiryOffer = {
  __typename?: "InquiryOffer"
  variant: CatalogProductVariant
  product: CatalogProduct
}

export type InquiryReply = {
  __typename?: "InquiryReply"
  _id: Scalars["ID"]
  account: Account
  offers?: Maybe<Array<Maybe<InquiryOffer>>>
  message?: Maybe<Scalars["String"]>
  accepted?: Maybe<Scalars["Boolean"]>
  rejected?: Maybe<Scalars["Boolean"]>
  createdAt: Scalars["String"]
  updatedAt: Scalars["String"]
}

export type Inquiry = {
  __typename?: "Inquiry"
  _id: Scalars["ID"]
  title: Scalars["String"]
  description?: Maybe<Scalars["String"]>
  useCase?: Maybe<Scalars["String"]>
  sourceTypes?: Maybe<Array<Maybe<Scalars["String"]>>>
  desiredPricing?: Maybe<Scalars["String"]>
  expectedConsumptionVolume?: Maybe<Scalars["String"]>
  categories?: Maybe<Array<Maybe<Scalars["String"]>>>
  license?: Maybe<Scalars["String"]>
  expirationDate?: Maybe<Scalars["String"]>
  published: Scalars["Boolean"]
  account: Account
  shop: Shop
  createdAt: Scalars["String"]
  updatedAt: Scalars["String"]
  repliesCount: Scalars["Int"]
  replies?: Maybe<Array<Maybe<InquiryReply>>>
}

export type AccountInquiriesResult = {
  __typename?: "AccountInquiriesResult"
  inquiries: Array<Maybe<Inquiry>>
}

export type InquiriesQueryInput = {
  accountId?: Maybe<Scalars["ID"]>
  title?: Maybe<Scalars["String"]>
}

export type InquiryFilters = {
  sourceTypes?: Maybe<Array<Maybe<Scalars["String"]>>>
  categories?: Maybe<Array<Maybe<Scalars["String"]>>>
  license?: Maybe<Array<Maybe<Scalars["String"]>>>
  replies?: Maybe<Array<Maybe<Scalars["String"]>>>
  expectedConsumptionVolume?: Maybe<Array<Maybe<Scalars["String"]>>>
}

export type InquirySearchQuery = {
  query?: Maybe<Scalars["String"]>
  filters?: Maybe<InquiryFilters>
  pageSize?: Maybe<Scalars["Int"]>
  cursor?: Maybe<Scalars["String"]>
}

export type InquiriesSearchResult = {
  __typename?: "InquiriesSearchResult"
  items: Array<Maybe<Inquiry>>
  cursor?: Maybe<Scalars["String"]>
  count?: Maybe<Scalars["Int"]>
}

export type InquiryInput = {
  title: Scalars["String"]
  description?: Maybe<Scalars["String"]>
  useCase?: Maybe<Scalars["String"]>
  sourceTypes?: Maybe<Array<Maybe<Scalars["String"]>>>
  desiredPricing?: Maybe<Scalars["String"]>
  expectedConsumptionVolume?: Maybe<Scalars["String"]>
  categories?: Maybe<Array<Maybe<Scalars["String"]>>>
  license?: Maybe<Scalars["String"]>
  expirationDate?: Maybe<Scalars["String"]>
  published: Scalars["Boolean"]
}

export type InquiryOfferInput = {
  variantId: Scalars["ID"]
  productId: Scalars["ID"]
}

export type InquiryReplyInput = {
  offers?: Maybe<Array<Maybe<InquiryOfferInput>>>
  message?: Maybe<Scalars["String"]>
}

export type AcceptRejectInquiryReplyInput = {
  accepted?: Maybe<Scalars["Boolean"]>
  rejected?: Maybe<Scalars["Boolean"]>
  replyId: Scalars["ID"]
}

export type BankTransferData = {
  __typename?: "BankTransferData"
  userMarkedAsPaid?: Maybe<Scalars["Boolean"]>
}

export type User = {
  __typename?: "User"
  id: Scalars["ID"]
  emails?: Maybe<Array<EmailRecord>>
  username?: Maybe<Scalars["String"]>
}

export type Tokens = {
  __typename?: "Tokens"
  refreshToken?: Maybe<Scalars["String"]>
  accessToken?: Maybe<Scalars["String"]>
}

export type LoginResult = {
  __typename?: "LoginResult"
  sessionId?: Maybe<Scalars["String"]>
  tokens?: Maybe<Tokens>
  user?: Maybe<User>
}

export type CreateUserResult = {
  __typename?: "CreateUserResult"
  userId?: Maybe<Scalars["ID"]>
  loginResult?: Maybe<LoginResult>
}

export type TwoFactorSecretKey = {
  __typename?: "TwoFactorSecretKey"
  ascii?: Maybe<Scalars["String"]>
  base32?: Maybe<Scalars["String"]>
  hex?: Maybe<Scalars["String"]>
  qr_code_ascii?: Maybe<Scalars["String"]>
  qr_code_hex?: Maybe<Scalars["String"]>
  qr_code_base32?: Maybe<Scalars["String"]>
  google_auth_qr?: Maybe<Scalars["String"]>
  otpauth_url?: Maybe<Scalars["String"]>
}

export type TwoFactorSecretKeyInput = {
  ascii?: Maybe<Scalars["String"]>
  base32?: Maybe<Scalars["String"]>
  hex?: Maybe<Scalars["String"]>
  qr_code_ascii?: Maybe<Scalars["String"]>
  qr_code_hex?: Maybe<Scalars["String"]>
  qr_code_base32?: Maybe<Scalars["String"]>
  google_auth_qr?: Maybe<Scalars["String"]>
  otpauth_url?: Maybe<Scalars["String"]>
}

export type CreateUserInput = {
  username?: Maybe<Scalars["String"]>
  email?: Maybe<Scalars["String"]>
  password?: Maybe<Scalars["String"]>
}

export type ImpersonateReturn = {
  __typename?: "ImpersonateReturn"
  authorized?: Maybe<Scalars["Boolean"]>
  tokens?: Maybe<Tokens>
  user?: Maybe<User>
}

export type UserInput = {
  id?: Maybe<Scalars["ID"]>
  email?: Maybe<Scalars["String"]>
  username?: Maybe<Scalars["String"]>
}

export type AuthenticateParamsInput = {
  access_token?: Maybe<Scalars["String"]>
  access_token_secret?: Maybe<Scalars["String"]>
  provider?: Maybe<Scalars["String"]>
  password?: Maybe<Scalars["String"]>
  user?: Maybe<UserInput>
  code?: Maybe<Scalars["String"]>
  token?: Maybe<Scalars["String"]>
}

export type ImpersonationUserIdentityInput = {
  userId?: Maybe<Scalars["String"]>
  username?: Maybe<Scalars["String"]>
  email?: Maybe<Scalars["String"]>
}
