const ConfigMenu = [
  {
    path: "/admin/dashboard",
    name: "Dasboard",
    role: "admin",
    child: null
  },
  {
    path: "/admin/daftar-pasien",
    name: "Daftar Pasien",
    role: "admin",
    child: null
  },
  {
    path: "/admin/daftar-perawat",
    name: "Daftar Perawat",
    role: "admin",
    child: null
  },
  {
    path: "/admin/logout",
    name: "Logout",
    role: "admin",
    child: null
  },
  {
    path: "/standar",
    name: "Standar Keperawatan",
    role: "admin",
    child: [
      {
        path: "admin/Standar-keperawatan/diagnosa",
        name: "Diagnosa",
        role: "admin",
      },
      {
        path: "admin/standar-keperawatan/Intervensi",
        name: "Intervensi",
        role: "admin",
      },
      {
        path: "admin/standar-keperawatan/Luaran",
        name: "Luaran",
        role: "admin",
      },
    ],
  },
  {
    path: "/perawat/profile",
    name: "Profile",
    role: "perawat",
    child: null
  },
  {
    path: "/perawat/daftar-pasien",
    name: "Daftar Pasien",
    role: "perawat",
    child: null
  },
  {
    path: "/perawat/Laporan",
    name: "Laporan",
    role: "perawat",
    child: null
  },
  {
    path: "/perawat/pemeriksaan-awal",
    name: "Pemeriksaan Awal",
    role: "perawat",
    child: null
  },
  {
    path: "/perawat/ganti-kata-sandi",
    name: "Ganti Kata Sandi",
    role: "perawat",
    child: null
  },
  {
    path: "/perawat/logout",
    name: "Logout",
    role: "perawat",
    child: null
  },
];

export default ConfigMenu;