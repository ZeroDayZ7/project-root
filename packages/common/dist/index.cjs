"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  globalRateLimiter: () => globalRateLimiter,
  requestLoggerDev: () => requestLoggerDev_default,
  setupCommonMiddleware: () => setupCommonMiddleware,
  setupErrorHandling: () => setupErrorHandling
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

// src/setupCommonMiddleware.ts
var import_express = __toESM(require("express"), 1);
var import_compression = __toESM(require("compression"), 1);
var import_cors = __toESM(require("cors"), 1);
var import_helmet = __toESM(require("helmet"), 1);
function setupCommonMiddleware(config) {
  const app = (0, import_express.default)();
  app.disable("x-powered-by");
  app.use((0, import_helmet.default)(config?.helmet));
  app.use((0, import_cors.default)(config?.cors));
  app.use((0, import_compression.default)());
  app.use(import_express.default.json({ limit: "1mb" }));
  return app;
}

// src/setupErrorHandling.ts
function setupErrorHandling(app, config) {
  app.use((_req, res) => {
    res.status(404).json({ message: `[${config?.serviceName || "service"}] Not Found` });
  });
  app.use(
    (err, req, res, _next) => {
      console.error(`[${config?.serviceName || "service"}] Error:`, err);
      const status = err.status || 500;
      res.status(status).json({
        message: err.message || "Internal Server Error",
        ...config?.isDev ? { stack: err.stack } : {}
      });
    }
  );
}

// src/rate-limiters.ts
var import_express_rate_limit = __toESM(require("express-rate-limit"), 1);
var globalRateLimiter = (0, import_express_rate_limit.default)({
  windowMs: 60 * 60 * 1e3,
  // 1 godzina / 1 hour
  max: 1e3,
  // 1000 żądań na godzinę / 1000 requests per hour
  message: "Za du\u017Co \u017C\u0105da\u0144, spr\xF3buj ponownie p\xF3\u017Aniej. / Too many requests, please try again later.",
  standardHeaders: true,
  legacyHeaders: false
});
var loginRateLimiter = (0, import_express_rate_limit.default)({
  windowMs: 15 * 60 * 1e3,
  // 15 minut / 15 minutes
  max: 5,
  // 5 prób logowania / 5 login attempts
  message: "Za du\u017Co pr\xF3b logowania. Spr\xF3buj ponownie p\xF3\u017Aniej. / Too many login attempts. Please try again later.",
  standardHeaders: true,
  legacyHeaders: false
});
var registerRateLimiter = (0, import_express_rate_limit.default)({
  windowMs: 60 * 60 * 1e3,
  // 1 godzina / 1 hour
  max: 10,
  // 10 rejestracji / 10 registrations
  message: "Za du\u017Co rejestracji. Spr\xF3buj ponownie p\xF3\u017Aniej. / Too many registrations. Please try again later.",
  standardHeaders: true,
  legacyHeaders: false
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  globalRateLimiter,
  requestLoggerDev,
  setupCommonMiddleware,
  setupErrorHandling
});
//# sourceMappingURL=index.cjs.map