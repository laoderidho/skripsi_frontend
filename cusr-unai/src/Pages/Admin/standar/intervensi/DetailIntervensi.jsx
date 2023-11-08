import React, { useEffect, useState } from "react";
import Sidebar from "../../../../components/menu/Sidebar";
import { Breadcrumb, Form, Col, Row, Button, Modal} from "react-bootstrap";
import { useNavigate, useParams, Link } from 'react-router-dom'
import AuthorizationRoute from '../../../../AuthorizationRoute'
import axios from '../../../../axios'

const AddIntervensi = () => {

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
        setObservasi(res.data.data.observasi)
        setTerapeutik(res.data.data.terapeutik)
        setEdukasi(res.data.data.edukasi)
    } catch (error) {
        
    }
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim() !== '') {
        const lines = inputValue.split('\n');
        const filteredLines = lines.filter((line) => line.trim() !== '');
        setArray((prevArray) => [...prevArray, ...filteredLines]);
        setInputValue('');
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
    } catch (error) {
        
    }
  };

  
  
  return (
    <Sidebar>
      <div className="container">
        <h2>Tambah Intervensi</h2>
        <Breadcrumb>
          <Breadcrumb.Item href="/admin/standarkeperawatan/intervensi">Intervensi</Breadcrumb.Item>
          <Breadcrumb.Item active>
            Tambah
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <Form className="container mt-5" onSubmit={handleSubmit}>
        <Row>
          <Form.Group as={Col}>
            <Form.Label>Kode Intervensi</Form.Label>
            <p style={{ color:  '#ff0000', fontWeight:  'bold' }} >
                {item.kode_intervensi}
              </p>
          </Form.Group>

          <Form.Group as={Col}>
            {/* Empty */}
          </Form.Group>
        </Row>

        <Row>
        <Form.Group as={Col}>
            <Form.Label>Nama Intervensi</Form.Label>
            <p>
              {item.nama_intervensi}
              </p>
          </Form.Group>
          <Form.Group>
            {/* Empty */}
          </Form.Group>
        </Row> 

        {intervensi.map((item, index) => (
           <div key={index}>
              <Row>
                <Form.Group>
                  <Form.Label>Obvservasi</Form.Label>
                    <ul>
                      <li key={index}>{item.observasi}</li>
                    </ul>
                </Form.Group>
              </Row>

              
           </div>
        ))}
          <div className='d-flex justify-content-end mt-3'>
            <Link
                // to={`/admin/intervensi/edit/}`}
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
                    onClick={deleteIntervensi}
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

export default AddIntervensi;
