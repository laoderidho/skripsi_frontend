import React, { useEffect, useState } from 'react'
import Sidebar from '../../../components/menu/SidebarAdmin'
import { Form, Row, Col, Button, InputGroup, Modal } from 'react-bootstrap'
import { useNavigate, useParams, Link } from 'react-router-dom'
import AuthorizationRoute from '../../../AuthorizationRoute'
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import "primereact/resources/themes/saga-blue/theme.css";
import axios from '../../../axios'
import { Skeleton } from 'primereact/skeleton';
import ConfirmModal from '../../../components/menu/ConfirmModal'
import { BreadCrumb } from 'primereact/breadcrumb';


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
  const [loading, setLoading] = useState(true);

  const isMobile = window.innerWidth <=600;

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
        setLoading(false);
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

  const submitForm = async () => {
    try {
      const res = await axios.post(`/admin/users/update/${id}`, {
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
        headers: { Authorization: `Bearer ${token}`}
      });
      navigate("/admin/user");
    } catch (error){
      // AuthorizationRoute(error.response.status)
    }
    
  };

  

  const deletePerawat = async () => {
    try {
        await axios.post(`/admin/users/delete/${id}`, {
            headers: { Authorization: `Bearer ${token}`}
        });
        navigate("/admin/user");
    } catch (error) {
        
    }
  }

  const items = [{label: 'Administrasi'}, {label: 'User'}, {label: ''}]


  return (
    <React.Fragment>
      {isMobile ? ( 
        <>
          <Sidebar>

            <div className="container d-flex align-items-center form-margin container-breadcrumb">
                              <span>
                              <Link to={`/admin/user`}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width='17' height='17' fill='#fff' viewBox="0 0 24 24" stroke-width="1.5" stroke="#085b93" class="w-6 h-6 mb-3">
                                  <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                  </svg>
                              </Link>
                              </span>
                              <BreadCrumb model={items} />

                              <span>
                                  <p className='title-breadcrumb'>{!isEditing ? 'Detail User' : 'Edit User'}</p>
                              </span>
            </div>

            <div className="container">
                <h3>{!isEditing ? 'Detail User' : 'Edit User'}</h3>
            </div>
            

            

            <Form className="container mt-5" onSubmit={submitForm} enctype="multipart/form-data">
              <Row>
                <Col xs={12}>
                  <Form.Group className="mb-3">
                    <Form.Label id="form-label">{loading ? <Skeleton width="70px"/> : 'Nama Lengkap'}</Form.Label>
                    <Form.Control
                      id="form-control-input custom-search"
                      type="text" 
                      placeholder="Masukkan Nama Lengkap" 
                      value={nama_lengkap}
                      onChange={(e) => setNamaLengkap(e.target.value)}
                      required
                      disabled={!isEditing}
                      />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label id="form-label">{loading ? <Skeleton width="70px"/> : 'Tanggal Lahir'}</Form.Label>
                    <Form.Control 
                      id="form-control-input custom-search"
                      type="date" 
                      placeholder="Masukkan Nama Lengkap" 
                      value={tanggal_lahir}
                      onChange={(e) => setTanggalLahir(e.target.value)}
                      required
                      disabled={!isEditing}
                      />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label id="form-label">{loading ? <Skeleton width="70px"/> : 'Jenis Kelamin'}</Form.Label>
                    <Form.Select 
                      id="form-control-input custom-search"
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

                  <Form.Group className="mb-3">
                    <Form.Label id="form-label">{loading ? <Skeleton width="100px"/> : 'Nomor Telepon'}</Form.Label>
                    <Form.Control 
                      id="form-control-input custom-search"
                      type="text" 
                      placeholder="Masukkan Nomor Telepon" 
                      value={no_telepon}
                      onChange={(e) => setNoTelepon(e.target.value)}
                      required
                      disabled={!isEditing}
                      />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label id="form-label">{loading ? <Skeleton width="50px"/> : 'Alamat'}</Form.Label>
                    <Form.Control
                      id="form-control-input custom-search"
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

                  <Form.Group className="mb-3">
                    <Form.Label id="form-label">{loading ? <Skeleton width="50px"/> : 'Status'}</Form.Label>
                    <Form.Select 
                      id="form-control-input custom-search"
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
                    <Form.Label id='form-label '>{loading ? <Skeleton width="100px"/> : 'Nomor Telepon'}</Form.Label>
                    <Form.Control 
                      id="form-control-input custom-search"
                      type="text" 
                      placeholder="Masukkan Nomor Telepon" 
                      value={no_telepon}
                      onChange={(e) => setNoTelepon(e.target.value)}
                      required
                      disabled={!isEditing}
                      />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label id="form-label">{loading ? <Skeleton width="50px"/> : 'Shift'}</Form.Label>
                    <Form.Select 
                      id="form-control-input custom-search"
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

                

                {/* <Col>
                  
                  
                  <Form.Group className="mb-3">
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
                  </Form.Group>


                  <Form.Group className="mb-3">
                    <Form.Label id="form-label">{loading ? <Skeleton width="50px"/> : 'Shift'}</Form.Label>
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
                </Col> */}
              </Row>

              <div className='mt-4'>
                  <h4>Akun User</h4>
                  <Row>
                      <Col>
                          <Form.Group className="mb-3">
                          <Form.Label id="form-label">{loading ? <Skeleton width="50px"/> : 'Email'}</Form.Label>
                          <Form.Control 
                              id="form-control-input custom-search"
                              type="email" 
                              placeholder="Masukkan Email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                              disabled={!isEditing}
                              />
                          </Form.Group>
                      </Col>
                      {/* <Col>
                          <Form.Group className="mb-3">
                          <Form.Label id="form-label">{loading ? <Skeleton width="50px"/> : 'Password'}</Form.Label>
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
                      </Col> */}
                  </Row>
              </div>

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
                      />

                    </>  
                    )}

                    {!isEditing && (
                      <ConfirmModal
                        onConfirm={deletePerawat}
                        successMessage={"Data Pasien berhasil Dihapus"}
                        cancelMessage={"Data Pasien gagal Dihapus"}
                        buttonText={"Hapus"}
                      />
                    )}

                  </div>
                </Form>
              
            </Form>
          </Sidebar>
        </>
      ) : (
        <>
          <Sidebar>
            <div className="container d-flex align-items-center container-breadcrumb">
                                <span>
                                <Link to={`/admin/user`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width='17' height='17' fill='#fff' viewBox="0 0 24 24" stroke-width="1.5" stroke="#085b93" class="w-6 h-6 mb-3">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                    </svg>
                                </Link>
                                </span>
                                <BreadCrumb model={items} />

                                <span>
                                    <p className='title-breadcrumb'>{!isEditing ? 'Detail User' : 'Edit User'}</p>
                                </span>
              </div>
              <div className="container">
                <h3>  {!isEditing ? "Detail Perawat" : "Update Perawat"}</h3>
              </div>

              <Form className="container mt-5" onSubmit={submitForm} enctype="multipart/form-data">
                <Row>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label id="form-label">{loading ? <Skeleton width="70px"/> : 'Nama Lengkap'}</Form.Label>
                      <Form.Control
                        id="form-control-input custom-search"
                        type="text" 
                        placeholder="Masukkan Nama Lengkap" 
                        value={nama_lengkap}
                        onChange={(e) => setNamaLengkap(e.target.value)}
                        required
                        disabled={!isEditing}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label id="form-label">{loading ? <Skeleton width="70px"/> : 'Tanggal Lahir'}</Form.Label>
                      <Form.Control 
                        id="form-control-input custom-search"
                        type="date" 
                        placeholder="Masukkan Nama Lengkap" 
                        value={tanggal_lahir}
                        onChange={(e) => setTanggalLahir(e.target.value)}
                        required
                        disabled={!isEditing}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label id="form-label">{loading ? <Skeleton width="70px"/> : 'Jenis Kelamin'}</Form.Label>
                      <Form.Select 
                        id="form-control-input custom-search"
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

                    <Form.Group className="mb-3">
                      <Form.Label id="form-label">{loading ? <Skeleton width="100px"/> : 'Nomor Telepon'}</Form.Label>
                      <Form.Control 
                        id="form-control-input custom-search"
                        type="text" 
                        placeholder="Masukkan Nomor Telepon" 
                        value={no_telepon}
                        onChange={(e) => setNoTelepon(e.target.value)}
                        required
                        disabled={!isEditing}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label id="form-label">{loading ? <Skeleton width="50px"/> : 'Alamat'}</Form.Label>
                      <Form.Control
                        id="form-control-input custom-search"
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
                      <Form.Label id="form-label">{loading ? <Skeleton width="50px"/> : 'Status'}</Form.Label>
                      <Form.Select 
                        id="form-control-input custom-search"
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
                      <Form.Label id="form-label">{loading ? <Skeleton width="50px"/> : 'Shift'}</Form.Label>
                      <Form.Select 
                        id="form-control-input custom-search"
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
                            <Form.Label id="form-label">{loading ? <Skeleton width="50px"/> : 'Email'}</Form.Label>
                            <Form.Control 
                                id="form-control-input custom-search"
                                type="email" 
                                placeholder="Masukkan Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={!isEditing}
                                />
                            </Form.Group>
                        </Col>
                        {/* <Col>
                            <Form.Group className="mb-3">
                            <Form.Label id="form-label">{loading ? <Skeleton width="50px"/> : 'Password'}</Form.Label>
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
                        </Col> */}
                    </Row>
                </div>

                <Form className="mt-5" onSubmit={submitForm}>
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
                        />

                      </>  
                      )}

                      {!isEditing && (
                        <ConfirmModal
                          onConfirm={deletePerawat}
                          successMessage={"Data Pasien berhasil Dihapus"}
                          cancelMessage={"Data Pasien gagal Dihapus"}
                          buttonText={"Hapus"}
                        />
                      )}

                    </div>
                  </Form>
                
              </Form>
            </Sidebar>
        </>
      )}
    </React.Fragment>
  );
}

export default DetailPerawat