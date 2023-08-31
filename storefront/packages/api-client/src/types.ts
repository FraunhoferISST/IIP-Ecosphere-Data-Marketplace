/* eslint-disable no-use-before-define */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    Date: any;
    DateTime: any;
    JSONObject: any;
    ConnectionCursor: any;
    ConnectionLimitInt: any;
    Email: any;
};

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
    __typename?: "ImageSizes";
    large?: Maybe<Scalars["String"]>;
    medium?: Maybe<Scalars["String"]>;
    original?: Maybe<Scalars["String"]>;
    small?: Maybe<Scalars["String"]>;
    thumbnail?: Maybe<Scalars["String"]>;
};

export type ImageInfo = {
    __typename?: "ImageInfo";
    URLs?: Maybe<ImageSizes>;
    _id?: Maybe<Scalars["ID"]>;
    priority?: Maybe<Scalars["Int"]>;
    productId?: Maybe<Scalars["ID"]>;
    variantId?: Maybe<Scalars["ID"]>;
};

export type Money = {
    __typename?: "Money";
    amount: Scalars["Float"];
    currency: Currency;
    displayAmount: Scalars["String"];
};

export type MoneyInput = {
    amount: Scalars["Float"];
    currencyCode: Scalars["String"];
};

export type Rate = {
    __typename?: "Rate";
    amount: Scalars["Float"];
    displayPercent: Scalars["String"];
    percent: Scalars["Float"];
};

export type Mutation = {
    __typename?: "Mutation";
    echo?: Maybe<Scalars["String"]>;
    archiveMediaRecord: ArchiveMediaRecordPayload;
    createMediaRecord: CreateMediaRecordPayload;
    deleteMediaRecord: DeleteMediaRecordPayload;
    updateMediaRecordPriority: UpdateMediaRecordPriorityPayload;
    createShop: CreateShopPayload;
    updateShop: UpdateShopPayload;
    updateGlobalSettings: UpdateGlobalSettingsPayload;
    updateShopSettings: UpdateShopSettingsPayload;
    createAddressValidationRule: CreateAddressValidationRulePayload;
    deleteAddressValidationRule: DeleteAddressValidationRulePayload;
    updateAddressValidationRule: UpdateAddressValidationRulePayload;
    addAccountAddressBookEntry?: Maybe<AddAccountAddressBookEntryPayload>;
    addAccountEmailRecord?: Maybe<AddAccountEmailRecordPayload>;
    createAccount?: Maybe<CreateAccountPayload>;
    removeAccountAddressBookEntry?: Maybe<RemoveAccountAddressBookEntryPayload>;
    removeAccountEmailRecord?: Maybe<RemoveAccountEmailRecordPayload>;
    sendResetAccountPasswordEmail?: Maybe<SendResetAccountPasswordEmailPayload>;
    setAccountDefaultEmail?: Maybe<SetAccountDefaultEmailPayload>;
    updateAccountAddressBookEntry?: Maybe<UpdateAccountAddressBookEntryPayload>;
    updateAccount?: Maybe<UpdateAccountPayload>;
    updateGroupsForAccounts?: Maybe<UpdateGroupsForAccountsPayload>;
    grantAdminUIAccess: GrantOrRevokeAdminUiAccessPayload;
    revokeAdminUIAccess: GrantOrRevokeAdminUiAccessPayload;
    updateAdminUIAccess: UpdateAdminUiAccessPayload;
    addAccountToGroup?: Maybe<AddAccountToGroupPayload>;
    createAccountGroup?: Maybe<CreateAccountGroupPayload>;
    removeAccountFromGroup?: Maybe<RemoveAccountFromGroupPayload>;
    removeAccountGroup?: Maybe<RemoveAccountGroupPayload>;
    updateAccountGroup?: Maybe<UpdateAccountGroupPayload>;
    inviteShopMember?: Maybe<InviteShopMemberPayload>;
    archiveProducts: ArchiveProductsPayload;
    archiveProductVariants: ArchiveProductVariantsPayload;
    updateProductsVisibility: UpdateProductsVisibilityPayload;
    createProduct: CreateProductPayload;
    createProductVariant: CreateProductVariantPayload;
    cloneProducts: CloneProductsPayload;
    cloneProductVariants: CloneProductVariantsPayload;
    updateProduct: UpdateProductPayload;
    updateProductVariant: UpdateProductVariantPayload;
    addTagsToProducts: ProductTagsOperationPayload;
    removeTagsFromProducts: ProductTagsOperationPayload;
    publishProductsToCatalog?: Maybe<Array<Maybe<CatalogItemProduct>>>;
    addTag: AddTagPayload;
    removeTag: RemoveTagPayload;
    setTagHeroMedia: SetTagHeroMediaPayload;
    updateTag: UpdateTagPayload;
    updateProductVariantPrices: UpdateProductVariantPricesPayload;
    recalculateReservedSimpleInventory: RecalculateReservedSimpleInventoryPayload;
    updateSimpleInventory: UpdateSimpleInventoryPayload;
    addCartItems: AddCartItemsPayload;
    createCart: CreateCartPayload;
    reconcileCarts: ReconcileCartsPayload;
    removeCartItems: RemoveCartItemsPayload;
    setEmailOnAnonymousCart: SetEmailOnAnonymousCartPayload;
    updateCartItemsQuantity: UpdateCartItemsQuantityPayload;
    selectFulfillmentOptionForGroup: SelectFulfillmentOptionForGroupPayload;
    setShippingAddressOnCart: SetShippingAddressOnCartPayload;
    updateFulfillmentOptionsForGroup: UpdateFulfillmentOptionsForGroupPayload;
    addOrderFulfillmentGroup: AddOrderFulfillmentGroupPayload;
    cancelOrderItem: CancelOrderItemPayload;
    createRefund: CreateRefundPayload;
    moveOrderItems: MoveOrderItemsPayload;
    placeOrder: PlaceOrderPayload;
    splitOrderItem: SplitOrderItemPayload;
    updateOrder: UpdateOrderPayload;
    updateOrderFulfillmentGroup: UpdateOrderFulfillmentGroupPayload;
    approveOrderPayments: ApproveOrderPaymentsPayload;
    captureOrderPayments: CaptureOrderPaymentsPayload;
    enablePaymentMethodForShop: EnablePaymentMethodForShopPayload;
    createDiscountCode?: Maybe<CreateDiscountCodePayload>;
    updateDiscountCode?: Maybe<UpdateDiscountCodePayload>;
    deleteDiscountCode?: Maybe<DeleteDiscountCodePayload>;
    applyDiscountCodeToCart: ApplyDiscountCodeToCartPayload;
    removeDiscountCodeFromCart: RemoveDiscountCodeFromCartPayload;
    createSurcharge: CreateSurchargePayload;
    deleteSurcharge: DeleteSurchargePayload;
    updateSurcharge: UpdateSurchargePayload;
    createFlatRateFulfillmentMethod: CreateFlatRateFulfillmentMethodPayload;
    updateFlatRateFulfillmentMethod: UpdateFlatRateFulfillmentMethodPayload;
    deleteFlatRateFulfillmentMethod: DeleteFlatRateFulfillmentMethodPayload;
    createFlatRateFulfillmentRestriction: CreateFlatRateFulfillmentRestrictionPayload;
    deleteFlatRateFulfillmentRestriction: DeleteFlatRateFulfillmentRestrictionPayload;
    updateFlatRateFulfillmentRestriction: UpdateFlatRateFulfillmentRestrictionPayload;
    createTaxRate?: Maybe<CreateTaxRatePayload>;
    updateTaxRate?: Maybe<UpdateTaxRatePayload>;
    deleteTaxRate?: Maybe<DeleteTaxRatePayload>;
    createNavigationItem?: Maybe<CreateNavigationItemPayload>;
    createNavigationTree: CreateNavigationTreePayload;
    deleteNavigationItem?: Maybe<DeleteNavigationItemPayload>;
    publishNavigationChanges?: Maybe<PublishNavigationChangesPayload>;
    updateNavigationItem?: Maybe<UpdateNavigationItemPayload>;
    updateNavigationTree?: Maybe<UpdateNavigationTreePayload>;
    generateSitemaps: GenerateSitemapsPayload;
    createDigitalFulfillmentMethod: CreateDigitalFulfillmentMethodPayload;
    updateDigitalFulfillmentMethod: UpdateDigitalFulfillmentMethodPayload;
    deleteDigitalFulfillmentMethod: DeleteDigitalFulfillmentMethodPayload;
    createUser?: Maybe<CreateUserResult>;
    verifyEmail?: Maybe<Scalars["Boolean"]>;
    resetPassword?: Maybe<LoginResult>;
    sendVerificationEmail?: Maybe<Scalars["Boolean"]>;
    sendResetPasswordEmail?: Maybe<Scalars["Boolean"]>;
    addEmail?: Maybe<Scalars["Boolean"]>;
    changePassword?: Maybe<Scalars["Boolean"]>;
    twoFactorSet?: Maybe<Scalars["Boolean"]>;
    twoFactorUnset?: Maybe<Scalars["Boolean"]>;
    impersonate?: Maybe<ImpersonateReturn>;
    refreshTokens?: Maybe<LoginResult>;
    logout?: Maybe<Scalars["Boolean"]>;
    authenticate?: Maybe<LoginResult>;
    verifyAuthentication?: Maybe<Scalars["Boolean"]>;
};

export type Query = {
    __typename?: "Query";
    ping: Scalars["String"];
    primaryShop?: Maybe<Shop>;
    primaryShopId?: Maybe<Scalars["ID"]>;
    shop?: Maybe<Shop>;
    shopBySlug?: Maybe<Shop>;
    shops?: Maybe<ShopConnection>;
    globalSettings: GlobalSettings;
    shopSettings: ShopSettings;
    addressValidation: AddressValidationResults;
    addressValidationServices: Array<Maybe<AddressValidationService>>;
    addressValidationRules: AddressValidationRuleConnection;
    systemInformation: SystemInformation;
    account?: Maybe<Account>;
    accounts: AccountConnection;
    customers: AccountConnection;
    viewer?: Maybe<Account>;
    group?: Maybe<Group>;
    groups?: Maybe<GroupConnection>;
    invitations: InvitationConnection;
    roles?: Maybe<RoleConnection>;
    product?: Maybe<Product>;
    products?: Maybe<ProductConnection>;
    catalogItems?: Maybe<CatalogItemConnection>;
    catalogItemProduct?: Maybe<CatalogItemProduct>;
    vendors?: Maybe<VendorConnection>;
    productsByTagId: TagProductConnection;
    tag?: Maybe<Tag>;
    tags?: Maybe<TagConnection>;
    simpleInventory?: Maybe<SimpleInventoryInfo>;
    anonymousCartByCartId?: Maybe<Cart>;
    accountCartByAccountId?: Maybe<Cart>;
    orderById?: Maybe<Order>;
    orders: OrderConnection;
    ordersByAccountId: OrdersByAccountIdConnection;
    orderByReferenceId?: Maybe<Order>;
    refunds?: Maybe<Array<Maybe<Refund>>>;
    refundsByPaymentId?: Maybe<Array<Maybe<Refund>>>;
    availablePaymentMethods: Array<Maybe<PaymentMethod>>;
    paymentMethods: Array<Maybe<PaymentMethod>>;
    discountCodes?: Maybe<DiscountCodeConnection>;
    surcharges: SurchargeConnection;
    surchargeById?: Maybe<Surcharge>;
    flatRateFulfillmentMethod: FlatRateFulfillmentMethod;
    flatRateFulfillmentMethods: FlatRateFulfillmentMethodConnection;
    getFlatRateFulfillmentRestrictions: FlatRateFulfillmentRestrictionConnection;
    getFlatRateFulfillmentRestriction?: Maybe<FlatRateFulfillmentRestriction>;
    taxCodes: Array<Maybe<TaxCode>>;
    taxServices: Array<Maybe<TaxService>>;
    taxRates?: Maybe<TaxRateConnection>;
    navigationTreeById?: Maybe<NavigationTree>;
    navigationItemsByShopId?: Maybe<NavigationItemConnection>;
    sitemap?: Maybe<Sitemap>;
    getPaypalConfigClient: PaypalConfigClient;
    digitalFulfillmentMethod: DigitalFulfillmentMethod;
    digitalFulfillmentMethods: Methods;
    twoFactorSecret?: Maybe<TwoFactorSecretKey>;
    getUser?: Maybe<User>;
};

export type FakeData = {
    __typename?: "FakeData";
    doNotUse?: Maybe<Scalars["String"]>;
};

export type Currency = Node & {
    __typename?: "Currency";
    _id: Scalars["ID"];
    code: Scalars["String"];
    decimal?: Maybe<Scalars["String"]>;
    format: Scalars["String"];
    rate?: Maybe<Scalars["Float"]>;
    scale?: Maybe<Scalars["Int"]>;
    symbol: Scalars["String"];
    thousand?: Maybe<Scalars["String"]>;
};

export enum SortOrder {
    Asc = "asc",
    Desc = "desc"
}

export type Node = {
    _id: Scalars["ID"];
};

export type Deletable = {
    isDeleted: Scalars["Boolean"];
};

export type NodeEdge = {
    cursor: Scalars["ConnectionCursor"];
    node?: Maybe<Node>;
};

export type PageInfo = {
    __typename?: "PageInfo";
    endCursor?: Maybe<Scalars["ConnectionCursor"]>;
    hasNextPage: Scalars["Boolean"];
    hasPreviousPage: Scalars["Boolean"];
    startCursor?: Maybe<Scalars["ConnectionCursor"]>;
};

export type EmailRecord = {
    __typename?: "EmailRecord";
    address?: Maybe<Scalars["String"]>;
    provides?: Maybe<Scalars["String"]>;
    verified?: Maybe<Scalars["Boolean"]>;
};

export type EmailRecordInput = {
    address?: InputMaybe<Scalars["String"]>;
    provides?: InputMaybe<Scalars["String"]>;
    verified?: InputMaybe<Scalars["Boolean"]>;
};

export type MetafieldInput = {
    description?: InputMaybe<Scalars["String"]>;
    key: Scalars["String"];
    namespace?: InputMaybe<Scalars["String"]>;
    scope?: InputMaybe<Scalars["String"]>;
    value?: InputMaybe<Scalars["String"]>;
    valueType?: InputMaybe<Scalars["String"]>;
};

export type Metafield = {
    __typename?: "Metafield";
    description?: Maybe<Scalars["String"]>;
    key?: Maybe<Scalars["String"]>;
    namespace?: Maybe<Scalars["String"]>;
    scope?: Maybe<Scalars["String"]>;
    value?: Maybe<Scalars["String"]>;
    valueType?: Maybe<Scalars["String"]>;
};

export type AddressInput = {
    address1: Scalars["String"];
    address2?: InputMaybe<Scalars["String"]>;
    addressName?: InputMaybe<Scalars["String"]>;
    city: Scalars["String"];
    company?: InputMaybe<Scalars["String"]>;
    country: Scalars["String"];
    firstName?: InputMaybe<Scalars["String"]>;
    fullName: Scalars["String"];
    isBillingDefault?: InputMaybe<Scalars["Boolean"]>;
    isCommercial?: InputMaybe<Scalars["Boolean"]>;
    isShippingDefault?: InputMaybe<Scalars["Boolean"]>;
    lastName?: InputMaybe<Scalars["String"]>;
    metafields?: InputMaybe<Array<InputMaybe<MetafieldInput>>>;
    phone: Scalars["String"];
    postal: Scalars["String"];
    region: Scalars["String"];
};

export type Address = {
    __typename?: "Address";
    _id?: Maybe<Scalars["ID"]>;
    address1: Scalars["String"];
    address2?: Maybe<Scalars["String"]>;
    city: Scalars["String"];
    company?: Maybe<Scalars["String"]>;
    country: Scalars["String"];
    firstName?: Maybe<Scalars["String"]>;
    fullName: Scalars["String"];
    isBillingDefault?: Maybe<Scalars["Boolean"]>;
    isCommercial: Scalars["Boolean"];
    isShippingDefault?: Maybe<Scalars["Boolean"]>;
    lastName?: Maybe<Scalars["String"]>;
    metafields?: Maybe<Array<Maybe<Metafield>>>;
    phone: Scalars["String"];
    postal: Scalars["String"];
    region: Scalars["String"];
};

export type AddressConnection = {
    __typename?: "AddressConnection";
    edges?: Maybe<Array<Maybe<AddressEdge>>>;
    nodes?: Maybe<Array<Maybe<Address>>>;
    pageInfo: PageInfo;
    totalCount: Scalars["Int"];
};

