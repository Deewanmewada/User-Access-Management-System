import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import CreateSoftware from "./pages/CreateSoftware";
import RequestAccess from "./pages/RequestAccess";
import PendingRequests from "./pages/PendingRequests";

function App() {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setRole(null);
  };

  return (
    <Router>
      <div>
        {role && (
          <div>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login setRole={setRole} />} />
          {role === "Admin" && <Route path="/create-software" element={<CreateSoftware />} />}
          {role === "Employee" && <Route path="/request-access" element={<RequestAccess />} />}
          {role === "Manager" && <Route path="/pending-requests" element={<PendingRequests />} />}
          <Route path="*" element={<Navigate to={role ? (role === "Admin" ? "/create-software" : role === "Employee" ? "/request-access" : "/pending-requests") : "/login"} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
