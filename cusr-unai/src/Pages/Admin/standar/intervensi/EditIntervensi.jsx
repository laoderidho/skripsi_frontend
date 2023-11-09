import React, { useEffect, useState } from "react";
import Sidebar from "../../../../components/menu/Sidebar";
import { Breadcrumb, Form, Col, Row, Button, Modal} from "react-bootstrap";
import { useNavigate, useParams } from 'react-router-dom'
import AuthorizationRoute from '../../../../AuthorizationRoute'
import axios from '../../../../axios'

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
  const [showModal, setShowModal] = useState(false);



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

  const editSubmit = async (e) => {
    e.preventDefault();

    const handleObservasi = observasi.split("\n");
    const handleTerapeutik = terapeutik.split("\n");
    const handleEdukasi = edukasi.split("\n");

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



  const deleteIntervensi = async () => {
    try {
        await axios.post(`/admin/intervensi/delete/${id}`, {
            headers: { Authorization: `Bearer ${token}`}
        })
        navigate('/admin/standarkeperawatan/intervensi')
    } catch (error) {
        AuthorizationRoute(error.response.status)
    }
  };

  
  
  return (
    <Sidebar>
      <div className="container">
        <h2>Edit Intervensi</h2>
        <Breadcrumb>
          <Breadcrumb.Item href="/admin/standarkeperawatan/intervensi">Intervensi</Breadcrumb.Item>
          <Breadcrumb.Item active>
            Edit
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <Form className="container mt-5" onSubmit={editSubmit}>
        <Row>
          <Form.Group as={Col}>
            <Form.Label>Kode Intervensi</Form.Label>
            <Form.Control 
              id="form-control-input"
              type="text" 
              value={kode_intervensi}
              placeholder="Masukkan Kode Intervensi" 
              onChange={(e) => setKodeIntervensi(e.target.value)}
              required
              style={{
                color: submitted ? '#ff0000' : '',
                fontWeight: submitted ? 'bold' : ''
              }}
              />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Nama Intervensi</Form.Label>
            <Form.Control 
              id="form-control-input"
              type="text" 
              value={nama_intervensi}
              placeholder="Masukkan Nama Intervensi"  
              onChange={(e) => setNamaIntervensi(e.target.value)}
              required/>
          </Form.Group>
        </Row>

        <Row id="custom-row" style={{ marginTop: "3rem" }}>
        <h4>Tindakan</h4>
          <Form.Group as={Col}>
            <Form.Label>Observasi</Form.Label>
            <Form.Control
              id="form-control-input"
              as="textarea"
              type="text"
              value={observasi}
              placeholder="Masukkan Tindakan Observasi"
              style={{ height: "7rem" }}
              onChange={(e) => setObservasi(e.target.value)}
             
            />
            
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Terapeutik</Form.Label>
            <Form.Control
              id="form-control-input"
              as="textarea"
              type="text"
              value={terapeutik}
              placeholder="Masukkan Tindakan Terapeutik"
              style={{ height: "7rem" }}
              onChange={(e) => setTerapeutik(e.target.value)}
              
            />
            
          </Form.Group>
        </Row>

        <Row id="custom-row">
          <Form.Group as={Col}>
            <Form.Label>Edukasi</Form.Label>
              <Form.Control
                id="form-control-input"
                as="textarea"
                value={edukasi}
                type="text"
                placeholder="Masukkan Tindakan Edukasi"
                style={{ height: "7rem" }}
                onChange={(e) => setEdukasi(e.target.value)}
              
              />
              
          </Form.Group>

          <Form.Group as={Col}>
            {/* Empty Column */}
          </Form.Group>
        </Row>

        
        <div className='d-flex justify-content-end mt-3'>
            <Button
                id="custom-margin"
                variant='primary' 
                type="submit" 
                className='btn justify-content-center align-items-center white-button'>
                  Edit
            </Button>

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

export default EditIntervensi;
