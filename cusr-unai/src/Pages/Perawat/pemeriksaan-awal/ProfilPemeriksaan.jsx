import React, {Fragment, useEffect, useState} from "react";
import Sidebar from "../../../components/menu/Sidebar";
import { Form, Button, Table, Container, Row, Col, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from 'react-router-dom'
import axios from "../../../axios";
import AuthorizationRoute from "../../../AuthorizationRoute";

export default function ProfilPemeriksaan() {

    // Autocomplete

    const [inputValue, setInputValue] = useState('');
    const [boxes, setBoxes] = useState([]);
    const [tanggal, setTanggal] = useState([]);
    const [filterTanggal, setFilterTanggal] = useState([]);
    const [pasien, setPasien] = useState([]);
    const [nama_lengkap, setNamaLengkap] = useState("");
    const {id} = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const isMobile = window.innerWidth <=600;
    const [showAnamnesis, setShowAnamnesis] = useState(false);

    const [keluhan_utama, setKeluhanUtama] = useState("");
    const [riwayat_penyakit, setRiwayatPenyakit] = useState("");
    const [riwayat_alergi, setRiwayatAlergi] = useState("");
    const [risiko_jatuh, setRisikoJatuh] = useState("");
    const [risiko_nyeri, setRisikoNyeri] = useState("");

    const handleShow = () => {
        setShowAnamnesis(true);
    }

    const handleHide = () => {
        setShowAnamnesis(false);
    }

    useEffect(() => {
        getDataById();
        handleAddBox();
        getAnamnesis();
    },[]);

    const getDataById = async () => {
        try {
            const res = await axios.post(`/perawat/daftarpasien/detail/${id}`, {}, {
                headers: { Authorization: `Bearer ${token}`}
            });
            setNamaLengkap(res.data.data.nama_lengkap)
        } catch (error) {

        }
    };

    const getAnamnesis = async () => {
        try {
            const res = await axios.post(`/amnanessa/detail/${id}`,
        {
            headers: { Authorization: `Bearer ${token}`}
        });

        setKeluhanUtama(res.data.data.keluhan_utama);
        setRiwayatPenyakit(res.data.data.riwayat_penyakit);
        setRiwayatAlergi(res.data.data.riwayat_alergi);
        setRisikoJatuh(res.data.data.risiko_jatuh);
        setRisikoNyeri(res.data.data.risiko_nyeri);
        console.log(res.data.data)
        } catch (error) {
            
        }
    };

    const handleAddBox = async () => {
        try {
            const res = await axios.post(`/perawat/diagnostic/getlist/${id}`, {
                headers: { Authorization: `Bearer ${token}`}
            }); 
            setBoxes(res.data.data)
            console.log(res.data.data)
        } catch (error) {

        }
    };

    const ubahFormatTanggal = (tanggal) => {
        const dateObj = new Date(tanggal);
        const formattedDate = dateObj.toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
        return formattedDate;
    };


    // const handleAddBox = () => {
    //     const currentDate = new Date();
    //     const formattedDate = currentDate.toLocaleDateString('id-ID', {
    //         year: 'numeric',
    //         month: 'long',
    //         day: 'numeric',
    //     });
    //     setBoxes([...boxes, formattedDate]);
    // }

    const filteredTanggal = () => {
        const filteredTanggal = tanggal.filter((item) => {
            return (
                item.date
                .toString()
                .toLowerCase()
                .includes(inputValue.toLowerCase())
            );
        });
        setFilterTanggal(filteredTanggal);
    }

    useEffect(() => {
        filteredTanggal()
    },[inputValue])
    
    

  return (
      <Fragment>
        {isMobile ? (
            <Fragment>
                <Sidebar title='DIAGNOSTIK'>
                    {/* Title */}
                    <div className="container">
                        <h2>Data Diagnostik</h2>
                    </div>

                    <div className="container">
                        <div className="container-fluid container">
                            <div className="container mt-2">
                            <div className="alert-pasien">
                                <div className='space-label'>
                                <Row>
                                    <Col>
                                    <Row>
                                        <span className='shift-label'>Pasien</span>
                                    </Row>
                                    <Row>
                                        <span id='form-label' className="alert-info">{nama_lengkap}</span>
                                    </Row>
                                    </Col>
                                    <Col>
                                    <Row>
                                        <div className="mt-2" style={{marginRight:'0.5rem'}} >
                                        <Link to={`/perawat/diagnostik/tambah/${id}`} className="btn blue-button-left-align">
                                            Tambah Diagnostik
                                        </Link>
                                        </div>
                                    </Row>
                                    </Col>
                                </Row>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>


                    <div className="container" style={{marginTop: '3rem'}}>
                        <button className="btn button-switch-verification" onClick={handleShow}>Lihat Anamnesis</button>
                    </div>

                    <Modal show={showAnamnesis} onClick={() => setShowAnamnesis} onHide={handleHide} centered>
                        <Modal.Body>
                            <Form.Group className='mt-4'>
                                <Form.Label  className="form-title">KELUHAN UTAMA</Form.Label>
                                <p className='li-askep'>{keluhan_utama}</p>
                            </Form.Group>
                            <hr className='hr-askep'></hr>

                            <Form.Group className=''>
                                <Form.Label  className="form-title">RIWAYAT PENYAKIT</Form.Label>
                                <p className='li-askep'>{riwayat_penyakit}</p>
                            </Form.Group>
                            <hr className='hr-askep'></hr>

                            <Form.Group className=''>
                                <Form.Label  className="form-title">RIWAYAT ALERGI</Form.Label>
                                <p className='li-askep'>{riwayat_alergi}</p>
                            </Form.Group>
                            <hr className='hr-askep'></hr>

                            <Form.Group className='mt-4'>
                                <Form.Label  className="form-title">RISIKO JATUH</Form.Label>
                                <p className='li-askep'>{risiko_jatuh}</p>
                            </Form.Group>
                            <hr className='hr-askep'></hr>

                            <Form.Group className='mt-4'>
                                <Form.Label  className="form-title">RISIKO NYERI</Form.Label>
                                <p className='li-askep'>{risiko_nyeri}</p>
                            </Form.Group>
                            <hr className='hr-askep'></hr>
                            
                        </Modal.Body>
                    </Modal>

                    <div className="container mt-3">
                    <span id='form-label' className="text-alert-search">Ketik untuk mencari data pasien</span>
                        <input
                            className="form-control custom-search"
                            type="text"
                            placeholder="Search"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)} />

                    </div>

                    <Container>
                        
                        {boxes && boxes.map((date,index) => (
                            <Row key={index}>
                                <Col>
                                    <Link 
                                        to={`/perawat/diagnostik/${date.id}`}
                                        className="btn box">
                                        <span className="">{date.updated_at}</span>
                                        <span className="">{date.jam}</span>
                                    </Link>
                                </Col>
                            </Row>
                        ))}
                    </Container>
                </Sidebar>
            </Fragment>
        ) : (
            <Fragment>
                <Sidebar>
                    {/* Title */}
                    <div className="container">
                        <h2>Data Diagnostik</h2>
                    </div>

                    <div className="container">
                        <div className="container-fluid container">
                            <div className="container mt-2">
                            <div className="alert-pasien">
                                <div className='space-label'>
                                <Row>
                                    <Col>
                                    <Row>
                                        <span className='shift-label'>Pasien</span>
                                    </Row>
                                    <Row>
                                        <span id='form-label' className="alert-info">{nama_lengkap}</span>
                                    </Row>
                                    </Col>
                                    <Col>
                                    <Row>
                                        <div className="mt-2" style={{marginRight:'0.5rem'}} >
                                        <Link to={`/perawat/diagnostik/tambah/${id}`} className="btn blue-button-left-align">
                                            Tambah Diagnostik
                                        </Link>
                                        </div>
                                    </Row>
                                    </Col>
                                </Row>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>

                    <div className="container form-margin">

                        <input
                            className="form-control custom-search"
                            type="text"
                            placeholder="Search"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)} />

                    </div>

                    <Container>
                        <Row>
                            <Col>
                                <Link 
                                    to={`/perawat/diagnostik/tambah/${id}`}
                                    className="btn d-flex justify-content-center align-items-center blue-button-lg mt-1">Tambah</Link>
                            </Col>
                        </Row>
                        {boxes && boxes.map((date,index) => (
                            <Row key={index}>
                                <Col>
                                    <Link 
                                        to={`/perawat/diagnostik/${date.id}`}
                                        className="btn box">
                                        <span className="">{date.updated_at}</span>
                                        <span className="">{date.jam}</span>
                                    </Link>
                                </Col>
                            </Row>
                        ))}


                    </Container>
                </Sidebar>
            </Fragment>
            
        )}
      </Fragment>
      
  );
}