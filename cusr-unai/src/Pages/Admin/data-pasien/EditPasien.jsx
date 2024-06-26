import React, { useEffect, useState } from 'react'
import Sidebar from '../../../components/menu/Sidebar'
import { Breadcrumb, Form, Row, Col, Button } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'
import AuthorizationRoute from '../../../AuthorizationRoute'
import axios from '../../../axios'
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import "primereact/resources/themes/saga-blue/theme.css";


const EditPasien = () => {

    const [nama_lengkap, setNamaLengkap] = useState("");
    const [tanggal_lahir, setTanggalLahir] = useState("");
    const [jenis_kelamin, setJenisKelamin] = useState("");
    const [no_telepon, setNoTelepon] = useState("");
    const [alamat, setAlamat] = useState("");
    const [status_pernikahan, setStatusPernikahan] = useState("");
    const [nik, setNik] = useState("");
    const [alergi, setAlergi] = useState("");
    const [nama_asuransi, setNamaAsuransi] = useState("");
    const [nomor_asuransi, setNomorAsuransi] = useState("");
    const [no_medical_record, setMedicalRecord] = useState("");
    const {id} = useParams();
    const navigate = useNavigate();
    const token=localStorage.getItem("token");

    // useEffect(() => {
    //   getDataById();
    // },[]);
    console.log(test)
    const editForm = async (e) => {
      e.preventDefault();
      try {
        const res = await axios.post("/admin/daftarpasien/tambah", {
          nama_lengkap: nama_lengkap,
          tanggal_lahir: tanggal_lahir,
          jenis_kelamin: jenis_kelamin,
          no_telepon: no_telepon,
          alamat: alamat,
          status_pernikahan: status_pernikahan,
          nik: nik,
          alergi: alergi,
          nama_asuransi: nama_asuransi,
          nomor_asuransi: nomor_asuransi,
          no_medical_record: no_medical_record,
        },
        { 
          headers: { Authorization: `Bearer ${token}`}
        });
        navigate("/admin/daftarpasien");
      } catch (error){
        // AuthorizationRoute(error.response.status)
      }
      
    };
  
  
    return (
      <Sidebar>
        <div className="container">
          <h2>Tambah Pasien</h2>
          <Breadcrumb>
            <Breadcrumb.Item href="/admin/daftarpasien">
              Daftar Pasien
            </Breadcrumb.Item>
            <Breadcrumb.Item active>Tambah</Breadcrumb.Item>
          </Breadcrumb>
        </div>

        <Form className="container pt-2">
          <Row>
            <Col xs={4}>
              <Card className='profile'>
                <Form.Group>
                  <Form.Label id='form-label'>Nama Lengkap</Form.Label>
                  <Form.Control
                    id="form-control-input"
                    type="text"
                    placeholder="Masukkan Nama Lengkap"
                    value={nama_lengkap}
                    onChange={(e) => setNamaLengkap(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mt-2">
                  <Form.Label id='form-label'>Tanggal Lahir</Form.Label>
                  <Form.Control
                    id="form-control-input"
                    type="date"
                    placeholder="Masukkan Nama Lengkap"
                    value={tanggal_lahir}
                    onChange={(e) => setTanggalLahir(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mt-2">
                  <Form.Label id='form-label'>Jenis Kelamin</Form.Label>
                  <Form.Select
                    id="form-control-input"
                    type="text"
                    placeholder="Tentukan Jenis Kelamin"
                    value={jenis_kelamin}
                    onChange={(e) => setJenisKelamin(e.target.value)}
                    required
                  >
                    <option>Pilih</option>
                    <option value="1">Laki Laki</option>
                    <option value="0">Perempuan</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mt-2">
                  <Form.Label id='form-label'>NIK</Form.Label>
                  <Form.Control
                    id="form-control-input"
                    type="text"
                    placeholder="Masukkan NIK"
                    value={nik}
                    onChange={(e) => setNik(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mt-2">
                  <Form.Label id='form-label'>Status Pernikahan</Form.Label>
                  <Form.Select
                    id="form-control-input"
                    type="text"
                    placeholder="Tentukan Jenis Kelamin"
                    value={status_pernikahan}
                    onChange={(e) => setStatusPernikahan(e.target.value)}
                    required
                  >
                    <option>Pilih</option>
                    <option value="0">Belum Menikah</option>
                    <option value="1">Sudah Menikah</option>
                  </Form.Select>
                </Form.Group>
              </Card>
              <Card className='mt-3'>
                <Form.Group>
                  <Form.Label id='form-label'>Nomor Telepon</Form.Label>
                  <Form.Control
                    id="form-control-input"
                    type="text"
                    placeholder="Masukkan Nomor Telepon"
                    value={no_telepon}
                    onChange={(e) => setNoTelepon(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mt-2">
                  <Form.Label id='form-label'>Alamat</Form.Label>
                  <Form.Control
                    id="form-control-input"
                    as="textarea"
                    style={{ height: "7rem" }}
                    type="text"
                    placeholder="Masukkan Alamat"
                    value={alamat}
                    onChange={(e) => setAlamat(e.target.value)}
                    required
                  />
                </Form.Group>
              </Card>
            </Col>

            <Col xs={4}>
              <Card>
                <Form.Group>
                  <Form.Label id='form-label'>No Medical Record</Form.Label>
                  <Form.Control
                    id="form-control-input"
                    type="text"
                    placeholder="Masukkan No Medical Record"
                    value={no_medical_record}
                    onChange={(e) => setMedicalRecord(e.target.value)}
                    required
                  />
                </Form.Group>
              </Card>
              <Card className='mt-3'>
                <Form.Group>
                  <Form.Label id='form-label'>Alergi</Form.Label>
                  <Form.Control
                    id="form-control-input"
                    type="text"
                    as='textarea'
                    placeholder="Masukkan Alergi"
                    value={alergi}
                    style={{ height: "7rem" }}
                    onChange={(e) => setAlergi(e.target.value)}
                  />
                </Form.Group>
              </Card>
              <Card className='mt-3'>
                <Form.Group>
                  <Form.Label id='form-label'>Nama Asuransi</Form.Label>
                  <Form.Control
                    id="form-control-input"
                    type="text"
                    placeholder="Masukkan Asuransi"
                    value={nama_asuransi}
                    onChange={(e) => setNamaAsuransi(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mt-2">
                  <Form.Label id='form-label'>Nomor Asuransi</Form.Label>
                  <Form.Control
                    id="form-control-input"
                    type="text"
                    placeholder="Masukkan Nomor Asuransi"
                    value={nomor_asuransi}
                    onChange={(e) => setNomorAsuransi(e.target.value)}
                  />
                </Form.Group>
              </Card>
            </Col>
            <Col xs={1}>
              <Divider layout='vertical'/>
            </Col>
          </Row>
        </Form>
      </Sidebar>
    );
  }
  
  export default EditPasien