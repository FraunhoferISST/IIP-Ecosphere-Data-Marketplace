const ar = require("./ar.json");
const bg = require("./bg.json");
const cs = require("./cs.json");
const de = require("./de.json");
const el = require("./el.json");
const en = require("./en.json");
const es = require("./es.json");
const fr = require("./fr.json");
const he = require("./he.json");
const hr = require("./hr.json");
const hu = require("./hu.json");
const it = require("./it.json");
const my = require("./my.json");
const nb = require("./nb.json");
const nl = require("./nl.json");
const pl = require("./pl.json");
const pt = require("./pt.json");
const ro = require("./ro.json");
const ru = require("./ru.json");
const sl = require("./sl.json");
const sv = require("./sv.json");
const tr = require("./tr.json");
const vi = require("./vi.json");
const zh = require("./zh.json");

//
// we want all the files in individual
// imports for easier handling by
// automated translation software
//
module.exports = {
  translations: [
    ...ar,
    ...bg,
    ...cs,
    ...de,
    ...el,
    ...en,
    ...es,
    ...fr,
    ...he,
    ...hr,
    ...hu,
    ...it,
    ...my,
    ...nb,
    ...nl,
    ...pl,
    ...pt,
    ...ro,
    ...ru,
    ...sl,
    ...sv,
    ...tr,
    ...vi,
    ...zh,
  ],
};
