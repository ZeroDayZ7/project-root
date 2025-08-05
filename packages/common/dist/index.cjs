"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  requestLoggerDev: () => requestLoggerDev_default
});
module.exports = __toCommonJS(index_exports);

// src/requestLoggerDev.ts
var requestLoggerDev = (req, res, next) => {
  const start = process.hrtime();
  console.log("\n==================== \u{1F4E5} REQUEST ====================");
  console.log(`\u{1F539} Method: ${req.method}`);
  console.log(`\u{1F539} URL: ${req.originalUrl}`);
  console.log(`\u{1F539} IP: ${req.ip}`);
  console.log("\u{1F539} Headers:", req.headers);
  console.log("\u{1F539} Query:", req.query);
  console.log("\u{1F539} Params:", req.params);
  console.log("\u{1F539} Body:", req.body);
  console.log("\u{1F539} Session:", req.session);
  console.log("====================================================");
  const originalSend = res.send;
  res.send = function(body) {
    const diff = process.hrtime(start);
    const timeMs = (diff[0] * 1e3 + diff[1] / 1e6).toFixed(2);
    console.log("\n==================== \u{1F4E4} RESPONSE ====================");
    console.log(`\u{1F539} Status: ${res.statusCode}`);
    console.log(`\u{1F539} Response Time: ${timeMs}ms`);
    console.log("\u{1F539} Headers:", res.getHeaders());
    console.log("\u{1F539} Body:", body);
    console.log("====================================================\n");
    return originalSend.apply(res, arguments);
  };
  next();
};
var requestLoggerDev_default = requestLoggerDev;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  requestLoggerDev
});
