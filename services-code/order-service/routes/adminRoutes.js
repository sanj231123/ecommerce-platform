const express = require("express");

const router = express.Router();

const {

  getAllOrders,

  updateOrderStatus

} = require(
  "../controllers/adminControllers"
);


// =====================================
// ADMIN ALL ORDERS
// =====================================

router.get(

  "/orders",

  getAllOrders

);


// =====================================
// UPDATE ORDER STATUS
// =====================================

router.put(

  "/orders/:id",

  updateOrderStatus

);


module.exports = router;
