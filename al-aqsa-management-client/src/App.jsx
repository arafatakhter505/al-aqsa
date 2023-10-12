import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import routes from "./routes";
import { AddUser, Login } from "./pages";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<MainLayout />}>
          <Route path="/add-user" element={<AddUser />} />
          {routes.map((route, index) => {
            const { path, component: Component } = route;
            return <Route key={index} path={path} element={<Component />} />;
          })}
        </Route>
      </Routes>
    </div>
  );
};

export default App;
