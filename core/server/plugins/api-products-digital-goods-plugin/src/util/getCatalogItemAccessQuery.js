const getAccessQuery = (context, shopIds, accountEmail) => {
  const accountIsShopAdmin = context.account?.adminUIShopIds?.includes(
    shopIds[0]
  );
  if (accountIsShopAdmin) {
    return {};
  }
  if (!accountEmail) {
    return {
      "product.isPrivate": {
        $ne: true,
      },
    };
  }
  return {
    $or: [
      {
        "product.isPrivate": {
          $ne: true,
        },
      },
      {
        "product.isPrivate": true,
        "product.accessMode": "allow",
        "product.accessAccounts": accountEmail,
      },
      {
        "product.isPrivate": true,
        "product.accessMode": "restrict",
        "product.accessAccounts": { $ne: accountEmail },
      },
    ],
  };
};

module.exports = {
  getAccessQuery,
};
