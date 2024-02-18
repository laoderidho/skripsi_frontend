import React from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";

// Menu Components Import
import Home from "../Pages/Home";
import Login from "../Pages/Menu/Login";
import GantiSandi from "../Pages/Menu/GantiSandi";

// Admin Component Import
import DaftarPasien from "../Pages/Admin/data-pasien/DaftarPasien";
import DashboardPage from "../Pages/Admin/dashboard/DashboardPage";
import Logout from "../components/menu/Logout";
import Diagnosis from "../Pages/Admin/standar/diagnosa/Diagnosis";
import Intervensi from "../Pages/Admin/standar/intervensi/Intervensi";
import Luaran from "../Pages/Admin/standar/luaran/Luaran";
import AddDiagnosa from "../Pages/Admin/standar/diagnosa/AddDiagnosa";
import AddIntervensi from "../Pages/Admin/standar/intervensi/AddIntervensi";
import AddLuaran from "../Pages/Admin/standar/luaran/AddLuaran";
import AddPasien from "../Pages/Admin/data-pasien/AddPasien";
import EditPasien from "../Pages/Admin/data-pasien/EditPasien";
import DetailPasien from "../Pages/Admin/data-pasien/DetailPasien";
import DetailDiagnosa from "../Pages/Admin/standar/diagnosa/DetailDiagnosa";
import DaftarPerawat from "../Pages/Admin/data-perawat/DaftarPerawat";
import AddPerawat from "../Pages/Admin/data-perawat/AddPerawat";
import DetailPerawat from "../Pages/Admin/data-perawat/DetailPerawat";
import DetailIntervensi from "../Pages/Admin/standar/intervensi/DetailIntervensi";
import EditIntervensi from "../Pages/Admin/standar/intervensi/EditIntervensi";
import EditDiagnosa from "../Pages/Admin/standar/diagnosa/EditDiagnosa";
import DetailLuaran from "../Pages/Admin/standar/luaran/DetailLuaran";
import EditLuaran from "../Pages/Admin/standar/luaran/EditLuaran";
import DaftarBed from "../Pages/Admin/bed/DaftarBed";

// Perawat Component Import
import PerawatDashboard from "../Pages/Perawat/PerawatDashboard";
import DaftarPasienPerawat from "../Pages/Perawat/data-pasien/DaftarPasienPerawat";
import ProfilPasien from "../Pages/Perawat/data-pasien/ProfilPasien";
import FormDiagnosa from "../Pages/Perawat/form-ski/FormDiagnosa";
import ProfilPemeriksaan from "../Pages/Perawat/pemeriksaan-awal/ProfilPemeriksaan";
import DiagnostikTambah from "../Pages/Perawat/pemeriksaan-awal/AddDiagnostik";
import KeteranganAskep from "../Pages/Perawat/keterangan/KeteranganAskep";
import PerawatGantiSandi from "../Pages/Perawat/PerawatGantiSandi";
import DaftarPasienAwal from "../Pages/Perawat/pemeriksaan-awal/DaftarPasienAwal";
import DaftarPasienLaporan from "../Pages/Perawat/laporan/DaftarPasienLaporan";
import DetailDiagnostik from "../Pages/Perawat/pemeriksaan-awal/DetailDiagnostik";
import HariAskep from "../Pages/Perawat/keterangan/HariAskep";
import ShiftHarian from "../Pages/Perawat/keterangan/ShiftHarian";
import FormIntervensi from "../Pages/Perawat/form-ski/FormIntervensi";
import FormEvaluasi from "../Pages/Perawat/form-ski/FormEvaluasi";
import Keterangan from "../Pages/Perawat/keterangan/Keterangan";

// protected route Function
import ProtectedRoute from "./ProtectedRoute";
import AddDiagnostik from "../Pages/Perawat/pemeriksaan-awal/AddDiagnostik";


