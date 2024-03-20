import React, { useEffect, useState } from "react";
import Sidebar from "../../../../components/menu/Sidebar";
import { Breadcrumb, Form, Col, Row, Button, Modal} from "react-bootstrap";
import { useNavigate, useParams, Link } from 'react-router-dom'
import AuthorizationRoute from '../../../../AuthorizationRoute'
import axios from '../../../../axios'

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

  
  
  return (
    <Sidebar>
      <div className="container">
        <h2>
          <span id="kode_intervensi">{kode_intervensi}</span> -{" "}
          <span>{nama_intervensi}</span>
        </h2>
        <Breadcrumb>
          <Breadcrumb.Item href="/admin/standarkeperawatan/intervensi">
            Intervensi
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Tambah</Breadcrumb.Item>
        </Breadcrumb>
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

          <hr></hr>

          <Form.Group as={Col}>{/* Empty */}</Form.Group>
        </Row>

        <Row>
          <Form.Group as={Col}>
            <Form.Label id="bold-font" className="mt-4">
              Nama Intervensi
            </Form.Label>
            <p>{nama_intervensi}</p>
          </Form.Group>

          <hr></hr>
          <Form.Group>{/* Empty */}</Form.Group>
        </Row>

        <Row>
          <Form.Group>
            <h4 className="mt-3">Tindakan</h4>
            <Form.Label id="bold-font" className="mt-4">
              Observasi
            </Form.Label>
            <ul>
              {observasi &&
                observasi.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
          </Form.Group>

          <hr></hr>
        </Row>

        <Row>
          <Form.Group>
            <Form.Label id="bold-font" className="mt-4">
              Terapeutik
            </Form.Label>
            <ul>
              {terapeutik &&
                terapeutik.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
          </Form.Group>

          <hr></hr>
        </Row>

        <Row>
          <Form.Group>
            <Form.Label id="bold-font" className="mt-4">
              Edukasi
            </Form.Label>
            <ul>
              {edukasi &&
                edukasi.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
          </Form.Group>
          <hr></hr>
        </Row>

        <div className="d-flex justify-content-end mt-3">
          <Link
            to={`/admin/intervensi/edit/${id}`}
            id="custom-margin"
            variant="primary"
            className="btn justify-content-center align-items-center white-button"
          >
            Edit
          </Link>

          <Button
            onClick={() => setShowModal(true)}
            variant="danger"
            type="button"
            className="btn justify-content-center align-items-center"
          >
            Delete
          </Button>

          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Konfirmasi</Modal.Title>
            </Modal.Header>
            <Modal.Body>Apakah Anda yakin ingin menghapus data ini?</Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowModal(false)}
                className="btn justify-content-center align-items-center white-button"
              >
                Batal
              </Button>
              <Button
                variant="danger"
                onClick={deleteIntervensi}
                className="btn justify-content-center align-items-center "
              >
                Hapus
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </Form>
    </Sidebar>
  );
};

export default DetailIntervensi;