export type AddressEdge = {
    __typename?: "AddressEdge";
    cursor: Scalars["ConnectionCursor"];
    node?: Maybe<Address>;
};

export type Subscription = {
    __typename?: "Subscription";
    tick: Scalars["Int"];
};

export type MediaRecordInfo = {
    __typename?: "MediaRecordInfo";
    name: Scalars["String"];
    size: Scalars["Int"];
    type: Scalars["String"];
    updatedAt: Scalars["DateTime"];
    uploadedAt: Scalars["DateTime"];
};

export type MediaRecordMetadata = {
    __typename?: "MediaRecordMetadata";
    isArchived: Scalars["Boolean"];
    ownerId?: Maybe<Scalars["String"]>;
    priority?: Maybe<Scalars["Int"]>;
    productId?: Maybe<Scalars["String"]>;
    shopId: Scalars["String"];
    type?: Maybe<Scalars["String"]>;
    variantId?: Maybe<Scalars["String"]>;
};

export type MediaRecord = {
    __typename?: "MediaRecord";
    _id: Scalars["ID"];
    metadata: MediaRecordMetadata;
    original: MediaRecordInfo;
};

export type MediaRecordInfoInput = {
    name: Scalars["String"];
    size: Scalars["Int"];
    tempStoreId: Scalars["String"];
    type: Scalars["String"];
    updatedAt: Scalars["DateTime"];
    uploadedAt: Scalars["DateTime"];
};

export type MediaRecordMetadataInput = {
    priority?: InputMaybe<Scalars["Int"]>;
    productId?: InputMaybe<Scalars["ID"]>;
    type?: InputMaybe<Scalars["String"]>;
    variantId?: InputMaybe<Scalars["ID"]>;
};

export type MediaRecordInput = {
    metadata: MediaRecordMetadataInput;
    original: MediaRecordInfoInput;
};

export type ArchiveMediaRecordInput = {
    clientMutationId?: InputMaybe<Scalars["String"]>;
    mediaRecordId: Scalars["ID"];
    shopId: Scalars["ID"];
};

export type CreateMediaRecordInput = {
    clientMutationId?: InputMaybe<Scalars["String"]>;
    mediaRecord: MediaRecordInput;
    shopId: Scalars["ID"];
};

export type DeleteMediaRecordInput = {
    clientMutationId?: InputMaybe<Scalars["String"]>;
    mediaRecordId: Scalars["ID"];
    shopId: Scalars["ID"];
};

export type UpdateMediaRecordPriorityInput = {
    clientMutationId?: InputMaybe<Scalars["String"]>;
    mediaRecordId: Scalars["ID"];
    priority: Scalars["Int"];
    shopId: Scalars["ID"];
};

export type ArchiveMediaRecordPayload = {
    __typename?: "ArchiveMediaRecordPayload";
    clientMutationId?: Maybe<Scalars["String"]>;
    mediaRecord: MediaRecord;
};

export type CreateMediaRecordPayload = {
    __typename?: "CreateMediaRecordPayload";
    clientMutationId?: Maybe<Scalars["String"]>;
    mediaRecord: MediaRecord;
};

export type DeleteMediaRecordPayload = {
    __typename?: "DeleteMediaRecordPayload";
    clientMutationId?: Maybe<Scalars["String"]>;
    mediaRecord: MediaRecord;
};

export type UpdateMediaRecordPriorityPayload = {
    __typename?: "UpdateMediaRecordPriorityPayload";
    clientMutationId?: Maybe<Scalars["String"]>;
    mediaRecord: MediaRecord;
};

export type CreateShopInput = {
    clientMutationId?: InputMaybe<Scalars["String"]>;
    currencyCode?: InputMaybe<Scalars["String"]>;
    defaultLanguage?: InputMaybe<Scalars["String"]>;
    defaultTimezone?: InputMaybe<Scalars["String"]>;
    description?: InputMaybe<Scalars["String"]>;
    name: Scalars["String"];
    type?: InputMaybe<Scalars["String"]>;
};

export type CreateShopPayload = {
    __typename?: "CreateShopPayload";
    clientMutationId?: Maybe<Scalars["String"]>;
    shop: Shop;
};

export type ShopBrandAssets = {
    __typename?: "ShopBrandAssets";
    navbarBrandImage?: Maybe<ImageSizes>;
    navbarBrandImageId?: Maybe<Scalars["String"]>;
};

export type ShopLogoUrls = {
    __typename?: "ShopLogoUrls";
    primaryShopLogoUrl?: Maybe<Scalars["String"]>;
};

export type StorefrontUrls = {
    __typename?: "StorefrontUrls";
    storefrontAccountProfileUrl?: Maybe<Scalars["String"]>;
    storefrontHomeUrl?: Maybe<Scalars["String"]>;
    storefrontLoginUrl?: Maybe<Scalars["String"]>;
    storefrontOrderUrl?: Maybe<Scalars["String"]>;
    storefrontOrdersUrl?: Maybe<Scalars["String"]>;
};

export type ShopParcelSize = {
    __typename?: "ShopParcelSize";
    height?: Maybe<Scalars["Float"]>;
    length?: Maybe<Scalars["Float"]>;
    weight?: Maybe<Scalars["Float"]>;
    width?: Maybe<Scalars["Float"]>;
};

export type UnitOfLength = {
    __typename?: "UnitOfLength";
    default?: Maybe<Scalars["Boolean"]>;
    label?: Maybe<Scalars["String"]>;
    uol?: Maybe<Scalars["String"]>;
};

export type UnitOfMeasure = {
    __typename?: "UnitOfMeasure";
    default?: Maybe<Scalars["Boolean"]>;
    label?: Maybe<Scalars["String"]>;
    uom?: Maybe<Scalars["String"]>;
};

export type Shop = Node & {
    __typename?: "Shop";
    _id: Scalars["ID"];
    addressBook?: Maybe<Array<Maybe<Address>>>;
    allowGuestCheckout?: Maybe<Scalars["Boolean"]>;
    baseUOL?: Maybe<Scalars["String"]>;
    baseUOM?: Maybe<Scalars["String"]>;
    brandAssets?: Maybe<ShopBrandAssets>;
    currency: Currency;
    defaultParcelSize?: Maybe<ShopParcelSize>;
    description?: Maybe<Scalars["String"]>;
    emails?: Maybe<Array<Maybe<EmailRecord>>>;
    keywords?: Maybe<Scalars["String"]>;
    language: Scalars["String"];
    name: Scalars["String"];
    shopLogoUrls?: Maybe<ShopLogoUrls>;
    shopType?: Maybe<Scalars["String"]>;
    slug?: Maybe<Scalars["String"]>;
    storefrontUrls?: Maybe<StorefrontUrls>;
    timezone?: Maybe<Scalars["String"]>;
    unitsOfLength?: Maybe<Array<Maybe<UnitOfLength>>>;
    unitsOfMeasure?: Maybe<Array<Maybe<UnitOfMeasure>>>;
    groups?: Maybe<GroupConnection>;
    roles?: Maybe<RoleConnection>;
    tags?: Maybe<TagConnection>;
    defaultNavigationTree?: Maybe<NavigationTree>;
    defaultNavigationTreeId?: Maybe<Scalars["String"]>;
};

export type ShopConnection = {
    __typename?: "ShopConnection";
    edges?: Maybe<Array<Maybe<ShopEdge>>>;
    nodes?: Maybe<Array<Maybe<Shop>>>;
    pageInfo: PageInfo;
    totalCount: Scalars["Int"];
};

export type ShopEdge = NodeEdge & {
    __typename?: "ShopEdge";
    cursor: Scalars["ConnectionCursor"];
    node?: Maybe<Shop>;
};

export type StorefrontUrlsInput = {
    storefrontAccountProfileUrl?: InputMaybe<Scalars["String"]>;
    storefrontHomeUrl?: InputMaybe<Scalars["String"]>;
    storefrontLoginUrl?: InputMaybe<Scalars["String"]>;
    storefrontOrderUrl?: InputMaybe<Scalars["String"]>;
    storefrontOrdersUrl?: InputMaybe<Scalars["String"]>;
};

export type ShopLogoUrlsInput = {
    primaryShopLogoUrl?: InputMaybe<Scalars["String"]>;
};

export type ShopParcelSizeInput = {
    height?: InputMaybe<Scalars["Float"]>;
    length?: InputMaybe<Scalars["Float"]>;
    weight?: InputMaybe<Scalars["Float"]>;
    width?: InputMaybe<Scalars["Float"]>;
};

export type UpdateShopPayload = {
    __typename?: "UpdateShopPayload";
    clientMutationId?: Maybe<Scalars["String"]>;
    shop: Shop;
};

export type GlobalSettings = {
    __typename?: "GlobalSettings";
    doNotUse?: Maybe<Scalars["String"]>;
};

export type ShopSettings = {
    __typename?: "ShopSettings";
    doNotUse?: Maybe<Scalars["String"]>;
    canSellVariantWithoutInventory: Scalars["Boolean"];
    isShippingRatesFulfillmentEnabled?: Maybe<Scalars["Boolean"]>;
    defaultTaxCode?: Maybe<Scalars["String"]>;
    fallbackTaxServiceName?: Maybe<Scalars["String"]>;
    primaryTaxServiceName?: Maybe<Scalars["String"]>;
    shouldNavigationTreeItemsBeAdminOnly: Scalars["Boolean"];
    shouldNavigationTreeItemsBePubliclyVisible: Scalars["Boolean"];
    shouldNavigationTreeItemsBeSecondaryNavOnly: Scalars["Boolean"];
    sitemapRefreshPeriod: Scalars["String"];
};

export type UpdateGlobalSettingsPayload = {
    __typename?: "UpdateGlobalSettingsPayload";
    clientMutationId?: Maybe<Scalars["String"]>;
    globalSettings: GlobalSettings;
};

export type UpdateShopSettingsPayload = {
    __typename?: "UpdateShopSettingsPayload";
    clientMutationId?: Maybe<Scalars["String"]>;
    shopSettings: ShopSettings;
};

export type AddressValidationService = {
    __typename?: "AddressValidationService";
    displayName: Scalars["String"];
    name: Scalars["String"];
    supportedCountryCodes?: Maybe<Array<Maybe<Scalars["String"]>>>;
};

export type AddressValidationError = {
    __typename?: "AddressValidationError";
    details?: Maybe<Scalars["String"]>;
    source?: Maybe<Scalars["String"]>;
    summary: Scalars["String"];
    type: Scalars["String"];
};

export type SuggestedAddress = {
    __typename?: "SuggestedAddress";
    address1: Scalars["String"];
    address2?: Maybe<Scalars["String"]>;
    city: Scalars["String"];
    country: Scalars["String"];
    postal: Scalars["String"];
    region: Scalars["String"];
};

export type AddressValidationResults = {
    __typename?: "AddressValidationResults";
    suggestedAddresses: Array<Maybe<SuggestedAddress>>;
    validationErrors: Array<Maybe<AddressValidationError>>;
};

export type AddressValidationRule = Node & {
    __typename?: "AddressValidationRule";
    _id: Scalars["ID"];
    countryCodes?: Maybe<Array<Maybe<Scalars["String"]>>>;
    createdAt: Scalars["DateTime"];
    serviceName: Scalars["String"];
    shopId: Scalars["ID"];
    updatedAt: Scalars["DateTime"];
};

export type CreateAddressValidationRulePayload = {
    __typename?: "CreateAddressValidationRulePayload";
    addressValidationRule: AddressValidationRule;
    clientMutationId?: Maybe<Scalars["String"]>;
};

export type DeleteAddressValidationRulePayload = {
    __typename?: "DeleteAddressValidationRulePayload";
    addressValidationRule: AddressValidationRule;
    clientMutationId?: Maybe<Scalars["String"]>;
};

export type UpdateAddressValidationRulePayload = {
    __typename?: "UpdateAddressValidationRulePayload";
    addressValidationRule: AddressValidationRule;
    clientMutationId?: Maybe<Scalars["String"]>;
};

export type AddressValidationRuleEdge = NodeEdge & {
    __typename?: "AddressValidationRuleEdge";
    cursor: Scalars["ConnectionCursor"];
    node?: Maybe<AddressValidationRule>;
};

export type AddressValidationRuleConnection = {
    __typename?: "AddressValidationRuleConnection";
    edges?: Maybe<Array<Maybe<AddressValidationRuleEdge>>>;
    nodes?: Maybe<Array<Maybe<AddressValidationRule>>>;
    pageInfo: PageInfo;
    totalCount: Scalars["Int"];
};

export enum AddressValidationRuleSortByField {
    Id = "_id",
    CreatedAt = "createdAt",
    ServiceName = "serviceName",
    UpdatedAt = "updatedAt"
}

export type Plugin = {
    __typename?: "Plugin";
    name: Scalars["String"];
    version?: Maybe<Scalars["String"]>;
};

export type DatabaseInformation = {
    __typename?: "DatabaseInformation";
    version: Scalars["String"];
};

export type SystemInformation = {
    __typename?: "SystemInformation";
    apiVersion: Scalars["String"];
    mongoVersion: DatabaseInformation;
    plugins?: Maybe<Array<Maybe<Plugin>>>;
};

export enum AddressType {
    Billing = "billing",
    Shipping = "shipping"
}

export type Account = Node & {
    __typename?: "Account";
    _id: Scalars["ID"];
    addressBook?: Maybe<AddressConnection>;
    adminUIShops?: Maybe<Array<Maybe<Shop>>>;
    bio?: Maybe<Scalars["String"]>;
    createdAt: Scalars["DateTime"];
    currency?: Maybe<Currency>;
    emailRecords?: Maybe<Array<Maybe<EmailRecord>>>;
    firstName?: Maybe<Scalars["String"]>;
    language?: Maybe<Scalars["String"]>;
    lastName?: Maybe<Scalars["String"]>;
    metafields?: Maybe<Array<Maybe<Metafield>>>;
    name?: Maybe<Scalars["String"]>;
    note?: Maybe<Scalars["String"]>;
    picture?: Maybe<Scalars["String"]>;
    preferences?: Maybe<Scalars["JSONObject"]>;
    primaryEmailAddress: Scalars["Email"];
    updatedAt?: Maybe<Scalars["DateTime"]>;
    userId: Scalars["String"];
    username?: Maybe<Scalars["String"]>;
    groups?: Maybe<GroupConnection>;
};

export type AccountAddressBookArgs = {
    after?: InputMaybe<Scalars["ConnectionCursor"]>;
    before?: InputMaybe<Scalars["ConnectionCursor"]>;
    first?: InputMaybe<Scalars["ConnectionLimitInt"]>;
    last?: InputMaybe<Scalars["ConnectionLimitInt"]>;
    offset?: InputMaybe<Scalars["Int"]>;
};

export type AccountGroupsArgs = {
    after?: InputMaybe<Scalars["ConnectionCursor"]>;
    before?: InputMaybe<Scalars["ConnectionCursor"]>;
    first?: InputMaybe<Scalars["ConnectionLimitInt"]>;
    last?: InputMaybe<Scalars["ConnectionLimitInt"]>;
    offset?: InputMaybe<Scalars["Int"]>;
    sortOrder?: InputMaybe<SortOrder>;
    sortBy?: InputMaybe<GroupSortByField>;
};

export type BasicAccount = Node & {
    __typename?: "BasicAccount";
    _id: Scalars["ID"];
    acceptsMarketing?: Maybe<Scalars["Boolean"]>;
    emails?: Maybe<Array<Maybe<EmailRecord>>>;
    groups?: Maybe<Array<Maybe<Scalars["String"]>>>;
    name?: Maybe<Scalars["String"]>;
    profile?: Maybe<Array<Maybe<Profile>>>;
    shopId?: Maybe<Scalars["String"]>;
    state?: Maybe<Scalars["String"]>;
    userId?: Maybe<Scalars["String"]>;
    createdAt?: Maybe<Scalars["DateTime"]>;
    updatedAt?: Maybe<Scalars["DateTime"]>;
    adminUIShopIds?: Maybe<Array<Maybe<Scalars["String"]>>>;
};

export type Profile = {
    __typename?: "Profile";
    addressBook?: Maybe<Array<Maybe<Address>>>;
};

export type AccountConnection = {
    __typename?: "AccountConnection";
    edges?: Maybe<Array<Maybe<AccountEdge>>>;
    nodes?: Maybe<Array<Maybe<Account>>>;
    pageInfo: PageInfo;
    totalCount: Scalars["Int"];
};

export type AccountEdge = NodeEdge & {
    __typename?: "AccountEdge";
    cursor: Scalars["ConnectionCursor"];
    node?: Maybe<Account>;
};

