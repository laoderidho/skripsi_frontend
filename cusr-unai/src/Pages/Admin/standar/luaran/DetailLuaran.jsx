import React, { useEffect, useState } from "react";
import Sidebar from "../../../../components/menu/Sidebar";
import { Breadcrumb, Form, Col, Row, Button, Modal} from "react-bootstrap";
import { useNavigate, useParams, Link } from 'react-router-dom'
import AuthorizationRoute from '../../../../AuthorizationRoute'
import axios from '../../../../axios'

const DetailLuaran = () => {

  const [kode_luaran, setKodeLuaran] = useState("");
  const [nama_luaran, setNamaLuaran] = useState("");
  const [nama_kriteria_luaran, setNamaKriteriaLuaran] = useState("");
  const {id} = useParams();
  const navigate = useNavigate();
  const token=localStorage.getItem("token");
  const [submitted, setSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(false);

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
        const res = await axios.post(`/admin/luaran/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        setKodeLuaran(res.data.data.kode_luaran)
        setNamaLuaran(res.data.data.nama_luaran)
        setNamaKriteriaLuaran(res.data.data.nama_kriteria_luaran)
        console.log(res)
    } catch (error) {
        
    }
  };



  const handleChange = (event) => {
    setInputValue(event.target.value);
  }

  const deleteLuaran = async () => {
    try {
        await axios.post(`/admin/luaran/${id}`, {
            headers: { Authorization: `Bearer ${token}`}
        })
    } catch (error) {
        
    }
  };

  
  
  return (
    <Sidebar>
      <div className="container">
        <h2>{kode_luaran} - {nama_luaran}</h2>
        <Breadcrumb>
          <Breadcrumb.Item href="/admin/standarkeperawatan/luaran">Luaran</Breadcrumb.Item>
          <Breadcrumb.Item active>
            Tambah
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <Form className="container mt-5">
        <Row>
          <Form.Group as={Col}>
            <Form.Label id="bold-font" className="mt-4" >Kode Luaran</Form.Label>
            <p style={{ color:  '#ff0000', fontWeight:  'bold' }} >
                {kode_luaran}
              </p>
          </Form.Group>

          <hr></hr>

          <Form.Group as={Col} >
            {/* Empty */}
          </Form.Group>
        </Row>

        <Row>
        <Form.Group as={Col}>
            <Form.Label id="bold-font" className="mt-4">Nama Luaran</Form.Label>
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
            <h4 className="mt-3">Kriteria</h4>
            <Form.Label id="bold-font" className="mt-4">Kriteria</Form.Label>
              <ul>
                {nama_kriteria_luaran && nama_kriteria_luaran.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
          </Form.Group>

          <hr></hr>
        </Row>
   
          <div className='d-flex justify-content-end mt-3'>
            <Link
                to={`/admin/luaran/edit/${id}`}
                id="custom-margin"
                variant='primary'  
                className='btn justify-content-center align-items-center white-button'>
                  Edit
            </Link>

            <Button
              onClick={() => setShowModal(true)}
              variant='primary'
              type="button"
              className='btn justify-content-center align-items-center red-button'>
                Delete
            </Button>
            
            <Modal
              show={showModal}
              onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                  <Modal.Title>Konfirmasi</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Apakah Anda yakin ingin menghapus data ini?
                </Modal.Body>
                <Modal.Footer>
                  <Button 
                    variant='secondary'
                    onClick={() => setShowModal(false)}
                    className='btn justify-content-center align-items-center white-button'>
                      Batal
                  </Button>
                  <Button 
                    variant='primary'
                    onClick={deleteLuaran}
                    className='btn justify-content-center align-items-center red-button'>
                      Hapus
                  </Button>
                </Modal.Footer>
            </Modal>
          </div>
      </Form>


    </Sidebar>
  );
};

export default DetailLuaran;
