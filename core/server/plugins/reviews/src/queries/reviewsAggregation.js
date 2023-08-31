const { aggregateReviews } = require("../util/aggregateReviews");

const checkArgs = (args) => {
  for (const arg of ["shopId"]) {
    if (!(arg in args) || !args[arg]) {
      throw new Error(`You must provide "${arg}" argument`);
    }
  }
};

module.exports = async (context, args) => {
  checkArgs(args);
  return aggregateReviews(context, args);
};