export type AddAccountAddressBookEntryPayload = {
    __typename?: "AddAccountAddressBookEntryPayload";
    address?: Maybe<Address>;
    addressEdge?: Maybe<AddressEdge>;
    clientMutationId?: Maybe<Scalars["String"]>;
};

export type AddAccountEmailRecordPayload = {
    __typename?: "AddAccountEmailRecordPayload";
    account?: Maybe<Account>;
    clientMutationId?: Maybe<Scalars["String"]>;
};

export type CreateAccountPayload = {
    __typename?: "CreateAccountPayload";
    account?: Maybe<BasicAccount>;
    clientMutationId?: Maybe<Scalars["String"]>;
};

export type SendResetAccountPasswordEmailPayload = {
    __typename?: "SendResetAccountPasswordEmailPayload";
    clientMutationId?: Maybe<Scalars["String"]>;
    email: Scalars["String"];
};

export type RemoveAccountAddressBookEntryPayload = {
    __typename?: "RemoveAccountAddressBookEntryPayload";
    address?: Maybe<Address>;
    clientMutationId?: Maybe<Scalars["String"]>;
};

export type RemoveAccountEmailRecordPayload = {
    __typename?: "RemoveAccountEmailRecordPayload";
    account?: Maybe<Account>;
    clientMutationId?: Maybe<Scalars["String"]>;
};

export type SetAccountDefaultEmailPayload = {
    __typename?: "SetAccountDefaultEmailPayload";
    account?: Maybe<Account>;
    clientMutationId?: Maybe<Scalars["String"]>;
};

export type UpdateAccountAddressBookEntryPayload = {
    __typename?: "UpdateAccountAddressBookEntryPayload";
    address?: Maybe<Address>;
    clientMutationId?: Maybe<Scalars["String"]>;
};

export type UpdateAccountPayload = {
    __typename?: "UpdateAccountPayload";
    account: Account;
    clientMutationId?: Maybe<Scalars["String"]>;
};

export type UpdateGroupsForAccountsPayload = {
    __typename?: "UpdateGroupsForAccountsPayload";
    clientMutationId?: Maybe<Scalars["String"]>;
    accounts: Array<Maybe<Account>>;
};

export type GrantOrRevokeAdminUiAccessInput = {
    clientMutationId?: InputMaybe<Scalars["String"]>;
    accountId: Scalars["String"];
    shopId: Scalars["String"];
};

export type UpdateAdminUiAccessInput = {
    clientMutationId?: InputMaybe<Scalars["String"]>;
    accountIds: Array<InputMaybe<Scalars["String"]>>;
    shopIds: Array<InputMaybe<Scalars["String"]>>;
};

export type GrantOrRevokeAdminUiAccessPayload = {
    __typename?: "GrantOrRevokeAdminUIAccessPayload";
    clientMutationId?: Maybe<Scalars["String"]>;
    account?: Maybe<Account>;
};

export type UpdateAdminUiAccessPayload = {
    __typename?: "UpdateAdminUIAccessPayload";
    clientMutationId?: Maybe<Scalars["String"]>;
    accounts?: Maybe<Array<Maybe<Account>>>;
};

export enum GroupSortByField {
    Id = "_id",
    CreatedAt = "createdAt",
    Name = "name",
    UpdatedAt = "updatedAt"
}

