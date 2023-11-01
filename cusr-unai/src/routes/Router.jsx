import React from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";

// Menu Components Import
import Home from "../Pages/Home";
import Login from "../components/menu/Login";
import GantiSandi from "../Pages/Menu/GantiSandi";

// Admin Component Import
import DaftarPasien from "../Pages/Admin/data-pasien/DaftarPasien";
import DashboardPage from "../Pages/Admin/dashboard/DashboardPage";
import Logout from "../components/menu/Logout";

// Perawat Component Import
import PerawatDashboard from "../Pages/Perawat/PerawatDashboard";
import DaftarPasienPerawat from "../Pages/Perawat/data-pasien/DaftarPasienPerawat";
import ProfilPasienPerawat from "../Pages/Perawat/data-pasien/ProfilPasienPerawat";

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
          <Route path="/admin/daftarpasien" element={<DaftarPasien />} />
          <Route path="/admin/dashboard" element={<DashboardPage />} />
          <Route path="/admin/logout" element={<Logout />} />
          <Route path="/admin/ganti-sandi" element={<GantiSandi />} />

          {/* Perawat Route*/}
          <Route path="/perawat/dashboard" element={<PerawatDashboard />} />
          <Route path="/perawat/ganti-sandi" element={<GantiSandi />} />
          <Route path="/perawat/daftarpasien" element={<DaftarPasienPerawat />} />
          <Route path="/perawat/profilpasien" element={<ProfilPasienPerawat />} />

        </Route>

        {/* Route not found */}
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
