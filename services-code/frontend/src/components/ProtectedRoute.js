import {

  Navigate

} from "react-router-dom";

import {

  useContext

} from "react";

import {

  AuthContext

} from "../context/AuthContext";

function ProtectedRoute({

  children,

  adminOnly = false

}) {

  // =====================================
  // AUTH CONTEXT
  // =====================================

  const {

    token,

    role,

    loading

  } = useContext(
    AuthContext
  );

  // =====================================
  // LOADING
  // =====================================

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

  // =====================================
  // NOT LOGGED IN
  // =====================================

  if (!token) {

    return (
      <Navigate to="/login" />
    );

  }

  // =====================================
  // ADMIN PROTECTION
  // =====================================

  if (

    adminOnly &&

    role !== "admin"

  ) {

    return (
      <Navigate to="/" />
    );

  }

  // =====================================
  // AUTHORIZED
  // =====================================

  return children;

}

export default ProtectedRoute;
