import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import PatientLogin from "./pages/PatientLogin";
import StaffLogin from "./pages/StaffLogin";
import AdminLogin from "./pages/AdminLogin";
import RoleSelection from "./pages/RoleSelection";

function App() {
  return (
    <Routes>
      {/* The Dashboard is now the landing page */}
      <Route path="/" element={<Dashboard />} />
      
      {/* All other routes remain the same */}
      <Route path="/role-selection" element={<RoleSelection />} />
      <Route path="/patient-login" element={<PatientLogin />} />
      <Route path="/staff-login" element={<StaffLogin />} />
      <Route path="/admin-login" element={<AdminLogin />} />
    </Routes>
  );
}

export default App;