export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
      
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />

          {/* ==== ADMIN ROUTE ==== */}

          {/* Admin | Daftar Pasien */}
          <Route path="/admin/daftarpasien" element={<DaftarPasien />} />
          <Route path="/admin/daftarpasien/tambah" element={<AddPasien />} />
          <Route path="/admin/daftarpasien/:id" element={<DetailPasien />} />

          {/* Admin | Daftar Perawat */}
          <Route path="/admin/daftarperawat" element={<DaftarPerawat />} />
          <Route path="/admin/daftarperawat/tambah" element={<AddPerawat />} />
          <Route path="/admin/daftarperawat/:id" element={<DetailPerawat />} />

          {/* Admin | Daftar Diagosis */}
          <Route path="/admin/standarkeperawatan/diagnosis" element={<Diagnosis/>} />
          <Route path="/admin/diagnosa/tambah" element={<AddDiagnosa />} />
          <Route path="/admin/standarkeperawatan/diagnosis/:id" element={<DetailDiagnosa />} />
          <Route path="/admin/diagnosa/edit/:id" element={<EditDiagnosa />} />

          {/* Admin | Daftar Intervensi */}
          <Route path="/admin/standarkeperawatan/intervensi" element={<Intervensi/>} />
          <Route path="/admin/intervensi/tambah" element={<AddIntervensi />} />
          <Route path="/admin/standarkeperawatan/intervensi/:id" element={<DetailIntervensi />} />
          <Route path="/admin/intervensi/edit/:id" element={<EditIntervensi />} />
          
          {/* Admin | Daftar Luaran */}
          <Route path="/admin/standarkeperawatan/luaran" element={<Luaran/>} />   
          <Route path="/admin/luaran/tambah" element={<AddLuaran />} />
          <Route path="/admin/standarkeperawatan/luaran/:id" element={<DetailLuaran />} />
          <Route path="/admin/luaran/edit/:id" element={<EditLuaran />} />
        
          {/* Admin */}
          <Route path="/admin/dashboard" element={<DashboardPage />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/admin/ganti-sandi" element={<GantiSandi />} />
          <Route path="/admin/bed" element={<DaftarBed />} />

          {/* Perawat */}
          <Route path="/perawat/ganti-sandi" element={<PerawatGantiSandi />} />

          
          
          

          {/* Perawat Route*/}
          <Route path="/perawat/profile" element={<PerawatDashboard />} />
          <Route path="/perawat/ganti-sandi" element={<GantiSandi />} />

          {/* Asuhan Keperawatan */}
          <Route path="/perawat/daftarpasien" element={<DaftarPasienPerawat />} />
          <Route path="/perawat/profilpasien/:id/:perawatan_id" element={<ProfilPasien />} />
        

          {/* Keterangan Askep */}
          <Route path="/perawat/askep/:id" element={<HariAskep />} />
          <Route path="/perawat/askep/shift/keterangan/:id" element={<KeteranganAskep />} />
          <Route path="/perawat/askep/shift/:id" element={<ShiftHarian />} />


          {/* Form SKI*/}
          <Route path="/perawat/askep/form-diagnosa/:id" element={<FormDiagnosa />} />
          <Route path="/perawat/askep/form-intervensi/:id" element={<FormIntervensi />} />
          <Route path="/perawat/askep/form-evaluasi/:id" element={<FormEvaluasi />} />

          {/* Profil Pemeriksaan */}
          <Route path="/perawat/profil/pemeriksaan/:id" element={<ProfilPemeriksaan />} />
          <Route path="/perawat/diagnostik/tambah/:id" element={<AddDiagnostik />} />
          <Route path="/perawat/pemeriksaan-awal" element={<DaftarPasienAwal/>} />
          <Route path="/perawat/diagnostik/:id" element={<DetailDiagnostik/>} />

          {/* Laporan */}
          <Route path="/perawat/laporan" element={<DaftarPasienLaporan />} />
          



        </Route>

        {/* Route not found */}
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
