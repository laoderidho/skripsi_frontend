import React, { useState, useEffect, Fragment } from 'react';
import Sidebar from '../../../../components/menu/Sidebar';
import { useNavigate, useParams, Link } from "react-router-dom";
import { Form, Row, Col } from 'react-bootstrap';
import axios from '../../../../axios';

 export default function DetailAskepEvaluasi() {

    const [evaluasi, setEvaluasi] = useState([]);
    const [luaran, setLuaran] = useState([]);
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
         
        setNamaLengkap(res.data.name)

        } catch (error) {

        }
    };

    const getEvaluasi = async () => {
        try {
            const res = await axios.post(`/perawat/evaluasi/detail/${id}`,
        {
            headers: { Authentication: `Bearer ${token}`}
        })

        setLuaran(res.data.luaran);
        setEvaluasi(res.data.resultEvaluasiData);
        console.log(res.data);
        console.log(res.data.luaran)
        } catch (error) {
            
        }
    };

    useEffect(() => {
        getEvaluasi();
        getDataPasienById();
    },[])

    const penilaian = {
        1: "Menurun",
        2: "Cukup Menurun",
        3: "Sedang",
        4: "Cukup Meningkat",
        5: "Meningkat"
      }
    
      const convertPenilaian = (result) => {
        return penilaian[result] || "Tidak Diketahui";
      }

    return (
        <Sidebar>
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

                            <div className='container form-margin'>
                                <Form.Group className='mt-4'>
                                    <p className='form-title mt-3' style={{fontWeight:'500'}}>LUARAN</p>
                                    <ul className='ul-askep'>
                                        {luaran && 
                                            luaran.map((item, index) => <li key={index} className='li-askep'>
                                                <Row>
                                                    <Col className='penilaian'>
                                                        <p>{item.nama_luaran}</p>
                                                        <p id='form-label' style={{color: '#085b93'}}>{convertPenilaian(item.hasil_luaran)}</p>
                                                    </Col>
                                                </Row>
                                            </li>)}
                                    </ul>
                                </Form.Group>
                                <hr className='hr-askep'></hr>

                                <Form.Group className='mt-4'>
                                    <p className='form-title mt-3' style={{ fontWeight: '500' }}>EVALUASI</p>
                                    <ul className='ul-askep'>
                                        {luaran && 
                                            luaran.map((item, index) => <li key={index} className='li-askep'>
                                                <Row>
                                                    <Col className='penilaian'>
                                                        <p>{item.nama_luaran}</p>
                                                        <p id='form-label' style={{color: '#085b93'}}>{convertPenilaian(item.hasil_luaran)}</p>
                                                    </Col>
                                                </Row>
                                            </li>)}
                                    </ul>
                                </Form.Group>
                            </div>
            </div>
            

        </Sidebar>
    )
 }