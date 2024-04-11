import React, {useEffect, useState} from "react";
import Sidebar from "../../../../components/menu/Sidebar";
import { Form, Button, Table, Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from '../../../../axios';
import { Column } from 'primereact/column';
import "primereact/resources/themes/saga-blue/theme.css";
import { Toolbar } from 'primereact/toolbar';
import { DataTable } from 'primereact/datatable';

export default function Luaran() {

    const [inputValue, setInputValue] = useState('');
    const [filterLuaran, setFilterLuaran] = useState([]);
    const [luaran, setLuaran] = useState([]);


   useEffect(()=>{
    FilterSearchValue();
   }, [inputValue])

      const FilterSearchValue = () => {
        const filteredDiagnosa = luaran.filter((item) => {
          return (
            item.id.toString().includes(inputValue) ||
            item.kode_luaran.toString().toLowerCase().includes(inputValue.toLowerCase()) ||
            item.nama_luaran.toString().toLowerCase().includes(inputValue.toLowerCase())
          );
        });
        setFilterLuaran(filteredDiagnosa);
      };

    
    const getLuaran = async (token) => {
        try {
            await axios.post("/admin/luaran", {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then((res) => {
                console.log(res)
                setLuaran(res?.data?.data);
            })
        } catch (error) {
            
        }
    };

    useEffect(() => {
        getLuaran(localStorage.getItem('token'))
    },[])

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
          <h2>Data Standar Luaran Keperawatan Indonesia</h2>
          <Breadcrumb>
            <Breadcrumb.Item active>Luaran</Breadcrumb.Item>
            <Breadcrumb.Item href="/admin/luaran/tambah">
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
          <DataTable value={inputValue ? filterLuaran : luaran} paginator rows={10}  stripedRows show showGridlines>
                            <Column field="id" header='No'/>
                            <Column field="kode_luaran" header='Kode Luaran'/>
                            <Column field="nama_luaran" header='Nama Luaran'/>
                            <Column 
                            header=''
                            body={(item) => (
                                <Link
                                to={`/admin/standarkeperawatan/luaran/${item.id}`}
                                className="btn d-flex justify-content-center align-items-center blue-button-left-align">Lihat</Link>
                            )}/>
                        </DataTable>
        </div>
        </div>
      </Sidebar>
    );
}