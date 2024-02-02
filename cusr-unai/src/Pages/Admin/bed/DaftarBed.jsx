import React, {useEffect, useState} from "react";
import Sidebar from "../../../components/menu/Sidebar";
import { Form, Button, Table, Breadcrumb, Modal, ModalHeader } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Dialog } from '@headlessui/react';
import ConfirmModal from '../../../components/menu/ConfirmModal'
import axios from '../../../axios'
import { Dropdown } from 'primereact/dropdown';
import "primereact/resources/themes/saga-blue/theme.css";


export default function DaftarBed() {

    const [showModal, setShowModal] = useState(false);
    const [bed, setBed] = useState([]);
    const {id} = useParams();
    const [showModalStatus, setShowModalStatus] = useState(false);

    const [inputValue, setInputValue] = useState("");
    const [filterBed, setFilterBed] = useState("");

    const [kesediaan, setKesediaan] = useState('');
    const [dataStatus,  setDataStatus] = useState('');

    const sedia = [
        { name: 'Tersedia', code: 'T' },
        { name: 'Tidak Tersedia', code: 'TS' }
    ];

    const addBed = async () => {
        try {
            const res = await axios.post(`/pasien/add-bed/${id}`, {
                kesediaan: kesediaan,
                status: 1
            },
            {
                headers: { Authorization: `Bearer ${token}` }
            });
        } catch (error) {

        }
    };

    const filteredBed = () => {
        const filteredRoom = bed.filter((item) => {
            return (
                item.bed.toString().includes(inputValue) ||
                item.status.toString().toLowerCase().includes(inputValue.toLowerCase()) ||
                item.nama_lengkap.toString().tozlowerCase().includes(inputValue.toLowerCase())
            );
        });
        setFilterBed(filteredRoom);
    }

    const detailSedia = async () => {
        try{
            const res = await axios.post(`/pasien/bed/status/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setDataStatus(res.data.data.message)
        } catch (error) {

        }
    };

    useEffect( () => {
        filteredBed();
        detailSedia();
        getData();
    },[inputValue])


    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);


    const getData = async (token) => {
        try {
            await axios.post(`/admin/bed`, {
                headers: { Authorization : `Bearer $(token)` },
            })
            .then((res) => {
                console.log(res)
                setBed(res?.data?.data);
            });
        } catch (error) {
        } 
    };

    const submitForm = async () => {
        try {
            const res = await axios.post(`/admin/bed/tambah`, {
                bed: bed,
            },
            {
                headers: { Authorization: `Bearer ${token}`}
            });
            navigate("/admin/bed")
        } catch (error) {

        }
    };



    return (
        <Sidebar>
            <div className="container">
                <h2>Daftar Bed</h2>
                <Breadcrumb>
                <Breadcrumb.Item active>Daftar Bed</Breadcrumb.Item>
                <Breadcrumb.Item href="/admin/bed/tambah">
                    Tambah
                </Breadcrumb.Item>
                </Breadcrumb>

                <div className="search-container">
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Search"
                        // value={inputValue}
                        // onChange={(e) => setInputValue(e.target.value)}
                    />

                    <Button
                        className="btn d-flex justify-content-center align-items-center blue-button"
                        onClick={handleShow}
                    >
                        Tambah
                    </Button>

                    <Table>
                        <thead>
                            <tr>
                                <th>Nama Bed</th>
                                <th>Status</th>
                                <th>Nama Pengguna</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {inputValue
                            ? filterBed.localeCompare((item,index) => (
                                <tr key={index}>
                                    <td>{item.bed}</td>
                                    <td>{item.status}</td>
                                    <td>
                                        <Button>
                                            Edit
                                        </Button>
                                    </td>
                                </tr>
                            ))
                            : bed.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.bed}</td>
                                    <td>{item.status}</td>
                                    <td>
                                        <Button>
                                            Edit
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    {/* Modal Bed */}

                    <Modal  
                        show={showModal} 
                        onHide={handleClose} centered>
                        <Modal.Header>
                            <Modal.Title>Tambah Bed Baru</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={addBed}>
                                <Form.Group>
                                    <Form.Label>Tambah</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Masukkan Nama Bed"
                                        value={bed}
                                        onChange={(e) => setBed(e.target.value)}
                                    />
                                    
                                        <ConfirmModal 
                                            onConfirm={submitForm}
                                            successMessage="Data berhasil ditambahkan"
                                            cancelMessage="Data gagal ditambahkan"
                                            buttonText="Simpan"
                                            
                                        />

                                        <button 
                                            onClick={() => setShowModal(false)}
                                            className="btn d-flex justify-content-center align-items-center red-button"
                                            style={{ marginRight: '10px'}}
                                            >Cancel
                                        </button>
                                   
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                    </Modal>

                    {/* Modal Status */}

                    <Modal  
                        show={showModalStatus} 
                        onHide={() => setShowModalStatus(!showModalStatus)} centered>
                        <Modal.Header>
                            <Modal.Title>Tambah Bed Baru</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group>
                                    <Form.Label>Tambah</Form.Label>
                                    <Dropdown
                                        value={kesediaan}
                                        options={sedia}
                                        onChange={(e)=>setKesediaan(e.target.value)}
                                        className="pt-1"
                                        placeholder="Pilih"
                                    >
                                    </Dropdown>

                                    
                                    
                                        <ConfirmModal 
                                            onConfirm={submitForm}
                                            successMessage="Data berhasil Diubah"
                                            cancelMessage="Data gagal Diubah"
                                            buttonText="Simpan"
                                            
                                        />

                                        <button 
                                            onClick={() => setShowModal(false)}
                                            className="btn d-flex justify-content-center align-items-center red-button"
                                            style={{ marginRight: '10px'}}
                                            >Cancel
                                        </button>
                                   
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                    </Modal>

                </div>

                
            </div>

            
        </Sidebar>
    )
}