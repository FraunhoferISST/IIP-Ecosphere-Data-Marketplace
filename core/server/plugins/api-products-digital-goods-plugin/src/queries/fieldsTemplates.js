module.exports = async (context, { searchQuery = {}, shopIds } = {}) => {
  const {
    collections: { FieldsTemplates },
  } = context;

  const finalQuery = {};

  if (shopIds) finalQuery.shopId = { $in: shopIds };

  const result = await FieldsTemplates.find().toArray();

  return {
    templates: result,
  };
};
