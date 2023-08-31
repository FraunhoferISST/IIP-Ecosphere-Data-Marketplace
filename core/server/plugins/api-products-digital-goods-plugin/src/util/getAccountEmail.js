const axios = require("axios");
const { decodeCursor } = require("../../../../utils/cursor");
const isBrokerKnown = require("../../../../utils/isBrokerKnown");

const getAccountEmail = async (context, brokerInfo = "") => {
  if (context.account?.emails?.[0]?.address) {
    // account belongs to this node
    return context.account.emails[0].address;
  }
  if (brokerInfo) {
    const [brokerVerificationEndpoint, accountNodeEndpoint] =
      decodeCursor(brokerInfo).split("::");
    // for the request from a Broker, anything we need to know is that the request originates from a known Broker and
    // that the account token (if provided) belongs to the account really belonging to a Node that is known to this
    // Broker. In short: verify that both Nodes are known to one Broker and the account token belongs to the one of the
    // known Nodes. Then we can obtain the account email and use it to check permissions to access the Assets
    if (brokerVerificationEndpoint && accountNodeEndpoint) {
      if (!isBrokerKnown(brokerVerificationEndpoint)) {
        console.warn(`Broker ${brokerVerificationEndpoint} is not known!`);
        return "";
      }
      const response = await axios
        .post(
          brokerVerificationEndpoint,
          {
            accountShopEndpoint: accountNodeEndpoint,
          },
          { headers: { Authorization: `Bearer ${context.authToken}` } }
        )
        .catch((e) => {
          console.error(e);
          throw Error("Couldn't verify broker information", e);
        });
      return response.data;
    }
  } else {
    return "";
  }
};

module.exports = {
  getAccountEmail,
};
