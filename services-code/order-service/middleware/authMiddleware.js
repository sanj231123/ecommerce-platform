const jwt = require("jsonwebtoken");

// ===============================
// VERIFY JWT TOKEN
// ===============================
const protect = (req, res, next) => {

  let token;

  // Bearer TOKEN
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {

    try {

      token = req.headers.authorization.split(" ")[1];

      // VERIFY TOKEN
      const decoded = jwt.verify(token, "secret123");

      // SAVE USER
      req.user = decoded;

      next();

    } catch (error) {

      console.log("JWT ERROR:", error.message);

      return res.status(401).json({
        message: "Invalid token"
      });
    }

  }

  if (!token) {
    return res.status(401).json({
      message: "No token provided"
    });
  }
};

// ===============================
// ADMIN ONLY
// ===============================
const adminOnly = (req, res, next) => {

  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({
      message: "Admin access only"
    });
  }
};

module.exports = {
  protect,
  adminOnly
};
