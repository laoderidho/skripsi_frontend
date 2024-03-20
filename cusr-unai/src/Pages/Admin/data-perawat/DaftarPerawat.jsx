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

export default function DaftarPerawat() {

    // Autocomplete

    const [inputValue, setInputValue] = useState('');
    const [perawat, setPerawat] = useState([]);
    const [filterPerawat, setFilterPerawat] = useState([]);
    const [loading, setLoading] = useState(true)

    const filteredPerawat = () => {
        const filteredPegawai = perawat.filter((item) => {
          return (
            item.id.toString().includes(inputValue) ||
            item.nama_lengkap
              .toString()
              .toLowerCase()
              .includes(inputValue.toLowerCase()) ||
            item.status
              .toString()
              .toLowerCase()
              .includes(inputValue.toLowerCase())
          );
        });
        setFilterPerawat(filteredPegawai);
    }   
    
    useEffect(()=>{
        filteredPerawat()
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
            .post(`/admin/users`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                console.log(res)
                setPerawat(res?.data?.data);
                setLoading(false);
            });
        } catch (error) {
            // AuthorizationRoute(error.response.status);
        }
    };

    useEffect(()=>{
        getPasien(localStorage.getItem('token'))
    }, [])

    console.log(perawat)

    const startContent = (
        <React.Fragment>
          <Link
            to={`/admin/daftarperawat/tambah`}
            className="btn blue-button-table">Tambah</Link>
        </React.Fragment>
      );

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
            <h2>Daftar Perawat</h2>
            <Breadcrumb>
                <Breadcrumb.Item active>
                    Daftar Perawat
                </Breadcrumb.Item>
                <Breadcrumb.Item href="/admin/daftarperawat/tambah">Tambah</Breadcrumb.Item>
            </Breadcrumb>
        </div>

        <div className="container pt-5">
            <Toolbar
                start={startContent}
                end={endContent}
            ></Toolbar>

            <DataTable value={loading ? dummyData : (inputValue ? filterPerawat: perawat)} paginator rows={5} tableStyle={{ minWidth:'50rem'}} stripedRows show showGridlines className="mt-3">
                <Column 
                    field="" 
                    header={loading ? <Skeleton width="50px" /> : 'No'}
                    body={(rowData) => (
                        loading ? rowData.data : rowData.id
                    )}/>
                <Column 
                    field="" 
                    header={loading ? <Skeleton width="100px" /> : 'Nama'}
                    body={(rowData) => (
                    loading ? rowData.data : rowData.nama_lengkap
                    )}/>
                <Column 
                    field="" 
                    header={loading ? <Skeleton width="50px" /> : 'Status'} 
                    body={(rowData) => (
                        loading ? rowData.data : rowData.status
                    )}/>
                <Column header=''
                body={(rowData) => (
                    <Link
                        to={`/admin/daftarperawat/${rowData.id}`}
                        className="btn d-flex justify-content-center align-items-center simple-button">Lihat Profil</Link>
                )}/>
            </DataTable>
        </div>
      </Sidebar>
      
  );
}
