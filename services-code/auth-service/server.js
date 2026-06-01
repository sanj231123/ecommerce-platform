const express = require("express");
const jwt = require("jsonwebtoken");
const mysql = require("mysql2");

const {
  register,
  httpRequestDurationMicroseconds,
} = require("./metrics");

const app = express();

app.use(express.json());

// ======================================
// METRICS MIDDLEWARE
// ======================================

app.use((req, res, next) => {

  const start = Date.now();

  res.on("finish", () => {

    const duration = Date.now() - start;

    httpRequestDurationMicroseconds
      .labels(
        req.method,
        req.route?.path || req.path,
        res.statusCode
      )
      .observe(duration);

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
  waitForConnections: true,
  connectionLimit: 10
});

// ======================================
// DB CHECK
// ======================================

function checkDB() {

  db.getConnection((err, conn) => {

    if (err) {

      console.log("❌ DB not ready...");
      setTimeout(checkDB, 5000);

    } else {

      console.log("✅ MySQL Connected");

      conn.release();

    }

  });

}

checkDB();

// ======================================
// ROOT
// ======================================

app.get("/", (req, res) => {

  res.send("Auth Service Running");

});

// ======================================
// HEALTH CHECK
// ======================================

app.get("/health", (req, res) => {

  res.status(200).json({
    status: "UP",
    service: "auth-service"
  });

});

// ======================================
// REGISTER
// ======================================

app.post("/register", (req, res) => {

  let {
    name,
    email,
    mobile,
    password
  } = req.body;

  // REMOVE EXTRA SPACES

  name = name?.trim();
  email = email?.trim();
  mobile = mobile?.trim();
  password = password?.trim();

  // VALIDATION

  if (!name || !email || !mobile || !password) {

    return res.status(400).json({
      success: false,
      message: "All fields required"
    });

  }

  // CHECK EXISTING USER

  db.query(

    "SELECT * FROM users WHERE email=? OR mobile=?",

    [email, mobile],

    (checkErr, checkResult) => {

      if (checkErr) {

        console.log(checkErr);

        return res.status(500).json({
          success: false,
          message: "Database error"
        });

      }

      // USER EXISTS

      if (checkResult.length > 0) {

        return res.status(400).json({
          success: false,
          message: "Email or mobile already exists"
        });

      }

      // INSERT USER

      db.query(

        `
        INSERT INTO users
        (name, email, mobile, password, role)
        VALUES (?, ?, ?, ?, ?)
        `,

        [
          name,
          email,
          mobile,
          password,
          "user"
        ],

        (err, result) => {

          if (err) {

            console.log(err);

            return res.status(500).json({
              success: false,
              message: "Register failed"
            });

          }

          res.json({
            success: true,
            message: "User registered successfully"
          });

        }

      );

    }

  );

});

// ======================================
// LOGIN
// ======================================

app.post("/login", (req, res) => {

  let {
    email,
    password
  } = req.body;

  // REMOVE EXTRA SPACES

  email = email?.trim();
  password = password?.trim();

  // VALIDATION

  if (!email || !password) {

    return res.status(400).json({
      success: false,
      message: "Missing credentials"
    });

  }

  // FIND USER

  db.query(

    `
    SELECT * FROM users
    WHERE email=? OR mobile=?
    `,

    [
      email,
      email
    ],

    (err, result) => {

      if (err) {

        console.log(err);

        return res.status(500).json({
          success: false,
          message: "Database error"
        });

      }

      // USER NOT FOUND

      if (result.length === 0) {

        return res.status(401).json({
          success: false,
          message: "Invalid credentials"
        });

      }

      const user = result[0];

      // PASSWORD CHECK

      if (user.password !== password) {

        return res.status(401).json({
          success: false,
          message: "Invalid credentials"
        });

      }

      // JWT TOKEN

      const token = jwt.sign(

        {
          id: user.id,
          email: user.email,
          role: user.role
        },

        "secret123",

        {
          expiresIn: "1h"
        }

      );

      // SUCCESS RESPONSE

      res.json({

        success: true,

        message: "Login successful",

        token,

        role: user.role,

        email: user.email,

        mobile: user.mobile,

        name: user.name

      });

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
// START SERVER
// ======================================

app.listen(8081, () => {

  console.log("=====================================");
  console.log("🚀 Auth Service Running");
  console.log("PORT : 8081");
  console.log("=====================================");

});

