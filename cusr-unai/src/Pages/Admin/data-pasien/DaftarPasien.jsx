import React, {useEffect, useState} from "react";
import Sidebar from "../../../components/menu/Sidebar";
import { Form, Button, Table, Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "../../../axios";
import AuthorizationRoute from "../../../AuthorizationRoute";
import "primereact/resources/themes/saga-blue/theme.css";
import { Toolbar } from 'primereact/toolbar';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';


export default function DaftarPasien() {

    // Autocomplete

    const [inputValue, setInputValue] = useState('');
    const [filterPasien, setFilterPasien] = useState([]);
    const [pasien, setPasien] = useState([])

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
            });
        } catch (error) {
            AuthorizationRoute(error.response.status);
        }
    };

    useEffect(()=>{
        getPasien(localStorage.getItem('token'))
    }, [])

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
    

  return (
    <Sidebar>
      {/* Title */}
      <div className="container">
        <h2>Daftar Pasien</h2>
        <Breadcrumb>
          <Breadcrumb.Item active>Daftar Pasien</Breadcrumb.Item>
          <Breadcrumb.Item href="/admin/daftarpasien/tambah">
            Tambah
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <div className="container">
        <Toolbar
          end={endContent}
          >
        </Toolbar>

        <DataTable value={inputValue ? filterPasien : pasien} paginator rows={5}  tableStyle={{ minWidth: '50rem' }}  stripedRows show showGridlines className="mt-3">
          <Column field="id" header='No'/>
          <Column field="nama_lengkap" header='Nama'/>
          <Column field="no_medical_record" header='Medical Record'/>
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
