import React, {useEffect, useState} from "react";
import Sidebar from "../../../components/menu/Sidebar";
import { Form, Button, Table, Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "../../../axios";
import AuthorizationRoute from "../../../AuthorizationRoute";

export default function DaftarPasienAwal() {

    // Autocomplete

    const [inputValue, setInputValue] = useState('');
    const [filterPasien, setFilterPasien] = useState([]);
    const [pasien, setPasien] = useState([]);

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
            .post("/perawat/pasien", {
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
      <Sidebar>
        {/* Title */}
        <div className="container">
            <h2>Daftar Pasien</h2>
        </div>

        {/* Search */}

        <Form className="container">
            <div className="search-container">
                    <input 
                        className="form-control" 
                        type="text" 
                        placeholder="Search" 
                        value={inputValue} 
                        onChange={(e) => setInputValue(e.target.value)} />
            </div>

            <Table className="table table-striped table-hover">
                <thead>
                    <tr>
                     
                        <th>Nama</th>
                        <th className="button-space"></th>
                    </tr>
                </thead>
                <tbody>
                    {inputValue
                    ? filterPasien.map((item, index) => (
                        <tr key={index}>
                            <td>{item.nama_lengkap}</td>
                            <td>
                                <Link
                                    to={`/perawat/profil/pemeriksaan/${item.id}`}
                                    >
                                    Lihat
                                </Link>
                            </td>
                        </tr>
                    ))
                    : pasien.map((item, index) => (
                        <tr key={index}>
                            <td>{item.nama_lengkap}</td>
                            <td>
                                <Link
                                    to={`/perawat/profil/pemeriksaan/${item.id}`}
                                    >
                                    Lihat
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Form>
      </Sidebar>
  );
}