import { useContext } from "react";
import { AuthContext } from "../contextApi/UserContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { authUser } = useContext(AuthContext);

  return authUser?._id ? <Outlet /> : <Navigate to={"/login"} replace />;
};

export default ProtectedRoute;
