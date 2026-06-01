const express = require("express");
const mysql = require("mysql2");
const jwt = require("jsonwebtoken");
const client = require("prom-client");

const app = express();

// =====================================
// PROMETHEUS METRICS
// =====================================

const register = new client.Registry();

client.collectDefaultMetrics({
  register
});

const httpRequestsTotal = new client.Counter({
  name: "cart_service_http_requests_total",
  help: "Total HTTP Requests",
  labelNames: ["method", "route", "status"]
});

register.registerMetric(httpRequestsTotal);

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
// MYSQL CONNECTION
// =====================================

const db = mysql.createPool({
  host: "mysql",
  user: "root",
  password: "root123",
  database: "ecommerce",
  waitForConnections: true,
  connectionLimit: 10
});

// =====================================
// JWT AUTH MIDDLEWARE
// =====================================

const authMiddleware = (req, res, next) => {

  try {

    const authHeader =
      req.headers.authorization;

    if (!authHeader) {

      return res.status(401).json({
        success: false,
        message: "Token missing"
      });

    }

    const token =
      authHeader.split(" ")[1];

    const decoded = jwt.verify(

      token,

      "secret123"

    );

    req.user = decoded;

    next();

  } catch (err) {

    console.error(
      "JWT ERROR:",
      err.message
    );

    return res.status(401).json({
      success: false,
      message: "Invalid token"
    });

  }

};

// =====================================
// ROOT
// =====================================

app.get("/", (req, res) => {

  res.send("🛒 Cart Service Running");

});

// =====================================
// HEALTH CHECK
// =====================================

app.get("/health", (req, res) => {

  res.status(200).json({
    status: "UP",
    service: "cart-service"
  });

});

// =====================================
// METRICS ENDPOINT
// =====================================

app.get("/metrics", async (req, res) => {

  res.set("Content-Type", register.contentType);

  res.end(await register.metrics());

});

// =====================================
// ADD TO CART
// =====================================

app.post(

  "/add",

  authMiddleware,

  (req, res) => {

    console.log(
      "REQ BODY:",
      req.body
    );

    const { product_id } = req.body;

    const user_email =

      req.user.email ||

      req.body.user ||

      req.body.email;

    if (!product_id) {

      return res.status(400).json({
        success: false,
        message: "product_id required"
      });

    }

    if (!user_email) {

      return res.status(400).json({
        success: false,
        message: "User email missing"
      });

    }

    // CHECK DUPLICATE

    db.query(

      "SELECT * FROM cart WHERE user_email=? AND product_id=?",

      [user_email, product_id],

      (checkErr, checkResult) => {

        if (checkErr) {

          console.error(checkErr);

          return res.status(500).json({
            success: false,
            message: "DB check failed"
          });

        }

        if (checkResult.length > 0) {

          return res.status(400).json({
            success: false,
            message: "Product already in cart"
          });

        }

        // INSERT

        db.query(

          "INSERT INTO cart (user_email, product_id) VALUES (?, ?)",

          [user_email, product_id],

          (err, result) => {

            if (err) {

              console.error(
                "CART INSERT ERROR:",
                err
              );

              return res.status(500).json({
                success: false,
                message: "DB insert failed"
              });

            }

            res.json({
              success: true,
              message: "Added to cart",
              cart_id: result.insertId
            });

          }

        );

      }

    );

  }

);

// =====================================
// GET USER CART
// =====================================

app.get(

  "/:email",

  authMiddleware,

  (req, res) => {

    const sql = `

      SELECT

        cart.id,
        cart.user_email,
        cart.product_id,

        products.name,
        products.price,
        products.image,
        products.description,
        products.category

      FROM cart

      JOIN products
      ON cart.product_id = products.id

      WHERE cart.user_email = ?

    `;

    db.query(

      sql,

      [req.params.email],

      (err, result) => {

        if (err) {

          console.error(
            "CART FETCH ERROR:",
            err
          );

          return res.status(500).json({
            success: false,
            message: "Cart fetch failed"
          });

        }

        res.json(result);

      }

    );

  }

);

// =====================================
// REMOVE ITEM
// =====================================

app.delete(

  "/remove/:id",

  authMiddleware,

  (req, res) => {

    db.query(

      "DELETE FROM cart WHERE id=?",

      [req.params.id],

      (err) => {

        if (err) {

          console.error(err);

          return res.status(500).json({
            success: false,
            message: "Remove failed"
          });

        }

        res.json({
          success: true,
          message: "Item removed"
        });

      }

    );

  }

);

// =====================================
// START SERVER
// =====================================

app.listen(8085, () => {

  console.log("=================================");
  console.log("🚀 Cart Service Running");
  console.log("PORT : 8085");
  console.log("=================================");

});
