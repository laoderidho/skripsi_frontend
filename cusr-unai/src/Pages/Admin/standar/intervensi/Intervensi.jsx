import React, {useEffect, useState} from "react";
import Sidebar from "../../../../components/menu/Sidebar";
import { Form, Button, Table, Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from '../../../../axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import "primereact/resources/themes/saga-blue/theme.css";
import { Toolbar } from 'primereact/toolbar';

export default function Intervensi() {

    const [inputValue, setInputValue] = useState('');
    const [intervensi, setIntervensi] = useState([]);
    const [filterIntervensi, setFilterIntervensi] = useState([]);

    const filteredIntervensi = (value) => {
          const filteredIntervensi = intervensi.filter((item) => {
            return (
              item.id.toString().includes(inputValue) ||
              item.kode_intervensi
                .toString()
                .toLowerCase()
                .includes(inputValue.toLowerCase()) ||
              item.nama_intervensi
                .toString()
                .toLowerCase()
                .includes(inputValue.toLowerCase())
            );
          });
          setFilterIntervensi(filteredIntervensi);
    };

    useEffect(()=>{
        filteredIntervensi()
    },[inputValue])


   
    const getIntervensi = async (token) => {
        try {
            await axios.post("/admin/intervensi", {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then((res) => {
                console.log(res)
                setIntervensi(res?.data?.data);
            })
        } catch (error) {
            
        }
    };

    useEffect(() => {
        getIntervensi(localStorage.getItem('token'))
    },[])

    console.log(intervensi)

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
          to={`/admin/intervensi/tambah`}
          className="btn blue-button-table">Tambah</Link>
      </React.Fragment>
    );

    return (
      <Sidebar>
        {/* Title */}
        <div className="container">
          <h2>Data Standar Intervensi Keperawatan Indonesia</h2>
          <Breadcrumb>
            <Breadcrumb.Item active>Intervensi</Breadcrumb.Item>
            <Breadcrumb.Item href="/admin/intervensi/tambah">
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
          <DataTable value={inputValue ? filterIntervensi : intervensi} paginator rows={10}  stripedRows show showGridlines>
                            <Column field="id" header='No'/>
                            <Column field="kode_intervensi" header='Kode Intervensi'/>
                            <Column field="nama_intervensi" header='Nama Intervensi'/>
                            <Column 
                            header=''
                            body={(item) => (
                                <Link
                                to={`/admin/standarkeperawatan/intervensi/${item.id}`}
                                className="btn d-flex justify-content-center align-items-center blue-button-left-align">Lihat</Link>
                            )}/>
                        </DataTable>
          </div>
        </div>
      </Sidebar>
    );
}