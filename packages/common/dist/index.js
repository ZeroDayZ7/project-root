// src/requestLoggerDev.ts
import { v4 as uuidv4 } from "uuid";
function requestLoggerDev({ logger: logger2, isDev }) {
  if (!isDev) {
    return (req, res, next) => {
      next();
    };
  }
  const log = logger2.info ? logger2.info.bind(logger2) : console.log;
  return (req, res, next) => {
    const requestId = uuidv4();
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
import express from "express";
import compression from "compression";
import cors from "cors";
import helmet from "helmet";
function setupCommonMiddleware(config) {
  const app = express();
  app.disable("x-powered-by");
  app.use(helmet(config?.helmet));
  app.use(cors(config?.cors));
  app.use(compression());
  app.use(express.json({ limit: "1mb" }));
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
import rateLimit from "express-rate-limit";
var globalRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1e3,
  // 1 godzina / 1 hour
  max: 1e3,
  // 1000 żądań na godzinę / 1000 requests per hour
  message: "Za du\u017Co \u017C\u0105da\u0144, spr\xF3buj ponownie p\xF3\u017Aniej. / Too many requests, please try again later.",
  standardHeaders: true,
  legacyHeaders: false
});
var loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1e3,
  // 15 minut / 15 minutes
  max: 5,
  // 5 prób logowania / 5 login attempts
  message: "Za du\u017Co pr\xF3b logowania. Spr\xF3buj ponownie p\xF3\u017Aniej. / Too many login attempts. Please try again later.",
  standardHeaders: true,
  legacyHeaders: false
});
var registerRateLimiter = rateLimit({
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
import { transports, createLogger, format } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import { env } from "process";
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
format.colorize().addColors(customColors);
var consoleFormat = format.combine(
  format.colorize({ all: true }),
  // Kolory dla wszystkich poziomów
  format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  format.printf(({ timestamp, level, message, ...meta }) => {
    return `${timestamp} [${level}]: ${message} ${Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ""}`;
  })
);
var fileFormat = format.combine(
  format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  format.json()
);
var logger = createLogger({
  levels: logLevels,
  level: env.NODE_ENV === "development" ? "debug" : "info",
  format: fileFormat,
  transports: [
    new transports.Console({
      format: consoleFormat
    }),
    new DailyRotateFile({
      filename: "logs/app-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxSize: "10m",
      maxFiles: "14d",
      format: fileFormat
    }),
    new DailyRotateFile({
      level: "error",
      filename: "logs/error-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxSize: "10m",
      maxFiles: "30d"
    })
  ],
  exceptionHandlers: [new transports.File({ filename: "logs/exceptions.log" })],
  rejectionHandlers: [new transports.File({ filename: "logs/rejections.log" })]
});
logger.debugObject = (message, object) => {
  const levelNum = logLevels[logger.level] ?? 2;
  if (levelNum >= logLevels.debug) {
    logger.debug(message, { object: JSON.stringify(object, null, 2) });
  }
};
var logger_default = logger;
export {
  globalErrorHandler,
  globalRateLimiter,
  logger_default as logger,
  notFoundHandler,
  requestLoggerDev,
  setupCommonMiddleware,
  setupErrorHandling
};
//# sourceMappingURL=index.js.map