import React, { useEffect, useState } from "react";
import Sidebar from "../../../../components/menu/Sidebar";
import { Form, Button, Table, Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "../../../../axios";

export default function Diagnosis() {
  const [inputValue, setInputValue] = useState("");
  const [filterDataDiagnosa, setFilterDataDiagnosa] = useState([]);
  const [diagnosa, setDiagnosa] = useState([]);


  const FilterSearchValue = () => {
    const filteredDiagnosa = diagnosa.filter((item) => {
      return (
        item.id.toString().includes(inputValue) ||
        item.kode_diagnosa.toString().toLowerCase().includes(inputValue.toLowerCase()) ||
        item.nama_diagnosa.toString().toLowerCase().includes(inputValue.toLowerCase())
      );
    });
    setFilterDataDiagnosa(filteredDiagnosa);
  };

  useEffect(()=>{
    FilterSearchValue()
  }, [inputValue])



  const getDiagnosa = async (token) => {
    try {
      await axios
        .post("/admin/diagnosa", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log(res);
          setDiagnosa(res?.data?.data);
        });
    } catch (error) {}
  };

  useEffect(() => {
    getDiagnosa(localStorage.getItem("token"));
  }, []);


  return (
    <Sidebar>
      {/* Title */}
      <div className="container">
        <h2>Data Standar Diagnosa Keperawatan Indonesia</h2>
        <Breadcrumb>
          <Breadcrumb.Item active>Diagnosis</Breadcrumb.Item>
          <Breadcrumb.Item href="/admin/diagnosa/tambah">
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
            to="/admin/diagnosa/tambah"
            className="btn d-flex justify-content-center align-items-center blue-button"
          >
            Tambah
          </Link>
        </div>

        <table>
          <thead id='thead-admin'>
            <tr>
              <th>No</th>
              <th>Kode Diagnosa</th>
              <th>Nama Diagnosa</th>
              <th className="button-space"></th>
            </tr>
          </thead>
          <tbody>
            {inputValue
              ? filterDataDiagnosa.map((item, index) => (
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.kode_diagnosa}</td>
                    <td>{item.nama_diagnosa}</td>
                    <td>
                      <Link
                        to={`/admin/standarkeperawatan/diagnosis/${item.id}`}
                        class="btn d-flex justify-content-center align-items-center simple-button"
                      >
                        Lihat
                      </Link>
                    </td>
                  </tr>
                ))
              : diagnosa.map((item, index) => (
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.kode_diagnosa}</td>
                    <td>{item.nama_diagnosa}</td>
                    <td>
                      <Link
                        to={`/admin/standarkeperawatan/diagnosis/${item.id}`}
                        class="btn d-flex justify-content-center align-items-center simple-button"
                      >
                        Lihat
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
