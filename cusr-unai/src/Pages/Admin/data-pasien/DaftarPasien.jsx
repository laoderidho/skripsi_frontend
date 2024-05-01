import React, {useEffect, useState} from "react";
import Sidebar from "../../../components/menu/SidebarAdmin";
import { Form, Button, Table } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import axios from "../../../axios";
import AuthorizationRoute from "../../../AuthorizationRoute";
import "primereact/resources/themes/saga-blue/theme.css";
import { Toolbar } from 'primereact/toolbar';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Skeleton } from 'primereact/skeleton';
import { BreadCrumb } from 'primereact/breadcrumb';


export default function DaftarPasien() {

    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(true);
    const [filterPasien, setFilterPasien] = useState([]);
    const [pasien, setPasien] = useState([]);
    const [dataRawatInap, setDataRawatInap] = useState('');
    const {id} = useParams();
    const token=localStorage.getItem("token");

    const isMobile = window.innerWidth <=600;

    const filteredPasien = () => {
         const filteredDiagnosa = pasien.filter((item) => {
           return (
             item.id.toString().includes(inputValue) ||
             item.nama_lengkap
               .toString()
               .toLowerCase()
               .includes(inputValue.toLowerCase()) ||
             item.no_medical_record
               .toString()
               .toLowerCase()
               .includes(inputValue.toLowerCase())
           );
         });
         setFilterPasien(filteredDiagnosa);
    }    

    useEffect(()=>{
        filteredPasien()
    },[inputValue])


    const dummyData = []

    for(let i=0; i<5; i++){
      dummyData.push(
        {
          data: <Skeleton />
        }
      )
    }


    const getPasien = async (token) => {
        try {
            await axios
            .post("/admin/daftarpasien", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                console.log(res)
                setPasien(res?.data?.data);
                setLoading(false);
            });
        } catch (error) {
            AuthorizationRoute(error.response.status);
        }
    };

    // const detailStatus = async () => {
    //   try{
    //     const res = await axios.post(`/pasien/rawat-inap/detailStatus/${id}`, {
    //       headers: { Authorization: `Bearer ${token}` },
    //     });
    //     setDataRawatInap(res.data.message)
    //   }catch(error){
    //     AuthorizationRoute(error.response.status)
    //   }
    // };

    useEffect(()=>{
        getPasien(localStorage.getItem('token'));
    }, []);

    console.log(pasien)

    const endContent = (
      <React.Fragment>
        <input
            className="form-control"
            id="form-width"
            type="text"
            placeholder="Search"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
      </React.Fragment>
    );

    const startContent = (
      <React.Fragment>
        <Link
          to={`/admin/daftarpasien/tambah`}
          className="btn blue-button-table">Tambah</Link>
      </React.Fragment>
    );

    const items = [{label: 'Admin'}, {label: 'Pasien'}, {label: ''}]
    

  return (
    <React.Fragment>
      {isMobile ? (
        <>
          <Sidebar>
            <div className="container d-flex align-items-center form-margin container-breadcrumb">
                            <span>
                            <Link to={`/admin/daftarpasien`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width='17' height='17' fill='#fff' viewBox="0 0 24 24" stroke-width="1.5" stroke="#085b93" class="w-6 h-6 mb-3">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                </svg>
                            </Link>
                            </span>
                            <BreadCrumb model={items}/>

                            <span>
                            <p className='title-breadcrumb'>Daftar Pasien</p>
                            </span>
              </div>


            <div className="container">
              <h3>{loading ? <Skeleton width="200px" height="30px"/> : 'Daftar Pasien'}</h3>
            </div>

            <div className="container mt-3">
                        <Link
                            to={`/admin/daftarpasien/tambah`}
                            className="btn blue-button-table">Tambah</Link>

                        <input
                            className="form-control custom-search mt-2"
                            id="form-width"
                            type="text"
                            placeholder="Search"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            />  
                    </div> 

            <div className="container">

              <DataTable value={loading ? dummyData : (inputValue ? filterPasien : pasien)} paginator rows={10}  tableStyle={{ minWidth: '2rem' }}  stripedRows show showGridlines className="mt-1">
                {/* <Column 
                  field="" 
                  header={loading ? <Skeleton width="50px" /> : 'No'}
                  body={(rowData) => (
                    loading ? rowData.data : rowData.id
                  )}/> */}
                <Column field="" 
                  header={loading ? <Skeleton width="100px" /> : 'Nama'}
                  body={(rowData) => (
                  loading ? rowData.data : rowData.nama_lengkap
                  )}/>
                <Column field="" 
                  header={loading ? <Skeleton width="100px" /> : 'Tanggal Lahir'} 
                  body={(rowData) => (
                  loading ? rowData.data : rowData.tanggal_lahir
                  )}/>
                {/* <Column 
                  field="" 
                  header={loading ? <Skeleton width="50px" /> : 'Status'}
                  body={(rowData) => (
                    <div>
                      {dataRawatInap === "merah" ? (
                              <Button href="#" className="triase-merah text-white p-1 ">
                                Triase Merah
                              </Button>
                            ) : dataRawatInap === "kuning" ? (
                              <Button href="#" className="triase-kuning text-white p-1 ">
                                Triase Kuning
                              </Button>
                            ) : dataRawatInap === "hijau" ? (
                              <Button href="#" className="triase-hijau text-white p-1">
                                Triase Hijau
                              </Button>
                            ) : dataRawatInap === "hitam" ? (
                              <Button href="#" className="triase-hitam text-white p-1">
                                Triase Hitam
                              </Button>
                            ) : loading ? (
                              <Skeleton width="50px"/>
                            ) : (
                              "Tidak di rawat inap"
                      )}
                    </div>
                  )}
                /> */}
                <Column 
                  header=''
                  body={(rowData) => (
                    <Link
                      to={`/admin/daftarpasien/${rowData.id}`}
                      className="btn d-flex justify-content-center align-items-center simple-button-table">Lihat Profil</Link>
                  )}/>
              </DataTable>
          
            </div> 
            
          </Sidebar>
        </>
      ) : (
        <>
          <Sidebar>
              <div className="container d-flex align-items-center container-breadcrumb">
                            <span>
                            <Link to={`/admin/daftarpasien`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width='17' height='17' fill='#fff' viewBox="0 0 24 24" stroke-width="1.5" stroke="#085b93" class="w-6 h-6 mb-3">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                </svg>
                            </Link>
                            </span>
                            <BreadCrumb model={items} />

                            <span>
                            <p className='title-breadcrumb'>Daftar Pasien</p>
                            </span>
              </div>
              <div className="container">
                <h3>{loading ? <Skeleton width="200px" height="30px"/> : 'Daftar Pasien'}</h3>
              </div>

              <div className="container pt-5">
                <Toolbar
                  start={startContent}
                  end={endContent}
                  >
                </Toolbar>

                <DataTable value={loading ? dummyData : (inputValue ? filterPasien : pasien)} paginator rows={10}  tableStyle={{ minWidth: '2rem' }}  stripedRows show showGridlines className="mt-3">
                  <Column 
                    field="" 
                    header={loading ? <Skeleton width="50px" /> : 'No'}
                    body={(rowData) => (
                      loading ? rowData.data : rowData.id
                    )}/>
                  <Column field="" 
                    header={loading ? <Skeleton width="100px" /> : 'Nama'}
                    body={(rowData) => (
                    loading ? rowData.data : rowData.nama_lengkap
                    )}/>
                  <Column field="" 
                    header={loading ? <Skeleton width="100px" /> : 'Tanggal Lahir'} 
                    body={(rowData) => (
                    loading ? rowData.data : rowData.tanggal_lahir
                    )}/>
                  {/* <Column 
                    field="" 
                    header={loading ? <Skeleton width="50px" /> : 'Status'}
                    body={(rowData) => (
                      <div>
                        {dataRawatInap === "merah" ? (
                                <Button href="#" className="triase-merah text-white p-1 ">
                                  Triase Merah
                                </Button>
                              ) : dataRawatInap === "kuning" ? (
                                <Button href="#" className="triase-kuning text-white p-1 ">
                                  Triase Kuning
                                </Button>
                              ) : dataRawatInap === "hijau" ? (
                                <Button href="#" className="triase-hijau text-white p-1">
                                  Triase Hijau
                                </Button>
                              ) : dataRawatInap === "hitam" ? (
                                <Button href="#" className="triase-hitam text-white p-1">
                                  Triase Hitam
                                </Button>
                              ) : loading ? (
                                <Skeleton width="50px"/>
                              ) : (
                                "Tidak di rawat inap"
                        )}
                      </div>
                    )}
                  /> */}
                  <Column 
                    header=''
                    body={(rowData) => (
                      <Link
                        to={`/admin/daftarpasien/${rowData.id}`}
                        className="btn d-flex justify-content-center align-items-center simple-button">Lihat Profil</Link>
                    )}/>
                </DataTable>
            
              </div> 
              
            </Sidebar>
        </>
      )}
    </React.Fragment>
  );
}
