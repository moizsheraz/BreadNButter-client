import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    let User = JSON.parse(localStorage.getItem("breadUser"));
    if (User) {
      if (User.role === "admin") {
        setIsAdmin(true);
      }
    }
  }, []);
  // Replace `localStorage.getItem("userRole") === 'admin'` with your admin checking logic (e.g., context)

  return isAdmin ? children : <Navigate to="/" />;
};

export default AdminRoute;
