module.exports = Object.keys({
  "image/png": {
    source: "iana",
    compressible: false,
    extensions: ["png"],
  },
  "application/pdf": {
    source: "iana",
    compressible: false,
    extensions: ["pdf"],
  },
  "text/plain": {
    source: "iana",
    compressible: true,
    extensions: ["txt", "text", "conf", "def", "list", "log", "in", "ini"],
  },
  "text/csv": {
    source: "iana",
    compressible: true,
    extensions: ["csv"],
  },
  "image/jpeg": {
    source: "iana",
    compressible: false,
    extensions: ["jpeg", "jpg", "jpe"],
  },
});
