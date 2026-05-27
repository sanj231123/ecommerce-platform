import API from "../services/axios";

import {
  useEffect,
  useState,
  useCallback
} from "react";

import { useNavigate } from "react-router-dom";

function Cart() {

  const navigate = useNavigate();

  const [cart, setCart] = useState([]);

  const [loading, setLoading] =
    useState(false);

  const user =
    localStorage.getItem("user");

  const token =
    localStorage.getItem("token");

  // =====================================
  // LOAD CART
  // =====================================

  const loadCart = useCallback(
    async () => {

      if (!user || !token) {
        return;
      }

      try {

        setLoading(true);

        const res = await API.get(

          `/cart/${user}`,

          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }

        );

        setCart(res.data || []);

      } catch (err) {

        console.error(

          "CART LOAD ERROR:",

          err.response?.data ||

          err.message

        );

        alert(
          err.response?.data?.message ||
          "Cart load failed"
        );

      } finally {

        setLoading(false);

      }

    },

    [user, token]

  );

  useEffect(() => {

    loadCart();

  }, [loadCart]);

  // =====================================
  // REMOVE ITEM
  // =====================================

  const removeItem = async (id) => {

    try {

      await API.delete(

        `/cart/remove/${id}`,

        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }

      );

      setCart((prev) =>

        prev.filter(
          (item) => item.id !== id
        )

      );

    } catch (err) {

      console.error(

        "REMOVE ERROR:",

        err.response?.data ||

        err.message

      );

      alert(
        err.response?.data?.message ||
        "Remove failed"
      );

    }

  };

  // =====================================
  // TOTAL
  // =====================================

  const total = cart.reduce(

    (sum, item) =>

      sum + Number(item.price || 0),

    0

  );

  // =====================================
  // CHECKOUT
  // =====================================

  const checkout = () => {

    localStorage.setItem(
      "cartTotal",
      total
    );

    navigate("/checkout");

  };

  // =====================================
  // UI
  // =====================================

  return (

    <div
      style={{
        padding: "20px",
        background: "#f1f3f6",
        minHeight: "100vh"
      }}
    >

      <h2>🛒 Your Cart</h2>

      {loading && (
        <p>Loading cart...</p>
      )}

      {!loading &&
        cart.length === 0 && (
          <p>No items in cart</p>
      )}

      {cart.map((c) => (

        <div
          key={c.id}
          style={{
            border: "1px solid #ddd",
            padding: "15px",
            marginBottom: "15px",
            borderRadius: "10px",
            background: "white",
            boxShadow:
              "0 2px 5px rgba(0,0,0,0.1)"
          }}
        >

          {/* IMAGE */}

          {c.image && (

            <img
              src={c.image}
              alt={c.name}
              style={{
                width: "120px",
                height: "120px",
                objectFit: "cover",
                borderRadius: "8px",
                marginBottom: "10px"
              }}
            />

          )}

          {/* NAME */}

          <h3>{c.name}</h3>

          {/* CATEGORY */}

          <p>
            <b>Category:</b>
            {" "}
            {c.category}
          </p>

          {/* DESCRIPTION */}

          <p>
            {c.description}
          </p>

          {/* PRICE */}

          <h3
            style={{
              color: "green"
            }}
          >
            ₹{c.price}
          </h3>

          {/* REMOVE */}

          <button

            onClick={() =>
              removeItem(c.id)
            }

            style={{
              background: "red",
              color: "white",
              border: "none",
              padding: "8px 14px",
              borderRadius: "5px",
              cursor: "pointer"
            }}

          >

            Remove

          </button>

        </div>

      ))}

      {/* TOTAL */}

      {cart.length > 0 && (

        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "10px",
            marginTop: "20px"
          }}
        >

          <h2>
            Total: ₹{total}
          </h2>

          <button

            onClick={checkout}

            style={{
              background: "green",
              color: "white",
              padding: "12px 20px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              marginTop: "10px",
              fontSize: "16px"
            }}

          >

            Proceed To Payment

          </button>

        </div>

      )}

    </div>

  );

}

export default Cart;
