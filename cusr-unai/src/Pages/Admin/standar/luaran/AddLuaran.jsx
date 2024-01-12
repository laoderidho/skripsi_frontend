import React, { useState } from "react";
import Sidebar from "../../../../components/menu/Sidebar";
import { Breadcrumb, Form, Col, Row, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom'
import AuthorizationRoute from '../../../../AuthorizationRoute'
import ConfirmModal from '../../../../components/menu/ConfirmModal'
import axios from '../../../../axios'

const AddLuaran = () => {

  const [kode_luaran, setKodeLuaran] = useState("");
  const [nama_luaran, setNamaLuaran] = useState("");
  const [nama_kriteria_luaran, setNamaKriteriaLuaran] = useState("");
  const navigate = useNavigate();
  const token=localStorage.getItem("token");
  const [submitted, setSubmitted] = useState(false);

  // const [array, setArray] = useState("");
  // const [inputValue, setInputValue] = useState("");


  const submitForm = async () => {

    const handleKriteriaLuaran = nama_kriteria_luaran ? nama_kriteria_luaran.split("\n"): null;

    try {
      const res = await axios.post("/admin/luaran/add", {
        kode_luaran: kode_luaran,
        nama_luaran: nama_luaran,
        nama_kriteria_luaran: handleKriteriaLuaran,
      },
      { 
        headers: { Authorization: `Bearer ${token}`}
      });
        console.log(res);
        navigate("/admin/standarkeperawatan/luaran");
    } catch (error) {
      // AuthorizationRoute(error.response.status)
    }
  };
  
  
  return (
    <Sidebar>
      <div className="container">
        <h2>Tambah Luaran</h2>
        <Breadcrumb>
          <Breadcrumb.Item href="/admin/standarkeperawatan/luaran">Luaran</Breadcrumb.Item>
          <Breadcrumb.Item active>
            Tambah
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <Form className="container mt-5" onSubmit={submitForm}>
        <Row>
          <Form.Group as={Col}>
            <Form.Label>Kode Luaran</Form.Label>
            <Form.Control 
              id="form-control-input"
              type="text" 
              placeholder="Masukkan Kode Luaran" 
              value={kode_luaran}
              onChange={(e) => setKodeLuaran(e.target.value)}
              required
              style={{
                color: submitted ? '#ff0000' : '',
                fontWeight: submitted ? 'bold' : ''
              }}
              />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Nama Luaran</Form.Label>
            <Form.Control 
              id="form-control-input"
              type="text" 
              placeholder="Masukkan Nama Luaran"  
              value={nama_luaran}
              onChange={(e) => setNamaLuaran(e.target.value)}
              required/>
          </Form.Group>
        </Row>

        <Row id="custom-row" style={{ marginTop: "3rem" }}>
        <h4>Kriteria</h4>
          <Form.Group as={Col}>
            <Form.Label>Kriteria</Form.Label>
            <Form.Control
              id="form-control-input"
              as="textarea"
              type="text"
              placeholder="Masukkan Kriteria"
              style={{ height: "7rem" }}
              value={nama_kriteria_luaran}
              onChange={(e) => setNamaKriteriaLuaran(e.target.value)}
             
            />
            
          </Form.Group>

          <Form.Group as={Col}>
            {/* Empty */}
            
          </Form.Group>
        </Row>
        
      <div className="d-flex justify-content-end">
        <ConfirmModal
            onConfirm = {submitForm}
            successMessage={"Luaran berhasil ditambahkan"}
            cancelMessage={"Luaran gagal ditambahkan"}
            buttonText={"Tambah"}
        />
      </div>
      </Form>
    </Sidebar>
  );
};

export default AddLuaran;
