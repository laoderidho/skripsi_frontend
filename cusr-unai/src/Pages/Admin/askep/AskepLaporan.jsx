import React, { useState, useEffect } from 'react';
import Sidebar from '../../../components/menu/SidebarAdmin';
import "primereact/resources/themes/saga-blue/theme.css";
import { Form, Button, Modal, Container, Col, Row} from "react-bootstrap";
import { Toolbar } from 'primereact/toolbar';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import axios from '../../../axios';
import { Link, useParams } from "react-router-dom";
import ConfirmModal from '../../../components/menu/ConfirmModal';
import { Skeleton } from 'primereact/skeleton';
import { BreadCrumb } from 'primereact/breadcrumb';

export default function AskepLaporan() {

    const [inputValue, setInputValue] = useState('');
    const [filterPasien, setFilterPasien] = useState();
    const [pasien, setPasien] = useState([]);
    const [nama_lengkap, setNamaLengkap] = useState('');
    const [getRow, setGetRow] = useState([]);

    const {id, nama} = useParams();
    const token = localStorage.getItem('token');

    

    const filteredPasien = () => {
        const filteredDiagnosa = pasien.filter((item) => {
            return (
                item.id.toString().includes(inputValue) ||
                item.nama_lengkap
                    .toString()
                    .toLowerCase()
                    .includes(inputValue.toLowerCase()) ||
                (item.triase && item.triase.toString().toLowerCase().includes(inputValue.toLowerCase()))            
            );
        });
        setFilterPasien(filteredDiagnosa);
    }
    

    useEffect(()=>{
        filteredPasien()
    },[inputValue])

    const getList = async () => {
        try {
        const res = await axios.post(`/admin/laporan/date-perawatan/${id}`,
        {
            headers: { Authorization: `Bearer ${token}`}
        });
        setGetRow(res.data)
        } catch (error) {
        
        }
    }

    useEffect(() => {
        getList();
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
      )

    const items = [{label: 'Pasien'}, {label: 'ASKEP'}, {label: ''}]

    return(
        <Sidebar>
            <div className="container d-flex align-items-center container-breadcrumb">
                                <span>
                                <Link to={`/admin/pasien/askep`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width='17' height='17' fill='#fff' viewBox="0 0 24 24" stroke-width="1.5" stroke="#085b93" class="w-6 h-6 mb-3">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                    </svg>
                                </Link>
                                </span>
                                <BreadCrumb model={items} />

                                <span>
                                <p className='title-breadcrumb'>Download</p>
                                </span>
             </div>

            <div className='container'>
                <h3>Download Asuhan Keperawatan</h3>
            </div>

            <div className='container pt-5'>
                <Toolbar
                    end={endContent}>
                </Toolbar>

                <table className='bordered mt-5' id='border'>
                    <thead className='table-head'>
                        <tr>
                            <th className='font-adjust'>Tanggal</th>
                            <th className='font-adjust'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {getRow && getRow.map(item => (
                            <tr>
                                <td className='font-adjust-td'>{item.tanggal_masuk} - {item.tanggal_keluar ? item.tanggal_keluar : "Sekarang"}</td>
                                <td>
                                    <Link to={`/admin/pasien/askep/download-pdf/${item.id}`} className='btn blue-button-left-align' target='_blank'>
                                        Download
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </Sidebar>
    )
}