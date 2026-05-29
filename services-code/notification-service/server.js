require("dotenv").config();

const express = require("express");
const client = require("prom-client");

const {
  connectRabbitMQ
} = require("./rabbitmq");

const consumeMessages =
  require("./consumer");

const app = express();


// =====================================
// PROMETHEUS METRICS
// =====================================

const register = new client.Registry();

client.collectDefaultMetrics({
  register
});

const httpRequestsTotal =
  new client.Counter({

    name:
      "notification_service_http_requests_total",

    help:
      "Total HTTP Requests",

    labelNames: [
      "method",
      "route",
      "status"
    ]

  });

register.registerMetric(
  httpRequestsTotal
);


// =====================================
// REQUEST COUNTER
// =====================================

app.use((req, res, next) => {

  res.on("finish", () => {

    httpRequestsTotal.inc({

      method:
        req.method,

      route:
        req.path,

      status:
        res.statusCode

    });

  });

  next();

});


// =====================================
// ROOT
// =====================================

app.get("/", (req, res) => {

  res.send(
    "Notification Service Running"
  );

});


// =====================================
// HEALTH
// =====================================

app.get("/health", (req, res) => {

  res.json({
    success: true
  });

});


// =====================================
// METRICS
// =====================================

app.get("/metrics", async (req, res) => {

  res.set(
    "Content-Type",
    register.contentType
  );

  res.end(
    await register.metrics()
  );

});


// =====================================
// START
// =====================================

async function startServer() {

  await connectRabbitMQ();

  await consumeMessages();

  app.listen(5008, () => {

    console.log(
      "Notification Service Running"
    );

  });

}

startServer();
