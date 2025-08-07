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
  const { serviceName = "", isDev = false, logger } = options;
  const safeLogger = logger ?? {
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
  const { serviceName = "", isDev = false, logger = console } = options;
  return (_req, res, _next) => {
    const message = isDev && serviceName ? `[${serviceName}] Not Found` : "Not Found";
    logger.warn?.(`[${serviceName || "service"}] 404 - ${_req.method} ${_req.originalUrl} - IP: ${_req.ip}`);
    res.status(404).json({ message });
  };
}
export {
  globalErrorHandler,
  globalRateLimiter,
  notFoundHandler,
  requestLoggerDev,
  setupCommonMiddleware,
  setupErrorHandling
};
//# sourceMappingURL=index.js.map