import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Form, Container, Row, Col } from "react-bootstrap";
import Sidebar from '../../../components/menu/Sidebar'
import { Link } from "react-router-dom";
import { useNavigate, useParams } from 'react-router-dom'
import axios from "../../../axios";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import "primereact/resources/themes/saga-blue/theme.css";


const KeteranganAskep = () => {

  const [diagnosa, setDiagnosa] = useState([]);
  const [intervensi, setIntervensi] = useState([])
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [showTime, setShowTime] = useState(false);
  const {id, tanggal, shift} = useParams();
  const navigate =  useNavigate();
  const token = localStorage.getItem("token");
  const [keteranganData, setKeteranganData] = useState([]);
  const [listAskep, setListAskep] = useState([]);


  
  const getListAskep = async () => {

     const convertDate = `'${tanggal}' `
    try{
      const response = await axios.post(`/perawat/list-askep/${id}/${shift}/${convertDate}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setListAskep(response.data);
      console.log(response.data);
    }catch(error){
      console.error(error);
    }
  };

  

  useEffect(() => {
    // getDateDiagnose();
    getListAskep();
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
    <Sidebar
      title="ASKEP">
      <div className="container">
        <h2>Askep</h2>
      </div>

      <div className="container">
        
        <div>
          <Link
            to={`/perawat/askep/form-diagnosa/${id}`}
            className="btn d-flex justify-content-center align-items-center diagnosa-button"
          >
            Tambah Diagnosa
          </Link>
        </div>
        {listAskep &&
          listAskep.map((askep, index) => (
            <>
              <p id='form-label' className='pt-3'>User: {askep.nama_lengkap}</p>
              <table className="bordered" id="border">
                <thead className="table-head">
                  <tr>
                    <th>Keterangan</th>
                    <th>Tanggal/Jam</th>
                  </tr>
                </thead>
                <tbody>
                  
                  {/* Diagnosa */}
                  <tr>
                    <td>{askep.jam_pemberian_diagnosa ? (
                      <Link to={`/perawat/askep/diagnosa/${askep.id}`} className='label-askep'>Diagnosa</Link>
                    ) : ( "Diagnosa" )} </td>
                    <td>
                      {askep.tanggal_pemberian_diagnosa}/{askep.jam_pemberian_diagnosa}
                    </td>
                  </tr>

                  {/* Intervensi */}
                  <tr>
                    <td>{askep.jam_pemberian_intervensi ? (
                      <Link to={`/perawat/askep/intervensi/${askep.id}`} className='label-askep'>Intervensi</Link>
                    ) : ( "Intervensi" )}</td>
                    <td>
                      {askep.tanggal_pemberian_intervensi ? (
                        `${askep.tanggal_pemberian_intervensi}/${askep.jam_pemberian_intervensi}`
                      ) : ( askep.access == false ? 'Belum Terisi' :
                        <Link
                          to={`/perawat/askep/form-intervensi/${askep.id}`}
                          className="btn btn-primary btn-large"
                        >
                          <i class="fa-solid fa-plus"></i> Tambah
                        </Link>
                      )}
                    </td>
                  </tr>

                  {/* Implementasi */}
                  <tr>
                    <td>{askep.jam_pemberian_implementasi ? (
                      <Link tp={`/perawat/askep/implementasi/${askep.id}`} className='label-askep'>Implementasi</Link>
                    ) : ( "Implementasi" )}</td>
                    <td>
                      {askep.tanggal_pemberian_implementasi ? (
                        `${askep.tanggal_pemberian_implementasi}/${askep.jam_pemberian_implementasi}`
                      ) : ( askep.access == false ? 'Belum Terisi' :
                        <Link
                          to={`/perawat/askep/form-implementasi/${askep.id}`}
                          className="btn btn-primary btn-large"
                        >
                          <i class="fa-solid fa-plus"></i> Tambah
                        </Link>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>{askep.jam_pemberian_luaran ? (
                      <Link to={`/perawat/askep/luaran/${askep.id}`} className='label-askep'>Luaran</Link>
                    ) : ( "Luaran" )}</td>
                    <td>
                      {askep.tanggal_penilaian_luaran ? (
                        `${askep.tanggal_pemberian_luaran}/${askep.jam_pemberian_luaran}`
                      ) : ( askep.access == false ? 'Belum Terisi' :
                        <Link
                          to={`/perawat/askep/form-evaluasi/${askep.id}`}
                          className="btn btn-primary btn-large"    
                        >
                          <i class="fa-solid fa-plus"></i> Tambah
                        </Link>
                        
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>{askep.jam_pemberian_evaluasi ? (
                      <Link to={`/perawat/askep/evaluasi/${askep.id}`} className='label-askep'>Evaluasi</Link>
                    ) : ( "Evaluasi" )}</td>
                    <td>
                      {askep.tanggal_pemberian_evaluasi ? (
                        `${askep.tanggal_pemberian_evaluasi}/${askep.jam_pemberian_evaluasi}`
                      ) : ( askep.access == false ? 'Belum Terisi' :
                        <Link
                          to={`/perawat/askep/form-evaluasi/${askep.id}`}
                          className="btn btn-primary btn-large"
                        >
                          <i class="fa-solid fa-plus"></i> Tambah
                        </Link>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </>
          ))}

        <div>

        </div>
        {/* Render Diagnosa */}
        {diagnosa.map((diag, index) => (
          <div key={diag.id} className="box-panel">
            <div className="flexbox justify-content modify">
              <span>User: {diag.user}</span>
              <span style={{ paddingLeft: "8rem" }}>No: </span>
            </div>

            {/* <Container className="container-modify">
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
            </Container> */}

            <div>
              <br></br>
            </div>
          </div>
        ))}

        {/* Render Intervensi */}
        {intervensi.map((inter, index) => (
          <div key={inter.id} className="box-panel">
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
                    className="btn d-flex justify-content-center align-items-center option-button-svg mt-1"
                  >
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="svg-askep"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M12 4.5v15m7.5-7.5h-15"
                        />
                      </svg>
                    </span>
                    <span className="option-text">Implementasi</span>
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
