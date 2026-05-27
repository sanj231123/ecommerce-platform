require("dotenv").config();

const express = require("express");

const cors = require("cors");

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
// MIDDLEWARE
// =====================================

app.use(cors());

app.use(express.json());

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
