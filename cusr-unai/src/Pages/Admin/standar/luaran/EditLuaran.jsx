import React, { useEffect, useState } from "react";
import Sidebar from "../../../../components/menu/SidebarAdmin";
import { Breadcrumb, Form, Col, Row, Button} from "react-bootstrap";
import { useNavigate, useParams, Link } from 'react-router-dom'
import AuthorizationRoute from '../../../../AuthorizationRoute'
import ConfirmModal from '../../../../components/menu/ConfirmModal'
import axios from '../../../../axios'
import { BreadCrumb } from 'primereact/breadcrumb';

const EditLuaran = () => {

  const [kode_luaran, setKodeLuaran] = useState("");
  const [nama_luaran, setNamaLuaran] = useState("");
  const [nama_kriteria_luaran, setNamaKriteriaLuaran] = useState("");
  const {id} = useParams();
  const navigate = useNavigate();
  const token=localStorage.getItem("token");
  const [submitted, setSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const isMobile = window.innerWidth <=600;



  useEffect(()=>{
    getDataById();
  }, [])

  const getDataById = async () => {
    try {
        const res = await axios.post(`/admin/luaran/detail/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        setKodeLuaran(res.data.data.kode_luaran)
        setNamaLuaran(res.data.data.nama_luaran)
        setNamaKriteriaLuaran(res.data.data.nama_kriteria_luaran.join("\n"));
    } catch (error) {
        
    }
  }


  const editSubmit = async () => {

    const handleNamaKriteriaLuaran = nama_kriteria_luaran.split("\n");
    
    try {
      const res = await axios.post(
         `/admin/luaran/update/${id}`,
         {
          kode_luaran: kode_luaran,
          nama_luaran: nama_luaran,
          nama_kriteria_luaran: handleNamaKriteriaLuaran,
         },
         {
           headers: { Authorization: `Bearer ${token}` },
         }
       );
       console.log(res);
      navigate("/admin/standarkeperawatan/luaran");
    } catch (error) {
      console.log(error);
      //  AuthorizationRoute(error.response.status)
    }
  };
  
  const items = [{label: 'SKI'}, {label: 'Luaran'}, {label: ''}]
  
  return (
    <React.Fragment>
      {isMobile ? (
        <>
          <Sidebar>

            <div className="container d-flex align-items-center form-margin container-breadcrumb">
                                                          <span>
                                                              <Link to={`/admin/standarkeperawatan/luaran`}>
                                                                  <svg xmlns="http://www.w3.org/2000/svg" width='17' height='17' fill='#fff' viewBox="0 0 24 24" stroke-width="1.5" stroke="#085b93" class="w-6 h-6 mb-3">
                                                                  <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                                                  </svg>
                                                              </Link>
                                                          </span>
                                                              <BreadCrumb model={items} />

                                                              <span>
                                                                  <p className='title-breadcrumb'>Edit</p>
                                                              </span>
            </div>
            <div className="container">
              <h3>
                <span>Edit Luaran</span> - <span id="kode_luaran">{kode_luaran}</span>
              </h3>
            </div>

            <div className="container">
                              <Row class='container'>
                                <Col xs={6}>
                                  <div className='d-flex align-items-center alert-admin'>
                                          <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" width='20' height='20' viewBox="0 0 24 24" stroke-width="1.5" stroke="#085b93" class="w-6 h-6" style={{marginLeft: '0.3rem', marginBottom: '0.2rem'}}>
                                              <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                            </svg>
                                          </span>
                                          <span className='alert-label-askep' style={{marginBottom: '0.3rem'}}>Tekan 'enter' untuk memulai kalimat baru.</span>
                                </div>
                                </Col>
                              </Row>
                </div>

            <Form className="container mt-5" onSubmit={editSubmit}>
           
                <Form.Group as={Col}>
                  <Form.Label id='form-label'>Kode Luaran</Form.Label>
                  <Form.Control 
                    id="form-control-input custom-search"
                    type="text" 
                    placeholder="Masukkan Kode Luaran" 
                    value={kode_luaran}
                    onChange={(e) => setKodeLuaran(e.target.value)}
                    required
                    style={{
                      color: submitted ? '#ff0000' : '',
                      fontWeight: submitted ? 'bold' : ''
                    }}
                    />
                </Form.Group>

                <Form.Group as={Col} className="mt-3">
                  <Form.Label id='form-label'>Nama Luaran</Form.Label>
                  <Form.Control 
                    id="form-control-input custom-search"
                    type="text" 
                    placeholder="Masukkan Nama Luaran"  
                    value={nama_luaran}
                    onChange={(e) => setNamaLuaran(e.target.value)}
                    required/>
                </Form.Group>
         

              <h5 className="mt-3">Kriteria</h5>
                <Form.Group as={Col}>
                  <Form.Label id='form-label'>Kriteria</Form.Label>
                  <Form.Control
                    id="form-control-input custom-search"
                    as="textarea"
                    type="text"
                    placeholder="Masukkan Kriteria"
                    style={{ height: "7rem" }}
                    value={nama_kriteria_luaran}
                    onChange={(e) => setNamaKriteriaLuaran(e.target.value)}
                  
                  />
                  
                </Form.Group>

              
              <div className='d-flex justify-content-end mt-3'>

                  <Link
                    to={`/admin/standarkeperawatan/luaran/${id}`}
                    type="button"
                    className='btn edit-button mx-2'>
                      Cancel
                  </Link>
                  <ConfirmModal
                    onConfirm={editSubmit}
                    successMessage="Luaran berhasil diedit"
                    cancelMessage="Luaran batal diedit"
                    buttonText="Simpan"
                  />
                  
                </div>
            </Form>
            </Sidebar>
        </>
      ) : (
        <>
          <Sidebar>

              <div className="container d-flex align-items-center form-margin container-breadcrumb">
                                                            <span>
                                                                <Link to={`/admin/standarkeperawatan/luaran`}>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width='17' height='17' fill='#fff' viewBox="0 0 24 24" stroke-width="1.5" stroke="#085b93" class="w-6 h-6 mb-3">
                                                                    <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                                                    </svg>
                                                                </Link>
                                                            </span>
                                                                <BreadCrumb model={items} />

                                                                <span>
                                                                    <p className='title-breadcrumb'>Edit</p>
                                                                </span>
              </div>
              <div className="container">
                <h3>
                  <span>Edit Luaran</span> - <span id="kode_luaran">{kode_luaran}</span>
                </h3>
              </div>

              <div className="container">
                                <Row class='container'>
                                  <Col xs={4}>
                                    <div className='d-flex align-items-center alert-admin'>
                                            <span>
                                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" width='20' height='20' viewBox="0 0 24 24" stroke-width="1.5" stroke="#085b93" class="w-6 h-6" style={{marginLeft: '0.3rem', marginBottom: '0.2rem'}}>
                                                <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                              </svg>
                                            </span>
                                            <span className='alert-label-askep' style={{marginBottom: '0.3rem'}}>Tekan 'enter' untuk memulai kalimat baru.</span>
                                  </div>
                                  </Col>
                                </Row>
                  </div>

              <Form className="container mt-5" onSubmit={editSubmit}>
                <Row>
                  <Form.Group as={Col}>
                    <Form.Label id='form-label'>Kode Luaran</Form.Label>
                    <Form.Control 
                      id="form-control-input custom-search"
                      type="text" 
                      placeholder="Masukkan Kode Luaran" 
                      value={kode_luaran}
                      onChange={(e) => setKodeLuaran(e.target.value)}
                      required
                      style={{
                        color: submitted ? '#ff0000' : '',
                        fontWeight: submitted ? 'bold' : ''
                      }}
                      />
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label id='form-label'>Nama Luaran</Form.Label>
                    <Form.Control 
                      id="form-control-input custom-search"
                      type="text" 
                      placeholder="Masukkan Nama Luaran"  
                      value={nama_luaran}
                      onChange={(e) => setNamaLuaran(e.target.value)}
                      required/>
                  </Form.Group>
                </Row>

                <Row id="custom-row" style={{ marginTop: "3rem" }}>
                <h5>Kriteria</h5>
                  <Form.Group as={Col}>
                    <Form.Label id='form-label'>Kriteria</Form.Label>
                    <Form.Control
                      id="form-control-input custom-search"
                      as="textarea"
                      type="text"
                      placeholder="Masukkan Kriteria"
                      style={{ height: "7rem" }}
                      value={nama_kriteria_luaran}
                      onChange={(e) => setNamaKriteriaLuaran(e.target.value)}
                    
                    />
                    
                  </Form.Group>

                  <Form.Group as={Col}>
                    {/* Empty */}
                    
                  </Form.Group>
                </Row>
                
                <div className='d-flex justify-content-end mt-3'>

                    <Link
                      to={`/admin/standarkeperawatan/luaran/${id}`}
                      type="button"
                      className='btn edit-button mx-2'>
                        Cancel
                    </Link>
                    <ConfirmModal
                      onConfirm={editSubmit}
                      successMessage="Luaran berhasil diedit"
                      cancelMessage="Luaran batal diedit"
                      buttonText="Simpan"
                    />
                    
                  </div>
              </Form>
              </Sidebar>
        </>
      )}
    </React.Fragment>
  );
};

export default EditLuaran;
