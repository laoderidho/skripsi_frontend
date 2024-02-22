const ConfigMenu = [
  {
    path: "/admin/dashboard",
    name: "Dasboard",
    role: "admin",
    icon: "fa-solid fa-gauge",
    child: null,
  },
  {
    path: "/admin/daftarpasien",
    name: "Daftar Pasien",
    role: "admin",
    icon: "fa-solid fa-list",
    child: null,
  },
  {
    path: "/admin/daftarperawat",
    name: "Daftar Perawat",
    role: "admin",
    icon: "fa-solid fa-user-nurse",
    child: null,
  },
  {
    path: "/admin/bed",
    name: "Kamar",
    role: "admin",
    icon: "fa-solid fa-bed",
    child: null,
  },
  {
    path: "/",
    name: "Standar Keperawatan",
    role: "admin",
    icon: "fa-solid fa-hospital-user",
    child: [
      {
        path: "/admin/standarkeperawatan/diagnosis",
        name: "Diagnosa",
        role: "admin",
        icon: "fa-solid fa-stethoscope",
      },
      {
        path: "/admin/standarkeperawatan/intervensi",
        name: "Intervensi",
        role: "admin",
        icon: "fa-solid fa-person-dots-from-line",
      },
      {
        path: "/admin/standarkeperawatan/luaran",
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
    path: "/logout",
    name: "Logout",
    role: "admin",
    icon: "fa-solid fa-right-from-bracket",
    child: null,
  },
  {
    path: "/perawat/profile",
    name: "Profile",
    role: "perawat",
    icon: "fa-solid fa-user-nurse",
    child: null,
  },
  {
    path: "/perawat/daftarpasien",
    name: "ASKEP",
    role: "perawat",
    icon: "fa-solid fa-list",
    child: null,
  },
  {
    path: "/perawat/laporan",
    name: "Laporan",
    role: "perawat",
    icon: "fa-solid fa-notes-medical",
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
    path: "/perawat/ganti-sandi",
    name: "Ganti Kata Sandi",
    role: "perawat",
    icon: "fa-solid fa-key",
    child: null,
  },
  {
    path: "/logout",
    name: "Logout",
    role: "perawat",
    icon: "fa-solid fa-right-from-bracket",
    child: null,
  },
];

export default ConfigMenu;