module.exports.getInquiries = async (context, { shopId, ...query }) => {
  const {
    collections: { Inquiries },
  } = context;
  return Inquiries.find({ shopId, ...query })
    .sort({ _id: -1 })
    .toArray();
};
