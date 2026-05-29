const express = require("express");
const mysql = require("mysql2");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const client = require("prom-client");

require("dotenv").config();

const {
  connectRabbitMQ,
  getChannel
} = require("./rabbitmq");

const app = express();

// ======================================
// PROMETHEUS METRICS
// ======================================

const register = new client.Registry();

client.collectDefaultMetrics({
  register
});

const httpRequestsTotal = new client.Counter({
  name: "order_service_http_requests_total",
  help: "Total HTTP Requests",
  labelNames: ["method", "route", "status"]
});

register.registerMetric(httpRequestsTotal);

app.use(cors());
app.use(express.json());

// ======================================
// REQUEST COUNTER
// ======================================

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


// ======================================
// MYSQL CONNECTION
// ======================================

const db = mysql.createPool({

  host: "mysql",
  user: "root",
  password: "root123",
  database: "ecommerce",
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10

});


// ======================================
// MYSQL CONNECTION CHECK
// ======================================

function checkDB() {

  db.getConnection((err, connection) => {

    if (err) {

      console.log(
        "❌ DB not ready, retrying..."
      );

      setTimeout(checkDB, 5000);

    } else {

      console.log(
        "✅ MySQL Connected"
      );

      connection.release();

    }

  });

}

checkDB();


// ======================================
// JWT AUTH MIDDLEWARE
// ======================================

const authenticate = (req, res, next) => {

  let token;

  const authHeader =
    req.headers.authorization;

  if (
    authHeader &&
    authHeader.startsWith("Bearer")
  ) {

    try {

      token =
        authHeader.split(" ")[1];

      const decoded =
        jwt.verify(
          token,
          "secret123"
        );

      req.user = decoded;

      next();

    } catch (err) {

      console.log(
        "JWT ERROR:",
        err.message
      );

      return res.status(401).json({

        success: false,
        message: "Invalid token"

      });

    }

  }

  if (!token) {

    return res.status(401).json({

      success: false,
      message: "No token provided"

    });

  }

};


// ======================================
// ADMIN ONLY
// ======================================

const adminOnly = (req, res, next) => {

  if (
    req.user &&
    req.user.role === "admin"
  ) {

    next();

  } else {

    return res.status(403).json({

      success: false,
      message: "Admin access only"

    });

  }

};


// ======================================
// ROOT
// ======================================

app.get("/", (req, res) => {

  res.json({

    service: "Order Service",
    status: "running"

  });

});


// ======================================
// HEALTH
// ======================================

app.get("/health", (req, res) => {

  res.json({

    success: true,
    message: "Order service healthy"

  });

});


// ======================================
// PLACE ORDER
// ======================================

