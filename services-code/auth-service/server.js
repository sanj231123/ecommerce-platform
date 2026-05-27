const express = require("express");
const jwt = require("jsonwebtoken");
const mysql = require("mysql2");

const app = express();

app.use(express.json());

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
// REGISTER
// ======================================

app.post("/register", (req, res) => {

  const {
    name,
    email,
    mobile,
    password
  } = req.body;

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

  const {
    email,
    password
  } = req.body;

  if (!email || !password) {

    return res.status(400).json({
      success: false,
      message: "Missing credentials"
    });

  }

  // LOGIN USING EMAIL OR MOBILE

  db.query(

    `
    SELECT * FROM users
    WHERE (email=? OR mobile=?)
    AND password=?
    `,

    [
      email,
      email,
      password
    ],

    (err, result) => {

      if (err) {

        console.log(err);

        return res.status(500).json({
          success: false,
          message: "Database error"
        });

      }

      if (result.length === 0) {

        return res.status(401).json({
          success: false,
          message: "Invalid credentials"
        });

      }

      const user = result[0];

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
// START SERVER
// ======================================

app.listen(8081, () => {

  console.log("=====================================");
  console.log("🚀 Auth Service Running");
  console.log("PORT : 8081");
  console.log("=====================================");

});
