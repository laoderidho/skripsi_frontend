import React, { useState } from 'react'
import Sidebar from '../../../components/menu/Sidebar'
import { Breadcrumb, Form, Row, Col, Button, InputGroup } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import AuthorizationRoute from '../../../AuthorizationRoute'
import axios from '../../../axios'

const AddPerawat = () => {

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
  const navigate = useNavigate();
  const token=localStorage.getItem("token");
  const [showPassword, setShowPassword] = useState(false);
  
  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0])
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`admin/users/tambah`, {
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
        console.log(photo);
    }
    
  };


  return (
    <Sidebar>
      <div className="container">
        <h2>Tambah Perawat</h2>
        <Breadcrumb>
          <Breadcrumb.Item href="/admin/daftarperawat">
            Daftar Perawat
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Tambah</Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <Form className="container mt-5" onSubmit={submitForm} encType="multipart/form-data">
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
          <Button 
            variant='primary' 
            type="submit" 
            className='btn justify-content-center align-items-center blue-button'>Simpan</Button>
        </div>
      </Form>
    </Sidebar>
  );
}

export default AddPerawat