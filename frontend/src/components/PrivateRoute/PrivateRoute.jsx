import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children, isAuth, path, protect }) => {
  let location = useLocation();

  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
