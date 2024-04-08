import React, { useState, useEffect, Fragment } from 'react';
import Sidebar from '../../../../../src/components/menu/Sidebar';
import { useNavigate, useParams, Link } from "react-router-dom";
import { Form, Row, Col } from 'react-bootstrap';
import axios from '../../../../axios';
import { filter } from '@chakra-ui/react';

export default function DetailAskepIntervensi() {
    const [nama_intervensi, setNamaIntervensi] = useState("");
    const [observasi, setObservasi] = useState([]);
    const [teraputik, setTerapeutik] = useState("");
    const [edukasi, setEdukasi] = useState("");
    const [catatan, setCatatan] = useState("");
    const [nama_lengkap, setNamaLengkap] = useState('');

    

    const {id} = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const isMobile = window.innerWidth <=600;

    const getDataPasienById = async () => {
        try {
          const res = await axios.post(
            `/perawat/listaskep/setname/${id}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setNamaLengkap(res.data.name);
        } catch (error) {}
      };

    const getDataById = async () => {
        try {
            const res = await axios.post(`/perawat/intervensi/detail-pasien-intervensi/${id}`, {
                headers: { Authorization: `Bearer ${token}`}
            })

           const data =res.data.tindakan_intervensi

            const filterObservasi = data.filter(item=>item.nama_kategori_tindakan == "Observasi");
            const filterTeraupeutik = data.filter(item=> item.nama_kategori_tindakan == "Terapeutik")
            const filterEdukasi = data.filter(item => item.nama_kategori_tindakan == "Edukasi")
            console.log(filterObservasi)

            setNamaIntervensi(res.data.nama_intervensi)
            setObservasi(filterObservasi);
            setTerapeutik(filterTeraupeutik);
            setEdukasi(filterEdukasi);
        } catch (error) {

        }
    };

    useEffect(() => {
        getDataById();
        getDataPasienById();
    },[])

    useEffect(() => {
        console.log(observasi);
    },[observasi])





    return (
        <React.Fragment>
            {isMobile ? (
                <Fragment>
                    <Sidebar
                        title='INTERVENSI'>

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
                                        {/* <Link to={`/perawat/askep/${}`} className="btn blue-button-left-align">
                                            Lihat Pencatatan
                                        </Link> */}
                                        </Row>
                                        </Col>
                                    </Row>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                            

                            <div className='container form-margin'>
                                <Form.Group className='mt-4'>
                                    <p className='form-title mt-3' style={{fontWeight:'500'}}>NAMA INTERVENSI</p>
                                    <p className='li-askep'>{nama_intervensi}</p>
                                </Form.Group>
                                <hr className='hr-askep'></hr>

                                <Form.Group className='mt-4'>
                                    <p className='form-title mt-3' style={{fontWeight:'500'}}>TINDAKAN</p>
                                    <Form.Label className='form-title mt-4'>OBSERVASI</Form.Label>
                                    <ul className='ul-askep'>
                                        {observasi && 
                                            observasi.map((item, index) => <li key={index} className='li-askep'>{item.nama_tindakan_intervensi}</li>)}
                                    </ul>
                                </Form.Group>
                                <hr className='hr-askep'></hr>

                                <Form.Group className='mt-4'>
                                    <Form.Label className='form-title mt-4'>TERAPEUTIK</Form.Label>
                                    <ul className='ul-askep'>
                                        {teraputik &&
                                            teraputik.map((item, index) => <li key={index} className='li-askep'>{item.nama_tindakan_intervensi}</li>)}
                                    </ul>
                                </Form.Group>
                                <hr className='hr-askep'></hr>

                                <Form.Group className='mt-4'>
                                    <Form.Label className='form-title mt-4'>EDUKASI</Form.Label>
                                    <ul className='ul-askep'>
                                        {edukasi &&
                                            edukasi.map((item, index) => <li key={index} className='li-askep'>{item.nama_tindakan_intervensi}</li>)}
                                    </ul>
                                </Form.Group>
                                <hr className='hr-askep'></hr>
                            </div>
                    </Sidebar>
                </Fragment>
            ) : (
                <Fragment>
                    <Sidebar
                        title='INTERVENSI'>
                            <div className='container'>
                                <h2>Form Intervensi</h2>
                            </div>

                            <div className='container'>
                                <Form.Group className='mt-4'>
                                    <p>{nama_intervensi}</p>
                                </Form.Group>

                                <Form.Group className='mt-4'>
                                    <Form.Label className='label mt-4'>Observasi</Form.Label>
                                    <ul>
                                        {observasi && 
                                            observasi.map((item, index) => <li key={index}>{item.nama_tindakan_intervensi}</li>)}
                                    </ul>
                                </Form.Group>

                                <Form.Group className='mt-4'>
                                    <Form.Label className='label mt-4'>Terapeutik</Form.Label>
                                    <ul>
                                        {teraputik &&
                                            teraputik.map((item, index) => <li key={index}>{item.nama_tindakan_intervensi}</li>)}
                                    </ul>
                                </Form.Group>

                                <Form.Group className='mt-4'>
                                    <Form.Label className='label mt-4'>Edukasi</Form.Label>
                                    <ul>
                                        {edukasi &&
                                            edukasi.map((item, index) => <li key={index}>{item.nama_tindakan_intervensi}</li>)}
                                    </ul>
                                </Form.Group>


                            </div>

                    </Sidebar>
                </Fragment>
            )}
        </React.Fragment>
    )

}