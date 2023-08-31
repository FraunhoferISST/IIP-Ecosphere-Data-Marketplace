const prepareFacets = (result) => {
  const rawFacets = Object.entries(result?.[0] ?? {}).filter(
    ([_, values]) => values?.length > 0
  );
  if (rawFacets?.length > 0) {
    return rawFacets.map(([property, v]) => {
      if (property === "priceRange") {
        return {
          property,
          values: [
            {
              value: v?.[0]?.minPrice?.toString() ?? "",
              count: 1,
            },
            {
              value: v?.[0]?.maxPrice?.toString() ?? "",
              count: 1,
            },
          ],
        };
      }
      return {
        property,
        values: v
          .map(({ _id, count }) => ({
            value: _id.value === null ? null : _id.value ?? _id,
            count,
          }))
          .filter(({ value }) => value !== null),
      };
    });
  }
  return [];
};

module.exports = async (context, { shopIds } = {}) => {
  const { collections } = context;
  const { Catalog, Shops } = collections;

  if (!shopIds || shopIds.length === 0) {
    throw new Error(
      "invalid-param",
      "You must provide tagIds or shopIds or both"
    );
  }
  const query = {
    "product.isDeleted": { $ne: true },
    "product.isVisible": true,
  };
  if (shopIds) {
    query.shopId = { $in: shopIds };
  }

  const shop = await Shops.findOne({ _id: shopIds[0] });
  const currencyCode = shop?.currency?.code ?? shop?.currency ?? "USD";

  const result = await Catalog.aggregate([
    {
      $match: query,
    },
    {
      $facet: {
        priceModel: [
          { $unwind: "$product.variants" },
          {
            $group: {
              _id: {
                value: "$product.variants.priceModel.type",
              },
              count: {
                $sum: 1,
              },
            },
          },
        ],
        distributionType: [
          { $unwind: "$product.variants" },
          { $unwind: "$product.variants.distributions" },
          {
            $group: {
              _id: {
                value: "$product.variants.distributions.type",
              },
              count: {
                $sum: 1,
              },
            },
          },
        ],
        option: [
          { $unwind: "$product.variants" },
          {
            $group: {
              _id: {
                value: "$product.variants.attributeLabel",
              },
              count: {
                $sum: 1,
              },
            },
          },
        ],
        themes: [
          { $unwind: "$product.themes" },
          { $sortByCount: "$product.themes" },
        ],
        vendor: [
          { $unwind: "$product.vendor" },
          { $sortByCount: "$product.vendor" },
        ],
        dataClassification: [
          { $unwind: "$product.dataClassification" },
          { $sortByCount: "$product.dataClassification" },
        ],
        originCountry: [
          { $unwind: "$product.originCountry" },
          { $sortByCount: "$product.originCountry" },
        ],
        tax: [
          { $unwind: "$product.variants" },
          {
            $group: {
              _id: {
                value: "$product.variants.taxCode",
              },
              count: {
                $sum: 1,
              },
            },
          },
        ],
        priceRange: [
          { $unwind: "$product.variants" },
          {
            $group: {
              _id: {
                value: "priceRange",
              },
              minPrice: {
                $min: `$product.variants.pricing.${currencyCode}.price`,
              },
              maxPrice: {
                $max: `$product.variants.pricing.${currencyCode}.price`,
              },
            },
          },
        ],
      },
    },
  ]).toArray();
  const facets = prepareFacets(result);
  return {
    facets,
  };
};
