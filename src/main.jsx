import React from "react";
import ReactDOM from "react-dom/client";
import { ProductApp } from "./components/product/ProductApp.jsx";
import { LoginForm } from "./components/user/LoginForm.jsx";
import { RegisterForm } from "./components/user/RegisterForm.jsx";
import { Provider} from "react-redux";
import { store } from "./store/store.js";
import { Navbar } from "./components/NavBar.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<ProductApp title="Productos!"/>} />
          <Route path="/api/products" element={<ProductApp title="Productos!"/>} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />

          {/* Ruta 404 - página no encontrada */}
          <Route
            path="*"
            element={
              <div className="not-found">
                <h2>Página no encontrada</h2>
                <p>La página que buscas no existe.</p>
              </div>
            }
          />
          </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
