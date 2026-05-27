import {

  Link,
  useNavigate

} from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const user =
    localStorage.getItem("user");

  // ====================================
  // LOGOUT
  // ====================================

  const logout = () => {

    localStorage.clear();

    navigate("/");

  };

  return (

    <div
      style={{
        background: "#111827",
        color: "white",
        padding: "12px 30px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 1000
      }}
    >

      {/* LEFT */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "35px"
        }}
      >

        <h2
          style={{
            margin: 0
          }}
        >
          🛒 Jainee Shop
        </h2>

        <input
          type="text"
          placeholder="Search products..."
          style={{
            width: "500px",
            padding: "12px",
            borderRadius: "8px",
            border: "none",
            outline: "none"
          }}
        />

      </div>

      {/* RIGHT */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "25px",
          fontSize: "18px"
        }}
      >

        <Link
          to="/home"
          style={{
            color: "white",
            textDecoration: "none"
          }}
        >
          Home
        </Link>

        <Link
          to="/cart"
          style={{
            color: "white",
            textDecoration: "none",
            position: "relative"
          }}
        >
          🛒 Cart

          <span
            style={{
              position: "absolute",
              top: "-10px",
              right: "-15px",
              background: "red",
              borderRadius: "50%",
              width: "20px",
              height: "20px",
              fontSize: "12px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            0
          </span>

        </Link>

        <Link
          to="/orders"
          style={{
            color: "white",
            textDecoration: "none"
          }}
        >
          Orders
        </Link>

        <Link
          to="/profile"
          style={{
            color: "white",
            textDecoration: "none"
          }}
        >
          Profile
        </Link>

        <span>
          👋 {user}
        </span>

        <button
          onClick={logout}
          style={{
            background: "#f97316",
            color: "white",
            border: "none",
            padding: "10px 18px",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          Logout
        </button>

      </div>

    </div>

  );

}

export default Navbar;
