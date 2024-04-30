import React, {useEffect, useState} from "react";
import Sidebar from "../../../../components/menu/SidebarAdmin";
import { Form, Button, Table, Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from '../../../../axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import "primereact/resources/themes/saga-blue/theme.css";
import { Toolbar } from 'primereact/toolbar';
import { BreadCrumb } from 'primereact/breadcrumb';

export default function Intervensi() {

    const [inputValue, setInputValue] = useState('');
    const [intervensi, setIntervensi] = useState([]);
    const [filterIntervensi, setFilterIntervensi] = useState([]);
    const isMobile = window.innerWidth <=600;

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

    const items = [{label: 'Admin'}, {label: 'SKI'}, {label: ''}]

    return (
      <React.Fragment>
        {isMobile ? (
          <>
            <Sidebar>
              <div className="container d-flex align-items-center form-margin container-breadcrumb">
                                  <span>
                                      <Link to={`/admin/standarkeperawatan/diagnosis`}>
                                          <svg xmlns="http://www.w3.org/2000/svg" width='17' height='17' fill='#fff' viewBox="0 0 24 24" stroke-width="1.5" stroke="#085b93" class="w-6 h-6 mb-3">
                                          <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                          </svg>
                                      </Link>
                                  </span>
                                      <BreadCrumb model={items} />

                                      <span>
                                          <p className='title-breadcrumb'>Intervensi</p>
                                      </span>
              </div>
              <div className="container">
                <h3>Standar Intervensi Keperawatan Indonesia</h3>
              </div>

              <div className="container pt-3">
                <Link
                  to={`/admin/intervensi/tambah`}
                  className="btn blue-button-table">Tambah</Link>

                <input
                    className="form-control custom-search mt-2"
                    id="form-width "
                    type="text"
                    placeholder="Search"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />

              </div>

              <div className="container">    
              <DataTable value={inputValue ? filterIntervensi : intervensi} paginator rows={10}  tableStyle={{ minWidth: '2rem' }} stripedRows show showGridlines sortField="nama_intervensi" sortOrder={1}>
                <Column field="kode_intervensi" header='Kode Intervensi'/>
                <Column field="nama_intervensi" header='Nama Intervensi' sortable/>
                <Column 
                  header=''
                  body={(item) => (
                    <Link
                      to={`/admin/standarkeperawatan/intervensi/${item.id}`}
                      className="btn d-flex justify-content-center align-items-center simple-button">Lihat</Link>
                  )}/>
              </DataTable>
       
              </div>
            </Sidebar>
          </>
        ) : (
          <>
            <Sidebar>
                <div className="container d-flex align-items-center form-margin container-breadcrumb">
                                    <span>
                                        <Link to={`/admin/standarkeperawatan/diagnosis`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width='17' height='17' fill='#fff' viewBox="0 0 24 24" stroke-width="1.5" stroke="#085b93" class="w-6 h-6 mb-3">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                            </svg>
                                        </Link>
                                    </span>
                                        <BreadCrumb model={items} />

                                        <span>
                                            <p className='title-breadcrumb'>Intervensi</p>
                                        </span>
                </div>
                <div className="container">
                  <h3>Standar Intervensi Keperawatan Indonesia</h3>
                </div>

                {/* Search */}

                <div className="container pt-5">
                  <Toolbar
                    start={startContent}
                    end={endContent}
                    >
                  </Toolbar>

                  <div className="">
                  <DataTable value={inputValue ? filterIntervensi : intervensi} paginator rows={10}  tableStyle={{ minWidth: '2rem' }} stripedRows show showGridlines>
                                    <Column field="id" header='No'/>
                                    <Column field="kode_intervensi" header='Kode Intervensi'/>
                                    <Column field="nama_intervensi" header='Nama Intervensi'/>
                                    <Column 
                                    header=''
                                    body={(item) => (
                                        <Link
                                        to={`/admin/standarkeperawatan/intervensi/${item.id}`}
                                        className="btn d-flex justify-content-center align-items-center simple-button">Lihat</Link>
                                    )}/>
                                </DataTable>
                  </div>
                </div>
              </Sidebar>
          </>
        )}
      </React.Fragment>
    );
}