import React, { ReactNode, useContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Route, BrowserRouter, Navigate, Routes } from "react-router-dom";
import { AuthContext, AuthContextProvider } from "./context/AuthContext.tsx";
import Movies from "./pages/Movies/index.tsx";
import Login from "./pages/Auth/Login/index.tsx";
import Register from "./pages/Auth/Register/index.tsx";
import Home from "./pages/Home/index.tsx";
import BookMarked from "./pages/BookMarked/index.tsx";
import Series from "./pages/Series/index.tsx";

const ProtectedRoute = ({ element }: { element: ReactNode }) => {
  const { currentUser } = useContext(AuthContext);
  return currentUser ? element : <Navigate to="/login" />;
};

const ProtectedRouteReverse = ({ element }: { element: ReactNode }) => {
  const { currentUser } = useContext(AuthContext);
  return !currentUser ? element : <Navigate to="/" />;
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute element={<App />} />}>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/series" element={<Series />} />
            <Route path="/bookedmarked" element={<BookMarked />} />
          </Route>
          <Route
            path="/login"
            element={<ProtectedRouteReverse element={<Login />} />}
          />
          <Route
            path="/register"
            element={<ProtectedRouteReverse element={<Register />} />}
          />
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  </React.StrictMode>
);
