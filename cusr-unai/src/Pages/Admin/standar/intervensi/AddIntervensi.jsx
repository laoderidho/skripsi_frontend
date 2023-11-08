import React, { useState } from "react";
import Sidebar from "../../../../components/menu/Sidebar";
import { Breadcrumb, Form, Col, Row, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AuthorizationRoute from "../../../../AuthorizationRoute";
import axios from "../../../../axios";

const AddIntervensi = () => {
  const [kode_intervensi, setKodeIntervensi] = useState("");
  const [nama_intervensi, setNamaIntervensi] = useState("");
  const [observasi, setObservasi] = useState("");
  const [terapeutik, setTerapeutik] = useState("");
  const [edukasi, setEdukasi] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [submitted, setSubmitted] = useState(false);

  // const [array, setArray] = useState("");
  // const [inputValue, setInputValue] = useState("");

 
  const submitForm = async (e) => {
    e.preventDefault();

    const handleObservasi = observasi.split("\n");
    const handleTerapeutik = terapeutik.split("\n");
    const handleEdukasi = edukasi.split("\n");

    console.log(handleObservasi);

    try {
      const res = await axios.post(
         "/admin/intervensi/tambah",
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
      navigate("/admin/standarkeperawatan/intervensi");
    } catch (error) {
      console.log(error);
       AuthorizationRoute(error.response.status)
    }
  };

  return (
    <Sidebar>
      <div className="container">
        <h2>Tambah Intervensi</h2>
        <Breadcrumb>
          <Breadcrumb.Item href="/admin/standarkeperawatan/intervensi">
            Intervensi
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Tambah</Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <Form className="container mt-5" onSubmit={submitForm}>
        <Row>
          <Form.Group as={Col}>
            <Form.Label>Kode Intervensi</Form.Label>
            <Form.Control
              id="form-control-input"
              type="text"
              placeholder="Masukkan Kode Intervensi"
              value={kode_intervensi}
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
              placeholder="Masukkan Nama Intervensi"
              onChange={(e) => setNamaIntervensi(e.target.value)}
              value={nama_intervensi}
              required
            />
          </Form.Group>
        </Row>

        <Row className="mt-5">
        <h4 className="mb-3">Tindakan</h4>

          <Form.Group as={Col}>
            <Form.Label>Observasi</Form.Label>
            <Form.Control
              id="form-control-input"
              as="textarea"
              rows={5}
              style={{
                height: "7rem",
              }}
              value={observasi}
              onChange={(e) => setObservasi(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Terapeutik</Form.Label>
            <Form.Control 
              id="form-control-input"
              as="textarea"
              rows={5}
              style={{
                height: "7rem",
              }}
              value={terapeutik}
              onChange={(e) => setTerapeutik(e.target.value)}
            />
          </Form.Group>
          </Row>
          <Form.Group as={Col} className="mt-3">
            <Form.Label>Edukasi</Form.Label>
            <Form.Control
              id="form-control-input"
              as="textarea"
              rows={5}
              style={{
                height: "7rem",
              }}
              value={edukasi}
              onChange={(e) => setEdukasi(e.target.value)}
              />
          </Form.Group>

        <div className="d-flex justify-content-end">
          <Button
            variant="primary"
            type="submit"
            className="btn justify-content-center align-items-center blue-button"
          >
            Submit
          </Button>
        </div>
      </Form>
    </Sidebar>
  );
};

export default AddIntervensi;
