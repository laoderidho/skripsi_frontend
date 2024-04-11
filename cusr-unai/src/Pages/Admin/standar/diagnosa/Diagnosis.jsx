import React, { useEffect, useState } from "react";
import Sidebar from "../../../../components/menu/Sidebar";
import { Form, Button, Table, Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "../../../../axios";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import "primereact/resources/themes/saga-blue/theme.css";
import { Toolbar } from 'primereact/toolbar';

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
        to={`/admin/diagnosa/tambah`}
        className="btn blue-button-table">Tambah</Link>
    </React.Fragment>
  );


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

      <div className="container">
        <Toolbar
            start={startContent}
            end={endContent}
            >
          </Toolbar>

        <div className="">
          <DataTable value={inputValue ? filterDataDiagnosa : diagnosa} paginator rows={10}  stripedRows show showGridlines>
                            <Column field="id" header='No'/>
                            <Column field="kode_diagnosa" header='Kode Diagnosa'/>
                            <Column field="nama_diagnosa" header='Nama Diagnosa'/>
                            <Column 
                            header=''
                            body={(item) => (
                                <Link
                                to={`/admin/standarkeperawatan/diagnosis/${item.id}`}
                                className="btn d-flex justify-content-center align-items-center blue-button-left-align">Lihat</Link>
                            )}/>
                        </DataTable>
        </div>
      </div>
    </Sidebar>
  );
}
