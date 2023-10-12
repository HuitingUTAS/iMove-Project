import React from "react";
import { Navigate, Route } from "react-router-dom";

function ProtectedRoute({ element, allowedRoles }) {
  const userRole = localStorage.getItem("role");

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/error" />;
  }

  return <Route element={element} />;
}

export default ProtectedRoute;
