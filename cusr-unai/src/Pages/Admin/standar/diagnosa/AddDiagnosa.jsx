import React, { useState} from "react";
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
  const [faktor_risiko_list, setFakktorRisikoList] = useState([]);

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/admin/diagnosa/tambah", {
        kode_diagnosa: kode_diagnosa,
        nama_diagnosa: nama_diagnosa,
        faktor_risiko: faktor_risiko,
        penyebab_fisiologis: penyebab_fisiologis,
        penyebab_situasional: penyebab_situasional,
        penyebab_psikologis: penyebab_psikologis,
        gejala_mayor_subjektif: gejala_mayor_subjektif,
        gejala_mayor_objektif: gejala_mayor_objektif,
        gejala_minor_subjektif: gejala_minor_subjektif,
        gejala_minor_objektif: gejala_minor_objektif,
      },
      { 
        headers: { Authorization: `Bearer ${token}`}
      });
      if (res.status === 200) {
        setSubmitted(true)
      }
    } catch (error) {
      
    }
  };

  const handleEnter = (e, setter, list) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const value = e.target.value.trim();
      if (value) {
        setter((prev) => [...prev, value]);
        setFakktorRisikoList((prev) => [...prev, value]);
        e.target.value = "";
      }
    }
  };
  
  return (
    <Sidebar>
      <div className="container">
        <h2>Tambah Diagnosa</h2>
        <Breadcrumb>
          <Breadcrumb.Item href="/admin/Diagnosa">Diagnosa</Breadcrumb.Item>
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
              onChange={(e) => setFaktorRisiko(e.target.value)}
              onKeyDown={(e) => handleEnter(e, setFaktorRisiko,faktor_risiko)}
              />
              {faktor_risiko.length > 0 && (
                <ul>
                  {faktor_risiko.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              )}
          </Form.Group>
          {/* Empty Column*/}

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
              onChange={(e) => setPenyebabFisiologis(e.target.value)}
              onKeyDown={(e) => handleEnter(e, setPenyebabFisiologis)}
            />
            {penyebab_fisiologis.length > 0 && (
                <ul>
                  {penyebab_fisiologis.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              )}
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Penyebab Situasional</Form.Label>
            <Form.Control
              id="form-control-input"
              as="textarea"
              type="text"
              placeholder="Masukkan Penyebab Situasional"
              style={{ height: "7rem" }}
              onChange={(e) => setPenyebabSituasional(e.target.value)}
              onKeyDown={(e) => handleEnter(e, setPenyebabSituasional)}
            />
            {penyebab_situasional.length > 0 && (
                <ul>
                  {penyebab_situasional.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              )}
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
                onChange={(e) => setPenyebabPsikologis(e.target.value)}
                onKeyDown={(e) => handleEnter(e, setPenyebabPsikologis)}
              />
              {penyebab_psikologis.length > 0 && (
                <ul>
                  {penyebab_psikologis.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              )}
          </Form.Group>
          {/* Empty Column */}

          <Form.Group as={Col}>
            {/* Empty Column */}
          </Form.Group>
        </Row>

        <Row id="custom-row" style={{ marginTop: "3rem" }}>
          <h4>Gejala Mayor</h4>
          <Form.Group as={Col}>
            <Form.Label>Subjektif</Form.Label>
            <Form.Control
              id="form-control-input"
              as="textarea"
              type="text"
              placeholder="Masukkan Gejala Mayor Subjektif"
              style={{ height: "7rem" }}
              onChange={(e) => setGejalaMayorSubjektif(e.target.value)}
              onKeyDown={(e) => handleEnter(e, setGejalaMayorSubjektif)}
            />
            {gejala_mayor_subjektif.length > 0 && (
                <ul>
                  {gejala_mayor_subjektif.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              )}
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Objektif</Form.Label>
            <Form.Control
              id="form-control-input"
              as="textarea"
              type="text"
              placeholder="Masukkan Gejala Mayor Objektif"
              style={{ height: "7rem" }}
              onChange={(e) => setGejalaMayorObjektif(e.target.value)}
              onKeyDown={(e) => handleEnter(e, setGejalaMayorObjektif)}
            />
            {gejala_mayor_objektif.length > 0 && (
                <ul>
                  {gejala_mayor_objektif.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              )}
          </Form.Group>
        </Row>
        <Row id="custom-row" style={{ marginTop: "3rem" }}>
          <h4>Gejala Minor</h4>
          <Form.Group as={Col}>
            <Form.Label>Subjektif</Form.Label>
            <Form.Control
              id="form-control-input"
              as="textarea"
              type="text"
              placeholder="Masukkan Gejala Mayor Subjektif"
              style={{ height: "7rem" }}
              onChange={(e) => setGejalaMinorSubjektif(e.target.value)}
              onKeyDown={(e) => handleEnter(e, setGejalaMinorSubjektif)}
            />
            {gejala_minor_subjektif.length > 0 && (
                <ul>
                  {gejala_minor_subjektif.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              )}
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Objektif</Form.Label>
            <Form.Control
              id="form-control-input"
              as="textarea"
              type="text"
              placeholder="Masukkan Gejala Minor Objektif"
              style={{ height: "7rem" }}
              onChange={(e) => setGejalaMinorObjektif(e.target.value)}
              onKeyDown={(e) => handleEnter(e, setGejalaMinorObjektif)}
            />
            {gejala_minor_objektif.length > 0 && (
                <ul>
                  {gejala_minor_objektif.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              )}
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
