import React, { useEffect, useState } from "react";
import Sidebar from "../../../../components/menu/SidebarAdmin";
import { Breadcrumb, Form, Col, Row, Button, Modal} from "react-bootstrap";
import { useNavigate, useParams, Link } from 'react-router-dom'
import AuthorizationRoute from '../../../../AuthorizationRoute'
import axios from '../../../../axios'
import { BreadCrumb } from 'primereact/breadcrumb';
import ConfirmModal from "../../../../components/menu/ConfirmModal";

const DetailLuaran = () => {

  const [kode_luaran, setKodeLuaran] = useState("");
  const [nama_luaran, setNamaLuaran] = useState("");
  const [nama_kriteria_luaran, setNamaKriteriaLuaran] = useState("");
  const {id} = useParams();
  const navigate = useNavigate();
  const token=localStorage.getItem("token");
  const [submitted, setSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(false)
  const isMobile = window.innerWidth <=600;
  const [tanggal, setTanggal] = useState('');

  const [array, setArray] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const [luaran, setLuaran] = useState([]);

  const getLuaran = async (token) => {
    try {
      await axios.post(`/admin/luaran/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => {
        console.log(res)
        setLuaran(res?.data?.data);
      }) 
    } catch (error) {
      
    }
  }


  useEffect(() => {
    getDataById();
    getLuaran(localStorage.getItem('token'))
  },[]);

  const getDataById = async () => {
    try {
        const res = await axios.post(`/admin/luaran/detail/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        setKodeLuaran(res.data.data.kode_luaran)
        setNamaLuaran(res.data.data.nama_luaran)
        setNamaKriteriaLuaran(res.data.data.nama_kriteria_luaran)

        console.log(res.data)
    } catch (error) {
        
    }
  };



  const deleteLuaran = async () => {
    try {
        await axios.post(`/admin/luaran/delete/${id}`, {
            headers: { Authorization: `Bearer ${token}`}
        })
        navigate("/admin/standarkeperawatan/luaran");
    } catch (error) {
        
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
                                                                  <p className='title-breadcrumb'>{kode_luaran}</p>
                                                              </span>
                    </div>
              <div className="container">
              <h3>
                <span id="kode_luaran">{kode_luaran}</span> - <span>{nama_luaran}</span>
              </h3>
              </div>

              <Form className="container mt-5">
              <Row>
                <Form.Group as={Col}>
                  <Form.Label id='form-label' className="mt-4" >Kode Luaran</Form.Label>
                  <p style={{ color:  '#006918', fontWeight:  'bold' }} >
                      {kode_luaran}
                    </p>
                </Form.Group>

                <hr className="hr-askep"></hr>

                <Form.Group as={Col} >
                  {/* Empty */}
                </Form.Group>
              </Row>

              <Row>
              <Form.Group as={Col}>
                  <Form.Label id='form-label' className="mt-4">Nama Luaran</Form.Label>
                  <p >
                    {nama_luaran}
                    </p>
                </Form.Group>

                <hr></hr>
                <Form.Group>
                  {/* Empty */}
                </Form.Group>
              </Row> 

              <Row>
                <Form.Group>
                  <h5 className="mt-3">Kriteria</h5>
                  <Form.Label id='form-label' className="mt-3">Kriteria</Form.Label>
                    <ul>
                      {nama_kriteria_luaran && nama_kriteria_luaran.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                </Form.Group>

                <hr className="hr-askep"></hr>
              </Row>

                <div className='d-flex justify-content-end mt-3'>
                  <Link
                      to={`/admin/luaran/edit/${id}`}
                      id="custom-margin"
                      variant='primary'  
                      className='btn justify-content-center align-items-center edit-button'>
                        Edit
                  </Link>

                  <ConfirmModal
                                              onConfirm={deleteLuaran}
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
                                                              <Link to={`/admin/standarkeperawatan/luaran`}>
                                                                  <svg xmlns="http://www.w3.org/2000/svg" width='17' height='17' fill='#fff' viewBox="0 0 24 24" stroke-width="1.5" stroke="#085b93" class="w-6 h-6 mb-3">
                                                                  <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                                                  </svg>
                                                              </Link>
                                                          </span>
                                                              <BreadCrumb model={items} />

                                                              <span>
                                                                  <p className='title-breadcrumb'>{kode_luaran}</p>
                                                              </span>
                    </div>
              <div className="container">
              <h3>
                <span id="kode_luaran">{kode_luaran}</span> - <span>{nama_luaran}</span>
              </h3>
              </div>

              <Form className="container mt-5">
              <Row>
                <Form.Group as={Col}>
                  <Form.Label id='form-label' className="mt-4" >Kode Luaran</Form.Label>
                  <p style={{ color:  '#006918', fontWeight:  'bold' }} >
                      {kode_luaran}
                    </p>
                </Form.Group>

                <hr className="hr-askep"></hr>

                <Form.Group as={Col} >
                  {/* Empty */}
                </Form.Group>
              </Row>

              <Row>
              <Form.Group as={Col}>
                  <Form.Label id='form-label' className="mt-4">Nama Luaran</Form.Label>
                  <p >
                    {nama_luaran}
                    </p>
                </Form.Group>

                <hr></hr>
                <Form.Group>
                  {/* Empty */}
                </Form.Group>
              </Row> 

              <Row>
                <Form.Group>
                  <h5 className="mt-3">Kriteria</h5>
                  <Form.Label id='form-label' className="mt-3">Kriteria</Form.Label>
                    <ul>
                      {nama_kriteria_luaran && nama_kriteria_luaran.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                </Form.Group>

                <hr className="hr-askep"></hr>
              </Row>

                <div className='d-flex justify-content-end mt-3'>
                  <Link
                      to={`/admin/luaran/edit/${id}`}
                      id="custom-margin"
                      variant='primary'  
                      className='btn justify-content-center align-items-center edit-button'>
                        Edit
                  </Link>

                  <ConfirmModal
                                              onConfirm={deleteLuaran}
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

export default DetailLuaran;
