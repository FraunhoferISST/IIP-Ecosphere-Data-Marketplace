const pkg = require("./package.json");
const mutations = require("./src/mutations");
const queries = require("./src/queries");
const resolvers = require("./src/resolvers");
const defaultTemplates = require("./src/util/defaultTemplates");

const loadDefaultEntities = (context) => {
  for (const template of defaultTemplates) {
    context.collections.FieldsTemplates.replaceOne(
      { id: template.id },
      template,
      {
        upsert: true,
      }
    );
  }
};

function onStartup(context) {
  loadDefaultEntities(context);
  context.simpleSchemas.Shop.extend({
    imprint: {
      type: String,
      optional: true,
    },
  });
  context.simpleSchemas.CatalogProduct.extend({
    themes: {
      type: Array,
      optional: true,
    },
    "themes.$": String,
    images: {
      type: Array,
      optional: true,
    },
    "images.$": String,
    dataClassification: {
      type: String,
      optional: true,
    },
    owners: {
      type: Array,
      optional: true,
    },
    "owners.$": {
      type: Object,
      blackbox: true,
    },
    accessAccounts: {
      type: Array,
      optional: true,
    },
    "accessAccounts.$": {
      type: String,
      optional: true,
    },
    isPrivate: {
      type: Boolean,
      optional: true,
    },
    accessMode: {
      type: String,
      optional: true,
    },
  });
  context.simpleSchemas.Product.extend({
    themes: {
      type: Array,
      optional: true,
    },
    "themes.$": String,
    images: {
      type: Array,
      optional: true,
    },
    "images.$": String,
    dataClassification: {
      type: String,
      optional: true,
    },
    owners: {
      type: Array,
      optional: true,
    },
    "owners.$": {
      type: Object,
      blackbox: true,
    },
    accessAccounts: {
      type: Array,
      optional: true,
    },
    "accessAccounts.$": {
      type: String,
      optional: true,
    },
    isPrivate: {
      type: Boolean,
      optional: true,
    },
    accessMode: {
      type: String,
      optional: true,
    },
  });
  context.simpleSchemas.ProductVariant.extend({
    dataQuality: {
      type: Object,
      optional: true,
    },
    distributions: {
      type: Array,
      optional: true,
    },
    "distributions.$": {
      type: Object,
      blackbox: true,
    },
    templatesFields: {
      type: Object,
      blackbox: true,
      optional: true,
    },
    priceModel: {
      type: Object,
      blackbox: true,
      optional: true,
    },
    versionInfo: {
      type: String,
      optional: true,
    },
    versionNotes: {
      type: String,
      optional: true,
    },
    updateCycle: {
      type: String,
      optional: true,
    },
    assetType: {
      type: String,
      optional: true,
    },
    templates: {
      type: Array,
      optional: true,
    },
    "templates.$": String,
    images: {
      type: Array,
      optional: true,
    },
    "images.$": String,
  });
  context.simpleSchemas.CatalogProductVariant.extend({
    images: {
      type: Array,
      optional: true,
    },
    "images.$": String,
    dataQuality: {
      type: Object,
      optional: true,
    },
    distributions: {
      type: Array,
      optional: true,
    },
    "distributions.$": {
      type: Object,
      blackbox: true,
    },
    priceModel: {
      type: Object,
      blackbox: true,
      optional: true,
    },
    versionInfo: {
      type: String,
      optional: true,
    },
    versionNotes: {
      type: String,
      optional: true,
    },
    updateCycle: {
      type: String,
      optional: true,
    },
    assetType: {
      type: String,
      optional: true,
    },
    templates: {
      type: Array,
      optional: true,
    },
    "templates.$": String,
    templatesFields: {
      type: Object,
      optional: true,
      blackbox: true,
    },
  });
  context.simpleSchemas.Cart.extend({
    paymentMethod: {
      type: Object,
      optional: true,
      blackbox: true,
    },
  });
}

const publishProductToCatalog = (
  catalogProduct,
  { context, product, shop, variants }
) => {
  for (const [index, catalogVariant] of (
    catalogProduct.variants ?? []
  ).entries()) {
    const {
      priceModel = {},
      distributions = [],
      dataQuality = {},
      versionInfo,
      versionNotes,
      updateCycle,
      assetType,
      templates = [],
      templatesFields = {},
      images = [],
    } = variants.find((v) => v._id === catalogVariant._id);
    catalogProduct.owners = product.owners;
    catalogProduct.themes = product.themes;
    catalogProduct.images = product.images;
    catalogProduct.dataClassification = product.dataClassification;
    catalogProduct.accessAccounts = product.accessAccounts;
    catalogProduct.isPrivate = product.isPrivate;
    catalogProduct.accessMode = product.accessMode;
    catalogProduct.variants.splice(index, 1, {
      ...catalogVariant,
      priceModel,
      distributions,
      dataQuality,
      versionNotes,
      versionInfo,
      updateCycle,
      assetType,
      templates,
      templatesFields,
      images,
    });
  }
};

module.exports = async (app) => {
  const { default: importAsString } = await import(
    "@reactioncommerce/api-utils/importAsString.js"
  );
  const productVariantSchema = importAsString(
    "./src/schemas/productVariantSchema.gql"
  );
  const productSchema = importAsString("./src/schemas/productSchema.gql");
  const templatesSchema = importAsString("./src/schemas/templates.gql");
  return app.registerPlugin({
    label: "digital-products",
    name: pkg.name,
    version: pkg.version,
    functionsByType: {
      startup: [onStartup],
      publishProductToCatalog: [publishProductToCatalog],
    },
    collections: {
      FieldsTemplates: {
        name: "FieldsTemplates",
      },
    },
    graphQL: {
      resolvers,
      schemas: [productSchema, productVariantSchema, templatesSchema],
    },
    mutations,
    queries,
  });
};
