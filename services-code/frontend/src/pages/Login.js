import {

  useState,
  useEffect

} from "react";

import {

  useNavigate,
  Link

} from "react-router-dom";

import {

  loginUser

} from "../services/authService";

// ====================================
// LOCAL IMAGES
// ====================================

import login1 from "../assets/login1.jpg";
import login2 from "../assets/login2.jpg";
import login3 from "../assets/login3.jpg";

function Login() {

  const navigate = useNavigate();

  // ====================================
  // STATE
  // ====================================

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  // ====================================
  // IMAGE SLIDER
  // ====================================

  const images = [

    login1,
    login2,
    login3

  ];

  const [currentImage, setCurrentImage] =
    useState(0);

  useEffect(() => {

    const interval = setInterval(() => {

      setCurrentImage((prev) =>

        prev === images.length - 1

          ? 0

          : prev + 1

      );

    }, 3500);

    return () =>
      clearInterval(interval);

  }, []);

  // ====================================
  // LOGIN
  // ====================================

  const handleLogin = async () => {

    setError("");

    if (!email || !password) {

      setError(
        "Please enter email and password"
      );

      return;

    }

    try {

      setLoading(true);

      const res = await loginUser({

        email,
        password

      });

      if (!res.data.token) {

        setError(
          "Invalid login"
        );

        return;

      }

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",
        res.data.email
      );

      localStorage.setItem(
        "role",
        res.data.role
      );

      if (res.data.role === "admin") {

        navigate("/admin");

      } else {

        navigate("/home");

      }

    } catch (err) {

      setError(

        err.response?.data?.message ||

        "Login Failed"

      );

    } finally {

      setLoading(false);

    }

  };

  // ====================================
  // UI
  // ====================================

  return (

    <div
      style={{
        minHeight: "100vh",
        background: "#e5e7eb",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px"
      }}
    >

      {/* MAIN CARD */}

      <div
        style={{
          width: "1250px",
          minHeight: "720px",
          background: "white",
          borderRadius: "25px",
          overflow: "hidden",
          display: "flex",
          boxShadow:
            "0 15px 40px rgba(0,0,0,0.2)"
        }}
      >

        {/* LEFT SIDE */}

        <div
          style={{
            flex: 1,
            position: "relative",
            backgroundImage:
              `url(${images[currentImage]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transition:
              "all 1s ease"
          }}
        >

          {/* OVERLAY */}

          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom right, rgba(0,0,0,0.55), rgba(37,99,235,0.45))"
            }}
          />

          {/* TEXT */}

          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
              textAlign: "center",
              padding: "40px"
            }}
          >

            <h1
              style={{
                fontSize: "76px",
                fontWeight: "bold",
                lineHeight: "90px",
                marginBottom: "30px"
              }}
            >
              Jainee
              <br />
              Online Shop
            </h1>

            <p
              style={{
                fontSize: "30px",
                lineHeight: "48px",
                maxWidth: "600px"
              }}
            >
              Fashion, Mobiles,
              Laptops, Electronics
              & Premium Shopping
              Experience.
            </p>

          </div>

        </div>

        {/* RIGHT SIDE */}

        <div
          style={{
            width: "430px",
            background: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "50px"
          }}
        >

          <div
            style={{
              width: "100%"
            }}
          >

            {/* TITLE */}

            <h1
              style={{
                textAlign: "center",
                fontSize: "52px",
                color: "#111827",
                marginBottom: "12px"
              }}
            >
              Login
            </h1>

            <p
              style={{
                textAlign: "center",
                color: "#6b7280",
                marginBottom: "40px",
                fontSize: "18px"
              }}
            >
              Continue your shopping
            </p>

            {/* ERROR */}

            {

              error && (

                <div
                  style={{
                    background: "#fee2e2",
                    color: "#dc2626",
                    padding: "14px",
                    borderRadius: "10px",
                    marginBottom: "20px",
                    textAlign: "center"
                  }}
                >
                  {error}
                </div>

              )

            }

            {/* EMAIL */}

            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              style={{
                width: "100%",
                padding: "16px",
                borderRadius: "10px",
                border:
                  "1px solid #d1d5db",
                marginBottom: "20px",
                fontSize: "16px",
                outline: "none"
              }}
            />

            {/* PASSWORD */}

            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              style={{
                width: "100%",
                padding: "16px",
                borderRadius: "10px",
                border:
                  "1px solid #d1d5db",
                marginBottom: "12px",
                fontSize: "16px",
                outline: "none"
              }}
            />

            {/* FORGOT PASSWORD */}

            <div
              style={{
                textAlign: "right",
                marginBottom: "25px"
              }}
            >

              <span
                style={{
                  color: "#2563eb",
                  cursor: "pointer",
                  fontSize: "14px"
                }}
              >
                Forgot Password?
              </span>

            </div>

            {/* LOGIN BUTTON */}

            <button
              onClick={handleLogin}
              disabled={loading}
              style={{
                width: "100%",
                background:
                  "linear-gradient(to right,#2563eb,#1d4ed8)",
                color: "white",
                padding: "16px",
                border: "none",
                borderRadius: "10px",
                fontSize: "18px",
                fontWeight: "bold",
                cursor: "pointer"
              }}
            >

              {

                loading

                  ? "Logging in..."

                  : "Login"

              }

            </button>

            {/* REGISTER */}

            <div
              style={{
                marginTop: "30px",
                textAlign: "center",
                fontSize: "16px"
              }}
            >

              <span>
                Don't have an account?
              </span>

              <Link
                to="/register"
                style={{
                  marginLeft: "8px",
                  color: "#2563eb",
                  fontWeight: "bold",
                  textDecoration: "none"
                }}
              >
                Register
              </Link>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Login;
