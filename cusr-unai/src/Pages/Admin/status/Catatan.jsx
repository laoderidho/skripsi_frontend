import React, { useEffect, useState } from 'react';
import Sidebar from '../../../components/menu/SidebarAdmin';
import { Toolbar } from 'primereact/toolbar';
import { Breadcrumb, Modal, Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link, useParams } from 'react-router-dom';
import axios from '../../../axios'
import ConfirmModal from '../../../components/menu/ConfirmModal';
import { BreadCrumb } from 'primereact/breadcrumb';
import { filterProps } from 'framer-motion';


export default function Catatan() {

    const [bed, setBed] = useState([]);
    const [pasien, setPasien] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showAlertSelesai, setShowAlertSelesai] = useState(false);
    // const [triase, setTriase] = useState('');
    const [nama_fasilitas, setNamaFasilitas] = useState([]);
    const [lantai, setLantai] = useState([]);
    const [no_bed, setNoBed] = useState([]);
    const [jenis_ruangan, setJenisRuangan] = useState([]);
    const [inputBed, setInputBed] = useState(null);
    const [boxes, setBoxes] = useState([]);
    const [nokamar, setNoKamar] = useState([]);
    const [isEditing, setIsEditing] = useState(false);

    const [tanggalRawat, setTanggalRawat] = useState([]);
    const [showTanggal, setShowTanggal] = useState(false);

   

    // selected state form validation
    const [selectedFasilitas, setSelectedFasilitas] = useState('');
    const [selectedLantai, setSelectedLantai] = useState('');
    const [selectedRuangan, setSelectedRuangan] = useState('')
    const [selectedBed, setSelectedBed] = useState('');
    const [selectedNoKamar, setSelectedNoKamar]= useState('');


    const token = localStorage.getItem("token");
    const {id} = useParams();
    const [showBedSelect, setShowBedSelect] = useState(false);
    const [showLantaiSelect, setShowLantaiSelect] = useState(false);
    const [showJenisRuanganSelect, setShowRuanganSelect] = useState(false);
    const isMobile = window.innerWidth <=600;

    const [idBed, setIdBed] = useState(null);

    const [perawatanid, setPerawatanId] = useState(null);
 

    const handleShow = () => {
        setShowModal(true);
    };

    const handleShowAlert = (id) => {
        setShowAlertSelesai(true);
        setPerawatanId(id);
    };


    const  handleClose = () => {
        setShowModal(false);
        setShowAlertSelesai(false);
    };

    const filterBedWithAll = async(no_kamar) =>{
        try {
            const res = await axios.post(`/admin/ruangan/filter-bed/${no_kamar}`,{
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            setNoBed(res.data.data)
            setSelectedNoKamar(no_kamar)
        } catch (error) {
            console.log(error)
        }
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
            const response = await axios.post(`/admin/bed`, {
                headers: { Authorization: `Bearer ${token}` }, // perbaikan
            });
            const data = response.data.data;
            const no_kamar = data.map(item => item.no_kamar);
            const unique = [...new Set(no_kamar)];
            setNoKamar(unique);
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
                no_bed: inputBed
            },
            {
                headers: { Authorization: `Bearer ${token}` },
            });
            setShowModal(false);
            getDate();
        } catch (error) {

        }
    }

    const getSembuh = async () => {
        try {
            const res = await axios.post(`/admin/rawat-inap/recover/${perawatanid}`, {
                headers: { Authorization: `Bearer ${token}`}
            });
            setShowAlertSelesai(false);
            await  getDate(token);
            
        } catch (error) {

        }
    }

    const getDetailEditRawatInap = async (id) => {
        try {
            const res = await axios.post(`/admin/rawat-inap/detail/${id}`,{
                    headers : { Authorization: `Bearer ${token}`}
            })
            console.log(res.data.bed)
            setInputBed(res.data.bed.id)
            setNoBed([{id: res.data.bed.id, no_bed: res.data.bed.no_bed}]);
        } catch (error){

        }
    }
    const editClick = async (id) => {

        getDetailEditRawatInap(id);
        setPerawatanId(id);
        setIsEditing(true);
        setShowModal(true);
    }

    const editForm = async () => {
        try {
            await axios.post(`/admin/rawat-inap/update/${perawatanid}`, {
                no_bed: inputBed
            },
            {
                headers: { Authorization: `Bearer ${token}`}
            });
            setShowModal(false);
        } catch (error) {

        }
    }

    

    useEffect(() => {
        getBed(token); // perbaikan
        getPasien(token); // perbaikan
        getDate(token)

    }, []); // perbaikan

    const items = [{label: 'Pasien'}, {label: 'Catatan'}, {label: ''}]

  

    return (
        <React.Fragment>
            {isMobile ? (
                <>
                    <Sidebar>

                        <div className="container d-flex align-items-center form-margin container-breadcrumb">
                              <span>
                              <Link to={`/admin/daftarpasien`}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width='17' height='17' fill='#fff' viewBox="0 0 24 24" stroke-width="1.5" stroke="#085b93" class="w-6 h-6 mb-3">
                                  <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                  </svg>
                              </Link>
                              </span>
                              <BreadCrumb model={items} />

                              <span>
                              <p className='title-breadcrumb'>Catatan Rawat Inap</p>
                              </span>
                        </div>
                        <div className='container'>
                            <h3>Catatan</h3>
                        </div>

                        <div className="container mt-2">
                                    <div className="alert-pasien-custom">
                                        <div className='space-label'>
                                        <Row>
                                            <Col>
                                            <Row>
                                                <span className='shift-label'>Nama</span>
                                            </Row>
                                            <Row>
                                                <span id='form-label' className="alert-info ">{pasien.nama_lengkap}</span>
                                            </Row>
                                            </Col>
                                            
                                        </Row>
                                        </div>
                                    </div>
                        </div>

                        <div className='container pt-3'>
                            <Button variant='primary' className="btn blue-button-table" onClick={handleShow}>
                                Tambah
                            </Button>

                            <Row>
                                <Col xs={12}>
                                    <ListGroup className='pt-4'>
                                        {tanggalRawat &&  tanggalRawat.map(item => (
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col xs={12}>
                                                        <Form.Label id='form-label'>
                                                            <Row>
                                                                <Row>
                                                                    <Col>
                                                                        <Row>
                                                                            <span>Tanggal Masuk: {item.tanggal_masuk}</span>
                                                                            {item.status === 'sembuh' ? <span>Tanggal Keluar: {item.tanggal_keluar}</span> : <span>Tanggal Keluar: -</span>}
                                                                        </Row>
                                                                    </Col>
                                                                    <Col>
                                                                        <Row>
                                                                            <span>Jam Masuk: {item.jam_masuk}</span>
                                                                            {item.status === 'sembuh' ? <span>Jam Keluar: {item.jam_keluar}</span> : <span>Jam Keluar: -</span>}
                                                                        </Row>
                                                                    </Col>
                                                                    <Col>
                                                                        <span id='form-label' style={{ color: item.status === 'sembuh' ? '#212529' : '#4e95e0' }}>Status: {item.status === 'sembuh' ? "Selesai" : "Ongoing"}</span>
                                                                        <br/>
                                                                    
                                                                    </Col>
                                                            </Row>
                                                            <Row className='mt-4 gap-custom'>
                                                            {item.status !== 'sembuh' && (
                                                                    <>
                                                                        <Col xs={1}>
                                                                            <Button
                                                                                className='btn edit-button'
                                                                                onClick={() => editClick(item.id)}
                                                                            >Edit</Button>
                                                                        </Col>
                                                                        <Col xs={4}>
                                                                            <Button style={{marginLeft: '4rem'}} className='btn confirm-button'
                                                                            onClick={()=>handleShowAlert(item.id)}>Selesai</Button>
                                                                        </Col>
                                                                    </>
                                                                )}

                                                            </Row>
                                                            </Row>
                                                        </Form.Label>
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
                                    {/* <Form.Group>
                                        <Form.Label id="form-label">Triase</Form.Label>
                                        <Form.Select name="triase" value={triase} onChange={(e)=> setTriase(e.target.value)}>
                                            <option value="">-</option>
                                            <option value="hijau">Hijau</option>
                                            <option value="kuning">Kuning</option>
                                            <option value="merah">Merah</option>
                                            <option value="hitam">Hitam</option>
                                        </Form.Select>
                                    </Form.Group> */}
                                
                                    <Row className='pt-2'>
                                                <Col md={6}>
                                                    <Form.Label id="form-label">Nomor Kamar</Form.Label>
                                                    <Form.Select name="lantai" value={selectedLantai} onChange={(e)=> filterBedWithAll(e.target.value)}>
                                                        <option value="">-</option>
                                                        {nokamar.map(item => (
                                                            <option value={item}>{item}</option>
                                                        ))}
                                                    </Form.Select>
                                                </Col>
                                
                                
                                                <Col md={6}>
                                                    <Form.Label id="form-label">Bed</Form.Label>
                                                    <Form.Select name="no_bed" value={inputBed} onChange={(e) => setInputBed(e.target.value)}>
                                                        <option value="">-</option>
                                                        {no_bed.map(item => (
                                                            <option value={item.id}>{item.no_bed}</option>
                                                        ))}
                                                    </Form.Select>
                                                </Col>
                                    </Row>
                                </Modal.Body>
                                <Modal.Footer>
                                        <Button 
                                            onClick={() => setShowModal(false)}
                                            variant="secondary">               
                                            Cancel
                                        </Button>
                                        <ConfirmModal 
                                            onConfirm={isEditing? editForm : submitForm}
                                            successMessage={isEditing ? "Data berhasil diubah" : "Data berhasil ditambahkan"}
                                            cancelMessage= {isEditing? "Data gagal diubah" : "Data gagal ditambahkan"}
                                            buttonText={isEditing ? "Edit" : "Simpan"}       
                                        />
                                </Modal.Footer>

                            </Form>
                        </Modal>

                        {/* Alert Selesai */}

                        <Modal
                            show={showAlertSelesai} onHide={handleClose} centered>
                            <Modal.Body>
                                <p>Pasien akan dinyatakan selesai di rawat inap.</p>

                                <ConfirmModal 
                                    onConfirm={getSembuh}
                                    successMessage={"Berhasil"}
                                    cancelMessage= {"Gagal"}
                                    buttonText={"Selesai"}       
                                />
                            
                            </Modal.Body>

                        </Modal>

                    </Sidebar>
                </>
            ) : (
                <>
                    <Sidebar>
                        <div className="container d-flex align-items-center form-margin container-breadcrumb">
                                <span>
                                <Link to={`/admin/daftarpasien`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width='17' height='17' fill='#fff' viewBox="0 0 24 24" stroke-width="1.5" stroke="#085b93" class="w-6 h-6 mb-3">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                    </svg>
                                </Link>
                                </span>
                                <BreadCrumb model={items} />

                                <span>
                                <p className='title-breadcrumb'>Catatan Rawat Inap</p>
                                </span>
                            </div>

                            <div className='container'>
                                <h3>Catatan</h3>
                        </div>

                        
                                <div className="container mt-2">
                                    <div className="alert-pasien-custom">
                                        <div className='space-label'>
                                        <Row>
                                            <Col>
                                            <Row>
                                                <span className='shift-label'>Nama</span>
                                            </Row>
                                            <Row>
                                                <span id='form-label' className="alert-info ">{pasien.nama_lengkap}</span>
                                            </Row>
                                            </Col>
                                            
                                        </Row>
                                        </div>
                                    </div>
                                </div>

                        <div className='container pt-5'>
                            <Button variant='primary' className="btn blue-button-table" onClick={handleShow}>
                                Tambah
                            </Button>

                            <Row>
                                <Col xs={8}>
                                    <ListGroup className='pt-4'>
                                        {tanggalRawat &&  tanggalRawat.map(item => (
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col xs={12}>
                                                        <Form.Label id='form-label'>
                                                            <Row>
                                                                <Row>
                                                                    <Col xs={6}>
                                                                        <Row>
                                                                            <span>Tanggal Masuk: {item.tanggal_masuk}</span>
                                                                            {item.status === 'sembuh' ? <span>Tanggal Keluar: {item.tanggal_keluar}</span> : <span>Tanggal Keluar: -</span>}
                                                                        </Row>
                                                                    </Col>
                                                                    <Col xs={4}>
                                                                        <Row>
                                                                            <span>Jam Masuk: {item.jam_masuk}</span>
                                                                            {item.status === 'sembuh' ? <span>Jam Keluar: {item.jam_keluar}</span> : <span>Jam Keluar: -</span>}
                                                                        </Row>
                                                                    </Col>
                                                                    <Col xs={1}>
                                                                        <span id='form-label' style={{ color: item.status === 'sembuh' ? '#212529' : '#4e95e0' }}>Status: {item.status === 'sembuh' ? "Selesai" : "Ongoing"}</span>
                                                                        <br/>
                                                                    
                                                                    </Col>
                                                            </Row>
                                                            <Row className='mt-4 gap-custom'>
                                                            {item.status !== 'sembuh' && (
                                                                    <>
                                                                        <Col xs={2}>
                                                                            <Button
                                                                                className='btn edit-button'
                                                                                onClick={() => editClick(item.id)}
                                                                            >Edit</Button>
                                                                        </Col>
                                                                        <Col>
                                                                            <Button className='btn confirm-button'
                                                                            onClick={()=>handleShowAlert(item.id)}>Selesai</Button>
                                                                        </Col>
                                                                    </>
                                                                )}

                                                            </Row>
                                                            </Row>
                                                        </Form.Label>
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
                                    {/* <Form.Group>
                                        <Form.Label id="form-label">Triase</Form.Label>
                                        <Form.Select name="triase" value={triase} onChange={(e)=> setTriase(e.target.value)}>
                                            <option value="">-</option>
                                            <option value="hijau">Hijau</option>
                                            <option value="kuning">Kuning</option>
                                            <option value="merah">Merah</option>
                                            <option value="hitam">Hitam</option>
                                        </Form.Select>
                                    </Form.Group> */}
                   
                                        <Row>
                                
                                                <Col md={6}>
                                                    <Form.Label id="form-label">Kamar</Form.Label>
                                                    <Form.Select name="lantai" value={selectedNoKamar} onChange={(e)=> filterBedWithAll(e.target.value)}>
                                                        <option value="">-</option>
                                                        {nokamar.map(item => (
                                                            <option value={item}>{item}</option>
                                                        ))}
                                                    </Form.Select>
                                                </Col>
                                
                                
                                                <Col md={6}>
                                                    <Form.Label id="form-label">Bed</Form.Label>
                                                    <Form.Select name="no_bed" value={inputBed} onChange={(e) => setInputBed(e.target.value)}>
                                                        <option value="">-</option>
                                                        {no_bed.map(item => (
                                                            <option value={item.id}>{item.no_bed}</option>
                                                        ))}
                                                    </Form.Select>
                                                </Col>
                                    </Row>
                                </Modal.Body>
                                <Modal.Footer>
                                        <Button 
                                            onClick={() => setShowModal(false)}
                                            variant="secondary">               
                                            Cancel
                                        </Button>
                                        <ConfirmModal 
                                            onConfirm={isEditing? editForm : submitForm}
                                            successMessage={isEditing ? "Data berhasil diubah" : "Data berhasil ditambahkan"}
                                            cancelMessage= {isEditing? "Data gagal diubah" : "Data gagal ditambahkan"}
                                            buttonText={isEditing ? "Edit" : "Simpan"}       
                                        />
                                </Modal.Footer>

                            </Form>
                        </Modal>

                        {/* Alert Selesai */}

                        <Modal
                            show={showAlertSelesai} onHide={handleClose} centered>
                            <Modal.Body>
                                <p>Pasien akan dinyatakan selesai di rawat inap.</p>

                                <ConfirmModal 
                                    onConfirm={getSembuh}
                                    successMessage={"Berhasil"}
                                    cancelMessage= {"Gagal"}
                                    buttonText={"Selesai"}       
                                />
                            
                            </Modal.Body>

                        </Modal>

                    </Sidebar>
                </>
            )}
        </React.Fragment>
    )
}
