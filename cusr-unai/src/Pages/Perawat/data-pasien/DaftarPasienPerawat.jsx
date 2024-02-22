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

    const [pasien, setPasien] = useState([]);


    useEffect(()=>{
       getdataPasien()
    },[])

    useEffect(()=>{
      filteredPasien()
    },[inputValue]);

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

    const token = localStorage.getItem('token')

    // Table

    const getdataPasien = async () =>{
        try{
            const res = await axios.post("/perawat/daftarpasien/rawat-inap",{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            console.log(res.data.data)
            setPasien(res.data.data)
        }catch(error){
            // AuthorizationRoute(error.response.status)
        }
    }
  return (
    <Sidebar>
      {/* Title */}
      <div className="container">
        <h2>Daftar Pasien</h2>
      </div>

      <div className="container mt-5">
        <Toolbar
          end={endContent}
          >
        </Toolbar>

        <DataTable value={inputValue ? filterPasien : pasien} paginator rows={5}    stripedRows show showGridlines className="mt-3">
          <Column field="nama_lengkap" header='Nama'/>
          <Column 
            header=''
            body={(item) => (
              <Link
                to={`/perawat/profilpasien/${item.id}/${item.perawatan_id}`}
                className="btn d-flex justify-content-center align-items-center simple-button">Lihat Profil</Link>
            )}/>
        </DataTable>
      </div>

      <Form className="container">
        <div className="search-container">

          {/* <Link to="/admin/daftarpasien/tambah" className="btn d-flex justify-content-center align-items-center blue-button">
                        Tambah
                    </Link> */}

        </div>

        
      </Form>
    </Sidebar>
  );
}
