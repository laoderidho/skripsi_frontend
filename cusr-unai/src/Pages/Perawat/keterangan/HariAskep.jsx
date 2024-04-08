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
import Sidebar from "../../../components/menu/Sidebar";
import { Link } from "react-router-dom";
import ListGroup from 'react-bootstrap/ListGroup';
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../../axios";

const HariAskep = () => {
  const [nama_lengkap, setNamaLengkap] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [row, setRow] = useState([]);
  const isMobile = window.innerWidth <=600;

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

  useEffect(() => {
    getDataById();
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
                                  <span>Tanggal: {tambahkanHari(item.tanggal_pemeriksaan)}</span>
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
              <h2>Daftar ASKEP</h2>
            </div>

            <div className="container">
              <Table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>Nama</th>
                    <th>
                      <Link to={`/perawat/profilpasien/${id}`}>
                        {nama_lengkap}
                      </Link>
                    </th>
                  </tr>
                </thead>
              </Table>

              <Link
                to={`/perawat/askep/form-diagnosa/${id}`}
                className="btn d-flex justify-content-center align-items-center blue-button-lg mt-1"
              >
                Tambah
              </Link>

              <input className="form-control" type="text" placeholder="Search" />

              <Row>
                <Col>
                  <ListGroup className="pt-4">
                    {row && row.map(item => (
                      <ListGroup.Item>
                        <Row>
                          <Col xs={8}>
                            <Form.Label id='form-label'>
                              <Row>
                                <Col>
                                  <Row>
                                    {/* Menggunakan fungsi untuk mengubah format tanggal dan menambahkan nama hari */}
                                    <Link to={`/perawat/askep/shift/${id}/${item.tanggal_pemeriksaan}`}>
                                      {tambahkanHari(item.tanggal_pemeriksaan)}
                                    </Link>
                                  </Row>
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
      )}
    </React.Fragment>
  );
};

export default HariAskep;