export type GroupInput = {
    description?: InputMaybe<Scalars["String"]>;
    name: Scalars["String"];
    slug?: InputMaybe<Scalars["String"]>;
    permissions?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type UpdateGroupInput = {
    description?: InputMaybe<Scalars["String"]>;
    name?: InputMaybe<Scalars["String"]>;
    slug?: InputMaybe<Scalars["String"]>;
    permissions?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type Group = Node & {
    __typename?: "Group";
    _id: Scalars["ID"];
    createdAt: Scalars["DateTime"];
    createdBy?: Maybe<Account>;
    description?: Maybe<Scalars["String"]>;
    name: Scalars["String"];
    shop?: Maybe<Shop>;
    slug: Scalars["String"];
    updatedAt: Scalars["DateTime"];
    permissions?: Maybe<Array<Maybe<Scalars["String"]>>>;
};

export type GroupConnection = {
    __typename?: "GroupConnection";
    edges?: Maybe<Array<Maybe<GroupEdge>>>;
    nodes?: Maybe<Array<Maybe<Group>>>;
    pageInfo: PageInfo;
    totalCount: Scalars["Int"];
};

export type GroupEdge = NodeEdge & {
    __typename?: "GroupEdge";
    cursor: Scalars["ConnectionCursor"];
    node?: Maybe<Group>;
};

export type AddAccountToGroupPayload = {
    __typename?: "AddAccountToGroupPayload";
    clientMutationId?: Maybe<Scalars["String"]>;
    group?: Maybe<Group>;
};

export type CreateAccountGroupPayload = {
    __typename?: "CreateAccountGroupPayload";
    clientMutationId?: Maybe<Scalars["String"]>;
    group?: Maybe<Group>;
};

export type UpdateAccountGroupPayload = {
    __typename?: "UpdateAccountGroupPayload";
    clientMutationId?: Maybe<Scalars["String"]>;
    group?: Maybe<Group>;
};

export type RemoveAccountFromGroupPayload = {
    __typename?: "RemoveAccountFromGroupPayload";
    clientMutationId?: Maybe<Scalars["String"]>;
    group: Group;
};

export type RemoveAccountGroupPayload = {
    __typename?: "RemoveAccountGroupPayload";
    clientMutationId?: Maybe<Scalars["String"]>;
    group?: Maybe<Group>;
};

export type InviteShopMemberInput = {
    clientMutationId?: InputMaybe<Scalars["String"]>;
    email: Scalars["String"];
    groupId?: InputMaybe<Scalars["ID"]>;
    groupIds?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
    name: Scalars["String"];
    shopId: Scalars["ID"];
    shouldGetAdminUIAccess?: InputMaybe<Scalars["Boolean"]>;
};

export type InviteShopMemberPayload = {
    __typename?: "InviteShopMemberPayload";
    account?: Maybe<Account>;
    clientMutationId?: Maybe<Scalars["String"]>;
};

export type InvitationConnection = {
    __typename?: "InvitationConnection";
    edges?: Maybe<Array<Maybe<InvitationEdge>>>;
    nodes?: Maybe<Array<Maybe<Invitation>>>;
    pageInfo: PageInfo;
    totalCount: Scalars["Int"];
};

export type InvitationEdge = NodeEdge & {
    __typename?: "InvitationEdge";
    cursor: Scalars["ConnectionCursor"];
    node?: Maybe<Invitation>;
};

export type Invitation = Node & {
    __typename?: "Invitation";
    _id: Scalars["ID"];
    email: Scalars["String"];
    groups: Array<Maybe<Group>>;
    shop?: Maybe<Shop>;
    invitedBy?: Maybe<Account>;
};

export enum RoleSortByField {
    Id = "_id",
    Name = "name"
}

export type Role = Node & {
    __typename?: "Role";
    _id: Scalars["ID"];
    name: Scalars["String"];
};

export type RoleConnection = {
    __typename?: "RoleConnection";
    edges?: Maybe<Array<Maybe<RoleEdge>>>;
    nodes?: Maybe<Array<Maybe<Role>>>;
    pageInfo: PageInfo;
    totalCount: Scalars["Int"];
};

export type RoleEdge = NodeEdge & {
    __typename?: "RoleEdge";
    cursor: Scalars["ConnectionCursor"];
    node?: Maybe<Role>;
};

export type Product = {
    __typename?: "Product";
    _id: Scalars["ID"];
    createdAt: Scalars["DateTime"];
    currentProductHash?: Maybe<Scalars["String"]>;
    description?: Maybe<Scalars["String"]>;
    isDeleted: Scalars["Boolean"];
    isVisible: Scalars["Boolean"];
    media?: Maybe<Array<Maybe<ImageInfo>>>;
    metaDescription?: Maybe<Scalars["String"]>;
    metafields: Array<Maybe<Metafield>>;
    originCountry?: Maybe<Scalars["String"]>;
    pageTitle?: Maybe<Scalars["String"]>;
    productType?: Maybe<Scalars["String"]>;
    publishedAt?: Maybe<Scalars["DateTime"]>;
    publishedProductHash?: Maybe<Scalars["String"]>;
    shop: Shop;
    shouldAppearInSitemap?: Maybe<Scalars["Boolean"]>;
    slug?: Maybe<Scalars["String"]>;
    socialMetadata?: Maybe<Array<Maybe<SocialMetadata>>>;
    supportedFulfillmentTypes: Array<Maybe<FulfillmentType>>;
    tagIds?: Maybe<Array<Maybe<Scalars["ID"]>>>;
    tags?: Maybe<TagConnection>;
    title?: Maybe<Scalars["String"]>;
    updatedAt?: Maybe<Scalars["DateTime"]>;
    variants: Array<Maybe<ProductVariant>>;
    vendor?: Maybe<Scalars["String"]>;

    /** @deprecated Use `pricing` */
    price?: Maybe<ProductPriceRange>;
    pricing: ProductPricingInfo;
    owners?: Maybe<Array<Scalars["String"]>>;
    versionInfo?: Maybe<Scalars["String"]>;
    versionNotes?: Maybe<Scalars["String"]>;
    rating?: Maybe<Scalars["Int"]>;
    reviews?: Maybe<Array<Maybe<Review>>>;
    updateCycle?: Maybe<Scalars["String"]>;
    dataClassification?: Maybe<DataClassificationEnum>;
    themes?: Maybe<Array<ThemesEnum>>;
};

export type ProductVariant = {
    __typename?: "ProductVariant";
    _id: Scalars["ID"];
    attributeLabel?: Maybe<Scalars["String"]>;
    barcode?: Maybe<Scalars["String"]>;
    createdAt?: Maybe<Scalars["DateTime"]>;
    height?: Maybe<Scalars["Float"]>;
    index?: Maybe<Scalars["Int"]>;
    isDeleted: Scalars["Boolean"];
    isVisible: Scalars["Boolean"];
    length?: Maybe<Scalars["Float"]>;
    media?: Maybe<Array<Maybe<ImageInfo>>>;
    metafields: Array<Maybe<Metafield>>;
    minOrderQuantity?: Maybe<Scalars["Int"]>;
    optionTitle?: Maybe<Scalars["String"]>;
    options: Array<Maybe<ProductVariant>>;
    originCountry?: Maybe<Scalars["String"]>;
    shop: Shop;
    sku?: Maybe<Scalars["String"]>;
    title?: Maybe<Scalars["String"]>;
    updatedAt?: Maybe<Scalars["DateTime"]>;
    weight?: Maybe<Scalars["Float"]>;
    width?: Maybe<Scalars["Float"]>;

    /** @deprecated Use `pricing` */
    compareAtPrice?: Maybe<Scalars["Float"]>;

    /** @deprecated Use `pricing` */
    price?: Maybe<Scalars["Float"]>;
    pricing: ProductPricingInfo;
    isTaxable?: Maybe<Scalars["Boolean"]>;
    taxCode?: Maybe<Scalars["String"]>;
    taxDescription?: Maybe<Scalars["String"]>;
    distributions?: Maybe<Array<Maybe<Distribution>>>;
    dataQuality?: Maybe<DataQuality>;
    priceModel?: Maybe<PriceModel>;
};

export type ProductVariantOptionsArgs = {
    shouldIncludeHidden?: InputMaybe<Scalars["Boolean"]>;
    shouldIncludeArchived?: InputMaybe<Scalars["Boolean"]>;
};

export type ArchiveProductsPayload = {
    __typename?: "ArchiveProductsPayload";
    clientMutationId?: Maybe<Scalars["String"]>;
    products: Array<Maybe<Product>>;
};

export type ArchiveProductVariantsPayload = {
    __typename?: "ArchiveProductVariantsPayload";
    clientMutationId?: Maybe<Scalars["String"]>;
    variants: Array<Maybe<ProductVariant>>;
};

export type UpdateProductsVisibilityPayload = {
    __typename?: "UpdateProductsVisibilityPayload";
    clientMutationId?: Maybe<Scalars["String"]>;
    updatedCount?: Maybe<Scalars["Int"]>;
};

export type CreateProductPayload = {
    __typename?: "CreateProductPayload";
    clientMutationId?: Maybe<Scalars["String"]>;
    product: Product;
};

export type CreateProductVariantPayload = {
    __typename?: "CreateProductVariantPayload";
    clientMutationId?: Maybe<Scalars["String"]>;
    variant: ProductVariant;
};

export type CloneProductsPayload = {
    __typename?: "CloneProductsPayload";
    clientMutationId?: Maybe<Scalars["String"]>;
    products: Array<Maybe<Product>>;
};

export type CloneProductVariantsPayload = {
    __typename?: "CloneProductVariantsPayload";
    clientMutationId?: Maybe<Scalars["String"]>;
    variants: Array<Maybe<ProductVariant>>;
};

export type UpdateProductPayload = {
    __typename?: "UpdateProductPayload";
    clientMutationId?: Maybe<Scalars["String"]>;
    product: Product;
};

export type UpdateProductVariantPayload = {
    __typename?: "UpdateProductVariantPayload";
    clientMutationId?: Maybe<Scalars["String"]>;
    variant: ProductVariant;
};

export type ProductEdge = {
    __typename?: "ProductEdge";
    cursor: Scalars["ConnectionCursor"];
    node?: Maybe<Product>;
};

export type ProductConnection = {
    __typename?: "ProductConnection";
    edges?: Maybe<Array<Maybe<ProductEdge>>>;
    nodes?: Maybe<Array<Maybe<Product>>>;
    pageInfo: PageInfo;
    totalCount: Scalars["Int"];
};

export type ProductInput = {
    _id?: InputMaybe<Scalars["String"]>;
    description?: InputMaybe<Scalars["String"]>;
    facebookMsg?: InputMaybe<Scalars["String"]>;
    googleplusMsg?: InputMaybe<Scalars["String"]>;
    isDeleted?: InputMaybe<Scalars["Boolean"]>;
    isVisible?: InputMaybe<Scalars["Boolean"]>;
    metaDescription?: InputMaybe<Scalars["String"]>;
    metafields?: InputMaybe<Array<InputMaybe<MetafieldInput>>>;
    originCountry?: InputMaybe<Scalars["String"]>;
    pageTitle?: InputMaybe<Scalars["String"]>;
    pinterestMsg?: InputMaybe<Scalars["String"]>;
    productType?: InputMaybe<Scalars["String"]>;
    shouldAppearInSitemap?: InputMaybe<Scalars["Boolean"]>;
    slug?: InputMaybe<Scalars["String"]>;
    supportedFulfillmentTypes?: InputMaybe<Array<InputMaybe<FulfillmentType>>>;
    tagIds?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
    title?: InputMaybe<Scalars["String"]>;
    twitterMsg?: InputMaybe<Scalars["String"]>;
    vendor?: InputMaybe<Scalars["String"]>;
    owners?: InputMaybe<Array<Scalars["String"]>>;
    versionInfo?: InputMaybe<Scalars["String"]>;
    versionNotes?: InputMaybe<Scalars["String"]>;
    rating?: InputMaybe<Scalars["Int"]>;
    reviewIds?: InputMaybe<Array<Scalars["ID"]>>;
    updateCycle?: InputMaybe<Scalars["String"]>;
    dataClassification?: InputMaybe<DataClassificationEnum>;
    themes?: InputMaybe<Array<ThemesEnum>>;
};

export type ProductVariantInput = {
    _id?: InputMaybe<Scalars["String"]>;
    attributeLabel?: InputMaybe<Scalars["String"]>;
    barcode?: InputMaybe<Scalars["String"]>;
    height?: InputMaybe<Scalars["Float"]>;
    index?: InputMaybe<Scalars["Int"]>;
    isDeleted?: InputMaybe<Scalars["Boolean"]>;
    isVisible?: InputMaybe<Scalars["Boolean"]>;
    length?: InputMaybe<Scalars["Float"]>;
    metafields?: InputMaybe<Array<InputMaybe<MetafieldInput>>>;
    minOrderQuantity?: InputMaybe<Scalars["Int"]>;
    optionTitle?: InputMaybe<Scalars["String"]>;
    originCountry?: InputMaybe<Scalars["String"]>;
    sku?: InputMaybe<Scalars["String"]>;
    title?: InputMaybe<Scalars["String"]>;
    weight?: InputMaybe<Scalars["Float"]>;
    width?: InputMaybe<Scalars["Float"]>;
    compareAtPrice?: InputMaybe<Scalars["Float"]>;
    price?: InputMaybe<Scalars["Float"]>;
    isTaxable?: InputMaybe<Scalars["Boolean"]>;
    taxCode?: InputMaybe<Scalars["String"]>;
    taxDescription?: InputMaybe<Scalars["String"]>;
    distributions?: InputMaybe<Array<InputMaybe<DistributionInput>>>;
    dataQuality?: InputMaybe<DataQualityInput>;
    priceModel?: InputMaybe<PriceModelInput>;
};

export type UpdateProductVariantInput = {
    shopId: Scalars["ID"];
    variant: ProductVariantInput;
    variantId: Scalars["ID"];
};

export enum ProductSortByField {
    Id = "_id",
    CreatedAt = "createdAt",
    Title = "title",
    UpdatedAt = "updatedAt"
}

export type ProductConfiguration = {
    __typename?: "ProductConfiguration";
    productId: Scalars["ID"];
    productVariantId: Scalars["ID"];
};

export type WriteError = {
    __typename?: "WriteError";
    documentId?: Maybe<Scalars["Int"]>;
    errorMsg?: Maybe<Scalars["String"]>;
};
export type ProductTagsOperationPayload = {
    __typename?: "ProductTagsOperationPayload";
    clientMutationId?: Maybe<Scalars["String"]>;
    foundCount?: Maybe<Scalars["Int"]>;
    notFoundCount?: Maybe<Scalars["Int"]>;
    updatedCount?: Maybe<Scalars["Int"]>;
    writeErrors?: Maybe<Array<Maybe<WriteError>>>;
};

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

export type SocialMetadata = {
    __typename?: "SocialMetadata";
    message?: Maybe<Scalars["String"]>;
    service?: Maybe<SocialNetwork>;
};

export type CatalogProductOrVariant = {
    barcode?: Maybe<Scalars["String"]>;
    createdAt?: Maybe<Scalars["DateTime"]>;
    height?: Maybe<Scalars["Float"]>;
    length?: Maybe<Scalars["Float"]>;
    metafields?: Maybe<Array<Maybe<Metafield>>>;
    minOrderQuantity?: Maybe<Scalars["Int"]>;
    originCountry?: Maybe<Scalars["String"]>;
    shop: Shop;
    sku?: Maybe<Scalars["String"]>;
    title?: Maybe<Scalars["String"]>;
    updatedAt?: Maybe<Scalars["DateTime"]>;
    weight?: Maybe<Scalars["Float"]>;
    width?: Maybe<Scalars["Float"]>;
};

export type CatalogProduct = CatalogProductOrVariant & Node & {
    __typename?: "CatalogProduct";
    _id: Scalars["ID"];
    barcode?: Maybe<Scalars["String"]>;
    createdAt: Scalars["DateTime"];
    description?: Maybe<Scalars["String"]>;
    height?: Maybe<Scalars["Float"]>;
    isDeleted: Scalars["Boolean"];
    isVisible: Scalars["Boolean"];
    length?: Maybe<Scalars["Float"]>;
    media?: Maybe<Array<Maybe<ImageInfo>>>;
    metaDescription?: Maybe<Scalars["String"]>;
    metafields?: Maybe<Array<Maybe<Metafield>>>;
    minOrderQuantity?: Maybe<Scalars["Int"]>;
    originCountry?: Maybe<Scalars["String"]>;
    pageTitle?: Maybe<Scalars["String"]>;
    parcel?: Maybe<ShippingParcel>;
    primaryImage?: Maybe<ImageInfo>;
    productId: Scalars["ID"];
    productType?: Maybe<Scalars["String"]>;
    shop: Shop;
    sku?: Maybe<Scalars["String"]>;
    slug?: Maybe<Scalars["String"]>;
    socialMetadata?: Maybe<Array<Maybe<SocialMetadata>>>;
    supportedFulfillmentTypes: Array<Maybe<FulfillmentType>>;
    title?: Maybe<Scalars["String"]>;
    updatedAt: Scalars["DateTime"];
    variants?: Maybe<Array<Maybe<CatalogProductVariant>>>;
    vendor?: Maybe<Scalars["String"]>;
    weight?: Maybe<Scalars["Float"]>;
    width?: Maybe<Scalars["Float"]>;
    tagIds?: Maybe<Array<Maybe<Scalars["ID"]>>>;
    tags?: Maybe<TagConnection>;
    pricing: Array<Maybe<ProductPricingInfo>>;
    isBackorder: Scalars["Boolean"];
    isLowQuantity: Scalars["Boolean"];
    isSoldOut: Scalars["Boolean"];
};

export type CatalogProductVariant = CatalogProductOrVariant & Node & {
    __typename?: "CatalogProductVariant";
    _id: Scalars["ID"];
    attributeLabel: Scalars["String"];
    barcode?: Maybe<Scalars["String"]>;
    createdAt?: Maybe<Scalars["DateTime"]>;
    height?: Maybe<Scalars["Float"]>;
    index: Scalars["Int"];
    length?: Maybe<Scalars["Float"]>;
    media?: Maybe<Array<Maybe<ImageInfo>>>;
    metafields?: Maybe<Array<Maybe<Metafield>>>;
    minOrderQuantity?: Maybe<Scalars["Int"]>;
    optionTitle?: Maybe<Scalars["String"]>;
    options?: Maybe<Array<Maybe<CatalogProductVariant>>>;
    originCountry?: Maybe<Scalars["String"]>;
    primaryImage?: Maybe<ImageInfo>;
    shop: Shop;
    sku?: Maybe<Scalars["String"]>;
    title?: Maybe<Scalars["String"]>;
    updatedAt?: Maybe<Scalars["DateTime"]>;
    variantId: Scalars["ID"];
    weight?: Maybe<Scalars["Float"]>;
    width?: Maybe<Scalars["Float"]>;
    pricing: Array<Maybe<ProductPricingInfo>>;
    canBackorder: Scalars["Boolean"];
    inventoryAvailableToSell?: Maybe<Scalars["Int"]>;
    inventoryInStock?: Maybe<Scalars["Int"]>;
    isBackorder: Scalars["Boolean"];
    isLowQuantity: Scalars["Boolean"];
    isSoldOut: Scalars["Boolean"];
    isTaxable: Scalars["Boolean"];
    taxCode?: Maybe<Scalars["String"]>;
    taxDescription?: Maybe<Scalars["String"]>;
    distributions?: Maybe<Array<Maybe<Distribution>>>;
    dataQuality?: Maybe<DataQuality>;
    priceModel?: Maybe<PriceModel>;
};

export type CatalogItem = {
    _id: Scalars["ID"];
    createdAt?: Maybe<Scalars["DateTime"]>;
    shop: Shop;
    updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type CatalogItemProduct = CatalogItem & Node & {
    __typename?: "CatalogItemProduct";
    _id: Scalars["ID"];
    createdAt: Scalars["DateTime"];
    product?: Maybe<CatalogProduct>;
    shop: Shop;
    updatedAt: Scalars["DateTime"];
    owners?: Maybe<Array<Scalars["String"]>>;
    versionInfo?: Maybe<Scalars["String"]>;
    versionNotes?: Maybe<Scalars["String"]>;
    rating?: Maybe<Scalars["Int"]>;
    reviews?: Maybe<Array<Maybe<Review>>>;
    updateCycle?: Maybe<Scalars["String"]>;
    dataClassification?: Maybe<DataClassificationEnum>;
    themes?: Maybe<Array<ThemesEnum>>;
};

export type CatalogItemEdge = {
    __typename?: "CatalogItemEdge";
    cursor: Scalars["ConnectionCursor"];
    node?: Maybe<CatalogItem>;
};

export type CatalogItemConnection = {
    __typename?: "CatalogItemConnection";
    edges?: Maybe<Array<Maybe<CatalogItemEdge>>>;
    nodes?: Maybe<Array<Maybe<CatalogItem>>>;
    pageInfo: PageInfo;
    totalCount: Scalars["Int"];
};

export type Vendor = {
    __typename?: "Vendor";
    name?: Maybe<Scalars["String"]>;
};

export type VendorEdge = {
    __typename?: "VendorEdge";
    cursor: Scalars["ConnectionCursor"];
    node?: Maybe<Vendor>;
};

export type VendorConnection = {
    __typename?: "VendorConnection";
    edges?: Maybe<Array<Maybe<VendorEdge>>>;
    nodes?: Maybe<Array<Maybe<Vendor>>>;
    pageInfo: PageInfo;
    totalCount: Scalars["Int"];
};

export type AddTagPayload = {
    __typename?: "AddTagPayload";
    clientMutationId?: Maybe<Scalars["String"]>;
    shopId: Scalars["ID"];
    tag: Tag;
};

export type TagProduct = {
    __typename?: "TagProduct";
    _id: Scalars["ID"];
    createdAt: Scalars["DateTime"];
    position?: Maybe<Scalars["Int"]>;
    title?: Maybe<Scalars["String"]>;
};

export type TagProductEdge = {
    __typename?: "TagProductEdge";
    cursor: Scalars["ConnectionCursor"];
    node?: Maybe<TagProduct>;
};

export type TagProductConnection = {
    __typename?: "TagProductConnection";
    edges?: Maybe<Array<Maybe<TagProductEdge>>>;
    nodes?: Maybe<Array<Maybe<TagProduct>>>;
    pageInfo: PageInfo;
    totalCount: Scalars["Int"];
};

export type RemoveTagPayload = {
    __typename?: "RemoveTagPayload";
    clientMutationId?: Maybe<Scalars["String"]>;
    tag: Tag;
};

export type SetTagHeroMediaPayload = {
    __typename?: "SetTagHeroMediaPayload";
    clientMutationId?: Maybe<Scalars["String"]>;
    tag: Tag;
};

export type Tag = Node & Deletable & {
    __typename?: "Tag";
    _id: Scalars["ID"];
    createdAt: Scalars["DateTime"];
    displayTitle?: Maybe<Scalars["String"]>;
    featuredProductIds?: Maybe<Array<Maybe<Scalars["ID"]>>>;
    heroMediaUrl?: Maybe<Scalars["String"]>;
    isDeleted: Scalars["Boolean"];
    isTopLevel: Scalars["Boolean"];
    isVisible: Scalars["Boolean"];
    metafields?: Maybe<Array<Maybe<Metafield>>>;
    name: Scalars["String"];
    position?: Maybe<Scalars["Int"]>;
    shop: Shop;
    slug?: Maybe<Scalars["String"]>;
    subTagIds: Array<Maybe<Scalars["ID"]>>;
    updatedAt: Scalars["DateTime"];
    subTags?: Maybe<TagConnection>;
};

export type TagSubTagsArgs = {
    after?: InputMaybe<Scalars["ConnectionCursor"]>;
    before?: InputMaybe<Scalars["ConnectionCursor"]>;
    first?: InputMaybe<Scalars["ConnectionLimitInt"]>;
    last?: InputMaybe<Scalars["ConnectionLimitInt"]>;
    offset?: InputMaybe<Scalars["Int"]>;
    sortOrder?: InputMaybe<SortOrder>;
    sortBy?: InputMaybe<TagSortByField>;
};

export enum TagSortByField {
    Id = "_id",
    CreatedAt = "createdAt",
    Name = "name",
    Position = "position",
    UpdatedAt = "updatedAt"
}

export type TagEdge = NodeEdge & {
    __typename?: "TagEdge";
    cursor: Scalars["ConnectionCursor"];
    node?: Maybe<Tag>;
};

export type TagConnection = {
    __typename?: "TagConnection";
    edges?: Maybe<Array<Maybe<TagEdge>>>;
    nodes?: Maybe<Array<Maybe<Tag>>>;
    pageInfo: PageInfo;
    totalCount: Scalars["Int"];
};

export type UpdateTagInput = {
    clientMutationId?: InputMaybe<Scalars["String"]>;
    displayTitle?: InputMaybe<Scalars["String"]>;
    featuredProductIds?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
    heroMediaUrl?: InputMaybe<Scalars["String"]>;
    id: Scalars["ID"];
    isVisible: Scalars["Boolean"];
    metafields?: InputMaybe<Array<InputMaybe<MetafieldInput>>>;
    name: Scalars["String"];
    shopId: Scalars["ID"];
    slug?: InputMaybe<Scalars["String"]>;
};

export type UpdateTagPayload = {
    __typename?: "UpdateTagPayload";
    clientMutationId?: Maybe<Scalars["String"]>;
    tag: Tag;
};

export type ProductPricingInfo = {
    __typename?: "ProductPricingInfo";
    compareAtPrice?: Maybe<Money>;
    currency: Currency;
    currencyExchangePricing?: Maybe<CurrencyExchangeProductPricingInfo>;
    displayPrice: Scalars["String"];
    maxPrice: Scalars["Float"];
    minPrice: Scalars["Float"];
    price?: Maybe<Scalars["Float"]>;
};

export type ProductPricingInfoCurrencyExchangePricingArgs = {
    currencyCode: Scalars["String"];
};

export type CurrencyExchangeProductPricingInfo = {
    __typename?: "CurrencyExchangeProductPricingInfo";
    compareAtPrice?: Maybe<Money>;
    currency: Currency;
    displayPrice: Scalars["String"];
    maxPrice: Scalars["Float"];
    minPrice: Scalars["Float"];
    price?: Maybe<Scalars["Float"]>;
};

export type ProductPriceRange = {
    __typename?: "ProductPriceRange";
    max?: Maybe<Scalars["Float"]>;
    min?: Maybe<Scalars["Float"]>;
    range?: Maybe<Scalars["String"]>;
};

export type UpdateProductVariantPricesInput = {
    prices: ProductVariantPricesInput;
    shopId: Scalars["ID"];
    variantId: Scalars["ID"];
};

export type ProductVariantPricesInput = {
    compareAtPrice?: InputMaybe<Scalars["Float"]>;
    price?: InputMaybe<Scalars["Float"]>;
};

export type UpdateProductVariantPricesPayload = {
    __typename?: "UpdateProductVariantPricesPayload";
    clientMutationId?: Maybe<Scalars["String"]>;
    variant: ProductVariant;
};

export type CartItem = Node & {
    __typename?: "CartItem";
    inventoryAvailableToSell?: Maybe<Scalars["Int"]>;
    isBackorder: Scalars["Boolean"];
    isLowQuantity: Scalars["Boolean"];
    isSoldOut: Scalars["Boolean"];
    _id: Scalars["ID"];
    addedAt: Scalars["DateTime"];
    attributes?: Maybe<Array<Maybe<CartItemAttribute>>>;
    compareAtPrice?: Maybe<Money>;
    createdAt: Scalars["DateTime"];
    imageURLs?: Maybe<ImageSizes>;
    metafields?: Maybe<Array<Maybe<Metafield>>>;
    optionTitle?: Maybe<Scalars["String"]>;
    parcel?: Maybe<ShippingParcel>;
    price: Money;
    priceWhenAdded: Money;
    productConfiguration: ProductConfiguration;
    productSlug?: Maybe<Scalars["String"]>;
    productTags?: Maybe<TagConnection>;
    productType?: Maybe<Scalars["String"]>;
    productVendor?: Maybe<Scalars["String"]>;
    quantity: Scalars["Int"];
    shop: Shop;
    subtotal: Money;
    title: Scalars["String"];
    updatedAt: Scalars["DateTime"];
    variantTitle?: Maybe<Scalars["String"]>;
    isTaxable: Scalars["Boolean"];
    tax?: Maybe<Money>;
    taxCode?: Maybe<Scalars["String"]>;
    taxableAmount?: Maybe<Money>;
    taxes?: Maybe<Array<Maybe<CalculatedTax>>>;
};

export type CartItemProductTagsArgs = {
    after?: InputMaybe<Scalars["ConnectionCursor"]>;
    before?: InputMaybe<Scalars["ConnectionCursor"]>;
    first?: InputMaybe<Scalars["ConnectionLimitInt"]>;
    last?: InputMaybe<Scalars["ConnectionLimitInt"]>;
    offset?: InputMaybe<Scalars["Int"]>;
    sortOrder?: InputMaybe<SortOrder>;
    sortBy?: InputMaybe<TagSortByField>;
};

export type SimpleInventoryInfo = {
    __typename?: "SimpleInventoryInfo";
    canBackorder?: Maybe<Scalars["Boolean"]>;
    inventoryInStock?: Maybe<Scalars["Int"]>;
    inventoryReserved?: Maybe<Scalars["Int"]>;
    isEnabled?: Maybe<Scalars["Boolean"]>;
    lowInventoryWarningThreshold?: Maybe<Scalars["Int"]>;
    productConfiguration: ProductConfiguration;
};

export type RecalculateReservedSimpleInventoryInput = {
    productConfiguration: ProductConfigurationInput;
    shopId: Scalars["ID"];
};

export type RecalculateReservedSimpleInventoryPayload = {
    __typename?: "RecalculateReservedSimpleInventoryPayload";
    clientMutationId?: Maybe<Scalars["String"]>;
    inventoryInfo: SimpleInventoryInfo;
};

export type UpdateSimpleInventoryInput = {
    canBackorder?: InputMaybe<Scalars["Boolean"]>;
    clientMutationId?: InputMaybe<Scalars["String"]>;
    inventoryInStock?: InputMaybe<Scalars["Int"]>;
    isEnabled?: InputMaybe<Scalars["Boolean"]>;
    lowInventoryWarningThreshold?: InputMaybe<Scalars["Int"]>;
    productConfiguration: ProductConfigurationInput;
    shopId: Scalars["ID"];
};

export type UpdateSimpleInventoryPayload = {
    __typename?: "UpdateSimpleInventoryPayload";
    clientMutationId?: Maybe<Scalars["String"]>;
    inventoryInfo: SimpleInventoryInfo;
};

export type Cart = Node & {
    __typename?: "Cart";
    _id: Scalars["ID"];
    account?: Maybe<Account>;
    checkout?: Maybe<Checkout>;
    createdAt: Scalars["DateTime"];
    email?: Maybe<Scalars["String"]>;
    expiresAt?: Maybe<Scalars["DateTime"]>;
    items?: Maybe<CartItemConnection>;
    missingItems?: Maybe<Array<Maybe<CartItem>>>;
    referenceId?: Maybe<Scalars["String"]>;
    shop: Shop;
    totalItemQuantity: Scalars["Int"];
    updatedAt: Scalars["DateTime"];
    surcharges: Array<Maybe<AppliedSurcharge>>;
    taxSummary?: Maybe<TaxSummary>;
};

export type CartItemsArgs = {
    after?: InputMaybe<Scalars["ConnectionCursor"]>;
    before?: InputMaybe<Scalars["ConnectionCursor"]>;
    first?: InputMaybe<Scalars["ConnectionLimitInt"]>;
    last?: InputMaybe<Scalars["ConnectionLimitInt"]>;
    offset?: InputMaybe<Scalars["Int"]>;
    sortOrder?: InputMaybe<SortOrder>;
    sortBy?: InputMaybe<CartItemsSortByField>;
};

export enum CartItemsSortByField {
    Id = "_id",
    AddedAt = "addedAt"
}

export type CartItemConnection = {
    __typename?: "CartItemConnection";
    edges?: Maybe<Array<Maybe<CartItemEdge>>>;
    nodes?: Maybe<Array<Maybe<CartItem>>>;
    pageInfo: PageInfo;
    totalCount: Scalars["Int"];
};

export type CartItemEdge = NodeEdge & {
    __typename?: "CartItemEdge";
    cursor: Scalars["ConnectionCursor"];
    node?: Maybe<CartItem>;
};

export type CartItemAttribute = {
    __typename?: "CartItemAttribute";
    label?: Maybe<Scalars["String"]>;
    value?: Maybe<Scalars["String"]>;
};

export enum CartReconciliationMode {
    KeepAccountCart = "keepAccountCart",
    KeepAnonymousCart = "keepAnonymousCart",
    Merge = "merge"
}

export type CreateCartInput = {
    clientMutationId?: InputMaybe<Scalars["String"]>;
    items: Array<InputMaybe<CartItemInput>>;
    shopId: Scalars["ID"];
};

export type CartItemInput = {
    metafields?: InputMaybe<Array<InputMaybe<MetafieldInput>>>;
    price: MoneyInput;
    productConfiguration: ProductConfigurationInput;
    quantity: Scalars["Int"];
};

export type ProductConfigurationInput = {
    productId: Scalars["ID"];
    productVariantId: Scalars["ID"];
};

export type AddCartItemsInput = {
    cartId: Scalars["ID"];
    cartToken?: InputMaybe<Scalars["String"]>;
    clientMutationId?: InputMaybe<Scalars["String"]>;
    items: Array<InputMaybe<CartItemInput>>;
};

export type RemoveCartItemsInput = {
    cartId: Scalars["ID"];
    cartItemIds: Array<InputMaybe<Scalars["ID"]>>;
    cartToken?: InputMaybe<Scalars["String"]>;
    clientMutationId?: InputMaybe<Scalars["String"]>;
};

export type UpdateCartItemInput = {
    cartItemId: Scalars["ID"];
    quantity: Scalars["Int"];
};

export type UpdateCartItemsQuantityInput = {
    cartId: Scalars["ID"];
    cartToken?: InputMaybe<Scalars["String"]>;
    clientMutationId?: InputMaybe<Scalars["String"]>;
    items: Array<InputMaybe<UpdateCartItemInput>>;
};

export type ReconcileCartsInput = {
    anonymousCartId: Scalars["ID"];
    cartToken: Scalars["String"];
    clientMutationId?: InputMaybe<Scalars["String"]>;
    mode?: InputMaybe<CartReconciliationMode>;
    shopId: Scalars["ID"];
};

export type SetEmailOnAnonymousCartInput = {
    cartId: Scalars["ID"];
    cartToken: Scalars["String"];
    clientMutationId?: InputMaybe<Scalars["String"]>;
    email: Scalars["String"];
};

export type IncorrectPriceFailureDetails = {
    __typename?: "IncorrectPriceFailureDetails";
    currentPrice: Money;
    productConfiguration: ProductConfiguration;
    providedPrice: Money;
};

export type MinOrderQuantityFailureDetails = {
    __typename?: "MinOrderQuantityFailureDetails";
    minOrderQuantity: Scalars["Int"];
    productConfiguration: ProductConfiguration;
    quantity: Scalars["Int"];
};

export type CreateCartPayload = {
    __typename?: "CreateCartPayload";
    cart?: Maybe<Cart>;
    clientMutationId?: Maybe<Scalars["String"]>;
    incorrectPriceFailures: Array<Maybe<IncorrectPriceFailureDetails>>;
    minOrderQuantityFailures: Array<Maybe<MinOrderQuantityFailureDetails>>;
    token?: Maybe<Scalars["String"]>;
};

export type AddCartItemsPayload = {
    __typename?: "AddCartItemsPayload";
    cart?: Maybe<Cart>;
    clientMutationId?: Maybe<Scalars["String"]>;
    incorrectPriceFailures: Array<Maybe<IncorrectPriceFailureDetails>>;
    minOrderQuantityFailures: Array<Maybe<MinOrderQuantityFailureDetails>>;
};

export type RemoveCartItemsPayload = {
    __typename?: "RemoveCartItemsPayload";
    cart: Cart;
    clientMutationId?: Maybe<Scalars["String"]>;
};

export type UpdateCartItemsQuantityPayload = {
    __typename?: "UpdateCartItemsQuantityPayload";
    cart: Cart;
    clientMutationId?: Maybe<Scalars["String"]>;
};

export type ReconcileCartsPayload = {
    __typename?: "ReconcileCartsPayload";
    cart: Cart;
    clientMutationId?: Maybe<Scalars["String"]>;
};

export type SetEmailOnAnonymousCartPayload = {
    __typename?: "SetEmailOnAnonymousCartPayload";
    cart: Cart;
    clientMutationId?: Maybe<Scalars["String"]>;
};

export type FulfillmentData = {
    __typename?: "FulfillmentData";
    shippingAddress?: Maybe<Address>;
};

export type FulfillmentOption = {
    __typename?: "FulfillmentOption";
    fulfillmentMethod?: Maybe<FulfillmentMethod>;
    handlingPrice: Money;
    price: Money;
};

export type FulfillmentGroup = Node & {
    __typename?: "FulfillmentGroup";
    _id: Scalars["ID"];
    availableFulfillmentOptions: Array<Maybe<FulfillmentOption>>;
    data?: Maybe<FulfillmentData>;
    items: Array<Maybe<CartItem>>;
    selectedFulfillmentOption?: Maybe<FulfillmentOption>;
    shippingAddress?: Maybe<Address>;
    shop: Shop;
    type: FulfillmentType;
};

export type SetShippingAddressOnCartInput = {
    address: AddressInput;
    addressId?: InputMaybe<Scalars["String"]>;
    cartId: Scalars["ID"];
    cartToken?: InputMaybe<Scalars["String"]>;
    clientMutationId?: InputMaybe<Scalars["String"]>;
};

export type SetShippingAddressOnCartPayload = {
    __typename?: "SetShippingAddressOnCartPayload";
    cart: Cart;
    clientMutationId?: Maybe<Scalars["String"]>;
};

export type UpdateFulfillmentOptionsForGroupInput = {
    cartId: Scalars["ID"];
    cartToken?: InputMaybe<Scalars["String"]>;
    clientMutationId?: InputMaybe<Scalars["String"]>;
    fulfillmentGroupId: Scalars["ID"];
};

export type UpdateFulfillmentOptionsForGroupPayload = {
    __typename?: "UpdateFulfillmentOptionsForGroupPayload";
    cart: Cart;
    clientMutationId?: Maybe<Scalars["String"]>;
};

export type SelectFulfillmentOptionForGroupInput = {
    cartId: Scalars["ID"];
    cartToken?: InputMaybe<Scalars["String"]>;
    clientMutationId?: InputMaybe<Scalars["String"]>;
    fulfillmentGroupId: Scalars["ID"];
    fulfillmentMethodId: Scalars["ID"];
};

export type SelectFulfillmentOptionForGroupPayload = {
    __typename?: "SelectFulfillmentOptionForGroupPayload";
    cart: Cart;
    clientMutationId?: Maybe<Scalars["String"]>;
};

export type CartSummary = {
    __typename?: "CartSummary";
    discountTotal: Money;
    effectiveTaxRate?: Maybe<Rate>;
    fulfillmentTotal?: Maybe<Money>;
    itemTotal: Money;
    taxTotal?: Maybe<Money>;
    taxableAmount: Money;
    total: Money;
    surchargeTotal?: Maybe<Money>;
};

export type Checkout = {
    __typename?: "Checkout";
    fulfillmentGroups: Array<Maybe<FulfillmentGroup>>;
    summary: CartSummary;
};

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
    __typename?: "OrderConnection";
    edges?: Maybe<Array<Maybe<OrderEdge>>>;
    nodes?: Maybe<Array<Maybe<Order>>>;
    pageInfo: PageInfo;
    totalCount: Scalars["Int"];
};

export type OrdersByAccountIdConnection = {
    __typename?: "OrdersByAccountIdConnection";
    edges?: Maybe<Array<Maybe<OrdersByAccountIdEdge>>>;
    nodes?: Maybe<Array<Maybe<Order>>>;
    pageInfo: PageInfo;
    totalCount: Scalars["Int"];
};

export type OrderEdge = NodeEdge & {
    __typename?: "OrderEdge";
    cursor: Scalars["ConnectionCursor"];
    node?: Maybe<Order>;
};

export type OrdersByAccountIdEdge = NodeEdge & {
    __typename?: "OrdersByAccountIdEdge";
    cursor: Scalars["ConnectionCursor"];
    node?: Maybe<Order>;
};

export type OrderItemConnection = {
    __typename?: "OrderItemConnection";
    edges?: Maybe<Array<Maybe<OrderItemEdge>>>;
    nodes?: Maybe<Array<Maybe<OrderItem>>>;
    pageInfo: PageInfo;
    totalCount: Scalars["Int"];
};

export type OrderItemEdge = NodeEdge & {
    __typename?: "OrderItemEdge";
    cursor: Scalars["ConnectionCursor"];
    node?: Maybe<OrderItem>;
};

export type OrderItemAttribute = {
    __typename?: "OrderItemAttribute";
    label?: Maybe<Scalars["String"]>;
    value?: Maybe<Scalars["String"]>;
};

export type OrderSummary = {
    __typename?: "OrderSummary";
    discountTotal: Money;
    effectiveTaxRate: Rate;
    fulfillmentTotal: Money;
    itemTotal: Money;
    taxTotal: Money;
    taxableAmount: Money;
    total: Money;
    surchargeTotal?: Maybe<Money>;
};

export type OrderItem = Node & {
    __typename?: "OrderItem";
    _id: Scalars["ID"];
    addedAt?: Maybe<Scalars["DateTime"]>;
    attributes?: Maybe<Array<Maybe<OrderItemAttribute>>>;
    cancelReason?: Maybe<Scalars["String"]>;
    createdAt: Scalars["DateTime"];
    imageURLs?: Maybe<ImageSizes>;
    metafields?: Maybe<Array<Maybe<Metafield>>>;
    optionTitle?: Maybe<Scalars["String"]>;
    parcel?: Maybe<ShippingParcel>;
    price: Money;
    productConfiguration: ProductConfiguration;
    productSlug?: Maybe<Scalars["String"]>;
    productTags?: Maybe<TagConnection>;
    productType?: Maybe<Scalars["String"]>;
    productVendor?: Maybe<Scalars["String"]>;
    quantity: Scalars["Int"];
    shop: Shop;
    status: Scalars["String"];
    subtotal: Money;
    title: Scalars["String"];
    updatedAt: Scalars["DateTime"];
    variantTitle?: Maybe<Scalars["String"]>;
    isTaxable: Scalars["Boolean"];
    tax: Money;
    taxCode?: Maybe<Scalars["String"]>;
    taxableAmount: Money;
    taxes: Array<Maybe<CalculatedTax>>;
};

export type OrderItemProductTagsArgs = {
    after?: InputMaybe<Scalars["ConnectionCursor"]>;
    before?: InputMaybe<Scalars["ConnectionCursor"]>;
    first?: InputMaybe<Scalars["ConnectionLimitInt"]>;
    last?: InputMaybe<Scalars["ConnectionLimitInt"]>;
    offset?: InputMaybe<Scalars["Int"]>;
    sortOrder?: InputMaybe<SortOrder>;
    sortBy?: InputMaybe<TagSortByField>;
};

export type ShippingOrderFulfillmentGroupData = {
    __typename?: "ShippingOrderFulfillmentGroupData";
    shippingAddress: Address;
};

export type OrderFulfillmentGroupData = ShippingOrderFulfillmentGroupData;

export type OrderFulfillmentGroup = Node & {
    __typename?: "OrderFulfillmentGroup";
    _id: Scalars["ID"];
    data?: Maybe<OrderFulfillmentGroupData>;
    displayStatus: Scalars["String"];
    items?: Maybe<OrderItemConnection>;
    selectedFulfillmentOption: FulfillmentOption;
    shippingLabelUrl?: Maybe<Scalars["String"]>;
    shop: Shop;
    status: Scalars["String"];
    summary: OrderSummary;
    totalItemQuantity: Scalars["Int"];
    tracking?: Maybe<Scalars["String"]>;
    trackingUrl?: Maybe<Scalars["String"]>;
    type: FulfillmentType;
    taxSummary?: Maybe<TaxSummary>;
};

export type OrderFulfillmentGroupDisplayStatusArgs = {
    language: Scalars["String"];
};

export type OrderFulfillmentGroupItemsArgs = {
    after?: InputMaybe<Scalars["ConnectionCursor"]>;
    before?: InputMaybe<Scalars["ConnectionCursor"]>;
    first?: InputMaybe<Scalars["ConnectionLimitInt"]>;
    last?: InputMaybe<Scalars["ConnectionLimitInt"]>;
    offset?: InputMaybe<Scalars["Int"]>;
    sortOrder?: InputMaybe<SortOrder>;
    sortBy?: InputMaybe<OrderFulfillmentGroupItemsSortByField>;
};

export type Order = Node & {
    __typename?: "Order";
    _id: Scalars["ID"];
    account?: Maybe<Account>;
    billingName?: Maybe<Scalars["String"]>;
    cartId?: Maybe<Scalars["ID"]>;
    createdAt: Scalars["DateTime"];
    displayStatus: Scalars["String"];
    email?: Maybe<Scalars["String"]>;
    fulfillmentGroups: Array<Maybe<OrderFulfillmentGroup>>;
    notes: Array<Maybe<OrderNote>>;
    payments?: Maybe<Array<Maybe<Payment>>>;
    referenceId: Scalars["String"];
    refunds?: Maybe<Array<Maybe<Refund>>>;
    shop: Shop;
    status: Scalars["String"];
    summary: OrderSummary;
    totalItemQuantity: Scalars["Int"];
    updatedAt: Scalars["DateTime"];
    surcharges: Array<Maybe<AppliedSurcharge>>;
};

export type OrderDisplayStatusArgs = {
    language: Scalars["String"];
};

export type OrderNote = {
    __typename?: "OrderNote";
    account: Account;
    content: Scalars["String"];
    createdAt: Scalars["DateTime"];
    updatedAt: Scalars["DateTime"];
};

export type Refund = Node & {
    __typename?: "Refund";
    _id: Scalars["ID"];
    amount: Money;
    createdAt: Scalars["DateTime"];
    paymentDisplayName: Scalars["String"];
    paymentId: Scalars["ID"];
    reason?: Maybe<Scalars["String"]>;
};

export type OrderFulfillmentGroupItemInput = {
    addedAt?: InputMaybe<Scalars["DateTime"]>;
    price: Scalars["Float"];
    productConfiguration: ProductConfigurationInput;
    quantity: Scalars["Int"];
};

export type OrderFulfillmentGroupDataInput = {
    shippingAddress?: InputMaybe<AddressInput>;
};

export type OrderFulfillmentGroupInput = {
    data?: InputMaybe<OrderFulfillmentGroupDataInput>;
    items: Array<InputMaybe<OrderFulfillmentGroupItemInput>>;
    selectedFulfillmentMethodId: Scalars["ID"];
    shopId: Scalars["ID"];
    totalPrice?: InputMaybe<Scalars["Float"]>;
    type: FulfillmentType;
};

export type OrderFulfillmentGroupExistingOrderInput = {
    data?: InputMaybe<OrderFulfillmentGroupDataInput>;
    items?: InputMaybe<Array<InputMaybe<OrderFulfillmentGroupItemInput>>>;
    selectedFulfillmentMethodId: Scalars["ID"];
    shopId: Scalars["ID"];
    totalPrice?: InputMaybe<Scalars["Float"]>;
    type: FulfillmentType;
};

export type OrderInput = {
    cartId?: InputMaybe<Scalars["String"]>;
    currencyCode: Scalars["String"];
    email: Scalars["String"];
    fulfillmentGroups: Array<InputMaybe<OrderFulfillmentGroupInput>>;
    shopId: Scalars["String"];
};

export type PaymentInput = {
    amount: Scalars["Float"];
    billingAddress?: InputMaybe<AddressInput>;
    data?: InputMaybe<Scalars["JSONObject"]>;
    method: PaymentMethodName;
};

export type AddOrderFulfillmentGroupInput = {
    clientMutationId?: InputMaybe<Scalars["String"]>;
    fulfillmentGroup: OrderFulfillmentGroupExistingOrderInput;
    moveItemIds?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
    orderId: Scalars["ID"];
};

export type CancelOrderItemInput = {
    cancelQuantity: Scalars["Int"];
    clientMutationId?: InputMaybe<Scalars["String"]>;
    itemId: Scalars["ID"];
    orderId: Scalars["ID"];
    reason?: InputMaybe<Scalars["String"]>;
};

export type CreateRefundInput = {
    amount: Scalars["Float"];
    orderId: Scalars["ID"];
    paymentId: Scalars["ID"];
    reason?: InputMaybe<Scalars["String"]>;
};

export type PlaceOrderInput = {
    clientMutationId?: InputMaybe<Scalars["String"]>;
    order: OrderInput;
    payments?: InputMaybe<Array<InputMaybe<PaymentInput>>>;
};

export type MoveOrderItemsInput = {
    clientMutationId?: InputMaybe<Scalars["String"]>;
    fromFulfillmentGroupId: Scalars["ID"];
    itemIds: Array<InputMaybe<Scalars["ID"]>>;
    orderId: Scalars["ID"];
    toFulfillmentGroupId: Scalars["ID"];
};

export type SplitOrderItemInput = {
    clientMutationId?: InputMaybe<Scalars["String"]>;
    itemId: Scalars["ID"];
    newItemQuantity: Scalars["Int"];
    orderId: Scalars["ID"];
};

export type UpdateOrderInput = {
    clientMutationId?: InputMaybe<Scalars["String"]>;
    email?: InputMaybe<Scalars["String"]>;
    orderId: Scalars["ID"];
    status?: InputMaybe<Scalars["String"]>;
};

export type UpdateOrderFulfillmentGroupInput = {
    clientMutationId?: InputMaybe<Scalars["String"]>;
    orderFulfillmentGroupId: Scalars["ID"];
    orderId: Scalars["ID"];
    status?: InputMaybe<Scalars["String"]>;
    tracking?: InputMaybe<Scalars["String"]>;
    trackingUrl?: InputMaybe<Scalars["String"]>;
};

export type AddOrderFulfillmentGroupPayload = {
    __typename?: "AddOrderFulfillmentGroupPayload";
    clientMutationId?: Maybe<Scalars["String"]>;
    newFulfillmentGroupId: Scalars["ID"];
    order: Order;
};

export type CancelOrderItemPayload = {
    __typename?: "CancelOrderItemPayload";
    clientMutationId?: Maybe<Scalars["String"]>;
    order: Order;
};

export type CreateRefundPayload = {
    __typename?: "CreateRefundPayload";
    clientMutationId?: Maybe<Scalars["String"]>;
    order: Order;
};

export type MoveOrderItemsPayload = {
    __typename?: "MoveOrderItemsPayload";
    clientMutationId?: Maybe<Scalars["String"]>;
    order: Order;
};

export type PlaceOrderPayload = {
    __typename?: "PlaceOrderPayload";
    clientMutationId?: Maybe<Scalars["String"]>;
    orders: Array<Maybe<Order>>;
    token?: Maybe<Scalars["String"]>;
};

export type SplitOrderItemPayload = {
    __typename?: "SplitOrderItemPayload";
    clientMutationId?: Maybe<Scalars["String"]>;
    newItemId: Scalars["ID"];
    order: Order;
};

export type UpdateOrderPayload = {
    __typename?: "UpdateOrderPayload";
    clientMutationId?: Maybe<Scalars["String"]>;
    order: Order;
};

export type UpdateOrderFulfillmentGroupPayload = {
    __typename?: "UpdateOrderFulfillmentGroupPayload";
    clientMutationId?: Maybe<Scalars["String"]>;
    order: Order;
};

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
    gte?: InputMaybe<Scalars["DateTime"]>;
    lte?: InputMaybe<Scalars["DateTime"]>;
};

export type OrderFilterInput = {
    createdAt?: InputMaybe<CreatedAtInput>;
    fulfillmentStatus?: InputMaybe<Array<InputMaybe<OrderFulfillmentStatus>>>;
    paymentStatus?: InputMaybe<Array<InputMaybe<OrderPaymentStatus>>>;
    searchField?: InputMaybe<Scalars["String"]>;
    status?: InputMaybe<OrderStatus>;
};

export type Payment = Node & {
    __typename?: "Payment";
    _id: Scalars["ID"];
    amount: Money;
    billingAddress?: Maybe<Address>;
    captureErrorCode?: Maybe<Scalars["String"]>;
    captureErrorMessage?: Maybe<Scalars["String"]>;
    cardBrand?: Maybe<Scalars["String"]>;
    createdAt: Scalars["DateTime"];
    data?: Maybe<PaymentData>;
    displayName: Scalars["String"];
    isAuthorizationCanceled: Scalars["Boolean"];
    isCaptured: Scalars["Boolean"];
    method: PaymentMethod;
    mode?: Maybe<Scalars["String"]>;
    processor?: Maybe<Scalars["String"]>;
    refunds?: Maybe<Array<Maybe<Refund>>>;
    riskLevel?: Maybe<RiskLevel>;
    status: PaymentStatus;
    transactionId?: Maybe<Scalars["String"]>;
};

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

export type PaymentData = FakeData | ExampleIouPaymentData | PaypalPaymentData;

export enum PaymentMethodName {
    Paypal = "paypal",
    IouExample = "iou_example",
    None = "none"
}

export type PaymentMethodData = FakeData | ExampleIouPaymentMethodData;

export type PaymentMethod = {
    __typename?: "PaymentMethod";
    canRefund: Scalars["Boolean"];
    data?: Maybe<PaymentMethodData>;
    displayName: Scalars["String"];
    isEnabled: Scalars["Boolean"];
    name: Scalars["String"];
    pluginName: Scalars["String"];
};

export type EnablePaymentMethodForShopInput = {
    clientMutationId?: InputMaybe<Scalars["String"]>;
    isEnabled: Scalars["Boolean"];
    paymentMethodName: Scalars["String"];
    shopId: Scalars["ID"];
};

export type EnablePaymentMethodForShopPayload = {
    __typename?: "EnablePaymentMethodForShopPayload";
    clientMutationId?: Maybe<Scalars["String"]>;
    paymentMethods: Array<Maybe<PaymentMethod>>;
};

export type ApproveOrderPaymentsInput = {
    clientMutationId?: InputMaybe<Scalars["String"]>;
    orderId: Scalars["ID"];
    paymentIds: Array<InputMaybe<Scalars["ID"]>>;
    shopId: Scalars["ID"];
};

export type ApproveOrderPaymentsPayload = {
    __typename?: "ApproveOrderPaymentsPayload";
    clientMutationId?: Maybe<Scalars["String"]>;
    order: Order;
};

export type CaptureOrderPaymentsInput = {
    clientMutationId?: InputMaybe<Scalars["String"]>;
    orderId: Scalars["ID"];
    paymentIds: Array<InputMaybe<Scalars["ID"]>>;
    shopId: Scalars["ID"];
};

export type CaptureOrderPaymentsPayload = {
    __typename?: "CaptureOrderPaymentsPayload";
    clientMutationId?: Maybe<Scalars["String"]>;
    order: Order;
};

export type ExampleIouPaymentData = {
    __typename?: "ExampleIOUPaymentData";
    fullName: Scalars["String"];
};

export type ExampleIouPaymentMethodData = {
    __typename?: "ExampleIOUPaymentMethodData";
    example: Scalars["String"];
};

export type DiscountCode = {
    __typename?: "DiscountCode";
    _id: Scalars["ID"];
    calculation?: Maybe<DiscountCalculation>;
    code: Scalars["String"];
    conditions?: Maybe<DiscountConditions>;
    description?: Maybe<Scalars["String"]>;
    discount?: Maybe<Scalars["String"]>;
    discountMethod?: Maybe<DiscountMethod>;
    label?: Maybe<Scalars["String"]>;
    shop: Shop;
    transactions?: Maybe<Array<Maybe<DiscountTransaction>>>;
};

export type DiscountTransaction = {
    __typename?: "DiscountTransaction";
    appliedAt?: Maybe<Scalars["DateTime"]>;
    cartId: Scalars["String"];
    userId: Scalars["String"];
};

export type DiscountConditionOrder = {
    __typename?: "DiscountConditionOrder";
    endDate?: Maybe<Scalars["DateTime"]>;
    max?: Maybe<Scalars["Float"]>;
    min: Scalars["Float"];
    startDate?: Maybe<Scalars["DateTime"]>;
};

export type DiscountConditions = {
    __typename?: "DiscountConditions";
    accountLimit?: Maybe<Scalars["Int"]>;
    audience?: Maybe<Array<Maybe<Scalars["String"]>>>;
    enabled: Scalars["Boolean"];
    order?: Maybe<DiscountConditionOrder>;
    permissions?: Maybe<Array<Maybe<Scalars["String"]>>>;
    products?: Maybe<Array<Maybe<Scalars["String"]>>>;
    redemptionLimit?: Maybe<Scalars["Int"]>;
    tags?: Maybe<Array<Maybe<Scalars["String"]>>>;
};

export type DiscountCalculation = {
    __typename?: "DiscountCalculation";
    method?: Maybe<DiscountCalculationMethod>;
};

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
    cartId: Scalars["ID"];
    discountCode: Scalars["String"];
    shopId: Scalars["ID"];
    token?: InputMaybe<Scalars["String"]>;
};

