import React, { useEffect, useState } from 'react';
import { Button, Table, Modal, Form, Row, Col, Container} from "react-bootstrap";
import Sidebar from '../../../components/menu/Sidebar'
import { Link } from "react-router-dom";
import { useNavigate, useParams } from 'react-router-dom'
import axios from "../../../axios";

const ShiftHarian = () => {
  const [nama_lengkap, setNamaLengkap] = useState('');

  const {id, tanggal} = useParams();
  const navigate =  useNavigate();
  const token = localStorage.getItem("token");
  const [row, setRow] = useState([]);
  const isMobile = window.innerWidth <=600;
  
  

  const getShift = async () => {
    try {
      const response = await axios.post(`/perawat/diagnosa`)
    } catch (error) {

    }
  }

  const getDataById = async () => {
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
  


  useEffect(() => {
    getDataById();
    
  },[]);

  return (
    <React.Fragment>
      {isMobile ? (
        <React.Fragment>
          <Sidebar 
            title='SHIFT'>
            <div className='container pt-3'>
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

            <div className="container pt-5">
              <Row>
                <Col>
                  <Link
                    className="btn box"
                    to={`/perawat/askep/shift/keterangan/${id}/${tanggal}/1`}
                  >
                    <div className='space-label'>
                      <Col>
                        <Row>
                          <span className='shift-label'>Shift 1</span>
                        </Row>
                        <Row>
                          <span id='form-label'>07.00 - 14.00</span>
                        </Row>
                      </Col>
                    </div>
                  </Link>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Link
                    to={`/perawat/askep/shift/keterangan/${id}/${tanggal}/2`}
                    className="btn box"
                  >
                    <div className='space-label'>
                      <Col>
                        <Row>
                          <span className='shift-label'>Shift 2</span>
                        </Row>
                        <Row>
                          <span id='form-label'>14.00 - 21.00</span>
                        </Row>
                      </Col>
                    </div>
                  </Link>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Link
                    className="btn box"
                    to={`/perawat/askep/shift/keterangan/${id}/${tanggal}/3`}
                    disabled
                  >
                    <div className='space-label'>
                      <Col>
                        <Row>
                          <span className='shift-label'>Shift 3</span>
                        </Row>
                        <Row>
                          <span id='form-label'>21.00 - 07.00</span>
                        </Row>
                      </Col>
                    </div>
                  </Link>
                </Col>
              </Row>
            </div>
          </Sidebar>
        </React.Fragment>
      ) : (
        <Sidebar>
          <div className="container">
            <h2>Shift</h2>
          </div>

          <div className='container pt-3'>
            
          </div>

          <div className="container pt-5">
            <Row>
              <Col>
                <Link
                  className="btn box"
                  to={`/perawat/askep/shift/keterangan/${id}/${tanggal}/1`}
                >
                  <div className='space-label'>
                    <Col>
                      <Row>
                        <span className='shift-label'>Shift 1</span>
                      </Row>
                      <Row>
                        <span id='form-label'>07.00 - 14.00</span>
                      </Row>
                    </Col>
                  </div>
                </Link>
              </Col>
            </Row>

            <Row>
              <Col>
                <Link
                  to={`/perawat/askep/shift/keterangan/${id}/${tanggal}/2`}
                  className="btn box"
                >
                  <div className='space-label'>
                    <Col>
                      <Row>
                        <span className='shift-label'>Shift 2</span>
                      </Row>
                      <Row>
                        <span id='form-label'>14.00 - 21.00</span>
                      </Row>
                    </Col>
                  </div>
                </Link>
              </Col>
            </Row>

            <Row>
              <Col>
                <Link
                  className="btn box"
                  to={`/perawat/askep/shift/keterangan/${id}/${tanggal}/3`}
                  disabled
                >
                  <div className='space-label'>
                    <Col>
                      <Row>
                        <span className='shift-label'>Shift 3</span>
                      </Row>
                      <Row>
                        <span id='form-label'>21.00 - 07.00</span>
                      </Row>
                    </Col>
                  </div>
                </Link>
              </Col>
            </Row>
          </div>
        </Sidebar>
      )}
    </React.Fragment>
  );
};

export default ShiftHarian;