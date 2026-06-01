const express = require("express");
const cors = require("cors");
const axios = require("axios");
const promBundle = require("express-prom-bundle");

const app = express();

app.use(cors());
app.use(express.json());

// ======================================
// PROMETHEUS METRICS
// ======================================

const metricsMiddleware = promBundle({
  includeMethod: true,
  includePath: true,
  includeStatusCode: true,

  promClient: {
    collectDefaultMetrics: {}
  }
});

app.use(metricsMiddleware);

// ======================================
// SERVICE URLS
// ======================================

const AUTH_URL = "http://auth-service:8081";
const PRODUCT_URL = "http://product-service:8083";
const CART_URL = "http://cart-service:8085";
const ORDER_URL = "http://order-service:8086";
const USER_URL = "http://user-service:5006";
const PAYMENT_URL = "http://payment-service:5007";

// ======================================
// ROOT
// ======================================

app.get("/", (req, res) => {

  res.json({
    service: "API Gateway",
    status: "RUNNING"
  });

});

// ======================================
// HEALTH CHECK
// ======================================

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "UP",
    service: "api-gateway"
  });
});

// ======================================
// AUTH SERVICE
// ======================================

// LOGIN
app.post("/api/auth/login", async (req, res) => {

  try {

    const response = await axios.post(
      `${AUTH_URL}/login`,
      req.body
    );

    res.json(response.data);

  } catch (err) {

    console.error(err.response?.data || err.message);

    res.status(err.response?.status || 500).json(
      err.response?.data || {
        success: false,
        message: "Login failed"
      }
    );

  }

});

// REGISTER
app.post("/api/auth/register", async (req, res) => {

  try {

    const response = await axios.post(
      `${AUTH_URL}/register`,
      req.body
    );

    res.json(response.data);

  } catch (err) {

    console.error(err.response?.data || err.message);

    res.status(err.response?.status || 500).json(
      err.response?.data || {
        success: false,
        message: "Register failed"
      }
    );

  }

});

// ======================================
// PRODUCTS
// ======================================

// GET PRODUCTS
app.get("/api/products", async (req, res) => {

  try {

    const response = await axios.get(
      `${PRODUCT_URL}/products`
    );

    res.json(response.data);

  } catch (err) {

    console.error(err.response?.data || err.message);

    res.status(err.response?.status || 500).json({
      success: false,
      message: "Fetch products failed"
    });

  }

});

// ADD PRODUCT
app.post("/api/products", async (req, res) => {

  try {

    const response = await axios.post(
      `${PRODUCT_URL}/products`,
      req.body
    );

    res.json(response.data);

  } catch (err) {

    console.error(err.response?.data || err.message);

    res.status(err.response?.status || 500).json({
      success: false,
      message: "Add product failed"
    });

  }

});

// UPDATE PRODUCT
app.put("/api/products/:id", async (req, res) => {

  try {

    const response = await axios.put(
      `${PRODUCT_URL}/products/${req.params.id}`,
      req.body
    );

    res.json(response.data);

  } catch (err) {

    console.error(err.response?.data || err.message);

    res.status(err.response?.status || 500).json({
      success: false,
      message: "Update product failed"
    });

  }

});

// DELETE PRODUCT
app.delete("/api/products/:id", async (req, res) => {

  try {

    const response = await axios.delete(
      `${PRODUCT_URL}/products/${req.params.id}`
    );

    res.json(response.data);

  } catch (err) {

    console.error(err.response?.data || err.message);

    res.status(err.response?.status || 500).json({
      success: false,
      message: "Delete product failed"
    });

  }

});

// ======================================
// CART
// ======================================

app.post("/api/cart", async (req, res) => {

  try {

    const response = await axios.post(
      `${CART_URL}/add`,
      req.body,
      {
        headers: {
          Authorization: req.headers.authorization
        }
      }
    );

    res.json(response.data);

  } catch (err) {

    console.error(err.response?.data || err.message);

    res.status(err.response?.status || 500).json(
      err.response?.data || {
        success: false,
        message: "Cart add failed"
      }
    );

  }

});

app.get("/api/cart/:email", async (req, res) => {

  try {

    const response = await axios.get(
      `${CART_URL}/${req.params.email}`,
      {
        headers: {
          Authorization: req.headers.authorization
        }
      }
    );

    res.json(response.data);

  } catch (err) {

    console.error(err.response?.data || err.message);

    res.status(err.response?.status || 500).json(
      err.response?.data || {
        success: false,
        message: "Cart fetch failed"
      }
    );

  }

});

