import React, { useEffect, useState } from "react";
import Sidebar from "../../../../components/menu/Sidebar";
import { Breadcrumb, Form, Col, Row, Button, Modal} from "react-bootstrap";
import { useNavigate, useParams, Link } from 'react-router-dom'
import AuthorizationRoute from '../../../../AuthorizationRoute'
import axios from '../../../../axios'

const EditLuaran = () => {

  const [kode_luaran, setKodeLuaran] = useState("");
  const [nama_luaran, setNamaLuaran] = useState("");
  const [nama_kriteria_luaran, setNamaKriteriaLuaran] = useState("");
  const {id} = useParams();
  const navigate = useNavigate();
  const token=localStorage.getItem("token");
  const [submitted, setSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(false);



  useEffect(()=>{
    getDataById();
  }, [])

  const getDataById = async () => {
    try {
        const res = await axios.post(`/admin/luaran/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        setKodeLuaran(res.data.data.kode_luaran)
        setNamaLuaran(res.data.data.nama_luaran)
        setNamaKriteriaLuaran(res.data.data.nama_kriteria_luaran.join("\n"));
    } catch (error) {
        
    }
  }


  const editSubmit = async (e) => {
    e.preventDefault();

    const handleNamaKriteriaLuaran = nama_kriteria_luaran.split("\n");
    
    try {
      const res = await axios.put(
         `/admin/luaran/${id}`,
         {
          kode_luaran: kode_luaran,
          nama_luaran: nama_luaran,
          nama_kriteria_luaran: handleNamaKriteriaLuaran,
         },
         {
           headers: { Authorization: `Bearer ${token}` },
         }
       );
       console.log(res);
      navigate("/admin/standarkeperawatan/luaran");
    } catch (error) {
      console.log(error);
      //  AuthorizationRoute(error.response.status)
    }
  };



  const deleteLuaran = async () => {
    try {
        await axios.post(`/admin/luaran/${id}`, {
            headers: { Authorization: `Bearer ${token}`}
        })
        navigate('/admin/standarkeperawatan/luaran')
    } catch (error) {
        AuthorizationRoute(error.response.status)
    }
  };

  
  
  return (
    <Sidebar>
      <div className="container">
        <h2>
          <span>Edit Luaran</span> - <span id="kode_luaran">{kode_luaran}</span>
        </h2>
        <Breadcrumb>
          <Breadcrumb.Item href="/admin/standarkeperawatan/Luaran">Luaran</Breadcrumb.Item>
          <Breadcrumb.Item active>
            Edit
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <Form className="container mt-5" onSubmit={editSubmit}>
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
        
        <div className='d-flex justify-content-end mt-3'>

            <Link
              to={`/admin/standarkeperawatan/luaran/${id}`}
              variant='primary'
              type="button"
              className='btn justify-content-center align-items-center red-button cancel'>
                Cancel
            </Link>
            <Button
                id="custom-margin"
                variant='primary' 
                type="submit" 
                className='btn justify-content-center align-items-center blue-button'>
                  Submit
            </Button>
            
          </div>
      </Form>
    </Sidebar>
  );
};

export default EditLuaran;
