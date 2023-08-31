const { getReviews } = require("../util/getReviews");

const checkArgs = (args) => {
  for (const arg of ["shopId"]) {
    if (!(arg in args) || !args[arg]) {
      throw new Error(`You must provide "${arg}" argument`);
    }
  }
};

module.exports = async (context, args) => {
  checkArgs(args);
  const reviews = await getReviews(context, args);
  return { reviews };
};
