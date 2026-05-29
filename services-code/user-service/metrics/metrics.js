const client = require("prom-client");

const register = new client.Registry();

client.collectDefaultMetrics({
  register
});

const httpRequestsTotal = new client.Counter({
  name: "user_service_http_requests_total",
  help: "Total HTTP Requests",
  labelNames: ["method", "route", "status"]
});

register.registerMetric(httpRequestsTotal);

module.exports = {
  register,
  httpRequestsTotal
};
