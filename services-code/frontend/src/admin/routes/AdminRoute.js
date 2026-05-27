import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {

  const token = localStorage.getItem("token");

  const role = localStorage.getItem("role");

  // =====================================
  // NOT LOGGED IN
  // =====================================

  if (!token) {

    return <Navigate to="/login" />;

  }

  // =====================================
  // NOT ADMIN
  // =====================================

  if (role !== "admin") {

    return <Navigate to="/home" />;

  }

  // =====================================
  // ADMIN ACCESS
  // =====================================

  return children;

}

export default AdminRoute;
