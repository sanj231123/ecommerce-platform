require("dotenv").config();

const express = require("express");
const cors = require("cors");

const { connectDB, sequelize } = require("./config/db");

const app = express();


// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.use("/api/users", require("./routes/userRoutes"));


// Health Route
app.get("/", (req, res) => {
  res.send("User Service Running...");
});


// Start Server
const startServer = async () => {
  try {

    // Database Connect
    await connectDB();

    // Sync Tables
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
