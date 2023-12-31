import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import routes from "./routes";
import {
  AddAttendance,
  AddBatch,
  AddDonation,
  AddExpense,
  AddMember,
  AddStudent,
  AddUser,
  BatchDetails,
  Error,
  Login,
  Profile,
  UpdateBatch,
  UpdateDonation,
  UpdateExpense,
  UpdateMember,
  UpdateProfile,
  UpdateStudent,
  UpdateAttendance,
  UpdateUser,
  AttendanceDetails,
} from "./pages";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./contextApi/UserContext";
import AccessRoute from "./routes/AccessRoute";
import TrainerAccessRoute from "./routes/TrainerAccessRoute";
import { PreLoader } from "./components";

const App = () => {
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  return (
    <div>
      {isLoading ? (
        <PreLoader />
      ) : (
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
                <Route
                  path="/update-donation/:id"
                  element={<UpdateDonation />}
                />
              </Route>
              <Route path="/add-expense" element={<AccessRoute />}>
                <Route path="/add-expense" element={<AddExpense />} />
              </Route>
              <Route path="/update-expense" element={<AccessRoute />}>
                <Route path="/update-expense/:id" element={<UpdateExpense />} />
              </Route>
              <Route path="/add-batch" element={<AccessRoute />}>
                <Route path="/add-batch" element={<AddBatch />} />
              </Route>
              <Route path="/update-batch" element={<AccessRoute />}>
                <Route path="/update-batch/:id" element={<UpdateBatch />} />
              </Route>
              <Route path="/batch-details/:id" element={<BatchDetails />} />
              <Route path="/add-student" element={<AccessRoute />}>
                <Route path="/add-student/:id" element={<AddStudent />} />
              </Route>
              <Route path="/update-student" element={<AccessRoute />}>
                <Route path="/update-student/:id" element={<UpdateStudent />} />
              </Route>
              <Route path="/add-attendance" element={<TrainerAccessRoute />}>
                <Route path="/add-attendance" element={<AddAttendance />} />
              </Route>
              <Route path="/update-attendance" element={<TrainerAccessRoute />}>
                <Route
                  path="/update-attendance/:id"
                  element={<UpdateAttendance />}
                />
              </Route>
              <Route
                path="/attendance-details/:id"
                element={<AttendanceDetails />}
              />
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
      )}
    </div>
  );
};

export default App;
