import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const UserContext = ({ children }) => {
  const getUser = localStorage.getItem("user");
  const [user, setUser] = useState(JSON.parse(getUser));
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    setUser(JSON.parse(getUser));
  }, [getUser]);

  const authInfo = { user, setUser, authLoading, setAuthLoading };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default UserContext;
