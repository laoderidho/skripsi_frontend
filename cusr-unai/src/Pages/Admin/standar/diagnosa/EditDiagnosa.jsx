import React, { useEffect, useState } from "react";
import Sidebar from "../../../../components/menu/SidebarAdmin";
import { Breadcrumb, Form, Col, Row, Button, Modal} from "react-bootstrap";
import { useNavigate, useParams, Link} from 'react-router-dom'
import AuthorizationRoute from '../../../../AuthorizationRoute'
import axios from '../../../../axios'
import ConfirmModal from "../../../../components/menu/ConfirmModal";
import { BreadCrumb } from 'primereact/breadcrumb';

const EditDiagnosa = () => {

  const [kode_diagnosa, setKodeDiagnosa] = useState("");
  const [nama_diagnosa, setNamaDiagnosa] = useState("");
  const [faktor_risiko, setFaktorRisiko] = useState("");
  const [penyebab_fisiologis, setPenyebabFisiologis] = useState("");
  const [penyebab_situasional, setPenyebabSituasional] = useState("");
  const [penyebab_psikologis, setPenyebabPsikologis] = useState("");
  const [gejala_mayor_subjektif, setGejalaMayorSubjektif] = useState("");
  const [gejala_mayor_objektif, setGejalaMayorObjektif] = useState("");
  const [gejala_minor_subjektif, setGejalaMinorSubjektif] = useState("");
  const [gejala_minor_objektif, setGejalaMinorObjektif] = useState("");
  const [penyebab_umum, setPenyebabUmum] = useState("");
  const {id} = useParams();
  const navigate = useNavigate();
  const token=localStorage.getItem("token");
  const [submitted, setSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const isMobile = window.innerWidth <=600;




  useEffect(() => {
    getDataById();
  },[]);

  const getDataById = async () => {
    try {
        const res = await axios.post(`/admin/diagnosa/detail/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        console.log(res.data.data.penyebab_situasional)
        setKodeDiagnosa(res.data.data.kode_diagnosa)
        setNamaDiagnosa(res.data.data.nama_diagnosa)
        setFaktorRisiko(res.data.data.faktor_risiko.join("\n"));
        setPenyebabFisiologis(res.data.data.penyebab_fisiologis.join("\n"));
        setPenyebabSituasional(res.data.data.penyebab_situasional.join("\n"));
        setPenyebabPsikologis(res.data.data.penyebab_psikologis.join("\n"));
        setGejalaMayorSubjektif(res.data.data.gejala_mayor_subjektif.join("\n"));
        setGejalaMayorObjektif(res.data.data.gejala_mayor_objektif.join("\n"));
        setGejalaMinorSubjektif(res.data.data.gejala_minor_subjektif.join("\n"));
        setGejalaMinorObjektif(res.data.data.gejala_minor_objektif.join("\n"));
        setPenyebabUmum(res.data.data.penyebab_umum.join("\n"));
    } catch (error) {
        
    }
  }

  const editSubmit = async () => {

    const handleFaktorRisiko = faktor_risiko ? faktor_risiko.split("\n") : null;
    const handlePenyebabFisiologis = penyebab_fisiologis ? penyebab_fisiologis.split("\n"): null;
    const handlePenyebabSituasional = penyebab_situasional ?  penyebab_situasional.split("\n") : null;
    const handlePenyebabPsikologis = penyebab_fisiologis ? penyebab_psikologis.split("\n") : null;
    const handleGejalaMayorSubjektif = gejala_mayor_subjektif ? gejala_mayor_subjektif.split("\n") : null;
    const handleGejalaMayorObjektif = gejala_mayor_objektif ? gejala_mayor_objektif.split("\n") : null;
    const handleGejalaMinorSubjektif = gejala_minor_subjektif ? gejala_minor_subjektif.split("\n") : null;
    const handleGejalaMinorObjektif = gejala_minor_objektif ?  gejala_minor_objektif.split("\n"): null;
    const handlePenyebab_umum = penyebab_umum ? penyebab_umum.split("\n") : null;

    try {
      const res = await axios.post(
         `/admin/diagnosa/update/${id}`,
         {
          kode_diagnosa: kode_diagnosa,
          nama_diagnosa: nama_diagnosa,
          faktor_risiko : handleFaktorRisiko,
          penyebab_fisiologis : handlePenyebabFisiologis,
          penyebab_situasional : handlePenyebabSituasional,
          penyebab_psikologis : handlePenyebabPsikologis,
          gejala_mayor_subjektif : handleGejalaMayorSubjektif,
          gejala_mayor_objektif : handleGejalaMayorObjektif,
          gejala_minor_subjektif : handleGejalaMinorSubjektif,
          gejala_minor_objektif : handleGejalaMinorObjektif,
          penyebab_umum : handlePenyebab_umum
         },
         {
           headers: { Authorization: `Bearer ${token}` },
         }
       );
       console.log(res);
      navigate("/admin/standarkeperawatan/diagnosis");
    } catch (error) {
      console.log(error);
       AuthorizationRoute(error.response.status)
    }
  };



  const deleteIntervensi = async () => {
    try {
        await axios.post(`/admin/diagnosa/${id}`, {
            headers: { Authorization: `Bearer ${token}`}
        })
        navigate('/admin/standarkeperawatan/diagnosis')
    } catch (error) {
        AuthorizationRoute(error.response.status)
    }
  };

  const items = [{label: 'SKI'}, {label: 'Diagnosis'}, {label: ''}]

  
  
  return (
    <React.Fragment>
      {isMobile ? (
        <>
          <Sidebar>
              <div className="container d-flex align-items-center form-margin container-breadcrumb">
                                            <span>
                                                <Link to={`/admin/standarkeperawatan/diagnosis`}>
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
                <span>Edit Diagnosa</span> -{" "}
                <span id="kode_diagnosa">{kode_diagnosa}</span>
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
                    <Form.Label id='form-label'>Kode Diagnosis</Form.Label>
                    <Form.Control
                      id="form-control-input custom-search"
                      type="text"
                      placeholder="Masukkan Kode Diagnosis"
                      onChange={(e) => setKodeDiagnosa(e.target.value)}
                      required
                      value={kode_diagnosa}
                      style={{
                        color: submitted ? "#ff0000" : "",
                        fontWeight: submitted ? "bold" : "",
                      }}
                    />
                  </Form.Group>

                  <Form.Group as={Col} className="pt-3">
                    <Form.Label id='form-label' >Nama Diagnosis</Form.Label>
                    <Form.Control
                      id="form-control-input custom-search"
                      type="text"
                      placeholder="Masukkan Nama Diagnosis"
                      onChange={(e) => setNamaDiagnosa(e.target.value)}
                      value={nama_diagnosa}
                      required
                    />
                  </Form.Group>
             

             
                  <Form.Group as={Col} className="pt-3">
                    <Form.Label id='form-label'>Faktor Risiko</Form.Label>
                    <Form.Control
                      id="form-control-input custom-search"
                      as="textarea"
                      type="text"
                      placeholder="Masukkan Faktor Risiko"
                      style={{ height: "7rem" }}
                      value={faktor_risiko}
                      onChange={(e) => setFaktorRisiko(e.target.value)}
                    />
                  </Form.Group>

          

               
                  <h5 className="pt-3">Penyebab</h5>
                  <Form.Group as={Col}>
                    <Form.Label id='form-label'>Penyebab Fisiologis</Form.Label>
                    <Form.Control
                      id="form-control-input custom-search"
                      as="textarea"
                      type="text"
                      placeholder="Masukkan Penyebab Fisiologis"
                      style={{ height: "7rem" }}
                      value={penyebab_fisiologis}
                      onChange={(e) => setPenyebabFisiologis(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group as={Col} className="pt-3">
                    <Form.Label id='form-label'>Penyebab Situasional</Form.Label>
                    <Form.Control
                      id="form-control-input custom-search"
                      as="textarea"
                      type="text"
                      placeholder="Masukkan Penyebab Situasional"
                      style={{ height: "7rem" }}
                      value={penyebab_situasional}
                      onChange={(e) => setPenyebabSituasional(e.target.value)}
                    />
                  </Form.Group>

              
                  <Form.Group as={Col} className="pt-3">
                    <Form.Label id='form-label'>Penyebab Psikologis</Form.Label>
                    <Form.Control
                      id="form-control-input custom-search"
                      as="textarea"
                      type="text"
                      placeholder="Masukkan Penyebab Psikologis"
                      style={{ height: "7rem" }}
                      value={penyebab_psikologis}
                      onChange={(e) => setPenyebabPsikologis(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group as={Col} className="pt-3">
                    <Form.Label id='form-label'>Penyebab Umum</Form.Label>
                    <Form.Control
                      id="form-control-input custom-search"
                      as="textarea"
                      type="text"
                      placeholder="Masukkan Penyebab Umum"
                      style={{ height: "7rem" }}
                      value={penyebab_umum}
                      onChange={(e) => setPenyebabUmum(e.target.value)}
                    />
                  </Form.Group>
           

                  <h5 className="pt-3">Gejala dan Tanda Mayor</h5>
                  <Form.Group as={Col}>
                    <Form.Label id='form-label'>Subjektif</Form.Label>
                    <Form.Control
                      id="form-control-input custom-search"
                      as="textarea"
                      type="text"
                      placeholder="Masukkan Gejala Mayor Subjektif"
                      style={{ height: "7rem" }}
                      value={gejala_mayor_subjektif}
                      onChange={(e) => setGejalaMayorSubjektif(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group as={Col} className="pt-3">
                    <Form.Label id='form-label'>Objektif</Form.Label>
                    <Form.Control
                      id="form-control-input custom-search"
                      as="textarea"
                      type="text"
                      placeholder="Masukkan Gejala Mayor Objektif"
                      style={{ height: "7rem" }}
                      value={gejala_mayor_objektif}
                      onChange={(e) => setGejalaMayorObjektif(e.target.value)}
                    />
                  </Form.Group>

          
                  <h5 className="pt-3">Gejala dan Tanda Minor</h5>
                  <Form.Group as={Col}>
                    <Form.Label id='form-label'>Subjektif</Form.Label>
                    <Form.Control
                      id="form-control-input custom-search"
                      as="textarea"
                      type="text"
                      placeholder="Masukkan Gejala Mayor Subjektif"
                      style={{ height: "7rem" }}
                      value={gejala_minor_subjektif}
                      onChange={(e) => setGejalaMinorSubjektif(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group as={Col} className="pt-3">
                    <Form.Label id='form-label'>Objektif</Form.Label>
                    <Form.Control
                      id="form-control-input custom-search"
                      as="textarea"
                      type="text"
                      placeholder="Masukkan Gejala Minor Objektif"
                      style={{ height: "7rem" }}
                      value={gejala_minor_objektif}
                      onChange={(e) => setGejalaMinorObjektif(e.target.value)}
                    />
                  </Form.Group>


                <div className="d-flex justify-content-end mt-5">
                  <ConfirmModal
                      onConfirm={editSubmit}
                      successMessage={"Berhasil Mengubah Diagnosa"}
                      cancelMessage={"Batal Mengubah Diagnosa"}
                      text={"Apakah Anda yakin?"}
                      buttonText={"Simpan"}
                  />
                </div>
              </Form>
            </Sidebar>
        </>
      ) : (
        <React.Fragment>
          <>
          <Sidebar>
              <div className="container d-flex align-items-center form-margin container-breadcrumb">
                                            <span>
                                                <Link to={`/admin/standarkeperawatan/diagnosis`}>
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
                <span>Edit Diagnosa</span> -{" "}
                <span id="kode_diagnosa">{kode_diagnosa}</span>
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
                    <Form.Label id='form-label'>Kode Diagnosis</Form.Label>
                    <Form.Control
                      id="form-control-input custom-search"
                      type="text"
                      placeholder="Masukkan Kode Diagnosis"
                      onChange={(e) => setKodeDiagnosa(e.target.value)}
                      required
                      value={kode_diagnosa}
                      style={{
                        color: submitted ? "#ff0000" : "",
                        fontWeight: submitted ? "bold" : "",
                      }}
                    />
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label id='form-label' >Nama Diagnosis</Form.Label>
                    <Form.Control
                      id="form-control-input custom-search"
                      type="text"
                      placeholder="Masukkan Nama Diagnosis"
                      onChange={(e) => setNamaDiagnosa(e.target.value)}
                      value={nama_diagnosa}
                      required
                    />
                  </Form.Group>
                </Row>

                <Row id="custom-row">
                  <Form.Group as={Col}>
                    <Form.Label id='form-label'>Faktor Risiko</Form.Label>
                    <Form.Control
                      id="form-control-input custom-search"
                      as="textarea"
                      type="text"
                      placeholder="Masukkan Faktor Risiko"
                      style={{ height: "7rem" }}
                      value={faktor_risiko}
                      onChange={(e) => setFaktorRisiko(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group as={Col}>{/* Empty Column */}</Form.Group>
                </Row>

                <Row id="custom-row" style={{ marginTop: "3rem" }}>
                  <h5>Penyebab</h5>
                  <Form.Group as={Col}>
                    <Form.Label id='form-label'>Penyebab Fisiologis</Form.Label>
                    <Form.Control
                      id="form-control-input custom-search"
                      as="textarea"
                      type="text"
                      placeholder="Masukkan Penyebab Fisiologis"
                      style={{ height: "7rem" }}
                      value={penyebab_fisiologis}
                      onChange={(e) => setPenyebabFisiologis(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label id='form-label'>Penyebab Situasional</Form.Label>
                    <Form.Control
                      id="form-control-input custom-search"
                      as="textarea"
                      type="text"
                      placeholder="Masukkan Penyebab Situasional"
                      style={{ height: "7rem" }}
                      value={penyebab_situasional}
                      onChange={(e) => setPenyebabSituasional(e.target.value)}
                    />
                  </Form.Group>
                </Row>

                <Row id="custom-row">
                  <Form.Group as={Col}>
                    <Form.Label id='form-label'>Penyebab Psikologis</Form.Label>
                    <Form.Control
                      id="form-control-input custom-search"
                      as="textarea"
                      type="text"
                      placeholder="Masukkan Penyebab Psikologis"
                      style={{ height: "7rem" }}
                      value={penyebab_psikologis}
                      onChange={(e) => setPenyebabPsikologis(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label id='form-label'>Penyebab Umum</Form.Label>
                    <Form.Control
                      id="form-control-input custom-search"
                      as="textarea"
                      type="text"
                      placeholder="Masukkan Penyebab Umum"
                      style={{ height: "7rem" }}
                      value={penyebab_umum}
                      onChange={(e) => setPenyebabUmum(e.target.value)}
                    />
                  </Form.Group>
                </Row>

                <Row id="custom-row" style={{ marginTop: "3rem" }}>
                  <h5>Gejala dan Tanda Mayor</h5>
                  <Form.Group as={Col}>
                    <Form.Label id='form-label'>Subjektif</Form.Label>
                    <Form.Control
                      id="form-control-input custom-search"
                      as="textarea"
                      type="text"
                      placeholder="Masukkan Gejala Mayor Subjektif"
                      style={{ height: "7rem" }}
                      value={gejala_mayor_subjektif}
                      onChange={(e) => setGejalaMayorSubjektif(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label id='form-label'>Objektif</Form.Label>
                    <Form.Control
                      id="form-control-input custom-search"
                      as="textarea"
                      type="text"
                      placeholder="Masukkan Gejala Mayor Objektif"
                      style={{ height: "7rem" }}
                      value={gejala_mayor_objektif}
                      onChange={(e) => setGejalaMayorObjektif(e.target.value)}
                    />
                  </Form.Group>
                </Row>
                <Row id="custom-row" style={{ marginTop: "3rem" }}>
                  <h5>Gejala dan Tanda Minor</h5>
                  <Form.Group as={Col}>
                    <Form.Label id='form-label'>Subjektif</Form.Label>
                    <Form.Control
                      id="form-control-input custom-search"
                      as="textarea"
                      type="text"
                      placeholder="Masukkan Gejala Mayor Subjektif"
                      style={{ height: "7rem" }}
                      value={gejala_minor_subjektif}
                      onChange={(e) => setGejalaMinorSubjektif(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label id='form-label'>Objektif</Form.Label>
                    <Form.Control
                      id="form-control-input custom-search"
                      as="textarea"
                      type="text"
                      placeholder="Masukkan Gejala Minor Objektif"
                      style={{ height: "7rem" }}
                      value={gejala_minor_objektif}
                      onChange={(e) => setGejalaMinorObjektif(e.target.value)}
                    />
                  </Form.Group>
                </Row>

                <div className="d-flex justify-content-end mt-5">
                  <ConfirmModal
                      onConfirm={editSubmit}
                      successMessage={"Berhasil Mengubah Diagnosa"}
                      cancelMessage={"Batal Mengubah Diagnosa"}
                      text={"Apakah Anda yakin?"}
                      buttonText={"Simpan"}
                  />
                </div>
              </Form>
            </Sidebar>
          </>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default EditDiagnosa;