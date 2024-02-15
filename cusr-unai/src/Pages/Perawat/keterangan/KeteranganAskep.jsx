import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Form, Container, Row, Col } from "react-bootstrap";
import Sidebar from '../../../components/menu/Sidebar'
import { Link } from "react-router-dom";
import { useNavigate, useParams } from 'react-router-dom'
import axios from "../../../axios";
import "primereact/resources/themes/saga-blue/theme.css";



const KeteranganAskep = () => {

  const [diagnosa, setDiagnosa] = useState([]);
  const [intervensi, setIntervensi] = useState([])
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [showTime, setShowTime] = useState(false);
  const {id} = useParams();
  const navigate =  useNavigate();
  const token = localStorage.getItem("token");



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

  const getDateDiagnose = async () =>{
    try {
      const response = await axios.post(`/perawat/diagnosa/getdate/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDiagnosa(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  



  useEffect(() => {
    getDateDiagnose();
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
      <div className="container">
        <h2>Askep</h2>
      </div>

      <div className="container">
        <Link
          to={`/perawat/askep/form-diagnosa/${id}`}
          className="btn d-flex justify-content-center align-items-center diagnosa-button"
        >
          Tambah Diagnosa
        </Link>

        {/* Render Diagnosa */}
        {diagnosa.map((diag, index) => (
          <div key={diag.id} className="box-panel">
            <div className="flexbox justify-content modify">
              <span>User: {diag.user}</span>
              <span style={{ paddingLeft: "8rem" }}>No: </span>
            </div>

            <Container className="container-modify">
              <Row>
                <Col>
                  <Link style={{ paddingLeft: "0.7rem" }}>Diagnosa</Link>

                  <div>
                    <span>
                      <p
                        style={{
                          paddingLeft: "0.7rem",
                          fontSize: "14px",
                          paddingTop: "0rem",
                        }}
                      >
                        {diag.hari} - {diag.tanggal}
                      </p>
                    </span>
                  </div>
                </Col>
                <Col>
                  <Link 
                    to={`/perawat/askep/form-intervensi/${diag.id}`}
                    className='btn d-flex justify-content-center align-items-center option-button-svg mt-1'>
                      <span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className='svg-askep'>
                          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                      </span>
                      <span className='option-text'>Intervensi</span>
                    </Link>
                </Col>
              </Row>
            </Container>

            <div>
              <br></br>
            </div>
           
          </div>
        ))}

        {/* Render Intervensi */}
        {intervensi.map((inter, index) => (
          <div key={inter.id} className='box-panel'>
            <Container className="container-modify">
              <Row>
                <Col>
                  <Link style={{ paddingLeft: "0.7rem" }}>Intervensi</Link>

                  <div>
                    <span>
                      <p
                        style={{
                          paddingLeft: "0.7rem",
                          fontSize: "14px",
                          paddingTop: "0rem",
                        }}
                      >
                        {inter.hari} - {inter.tanggal}
                      </p>
                    </span>
                  </div>
                </Col>
                <Col>
                  <Link 
                    to={`/perawat/askep/form-intervensi/${id}`}
                    className='btn d-flex justify-content-center align-items-center option-button-svg mt-1'>
                      <span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className='svg-askep'>
                          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                      </span>
                      <span className='option-text'>Implementasi</span>
                    </Link>
                </Col>
              </Row>
            </Container>
          </div>
        ))}
      </div>
    </Sidebar>
  );
};

export default KeteranganAskep;
