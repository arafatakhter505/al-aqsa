import { useContext } from "react";
import { AuthContext } from "../contextApi/UserContext";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const { user } = useContext(AuthContext);

  return user?.role === "Admin" || user?.role === "Super Admin" ? (
    <Outlet />
  ) : (
    <Navigate to={"/"} replace />
  );
};

export default AdminRoute;
