require("dotenv").config();

const express = require("express");
const cors = require("cors");

const { connectDB, sequelize } = require("./config/db");

const {
  register,
  httpRequestsTotal
} = require("./metrics/metrics");

const app = express();


// Middleware
app.use(cors());
app.use(express.json());


// Metrics Middleware
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


// Routes
app.use("/api/users", require("./routes/userRoutes"));


// Health Route
app.get("/", (req, res) => {
  res.send("User Service Running...");
});

// Kubernetes Health Check
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "UP",
    service: "user-service",
    version: "v7"	  
  });
});

// Metrics Endpoint
app.get("/metrics", async (req, res) => {

  res.set("Content-Type", register.contentType);

  res.end(await register.metrics());

});


// Start Server
const startServer = async () => {

  try {

    await connectDB();

    await sequelize.sync();

    console.log("✅ Database Synced");

    const PORT = process.env.PORT || 5006;

    app.listen(PORT, () => {
      console.log(`🚀 User Service running on port ${PORT}`);
    });

  } catch (error) {

    console.log("❌ Server Error:", error.message);

  }
};

startServer();
