import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
// import Map from "./pages/Map";
import { isTokenValid } from "./utils/auth";

const App: React.FC = () => {
  const token = localStorage.getItem("jwt");
  const isAuthenticated = isTokenValid(token);

  if (isAuthenticated) {
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/history"
          element={isAuthenticated ? <History /> : <Navigate to="/login" />}
        />
        {/* <Route path="/map" element={<Map />} /> */}
      </Routes>
    </Router>
  );
};
export default App;
