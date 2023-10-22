const ConfigMenu = [
  {
    path: "/admin/dashboard",
    name: "Dasboard",
    role: "admin",
  },
  {
    path: "/admin/daftar-pasien",
    name: "Daftar Pasien",
    role: "admin",
  },
  {
    path: "/admin/daftar-perawat",
    name: "Daftar Perawat",
    role: "admin",
  },
  {
    path: "/admin/logout",
    name: "Logout",
    role: "admin",
  },
  // {
  //   path: "standar",
  //   name: "Standar Keperawatan",
  //   role: "admin",
  //   child: [
  //     {
  //       path: "admin/Standar-keperawatan/diagnosa",
  //       name: "Diagnosa",
  //       role: "admin",
  //     },
  //     {
  //       path: "admin/standar-keperawatan/Intervensi",
  //       name: "Intervensi",
  //       role: "admin",
  //     },
  //     {
  //       path: "admin/standar-keperawatan/Luaran",
  //       name: "Luaran",
  //       role: "admin",
  //     },
  //   ],
  // },
  {
    path: "/perawat/profile",
    name: "Profile",
    role: "perawat",
  },
  {
    path: "/perawat/daftar-pasien",
    name: "Daftar Pasien",
    role: "perawat",
  },
  {
    path: "/perawat/Laporan",
    name: "Laporan",
    role: "perawat",
  },
  {
    path: "/perawat/pemeriksaan-awal",
    name: "Pemeriksaan Awal",
    role: "perawat",
  },
  {
    path: "/perawat/ganti-kata-sandi",
    name: "Ganti Kata Sandi",
    role: "perawat",
  },
  {
    path: "/perawat/logout",
    name: "Logout",
    role: "perawat",
  },
];

export default ConfigMenu;