export type RemoveDiscountCodeFromCartInput = {
    cartId: Scalars["ID"];
    discountId: Scalars["ID"];
    shopId: Scalars["ID"];
    token?: InputMaybe<Scalars["String"]>;
};

export type DiscountCodeFilterInput = {
    searchField?: InputMaybe<Scalars["String"]>;
};

export type ApplyDiscountCodeToCartPayload = {
    __typename?: "ApplyDiscountCodeToCartPayload";
    cart: Cart;
    clientMutationId?: Maybe<Scalars["String"]>;
};

export type RemoveDiscountCodeFromCartPayload = {
    __typename?: "RemoveDiscountCodeFromCartPayload";
    cart: Cart;
    clientMutationId?: Maybe<Scalars["String"]>;
};

export type DiscountCodeEdge = {
    __typename?: "DiscountCodeEdge";
    cursor: Scalars["ConnectionCursor"];
    node?: Maybe<DiscountCode>;
};

export type DiscountCodeConnection = {
    __typename?: "DiscountCodeConnection";
    edges?: Maybe<Array<Maybe<DiscountCodeEdge>>>;
    nodes?: Maybe<Array<Maybe<DiscountCode>>>;
    pageInfo: PageInfo;
    totalCount: Scalars["Int"];
};

export type DiscountCalculationInput = {
    method?: InputMaybe<DiscountCalculationMethod>;
};

