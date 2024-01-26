import React, {useEffect, useState} from "react";
import Sidebar from "../../../components/menu/Sidebar";
import { Form, Button, Table, Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "../../../axios";
import AuthorizationRoute from "../../../AuthorizationRoute";

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

      {/* Search */}

      <Form className="container">
        <div className="search-container">
          <input
            className="form-control"
            type="text"
            placeholder="Search"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />

          <Link
            to="/admin/daftarpasien/tambah"
            className="btn d-flex justify-content-center align-items-center blue-button"
          >
            Tambah
          </Link>
        </div>

        <Table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Medical Record</th>
              <th className="button-space"></th>
            </tr>
          </thead>
          <tbody>
            {inputValue
              ? filterPasien.map((item, index) => (
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.nama_lengkap}</td>
                    <td>{item.no_medical_record}</td>
                    <td>
                      <Link
                        to={`/admin/daftarpasien/${item.id}`}
                        class="btn d-flex justify-content-center align-items-center simple-button"
                      >
                        Lihat Profil
                      </Link>
                    </td>
                  </tr>
                ))
              : pasien.map((item, index) => (
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.nama_lengkap}</td>
                    <td>{item.no_medical_record}</td>
                    <td>
                      <Link
                        to={`/admin/daftarpasien/${item.id}`}
                        class="btn d-flex justify-content-center align-items-center simple-button"
                      >
                        Lihat Profil
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
