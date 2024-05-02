import React, { useEffect, useState } from "react";
import Sidebar from "../../../../components/menu/SidebarAdmin";
import { Breadcrumb, Form, Col, Row, Button, Modal} from "react-bootstrap";
import { useNavigate, useParams, Link } from 'react-router-dom'
import AuthorizationRoute from '../../../../AuthorizationRoute'
import axios from '../../../../axios'
import { BreadCrumb } from 'primereact/breadcrumb';
import ConfirmModal from "../../../../components/menu/ConfirmModal";


const DetailDiagnosa = () => {

  const [kode_diagnosa, setKodeDiagnosa] = useState("");
  const [nama_diagnosa, setNamaDiagnosa] = useState("");
  const [faktor_risiko, setFaktorRisiko] = useState("");
  const [penyebab_fisiologis, setPenyebabFisiologis] = useState("");
  const [penyebab_situasional, setPenyebabSituasional] = useState("");
  const [penyebab_psikologis, setPenyebabPsikologis] = useState("");
  const [gejala_mayor_subjektif, setGejalaMayorSubjektif] = useState("");
  const [gejala_mayor_objektif, setGejalaMayorObjektif] = useState("");
  const [updated_at, setUpdateAt] = useState("");
  const [jam, setJam] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [action, setAction] = useState("");

  const [gejala_minor_subjektif, setGejalaMinorSubjektif] = useState("");
  const [gejala_minor_objektif, setGejalaMinorObjektif] = useState("");
  const [penyebab_umum, setPenyebabUmum] = useState("");

  const {id} = useParams();
  const navigate = useNavigate();
  const token=localStorage.getItem("token");
  const [submitted, setSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [array, setArray] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const [diagnosa, setDiagnosa] = useState([]);

  const isMobile = window.innerWidth <=600;



  useEffect(() => {
    getDataById();
    // getDiagnosa(localStorage.getItem('token'))
  },[]);

  const getDataById = async () => {
    try {
        const res = await axios.post(`/admin/diagnosa/detail/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        setUpdateAt(res.data.data.updated_at)
        setKodeDiagnosa(res.data.data.kode_diagnosa)
        setNamaDiagnosa(res.data.data.nama_diagnosa)
        setFaktorRisiko(res.data.data.faktor_risiko)
        setPenyebabFisiologis(res.data.data.penyebab_fisiologis)
        setPenyebabSituasional(res.data.data.penyebab_situasional)
        setPenyebabPsikologis(res.data.data.penyebab_psikologis)
        setGejalaMayorSubjektif(res.data.data.gejala_mayor_subjektif)
        setGejalaMayorObjektif(res.data.data.gejala_mayor_objektif)
        setGejalaMinorSubjektif(res.data.data.gejala_minor_subjektif)
        setGejalaMinorObjektif(res.data.data.gejala_minor_objektif)
        setPenyebabUmum(res.data.data.penyebab_umum)
    } catch (error) {
        
    }
  };



  const handleChange = (event) => {
    setInputValue(event.target.value);
  }

  const deleteDiagnosa = async () => {
    try {
        await axios.post(`/admin/diagnosa/delete/${id}`, {
            headers: { Authorization: `Bearer ${token}`}
        })
        navigate('/admin/standarkeperawatan/diagnosis')
    } catch (error) {
        
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
                                                    <p className='title-breadcrumb'>{kode_diagnosa}</p>
                                                </span>
                </div>
                <div className="container">
                
                    <h3>
                    <span id="kode_diagnosa">{kode_diagnosa} - {""}</span>
                      <span>{nama_diagnosa}</span>
                    </h3>
                    
                    <h1>
                      <span id="update_at">{updated_at} </span>
                    </h1>
                </div>

              <Form className="container mt-5">
                <Row>
                  <Form.Group as={Col}>
                    <Form.Label id="form-label" className="mt-4">
                      Kode Diagnosis
                    </Form.Label>
                    <p style={{ color: "#ff0000"}}>
                      {kode_diagnosa}
                    </p>
                  </Form.Group>

                  <hr className="hr-askep"></hr>

                  <Form.Group as={Col}>{/* Empty */}</Form.Group>
                </Row>

                <Row>
                  <Form.Group as={Col}>
                    <Form.Label id="form-label" className="mt-4">
                      Nama Diagnosis
                    </Form.Label>
                    <p>{nama_diagnosa}</p>
                  </Form.Group>

                  <hr className="hr-askep"></hr>
                  <Form.Group>{/* Empty */}</Form.Group>
                </Row>

                <Row>
                  <Form.Group>
                    {faktor_risiko.length !==0 && <Form.Label id="form-label" className="mt-4">
                      Faktor Risiko
                    </Form.Label>}
                    <ul>
                      {faktor_risiko &&
                        faktor_risiko.map((item, index) => <li key={index}>{item}</li>)}
                    </ul>
                  </Form.Group>

                  {faktor_risiko.length !==0 && <hr className="hr-askep"></hr>}
                </Row>

                <Row>
                  <Form.Group>
                    <h5 className="mt-3">Penyebab</h5>
                    {penyebab_fisiologis.length !==0 && <Form.Label id="form-label" className="mt-4">
                      Penyebab Fisiologis
                    </Form.Label>}
                    <ul>
                      {penyebab_fisiologis &&
                        penyebab_fisiologis.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                    </ul>
                  </Form.Group>

                  {penyebab_fisiologis.length !==0 && <hr className="hr-askep"></hr>}
                </Row>

                <Row>
                  <Form.Group>
                    {penyebab_situasional.length !==0 && <Form.Label id="form-label" className="mt-4">
                      Penyebab Situasional
                    </Form.Label>}
                    <ul>
                      {penyebab_situasional &&
                        penyebab_situasional.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                    </ul>
                  </Form.Group>

                  {penyebab_situasional.length !==0 && <hr className="hr-askep"></hr>}
                </Row>

                <Row>
                  <Form.Group>
                    {penyebab_umum.length !==0 && <Form.Label id="form-label" className="mt-4">
                      Penyebab Umum
                    </Form.Label>}
                    <ul>
                      {penyebab_umum &&
                        penyebab_umum.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                    </ul>
                  </Form.Group>

                  {penyebab_umum.length !==0 && <hr className="hr-askep"></hr>}
                </Row>

                <Row>
                  <Form.Group>
                    {penyebab_psikologis.length !==0 && <Form.Label id="form-label" className="mt-4">
                      Penyebab Psikologis
                    </Form.Label>}
                    <ul>
                      {penyebab_psikologis &&
                        penyebab_psikologis.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                    </ul>
                  </Form.Group>

                  {penyebab_psikologis.length !==0 && <hr className="hr-askep"></hr>}
                </Row>

                <Row>
                  <Form.Group>
                    <h5 className="mt-3">Gejala dan Tanda Mayor</h5>
                    {gejala_mayor_subjektif.length !==0 && <Form.Label id="form-label" className="mt-4">
                      Subjektif
                    </Form.Label>}
                    <ul>
                      {gejala_mayor_subjektif &&
                        gejala_mayor_subjektif.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                    </ul>
                  </Form.Group>
                </Row>

                <Row>
                  <Form.Group>
                    {gejala_mayor_objektif.length !==0 && <Form.Label id="form-label" className="mt-4">
                      Objektif
                    </Form.Label>}
                    <ul>
                      {gejala_mayor_objektif &&
                        gejala_mayor_objektif.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                    </ul>
                  </Form.Group>

                  {gejala_mayor_subjektif.length || gejala_mayor_objektif.length !==0 && <hr className="hr-askep"></hr>}
                </Row>

                <Row>
                  <Form.Group>
                    <h5 className="mt-3">Gejala dan Tanda Minor</h5>
                    {gejala_minor_subjektif.length !==0 && <Form.Label id="form-label" className="mt-4">
                      Subjektif
                    </Form.Label>}
                    <ul>
                      {gejala_minor_subjektif &&
                        gejala_minor_subjektif.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                    </ul>
                  </Form.Group>
                </Row>

                <Row>
                  <Form.Group>
                    {gejala_minor_objektif.length !==0 && <Form.Label id="form-label" className="mt-4">
                      Objektif
                    </Form.Label>}
                    <ul>
                      {gejala_minor_objektif &&
                        gejala_minor_objektif.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                    </ul>
                  </Form.Group>

                  {gejala_minor_subjektif.length || gejala_minor_objektif.length !==0 && <hr className="hr-askep"></hr>}
                </Row>

                <div className="d-flex justify-content-end mt-3">
                  <Link
                    to={`/admin/diagnosa/edit/${id}`}
                    id="custom-margin"
                    variant="primary"
                    className="btn justify-content-center align-items-center edit-button"
                  >
                    Edit
                  </Link>

                  <ConfirmModal
                                onConfirm={deleteDiagnosa}
                                successMessage={"Data Diagnosis berhasil Dihapus"}
                                cancelMessage={"Data Diagnosis gagal Dihapus"}
                                buttonText={"Hapus"}
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
                                                <Link to={`/admin/standarkeperawatan/diagnosis`}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width='17' height='17' fill='#fff' viewBox="0 0 24 24" stroke-width="1.5" stroke="#085b93" class="w-6 h-6 mb-3">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                                    </svg>
                                                </Link>
                                            </span>
                                                <BreadCrumb model={items} />

                                                <span>
                                                    <p className='title-breadcrumb'>{kode_diagnosa}</p>
                                                </span>
                </div>
              <div className="container">

                  <h3>
                  <span id="kode_diagnosa">{kode_diagnosa} - {""}</span>
                    <span>{nama_diagnosa}</span>
                  </h3>
               
              </div>

              <Form className="container mt-5">
                <Row>
                  <Form.Group as={Col}>
                    <Form.Label id="form-label" className="mt-4">
                      Kode Diagnosis
                    </Form.Label>
                    <p style={{ color: "#ff0000"}}>
                      {kode_diagnosa}
                    </p>
                  </Form.Group>

                  <hr className="hr-askep"></hr>

                  <Form.Group as={Col}>{/* Empty */}</Form.Group>
                </Row>

                <Row>
                  <Form.Group as={Col}>
                    <Form.Label id="form-label" className="mt-4">
                      Nama Diagnosis
                    </Form.Label>
                    <p>{nama_diagnosa}</p>
                  </Form.Group>

                  <hr className="hr-askep"></hr>
                  <Form.Group>{/* Empty */}</Form.Group>
                </Row>

                <Row>
                  <Form.Group>
                    {faktor_risiko.length !==0 && <Form.Label id="form-label" className="mt-4">
                      Faktor Risiko
                    </Form.Label>}
                    <ul>
                      {faktor_risiko &&
                        faktor_risiko.map((item, index) => <li key={index}>{item}</li>)}
                    </ul>
                  </Form.Group>

                  {faktor_risiko.length !==0 && <hr className="hr-askep"></hr>}
                </Row>

                <Row>
                  <Form.Group>
                    <h5 className="mt-3">Penyebab</h5>
                    {penyebab_fisiologis.length !==0 && <Form.Label id="form-label" className="mt-4">
                      Penyebab Fisiologis
                    </Form.Label>}
                    <ul>
                      {penyebab_fisiologis &&
                        penyebab_fisiologis.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                    </ul>
                  </Form.Group>

                  {penyebab_fisiologis.length !==0 && <hr className="hr-askep"></hr>}
                </Row>

                <Row>
                  <Form.Group>
                    {penyebab_situasional.length !==0 && <Form.Label id="form-label" className="mt-4">
                      Penyebab Situasional
                    </Form.Label>}
                    <ul>
                      {penyebab_situasional &&
                        penyebab_situasional.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                    </ul>
                  </Form.Group>

                  {penyebab_situasional.length !==0 && <hr className="hr-askep"></hr>}
                </Row>

                <Row>
                  <Form.Group>
                    {penyebab_umum.length !==0 && <Form.Label id="form-label" className="mt-4">
                      Penyebab Umum
                    </Form.Label>}
                    <ul>
                      {penyebab_umum &&
                        penyebab_umum.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                    </ul>
                  </Form.Group>

                  {penyebab_umum.length !==0 && <hr className="hr-askep"></hr>}
                </Row>

                <Row>
                  <Form.Group>
                    {penyebab_psikologis.length !==0 && <Form.Label id="form-label" className="mt-4">
                      Penyebab Psikologis
                    </Form.Label>}
                    <ul>
                      {penyebab_psikologis &&
                        penyebab_psikologis.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                    </ul>
                  </Form.Group>

                  {penyebab_psikologis.length !==0 && <hr className="hr-askep"></hr>}
                </Row>

                <Row>
                  <Form.Group>
                    <h5 className="mt-3">Gejala dan Tanda Mayor</h5>
                    {gejala_mayor_subjektif.length !==0 && <Form.Label id="form-label" className="mt-4">
                      Subjektif
                    </Form.Label>}
                    <ul>
                      {gejala_mayor_subjektif &&
                        gejala_mayor_subjektif.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                    </ul>
                  </Form.Group>
                </Row>

                <Row>
                  <Form.Group>
                    {gejala_mayor_objektif.length !==0 && <Form.Label id="form-label" className="mt-4">
                      Objektif
                    </Form.Label>}
                    <ul>
                      {gejala_mayor_objektif &&
                        gejala_mayor_objektif.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                    </ul>
                  </Form.Group>

                  {gejala_mayor_subjektif.length || gejala_mayor_objektif.length !==0 && <hr className="hr-askep"></hr>}
                </Row>

                <Row>
                  <Form.Group>
                    <h5 className="mt-3">Gejala dan Tanda Minor</h5>
                    {gejala_minor_subjektif.length !==0 && <Form.Label id="form-label" className="mt-4">
                      Subjektif
                    </Form.Label>}
                    <ul>
                      {gejala_minor_subjektif &&
                        gejala_minor_subjektif.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                    </ul>
                  </Form.Group>
                </Row>

                <Row>
                  <Form.Group>
                    {gejala_minor_objektif.length !==0 && <Form.Label id="form-label" className="mt-4">
                      Objektif
                    </Form.Label>}
                    <ul>
                      {gejala_minor_objektif &&
                        gejala_minor_objektif.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                    </ul>
                  </Form.Group>

                  {gejala_minor_subjektif.length || gejala_minor_objektif.length !==0 && <hr className="hr-askep"></hr>}
                </Row>

                <div className="d-flex justify-content-end mt-3">
                  <Link
                    to={`/admin/diagnosa/edit/${id}`}
                    id="custom-margin"
                    variant="primary"
                    className="btn justify-content-center align-items-center edit-button"
                  >
                    Edit
                  </Link>

                  <ConfirmModal
                                onConfirm={deleteDiagnosa}
                                successMessage={"Data Diagnosis berhasil Dihapus"}
                                cancelMessage={"Data Diagnosis gagal Dihapus"}
                                buttonText={"Hapus"}
                  />
                </div>
              </Form>
              </Sidebar>
        </>
      )}
    </React.Fragment>
  );
};

export default DetailDiagnosa;
