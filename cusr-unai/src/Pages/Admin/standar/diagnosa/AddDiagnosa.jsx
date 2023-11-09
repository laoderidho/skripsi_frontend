import React, { useState } from "react";
import Sidebar from "../../../../components/menu/Sidebar";
import { Breadcrumb, Form, Col, Row, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom'
import AuthorizationRoute from '../../../../AuthorizationRoute'
import axios from '../../../../axios'

const AddDiagnosa = () => {

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
  const navigate = useNavigate();
  const token=localStorage.getItem("token");
  const [submitted, setSubmitted] = useState(false);
  

  const submitForm = async (e) => {
    e.preventDefault();

    const handleFaktorRisiko = faktor_risiko.split("\n");
    const handlePenyebabFisiologis = penyebab_fisiologis.split("\n");
    const handlePenyebabSituasional = penyebab_situasional.split("\n");
    const handlePenyebabPsikologis = penyebab_psikologis.split("\n");
    const handleGejalaMayorSubjektif = gejala_mayor_subjektif.split("\n");
    const handleGejalaMayorObjektif = gejala_mayor_objektif.split("\n");
    const handleGejalaMinorSubjektif = gejala_minor_subjektif.split("\n");
    const handleGejalaMinorObjektif = gejala_minor_objektif.split("\n");

    try {
      const res = await axios.post(`/admin/diagnosa/add`, {
        kode_diagnosa: kode_diagnosa,
        nama_diagnosa: nama_diagnosa,
        faktor_risiko: handleFaktorRisiko,
        penyebab_fisiologis: handlePenyebabFisiologis,
        penyebab_situasional: handlePenyebabSituasional,
        penyebab_psikologis: handlePenyebabPsikologis,
        gejala_mayor_subjektif: handleGejalaMayorSubjektif,
        gejala_mayor_objektif: handleGejalaMayorObjektif,
        gejala_minor_subjektif: handleGejalaMinorSubjektif,
        gejala_minor_objektif: handleGejalaMinorObjektif,
      },
      { 
        headers: { Authorization: `Bearer ${token}`}
      });
      console.log(res);
      navigate("/admin/standarkeperawatan/diagnosis");
    } catch (error) {
      AuthorizationRoute(error.response.status)
    }
  };
  
  return (
    <Sidebar>
      <div className="container">
        <h2>Tambah Diagnosa</h2>
        <Breadcrumb>
          <Breadcrumb.Item href="/admin/standarkeperawatan/diagnosis">Diagnosa</Breadcrumb.Item>
          <Breadcrumb.Item active>
            Tambah
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <Form className="container mt-5" onSubmit={submitForm}>
        <Row>
          <Form.Group as={Col}>
            <Form.Label>Kode Diagnosis</Form.Label>
            <Form.Control 
              id="form-control-input"
              type="text" 
              placeholder="Masukkan Kode Diagnosis" 
              onChange={(e) => setKodeDiagnosa(e.target.value)}
              required
              value={kode_diagnosa}
              style={{
                color: submitted ? '#ff0000' : '',
                fontWeight: submitted ? 'bold' : ''
              }}
              />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Nama Diagnosis</Form.Label>
            <Form.Control 
              id="form-control-input"
              type="text" 
              placeholder="Masukkan Nama Diagnosis"  
              onChange={(e) => setNamaDiagnosa(e.target.value)}
              value={nama_diagnosa}
              required/>
          </Form.Group>
        </Row>

        <Row id="custom-row">
          <Form.Group as={Col}>
            <Form.Label>Faktor Risiko</Form.Label>
            <Form.Control 
              id="form-control-input"
              as="textarea"
              type="text" 
              placeholder="Masukkan Faktor Risiko"
              style={{ height: "7rem" }} 
              value={faktor_risiko}
              onChange={(e) => setFaktorRisiko(e.target.value)}
              />
          </Form.Group>

          <Form.Group as={Col}>
            {/* Empty Column */}
          </Form.Group>
        </Row>

        <Row id="custom-row" style={{ marginTop: "3rem" }}>
        <h4>Penyebab</h4>
          <Form.Group as={Col}>
            <Form.Label>Penyebab Fisiologis</Form.Label>
            <Form.Control
              id="form-control-input"
              as="textarea"
              type="text"
              placeholder="Masukkan Penyebab Fisiologis"
              style={{ height: "7rem" }}
              value={penyebab_fisiologis}
              onChange={(e) => setPenyebabFisiologis(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Penyebab Situasional</Form.Label>
            <Form.Control
              id="form-control-input"
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
            <Form.Label>Penyebab Psikologis</Form.Label>
              <Form.Control
                id="form-control-input"
                as="textarea"
                type="text"
                placeholder="Masukkan Penyebab Psikologis"
                style={{ height: "7rem" }}
                value={penyebab_psikologis}
                onChange={(e) => setPenyebabPsikologis(e.target.value)}
              />
          </Form.Group>

          <Form.Group as={Col}>
            {/* Empty Column */}
          </Form.Group>
        </Row>

        <Row id="custom-row" style={{ marginTop: "3rem" }}>
          <h4>Gejala dan Tanda Mayor</h4>
          <Form.Group as={Col}>
            <Form.Label>Subjektif</Form.Label>
            <Form.Control
              id="form-control-input"
              as="textarea"
              type="text"
              placeholder="Masukkan Gejala Mayor Subjektif"
              style={{ height: "7rem" }}
              value={gejala_mayor_subjektif}
              onChange={(e) => setGejalaMayorSubjektif(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Objektif</Form.Label>
            <Form.Control
              id="form-control-input"
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
          <h4>Gejala dan Tanda Minor</h4>
          <Form.Group as={Col}>
            <Form.Label>Subjektif</Form.Label>
            <Form.Control
              id="form-control-input"
              as="textarea"
              type="text"
              placeholder="Masukkan Gejala Mayor Subjektif"
              style={{ height: "7rem" }}
              value={gejala_minor_subjektif}
              onChange={(e) => setGejalaMinorSubjektif(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Objektif</Form.Label>
            <Form.Control
              id="form-control-input"
              as="textarea"
              type="text"
              placeholder="Masukkan Gejala Minor Objektif"
              style={{ height: "7rem" }}
              value={gejala_minor_objektif}
              onChange={(e) => setGejalaMinorObjektif(e.target.value)}
            />
          </Form.Group>
        </Row>

      <div className="d-flex justify-content-end">
        <Button variant="primary" type="submit" className="btn justify-content-center align-items-center blue-button">Submit</Button>
      </div>
      </Form>
    </Sidebar>
  );
};

export default AddDiagnosa;
