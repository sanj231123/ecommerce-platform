const express = require("express");

const router = express.Router();

const {

  createPayment,

  verifyPayment,

  getPaymentStatus,

} = require(
  "../controllers/paymentController"
);

const authMiddleware =
  require(
    "../middleware/authMiddleware"
  );


// =====================================
// CREATE RAZORPAY PAYMENT ORDER
// =====================================

router.post(

  "/create",

  authMiddleware,

  createPayment

);


// =====================================
// VERIFY PAYMENT
// =====================================

router.post(

  "/verify",

  authMiddleware,

  verifyPayment

);


// =====================================
// GET PAYMENT STATUS
// =====================================

router.get(

  "/status/:id",

  authMiddleware,

  getPaymentStatus

);


module.exports = router;