app.delete("/api/cart/remove/:id", async (req, res) => {

  try {

    const response = await axios.delete(
      `${CART_URL}/remove/${req.params.id}`,
      {
        headers: {
          Authorization: req.headers.authorization
        }
      }
    );

    res.json(response.data);

  } catch (err) {

    console.error(err.response?.data || err.message);

    res.status(err.response?.status || 500).json(
      err.response?.data || {
        success: false,
        message: "Cart remove failed"
      }
    );

  }

});

// ======================================
// ORDERS
// ======================================

app.post("/api/orders/place", async (req, res) => {

  try {

    const response = await axios.post(
      `${ORDER_URL}/api/orders/place`,
      req.body,
      {
        headers: {
          Authorization: req.headers.authorization
        }
      }
    );

    res.json(response.data);

  } catch (err) {

    console.error(err.response?.data || err.message);

    res.status(err.response?.status || 500).json(
      err.response?.data || {
        success: false,
        message: "Order failed"
      }
    );

  }

});

app.get("/api/orders/user", async (req, res) => {

  try {

    const response = await axios.get(
      `${ORDER_URL}/api/orders/user`,
      {
        headers: {
          Authorization: req.headers.authorization
        }
      }
    );

    res.json(response.data);

  } catch (err) {

    console.error(err.response?.data || err.message);

    res.status(err.response?.status || 500).json(
      err.response?.data || {
        success: false,
        message: "Orders fetch failed"
      }
    );

  }

});

// ======================================
// ADMIN
// ======================================

app.get("/api/admin/orders", async (req, res) => {

  try {

    const response = await axios.get(
      `${ORDER_URL}/api/admin/orders`,
      {
        headers: {
          Authorization: req.headers.authorization
        }
      }
    );

    res.json(response.data);

  } catch (err) {

    console.error(err.response?.data || err.message);

    res.status(err.response?.status || 500).json(
      err.response?.data || {
        success: false,
        message: "Admin orders failed"
      }
    );

  }

});

app.put("/api/admin/orders/:id", async (req, res) => {

  try {

    const response = await axios.put(
      `${ORDER_URL}/api/admin/orders/${req.params.id}`,
      req.body,
      {
        headers: {
          Authorization: req.headers.authorization
        }
      }
    );

    res.json(response.data);

  } catch (err) {

    console.error(err.response?.data || err.message);

    res.status(err.response?.status || 500).json(
      err.response?.data || {
        success: false,
        message: "Order update failed"
      }
    );

  }

});

// ======================================
// USER PROFILE
// ======================================

app.get("/api/users/profile", async (req, res) => {

  try {

    const response = await axios.get(
      `${USER_URL}/api/users/profile`,
      {
        headers: {
          Authorization: req.headers.authorization
        }
      }
    );

    res.json(response.data);

  } catch (err) {

    console.error(err.response?.data || err.message);

    res.status(err.response?.status || 500).json(
      err.response?.data || {
        success: false,
        message: "Profile fetch failed"
      }
    );

  }

});

app.put("/api/users/profile", async (req, res) => {

  try {

    const response = await axios.put(
      `${USER_URL}/api/users/profile`,
      req.body,
      {
        headers: {
          Authorization: req.headers.authorization
        }
      }
    );

    res.json(response.data);

  } catch (err) {

    console.error(err.response?.data || err.message);

    res.status(err.response?.status || 500).json(
      err.response?.data || {
        success: false,
        message: "Profile update failed"
      }
    );

  }

});

// ======================================
// PAYMENT
// ======================================

app.post("/api/payment/create", async (req, res) => {

  try {

    const response = await axios.post(
      `${PAYMENT_URL}/api/payment/create`,
      req.body,
      {
        headers: {
          Authorization: req.headers.authorization
        }
      }
    );

    res.json(response.data);

  } catch (err) {

    console.error(err.response?.data || err.message);

    res.status(err.response?.status || 500).json(
      err.response?.data || {
        success: false,
        message: "Payment create failed"
      }
    );

  }

});

app.post("/api/payment/verify", async (req, res) => {

  try {

    const response = await axios.post(
      `${PAYMENT_URL}/api/payment/verify`,
      req.body,
      {
        headers: {
          Authorization: req.headers.authorization
        }
      }
    );

    res.json(response.data);

  } catch (err) {

    console.error(err.response?.data || err.message);

    res.status(err.response?.status || 500).json(
      err.response?.data || {
        success: false,
        message: "Payment verify failed"
      }
    );

  }

});

// ======================================
// 404
// ======================================

app.use((req, res) => {

  res.status(404).json({
    success: false,
    message: "Route not found"
  });

});

// ======================================
// START SERVER
// ======================================

const PORT = 8080;

app.listen(PORT, () => {

  console.log("=====================================");
  console.log("🚀 API Gateway Running");
  console.log(`PORT : ${PORT}`);
  console.log("=====================================");

});

