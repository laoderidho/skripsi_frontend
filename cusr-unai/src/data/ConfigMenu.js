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
        path: "/admin/user",
        name: "USER",
        role: "admin",
        // icon: "fa-solid fa-user-nurse",
        child: null,
      },
    ]
  },
  {
    path:'/',
    name: 'PASIEN',
    role: 'admin',
    child: [
      {
        path: "/admin/daftarpasien",
        name: "DAFTAR PASIEN",
        role: "admin",
        // icon: "fa-solid fa-list",
        child: null,
      },
      {
        path: "/admin/pasien/catatan",
        name: "CATATAN",
        role: "admin",
        // icon: "fa-solid fa-list",
        child: null,
      },
      {
        path: "/admin/pasien/askep",
        name: "ASKEP",
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
        path: "/admin/pasien/rawat-inap",
        name: "PASIEN RAWAT INAP",
        role: "admin",
        // icon: "fa-solid fa-list",
        child: null,
      },
      {
        path: "/admin/bed",
        name: "BED",
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
    path: "/login",
    name: "LOGOUT",
    role: "admin",
    // icon: "fa-solid fa-right-from-bracket",
    child: null,
  },
  {
    path: "/perawat/profile",
    name: "PROFILE",
    role: "perawat",
    // icon: "fa-solid fa-user-nurse",
    child: null,
  },
  {
    path: "/perawat/daftarpasien",
    name: "ASUHAN KEPERAWATAN",
    role: "perawat",
    // icon: "fa-solid fa-list",
    child: null,
  },
  {
    path: "/perawat/laporan",
    name: "LAPORAN",
    role: "perawat",
    // icon: "fa-solid fa-notes-medical",
    child: null,
  },
  {
    path: "/perawat/pemeriksaan-awal",
    name: "PEMERIKSAAN AWAL",
    role: "perawat",
    // icon: "fa-solid fa-stethoscope",
    child: null,
  },
  {
    path:'/',
    name:'AKUN',
    role:'perawat',
    child: [
      {
        path: "/perawat/ganti-sandi",
        name: "Ganti Kata Sandi",
        role: "perawat",
        // icon: "fa-solid fa-key",
        child: null,
      },
    ],
    isOpen: true
  },

  {
    path: "/login",
    name: "LOGOUT",
    role: "perawat",
    // icon: "fa-solid fa-right-from-bracket",
    child: null,
  },
];

export default ConfigMenu;