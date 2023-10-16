import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import routes from "./routes";
import {
  AddDonation,
  AddExpense,
  AddMember,
  AddUser,
  Error,
  Login,
  Profile,
  UpdateDonation,
  UpdateExpense,
  UpdateMember,
  UpdateProfile,
  UpdateUser,
} from "./pages";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";
import { useContext } from "react";
import { AuthContext } from "./contextApi/UserContext";
import AccessRoute from "./routes/AccessRoute";

const App = () => {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/" element={<MainLayout />}>
            <Route path="/add-user" element={<AdminRoute />}>
              <Route path="/add-user" element={<AddUser />} />
            </Route>
            <Route path="/update-user/:id" element={<AdminRoute />}>
              <Route path="/update-user/:id" element={<UpdateUser />} />
            </Route>
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/update-profile/:id" element={<UpdateProfile />} />
            <Route path="/add-member" element={<AccessRoute />}>
              <Route path="/add-member" element={<AddMember />} />
            </Route>
            <Route path="/update-member" element={<AccessRoute />}>
              <Route path="/update-member/:id" element={<UpdateMember />} />
            </Route>
            <Route path="/add-donation" element={<AccessRoute />}>
              <Route path="/add-donation" element={<AddDonation />} />
            </Route>
            <Route path="/update-donation" element={<AccessRoute />}>
              <Route path="/update-donation/:id" element={<UpdateDonation />} />
            </Route>
            <Route path="/add-expense" element={<AccessRoute />}>
              <Route path="/add-expense" element={<AddExpense />} />
            </Route>
            <Route path="/update-expense" element={<AccessRoute />}>
              <Route path="/update-expense/:id" element={<UpdateExpense />} />
            </Route>
            {routes
              .filter((item) => item.show.indexOf(user?.role) !== -1)
              .map((route, index) => {
                const { path, component: Component } = route;
                return (
                  <Route key={index} path={path} element={<Component />} />
                );
              })}
          </Route>
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
};

export default App;
