module.exports = (verificationEndpoint = "") => {
  const knownBrokers = (process.env.KNOWN_BROKERS ?? "").split("::");
  return knownBrokers.includes(verificationEndpoint);
};
