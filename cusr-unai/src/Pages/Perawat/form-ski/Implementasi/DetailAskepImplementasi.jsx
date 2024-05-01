import React, { useState, useEffect, Fragment } from 'react';
import Sidebar from '../../../../components/menu/Sidebar';
import { useNavigate, useParams, Link } from "react-router-dom";
import { Form, Row, Col } from 'react-bootstrap';
import axios from '../../../../axios';

 export default function DetailAskepImplementasi() {


    const [nama_lengkap, setNamaLengkap] = useState('');
    const [tindakan, setTindakan] = useState([]);



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
         
          setNamaLengkap(res.data)

        } catch (error) {

        }
      };

    const getImplementasi = async () => {
        try {
            const res = await axios.post(`/perawat/implementasi/isDone/${id}`,
        {
            headers: { Authorization: `Bearer ${token}`}
        });

        setTindakan(res.data.data)
        console.log(res.data.data)

        } catch (error) {
            
        }
    }

    useEffect(() => {
        getImplementasi();
        getDataPasienById();
    },[])



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
                        </div>

                        <div className='container form-margin'>
                                <Form.Group className='mt-4'>
                                    <p className='form-title mt-3' style={{fontWeight:'500'}}>TINDAKAN</p>
                                    <ul className='ul-askep'>
                                        {tindakan && 
                                            tindakan.map((item, index) => <li key={index} className='li-askep'>{item.nama_implementasi}</li>)}
                                    </ul>
                                </Form.Group>
                                <hr className='hr-askep'></hr>
                            </div>
                

            

        </Sidebar>
    )
 }