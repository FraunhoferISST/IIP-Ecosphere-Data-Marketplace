const { getInquiries } = require("../util/getInquiries");

const checkArgs = (args) => {
  for (const arg of ["shopId", "accountId"]) {
    if (!(arg in args) || !args[arg]) {
      throw new Error(`You must provide "${arg}" argument`);
    }
  }
};

module.exports = async (context, args) => {
  checkArgs({ ...args, accountId: context.accountId });
  const inquiries = await getInquiries(context, {
    ...args,
    accountId: context.accountId,
  });
  return { inquiries: inquiries ?? [] };
};
