import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const PublicRoutes = ({ children, isAuth }) => {
  let location = useLocation();

  if (isAuth) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default PublicRoutes;
