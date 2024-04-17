import React, { useEffect, useState } from "react";
import Sidebar from "../../../../components/menu/SidebarAdmin";
import { Breadcrumb, Form, Col, Row, Button, Modal} from "react-bootstrap";
import { useNavigate, useParams, Link } from 'react-router-dom'
import AuthorizationRoute from '../../../../AuthorizationRoute'
import axios from '../../../../axios'
import ConfirmModal from "../../../../components/menu/ConfirmModal";
import { BreadCrumb } from 'primereact/breadcrumb';

const EditIntervensi = () => {

  const [kode_intervensi, setKodeIntervensi] = useState("");
  const [nama_intervensi, setNamaIntervensi] = useState("");
  const [observasi, setObservasi] = useState("");
  const [terapeutik, setTerapeutik] = useState("");
  const [edukasi, setEdukasi] = useState("");
  const {id} = useParams();
  const navigate = useNavigate();
  const token=localStorage.getItem("token");
  const [submitted, setSubmitted] = useState(false);
  const isMobile = window.innerWidth <=600;

  useEffect(() => {
    getDataById();
  },[]);

  const getDataById = async () => {
    try {
        const res = await axios.post(`/admin/intervensi/detail/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        setKodeIntervensi(res.data.data.kode_intervensi)
        setNamaIntervensi(res.data.data.nama_intervensi)
        setObservasi(res.data.observasi.join('\n'))
        setTerapeutik(res.data.terapeutik.join('\n'))
        setEdukasi(res.data.edukasi.join('\n'))
    } catch (error) {
        
    }
  }

  const editSubmit = async () => {

    const handleObservasi = observasi ? observasi.split("\n") : null;
    const handleTerapeutik = terapeutik ? terapeutik.split("\n") : null;
    const handleEdukasi =  edukasi ? edukasi.split("\n") : null;

    try {
      const res = await axios.post(
         `/admin/intervensi/edit/${id}`,
         {
          kode_intervensi: kode_intervensi,
          nama_intervensi: nama_intervensi,
          observasi: handleObservasi,
          terapeutik: handleTerapeutik,
          edukasi: handleEdukasi,
         },
         {
           headers: { Authorization: `Bearer ${token}` },
         }
       );
       console.log(res);
      navigate("/admin/standarkeperawatan/intervensi/");
    } catch (error) {
      console.log(error);
       AuthorizationRoute(error.response.status)
    }
  };

  const items = [{label: 'SKI'}, {label: 'Intervensi'}, {label: ''}]

  
  
  return (
    <React.Fragment>
      {isMobile ? (
        <>
          <Sidebar>

              <div className="container d-flex align-items-center form-margin container-breadcrumb">
                                                    <span>
                                                        <Link to={`/admin/standarkeperawatan/intervensi`}>
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
                  <span>Edit Intervensi</span> -{" "}
                  <span id="kode_intervensi">{kode_intervensi}</span>
                </h3>
              </div>

              <div className="container">
                        <Row class='container'>
                          <Col xs={12}>
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
                    <Form.Label id='form-label'>Kode Intervensi</Form.Label>
                    <Form.Control
                      id="form-control-input custom-search"
                      type="text"
                      value={kode_intervensi}
                      placeholder="Masukkan Kode Intervensi"
                      onChange={(e) => setKodeIntervensi(e.target.value)}
                      required
                      style={{
                        color: submitted ? "#ff0000" : "",
                        fontWeight: submitted ? "bold" : "",
                      }}
                    />
                  </Form.Group>

                  <Form.Group as={Col} className="mt-3">
                    <Form.Label id='form-label'>Nama Intervensi</Form.Label>
                    <Form.Control
                      id="form-control-input custom-search"
                      type="text"
                      value={nama_intervensi}
                      placeholder="Masukkan Nama Intervensi"
                      onChange={(e) => setNamaIntervensi(e.target.value)}
                      required
                    />
                  </Form.Group>
             

              
                  <h5  className="mt-3">Tindakan</h5>
                  <Form.Group as={Col}>
                    <Form.Label id='form-label'>Observasi</Form.Label>
                    <Form.Control
                      id="form-control-input custom-search"
                      as="textarea"
                      type="text"
                      value={observasi}
                      placeholder="Masukkan Tindakan Observasi"
                      style={{ height: "7rem" }}
                      onChange={(e) => setObservasi(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group as={Col}  className="mt-3">
                    <Form.Label id='form-label'>Terapeutik</Form.Label>
                    <Form.Control
                      id="form-control-input custom-search"
                      as="textarea"
                      type="text"
                      value={terapeutik}
                      placeholder="Masukkan Tindakan Terapeutik"
                      style={{ height: "7rem" }}
                      onChange={(e) => setTerapeutik(e.target.value)}
                    />
                  </Form.Group>
          

                <Col xs={12}  className="mt-3">
                  <Form.Group>
                    <Form.Label id='form-label'>Edukasi</Form.Label>
                    <Form.Control
                      id="form-control-input custom-search"
                      as="textarea"
                      value={edukasi}
                      type="text"
                      placeholder="Masukkan Tindakan Edukasi"
                      style={{ height: "7rem" }}
                      onChange={(e) => setEdukasi(e.target.value)}
                    />
                  </Form.Group>

              
                </Col>

                <div className="mt-5 d-flex justify-content-center align-items-center">
                  
                    <ConfirmModal 
                        onConfirm={editSubmit}
                        successMessage="Intervensi berhasil diedit"
                        cancelMessage="Intervensi batal diedit"
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
                                                        <Link to={`/admin/standarkeperawatan/intervensi`}>
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
                  <span>Edit Intervensi</span> -{" "}
                  <span id="kode_intervensi">{kode_intervensi}</span>
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
                    <Form.Label id='form-label'>Kode Intervensi</Form.Label>
                    <Form.Control
                      id="form-control-input custom-search"
                      type="text"
                      value={kode_intervensi}
                      placeholder="Masukkan Kode Intervensi"
                      onChange={(e) => setKodeIntervensi(e.target.value)}
                      required
                      style={{
                        color: submitted ? "#ff0000" : "",
                        fontWeight: submitted ? "bold" : "",
                      }}
                    />
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label id='form-label'>Nama Intervensi</Form.Label>
                    <Form.Control
                      id="form-control-input custom-search"
                      type="text"
                      value={nama_intervensi}
                      placeholder="Masukkan Nama Intervensi"
                      onChange={(e) => setNamaIntervensi(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Row>

                <Row id="custom-row" style={{ marginTop: "3rem" }}>
                  <h5>Tindakan</h5>
                  <Form.Group as={Col}>
                    <Form.Label id='form-label'>Observasi</Form.Label>
                    <Form.Control
                      id="form-control-input custom-search"
                      as="textarea"
                      type="text"
                      value={observasi}
                      placeholder="Masukkan Tindakan Observasi"
                      style={{ height: "7rem" }}
                      onChange={(e) => setObservasi(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label id='form-label'>Terapeutik</Form.Label>
                    <Form.Control
                      id="form-control-input custom-search"
                      as="textarea"
                      type="text"
                      value={terapeutik}
                      placeholder="Masukkan Tindakan Terapeutik"
                      style={{ height: "7rem" }}
                      onChange={(e) => setTerapeutik(e.target.value)}
                    />
                  </Form.Group>
                </Row>

                <Col xs={6}>
                  <Form.Group>
                    <Form.Label id='form-label'>Edukasi</Form.Label>
                    <Form.Control
                      id="form-control-input custom-search"
                      as="textarea"
                      value={edukasi}
                      type="text"
                      placeholder="Masukkan Tindakan Edukasi"
                      style={{ height: "7rem" }}
                      onChange={(e) => setEdukasi(e.target.value)}
                    />
                  </Form.Group>

              
                </Col>

                <div className="mt-3 d-flex justify-content-end">
                  <Link
                    to={`/admin/standarkeperawatan/intervensi/${id}`}
                    type="button"
                    
                    className="btn edit-button mx-3"
                  >
                    Cancel
                  </Link>
                  <ConfirmModal 
                      onConfirm={editSubmit}
                      successMessage="Intervensi berhasil diedit"
                      cancelMessage="Intervensi batal diedit"
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

export default EditIntervensi;
