const ConfigMenu = [
  {
    path: "/admin/dashboard",
    name: "DASHBOARD",
    role: "admin",
    // icon: "fa-solid fa-gauge",
    child: null,
  },
  {
    path:'/',
    name:'ADMINISTRASI',
    role:'admin',
    child: [
      {
        path: "/admin/daftarperawat",
        name: "DAFTAR PERAWAT",
        role: "admin",
        // icon: "fa-solid fa-user-nurse",
        child: null,
      },
      {
        path: "/admin/daftarpasien",
        name: "DAFTAR PASIEN",
        role: "admin",
        // icon: "fa-solid fa-list",
        child: null,
      },
    ]
  },
  {
    path:'/',
    name:'RAWAT INAP',
    role:'admin',
    child: [
      {
        path: "/admin/pasienrawatinap",
        name: "PASIEN RAWAT INAP",
        role: "admin",
        // icon: "fa-solid fa-list",
        child: null,
      },
      {
        path: "/admin/daftarpasien",
        name: "CATATAN",
        role: "admin",
        // icon: "fa-solid fa-list",
        child: null,
      },
      {
        path: "/admin/bed",
        name: "KAMAR",
        role: "admin",
        // icon: "fa-solid fa-bed",
        child: null,
      },
    ]
  },
 
  // {
  //   path: "/admin/status",
  //   name: "Status",
  //   role: "admin",
  //   // icon: "fa-solid fa-bed",
  //   child: null,
  // },
  {
    path: "/",
    name: "STANDAR KEPERAWATAN INDONESIA",
    role: "admin",
    child: [
      {
        path: "/admin/standarkeperawatan/diagnosis",
        name: "DIAGNOSA",
        role: "admin",
        // icon: "fa-solid fa-stethoscope",
      },
      {
        path: "/admin/standarkeperawatan/intervensi",
        name: "INTERVENSI",
        role: "admin",
        // icon: "fa-solid fa-person-dots-from-line",
      },
      {
        path: "/admin/standarkeperawatan/luaran",
        name: "LUARAN",
        role: "admin",
        // icon: "fa-solid fa-clipboard-user"
      },
    ],
  },
  {
    path:'/',
    name:'AKUN',
    role:'admin',
    child: [
      {
        path: "/admin/ganti-sandi",
        name: "GANTI KATA SANDI",
        role: "admin",
        // icon: "fa-solid fa-key",
        child: null,
      },
    ],
    isOpen: true
  },
  {
    path: "/logout",
    name: "LOGOUT",
    role: "admin",
    // icon: "fa-solid fa-right-from-bracket",
    child: null,
  },
  {
    path: "/perawat/profile",
    name: "Profile",
    role: "perawat",
    // icon: "fa-solid fa-user-nurse",
    child: null,
  },
  {
    path: "/perawat/daftarpasien",
    name: "ASKEP",
    role: "perawat",
    // icon: "fa-solid fa-list",
    child: null,
  },
  {
    path: "/perawat/laporan",
    name: "Laporan",
    role: "perawat",
    // icon: "fa-solid fa-notes-medical",
    child: null,
  },
  {
    path: "/perawat/pemeriksaan-awal",
    name: "Pemeriksaan Awal",
    role: "perawat",
    // icon: "fa-solid fa-stethoscope",
    child: null,
  },
  {
    path: "/perawat/ganti-sandi",
    name: "Ganti Kata Sandi",
    role: "perawat",
    // icon: "fa-solid fa-key",
    child: null,
  },
  {
    path: "/logout",
    name: "Logout",
    role: "perawat",
    // icon: "fa-solid fa-right-from-bracket",
    child: null,
  },
];

export default ConfigMenu;