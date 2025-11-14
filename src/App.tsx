import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";

const App: React.FC = () => {
  const token = localStorage.getItem("jwt");
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={token ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/history"
          element={token ? <History /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
};
export default App;
