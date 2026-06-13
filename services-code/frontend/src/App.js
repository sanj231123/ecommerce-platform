import {

  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate

} from "react-router-dom";

import { useContext } from "react";

// ======================================
// PAGES
// ======================================

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Admin from "./pages/Admin";
import Profile from "./pages/Profile";
import Checkout from "./pages/Checkout";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailed from "./pages/PaymentFailed";

import CategoryProducts from "./pages/CategoryProducts";
import ProductDetails from "./pages/ProductDetails";

// ======================================
// ADMIN
// ======================================

import AdminOrders from "./admin/routes/AdminOrders";

// ======================================
// COMPONENTS
// ======================================

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

// ======================================
// CONTEXT
// ======================================

import { AuthContext } from "./context/AuthContext";

// ======================================
// LAYOUT
// ======================================

function Layout() {

  const location = useLocation();

  const {
    token,
    loading
  } = useContext(AuthContext);

  // ======================================
  // LOADING
  // ======================================

  if (loading) {

    return (

      <div
        style={{
          padding: "40px",
          fontSize: "22px"
        }}
      >
        Loading...
      </div>

    );

  }

  return (

    <>

      {/* NAVBAR */}

      {

        token &&

        location.pathname !== "/"

        &&

        location.pathname !== "/register"

        &&

        <Navbar />

      }

      <Routes>

        {/* LOGIN */}

        <Route
          path="/"
          element={<Login />}
        />

        {/* REGISTER */}

        <Route
          path="/register"
          element={<Register />}
        />

        {/* HOME */}

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* CATEGORY PRODUCTS */}

        <Route
          path="/category/:categoryName"
          element={
            <ProtectedRoute>
              <CategoryProducts />
            </ProtectedRoute>
          }
        />

        {/* PRODUCT DETAILS */}

        <Route
          path="/product/:id"
          element={
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          }
        />

        {/* CART */}

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />

        {/* ORDERS */}

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />

        {/* PROFILE */}

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* CHECKOUT */}

        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />

        {/* PAYMENT SUCCESS */}

        <Route
          path="/payment-success"
          element={
            <ProtectedRoute>
              <PaymentSuccess />
            </ProtectedRoute>
          }
        />

        {/* PAYMENT FAILED */}

        <Route
          path="/payment-failed"
          element={
            <ProtectedRoute>
              <PaymentFailed />
            </ProtectedRoute>
          }
        />

        {/* ADMIN */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly={true}>
              <Admin />
            </ProtectedRoute>
          }
        />

        {/* ADMIN ORDERS */}

        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminOrders />
            </ProtectedRoute>
          }
        />

        {/* INVALID */}

        <Route
          path="*"
          element={<Navigate to="/" />}
        />

      </Routes>

    </>

  );

}

// ======================================
// APP
// ======================================

function App() {

  return (

    <BrowserRouter>

      <Layout />

    </BrowserRouter>

  );

}

export default App;
// ci test Wednesday 10 June 2026 02:15:35 PM IST