export type DiscountCodeInput = {
    calculation?: InputMaybe<DiscountCalculationInput>;
    code: Scalars["String"];
    conditions?: InputMaybe<DiscountConditionsInput>;
    description?: InputMaybe<Scalars["String"]>;
    discount?: InputMaybe<Scalars["String"]>;
    discountMethod?: InputMaybe<DiscountMethod>;
    label?: InputMaybe<Scalars["String"]>;
    transactions?: InputMaybe<Array<InputMaybe<DiscountTransactionInput>>>;
};

export type DiscountTransactionInput = {
    appliedAt?: InputMaybe<Scalars["DateTime"]>;
    cartId: Scalars["String"];
    userId: Scalars["String"];
};

export type DiscountConditionOrderInput = {
    endDate?: InputMaybe<Scalars["DateTime"]>;
    max?: InputMaybe<Scalars["Float"]>;
    min: Scalars["Float"];
    startDate?: InputMaybe<Scalars["DateTime"]>;
};

export type DiscountConditionsInput = {
    accountLimit?: InputMaybe<Scalars["Int"]>;
    audience?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
    enabled: Scalars["Boolean"];
    order?: InputMaybe<DiscountConditionOrderInput>;
    permissions?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
    products?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
    redemptionLimit?: InputMaybe<Scalars["Int"]>;
    tags?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type CreateDiscountCodeInput = {
    clientMutationId?: InputMaybe<Scalars["String"]>;
    discountCode?: InputMaybe<DiscountCodeInput>;
    shopId: Scalars["ID"];
};

export type CreateDiscountCodePayload = {
    __typename?: "CreateDiscountCodePayload";
    clientMutationId?: Maybe<Scalars["String"]>;
    discountCode?: Maybe<DiscountCode>;
};

export type UpdateDiscountCodeInput = {
    clientMutationId?: InputMaybe<Scalars["String"]>;
    discountCode?: InputMaybe<DiscountCodeInput>;
    discountCodeId: Scalars["ID"];
    shopId: Scalars["ID"];
};

export type UpdateDiscountCodePayload = {
    __typename?: "UpdateDiscountCodePayload";
    clientMutationId?: Maybe<Scalars["String"]>;
    discountCode?: Maybe<DiscountCode>;
};

export type DeleteDiscountCodeInput = {
    clientMutationId?: InputMaybe<Scalars["String"]>;
    discountCodeId: Scalars["ID"];
    shopId: Scalars["ID"];
};

export type DeleteDiscountCodePayload = {
    __typename?: "DeleteDiscountCodePayload";
    clientMutationId?: Maybe<Scalars["String"]>;
    discountCode?: Maybe<DiscountCode>;
};

export enum SurchargePropertyType {
    Bool = "bool",
    Float = "float",
    Int = "int",
    String = "string"
}

export type AppliedSurcharge = Node & {
    __typename?: "AppliedSurcharge";
    _id: Scalars["ID"];
    amount: Money;
    fulfillmentGroupId?: Maybe<Scalars["ID"]>;
    message?: Maybe<Scalars["String"]>;
    surchargeDefinitionId: Scalars["ID"];
};

export type AppliedSurchargeMessageArgs = {
    language: Scalars["String"];
};

export type Surcharge = Node & {
    __typename?: "Surcharge";
    _id: Scalars["ID"];
    amount: Money;
    attributes?: Maybe<Array<Maybe<SurchargeAttributeRestrictions>>>;
    createdAt: Scalars["DateTime"];
    destination?: Maybe<SurchargeDestinationRestrictions>;
    message: Scalars["String"];
    messagesByLanguage?: Maybe<Array<Maybe<SurchargeMessagesByLanguage>>>;
    methodIds?: Maybe<Array<Maybe<Scalars["ID"]>>>;
    shopId: Scalars["ID"];
    type: SurchargeTypeEnum;
    updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type SurchargeMessageArgs = {
    language: Scalars["String"];
};

export type SurchargeAttributeRestrictions = {
    __typename?: "SurchargeAttributeRestrictions";
    operator?: Maybe<Scalars["String"]>;
    property?: Maybe<Scalars["String"]>;
    propertyType?: Maybe<SurchargePropertyType>;
    value?: Maybe<Scalars["String"]>;
};

export type SurchargeConnection = {
    __typename?: "SurchargeConnection";
    edges?: Maybe<Array<Maybe<SurchargeEdge>>>;
    nodes?: Maybe<Array<Maybe<Surcharge>>>;
    pageInfo: PageInfo;
    totalCount: Scalars["Int"];
};

export type SurchargeDestinationRestrictions = {
    __typename?: "SurchargeDestinationRestrictions";
    country?: Maybe<Array<Maybe<Scalars["String"]>>>;
    postal?: Maybe<Array<Maybe<Scalars["String"]>>>;
    region?: Maybe<Array<Maybe<Scalars["String"]>>>;
};

export type SurchargeEdge = {
    __typename?: "SurchargeEdge";
    cursor: Scalars["ConnectionCursor"];
    node?: Maybe<Surcharge>;
};

export type SurchargeMessagesByLanguage = {
    __typename?: "SurchargeMessagesByLanguage";
    content: Scalars["String"];
    language: Scalars["String"];
};

export enum SurchargeSortByField {
    CreatedAt = "createdAt"
}

export enum SurchargeTypeEnum {
    Surcharge = "surcharge"
}

export type CreateSurchargeInput = {
    clientMutationId?: InputMaybe<Scalars["String"]>;
    shopId: Scalars["ID"];
    surcharge: SurchargeInput;
};

export type DeleteSurchargeInput = {
    clientMutationId?: InputMaybe<Scalars["String"]>;
    shopId: Scalars["ID"];
    surchargeId: Scalars["ID"];
};

export type MessagesByLanguageInput = {
    content: Scalars["String"];
    language: Scalars["String"];
};

export type SurchargeAttributeRestrictionsInput = {
    operator?: InputMaybe<Scalars["String"]>;
    property?: InputMaybe<Scalars["String"]>;
    propertyType?: InputMaybe<SurchargePropertyType>;
    value?: InputMaybe<Scalars["String"]>;
};

export type SurchargeDestinationRestrictionsInput = {
    country?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
    postal?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
    region?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type SurchargeInput = {
    amount: Scalars["Float"];
    attributes?: InputMaybe<Array<InputMaybe<SurchargeAttributeRestrictionsInput>>>;
    destination?: InputMaybe<SurchargeDestinationRestrictionsInput>;
    messagesByLanguage: Array<InputMaybe<MessagesByLanguageInput>>;
    methodIds?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
    type: SurchargeTypeEnum;
};

export type UpdateSurchargeInput = {
    clientMutationId?: InputMaybe<Scalars["String"]>;
    shopId: Scalars["ID"];
    surcharge: SurchargeInput;
    surchargeId: Scalars["ID"];
};

export type CreateSurchargePayload = {
    __typename?: "CreateSurchargePayload";
    clientMutationId?: Maybe<Scalars["String"]>;
    surcharge: Surcharge;
};

export type DeleteSurchargePayload = {
    __typename?: "DeleteSurchargePayload";
    clientMutationId?: Maybe<Scalars["String"]>;
    surcharge: Surcharge;
};

export type UpdateSurchargePayload = {
    __typename?: "UpdateSurchargePayload";
    clientMutationId?: Maybe<Scalars["String"]>;
    surcharge: Surcharge;
};

export type ShippingParcel = {
    __typename?: "ShippingParcel";
    containers?: Maybe<Scalars["String"]>;
    distanceUnit?: Maybe<DistanceUnit>;
    height?: Maybe<Scalars["Float"]>;
    length?: Maybe<Scalars["Float"]>;
    massUnit?: Maybe<MassUnit>;
    weight?: Maybe<Scalars["Float"]>;
    width?: Maybe<Scalars["Float"]>;
};

export enum FulfillmentType {
    Digital = "digital",
    Pickup = "pickup",
    Shipping = "shipping"
}

export type FulfillmentMethod = Node & {
    __typename?: "FulfillmentMethod";
    _id: Scalars["ID"];
    carrier?: Maybe<Scalars["String"]>;
    displayName: Scalars["String"];
    fulfillmentTypes: Array<Maybe<FulfillmentType>>;
    group?: Maybe<Scalars["String"]>;
    name: Scalars["String"];
};

export type FlatRateFulfillmentMethod = Node & {
    __typename?: "FlatRateFulfillmentMethod";
    _id: Scalars["ID"];
    cost?: Maybe<Scalars["Float"]>;
    fulfillmentTypes: Array<Maybe<FulfillmentType>>;
    group: Scalars["String"];
    handling: Scalars["Float"];
    isEnabled: Scalars["Boolean"];
    label: Scalars["String"];
    name: Scalars["String"];
    rate: Scalars["Float"];
    shop: Shop;
};

export type FlatRateFulfillmentMethodInput = {
    cost?: InputMaybe<Scalars["Float"]>;
    fulfillmentTypes: Array<InputMaybe<FulfillmentType>>;
    group: Scalars["String"];
    handling: Scalars["Float"];
    isEnabled: Scalars["Boolean"];
    label: Scalars["String"];
    name: Scalars["String"];
    rate: Scalars["Float"];
};

export type CreateFlatRateFulfillmentMethodInput = {
    clientMutationId?: InputMaybe<Scalars["String"]>;
    method: FlatRateFulfillmentMethodInput;
    shopId: Scalars["ID"];
};

export type UpdateFlatRateFulfillmentMethodInput = {
    clientMutationId?: InputMaybe<Scalars["String"]>;
    method: FlatRateFulfillmentMethodInput;
    methodId: Scalars["ID"];
    shopId: Scalars["ID"];
};

export type DeleteFlatRateFulfillmentMethodInput = {
    clientMutationId?: InputMaybe<Scalars["String"]>;
    methodId: Scalars["ID"];
    shopId: Scalars["ID"];
};

export type CreateFlatRateFulfillmentMethodPayload = {
    __typename?: "CreateFlatRateFulfillmentMethodPayload";
    clientMutationId?: Maybe<Scalars["String"]>;
    method: FlatRateFulfillmentMethod;
};

export type UpdateFlatRateFulfillmentMethodPayload = {
    __typename?: "UpdateFlatRateFulfillmentMethodPayload";
    clientMutationId?: Maybe<Scalars["String"]>;
    method: FlatRateFulfillmentMethod;
};

export type DeleteFlatRateFulfillmentMethodPayload = {
    __typename?: "DeleteFlatRateFulfillmentMethodPayload";
    clientMutationId?: Maybe<Scalars["String"]>;
    method: FlatRateFulfillmentMethod;
};

export type FlatRateFulfillmentMethodEdge = {
    __typename?: "FlatRateFulfillmentMethodEdge";
    cursor: Scalars["ConnectionCursor"];
    node?: Maybe<FlatRateFulfillmentMethod>;
};

export type FlatRateFulfillmentMethodConnection = {
    __typename?: "FlatRateFulfillmentMethodConnection";
    edges?: Maybe<Array<Maybe<FlatRateFulfillmentMethodEdge>>>;
    nodes?: Maybe<Array<Maybe<FlatRateFulfillmentMethod>>>;
    pageInfo: PageInfo;
    totalCount: Scalars["Int"];
};

export type AttributeRestrictions = {
    __typename?: "AttributeRestrictions";
    operator: Scalars["String"];
    property: Scalars["String"];
    propertyType: Scalars["String"];
    value: Scalars["String"];
};

export type DestinationRestrictions = {
    __typename?: "DestinationRestrictions";
    country?: Maybe<Array<Maybe<Scalars["String"]>>>;
    postal?: Maybe<Array<Maybe<Scalars["String"]>>>;
    region?: Maybe<Array<Maybe<Scalars["String"]>>>;
};

export enum RestrictionTypeEnum {
    Allow = "allow",
    Deny = "deny"
}

export enum FlatRateFulfillmentRestrictionSortByField {
    CreatedAt = "createdAt"
}

export type AttributeRestrictionsInput = {
    operator: Scalars["String"];
    property: Scalars["String"];
    propertyType: Scalars["String"];
    value: Scalars["String"];
};

export type DestinationRestrictionsInput = {
    country?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
    postal?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
    region?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type FlatRateFulfillmentRestrictionConnection = {
    __typename?: "FlatRateFulfillmentRestrictionConnection";
    edges?: Maybe<Array<Maybe<FlatRateFulfillmentRestrictionEdge>>>;
    nodes?: Maybe<Array<Maybe<FlatRateFulfillmentRestriction>>>;
    pageInfo: PageInfo;
    totalCount: Scalars["Int"];
};

export type FlatRateFulfillmentRestrictionEdge = {
    __typename?: "FlatRateFulfillmentRestrictionEdge";
    cursor: Scalars["ConnectionCursor"];
    node?: Maybe<FlatRateFulfillmentRestriction>;
};

export type FlatRateFulfillmentRestriction = Node & {
    __typename?: "FlatRateFulfillmentRestriction";
    _id: Scalars["ID"];
    attributes?: Maybe<Array<Maybe<AttributeRestrictions>>>;
    destination?: Maybe<DestinationRestrictions>;
    methodIds?: Maybe<Array<Maybe<Scalars["ID"]>>>;
    shopId: Scalars["ID"];
    type: RestrictionTypeEnum;
};

export type FlatRateFulfillmentRestrictionInput = {
    attributes?: InputMaybe<Array<InputMaybe<AttributeRestrictionsInput>>>;
    destination?: InputMaybe<DestinationRestrictionsInput>;
    methodIds?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
    type: RestrictionTypeEnum;
};

export type CreateFlatRateFulfillmentRestrictionInput = {
    clientMutationId?: InputMaybe<Scalars["String"]>;
    restriction: FlatRateFulfillmentRestrictionInput;
    shopId: Scalars["ID"];
};

export type CreateFlatRateFulfillmentRestrictionPayload = {
    __typename?: "CreateFlatRateFulfillmentRestrictionPayload";
    clientMutationId?: Maybe<Scalars["String"]>;
    restriction: FlatRateFulfillmentRestriction;
};

export type DeleteFlatRateFulfillmentRestrictionInput = {
    clientMutationId?: InputMaybe<Scalars["String"]>;
    restrictionId: Scalars["ID"];
    shopId: Scalars["ID"];
};

export type DeleteFlatRateFulfillmentRestrictionPayload = {
    __typename?: "DeleteFlatRateFulfillmentRestrictionPayload";
    clientMutationId?: Maybe<Scalars["String"]>;
    restriction: FlatRateFulfillmentRestriction;
};

export type UpdateFlatRateFulfillmentRestrictionInput = {
    clientMutationId?: InputMaybe<Scalars["String"]>;
    restriction: FlatRateFulfillmentRestrictionInput;
    restrictionId: Scalars["ID"];
    shopId: Scalars["ID"];
};

export type UpdateFlatRateFulfillmentRestrictionPayload = {
    __typename?: "UpdateFlatRateFulfillmentRestrictionPayload";
    clientMutationId?: Maybe<Scalars["String"]>;
    restriction: FlatRateFulfillmentRestriction;
};

export type TaxCode = {
    __typename?: "TaxCode";
    code: Scalars["String"];
    label: Scalars["String"];
};

export type TaxService = {
    __typename?: "TaxService";
    displayName: Scalars["String"];
    name: Scalars["String"];
    pluginName: Scalars["String"];
};

export enum TaxSource {
    Destination = "destination",
    Origin = "origin"
}

export type CalculatedTax = {
    __typename?: "CalculatedTax";
    _id: Scalars["ID"];
    jurisdictionId?: Maybe<Scalars["String"]>;
    sourcing: TaxSource;
    tax: Money;
    taxName: Scalars["String"];
    taxRate: Rate;
    taxableAmount: Money;
};

export type TaxSummary = {
    __typename?: "TaxSummary";
    calculatedAt: Scalars["DateTime"];
    calculatedByTaxServiceName?: Maybe<Scalars["String"]>;
    referenceId?: Maybe<Scalars["String"]>;
    tax: Money;
    taxableAmount: Money;
    taxes: Array<Maybe<CalculatedTax>>;
};

export type TaxRate = {
    __typename?: "TaxRate";
    _id: Scalars["ID"];
    country?: Maybe<Scalars["String"]>;
    postal?: Maybe<Scalars["String"]>;
    rate: Scalars["Float"];
    region?: Maybe<Scalars["String"]>;
    shop: Shop;
    sourcing: TaxSource;
    taxCode?: Maybe<Scalars["String"]>;
};

export type CreateTaxRateInput = {
    clientMutationId?: InputMaybe<Scalars["String"]>;
    country?: InputMaybe<Scalars["String"]>;
    postal?: InputMaybe<Scalars["String"]>;
    rate: Scalars["Float"];
    region?: InputMaybe<Scalars["String"]>;
    shopId: Scalars["ID"];
    sourcing?: InputMaybe<TaxSource>;
    taxCode?: InputMaybe<Scalars["String"]>;
};

export type CreateTaxRatePayload = {
    __typename?: "CreateTaxRatePayload";
    clientMutationId?: Maybe<Scalars["String"]>;
    taxRate: TaxRate;
};

export type UpdateTaxRateInput = {
    clientMutationId?: InputMaybe<Scalars["String"]>;
    country?: InputMaybe<Scalars["String"]>;
    postal?: InputMaybe<Scalars["String"]>;
    rate: Scalars["Float"];
    region?: InputMaybe<Scalars["String"]>;
    shopId: Scalars["ID"];
    sourcing?: InputMaybe<TaxSource>;
    taxCode?: InputMaybe<Scalars["String"]>;
    taxRateId: Scalars["ID"];
};

export type UpdateTaxRatePayload = {
    __typename?: "UpdateTaxRatePayload";
    clientMutationId?: Maybe<Scalars["String"]>;
    taxRate: TaxRate;
};

export type DeleteTaxRateInput = {
    clientMutationId?: InputMaybe<Scalars["String"]>;
    shopId: Scalars["ID"];
    taxRateId: Scalars["ID"];
};

export type DeleteTaxRatePayload = {
    __typename?: "DeleteTaxRatePayload";
    clientMutationId?: Maybe<Scalars["String"]>;
    taxRate: TaxRate;
};

export type TaxRateEdge = {
    __typename?: "TaxRateEdge";
    cursor: Scalars["ConnectionCursor"];
    node?: Maybe<TaxRate>;
};

export type TaxRateConnection = {
    __typename?: "TaxRateConnection";
    edges?: Maybe<Array<Maybe<TaxRateEdge>>>;
    nodes?: Maybe<Array<Maybe<TaxRate>>>;
    pageInfo: PageInfo;
    totalCount: Scalars["Int"];
};

export enum NavigationItemSortByField {
    Id = "_id",
    CreatedAt = "createdAt"
}

export type NavigationItemConnection = {
    __typename?: "NavigationItemConnection";
    edges?: Maybe<Array<Maybe<NavigationItemEdge>>>;
    nodes?: Maybe<Array<Maybe<NavigationItem>>>;
    pageInfo: PageInfo;
    totalCount: Scalars["Int"];
};

export type NavigationItemEdge = NodeEdge & {
    __typename?: "NavigationItemEdge";
    cursor: Scalars["ConnectionCursor"];
    node?: Maybe<NavigationItem>;
};

export type NavigationItem = Node & {
    __typename?: "NavigationItem";
    _id: Scalars["ID"];
    createdAt: Scalars["DateTime"];
    data?: Maybe<NavigationItemData>;
    draftData?: Maybe<NavigationItemData>;
    hasUnpublishedChanges?: Maybe<Scalars["Boolean"]>;
    metadata?: Maybe<Scalars["JSONObject"]>;
    shopId: Scalars["ID"];
};

export type NavigationItemData = {
    __typename?: "NavigationItemData";
    classNames?: Maybe<Scalars["String"]>;
    content?: Maybe<Array<Maybe<NavigationItemContent>>>;
    contentForLanguage?: Maybe<Scalars["String"]>;
    isUrlRelative?: Maybe<Scalars["Boolean"]>;
    shouldOpenInNewWindow?: Maybe<Scalars["Boolean"]>;
    url?: Maybe<Scalars["String"]>;
};

export type NavigationItemContent = {
    __typename?: "NavigationItemContent";
    language: Scalars["String"];
    value?: Maybe<Scalars["String"]>;
};

export type NavigationTree = Node & {
    __typename?: "NavigationTree";
    _id: Scalars["ID"];
    draftItems?: Maybe<Array<Maybe<NavigationTreeItem>>>;
    hasUnpublishedChanges?: Maybe<Scalars["Boolean"]>;
    items?: Maybe<Array<Maybe<NavigationTreeItem>>>;
    name: Scalars["String"];
    shopId: Scalars["ID"];
};

export type NavigationTreeItem = {
    __typename?: "NavigationTreeItem";
    expanded?: Maybe<Scalars["Boolean"]>;
    isPrivate?: Maybe<Scalars["Boolean"]>;
    isSecondary?: Maybe<Scalars["Boolean"]>;
    isVisible?: Maybe<Scalars["Boolean"]>;
    items?: Maybe<Array<Maybe<NavigationTreeItem>>>;
    navigationItem: NavigationItem;
};

export type CreateNavigationTreePayload = {
    __typename?: "CreateNavigationTreePayload";
    clientMutationId?: Maybe<Scalars["String"]>;
    navigationTree: NavigationTree;
};

export type CreateNavigationItemInput = {
    clientMutationId?: InputMaybe<Scalars["String"]>;
    navigationItem: NavigationItemInput;
};

export type UpdateNavigationItemInput = {
    clientMutationId?: InputMaybe<Scalars["String"]>;
    id: Scalars["ID"];
    navigationItem: NavigationItemInput;
    shopId: Scalars["ID"];
};

export type DeleteNavigationItemInput = {
    clientMutationId?: InputMaybe<Scalars["String"]>;
    id: Scalars["ID"];
    shopId: Scalars["ID"];
};

export type UpdateNavigationTreeInput = {
    clientMutationId?: InputMaybe<Scalars["String"]>;
    id: Scalars["ID"];
    navigationTree: NavigationTreeInput;
    shopId: Scalars["ID"];
};

export type PublishNavigationChangesInput = {
    clientMutationId?: InputMaybe<Scalars["String"]>;
    id: Scalars["ID"];
    shopId: Scalars["ID"];
};

export type NavigationItemInput = {
    draftData?: InputMaybe<NavigationItemDataInput>;
    metadata?: InputMaybe<Scalars["JSONObject"]>;
    shopId: Scalars["ID"];
};

export type NavigationItemDataInput = {
    classNames?: InputMaybe<Scalars["String"]>;
    content?: InputMaybe<Array<InputMaybe<NavigationItemContentInput>>>;
    isUrlRelative?: InputMaybe<Scalars["Boolean"]>;
    shouldOpenInNewWindow?: InputMaybe<Scalars["Boolean"]>;
    url?: InputMaybe<Scalars["String"]>;
};

export type NavigationItemContentInput = {
    language: Scalars["String"];
    value?: InputMaybe<Scalars["String"]>;
};

export type NavigationTreeInput = {
    draftItems?: InputMaybe<Array<InputMaybe<NavigationTreeItemInput>>>;
    name?: InputMaybe<Scalars["String"]>;
};

export type NavigationTreeItemInput = {
    expanded?: InputMaybe<Scalars["Boolean"]>;
    isPrivate?: InputMaybe<Scalars["Boolean"]>;
    isSecondary?: InputMaybe<Scalars["Boolean"]>;
    isVisible?: InputMaybe<Scalars["Boolean"]>;
    items?: InputMaybe<Array<InputMaybe<NavigationTreeItemInput>>>;
    navigationItemId: Scalars["ID"];
};

export type CreateNavigationTreeInput = {
    clientMutationId?: InputMaybe<Scalars["String"]>;
    draftItems?: InputMaybe<Array<InputMaybe<NavigationTreeItemInput>>>;
    name: Scalars["String"];
    shopId: Scalars["ID"];
};

export type CreateNavigationItemPayload = {
    __typename?: "CreateNavigationItemPayload";
    clientMutationId?: Maybe<Scalars["String"]>;
    navigationItem?: Maybe<NavigationItem>;
};

export type UpdateNavigationItemPayload = {
    __typename?: "UpdateNavigationItemPayload";
    clientMutationId?: Maybe<Scalars["String"]>;
    navigationItem?: Maybe<NavigationItem>;
};

export type DeleteNavigationItemPayload = {
    __typename?: "DeleteNavigationItemPayload";
    clientMutationId?: Maybe<Scalars["String"]>;
    navigationItem?: Maybe<NavigationItem>;
};

export type UpdateNavigationTreePayload = {
    __typename?: "UpdateNavigationTreePayload";
    clientMutationId?: Maybe<Scalars["String"]>;
    navigationTree?: Maybe<NavigationTree>;
};

export type PublishNavigationChangesPayload = {
    __typename?: "PublishNavigationChangesPayload";
    clientMutationId?: Maybe<Scalars["String"]>;
    navigationTree?: Maybe<NavigationTree>;
};

export type GenerateSitemapsInput = {
    clientMutationId?: InputMaybe<Scalars["String"]>;
    shopId: Scalars["ID"];
};

export type GenerateSitemapsPayload = {
    __typename?: "GenerateSitemapsPayload";
    clientMutationId?: Maybe<Scalars["String"]>;
    wasJobScheduled: Scalars["Boolean"];
};

export type Sitemap = {
    __typename?: "Sitemap";
    createdAt: Scalars["Date"];
    handle: Scalars["String"];
    shopId: Scalars["String"];
    xml: Scalars["String"];
};

export type PaypalPaymentData = {
    __typename?: "PaypalPaymentData";
    paymentID: Scalars["String"];
    paymentToken?: Maybe<Scalars["String"]>;
    payerID?: Maybe<Scalars["String"]>;
};

export type PaypalConfigClient = {
    __typename?: "PaypalConfigClient";
    mode: Scalars["String"];
    client_id: Scalars["String"];
};

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

export type ProductAssetMetadata = {
    owners?: Maybe<Array<Scalars["String"]>>;
    versionInfo?: Maybe<Scalars["String"]>;
    versionNotes?: Maybe<Scalars["String"]>;
    rating?: Maybe<Scalars["Int"]>;
    reviews?: Maybe<Array<Maybe<Review>>>;
    updateCycle?: Maybe<Scalars["String"]>;
    dataClassification?: Maybe<DataClassificationEnum>;
    themes?: Maybe<Array<ThemesEnum>>;
};

export type Review = {
    __typename?: "Review";
    creator?: Maybe<Scalars["String"]>;
};

export enum PriceModelType {
    Free = "free",
    Once = "once",
    Subscription = "subscription"
}

export type TimeRange = {
    __typename?: "TimeRange";
    from: Scalars["String"];
    to?: Maybe<Scalars["String"]>;
};

export type PriceModel = {
    __typename?: "PriceModel";
    type: PriceModelType;
    paymentPeriod?: Maybe<Scalars["String"]>;
    timeRange?: Maybe<TimeRange>;
    volume?: Maybe<Scalars["String"]>;
    quantity?: Maybe<Scalars["String"]>;
};

export type Distribution = {
    __typename?: "Distribution";
    title: Scalars["String"];
    description?: Maybe<Scalars["String"]>;
    accessUrl?: Maybe<Scalars["String"]>;
    format?: Maybe<Scalars["String"]>;
    size?: Maybe<Scalars["String"]>;
    mimeType?: Maybe<Scalars["String"]>;
    type?: Maybe<Scalars["String"]>;
    user?: Maybe<Scalars["String"]>;
    password?: Maybe<Scalars["String"]>;
    encryption?: Maybe<Scalars["String"]>;
    volume?: Maybe<Scalars["String"]>;
    modifiedAt?: Maybe<Scalars["String"]>;
    createdAt?: Maybe<Scalars["String"]>;
    language?: Maybe<Scalars["String"]>;
};

export enum DataQualityRange {
    High = "high",
    Low = "low",
    Medium = "medium"
}

export type DataQuality = {
    __typename?: "DataQuality";
    completeness?: Maybe<DataQualityRange>;
    accuracy?: Maybe<DataQualityRange>;
};

export type AssetMetadata = {
    distributions?: Maybe<Array<Maybe<Distribution>>>;
    dataQuality?: Maybe<DataQuality>;
    priceModel?: Maybe<PriceModel>;
};

export type DistributionInput = {
    title: Scalars["String"];
    description?: InputMaybe<Scalars["String"]>;
    accessUrl?: InputMaybe<Scalars["String"]>;
    format?: InputMaybe<Scalars["String"]>;
    size?: InputMaybe<Scalars["String"]>;
    mimeType?: InputMaybe<Scalars["String"]>;
    type?: InputMaybe<Scalars["String"]>;
    user?: InputMaybe<Scalars["String"]>;
    password?: InputMaybe<Scalars["String"]>;
    encryption?: InputMaybe<Scalars["String"]>;
    volume?: InputMaybe<Scalars["String"]>;
    modifiedAt?: InputMaybe<Scalars["String"]>;
    createdAt?: InputMaybe<Scalars["String"]>;
    language?: InputMaybe<Scalars["String"]>;
};

export type TimeRangeInput = {
    from: Scalars["String"];
    to?: InputMaybe<Scalars["String"]>;
};

export type PriceModelInput = {
    type: PriceModelType;
    paymentPeriod?: InputMaybe<Scalars["String"]>;
    timeRange?: InputMaybe<TimeRangeInput>;
    volume?: InputMaybe<Scalars["String"]>;
    quantity?: InputMaybe<Scalars["String"]>;
};

export type DataQualityInput = {
    completeness?: InputMaybe<DataQualityRange>;
    accuracy?: InputMaybe<DataQualityRange>;
};

export type Methods = {
    __typename?: "Methods";
    methods: Array<Maybe<DigitalFulfillmentMethod>>;
};

export type DigitalFulfillmentMethod = {
    __typename?: "DigitalFulfillmentMethod";
    _id: Scalars["ID"];
    cost?: Maybe<Scalars["Float"]>;
    fulfillmentTypes: Array<Maybe<FulfillmentType>>;
    group: Scalars["String"];
    handling: Scalars["Float"];
    isEnabled: Scalars["Boolean"];
    label: Scalars["String"];
    name: Scalars["String"];
    rate: Scalars["Float"];
};

export type DigitalFulfillmentMethodInput = {
    cost?: InputMaybe<Scalars["Float"]>;
    fulfillmentTypes: Array<InputMaybe<FulfillmentType>>;
    group: Scalars["String"];
    handling: Scalars["Float"];
    isEnabled: Scalars["Boolean"];
    label: Scalars["String"];
    name: Scalars["String"];
    rate: Scalars["Float"];
};

export type CreateDigitalFulfillmentMethodInput = {
    method: DigitalFulfillmentMethodInput;
    shopId: Scalars["ID"];
};

export type UpdateDigitalFulfillmentMethodInput = {
    method: DigitalFulfillmentMethodInput;
    methodId: Scalars["ID"];
    shopId: Scalars["ID"];
};

export type DeleteDigitalFulfillmentMethodInput = {
    methodId: Scalars["ID"];
    shopId: Scalars["ID"];
};

export type CreateDigitalFulfillmentMethodPayload = {
    __typename?: "CreateDigitalFulfillmentMethodPayload";
    method: DigitalFulfillmentMethod;
};

export type UpdateDigitalFulfillmentMethodPayload = {
    __typename?: "UpdateDigitalFulfillmentMethodPayload";
    method: DigitalFulfillmentMethod;
};

export type DeleteDigitalFulfillmentMethodPayload = {
    __typename?: "DeleteDigitalFulfillmentMethodPayload";
    method: DigitalFulfillmentMethod;
};

export type User = {
    __typename?: "User";
    id: Scalars["ID"];
    emails?: Maybe<Array<EmailRecord>>;
    username?: Maybe<Scalars["String"]>;
};

export type Tokens = {
    __typename?: "Tokens";
    refreshToken?: Maybe<Scalars["String"]>;
    accessToken?: Maybe<Scalars["String"]>;
};

export type LoginResult = {
    __typename?: "LoginResult";
    sessionId?: Maybe<Scalars["String"]>;
    tokens?: Maybe<Tokens>;
    user?: Maybe<User>;
};

export type CreateUserResult = {
    __typename?: "CreateUserResult";
    userId?: Maybe<Scalars["ID"]>;
    loginResult?: Maybe<LoginResult>;
};

export type TwoFactorSecretKey = {
    __typename?: "TwoFactorSecretKey";
    ascii?: Maybe<Scalars["String"]>;
    base32?: Maybe<Scalars["String"]>;
    hex?: Maybe<Scalars["String"]>;
    qr_code_ascii?: Maybe<Scalars["String"]>;
    qr_code_hex?: Maybe<Scalars["String"]>;
    qr_code_base32?: Maybe<Scalars["String"]>;
    google_auth_qr?: Maybe<Scalars["String"]>;
    otpauth_url?: Maybe<Scalars["String"]>;
};

export type TwoFactorSecretKeyInput = {
    ascii?: InputMaybe<Scalars["String"]>;
    base32?: InputMaybe<Scalars["String"]>;
    hex?: InputMaybe<Scalars["String"]>;
    qr_code_ascii?: InputMaybe<Scalars["String"]>;
    qr_code_hex?: InputMaybe<Scalars["String"]>;
    qr_code_base32?: InputMaybe<Scalars["String"]>;
    google_auth_qr?: InputMaybe<Scalars["String"]>;
    otpauth_url?: InputMaybe<Scalars["String"]>;
};

export type CreateUserInput = {
    username?: InputMaybe<Scalars["String"]>;
    email?: InputMaybe<Scalars["String"]>;
    password?: InputMaybe<Scalars["String"]>;
};

export type ImpersonateReturn = {
    __typename?: "ImpersonateReturn";
    authorized?: Maybe<Scalars["Boolean"]>;
    tokens?: Maybe<Tokens>;
    user?: Maybe<User>;
};

export type UserInput = {
    id?: InputMaybe<Scalars["ID"]>;
    email?: InputMaybe<Scalars["String"]>;
    username?: InputMaybe<Scalars["String"]>;
};

export type AuthenticateParamsInput = {
    access_token?: InputMaybe<Scalars["String"]>;
    access_token_secret?: InputMaybe<Scalars["String"]>;
    provider?: InputMaybe<Scalars["String"]>;
    password?: InputMaybe<Scalars["String"]>;
    user?: InputMaybe<UserInput>;
    code?: InputMaybe<Scalars["String"]>;
    token?: InputMaybe<Scalars["String"]>;
};

export type ImpersonationUserIdentityInput = {
    userId?: InputMaybe<Scalars["String"]>;
    username?: InputMaybe<Scalars["String"]>;
    email?: InputMaybe<Scalars["String"]>;
};

// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export type Pricing = {
    price: number
    maxPrice?: number
    minPrice?: number
    displayPrice: string
    compareAtPrice?: {
        amount?: number
        currency?: {
            code?: string
            scale?: number
            decimal?: number
        }
    }
    currency: Currency
}

export type Variant = {
    _id: string,
    index?: number
    title: string
    isLowQuantity?: boolean
    isSoldOut?: boolean
    inventoryInStock?: number
    pricing: Pricing
    variantId: string
    productId: string
}

export type Email = {
    address: string,
    verified: boolean
    provides?: string
}

export type TODO = unknown;

export type Setttings = TODO;

export type Endpoints = TODO;

export type BillingAddress = {
    _id: string;
    address1: string;
    address2?: string;
    city: string;
    company?: string;
    country: string;
    firstName?: string;
    fullName: string;
    isBillingDefault?: boolean;
    isCommercial: boolean;
    isShippingDefault?: boolean;
    lastName?: string;
    phone: string;
    postal: string;
    region: string;
};

export type Category = TODO;

export type Coupon = TODO;

export type Facet = TODO;

export type FacetSearchCriteria = TODO;

export type PasswordResetResult = TODO;

export enum FulfillmentTypes {
    digital = "digital"
}

export type ProductFilter = TODO;

export type ReviewItem = TODO;

export type UserBillingAddress = TODO;

export type UserBillingAddressItem = TODO;

export type UserBillingAddressSearchCriteria = TODO;

export type UserShippingAddress = TODO;

export type UserShippingAddressItem = TODO;

export type UserShippingAddressSearchCriteria = TODO;

export type ShippingAddress = TODO;

export type ShippingMethod = TODO;

export type ShippingProvider = TODO;

export type Wishlist = TODO;

export type WishlistItem = TODO;

export type Context = {
    client: Record<any, any>
    api: {
        url: string
    },
    config: {
        state: Record<any, any>
    }
}
