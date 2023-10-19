import { createContext, useEffect, useState } from "react";
import dev from "../config";

export const AuthContext = createContext();

const UserContext = ({ children }) => {
  const getUser = localStorage.getItem("user");
  const [authUser, setAuthUser] = useState(
    JSON.parse(getUser || JSON.stringify({}))
  );
  const [authStateChange, setAuthStateChange] = useState(null);
  const [user, setUser] = useState({});

  useEffect(() => {
    setAuthUser(JSON.parse(getUser || JSON.stringify({})));
    fetch(`${dev.serverUrl}/api/users/${authUser?._id}`, {
      headers: {
        authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user"))?.token
        }`,
      },
    })
      .then((res) => res.json())
      .then((data) => data.success && setUser(data.user));
  }, [getUser]);

  // login
  const login = async (userName, password) => {
    const response = await fetch(`${dev.serverUrl}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName, password }),
    });
    const loginUser = await response.json();
    if (loginUser.success) {
      setAuthUser({ _id: loginUser.user._id });
      localStorage.setItem(
        "user",
        JSON.stringify({ _id: loginUser.user._id, token: loginUser.token })
      );
    }
    return loginUser;
  };

  // log out
  const logout = () => {
    localStorage.setItem("user", JSON.stringify({}));
    setAuthUser("");
  };

  const authInfo = {
    user,
    authUser,
    setAuthUser,
    login,
    logout,
    authStateChange,
    setAuthStateChange,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default UserContext;
