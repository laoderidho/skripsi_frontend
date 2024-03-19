import React, {useEffect, useState} from "react";
import Sidebar from "../../../components/menu/Sidebar";
import { Form, Button, Table, Breadcrumb } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import axios from "../../../axios";
import AuthorizationRoute from "../../../AuthorizationRoute";
import "primereact/resources/themes/saga-blue/theme.css";
import { Toolbar } from 'primereact/toolbar';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Skeleton } from 'primereact/skeleton';





export default function DaftarPasien() {

    // Autocomplete

    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(true);
    const [filterPasien, setFilterPasien] = useState([]);
    const [pasien, setPasien] = useState([]);
    const [dataRawatInap, setDataRawatInap] = useState('');
    const {id} = useParams();
    const token=localStorage.getItem("token");

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

    const detailStatus = async () => {
      try{
        const res = await axios.post(`/pasien/rawat-inap/detailStatus/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDataRawatInap(res.data.message)
      }catch(error){
        AuthorizationRoute(error.response.status)
      }
    };

    useEffect(()=>{
        getPasien(localStorage.getItem('token'));
        const statusTimeout = setTimeout(() => {
          console.log("Calling Status")
          detailStatus();
        }, 5000);
    }, []);

    useEffect(() => {
      console.log("Calling Status")
      detailStatus();
    },[]);

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
    

  return (
    <Sidebar>
      {/* Title */}
      <div className="container">
        <h2>{loading ? <Skeleton width="200px" height="30px"/> : 'Daftar Pasien'}</h2>
        <Breadcrumb>
          <Breadcrumb.Item active>{loading? <Skeleton width="100px"/> : 'Daftar Pasien'}</Breadcrumb.Item>
          <Breadcrumb.Item href="/admin/daftarpasien/tambah">
            {loading? <Skeleton width="60px"/> : 'Tambah' }
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <div className="container pt-5">
        <Toolbar
          start={startContent}
          end={endContent}
          >
        </Toolbar>

        <DataTable value={loading ? dummyData : (inputValue ? filterPasien : pasien)} paginator rows={5}  tableStyle={{ minWidth: '50rem' }}  stripedRows show showGridlines className="mt-3">
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
            header={loading ? <Skeleton width="100px" /> : 'Medical Record'} 
            body={(rowData) => (
             loading ? rowData.data : rowData.no_medical_record
            )}/>
          <Column 
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
          />
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
  );
}
