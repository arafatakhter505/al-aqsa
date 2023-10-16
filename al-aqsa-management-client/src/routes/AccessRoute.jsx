import { useContext } from "react";
import { AuthContext } from "../contextApi/UserContext";
import { Navigate, Outlet } from "react-router-dom";

const AccessRoute = () => {
  const { user } = useContext(AuthContext);
  const access =
    user.role === "Super Admin" ||
    user.role === "Admin" ||
    user.role === "Editor";
  return access ? <Outlet /> : <Navigate to={"/"} replace />;
};

export default AccessRoute;
