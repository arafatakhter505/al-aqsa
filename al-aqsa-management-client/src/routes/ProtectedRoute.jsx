import { useContext } from "react";
import { AuthContext } from "../contextApi/UserContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  return user?._id ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
