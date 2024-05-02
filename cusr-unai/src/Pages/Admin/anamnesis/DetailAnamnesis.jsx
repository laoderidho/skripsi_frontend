import React, { useEffect, useState } from 'react';
import Sidebar from '../../../components/menu/SidebarAdmin';
import "primereact/resources/themes/saga-blue/theme.css";
import { BreadCrumb } from 'primereact/breadcrumb';
import { Link, useParams } from "react-router-dom";
import axios from '../../../axios';
import { Breadcrumb, Modal, Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import ConfirmModal from '../../../components/menu/ConfirmModal';


export default function DetailAnamnesis() {

    const [pasien, setPasien] = useState([]);
    const [keluhan_utama, setKeluhanUtama] = useState("");
    const [riwayat_penyakit, setRiwayatPenyakit] = useState("");
    const [riwayat_alergi, setRiwayatAlergi] = useState("");
    const [risiko_jatuh, setRisikoJatuh] = useState("");
    const [risiko_nyeri, setRisikoNyeri] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    const token = localStorage.getItem("token");
    const {id} = useParams();

    const submitForm = async () => {
        const handleKeluhanUtama = keluhan_utama ? keluhan_utama.split("\n").join(",") : null;
        const handleRiwayatPenyakit = riwayat_penyakit ? riwayat_penyakit.split("\n").join(",") : null;
        const handleRiwayatAlergi = riwayat_alergi ? riwayat_alergi.split("\n").join(",")  : null;
        const handleRisikoJatuh = risiko_jatuh ? risiko_jatuh.split("\n").join(",") : null;
        const handleRisikoNyeri = risiko_nyeri ? risiko_nyeri.split("\n").join(",") : null;

        try {
            await axios.post(`/admin/amnanessa/add/${id}`,
        {
            keluhan_utama: handleKeluhanUtama,
            riwayat_penyakit: handleRiwayatPenyakit,
            riwayat_alergi: handleRiwayatAlergi,
            risiko_jatuh: handleRisikoJatuh,
            risiko_nyeri: handleRisikoNyeri
        },
        {
            headers: { Authorization: `Bearer ${token}`}
        });
        console.log("Berhasil Ditambah")
        setIsEditing(false);
        } catch (error) {
            
        }
    };

    const getDataById = async () => {
        try {
            const res = await axios.post(`/amnanessa/detail/${id}`,
        {
            headers: { Authorization: `Bearer ${token}`}
        });

        setKeluhanUtama(res.data.data.keluhan_utama);
        setRiwayatPenyakit(res.data.data.riwayat_penyakit);
        setRiwayatAlergi(res.data.data.risiko_alergi);
        setRisikoJatuh(res.data.data.risiko_jatuh);
        setRisikoNyeri(res.data.data.risiko_nyeri);
        console.log(res.data)
        } catch (error) {
            
        }
    }

    const handleShow = () => {
        setIsEditing(true);
    }

    const handleHide = () => {
        setIsEditing(false);
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


    useEffect(() => {
        getPasien();
        getDataById();
    },[])

    const items = [{label: 'Admin'}, {label: 'Pasien'}, {label: ''}]

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
                                <BreadCrumb model={items}/>

                                <span>
                                    <p className='title-breadcrumb'>Anamnesis</p>
                                </span>
            </div>

            <div className='container'>
                <h3>Anamnesis</h3>
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

            <div className="container pt-3">
                <Row class='container'>
                  <Col xs={7}>
                    <div className='d-flex align-items-center alert-admin'>
                            <span>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" width='20' height='20' viewBox="0 0 24 24" stroke-width="1.5" stroke="#085b93" class="w-6 h-6" style={{marginLeft: '0.3rem'}}>
                                <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                              </svg>
                            </span>
                            <span className='alert-label-askep'>Tekan 'enter' untuk memulai kalimat baru. Tekan form untuk mengubah data.</span>
                  </div>
                  </Col>
                </Row>
              </div>

            <div className='container pt-5'>
                <Form>
                    <Row>
                        <Col xs={12} lg={6}>
                            <Form.Group className="mb-3">
                            <Form.Label>Keluhan Utama</Form.Label>
                            <Form.Control
                                id="form-control-input custom-search"
                                as="textarea"
                                type="text" 
                                style={{ height: "4rem" }}
                                value={keluhan_utama}
                                onChange={(e) => setKeluhanUtama(e.target.value)}
                                onClick={handleShow}
                                required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                            <Form.Label>Riwayat Penyakit</Form.Label>
                            <Form.Control 
                                id="form-control-input custom-search"
                                type="text" 
                                as="textarea"
                                style={{ height: "4rem" }}
                                value={riwayat_penyakit}
                                onChange={(e) => setRiwayatPenyakit(e.target.value)}
                                onClick={handleShow}
                                required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                            <Form.Label>Riwayat Alergi</Form.Label>
                            <Form.Control 
                                id="form-control-input custom-search"
                                type="text" 
                                as="textarea"
                                style={{ height: "4rem" }}
                                value={riwayat_alergi}
                                onChange={(e) => setRiwayatAlergi(e.target.value)}
                                onClick={handleShow}
                                required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                            <Form.Label>Risiko Jatuh</Form.Label>
                            <Form.Control 
                                id="form-control-input custom-search"
                                type="text" 
                                as="textarea"
                                style={{ height: "4rem" }}
                                value={risiko_jatuh}
                                onChange={(e) => setRisikoJatuh(e.target.value)}
                                onClick={handleShow}
                                required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                            <Form.Label>Risiko Nyeri</Form.Label>
                            <Form.Control
                                id="form-control-input custom-search"
                                as="textarea"
                                style={{ height: "4rem" }}
                                type="text"
                                value={risiko_nyeri}
                                onChange={(e) => setRisikoNyeri(e.target.value)}
                                onClick={handleShow}
                                required
                            />
                            </Form.Group>
                        </Col> 
                    </Row>
                    <div className='d-flex justify-content-end mt-3'>
                        {isEditing ? (
                            <>
                                <ConfirmModal
                                    onConfirm={submitForm}
                                    successMessage={"Data berhasil ditambahkan"}
                                    cancelMessage={"Data gagal ditambahkan"}
                                    buttonText={"Simpan"}
                                />
                            </>
                        ) : ("")}
                    </div>
                </Form>
            
            </div>            


        </Sidebar>


    )
}