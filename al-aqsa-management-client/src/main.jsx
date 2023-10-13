import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import ModalContextApi from "./contextApi/ModalContextApi.jsx";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const root = ReactDOM.createRoot(document.getElementById("root"));
const queryClient = new QueryClient();
root.render(
  <React.StrictMode>
    <Router>
      <QueryClientProvider client={queryClient}>
        <ModalContextApi>
          <App />
          <Toaster />
        </ModalContextApi>
      </QueryClientProvider>
    </Router>
  </React.StrictMode>
);
