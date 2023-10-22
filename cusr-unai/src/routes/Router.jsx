import React from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "../Pages/Home";
import Login from "../components/menu/Login";
import DaftarPasien from "../Pages/Admin/data-pasien/DaftarPasien";
import DashboardPage from "../Pages/Admin/dashboard/DashboardPage";

// Perawat Component
import PerawatDashboard from "../Pages/Perawat/PerawatDashboard";

// protected route Function
import ProtectedRoute from "./ProtectedRoute";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />

          {/* Admin Route */}
          <Route path="admin/daftarpasien" element={<DaftarPasien />} />
          <Route path="/admin/dashboard" element={<DashboardPage />} />

          {/* perawat Route*/}
          <Route path="/perawat" element={<PerawatDashboard />} />
          <Route path="/notfound" element={<h1>Not Found</h1>} />
        </Route>

        {/* Route not found */}
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
