require("dotenv").config();

const express = require("express");

const cors = require("cors");
const client = require("prom-client");

// =====================================
// IMPORT ROUTES
// =====================================

const paymentRoutes =
  require("./routes/paymentRoutes");

// =====================================
// DATABASE CONNECTION
// =====================================

require("./db");

// =====================================
// CREATE EXPRESS APP
// =====================================

const app = express();

// =====================================
// PROMETHEUS METRICS
// =====================================

const register = new client.Registry();

client.collectDefaultMetrics({
  register
});

const httpRequestsTotal = new client.Counter({
  name: "payment_service_http_requests_total",
  help: "Total HTTP Requests",
  labelNames: ["method", "route", "status"]
});

register.registerMetric(httpRequestsTotal);

// =====================================
// MIDDLEWARE
// =====================================

app.use(cors());

app.use(express.json());

// =====================================
// REQUEST COUNTER
// =====================================

app.use((req, res, next) => {

  res.on("finish", () => {

    httpRequestsTotal.inc({
      method: req.method,
      route: req.path,
      status: res.statusCode
    });

  });

  next();

});

// =====================================
// API ROUTES
// =====================================

app.use(
  "/api/payment",
  paymentRoutes
);

// =====================================
// ROOT ROUTE
// =====================================

app.get("/", (req, res) => {

  res.json({

    service:
      "Payment Service",

    status:
      "RUNNING",

    version:
      "1.0.0",

  });

});

// =====================================
// HEALTH CHECK
// =====================================

app.get(
  "/health",
  (req, res) => {

    res.status(200).json({

      success: true,

      message:
        "Payment service healthy",

    });

  }
);

// =====================================
// METRICS ENDPOINT
// =====================================

app.get("/metrics", async (req, res) => {

  res.set("Content-Type", register.contentType);

  res.end(await register.metrics());

});

// =====================================
// 404 HANDLER
// =====================================

app.use((req, res) => {

  res.status(404).json({

    success: false,

    message:
      "Route not found",

  });

});

// =====================================
// GLOBAL ERROR HANDLER
// =====================================

app.use(

  (
    err,
    req,
    res,
    next
  ) => {

    console.error(
      "SERVER ERROR:",
      err
    );

    res.status(500).json({

      success: false,

      message:
        "Internal server error",

    });

  }

);

// =====================================
// START SERVER
// =====================================

const PORT =
  process.env.PORT || 5007;

app.listen(PORT, () => {

  console.log(
    `=================================`
  );

  console.log(
    `Payment Service Started`
  );

  console.log(
    `PORT : ${PORT}`
  );

  console.log(
    `MODE : PRODUCTION READY`
  );

  console.log(
    `=================================`
  );

});
