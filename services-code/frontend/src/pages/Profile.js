import { useEffect, useState } from "react";

import {
  getProfile,
  updateProfile
} from "../services/authService";

function Profile() {

  const [form, setForm] = useState({

    name: "",

    email: "",

    phone: "",

    address: "",

  });

  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  // ===========================
  // LOAD PROFILE
  // ===========================

  useEffect(() => {

    if (token) {

      fetchProfile();

    }

  }, [token]);

  const fetchProfile = async () => {

    try {

      console.log(
        "TOKEN:",
        token
      );

      const res = await getProfile(token);

      console.log(
        "PROFILE RESPONSE:",
        res.data
      );

      setForm({

        name: res.data.name || "",

        email: res.data.email || "",

        phone: res.data.phone || "",

        address: res.data.address || "",

      });

    } catch (err) {

      console.log(

        "Profile Load Error:",

        err.response?.data || err.message

      );

    }

  };

  // ===========================
  // HANDLE INPUT
  // ===========================

  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]: e.target.value,

    });

  };

  // ===========================
  // UPDATE PROFILE
  // ===========================

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      console.log(
        "UPDATE DATA:",
        form
      );

      await updateProfile(form, token);

      setMessage(
        "✅ Profile Updated Successfully"
      );

    } catch (err) {

      console.log(

        "Profile Update Error:",

        err.response?.data || err.message

      );

      setMessage(
        "❌ Profile Update Failed"
      );

    }

  };

  return (

    <div
      style={{
        padding: "20px"
      }}
    >

      <h2>User Profile</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          style={{
            width: "300px",
            padding: "10px"
          }}
        />

        <br /><br />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          disabled
          style={{
            width: "300px",
            padding: "10px"
          }}
        />

        <br /><br />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          style={{
            width: "300px",
            padding: "10px"
          }}
        />

        <br /><br />

        <textarea
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          style={{
            width: "300px",
            height: "100px",
            padding: "10px"
          }}
        />

        <br /><br />

        <button
          type="submit"
          style={{
            background: "#2563eb",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Update Profile
        </button>

      </form>

      <p
        style={{
          marginTop: "20px",
          fontWeight: "bold"
        }}
      >
        {message}
      </p>

    </div>

  );

}

export default Profile;
