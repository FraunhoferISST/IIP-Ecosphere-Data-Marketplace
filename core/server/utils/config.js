const dotenv = require("dotenv");

module.exports = (() => {
  const result = dotenv.config();
  if (result.error) {
    console.warn(result.error);
  }
  return result.parsed;
})();
