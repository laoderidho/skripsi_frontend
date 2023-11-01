const ConfigMenu = [
  {
    path: "/admin/dashboard",
    name: "Dasboard",
    role: "admin",
    icon: "fa-solid fa-gauge",
    child: null,
  },
  {
    path: "/admin/daftar-pasien",
    name: "Daftar Pasien",
    role: "admin",
    icon: "fa-solid fa-bed",
    child: null,
  },
  {
    path: "/admin/daftar-perawat",
    name: "Daftar Perawat",
    role: "admin",
    icon: "fa-solid fa-user-nurse",
    child: null,
  },
  {
    path: "/standar",
    name: "Standar Keperawatan",
    role: "admin",
    icon: "fa-solid fa-hospital-user",
    child: [
      {
        path: "admin/Standar-keperawatan/diagnosa",
        name: "Diagnosa",
        role: "admin",
        icon: "fa-solid fa-stethoscope",
      },
      {
        path: "admin/standar-keperawatan/Intervensi",
        name: "Intervensi",
        role: "admin",
        icon: "fa-solid fa-person-dots-from-line",
      },
      {
        path: "admin/standar-keperawatan/Luaran",
        name: "Luaran",
        role: "admin",
        icon: "fa-solid fa-clipboard-user"
      },
    ],
  },
  {
    path: "/admin/ganti-sandi",
    name: "Ganti Kata Sandi",
    role: "admin",
    icon: "fa-solid fa-key",
    child: null,
  },
  {
    path: "/admin/logout",
    name: "Logout",
    role: "admin",
    icon: "fa-solid fa-right-from-bracket",
    child: null,
  },
  {
    path: "/perawat/profile",
    name: "Profile",
    role: "perawat",
    icon: "fa-solid fa-user-doctor",
    child: null,
  },
  {
    path: "/perawat/daftarpasien",
    name: "Daftar Pasien",
    role: "perawat",
    icon: "fa-solid fa-list",
    child: null,
  },
  {
    path: "/perawat/Laporan",
    name: "Laporan",
    role: "perawat",
    icon: "fa-solid fa-file-invoice",
    child: null,
  },
  {
    path: "/perawat/pemeriksaan-awal",
    name: "Pemeriksaan Awal",
    role: "perawat",
    icon: "fa-solid fa-stethoscope",
    child: null,
  },
  {
    path: "/perawat/ganti-kata-sandi",
    name: "Ganti Kata Sandi",
    role: "perawat",
    icon: "fa-solid fa-key",
    child: null,
  },
  {
    path: "/perawat/logout",
    name: "Logout",
    role: "perawat",
    icon: "fa-solid fa-right-from-bracket",
    child: null,
  },
];

export default ConfigMenu;