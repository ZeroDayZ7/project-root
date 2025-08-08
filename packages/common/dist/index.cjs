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
  globalErrorHandler: () => globalErrorHandler,
  globalRateLimiter: () => globalRateLimiter,
  logger: () => logger_default,
  notFoundHandler: () => notFoundHandler,
  requestLoggerDev: () => requestLoggerDev,
  setupCommonMiddleware: () => setupCommonMiddleware,
  setupErrorHandling: () => setupErrorHandling
});
module.exports = __toCommonJS(index_exports);

// src/requestLoggerDev.ts
var import_uuid = require("uuid");
function requestLoggerDev({ logger: logger2, isDev }) {
  if (!isDev) {
    return (req, res, next) => {
      next();
    };
  }
  const log = logger2.info ? logger2.info.bind(logger2) : console.log;
  return (req, res, next) => {
    const requestId = (0, import_uuid.v4)();
    const start = process.hrtime();
    log(`
==================== \u{1F4E5} REQUEST ====================`);
    log(`\u{1F539} Request ID: ${requestId}`);
    log(`\u{1F539} Method: ${req.method}`);
    log(`\u{1F539} URL: ${req.originalUrl}`);
    log(`\u{1F539} IP: ${req.ip}`);
    log("\u{1F539} Headers:", JSON.stringify(req.headers, null, 2));
    log("\u{1F539} Query:", JSON.stringify(req.query, null, 2));
    log("\u{1F539} Params:", JSON.stringify(req.params, null, 2));
    log("\u{1F539} Body:", JSON.stringify(req.body, null, 2));
    log("\u{1F539} Session:", req.session ?? "No session");
    log("====================================================");
    const originalSend = res.send;
    res.send = function(body) {
      const diff = process.hrtime(start);
      const timeMs = (diff[0] * 1e3 + diff[1] / 1e6).toFixed(2);
      log(`
==================== \u{1F4E4} RESPONSE  ====================`);
      log(`\u{1F539} Request ID: ${requestId}`);
      log(`\u{1F539} Status: ${res.statusCode}`);
      log(`\u{1F539} Response Time: ${timeMs}ms`);
      log("\u{1F539} Headers:", JSON.stringify(res.getHeaders(), null, 2));
      try {
        const bodyStr = typeof body === "string" ? body : JSON.stringify(body, null, 2);
        log("\u{1F539} Body:", bodyStr);
      } catch {
        log("\u{1F539} Body: [Cannot stringify response body]");
      }
      log("====================================================\n");
      return originalSend.call(res, body);
    };
    next();
  };
}

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

// src/middleware/globalErrorHandler.ts
function globalErrorHandler(options = {}) {
  const { serviceName = "", isDev = false, logger: logger2 } = options;
  const safeLogger = logger2 ?? {
    error: console.error.bind(console)
  };
  return (err, req, res, _next) => {
    safeLogger.error?.(`[${serviceName || "service"}] Error:`, err);
    const status = err.status || 500;
    res.status(status).json({
      message: err.message || "Internal Server Error",
      ...isDev ? { stack: err.stack } : {}
    });
  };
}

// src/middleware/notFoundHandler.ts
function notFoundHandler(options = {}) {
  const { serviceName = "", isDev = false, logger: logger2 = console } = options;
  return (_req, res, _next) => {
    const message = isDev && serviceName ? `[${serviceName}] Not Found` : "Not Found";
    logger2.warn?.(`[${serviceName || "service"}] 404 - ${_req.method} ${_req.originalUrl} - IP: ${_req.ip}`);
    res.status(404).json({ message });
  };
}

// src/utils/logger.ts
var import_winston = require("winston");
var import_winston_daily_rotate_file = __toESM(require("winston-daily-rotate-file"), 1);
var import_process = require("process");
var logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3
};
var customColors = {
  error: "red",
  warn: "yellow",
  info: "green",
  debug: "cyan"
};
import_winston.format.colorize().addColors(customColors);
var consoleFormat = import_winston.format.combine(
  import_winston.format.colorize({ all: true }),
  // Kolory dla wszystkich poziomów
  import_winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  import_winston.format.printf(({ timestamp, level, message, ...meta }) => {
    return `${timestamp} [${level}]: ${message} ${Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ""}`;
  })
);
var fileFormat = import_winston.format.combine(
  import_winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  import_winston.format.json()
);
var logger = (0, import_winston.createLogger)({
  levels: logLevels,
  level: import_process.env.NODE_ENV === "development" ? "debug" : "info",
  format: fileFormat,
  transports: [
    new import_winston.transports.Console({
      format: consoleFormat
    }),
    new import_winston_daily_rotate_file.default({
      filename: "logs/app-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxSize: "10m",
      maxFiles: "14d",
      format: fileFormat
    }),
    new import_winston_daily_rotate_file.default({
      level: "error",
      filename: "logs/error-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxSize: "10m",
      maxFiles: "30d"
    })
  ],
  exceptionHandlers: [new import_winston.transports.File({ filename: "logs/exceptions.log" })],
  rejectionHandlers: [new import_winston.transports.File({ filename: "logs/rejections.log" })]
});
logger.debugObject = (message, object) => {
  const levelNum = logLevels[logger.level] ?? 2;
  if (levelNum >= logLevels.debug) {
    logger.debug(message, { object: JSON.stringify(object, null, 2) });
  }
};
var logger_default = logger;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  globalErrorHandler,
  globalRateLimiter,
  logger,
  notFoundHandler,
  requestLoggerDev,
  setupCommonMiddleware,
  setupErrorHandling
});
//# sourceMappingURL=index.cjs.map