import React from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useCookies } from "react-cookie";

const RequireAuth = ({allowedRoles}) => {
  const [cookies] = useCookies();
  const location = useLocation();
  const user = cookies.user;
  return user?.roles.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : user ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
