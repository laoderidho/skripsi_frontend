import React, { useEffect, useState } from 'react';
import Sidebar from '../../../components/menu/Sidebar';
import { Toolbar } from 'primereact/toolbar';
import { Breadcrumb, Modal, Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link, useParams } from 'react-router-dom';
import axios from '../../../axios'
import ConfirmModal from '../../../components/menu/ConfirmModal';


export default function DetailStatus() {

    const [bed, setBed] = useState([]);
    const [pasien, setPasien] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [triase, setTriase] = useState('');
    const [nama_fasilitas, setNamaFasilitas] = useState([]);
    const [lantai, setLantai] = useState([]);
    const [no_bed, setNoBed] = useState([]);
    const [jenis_ruangan, setJenisRuangan] = useState([]);
    const [inputBed, setInputBed] = useState(null);
    const [boxes, setBoxes] = useState([]);

    const [tanggalRawat, setTanggalRawat] = useState([]);
    const [showTanggal, setShowTanggal] = useState(false);

   

    // selected state form validation
    const [selectedFasilitas, setSelectedFasilitas] = useState('');
    const [selectedLantai, setSelectedLantai] = useState('');
    const [selectedRuangan, setSelectedRuangan] = useState('')
    const [selectedBed, setSelectedBed] = useState('');


    const token = localStorage.getItem("token");
    const {id} = useParams();
    const [showBedSelect, setShowBedSelect] = useState(false);
    const [showLantaiSelect, setShowLantaiSelect] = useState(false);
    const [showJenisRuanganSelect, setShowRuanganSelect] = useState(false);
 

    const handleShow = () => setShowModal(true);
    const  handleClose = () => setShowModal(false);
   

    const filterFasilitas = async (fasilitasName) => {
        setSelectedFasilitas(fasilitasName);
        try {
            const res = await axios.post(`/admin/ruangan/filter-ruangan/${fasilitasName}`,{
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            setJenisRuangan(res.data.data)
        } catch (error) {
            console.log(error)
        }
        setShowRuanganSelect(true);
        
    };
    

    const handleRuanganChange = async (jenis_ruangan) => {
        setSelectedRuangan(jenis_ruangan)
        console.log(jenis_ruangan)
        try {
            const res = await axios.post(`/admin/ruangan/filter-lantai/${selectedFasilitas}/${jenis_ruangan}`,
            {
                headers: { Authorization: `Bearer ${token}`}
            })
            setLantai(res.data.data)
        } catch (error) {
            console.log(error)
        } 

        setShowLantaiSelect(true);
    }

    const handleLantaiChange = async (lantai) => {
        setSelectedLantai(lantai)
        console.log(lantai)
        try {
            const res = await axios.post(`/admin/ruangan/filter-bed/${selectedFasilitas}/${selectedRuangan}/${lantai}`,
            {
                headers: { Authorization: `Bearer ${token}`},
            })
            setNoBed(res.data.data)
        } catch (error) {
            console.log(error)
        }

        setShowBedSelect(true);
    }


    const getPasien = async (token) => {
        try {
            const response = await axios.post(`/admin/daftarpasien/detail/${id}`, {
                headers: { Authorization: `Bearer ${token}` }, // perbaikan
            });
            setPasien(response?.data?.data);
        } catch (error) {
            console.error(error);
        }
    };

    const getBed = async (token) => {
        try {
            const response = await axios.post(`/admin/ruangan/nama-fasilitas`, {
                headers: { Authorization: `Bearer ${token}` }, // perbaikan
            });
            setBed(response?.data?.data);
        } catch (error) {
            console.error(error);
        }
    }

    const getDate = async (token) => {
        try {
            const res = await axios.post(`/admin/pasien/tanggal-rawat/${id}`, {
                headers : { Authorization: `Bearer ${token}`}
            });
            setTanggalRawat(res.data.data);
            setShowTanggal(true);
        } catch (error) {
            console.log(error);
        }
    }

    const submitForm = async (token) => {
        try {
            await axios.post(`/admin/pasien/rawat-inap/${id}`, {
                triase: triase,
                no_bed: inputBed
            },
            {
                header: { Authorization: `Bearer ${token}` },
            });
            setShowModal(false);
            getDate();
        } catch (error) {

        }
    }

    

    useEffect(() => {
        getBed(token); // perbaikan
        getPasien(token); // perbaikan
        getDate(token)
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

            <div className='container'>
                <Row>
                    <Col xs={3}>
                        <div className='detail-box' role='alert'>
                            <Form.Label id='form-label'>Nama</Form.Label>
                            <p>{pasien.nama_lengkap}</p>
                        </div>
                    </Col>
                </Row>
            </div>

            <div className='container pt-3'>
                <Button variant='primary' className="btn blue-button-table" onClick={handleShow}>
                    Tambah
                </Button>

                <Row>
                    <Col xs={9}>
                        <ListGroup className='pt-4'>
                            {tanggalRawat &&  tanggalRawat.map(item => (
                                <ListGroup.Item>
                                    <Row>
                                        <Col xs={8}>
                                            <Form.Label id='form-label'>
                                                <Row>
                                                    <Col>
                                                        <Row>
                                                            <span>Tanggal Masuk: {item.tanggal_masuk}</span>
                                                            <span>Tanggal Keluar: -</span>
                                                        </Row>
                                                    </Col>
                                                    <Col>
                                                        <Row>
                                                            <span>Jam Masuk: {item.jam_masuk}</span>
                                                            <span>Jam Keluar: -</span>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                            </Form.Label>
                                            <p id='form-label' style={{color:'#4e95e0'}}>Status: Ongoing</p> 
                                        </Col>
                                        <Col xs={4}>
                                            <Row>
                                                <Col>
                                                    {/* <Button variant='primary'>Selesai</Button>
                                                    <Button variant='primary'>Lihat</Button> */}
                                                    
                                                </Col>
                                            </Row>
                                           
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                           
                    </Col>
                </Row>
                {/* {tanggalRawat && tanggalRawat.map(item=>(
                    
                    <Row>
                        <Col xs={5}>
                            <Card className='mt-2'>
                                <Card.Body>
                                    <Row>
                                        <Col>
                                            <Form.Label id='form-label'>Tanggal Masuk: {item.tanggal_masuk}</Form.Label>
                                            <p id='form-label'>Tanggal Keluar: -</p>
                                            <p id='form-label'>Status: Ongoing</p>
                                        </Col>
                                        <Col>

                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                ))} */}
            </div>



            {/* Modal Form */}

            <Modal
                show={showModal} onHide={handleClose} centered
            >
                <Modal.Header>
                    <p></p>
                </Modal.Header>
                <Form onSubmit={submitForm}>
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
                           {showJenisRuanganSelect && (
                            <Col md={6}>
                                <Form.Label id="form-label">Jenis Ruangan</Form.Label>
                                <Form.Select name="jenis_ruangan" value={selectedRuangan} onChange={(e)=> handleRuanganChange(e.target.value)}>
                                    <option value="">-</option>
                                    {jenis_ruangan.map(item=>(
                                        <option value={item}>{item}</option>
                                    ))}
                                </Form.Select>
                            </Col>
                           )}


                            
                        </Row>
                        <Row>
                            {showLantaiSelect && (
                                    <Col md={lantai ? 6 : 12}>
                                        <Form.Label id="form-label">Lantai</Form.Label>
                                        <Form.Select name="lantai" value={selectedLantai} onChange={(e)=> handleLantaiChange(e.target.value)}>
                                            <option value="">-</option>
                                            {lantai.map(item => (
                                                <option value={item}>{item}</option>
                                            ))}
                                        </Form.Select>
                                    </Col>
                                )}
                                {showBedSelect && (
                                    <Col md={6}>
                                        <Form.Label id="form-label">Bed</Form.Label>
                                        <Form.Select name="no_bed" value={inputBed} onChange={(e) => setInputBed(e.target.value)}>
                                            <option value="">-</option>
                                            {no_bed.map(item => (
                                                <option value={item.id}>{item.no_bed}</option>
                                            ))}
                                        </Form.Select>
                                    </Col>
                                )}
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                            <Button 
                                onClick={() => setShowModal(false)}
                                variant="secondary">               
                                Cancel
                            </Button>
                            <ConfirmModal 
                                onConfirm={submitForm }
                                successMessage={"Data berhasil ditambahkan"}
                                cancelMessage= {"Data gagal ditambahkan"}
                                buttonText={"Simpan"}       
                            />
                    </Modal.Footer>

                </Form>

            </Modal>

        </Sidebar>
    )
}
