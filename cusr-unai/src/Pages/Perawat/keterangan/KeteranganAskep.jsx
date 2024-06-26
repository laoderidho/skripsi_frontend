import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Form, Container, Row, Col, ListGroup } from "react-bootstrap";
import Sidebar from '../../../components/menu/Sidebar'
import { Link } from "react-router-dom";
import { useNavigate, useParams } from 'react-router-dom'
import axios from "../../../axios";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import "primereact/resources/themes/saga-blue/theme.css";
import { ScrollPanel } from 'primereact/scrollpanel';
import { Accordion, AccordionTab } from 'primereact/accordion';


const KeteranganAskep = () => {

  const [diagnosa, setDiagnosa] = useState([]);
  const [intervensi, setIntervensi] = useState([])
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [showTime, setShowTime] = useState(false);
  const [row, setRow] = useState([]);
  const {id, tanggal, shift} = useParams();
  const navigate =  useNavigate();
  const token = localStorage.getItem("token");
  const [keteranganData, setKeteranganData] = useState([]);
  const [listAskep, setListAskep] = useState([]);
  const isMobile = window.innerWidth <=600;
  const shiftActive = sessionStorage.getItem('shift');
  const dateNow =  new Date();
  const [activeIndex, setActiveIndex] = useState(null);
 

  const [nama_lengkap, setNamaLengkap] = useState('');

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

  useEffect(()=>{
    getListAskep();
  },[id, shift, tanggal])

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

  // const tambahkanHari = (tanggal) => {
  //   const [day, month, year] = tanggal.split('/');
  //   const newDate = new Date(`${year}-${month}-${day}`);
  //   const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  //   const dayName = days[newDate.getDay()];
  //   return `${dayName}, ${tanggal}`;
  // };

  

  useEffect(() => {
    // getDateDiagnose();
    getListAskep();
    getDataById();
    handleAddRow();
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
    <React.Fragment>
      {isMobile ? (
        <React.Fragment>
          <Sidebar
            title="ASKEP">
            
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

            <div className="container form-margin"> 
              <div>
                {shift === shiftActive && new Date(tanggal).toDateString() === dateNow.toDateString() && (
                  <Link
                    to={`/perawat/askep/form-diagnosa/${id}`}
                    className="btn d-flex justify-content-center align-items-center diagnosa-button"
                  >
                    Tambah Diagnosa
                  </Link>
                )}
              </div>

              <div className='alert-askep'>
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" width='20' height='20' viewBox="0 0 24 24" stroke-width="1.5" stroke="#085b93" class="w-6 h-6" style={{marginLeft: '0.3rem'}}>
                    <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                  </svg>
                </span>
                <span className='alert-label-askep'>Klik link untuk melihat detail setiap keterangan.</span>
              </div>
              {listAskep &&
                listAskep.map((askep, index) => (
                  <>                    
                    <div className='container-label'>
                      <p id='label-user-askep' className='pt-3'>User: {askep.nama_lengkap}</p>
                    </div>
                    <div className='container'>
                      <Row>
                        <Col xs={1} className='gap-1'>
                          <div className='line'>
                          </div>
                        </Col>
                        <Col className='gap'>
                          <div>
                          <table className="bordered" id="border">
                            <thead className="table-head">
                              <tr>
                                <th className='font-adjust'>Keterangan</th>
                                <th className='font-adjust'>Tanggal/Jam</th>
                              </tr>
                            </thead>
                            <tbody>
                              
                              {/* Diagnosa */}
                              <tr>
                                <td className='font-adjust-td'>{askep.jam_pemberian_diagnosa ? (
                                  <Link to={`/perawat/askep/diagnosa/${askep.id}`} className='label-askep'>Diagnosa</Link>
                                ) : ( "Diagnosa" )} </td>
                                <td className='font-adjust-td'>
                                  {askep.tanggal_pemberian_diagnosa}/{askep.jam_pemberian_diagnosa}
                                </td>
                              </tr>

                              {/* Intervensi */}
                              <tr>
                                <td className='font-adjust-td'>{askep.jam_pemberian_intervensi ? (
                                  <Link to={`/perawat/askep/intervensi/${askep.id}`} className='label-askep'>Intervensi</Link>
                                ) : ( "Intervensi" )}</td>
                                <td className='font-adjust-td'>
                                  {askep.tanggal_pemberian_intervensi ? (
                                    `${askep.tanggal_pemberian_intervensi}/${askep.jam_pemberian_intervensi}`
                                  ) : ( askep.access == false ? 'Belum Terisi' :
                                    <Link
                                      to={`/perawat/askep/form-intervensi/${askep.id}`}
                                      className="btn blue-button-left-align-askep"
                                    >
                                      <i class="fa-solid fa-plus"></i> Tambah
                                    </Link>
                                  )}
                                </td>
                              </tr>

                              {/* Implementasi */}
                              <tr>
                                <td className='font-adjust-td'>{askep.jam_pemberian_implementasi ? (
                                  <Link to={`/perawat/askep/implementasi/${askep.id}`} className='label-askep'>Implementasi</Link>
                                ) : (<Link to={`/perawat/askep/implementasi/${askep.id}`} className='label-askep'>Implementasi</Link>)}</td>
                                <td className='font-adjust-td'>
                                  {askep.tanggal_pemberian_implementasi ? (
                                    `${askep.tanggal_pemberian_implementasi}/${askep.jam_pemberian_implementasi}`
                                  ) : ( askep.access == false ? 'Belum Terisi' :
                                    <Link
                                      to={`/perawat/askep/form-implementasi/${askep.id}`}
                                      className="btn blue-button-left-align-askep"
                                    >
                                      <i class="fa-solid fa-plus" style={{marginRight: '5px'}}></i> <span>
                                      Tambah
                                      </span>
                                    </Link>
                                  )}
                                </td>
                              </tr>
                              <tr>
                                <td className='font-adjust-td'>{askep.jam_pemberian_luaran ? (
                                  <Link to={`/perawat/askep/luaran/${askep.id}`} className='label-askep'>Luaran</Link>
                                ) : ( "Luaran" )}</td>
                                <td className='font-adjust-td'>
                                  {askep.tanggal_pemberian_luaran ? (
                                    `${askep.tanggal_pemberian_luaran}/${askep.jam_pemberian_luaran}`
                                  ) : ( askep.access == false ? 'Belum Terisi' :
                                    <Link
                                      to={`/perawat/askep/form-evaluasi/${askep.id}`}
                                      className="btn blue-button-left-align-askep"    
                                    >
                                      <i class="fa-solid fa-plus"></i> Tambah
                                    </Link>
                                    
                                  )}
                                </td>
                              </tr>
                              <tr>
                                <td className='font-adjust-td'>{askep.jam_pemberian_evaluasi ? (
                                  <Link to={`/perawat/askep/evaluasi/${askep.id}`} className='label-askep'>Evaluasi</Link>
                                ) : ( "Evaluasi" )}</td>
                                <td className='font-adjust-td'>
                                  {askep.tanggal_pemberian_evaluasi ? (
                                    `${askep.tanggal_pemberian_evaluasi}/${askep.jam_pemberian_evaluasi}`
                                  ) : ( askep.access == false ? 'Belum Terisi' :
                                    <Link
                                      to={`/perawat/askep/form-evaluasi/${askep.id}`}
                                      className="btn blue-button-left-align-askep"
                                    >
                                      <i class="fa-solid fa-plus"></i> Tambah
                                    </Link>
                                  )}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </>
                ))}
            </div>
          </Sidebar>
        </React.Fragment>
      ) : (

        // Desktop
        <Sidebar
          title="ASKEP">
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
                                <Link to={`/perawat/askep/form-diagnosa/${id}`} className="btn blue-button-left-align-askep">
                                Tambah Diagnosa
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
                          {row && row.map((item, index) => (
                                  <Accordion 
                                    key={index}
                                    activeIndex={activeIndex === index ? 0 : null} 
                                    onTabChange={() => setActiveIndex(index)}>
                                    <AccordionTab header={`${item.hari}-${item.tanggal_pemeriksaan}`}>
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
                        </Col>
                      </Row>
                    </div>  
                </Col>

                <Col xs={4} className="scroll-panel-box-askep">
                  <ScrollPanel style={{ width: '100%', height: '580px', backgroundColor: '#f6fafd' }}>
                    <div className='scroll-panel-inner'>

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
                                  {askep.tanggal_pemberian_luaran ? (
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
                    </div>
                  </ScrollPanel>
                </Col>
                <Col>
                  
                </Col>

              
              </Row>
            </div>
        </Sidebar>
      )}
    </React.Fragment>
  );
};

export default KeteranganAskep;
