import React, {useEffect, useState} from "react";
import Sidebar from "../../../components/menu/Sidebar";
import { Form, Button, Table, Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "../../../axios";
import AuthorizationRoute from "../../../AuthorizationRoute";
import {Skeleton} from 'primereact/skeleton';


export default function DaftarPasienLaporan() {

    // Autocomplete

    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const [pasien, setPasien] = useState([]);

    

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
      <Sidebar>
        {/* Title */}
        <div className="container">
            <h2>Daftar Pasien</h2>
        </div>

        {/* Search */}

        <Form className="container">
            <div className="search-container mb-5">
                    <input className="form-control" type="text" placeholder="Search" value={inputValue} />

                    {/* <Link to="/admin/daftarpasien/tambah" className="btn d-flex justify-content-center align-items-center blue-button">
                        Tambah
                    </Link> */}
                    
            </div>

            <table className="bordered" id='border'>
                <thead>
                    <tr className="table-head">
                        <th>Nama</th>
                        <th className="button-space"></th>
                    </tr>
                </thead>
                <tbody>
                    {pasien.map((item, index) => (
                    <tr key={index}>
                        <td>{item.nama_lengkap}</td>
                        <td>
                            <Link 
                                to={`/perawat/laporan/${item.id}/${item.nama_lengkap}`}
                                class="d-flex justify-content-center align-items-center">
                                Lihat Laporan
                            </Link>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </Form>
      </Sidebar>
      
  );
}
