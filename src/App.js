import React from "react";
import { Routes, Route } from "react-router-dom";
import RoleSelection from "./pages/RoleSelection";
import PatientLogin from "./pages/PatientLogin";
import StaffLogin from "./pages/StaffLogin";
import AdminLogin from "./pages/AdminLogin";

function App() {
  return (
    <Routes>
      <Route path="/" element={<RoleSelection />} />
      <Route path="/patient-login" element={<PatientLogin />} />
      <Route path="/staff-login" element={<StaffLogin />} />
      <Route path="/admin-login" element={<AdminLogin />} />
    </Routes>
  );
}

export default App;
