import React, {useEffect, useState} from "react";
import Sidebar from "../../../components/menu/Sidebar";
import { Form, Button, Table, Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "../../../axios";
import AuthorizationRoute from "../../../AuthorizationRoute";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import "primereact/resources/themes/saga-blue/theme.css";

export default function DaftarPasienAwal() {

    // Autocomplete

    const [inputValue, setInputValue] = useState('');
    const [filterPasien, setFilterPasien] = useState([]);
    const [pasien, setPasien] = useState([]);

    const isMobile = window.innerWidth <=600;

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


    const getPasien = async (token) => {
        try {
            await axios
            .post("/perawat/daftarpasien", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                console.log(res)
                setPasien(res?.data?.data);
            });
        } catch (error) {
            // AuthorizationRoute(error.response.status);
        }
    };

    useEffect(()=>{
        getPasien(localStorage.getItem('token'))
    }, [])

    console.log(pasien)
    

  return (
      <React.Fragment>
        {isMobile ? (
            <React.Fragment>
                <Sidebar 
                    title='DIAGNOSTIK'>

                    {/* Search */}

                    <div className="container">
                            <span id='form-label' className="text-alert-search">Ketik untuk mencari data pasien</span>
                                <input 
                                    className="form-control custom-search" 
                                    type="text" 
                                    placeholder="Search" 
                                    value={inputValue} 
                                    onChange={(e) => setInputValue(e.target.value)} />


                        <DataTable value={inputValue ? filterPasien : pasien} paginator rows={5}  stripedRows show showGridlines>
                            <Column field="nama_lengkap" header='Nama'/>
                            <Column 
                            header=''
                            body={(item) => (
                                <Link
                                to={`/perawat/profil/pemeriksaan/${item.id}`}
                                className="btn d-flex justify-content-center align-items-center simple-button">Lihat</Link>
                            )}/>
                        </DataTable>
                    </div>
                </Sidebar>
            </React.Fragment>
        ) : (
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


                        <DataTable value={inputValue ? filterPasien : pasien} paginator rows={10}  stripedRows show showGridlines>
                            <Column field="nama_lengkap" header='Nama'/>
                            <Column 
                            header=''
                            body={(item) => (
                                <Link
                                to={`/perawat/profil/pemeriksaan/${item.id}`}
                                className="btn d-flex justify-content-center align-items-center simple-button">Lihat</Link>
                            )}/>
                        </DataTable>
                </div>
            </Sidebar>
        )}
      </React.Fragment>
  );
}