const { getInquiry } = require("../util/getInquiry");

const checkArgs = (args) => {
  for (const arg of ["shopId", "inquiryId"]) {
    if (!(arg in args) || !args[arg]) {
      throw new Error(`You must provide "${arg}" argument`);
    }
  }
};

module.exports = async (context, args) => {
  checkArgs(args);
  const inquiry = await getInquiry(context, args);
  return inquiry;
};
