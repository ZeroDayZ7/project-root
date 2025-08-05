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
export {
  requestLoggerDev_default as requestLoggerDev
};
