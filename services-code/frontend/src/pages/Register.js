import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { registerUser } from "../services/authService";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({

    name: "",
    email: "",
    mobile: "",
    password: ""

  });

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const [loading, setLoading] = useState(false);

  // =====================================
  // HANDLE CHANGE
  // =====================================

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    });

  };

  // =====================================
  // REGISTER
  // =====================================

  const handleRegister = async () => {

    setError("");
    setSuccess("");

    const {
      name,
      email,
      mobile,
      password
    } = formData;

    if (
      !name ||
      !email ||
      !mobile ||
      !password
    ) {

      setError("Please fill all fields");

      return;

    }

    try {

      setLoading(true);

      const res = await registerUser(formData);

      console.log(res.data);

      setSuccess("Registration successful");

      setTimeout(() => {

        navigate("/");

      }, 1500);

    } catch (err) {

      console.log(err);

      setError(

        err.response?.data?.message ||

        "Registration failed"

      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#0a3d7a"
      }}
    >

      <div
        style={{
          width: "420px",
          background: "white",
          padding: "40px",
          borderRadius: "10px"
        }}
      >

        <h1
          style={{
            textAlign: "center",
            marginBottom: "20px",
            color: "#0a3d7a"
          }}
        >
          Create Account
        </h1>

        {

          error && (

            <div
              style={{
                color: "red",
                marginBottom: "15px",
                textAlign: "center"
              }}
            >
              {error}
            </div>

          )

        }

        {

          success && (

            <div
              style={{
                color: "green",
                marginBottom: "15px",
                textAlign: "center"
              }}
            >
              {success}
            </div>

          )

        }

        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="text"
          name="mobile"
          placeholder="Enter Mobile"
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          onChange={handleChange}
          style={inputStyle}
        />

        <button
          onClick={handleRegister}
          style={buttonStyle}
        >

          {

            loading
              ? "Registering..."
              : "Register"

          }

        </button>

        <div
          style={{
            marginTop: "20px",
            textAlign: "center"
          }}
        >

          Already have account?

          <Link
            to="/"
            style={{
              marginLeft: "5px",
              color: "#0a3d7a",
              fontWeight: "bold"
            }}
          >
            Login
          </Link>

        </div>

      </div>

    </div>

  );

}

const inputStyle = {

  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  border: "1px solid #ccc",
  borderRadius: "5px"

};

const buttonStyle = {

  width: "100%",
  padding: "14px",
  background: "#0a3d7a",
  color: "white",
  border: "none",
  borderRadius: "5px",
  fontWeight: "bold",
  cursor: "pointer"

};

export default Register;

