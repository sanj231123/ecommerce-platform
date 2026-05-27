const express = require("express");

const router = express.Router();

const {
  createProfile,
  getProfile,
  updateProfile,
} = require("../controllers/userController");

const authMiddleware = require("../middleware/authMiddleware");


// CREATE USER
router.post("/", createProfile);


// GET PROFILE
router.get("/profile", authMiddleware, getProfile);


// UPDATE PROFILE
router.put("/profile", authMiddleware, updateProfile);


module.exports = router;
