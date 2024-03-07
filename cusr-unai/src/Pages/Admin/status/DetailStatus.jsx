import React, { useEffect, useState } from 'react';
import Sidebar from '../../../components/menu/Sidebar';
import { Toolbar } from 'primereact/toolbar';
import { Breadcrumb, Modal, Form, Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import axios from '../../../axios'

export default function DetailStatus() {

    const [bed, setBed] = useState([]);
    const [pasien, setPasien] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [triase, setTriase] = useState('');
    const [nama_fasilitas, setNamaFasilitas] = useState([]);
    const token = localStorage.getItem("token");
    const {id} = useParams()

    const handleShow = () => setShowModal(true);
    const  handleClose = () => setShowModal(false);
   
    

    const startContent = (
        <>
            <Button variant='primary' onClick={handleShow}>
                Tambah
            </Button>
        </>
    )


    const getPasien = async (token) => {
        try {
            const response = await axios.post(`/admin/daftarpasien/detail/${id}`, {
                headers: { Authorization: `Bearer ${token}` }, // perbaikan
            });
            console.log(response);
            setPasien(response?.data?.data);
        } catch (error) {
            console.error(error);
        }
    };

    const getBed = async (token) => {
        try {
            const response = await axios.post(`/admin/bed`, {
                headers: { Authorization: `Bearer ${token}` }, // perbaikan
            });
            console.log(response?.data?.data);
            setBed(response?.data?.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getBed(token); // perbaikan
        getPasien(token); // perbaikan
    }, []); // perbaikan

  

    return (
        <Sidebar>
            <div className='container'>
                <h2>Detail</h2>
                <Breadcrumb>
                    <Breadcrumb.Item active>Daftar Status</Breadcrumb.Item>
                    <Breadcrumb.Item href="/admin/bed/tambah">
                        Tambah
                    </Breadcrumb.Item>
                </Breadcrumb>
            </div>

            <div className='container alert alert-light' role='alert'>
                    <span>Nama:</span> <span>{pasien.nama_lengkap}</span>
            </div>

            <div className='container pt-5'>
                <Toolbar start={startContent} />
            </div>

            <Modal
                show={showModal} onHide={handleClose} centered
            >
                <Modal.Header>
                    <p></p>
                </Modal.Header>
                <Form>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label id="form-label">Triase</Form.Label>
                            <Form.Select name="triase" value={triase} onChange={(e)=> setTriase(e.target.value)}>
                                <option value="">-</option>
                                <option value="hijau">Hijau</option>
                                <option value="kuning">Kuning</option>
                                <option value="merah">Merah</option>
                                <option value="hitam">Hitam</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label id="form-label">Fasilitas Kesehatan</Form.Label>
                            <Form.Select name="triase" value={triase} onChange={(e)=> setTriase(e.target.value)}>
                                <option value="">-</option>
                                {bed.map(item=>(
                                    <option value={item.nama_fasilitas}>{item.nama_fasilitas}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Modal.Body>

                </Form>

            </Modal>

        </Sidebar>
    )
}
