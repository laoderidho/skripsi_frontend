import React, { useEffect, useState } from "react";
import Sidebar from "../../../../components/menu/Sidebar";
import { Breadcrumb, Form, Col, Row, Button, Modal} from "react-bootstrap";
import { useNavigate, useParams, Link } from 'react-router-dom'
import AuthorizationRoute from '../../../../AuthorizationRoute'
import axios from '../../../../axios'
import ConfirmModal from "../../../../components/menu/ConfirmModal";

const EditIntervensi = () => {

  const [kode_intervensi, setKodeIntervensi] = useState("");
  const [nama_intervensi, setNamaIntervensi] = useState("");
  const [observasi, setObservasi] = useState("");
  const [terapeutik, setTerapeutik] = useState("");
  const [edukasi, setEdukasi] = useState("");
  const [kolaborasi, setKolaborasi] = useState("");
  const {id} = useParams();
  const navigate = useNavigate();
  const token=localStorage.getItem("token");
  const [submitted, setSubmitted] = useState(false);

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
        setKolaborasi(res.data.kolaborasi.join('\n'))
    } catch (error) {
        
    }
  }

  const editSubmit = async () => {

    const handleObservasi = observasi ? observasi.split("\n") : null;
    const handleTerapeutik = terapeutik ? terapeutik.split("\n") : null;
    const handleEdukasi =  edukasi ? edukasi.split("\n") : null;
    const handleKolaborasi = kolaborasi ? kolaborasi.split("\n") : null;

    try {
      const res = await axios.post(
         `/admin/intervensi/edit/${id}`,
         {
          kode_intervensi: kode_intervensi,
          nama_intervensi: nama_intervensi,
          observasi: handleObservasi,
          terapeutik: handleTerapeutik,
          edukasi: handleEdukasi,
          kolaborasi: handleKolaborasi,
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

  
  
  return (
    <Sidebar>
      <div className="container">
        <h2>
          <span>Edit Intervensi</span> -{" "}
          <span id="kode_intervensi">{kode_intervensi}</span>
        </h2>
        <Breadcrumb>
          <Breadcrumb.Item href="/admin/standarkeperawatan/intervensi">
            Intervensi
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Edit</Breadcrumb.Item>
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
                color: submitted ? "#ff0000" : "",
                fontWeight: submitted ? "bold" : "",
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
              required
            />
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
            <Form.Label>Kolaborasi</Form.Label>
            <Form.Control
              id="form-control-input"
              as="textarea"
              value={kolaborasi}
              type="text"
              placeholder="Masukkan Tindakan Kolaborasi"
              style={{ height: "7rem" }}
              onChange={(e) => setKolaborasi(e.target.value)}
            />
          </Form.Group>
        </Row>

        <div className="mt-3 d-flex justify-content-end">
          <Link
            to={`/admin/standarkeperawatan/intervensi/${id}`}
            type="button"
            
            className="btn btn-danger mx-3"
          >
            Cancel
          </Link>
          <ConfirmModal 
              onConfirm={editSubmit}
              successMessage="Intervensi berhasil diedit"
              cancelMessage="Intervensi batal diedit"
              buttonText="edit"
          />
        </div>
      </Form>
    </Sidebar>
  );
};

export default EditIntervensi;
