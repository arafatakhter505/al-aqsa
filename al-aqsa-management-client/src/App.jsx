import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import routes from "./routes";
import { AddUser, Login, UpdateUser } from "./pages";
import ProtectedRoute from "./routes/ProtectedRoute";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/" element={<MainLayout />}>
            <Route path="/add-user" element={<AddUser />} />
            <Route path="/update-user/:id" element={<UpdateUser />} />
            {routes.map((route, index) => {
              const { path, component: Component } = route;
              return <Route key={index} path={path} element={<Component />} />;
            })}
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
