const { getInquiries } = require("../util/getInquiries");
const { encodeCursor, decodeCursor } = require("../../../../utils/cursor");
const { replies } = require("../resolvers/Inquiry");

const createNextPageQuery = (createdAt) => ({
  createdAt: { $lt: createdAt },
});
const createNextCursor = async (currentDoc, collection, finalQuery) => {
  const nextDoc = await collection.findOne(
    {
      ...finalQuery,
      createdAt: { $lt: currentDoc.createdAt },
    },
    { $sort: { createdAt: -1 } }
  );
  return nextDoc ? encodeCursor(`${currentDoc.createdAt}`) : undefined;
};
const hasOptions = (filter) => filter?.length > 0;
const createFilterQuery = (filters) => {
  let filtersQuery = {};
  const filtersMap = {
    sourceTypes: hasOptions(filters.sourceTypes)
      ? {
          sourceTypes: {
            $in: filters.sourceTypes,
          },
        }
      : {},
    categories: hasOptions(filters.categories)
      ? {
          categories: {
            $in: filters.categories,
          },
        }
      : {},
    license: hasOptions(filters.license)
      ? {
          license: {
            $in: filters.license,
          },
        }
      : {},
    ...(hasOptions(filters.replies)
      ? {
          $or: filters.replies.map((repliesCount) => ({
            replies: {
              $size: repliesCount,
            },
          })),
        }
      : {}),
    expectedConsumptionVolume: hasOptions(filters.expectedConsumptionVolume)
      ? {
          expectedConsumptionVolume: {
            $in: filters.expectedConsumptionVolume,
          },
        }
      : {},
  };
  for (const f in filters) {
    filtersQuery = { ...filtersQuery, ...(filtersMap[f] ?? {}) };
  }
  return filtersQuery;
};

const checkArgs = (args) => {
  for (const arg of ["shopIds"]) {
    if (!(arg in args) || !args[arg]) {
      throw new Error(`You must provide "${arg}" argument`);
    }
  }
};

module.exports = async (context, { searchQuery = {}, shopIds }) => {
  checkArgs({ shopIds });
  const {
    collections: { Inquiries },
  } = context;
  const pageSize = searchQuery.pageSize ?? 30;

  const filterQuery = createFilterQuery(searchQuery.filters ?? {});
  const searchTextQuery = {
    $or: [
      {
        description: {
          $regex: new RegExp(`${searchQuery?.query ?? ""}`, "i"),
        },
      },
      {
        title: {
          $regex: new RegExp(`${searchQuery?.query ?? ""}`, "i"),
        },
      },

      {
        useCase: {
          $regex: new RegExp(`${searchQuery?.query ?? ""}`, "i"),
        },
      },
      {
        desiredPricing: {
          $regex: new RegExp(`${searchQuery?.query ?? ""}`, "i"),
        },
      },
    ],
  };

  const finalQuery = {
    ...(searchQuery.query ? searchTextQuery : {}),
    ...filterQuery,
    ...(searchQuery.cursor
      ? createNextPageQuery(decodeCursor(searchQuery.cursor))
      : {}),
    published: true,
  };

  if (shopIds) finalQuery.shopId = { $in: shopIds };

  const inquiries = await Inquiries.find(finalQuery)
    .sort({ createdAt: -1 })
    .limit(pageSize)
    .toArray();
  return {
    items: inquiries,
    count: Inquiries.countDocuments(finalQuery),
    cursor:
      inquiries.length === pageSize
        ? await createNextCursor(
            inquiries[inquiries.length - 1],
            Inquiries,
            finalQuery
          )
        : null,
  };
};
