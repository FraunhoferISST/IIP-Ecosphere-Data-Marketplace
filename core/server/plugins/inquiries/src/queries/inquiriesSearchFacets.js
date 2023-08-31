const prepareFacets = (result) => {
  const rawFacets = Object.entries(result?.[0] ?? {}).filter(
    ([_, values]) => values?.length > 0
  );
  if (rawFacets?.length > 0) {
    const tt = rawFacets.map(([property, v]) => ({
      property,
      values: v
        .map(({ _id, count }) => ({
          value: _id,
          count,
        }))
        .filter(({ value }) => value !== null),
    }));
    return tt;
  }
  return [];
};

module.exports = async (context, { shopIds } = {}) => {
  const { collections } = context;
  const { Inquiries } = collections;

  if (!shopIds || shopIds.length === 0) {
    throw new Error(
      "invalid-param",
      "You must provide tagIds or shopIds or both"
    );
  }
  const query = {
    published: true,
  };
  if (shopIds) {
    query.shopId = { $in: shopIds };
  }

  const result = await Inquiries.aggregate([
    {
      $match: query,
    },
    {
      $facet: {
        sourceTypes: [
          { $unwind: "$sourceTypes" },
          { $sortByCount: "$sourceTypes" },
        ],
        categories: [
          { $unwind: "$categories" },
          { $sortByCount: "$categories" },
        ],
        replies: [
          {
            $sortByCount: {
              $cond: {
                if: { $isArray: "$replies" },
                then: { $size: "$replies" },
                else: 0,
              },
            },
          },
        ],
        expectedConsumptionVolume: [
          { $sortByCount: "$expectedConsumptionVolume" },
        ],
        license: [{ $sortByCount: "$license" }],
      },
    },
  ]).toArray();
  return {
    facets: prepareFacets(result),
  };
};
