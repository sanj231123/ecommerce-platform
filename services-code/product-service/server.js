const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const client = require("prom-client");

const app = express();

// ======================================
// PROMETHEUS METRICS
// ======================================

const register = new client.Registry();

client.collectDefaultMetrics({
  register
});

const httpRequestsTotal = new client.Counter({
  name: "product_service_http_requests_total",
  help: "Total HTTP Requests",
  labelNames: ["method", "route", "status"]
});

register.registerMetric(httpRequestsTotal);

app.use(express.json());
app.use(cors());

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

app.use("/uploads", express.static("uploads"));

let db;

// ======================================
// MYSQL CONNECTION
// ======================================

function connectDB() {

  db = mysql.createPool({
    host: "mysql",
    user: "root",
    password: "root123",
    database: "ecommerce",
    waitForConnections: true,
    connectionLimit: 10
  });

  db.getConnection((err, conn) => {

    if (err) {

      console.error("❌ DB not ready...");
      setTimeout(connectDB, 5000);

    } else {

      console.log("✅ MySQL Connected");
      conn.release();

    }

  });

}

connectDB();


// ======================================
// MULTER IMAGE STORAGE
// ======================================

const storage = multer.diskStorage({

  destination: "./uploads",

  filename: (req, file, cb) => {

    cb(
      null,
      Date.now() + path.extname(file.originalname)
    );

  },

});

const upload = multer({
  storage,
});


// ======================================
// HEALTH CHECK
// ======================================

app.get("/health", (req, res) => {
  res.send("OK");
});


// ======================================
// GET ALL PRODUCTS
// ======================================

app.get("/products", (req, res) => {

  db.query(
    "SELECT * FROM products ORDER BY id DESC",
    (err, rows) => {

      if (err) {

        console.log(err);

        return res.status(500).json({
          error: "DB Error"
        });

      }

      res.json(rows);

    }
  );

});


// ======================================
// ADD PRODUCT
// ======================================

app.post(
  "/products",
  upload.single("image"),
  (req, res) => {

    const {
      name,
      description,
      price,
      category,
      stock
    } = req.body;

    const image = req.file
      ? `/uploads/${req.file.filename}`
      : "";

    const sql = `
      INSERT INTO products
      (name, description, price, category, image, stock)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [
        name,
        description,
        price,
        category,
        image,
        stock
      ],
      (err, result) => {

        if (err) {

          console.log(err);

          return res.status(500).json({
            error: "Insert failed"
          });

        }

        res.json({
          message: "✅ Product Added"
        });

      }
    );

  }
);


// ======================================
// UPDATE PRODUCT
// ======================================

app.put("/products/:id", (req, res) => {

  const id = req.params.id;

  const {
    name,
    description,
    price,
    category,
    stock
  } = req.body;

  const sql = `
    UPDATE products
    SET
      name=?,
      description=?,
      price=?,
      category=?,
      stock=?
    WHERE id=?
  `;

  db.query(
    sql,
    [
      name,
      description,
      price,
      category,
      stock,
      id
    ],
    (err, result) => {

      if (err) {

        console.log(err);

        return res.status(500).json({
          error: "Update failed"
        });

      }

      res.json({
        message: "✅ Product Updated"
      });

    }
  );

});


// ======================================
// DELETE PRODUCT
// ======================================

app.delete("/products/:id", (req, res) => {

  const id = req.params.id;

  db.query(
    "DELETE FROM products WHERE id=?",
    [id],
    (err, result) => {

      if (err) {

        console.log(err);

        return res.status(500).json({
          error: "Delete failed"
        });

      }

      res.json({
        message: "✅ Product Deleted"
      });

    }
  );

});


// ======================================
// GET CATEGORIES
// ======================================

app.get("/categories", (req, res) => {

  db.query(
    "SELECT * FROM categories",
    (err, rows) => {

      if (err) {

        return res.status(500).json({
          error: "DB Error"
        });

      }

      res.json(rows);

    }
  );

});


// ======================================
// PRODUCT SEARCH
// ======================================

app.get("/search", (req, res) => {

  const q = req.query.q;

  db.query(
    "SELECT * FROM products WHERE name LIKE ?",
    [`%${q}%`],
    (err, rows) => {

      if (err) {

        return res.status(500).json({
          error: "Search error"
        });

      }

      res.json(rows);

    }
  );

});


// ======================================
// FILTER PRODUCTS
// ======================================

app.get("/filter/:category", (req, res) => {

  const category = req.params.category;

  db.query(
    "SELECT * FROM products WHERE category=?",
    [category],
    (err, rows) => {

      if (err) {

        return res.status(500).json({
          error: "Filter error"
        });

      }

      res.json(rows);

    }
  );

});


// ======================================
// ADD REVIEW
// ======================================

app.post("/reviews", (req, res) => {

  const {
    product_id,
    username,
    rating,
    review
  } = req.body;

  const sql = `
    INSERT INTO reviews
    (product_id, username, rating, review)
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      product_id,
      username,
      rating,
      review
    ],
    (err, result) => {

      if (err) {

        return res.status(500).json({
          error: "Review failed"
        });

      }

      res.json({
        message: "✅ Review Added"
      });

    }
  );

});


// ======================================
// GET REVIEWS
// ======================================

app.get("/reviews/:id", (req, res) => {

  const id = req.params.id;

  db.query(
    "SELECT * FROM reviews WHERE product_id=?",
    [id],
    (err, rows) => {

      if (err) {

        return res.status(500).json({
          error: "Review fetch failed"
        });

      }

      res.json(rows);

    }
  );

});

// ======================================
// METRICS ENDPOINT
// ======================================

app.get("/metrics", async (req, res) => {

  res.set("Content-Type", register.contentType);

  res.end(await register.metrics());

});

// ======================================
// SERVER
// ======================================

app.listen(8083, () => {

  console.log(
    "🚀 Product service running on 8083"
  );

});
