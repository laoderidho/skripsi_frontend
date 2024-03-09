import React, { useEffect, useState } from 'react'
import Sidebar from '../../../components/menu/Sidebar'
import { Breadcrumb, Form, Row, Col, Button, InputGroup, Modal } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import AuthorizationRoute from '../../../AuthorizationRoute'
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import "primereact/resources/themes/saga-blue/theme.css";
import axios from '../../../axios'

const DetailPerawat = () => {

  const [nama_lengkap, setNamaLengkap] = useState("");
  const [tanggal_lahir, setTanggalLahir] = useState("");
  const [jenis_kelamin, setJenisKelamin] = useState("");
  const [no_telepon, setNoTelepon] = useState("");
  const [alamat, setAlamat] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [photo, setPhoto] = useState("");
  const [shift, setShift] = useState("");
  const {id} = useParams();
  const navigate = useNavigate();
  const token=localStorage.getItem("token");
  const [showPassword, setShowPassword] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getDataById();
  },[]);

  const getDataById = async () => {
    try {
        const res = await axios.post(`/admin/users/detail/${id}`, {
            headers: { Authorization: `Bearer ${token}`}
        })
        setNamaLengkap(res.data.data.nama_lengkap)
        setTanggalLahir(res.data.data.tanggal_lahir)
        setJenisKelamin(res.data.data.jenis_kelamin)
        setNoTelepon(res.data.data.no_telepon)
        setAlamat(res.data.data.alamat)
        setEmail(res.data.data.email)
        setPassword(res.data.data.password)
        setStatus(res.data.data.status)
        setPhoto(res.data.data.photo)
        setShift(res.data.data.shift)
    } catch (error) {
        
    }
  };

  
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
        setPhoto(file.name);
    } else {
        alert('Silahkan pilih file .jpg atau .png');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/admin/users/detail/${id}`, {
        nama_lengkap: nama_lengkap,
        tanggal_lahir: tanggal_lahir,
        jenis_kelamin: jenis_kelamin,
        no_telepon: no_telepon,
        alamat: alamat,
        email: email,
        password: password,
        status: status,
        role: "perawat",
        photo: photo,
        shift: shift,
      },
      { 
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data'}
      });
      navigate("/admin/daftarperawat");
    } catch (error){
      // AuthorizationRoute(error.response.status)
    }
    
  };

  const deletePerawat = async () => {
    try {
        await axios.post(`/admin/users/delete/${id}`, {
            headers: { Authorization: `Bearer ${token}`}
        });
    } catch (error) {
        
    }
  }


  return (
    <Sidebar>
      <div className="container">
        <h2>Tambah Perawat</h2>
        <Breadcrumb>
          <Breadcrumb.Item href="/admin/daftarpasien">
            Daftar Perawat
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Tambah</Breadcrumb.Item>
        </Breadcrumb>
      </div>

      {/* <div className='container pt-2'>
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
                    disabled={!isEditing}
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
                    disabled={!isEditing}
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
                    disabled={!isEditing}
                  >
                    <option>Pilih</option>
                    <option value="1">Laki Laki</option>
                    <option value="0">Perempuan</option>
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
                    disabled={!isEditing}
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
                    disabled={!isEditing}
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
                    disabled={!isEditing}
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
                    disabled={!isEditing}
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
                    disabled={!isEditing}
                  />
                </Form.Group>

                <Form.Group className="mt-2">
                  <Form.Label id='form-label'>Nomor Asuransi</Form.Label>
                  <Form.Control
                    id="form-control-input"
                    type="text"
                    placeholder="Masukkan Nomor Asuransi"
                    value={no_asuransi}
                    onChange={(e) => setNomorAsuransi(e.target.value)}
                    disabled={!isEditing}
                  />
                </Form.Group>
              </Card>
            </Col>
            <Col xs={1}>
              <Divider layout='vertical'/>
            </Col>
            <Col>
              <Form.Group>
                  <Form.Label>Status Rawat Inap:</Form.Label>
                  <div>
                    {dataRawatInap === "merah" ? (
                        <Button href="#" className="triase-merah text-white p-1 ">
                          Triase Merah
                        </Button>
                      ) : dataRawatInap === "kuning" ? (
                        <Button href="#" className="triase-kuning text-white p-1 ">
                          Triase Kuning
                        </Button>
                      ) : dataRawatInap === "hijau" ? (
                        <Button href="#" className="triase-hijau text-white p-1 rounded">
                          Triase Hijau
                        </Button>
                      ) : dataRawatInap === "hitam" ? (
                        <Button href="#" className="triase-hitam text-white p-1 rounded">
                          Triase Hitam
                        </Button>
                      ) : (
                        "Tidak di rawat inap"
                      )}
                  </div>
                </Form.Group>
                
                <div className='mt-3'>
                  <Link 
                    className='link-theme'
                    onClick={() => setShowModalRawatInap(!showModalRawatInap)}>
                  Klik untuk ubah status
                  </Link>
                </div>
            </Col>
          </Row>

          <Form className="container mt-5" onSubmit={submitForm}>
            <div className="d-flex justify-content-end mt-3">
              {!isEditing ? (
             
                <Button
                  onClick={() => setIsEditing(true)}
                  id="custom-margin"
                  className="btn edit-button"
                >
                  Edit
                </Button>
  
              ) : (

              <> 
                <Button
                  id="custom-margin"
                  className="btn edit-button"
                  onClick={() => setIsEditing(false)}  
                >
                  Cancel
                </Button>

                <ConfirmModal
                  onConfirm={submitForm}
                  successMessage={"Data Pasien berhasil diubah"}
                  cancelMessage={"Data Pasien gagal diubah"}
                  buttonText={"Simpan"}
                  to={`/admin/daftarpasien/${id}`}
                />

              </>  
              )}

              {!isEditing && (
                <Button
                onClick={() => setShowModal(true)}
                className='btn delete-button'
                type="button"
              >
                Delete
              </Button>
              )}


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
        </div> */}

      <Form className="container mt-5" onSubmit={submitForm} enctype="multipart/form-data">
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
                <option value="1">Laki-Laki</option>
                <option value="0">Perempuan</option>
              </Form.Select>
            </Form.Group>

            {/* <Form.Group className="mb-3">
              <Form.Label>Nomor Telepon</Form.Label>
              <Form.Control 
                id="form-control-input"
                type="text" 
                placeholder="Masukkan Nomor Telepon" 
                value={no_telepon}
                onChange={(e) => setNoTelepon(e.target.value)}
                required
                />
            </Form.Group> */}

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
              <Form.Label>Status</Form.Label>
              <Form.Select 
                id="form-control-input"
                type="text" 
                placeholder="Tentukan Status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
                disabled={!isEditing}
                >
                <option>Pilih</option>
                <option value="1">Aktif</option>
                <option value="0">Nonaktif</option>
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
            {/* <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select 
                id="form-control-input"
                type="text" 
                placeholder="Tentukan Role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
                >
                <option>Pilih</option>
                <option value="admin">Admin</option>
                <option value="perawat">User</option>
              </Form.Select>
            </Form.Group> */}

            <Form.Group className="mb-3">
              <Form.Label>Photo</Form.Label>
              <Form.Control 
                id="form-control-input"
                className='form-input-photo'
                type="file" 
                accept='.jpg, .png'
                placeholder="Pilih Photo"
                onChange={handlePhotoChange}
                disabled={!isEditing}
                />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Shift</Form.Label>
              <Form.Select 
                id="form-control-input"
                type="text" 
                placeholder="Tentukan Role"
                value={shift}
                onChange={(e) => setShift(e.target.value)}
                disabled={!isEditing}
                >
                <option>Pilih</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <div className='mt-4'>
            <h4>Akun User</h4>
            <Row>
                <Col>
                    <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                        id="form-control-input"
                        type="email" 
                        placeholder="Masukkan Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={!isEditing}
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control 
                                id="form-control-input"
                                type={showPassword ? 'text' : 'password'} 
                                placeholder="Masukkan Password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                disabled={!isEditing}
                                />
                                <Button variant='outline-secondary' id="visibility-button" className='btn mt-1' onClick={togglePasswordVisibility}>
                                    { showPassword ? 'Hide' : 'Show' }
                                </Button>
                        </InputGroup>
                    </Form.Group>
                </Col>
            </Row>
        </div>

        <div className='d-flex justify-content-end mt-3'>
            {!isEditing ? (
              <Button
                onClick={() => setIsEditing(true)}
                id="custom-margin"
                variant='primary'  
                className='btn justify-content-center align-items-center white-button'>
                  Edit
              </Button>
            ) : 
            (
              <input
                 type="submit"
                 id="custom-margin"
                 variant='primary' 
                 className='btn justify-content-center align-items-center blue-button'
                 />
             
            )
            }

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
                    onClick={deletePerawat}
                    className='btn justify-content-center align-items-center red-button'>
                      Hapus
                  </Button>
                </Modal.Footer>
            </Modal>
          </div>
        
      </Form>
    </Sidebar>
  );
}

export default DetailPerawat