import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Form, Container, Row, Col } from "react-bootstrap";
import Sidebar from '../../../components/menu/Sidebar'
import { Link } from "react-router-dom";
import { useNavigate, useParams } from 'react-router-dom'
import axios from "../../../axios";
import "primereact/resources/themes/saga-blue/theme.css";



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
                <Col>
                  <div className='dropdown'>
                    <Button className='btn option-button-svg'>
                    <svg viewBox="0 0 24 24" focusable="false" class="" aria-hidden="true"><path fill="currentColor" d="M 3 5 A 1.0001 1.0001 0 1 0 3 7 L 21 7 A 1.0001 1.0001 0 1 0 21 5 L 3 5 z M 3 11 A 1.0001 1.0001 0 1 0 3 13 L 21 13 A 1.0001 1.0001 0 1 0 21 11 L 3 11 z M 3 17 A 1.0001 1.0001 0 1 0 3 19 L 21 19 A 1.0001 1.0001 0 1 0 21 17 L 3 17 z"></path></svg>
                    </Button>
                  </div>
                 {/* <svg viewBox="0 0 24 24" focusable="false" class="option-button-svg" aria-hidden="true"><path fill="currentColor" d="M 3 5 A 1.0001 1.0001 0 1 0 3 7 L 21 7 A 1.0001 1.0001 0 1 0 21 5 L 3 5 z M 3 11 A 1.0001 1.0001 0 1 0 3 13 L 21 13 A 1.0001 1.0001 0 1 0 21 11 L 3 11 z M 3 17 A 1.0001 1.0001 0 1 0 3 19 L 21 19 A 1.0001 1.0001 0 1 0 21 17 L 3 17 z"></path></svg> */}
                
                </Col>
              </Row>
            </Container>

            <div>
              {/* <Accordion activeIndex={0}>
                <AccordionTab header="">
                  <Link
                    className='btn d-flex justify-content-center align-items-center intervensi-button'>Tambah Intervensi</Link>
                </AccordionTab>
              </Accordion> */}
              <div></div>
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

       ?
        </div>  
      </Sidebar>
  );
};

export default KeteranganAskep;