app.post(

  "/api/orders/place",

  authenticate,

  (req, res) => {

    console.log("📦 ORDER API HIT");

    const userEmail =
      req.user.email;

    const {

      productId,
      totalAmount,
      fullName,
      mobile,
      address,
      city,
      state,
      pincode

    } = req.body;

    if (
      !productId ||
      !totalAmount
    ) {

      return res.status(400).json({

        success: false,
        message: "Missing order data"

      });

    }

    const sql = `
      INSERT INTO orders (
        user_email,
        product_id,
        total_amount,
        payment_status,
        status,
        full_name,
        mobile,
        address,
        city,
        state,
        pincode
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(

      sql,

      [

        userEmail,
        productId,
        totalAmount,
        "SUCCESS",
        "PLACED",
        fullName,
        mobile,
        address,
        city,
        state,
        pincode

      ],

      (err, result) => {

        if (err) {

          console.log(
            "❌ ORDER INSERT ERROR"
          );

          console.log(err);

          return res.status(500).json({

            success: false,
            message: "DB error"

          });

        }

        // ======================================
        // DELETE CART ITEM
        // ======================================

        db.query(

          `
          DELETE FROM cart
          WHERE user_email=?
          AND product_id=?
          `,

          [
            userEmail,
            productId
          ],

          (deleteErr) => {

            if (deleteErr) {

              console.log(
                "❌ Cart delete failed"
              );

            }

          }

        );

        // ======================================
        // SEND RABBITMQ EVENT
        // ======================================

        try {

          const channel =
            getChannel();

          channel.sendToQueue(

            "order.notifications",

            Buffer.from(

              JSON.stringify({

                type: "ORDER_PLACED",

                email: userEmail,

                orderId:
                  result.insertId

              })

            )

          );

          console.log(
            "📨 Order Event Sent"
          );

        } catch (queueErr) {

          console.log(
            "❌ RabbitMQ Error"
          );

          console.log(queueErr);

        }

        // ======================================
        // RESPONSE
        // ======================================

        res.json({

          success: true,
          orderId: result.insertId,
          message:
            "Order placed successfully"

        });

      }

    );

  }

);


// ======================================
// GET USER ORDERS
// ======================================

app.get(

  "/api/orders/user",

  authenticate,

  (req, res) => {

    const userEmail =
      req.user.email;

    const sql = `

      SELECT

        orders.id,
        orders.total_amount,
        orders.payment_status,
        orders.status,
        orders.full_name,
        orders.mobile,
        orders.address,
        orders.city,
        orders.state,
        orders.pincode,
        orders.created_at,

        products.name,
        products.price,
        products.image,
        products.category

      FROM orders

      LEFT JOIN products
      ON orders.product_id = products.id

      WHERE orders.user_email = ?

      ORDER BY orders.created_at DESC

    `;

    db.query(

      sql,

      [userEmail],

      (err, results) => {

        if (err) {

          console.log(
            "❌ FETCH ORDER ERROR"
          );

          console.log(err);

          return res.status(500).json({

            success: false,
            message: "DB error"

          });

        }

        res.json(results);

      }

    );

  }

);


// ======================================
// ADMIN GET ALL ORDERS
// ======================================

app.get(

  "/api/admin/orders",

  authenticate,

  adminOnly,

  (req, res) => {

    const sql = `

      SELECT

        orders.id,
        orders.user_email,
        orders.total_amount,
        orders.payment_status,
        orders.status,
        orders.full_name,
        orders.mobile,
        orders.address,
        orders.city,
        orders.state,
        orders.pincode,
        orders.created_at,

        products.name,
        products.image,
        products.category

      FROM orders

      LEFT JOIN products
      ON orders.product_id = products.id

      ORDER BY orders.created_at DESC

    `;

    db.query(

      sql,

      (err, results) => {

        if (err) {

          console.log(
            "❌ ADMIN ORDER ERROR"
          );

          console.log(err);

          return res.status(500).json({

            success: false,
            message:
              "Admin orders fetch failed"

          });

        }

        res.json(results);

      }

    );

  }

);


// ======================================
// ADMIN UPDATE ORDER STATUS
// ======================================

app.put(

  "/api/admin/orders/:id",

  authenticate,

  adminOnly,

  (req, res) => {

    const orderId =
      req.params.id;

    const { status } =
      req.body;

    const validStatus = [

      "PLACED",
      "CONFIRMED",
      "SHIPPED",
      "DELIVERED",
      "CANCELLED"

    ];

    if (
      !validStatus.includes(status)
    ) {

      return res.status(400).json({

        success: false,
        message: "Invalid status"

      });

    }

    const sql = `
      UPDATE orders
      SET status=?
      WHERE id=?
    `;

    db.query(

      sql,

      [status, orderId],

      (err, result) => {

        if (err) {

          console.log(err);

          return res.status(500).json({

            success: false,
            message:
              "Status update failed"

          });

        }

        res.json({

          success: true,
          message: "Order updated"

        });

      }

    );

  }

);

// ======================================
// METRICS ENDPOINT
// ======================================

app.get("/metrics", async (req, res) => {

  res.set("Content-Type", register.contentType);

  res.end(await register.metrics());

});

// ======================================
// START SERVER
// ======================================

async function startServer() {

  await connectRabbitMQ();

  app.listen(8086, () => {

    console.log(
      "🚀 Order Service running on 8086"
    );

  });

}

startServer();
