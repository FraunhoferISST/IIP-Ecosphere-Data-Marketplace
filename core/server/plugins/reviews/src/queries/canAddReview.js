const { countReviews } = require("../util/countReviews");

const checkArgs = (args) => {
  for (const arg of ["shopId", "accountId"]) {
    if (!(arg in args) || !args[arg]) {
      throw new Error(`You must provide "${arg}" argument`);
    }
  }
};

module.exports = async (context, args) => {
  checkArgs(args);
  const reviewsCount = await countReviews(context, args);
  return { canAddReview: reviewsCount === 0 };
};
