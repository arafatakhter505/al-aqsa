import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contextApi/UserContext";
import { Navigate, Outlet } from "react-router-dom";
import { PreLoader } from "../components";

const ProtectedRoute = () => {
  const { authUser, user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return isLoading ? (
    <PreLoader />
  ) : authUser?._id && user?._id === authUser?._id && !user?.isBlocked ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} replace />
  );
};

export default ProtectedRoute;
