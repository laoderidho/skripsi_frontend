import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Form, Accordion, Container, Row, Col } from "react-bootstrap";
import Sidebar from '../../../components/menu/Sidebar'
import { Link } from "react-router-dom";
import { useNavigate, useParams } from 'react-router-dom'
import axios from "../../../axios";



const KeteranganAskep = () => {
  const [tables, setTables] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [showTime, setShowTime] = useState(false);
  const {id} = useParams();
  const navigate =  useNavigate();
  const token = localStorage.getItem("token");

  const [diagnosa, setDiagnosa] = useState([]);


  const handleTambah = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(true);
  };


  const getFormattedDateTime = () => {
    const options = {
      year: "numeric",
      weekday:  "long",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date().toLocaleString("id-ID", options).replace(","," ·");
  }



  const handleSimpan = () => {
    // Tambahkan tabel baru ke dalam array tables
    setTables([...tables, { user: loggedInUser, id: Date.now(), data: formData }]);
    // Reset formData dan tutup modal
    setFormData({});
    setShowModal(false);
    setShowTime(true);
  };

  useEffect(() => {
    handleSimpan();
  },[]);


  const handleChange = (e) => {
    // Handle perubahan input formulir
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  function CheckIcon(props) {
    return (
      <svg viewBox="0 0 24 24" fill="none" {...props}>
        <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
        <path
          d="M7 13l3 3 7-7"
          stroke="#fff"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  return (
    <Sidebar>

      <div className='container'>
        <h2>Askep</h2>
      </div>

      <div className='container'>
      
      <Link  
        to={`/perawat/askep/form-diagnosa/${id}`}
        className='btn d-flex justify-content-center align-items-center diagnosa-button'>Tambah Diagnosa</Link>

      {tables.map((table, date, index) => (
        <div key={table.id} className='box-panel'>
          <div className='flexbox justify-content modify'>
            <span>User: {table.user}</span>
            <span 
              style={{ paddingLeft: '8rem' }}>No: </span>
          </div>

          

          

          <Container className='container-modify'>
            <Row>
              <Col>
                <p style={{ paddingLeft: '0.7rem' }}>Diagnosa</p>
                <p style={{ paddingLeft: '0.7rem', 
                            fontSize: '14px',
                            paddingTop: '0rem' }}>{getFormattedDateTime()}</p>
              </Col>
            </Row>
          </Container>

          <div>
            <br></br>
          </div>
          {/* <Table striped bordered hover>
            <thead>
              <tr>
                <th>Keterangan</th>
                <th>Tanggal/Jam</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td>{getFormattedDateTime()}</td>
              </tr>
            </tbody>
          </Table> */}
        </div>
      ))}

      {/* Modal untuk formulir */}
      <Modal show={showModal} onHide={handleCloseModal} backdrop="static" centered>
      <Modal.Header closeButton={false}>
        <Modal.Title>Formulir Tambah Tabel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Accordion defaultActiveKey="0">
          {/* Accordion 1 */}
          <Accordion.Item eventKey="0">
            <Accordion.Header>Accordion 1</Accordion.Header>
            <Accordion.Body>
              <Form>
                <Form.Group controlId="formDescription1">
                  <Form.Label>Keterangan</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Masukkan keterangan"
                    name="keterangan"
                    value={formData.keterangan || ''}
                    onChange={handleChange}
                  />
                </Form.Group>
                {/* Tambahkan formulir lainnya sesuai kebutuhan */}
              </Form>
              <Button variant="primary" onClick={handleSimpan}>
                Simpan Accordion 1
              </Button>
            </Accordion.Body>
          </Accordion.Item>

          {/* Accordion 2 */}
          <Accordion.Item eventKey="1">
            <Accordion.Header>Accordion 2</Accordion.Header>
            <Accordion.Body>
              <Form>
                <Form.Group controlId="formDescription2">
                  <Form.Label>Keterangan</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Masukkan keterangan"
                    name="keterangan"
                    value={formData.keterangan || ''}
                    onChange={handleChange}
                  />
                </Form.Group>
                {/* Tambahkan formulir lainnya sesuai kebutuhan */}
              </Form>
              <Button variant="primary" onClick={handleSimpan}>
                Simpan Accordion 2
              </Button>
            </Accordion.Body>
          </Accordion.Item>

          {/* Tambahkan dua Accordion lainnya sesuai kebutuhan */}
        </Accordion>
      </Modal.Body>
      <Modal.Footer>
        {/* Button Simpan Modal (di luar Accordion) */}
        <Button variant="primary" onClick={handleSimpan}>
          Simpan Modal
        </Button>
      </Modal.Footer>
    </Modal>
    </div>  
    </Sidebar>
  );
};

export default KeteranganAskep;
