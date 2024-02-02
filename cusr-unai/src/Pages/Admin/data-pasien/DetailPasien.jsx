import React, { useEffect, useState } from 'react'
import Sidebar from '../../../components/menu/Sidebar'
import { Breadcrumb, Form, Row, Col, Button, Modal, } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import ConfirmModal from '../../../components/menu/ConfirmModal'
import AuthorizationRoute from '../../../AuthorizationRoute'
import axios from '../../../axios'


const DetailPasien = () => {
    const [nama_lengkap, setNamaLengkap] = useState("");
    const [tanggal_lahir, setTanggalLahir] = useState("");
    const [jenis_kelamin, setJenisKelamin] = useState("");
    const [no_telepon, setNoTelepon] = useState("");
    const [alamat, setAlamat] = useState("");
    const [status_pernikahan, setStatusPernikahan] = useState("");
    const [nik, setNik] = useState("");
    const [alergi, setAlergi] = useState("");
    const [nama_asuransi, setNamaAsuransi] = useState("");
    const [no_asuransi, setNomorAsuransi] = useState("");
    const [no_medical_record, setMedicalRecord] = useState("");
    const [bed, setBed] = useState("");
    const {id} = useParams();
    const navigate = useNavigate();
    const token=localStorage.getItem("token");
    const [isEditing, setIsEditing] = useState(false);
    const [showModal, setShowModal] = useState(false);

    // modal rawatInap
    const [showModalRawatInap, setShowModalRawatInap] = useState(false);
    const [dataRawatInap, setDataRawatInap] = useState('');
    const [triase, setTriase] = useState('');

    useEffect(() => {
        getDataById();
        detailStatus();
    },[]);
    
    const getDataById = async () => {
       
     try {
        const res = await axios.post(`/admin/daftarpasien/detail/${id}`,{
          headers: { Authorization: `Bearer ${token}`}
        })
        setNamaLengkap(res.data.data.nama_lengkap)
        setTanggalLahir(res.data.data.tanggal_lahir)
        setJenisKelamin(res.data.data.jenis_kelamin)
        setNoTelepon(res.data.data.no_telepon)
        setAlamat(res.data.data.alamat)
        setStatusPernikahan(res.data.data.status_pernikahan)
        setNik(res.data.data.nik)
        setAlergi(res.data.data.alergi)
        setNamaAsuransi(res.data.data.nama_asuransi)
        setNomorAsuransi(res.data.data.no_asuransi)
        setMedicalRecord(res.data.data.no_medical_record)
        setBed(res.data.data.bed)
      } catch (error) {
        
      }
    };
    
  
    const submitForm = async () => {
     
      try {
        const res = await axios.post(`/admin/daftarpasien/edit/${id}`, {
          nama_lengkap: nama_lengkap,
          tanggal_lahir: tanggal_lahir,
          jenis_kelamin: jenis_kelamin,
          no_telepon: no_telepon,
          alamat: alamat,
          status_pernikahan: status_pernikahan,
          nik: nik,
          alergi: alergi,
          nama_asuransi: nama_asuransi,
          no_asuransi: no_asuransi,
          no_medical_record: no_medical_record,
          bed: bed,
        },
        { 
          headers: { Authorization: `Bearer ${token}`}
        });
        navigate("/admin/daftarpasien");
      } catch (error){
         AuthorizationRoute(error.response.status)
      }
      
    };

    const deletePasien = async () => {
      try {
        await axios.post(`/admin/daftarpasien/delete/${id}`, {
          headers: { Authorization: `Bearer ${token}`}
        });
        navigate('/admin/daftarpasien');
      } catch (error) {
        
      }
    }
  
    const detailStatus = async () => {
      try{
        const res = await axios.post(`/pasien/rawat-inap/detailStatus/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDataRawatInap(res.data.message)
      }catch(error){
        AuthorizationRoute(error.response.status)
      }
    }

    const addRawatInap = async () =>{
      try {
        const res = await axios.post(`/pasien/rawat-inap/${id}`, {
          triase: triase,
          status: 1
        },
        { 
          headers: { Authorization: `Bearer ${token}`}
        });
        // navigate("/admin/rawatinap");
      } catch (error){
         AuthorizationRoute(error.response.status)
      }
    }
    
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

        <Modal
          show={showModalRawatInap}
          onHide={() => setShowModalRawatInap(!showModalRawatInap)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Rawat Inap?</Modal.Title>
          </Modal.Header>
          <Form onSubmit={addRawatInap}>
            <Modal.Body>
              <Form.Group className="mb-3">
                <Form.Select name="triase" id="" value={triase} onChange={(e)=>setTriase(e.target.value)}>
                  <option value="">masukkan Triase</option>
                  <option value="merah">Merah</option>
                  <option value="kuning">Kuning</option>
                  <option value="hijau">Hijau</option>
                  <option value="hitam">Hitam</option>
                </Form.Select>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowModalRawatInap(!showModalRawatInap)}
              >
                Close
              </Button>
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>

        <Form className="container mt-5" onSubmit={submitForm}>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Nama Lengkap</Form.Label>
                <Form.Control
                  id="form-control-input"
                  type="text"
                  placeholder="Masukkan Nama Lengkap"
                  value={nama_lengkap}
                  onChange={(e) => setNamaLengkap(e.target.value)}
                  required
                  disabled={!isEditing}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Tanggal Lahir</Form.Label>
                <Form.Control
                  id="form-control-input"
                  type="date"
                  placeholder="Masukkan Nama Lengkap"
                  value={tanggal_lahir}
                  onChange={(e) => setTanggalLahir(e.target.value)}
                  required
                  disabled={!isEditing}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Jenis Kelamin</Form.Label>
                <Form.Select
                  id="form-control-input"
                  type="text"
                  placeholder="Tentukan Jenis Kelamin"
                  value={jenis_kelamin}
                  onChange={(e) => setJenisKelamin(e.target.value)}
                  required
                  disabled={!isEditing}
                >
                  <option>Pilih</option>
                  <option value="1">Laki Laki</option>
                  <option value="0">Perempuan</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Nomor Telepon</Form.Label>
                <Form.Control
                  id="form-control-input"
                  type="text"
                  placeholder="Masukkan Nomor Telepon"
                  value={no_telepon}
                  onChange={(e) => setNoTelepon(e.target.value)}
                  required
                  disabled={!isEditing}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Alamat</Form.Label>
                <Form.Control
                  id="form-control-input"
                  as="textarea"
                  style={{ height: "7rem" }}
                  type="text"
                  placeholder="Masukkan Alamat"
                  value={alamat}
                  onChange={(e) => setAlamat(e.target.value)}
                  required
                  disabled={!isEditing}
                />
              </Form.Group>
            </Col>

            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Status Pernikahan</Form.Label>
                <Form.Select
                  id="form-control-input"
                  type="text"
                  placeholder="Tentukan Jenis Kelamin"
                  value={status_pernikahan}
                  onChange={(e) => setStatusPernikahan(e.target.value)}
                  required
                  disabled={!isEditing}
                >
                  <option>Pilih</option>
                  <option value="0">Belum Menikah</option>
                  <option value="1">Sudah Menikah</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>NIK</Form.Label>
                <Form.Control
                  id="form-control-input"
                  type="text"
                  placeholder="Masukkan NIK"
                  value={nik}
                  onChange={(e) => setNik(e.target.value)}
                  required
                  disabled={!isEditing}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Alergi</Form.Label>
                <Form.Control
                  id="form-control-input"
                  type="text"
                  placeholder="Masukkan Alergi"
                  value={alergi}
                  onChange={(e) => setAlergi(e.target.value)}
                  disabled={!isEditing}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Nama Asuransi</Form.Label>
                <Form.Control
                  id="form-control-input"
                  type="text"
                  placeholder="Masukkan Asuransi"
                  value={nama_asuransi}
                  onChange={(e) => setNamaAsuransi(e.target.value)}
                  disabled={!isEditing}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Nomor Asuransi</Form.Label>
                <Form.Control
                  id="form-control-input"
                  type="text"
                  placeholder="Masukkan Nomor Asuransi"
                  value={no_asuransi}
                  onChange={(e) => setNomorAsuransi(e.target.value)}
                  disabled={!isEditing}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>No Medical Record</Form.Label>
                <Form.Control
                  id="form-control-input"
                  type="text"
                  placeholder="Masukkan No Medical Record"
                  value={no_medical_record}
                  onChange={(e) => setMedicalRecord(e.target.value)}
                  required
                  disabled={!isEditing}
                />
              </Form.Group>

              <Form.Group className="mb-3">
              <Form.Label>Bed</Form.Label>
              <Form.Control 
                id="form-control-input"
                type="text" 
                placeholder="Masukkan No Bed"
                value={bed}
                onChange={(e) => setBed(e.target.value)}
                required
                disabled={!isEditing}
                />
            </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>
                  {" "}
                  Status Rawat Inap:{" "}
                  {dataRawatInap === "merah" ? (
                    <span className="bg-danger text-white p-1 rounded">
                      Triase Merah
                    </span>
                  ) : dataRawatInap === "kuning" ? (
                    <span className="bg-warning text-white p-1 rounded">
                      Triase kuning
                    </span>
                  ) : dataRawatInap === "hijau" ? (
                    <span className="bg-success text-white p-1 rounded">
                      Triase hijau
                    </span>
                  ) : dataRawatInap === "hitam" ? (
                    <span className="bg-dark text-white p-1 rounded">
                      Triase Hitam
                    </span>
                  ) : (
                    "Tidak Di Rawat Inap"
                  )}
                </Form.Label>
              </Form.Group>
            </Col>
          </Row>

          <div className="d-flex justify-content-end mt-3">
            {!isEditing ? (
              <Button
                onClick={() => setIsEditing(true)}
                id="custom-margin"
                className="btn white-button"
              >
                Edit
              </Button>
            ) : (
              <ConfirmModal
                onConfirm={submitForm}
                successMessage={"Data Pasien berhasil diubah"}
                cancelMessage={"Data Pasien gagal diubah"}
                buttonText={"Simpan"}
              />
            )}

            <Button
              onClick={() => setShowModal(true)}
              variant="danger"
              type="button"
              className="mx-3"
            >
              Delete
            </Button>

            <Button onClick={() => setShowModalRawatInap(!showModalRawatInap)}>
              Rawat Inap
            </Button>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Konfirmasi</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Apakah Anda yakin ingin menghapus data ini?
              </Modal.Body>
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
                  onClick={deletePasien}
                  className="btn justify-content-center align-items-center"
                >
                  Hapus
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </Form>
      </Sidebar>
    );
  }
  
  export default DetailPasien