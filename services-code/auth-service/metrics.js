const client = require("prom-client");

const register = new client.Registry();

client.collectDefaultMetrics({
  register,
});

const httpRequestDurationMicroseconds =
  new client.Histogram({
    name: "http_request_duration_ms",
    help: "Duration of HTTP requests in ms",
    labelNames: ["method", "route", "status_code"],
    buckets: [50, 100, 200, 300, 400, 500],
  });

register.registerMetric(httpRequestDurationMicroseconds);

module.exports = {
  register,
  httpRequestDurationMicroseconds,
};
