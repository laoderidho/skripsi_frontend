import React, {useEffect, useState} from "react";
import Sidebar from "../../../components/menu/Sidebar";
import { Form, Button, Table, Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "../../../axios";
import AuthorizationRoute from "../../../AuthorizationRoute";
import {Skeleton} from 'primereact/skeleton';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import "primereact/resources/themes/saga-blue/theme.css";


export default function DaftarPasienLaporan() {

    // Autocomplete

    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const isMobile = window.innerWidth <= 600;

    const [pasien, setPasien] = useState([]);
    const [filterPasien, setFilterPasien] = useState([]);

    const filteredPasien = () => {
        const filteredDiagnosa = pasien.filter((item) => {
            return (
                item.id.toString().includes(inputValue) ||
                item.nama_lengkap
                .toString()
                .toLowerCase()
                .includes(inputValue.toLowerCase()) 
            );
        });
        setFilterPasien(filteredDiagnosa);
    }

    useEffect(() => {
        filteredPasien()
    },[inputValue])

    

    useEffect(()=>{
       getdataPasien()
    },[])



    const token = localStorage.getItem('token')

    // Table

    const getdataPasien = async () =>{
        try{
            const res = await axios.post("/perawat/daftarpasien",{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            setPasien(res.data.data)
        }catch(error){
            // AuthorizationRoute(error.response.status)
        }
    }    

  return (
     <React.Fragment>
        {isMobile ? (
            <React.Fragment>
                 <Sidebar
                    title='LAPORAN'>
                    {/* Title */}

                    {/* Search */}

                    <div className="container">
                        <span id='form-label' className="text-alert-search">Ketik untuk mencari data pasien</span>
                                    <input 
                                        className="form-control custom-search" 
                                        type="text" 
                                        placeholder="Search" 
                                        value={inputValue} 
                                        onChange={(e) => setInputValue(e.target.value)} />

                        <DataTable value={inputValue ? filterPasien : pasien} paginator rows={10}  stripedRows show showGridlines>
                            <Column field="nama_lengkap" header='Nama'/>
                            <Column 
                            header=''
                            body={(item) => (
                                <Link
                                to={`/perawat/laporan/${item.id}/${item.nama_lengkap}`}
                                className="btn d-flex justify-content-center align-items-center blue-button-left-align-custom">Lihat Laporan</Link>
                            )}/>
                        </DataTable>
                    </div>
                </Sidebar>
            </React.Fragment>
        ) : (
            <React.Fragment>
                <Sidebar>
                    {/* Title */}
                    <div className="container">
                        <h2>Daftar Pasien</h2>
                    </div>

                    {/* Search */}

                    <div className="container">
                        <span id='form-label' className="text-alert-search">Ketik untuk mencari data pasien</span>
                                    <input 
                                        className="form-control custom-search" 
                                        type="text" 
                                        placeholder="Search" 
                                        value={inputValue} 
                                        onChange={(e) => setInputValue(e.target.value)} />

                        <DataTable value={inputValue ? filterPasien : pasien} paginator rows={20}  stripedRows show showGridlines>
                            <Column field="nama_lengkap" header='Nama'/>
                            <Column 
                            header=''
                            body={(item) => (
                                <Link
                                to={`/perawat/laporan/${item.id}/${item.nama_lengkap}`}
                                className="btn d-flex justify-content-center align-items-center blue-button-left-align-custom">Lihat Laporan</Link>
                            )}/>
                        </DataTable>
                    </div>
                </Sidebar>
            </React.Fragment>
        )}
     </React.Fragment>
      
  );
}
