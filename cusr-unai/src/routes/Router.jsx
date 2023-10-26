import React from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";

// Menu Components Import
import Home from "../Pages/Home";
import Login from "../components/menu/Login";
import GantiSandi from "../Pages/menu/GantiSandi";

// Admin Component Import
import DaftarPasien from "../Pages/Admin/data-pasien/DaftarPasien";
import DashboardPage from "../Pages/Admin/dashboard/DashboardPage";
import Logout from "../components/menu/Logout";

// Perawat Component Import
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
          <Route path="/admin/logout" element={<Logout />} />
          <Route path="/admin/ganti-sandi" element={<GantiSandi />} />

          {/* perawat Route*/}
          <Route path="/perawat/dashboard" element={<PerawatDashboard />} />
          <Route path="/perawat/ganti-sandi" element={<GantiSandi />} />
        </Route>

        {/* Route not found */}
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
