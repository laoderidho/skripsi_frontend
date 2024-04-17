import React, { useEffect, useState } from "react";
import Sidebar from "../../../../components/menu/SidebarAdmin";
import { Breadcrumb, Form, Col, Row, Button, Modal} from "react-bootstrap";
import { useNavigate, useParams, Link } from 'react-router-dom'
import AuthorizationRoute from '../../../../AuthorizationRoute'
import axios from '../../../../axios'
import { BreadCrumb } from 'primereact/breadcrumb';
import ConfirmModal from "../../../../components/menu/ConfirmModal";

const DetailIntervensi = () => {

  const [kode_intervensi, setKodeIntervensi] = useState("");
  const [nama_intervensi, setNamaIntervensi] = useState("");
  const [observasi, setObservasi] = useState("");
  const [terapeutik, setTerapeutik] = useState("");
  const [edukasi, setEdukasi] = useState("");
  const {id} = useParams();
  const navigate = useNavigate();
  const token=localStorage.getItem("token");
  const [submitted, setSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [array, setArray] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const isMobile = window.innerWidth <=600;

  const [intervensi, setIntervensi] = useState([]);

  const getIntervensi = async (token) => {
    try {
      await axios.post(`/admin/intervensi`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => {
        console.log(res)
        setIntervensi(res?.data?.data);
      }) 
    } catch (error) {
      
    }
  }


  useEffect(() => {
    getDataById();
    getIntervensi(localStorage.getItem('token'))
  },[]);

  const getDataById = async () => {
    try {
        const res = await axios.post(`/admin/intervensi/detail/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        setKodeIntervensi(res.data.data.kode_intervensi)
        setNamaIntervensi(res.data.data.nama_intervensi)
        setObservasi(res.data.observasi)
        setTerapeutik(res.data.terapeutik)
        setEdukasi(res.data.edukasi)
    } catch (error) {
        
    }
  };



  const handleChange = (event) => {
    setInputValue(event.target.value);
  }

  const deleteIntervensi = async () => {
    try {
        await axios.post(`/admin/intervensi/delete/${id}`, {
            headers: { Authorization: `Bearer ${token}`}
        })
        navigate("/admin/standarkeperawatan/intervensi");
    } catch (error) {
        
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
                                                            <p className='title-breadcrumb'>{kode_intervensi}</p>
                                                        </span>
              </div>
              <div className="container">
                <h3>
                  <span id="kode_intervensi">{kode_intervensi}</span> -{" "}
                  <span>{nama_intervensi}</span>
                </h3>
              </div>

              <Form className="container mt-5">
                <Row>
                  <Form.Group as={Col}>
                    <Form.Label id="form-label" className="mt-4">
                      Kode Intervensi
                    </Form.Label>
                    <p style={{ color: "#161f7d", fontWeight: "bold" }}>
                      {kode_intervensi}
                    </p>
                  </Form.Group>

                  <hr className="hr-askep"></hr>

                  <Form.Group as={Col}>{/* Empty */}</Form.Group>
                </Row>

                <Row>
                  <Form.Group as={Col}>
                    <Form.Label id="form-label" className="mt-4">
                      Nama Intervensi
                    </Form.Label>
                    <p>{nama_intervensi}</p>
                  </Form.Group>

                  <hr className="hr-askep"></hr>
                  <Form.Group>{/* Empty */}</Form.Group>
                </Row>

                <Row>
                  <Form.Group>
                    <h4 className="mt-3">Tindakan</h4>
                    {observasi.length !==0 && <Form.Label id="form-label" className="mt-4">
                      Observasi
                    </Form.Label>}
                    <ul>
                      {observasi &&
                        observasi.map((item, index) => <li key={index}>{item}</li>)}
                    </ul>
                  </Form.Group>

                  {observasi.length !==0 && <hr className="hr-askep"></hr>}
                </Row>

                <Row>
                  <Form.Group>
                    {terapeutik.length !==0 && <Form.Label id="form-label" className="mt-4">
                      Terapeutik
                    </Form.Label>}
                    <ul>
                      {terapeutik &&
                        terapeutik.map((item, index) => <li key={index}>{item}</li>)}
                    </ul>
                  </Form.Group>

                  {terapeutik.length !==0 && <hr className="hr-askep"></hr>}
                </Row>

                <Row>
                  <Form.Group>
                    {edukasi.length !==0 && <Form.Label id="form-label" className="mt-4">
                      Edukasi
                    </Form.Label>}
                    <ul>
                      {edukasi &&
                        edukasi.map((item, index) => <li key={index}>{item}</li>)}
                    </ul>
                  </Form.Group>
                  {edukasi.length !==0 && <hr className="hr-askep"></hr>}
                </Row>

                <div className="d-flex justify-content-end mt-3">
                  <Link
                    to={`/admin/intervensi/edit/${id}`}
                    id="custom-margin"
                    variant="primary"
                    className="btn justify-content-center align-items-center edit-button"
                  >
                    Edit
                  </Link>

                  <ConfirmModal
                                        onConfirm={deleteIntervensi}
                                        successMessage={"Data Diagnosis berhasil Dihapus"}
                                        cancelMessage={"Data Diagnosis gagal Dihapus"}
                                        buttonText={"Hapus"}
                          />
                </div>
              </Form>
              </Sidebar>
        </>
      ) : (
        <React.Fragment>
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
                                                            <p className='title-breadcrumb'>{kode_intervensi}</p>
                                                        </span>
              </div>
              <div className="container">
                <h3>
                  <span id="kode_intervensi">{kode_intervensi}</span> -{" "}
                  <span>{nama_intervensi}</span>
                </h3>
              </div>

              <Form className="container mt-5">
                <Row>
                  <Form.Group as={Col}>
                    <Form.Label id="bold-font" className="mt-4">
                      Kode Intervensi
                    </Form.Label>
                    <p style={{ color: "#161f7d", fontWeight: "bold" }}>
                      {kode_intervensi}
                    </p>
                  </Form.Group>

                  <hr className="hr-askep"></hr>

                  <Form.Group as={Col}>{/* Empty */}</Form.Group>
                </Row>

                <Row>
                  <Form.Group as={Col}>
                    <Form.Label id="bold-font" className="mt-4">
                      Nama Intervensi
                    </Form.Label>
                    <p>{nama_intervensi}</p>
                  </Form.Group>

                  <hr className="hr-askep"></hr>
                  <Form.Group>{/* Empty */}</Form.Group>
                </Row>

                <Row>
                  <Form.Group>
                    <h4 className="mt-3">Tindakan</h4>
                    {observasi.length !==0 && <Form.Label id="bold-font" className="mt-4">
                      Observasi
                    </Form.Label>}
                    <ul>
                      {observasi &&
                        observasi.map((item, index) => <li key={index}>{item}</li>)}
                    </ul>
                  </Form.Group>

                  {observasi.length !==0 && <hr className="hr-askep"></hr>}
                </Row>

                <Row>
                  <Form.Group>
                    {terapeutik.length !==0 && <Form.Label id="bold-font" className="mt-4">
                      Terapeutik
                    </Form.Label>}
                    <ul>
                      {terapeutik &&
                        terapeutik.map((item, index) => <li key={index}>{item}</li>)}
                    </ul>
                  </Form.Group>

                  {terapeutik.length !==0 && <hr className="hr-askep"></hr>}
                </Row>

                <Row>
                  <Form.Group>
                    {edukasi.length !==0 && <Form.Label id="bold-font" className="mt-4">
                      Edukasi
                    </Form.Label>}
                    <ul>
                      {edukasi &&
                        edukasi.map((item, index) => <li key={index}>{item}</li>)}
                    </ul>
                  </Form.Group>
                  {edukasi.length !==0 && <hr className="hr-askep"></hr>}
                </Row>

                <div className="d-flex justify-content-end mt-3">
                  <Link
                    to={`/admin/intervensi/edit/${id}`}
                    id="custom-margin"
                    variant="primary"
                    className="btn justify-content-center align-items-center edit-button"
                  >
                    Edit
                  </Link>

                  <ConfirmModal
                                        onConfirm={deleteIntervensi}
                                        successMessage={"Data Diagnosis berhasil Dihapus"}
                                        cancelMessage={"Data Diagnosis gagal Dihapus"}
                                        buttonText={"Hapus"}
                          />
                </div>
              </Form>
              </Sidebar>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default DetailIntervensi;
