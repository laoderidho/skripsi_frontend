import React, { useEffect, useState } from 'react';
import Sidebar from '../../../components/menu/Sidebar';
import { Toolbar } from 'primereact/toolbar';
import { Breadcrumb, Modal, Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import axios from '../../../axios'

export default function DetailStatus() {

    const [bed, setBed] = useState([]);
    const [pasien, setPasien] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [triase, setTriase] = useState('');
    const [nama_fasilitas, setNamaFasilitas] = useState([]);
    const [lantai, setLantai] = useState([]);
    const [no_bed, setNoBed] = useState([]);
    const [selectedFasilitas, setSelectedFasilitas] = useState('');
    const [selectedLantai, setSelectedLantai] = useState('');
    const [selectedBed, setSelectedBed] = useState('');
    const token = localStorage.getItem("token");
    const {id} = useParams();
    const [showBedSelect, setShowBedSelect] = useState(false);
    const [showLantaiSelect, setShowLantaiSelect] = useState(false);


    const handleShow = () => setShowModal(true);
    const  handleClose = () => setShowModal(false);
   
    

    const startContent = (
        <>
            <Button variant='primary' onClick={handleShow}>
                Tambah
            </Button>
        </>
    )

    const filterFasilitas = (fasilitasName) => {
        setSelectedFasilitas(fasilitasName)
        
        const filterLantai = bed.filter(item => item.nama_fasilitas == fasilitasName)

        console.log(filterLantai);
    };

    // const handleNamaFasilitasChange = async (e) => {
    //     const selectedNamaFasilitas = e.target.value;
        

    //     try {
    //         const res = await axios.post(
    //             `/admin/bed/${selectedNamaFasilitas}`,
    //             {
    //                 headers: { Authorization: `Bearer ${localStorage.getItem(token)}`,
    //             },
    //             }
    //         );

    //         const selectedFasilitasData = res.data;
            
    //         setNamaFasilitas(selectedNamaFasilitas);
    //         setSelectedLantai(selectedFasilitasData.lantai);
    //         setSelectedBed(selectedFasilitasData.no_bed);
    //         setShowLantaiSelect(selectedNamaFasilitas !== '');
    //         setShowBedSelect(false);

    //     } catch (error) {

    //     }
    // }

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             await handleNamaFasilitasChange(selectedFasilitas);
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     };

    //     fetchData();
    // }, [selectedFasilitas]);



    const handleLantaiChange = (e) => {
        const selectedLantai = e.target.value;
        setLantai(selectedLantai);
        setSelectedBed('');
        setShowBedSelect(selectedLantai !== '');
    };


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
                       
                        <Row className='pt-3'>
                            <Col md={nama_fasilitas ? 6 : 12}>
                                <Form.Label id="form-label">Fasilitas Kesehatan</Form.Label>
                                <Form.Select name="nama_fasilitas" value={selectedFasilitas} onChange={(e)=> filterFasilitas(e.target.value)}>
                                    <option value="">-</option>
                                    {bed.map(item => (
                                        <option key={item.id} value={item.nama_fasilitas}>{item.nama_fasilitas}</option>
                                    ))}
                                </Form.Select>
                            </Col>
                            {showLantaiSelect && (
                                <Col md={lantai ? 3 : 6}>
                                    <Form.Label id="form-label">Lantai</Form.Label>
                                    <Form.Select name="lantai" value={selectedLantai} onChange={handleLantaiChange}>
                                        <option value="">-</option>
                                        {bed.filter(item => item.nama_fasilitas === selectedFasilitas)
                                        .map(item => (
                                            <option key={item.id} value={item.lantai}>{item.lantai}</option>
                                        ))}
                                    </Form.Select>
                                </Col>
                            )}
                            {showBedSelect && (
                                <Col md={3}>
                                    <Form.Label id="form-label">Bed</Form.Label>
                                    <Form.Select name="no_bed" value={selectedBed} onChange={(e) => setSelectedBed(e.target.value)}>
                                        <option value="">-</option>
                                        {bed.filter(item => ( item.nama_fasilitas === selectedFasilitas && item.lantai === selectedLantai)
                                        .map(item => (
                                            <option key={item.id} value={item.no_bed}>{item.no_bed}</option>
                                        )))}
                                    </Form.Select>
                                </Col>
                            )}
                        </Row>
                    </Modal.Body>

                </Form>

            </Modal>

        </Sidebar>
    )
}
