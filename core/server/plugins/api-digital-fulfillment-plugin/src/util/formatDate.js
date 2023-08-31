const { format: formatter } = require("date-fns");

module.exports.formatDate = (date, format = "dd.MM.yyy") =>
  formatter(date, format);
