const { decodeCursor, encodeCursor } = require("../../../../utils/cursor");
const { getAccountEmail } = require("../util/getAccountEmail");
const { getAccessQuery } = require("../util/getCatalogItemAccessQuery");

const createNextPageQuery = (createdAt) => ({
  createdAt: { $lt: new Date(createdAt) },
});
const createNextCursor = async (currentDoc, collection, finalQuery) => {
  const nextDoc = await collection.findOne(
    {
      ...finalQuery,
      createdAt: { $lt: currentDoc.createdAt },
    },
    { $sort: { createdAt: -1 } }
  );
  return nextDoc
    ? encodeCursor(`${currentDoc.createdAt.toISOString()}`)
    : undefined;
};

const hasOptions = (filter) => filter?.length > 0;
const createProductPriceQuery = (filters, currencyCode) => {
  const filter = {};
  if ("minPrice" in filters) {
    filter[`product.variants.pricing.${currencyCode}.price`] = {
      $gte: filters.minPrice,
    };
  }
  if ("maxPrice" in filters) {
    filter[`product.variants.pricing.${currencyCode}.price`] = {
      ...(filter[`product.variants.pricing.${currencyCode}.price`] ?? {}),
      $lte: filters.maxPrice,
    };
  }
  return filter;
};
const createFilterQuery = (filters, currencyCode) => {
  let filtersQuery = {};
  const filtersMap = {
    assetType: hasOptions(filters.assetType)
      ? {
          "product.variants.assetType": {
            $in: filters.assetType,
          },
        }
      : {},
    originCountry: hasOptions(filters.originCountry)
      ? {
          "product.originCountry": {
            $in: filters.originCountry,
          },
        }
      : {},
    priceModel: hasOptions(filters.priceModel)
      ? {
          "product.variants.priceModel.type": {
            $in: filters.priceModel,
          },
        }
      : {},
    themes: hasOptions(filters.themes)
      ? {
          "product.themes": {
            $in: filters.themes,
          },
        }
      : {},
    dataClassification: hasOptions(filters.dataClassification)
      ? {
          "product.dataClassification": {
            $in: filters.dataClassification,
          },
        }
      : {},
    option: hasOptions(filters.option)
      ? {
          "product.variants.attributeLabel": {
            $in: filters.option,
          },
        }
      : {},
    tax: hasOptions(filters.tax)
      ? {
          "product.variants.taxCode": {
            $in: filters.tax,
          },
        }
      : {},
    distributionType: hasOptions(filters.distributionType)
      ? {
          "product.variants.distributions.type": {
            $in: filters.distributionType,
          },
        }
      : {},
  };
  for (const f in filters) {
    filtersQuery = { ...filtersQuery, ...(filtersMap[f] ?? {}) };
  }
  return { ...filtersQuery, ...createProductPriceQuery(filters, currencyCode) };
};

const createVariantsFilterQuery = (filters, currencyCode) => {
  const filtersQuery = {
    $and: [],
  };
  const filtersMap = {
    assetType: hasOptions(filters.assetType)
      ? {
          $in: ["$$variant.assetType", filters.assetType],
        }
      : {},
    originCountry: hasOptions(filters.originCountry)
      ? {
          $in: ["$$variant.originCountry", filters.originCountry],
        }
      : {},
    priceModel: hasOptions(filters.priceModel)
      ? {
          $in: ["$$variant.priceModel.type", filters.priceModel],
        }
      : {},
    option: hasOptions(filters.option)
      ? {
          $in: ["$$variant.attributeLabel", filters.option],
        }
      : {},
    tax: hasOptions(filters.tax)
      ? {
          $in: ["$$variant.taxCode", filters.tax],
        }
      : {},
    /* distributionType: hasOptions(filters.distributionType)
      ? {
          $in: ["$$variant.distributions.type", filters.distributionType],
        }
      : {}, */
    maxPrice: {
      $lte: [`$$variant.pricing.${currencyCode}.price`, filters.maxPrice],
    },
    minPrice: {
      $gte: [`$$variant.pricing.${currencyCode}.price`, filters.minPrice],
    },
  };
  for (const f in filters) {
    filtersQuery.$and.push(filtersMap[f] ?? {});
  }
  return filtersQuery;
};

module.exports = async (
  context,
  { searchQuery = {}, shopIds, brokerInfo = "" } = {}
) => {
  const { collections } = context;
  const { Catalog, Shops } = collections;
  const pageSize = searchQuery.pageSize ?? 30;

  const accountEmail = await getAccountEmail(context, brokerInfo);

  if (!shopIds || shopIds.length === 0) {
    throw new Error(
      "invalid-param",
      "You must provide tagIds or shopIds or both"
    );
  }

  const shop = await Shops.findOne({ _id: shopIds[0] });
  const currencyCode = shop?.currency?.code ?? shop?.currency ?? "USD";

  const searchTextQuery = {
    $or: [
      {
        "product.description": {
          $regex: new RegExp(`${searchQuery?.query ?? ""}`, "i"),
        },
      },
      {
        "product.variants.title": {
          $regex: new RegExp(`${searchQuery?.query ?? ""}`, "i"),
        },
      },

      {
        "product._id": {
          $regex: new RegExp(`${searchQuery?.query ?? ""}`, "i"),
        },
      },

      {
        "product.variants._id": {
          $regex: new RegExp(`${searchQuery?.query ?? ""}`, "i"),
        },
      },

      {
        "product.variants.attributeLabel": {
          $regex: new RegExp(`${searchQuery?.query ?? ""}`, "i"),
        },
      },
      {
        "product.variants.optionTitle": {
          $regex: new RegExp(`${searchQuery?.query ?? ""}`, "i"),
        },
      },
    ],
  };

  const filterQuery = createFilterQuery(
    searchQuery.filters ?? {},
    currencyCode
  );
  const variantsFilterQuery = createVariantsFilterQuery(
    searchQuery.filters ?? {},
    currencyCode
  );

  const finalQuery = {
    ...(searchQuery.query ? searchTextQuery : {}),
    ...filterQuery,
    ...getAccessQuery(context, shopIds, accountEmail),
    "product.isDeleted": { $ne: true },
    "product.isVisible": true,
  };

  if (shopIds) finalQuery.shopId = { $in: shopIds };

  const result = await Catalog.aggregate([
    {
      $match: {
        ...finalQuery,
        ...(searchQuery.cursor
          ? createNextPageQuery(decodeCursor(searchQuery.cursor))
          : {}),
      },
    },
    { $sort: { createdAt: -1 } },
    { $limit: pageSize },
    {
      $project: {
        _id: -1,
        createdAt: 1,
        updatedAt: 1,
        shopId: 1,
        product: 1,
        variants: {
          $filter: {
            input: "$product.variants",
            as: "variant",
            cond: {
              ...variantsFilterQuery,
            },
          },
        },
      },
    },
  ]).toArray();

  return {
    items: result.map(({ variants, product, ...rest }) => ({
      ...rest,
      product: { ...product, variants },
    })),
    count: await Catalog.countDocuments(finalQuery),
    cursor:
      result.length === pageSize
        ? await createNextCursor(result[result.length - 1], Catalog, finalQuery)
        : null,
  };
};
