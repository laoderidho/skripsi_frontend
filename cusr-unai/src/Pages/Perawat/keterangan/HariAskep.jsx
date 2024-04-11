import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  Modal,
  Form,
  Row,
  Col,
  Container,
} from "react-bootstrap";
import { Accordion, AccordionTab } from 'primereact/accordion';
import "primereact/resources/themes/saga-blue/theme.css";
import Sidebar from "../../../components/menu/Sidebar";
import { Link } from "react-router-dom";
import ListGroup from 'react-bootstrap/ListGroup';
import { useNavigate, useParams } from "react-router-dom";
import { ScrollPanel } from 'primereact/scrollpanel';
import axios from "../../../axios";

const HariAskep = () => {
  const [nama_lengkap, setNamaLengkap] = useState("");
  const { id, tanggal } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [row, setRow] = useState([]);
  const isMobile = window.innerWidth <=600;

  const getDataShiftById = async () => {
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
      const res = await axios.post(
        `/perawat/listaskep/setname/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setNamaLengkap(res.data.name);
    } catch (error) {}
  };

  const handleAddRow = async () => {
    try {
      const res = await axios.post(
        `/perawat/listaskep/list-pemeriksaan/${id} `,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setRow(res.data);
    } catch (error) {
      console.log(error)
    }
  };

  const handleShowAskep = () => {
    
  }

  useEffect(() => {
    getDataById();
    getDataShiftById();
    handleAddRow();
    console.log(id);
  }, []);

  // Fungsi untuk mengubah format tanggal menjadi "DD MMMM YYYY"
  const ubahFormatTanggal = (tanggal) => {
    const [day, month, year] = tanggal.split('/');
    const newDate = new Date(`${year}-${month}-${day}`);
    return newDate.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  // Fungsi untuk menambahkan nama hari sebelum tanggal
  const tambahkanHari = (tanggal) => {
    const [day, month, year] = tanggal.split('/');
    const newDate = new Date(`${year}-${month}-${day}`);
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const dayName = days[newDate.getDay()];
    return `${dayName}, ${tanggal}`;
  };

  return (
    <React.Fragment>
      {isMobile ? (
        <React.Fragment>
          <Sidebar title='DAFTAR ASKEP'>
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

            <div className="container" style={{marginTop: '5rem'}}>
              
              <div>
                <span id='form-label'>Tambah Askep</span>
                <Link
                  to={`/perawat/askep/form-diagnosa/${id}`}
                  className="btn d-flex justify-content-center align-items-center blue-button-lg mt-1"
                >
                  Tambah
                </Link>
              </div>
             

              <span id='form-label' className="text-alert-search">Ketik untuk mencari data pasien</span>
              <input className="form-control custom-search" type="text" placeholder="Search" />
              

              <Row>
                <Col>
                  <ListGroup className="pt-4">
                    {row && row.map(item => (
                      <ListGroup.Item>
                        <Row>
                          <Col xs={10}>
                            <Form.Label id='form-label'>
                              <Row>
                                <Col>
                                  <span>{`${item.hari}-${item.tanggal_pemeriksaan}`}</span>
                                  <div className="mt-2">
                                    <Link to={`/perawat/askep/shift/${id}/${item.tanggal_pemeriksaan}`}
                                    className="btn blue-button-left-align-small">Lihat</Link>
                                  </div>
                                </Col>
                              </Row>
                            </Form.Label>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Col>
              </Row>
            </div>
          </Sidebar>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Sidebar>
            <div className="container">
              <h5>Daftar ASKEP</h5>
            </div>

            <div className="container mt-2">
              <Row>
                <Col xs={3}>
                  <div className="alert-pasien-askep">
                      <div className='space-label'>
                        <Row>
                          <Col>
                          <Row>
                              <span className='shift-label'>Pasien</span>
                          </Row>
                            <Row>
                              <span id='form-label' className="alert-info">{nama_lengkap}</span>
                            </Row>
                            <Row>
                              <span>
                                <Link to={`${`/perawat/askep/form-diagnosa/${id}`}`} className="btn blue-button-left-align">
                                Tambah
                              </Link>
                              </span>
                            </Row>
                          </Col>
                        </Row>
                      </div>
                    </div>

                    <div className="container">
                      <Row>
                        <Col>
                            <ScrollPanel className="mt-2">
                              {row && row.map(item => (
                                <Accordion activeIndex={0}>
                                  <AccordionTab header={tambahkanHari(item.tanggal_pemeriksaan)}>
                                    <ListGroup variant="flush">
                                      <ListGroup.Item>
                                        <Link to={`/perawat/askep/shift/keterangan/${id}/${item.tanggal_pemeriksaan}/1`}>Shift 1</Link>
                                      </ListGroup.Item>
                                      <ListGroup.Item>
                                        <Link to={`/perawat/askep/shift/keterangan/${id}/${item.tanggal_pemeriksaan}/2`}>Shift 2</Link>
                                      </ListGroup.Item>
                                      <ListGroup.Item>
                                        <Link to={`/perawat/askep/shift/keterangan/${id}/${item.tanggal_pemeriksaan}/3`}>Shift 3</Link>
                                      </ListGroup.Item>
                                    </ListGroup>

                                  </AccordionTab>
                                </Accordion>
                              ))}
                            </ScrollPanel>
                        </Col>
                      </Row>
                    </div>  
                </Col>

                <Col xs={3} className="scroll-panel-box-askep">
                  {/* <ScrollPanel style={{ width: '100%', height: '700px', backgroundColor: '#f6fafd' }}>
                  
                  </ScrollPanel> */}
                </Col>

              
              </Row>
            </div>

            
          </Sidebar>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default HariAskep;
