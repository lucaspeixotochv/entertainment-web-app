import { ReactNode, useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Auth/Login/index.tsx";
import Register from "./pages/Auth/Register/index.tsx";
import Home from "./pages/Home/index.tsx";
import { AuthContext } from "./context/AuthContext.tsx";

function App() {
  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ element }: { element: ReactNode }) => {
    return currentUser ? element : <Navigate to="/login" />;
  };

  const ProtectedRouteReverse = ({ element }: { element: ReactNode }) => {
    return !currentUser ? element : <Navigate to="/" />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute element={<Home />} />} />
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
  );
}

export default App;
