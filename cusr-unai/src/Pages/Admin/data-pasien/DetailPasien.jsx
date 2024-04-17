import React, { useEffect, useState } from 'react'
import Sidebar from '../../../components/menu/SidebarAdmin'
import { Breadcrumb, Form, Row, Col, Button, Modal, Accordion } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ConfirmModal from '../../../components/menu/ConfirmModal'
import AuthorizationRoute from '../../../AuthorizationRoute'
import axios from '../../../axios'
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import "primereact/resources/themes/saga-blue/theme.css";
import { Skeleton } from 'primereact/skeleton';
import { BreadCrumb } from 'primereact/breadcrumb';


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
    const [bed, setBed] = useState([]);
    const {id} = useParams();
    const navigate = useNavigate();
    const token=localStorage.getItem("token");
    const [isEditing, setIsEditing] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);

    // modal rawatInap
    // const [showModalRawatInap, setShowModalRawatInap] = useState(false);
    // const [dataRawatInap, setDataRawatInap] = useState('');
    // const [triase, setTriase] = useState('');
    // const [pasienBed, setPasienBed] = useState('');

    const isMobile = window.innerWidth <=600;

    useEffect(() => {
        getDataById();
        // detailStatus();
        getBedData();
    },[]);

    const getBedData = async () =>{
      try {
       const res =  await axios.post('/admin/bed/filter',{
            headers: { Authorization: `Bearer ${token}`} 
          })
          setBed(res.data.data)
      } catch (error) {
        
      }
    }
    
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
        setLoading(false);
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
  
    // const detailStatus = async () => {
    //   try{
    //     const res = await axios.post(`/pasien/rawat-inap/detailStatus/${id}`, {
    //       headers: { Authorization: `Bearer ${token}` },
    //     });
    //     setDataRawatInap(res.data.message)
    //   }catch(error){
    //     AuthorizationRoute(error.response.status)
    //   }
    // }

    // const addRawatInap = async () =>{
    //   try {
    //      await axios.post(`/admin/perawatan/add/${id}`, {
    //       triase: triase,
    //       bed: pasienBed
    //     },
    //     { 
    //       headers: { Authorization: `Bearer ${token}`}
    //     });
    //     setShowModalRawatInap(!showModalRawatInap)
    //     detailStatus();
    //   } catch (error){
    //     //  AuthorizationRoute(error.response.status)
    //   }
    // }

    const items = [{label: 'Pasien'}, {label: 'Daftar Pasien'}, {label: ''}]

  
    
    return (
      <React.Fragment>
        {isMobile ? (
          <>
            <Sidebar>

              <div className="container d-flex align-items-center form-margin container-breadcrumb">
                              <span>
                              <Link to={`/admin/daftarpasien`}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width='17' height='17' fill='#fff' viewBox="0 0 24 24" stroke-width="1.5" stroke="#085b93" class="w-6 h-6 mb-3">
                                  <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                  </svg>
                              </Link>
                              </span>
                              <BreadCrumb model={items} />

                              <span>
                              <p className='title-breadcrumb'>{isEditing ? 'Edit Pasien' : 'Detail Pasien'}</p>
                              </span>
                </div>
                <div className="container">
                  <h3>{isEditing ? 'Edit Pasien' : 'Detail Pasien'}</h3>
                </div>

                <div className='container pt-2'>
                  <Form className="pt-2">
                    <Row>
                      <Col xs={12}>
                        <Card className='profile'>
                          <Form.Group>
                            <Form.Label id='form-label'>Nama Lengkap</Form.Label>
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

                          <Form.Group className="mt-2">
                            <Form.Label id='form-label'>Tanggal Lahir</Form.Label>
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

                          <Form.Group className="mt-2">
                            <Form.Label id='form-label'>Jenis Kelamin</Form.Label>
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
                              <option value="1">Laki Laki</option>
                              <option value="0">Perempuan</option>
                            </Form.Select>
                          </Form.Group>

                          <Form.Group className="mt-2">
                            <Form.Label id='form-label'>NIK</Form.Label>
                            <Form.Control
                              id="form-control-input custom-search"
                              type="text"
                              placeholder="Masukkan NIK"
                              value={nik}
                              onChange={(e) => setNik(e.target.value)}
                              required
                              disabled={!isEditing}
                            />
                          </Form.Group>

                          <Form.Group className="mt-2">
                            <Form.Label id='form-label'>Status Pernikahan</Form.Label>
                            <Form.Select
                              id="form-control-input custom-search"
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
                        </Card>
                        <Card className='mt-3'>
                          <Form.Group>
                            <Form.Label id='form-label'>Nomor Telepon</Form.Label>
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

                          <Form.Group className="mt-2">
                            <Form.Label id='form-label'>Alamat</Form.Label>
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
                        </Card>
                      </Col>

                      <Col xs={12}>
                        <Card>
                          <Form.Group>
                            <Form.Label id='form-label'>No Medical Record</Form.Label>
                            <Form.Control
                              id="form-control-input custom-search"
                              type="text"
                              placeholder="Masukkan No Medical Record"
                              value={no_medical_record}
                              onChange={(e) => setMedicalRecord(e.target.value)}
                              required
                              disabled={!isEditing}
                            />
                          </Form.Group>

                          <Form.Group className='mt-2'>
                            <Form.Label id='form-label'>Alergi</Form.Label>
                            <Form.Control
                              id="form-control-input custom-search"
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
                        <Card className='mt-2'>
                          <Form.Group>
                            <Form.Label id='form-label'>Nama Asuransi</Form.Label>
                            <Form.Control
                              id="form-control-input custom-search"
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
                              id="form-control-input custom-search"
                              type="text"
                              placeholder="Masukkan Nomor Asuransi"
                              value={no_asuransi}
                              onChange={(e) => setNomorAsuransi(e.target.value)}
                              disabled={!isEditing}
                            />
                          </Form.Group>
                        </Card>
                      </Col>
                    </Row>
                  </Form>

                  <Form className="container mt-5" onSubmit={submitForm}>
                    <div className="d-flex justify-content-center mt-3">
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
                        <ConfirmModal
                        onConfirm={deletePasien}
                        successMessage={"Data Pasien berhasil Dihapus"}
                        cancelMessage={"Data Pasien gagal Dihapus"}
                        buttonText={"Hapus"}
                      />
                      )}

                    </div>
                  </Form>
                </div>

                
                {/* MODAL STATUS */}
                {/* <Modal
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
                      <Form.Group className="mb-3">
                        <Form.Select name="bed" value={pasienBed} onChange={(e)=>setPasienBed(e.target.value)}>
                          <option value={null}>Pilih Kamar</option>
                          {bed && bed.map((item, index)=>{
                            return(
                              <option value={item.no_bed}>{item.no_bed}</option>
                            )
                          })}
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
                      {pasienBed && triase ? ( <ConfirmModal
                        onConfirm={addRawatInap}
                        successMessage={"Pasien berhasil di rawat inap"}
                        cancelMessage={"Pasien gagal di rawat inap"}
                        buttonText={"save changes"}
                      />): (
                        <Button variant="primary" disabled>save changes</Button>
                      )}
                    </Modal.Footer>
                  </Form>
                </Modal>    */}
              </Sidebar>
          </>
        ) : (
          <>
            <Sidebar>

            <div className="container d-flex align-items-center container-breadcrumb">
                            <span>
                            <Link to={`/admin/daftarpasien`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width='17' height='17' fill='#fff' viewBox="0 0 24 24" stroke-width="1.5" stroke="#085b93" class="w-6 h-6 mb-3">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                </svg>
                            </Link>
                            </span>
                            <BreadCrumb model={items} />

                            <span>
                              <p className='title-breadcrumb'>{isEditing ? 'Edit Pasien' : 'Detail Pasien'}</p>
                            </span>
              </div>

                <div className="container">
                  <h3>{isEditing ? 'Edit Pasien' : 'Detail Pasien'}</h3>
                </div>

                <div className='container pt-2'>
                  <Form className="pt-2">
                    <Row>
                      <Col xs={6}>
                        <Card className='profile'>
                          <Form.Group>
                            <Form.Label id='form-label'>Nama Lengkap</Form.Label>
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

                          <Form.Group className="mt-2">
                            <Form.Label id='form-label'>Tanggal Lahir</Form.Label>
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

                          <Form.Group className="mt-2">
                            <Form.Label id='form-label'>Jenis Kelamin</Form.Label>
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
                              <option value="1">Laki Laki</option>
                              <option value="0">Perempuan</option>
                            </Form.Select>
                          </Form.Group>

                          <Form.Group className="mt-2">
                            <Form.Label id='form-label'>NIK</Form.Label>
                            <Form.Control
                              id="form-control-input custom-search"
                              type="text"
                              placeholder="Masukkan NIK"
                              value={nik}
                              onChange={(e) => setNik(e.target.value)}
                              required
                              disabled={!isEditing}
                            />
                          </Form.Group>

                          <Form.Group className="mt-2">
                            <Form.Label id='form-label'>Status Pernikahan</Form.Label>
                            <Form.Select
                              id="form-control-input custom-search"
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
                        </Card>
                        <Card className='mt-3'>
                          <Form.Group>
                            <Form.Label id='form-label'>Nomor Telepon</Form.Label>
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

                          <Form.Group className="mt-2">
                            <Form.Label id='form-label'>Alamat</Form.Label>
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
                        </Card>
                      </Col>

                      <Col xs={6}>
                        <Card>
                          <Form.Group>
                            <Form.Label id='form-label'>No Medical Record</Form.Label>
                            <Form.Control
                              id="form-control-input custom-search"
                              type="text"
                              placeholder="Masukkan No Medical Record"
                              value={no_medical_record}
                              onChange={(e) => setMedicalRecord(e.target.value)}
                              required
                              disabled={!isEditing}
                            />
                          </Form.Group>

                          <Form.Group className='mt-2'>
                            <Form.Label id='form-label'>Alergi</Form.Label>
                            <Form.Control
                              id="form-control-input custom-search"
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
                        <Card className='mt-2'>
                          <Form.Group>
                            <Form.Label id='form-label'>Nama Asuransi</Form.Label>
                            <Form.Control
                              id="form-control-input custom-search"
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
                              id="form-control-input custom-search"
                              type="text"
                              placeholder="Masukkan Nomor Asuransi"
                              value={no_asuransi}
                              onChange={(e) => setNomorAsuransi(e.target.value)}
                              disabled={!isEditing}
                            />
                          </Form.Group>
                        </Card>
                      </Col>
                    </Row>
                  </Form>

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
                        <ConfirmModal
                        onConfirm={deletePasien}
                        successMessage={"Data Pasien berhasil Dihapus"}
                        cancelMessage={"Data Pasien gagal Dihapus"}
                        buttonText={"Hapus"}
                      />
                      )}

                    </div>
                  </Form>
                </div>

                
                {/* MODAL STATUS */}
                {/* <Modal
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
                      <Form.Group className="mb-3">
                        <Form.Select name="bed" value={pasienBed} onChange={(e)=>setPasienBed(e.target.value)}>
                          <option value={null}>Pilih Kamar</option>
                          {bed && bed.map((item, index)=>{
                            return(
                              <option value={item.no_bed}>{item.no_bed}</option>
                            )
                          })}
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
                      {pasienBed && triase ? ( <ConfirmModal
                        onConfirm={addRawatInap}
                        successMessage={"Pasien berhasil di rawat inap"}
                        cancelMessage={"Pasien gagal di rawat inap"}
                        buttonText={"save changes"}
                      />): (
                        <Button variant="primary" disabled>save changes</Button>
                      )}
                    </Modal.Footer>
                  </Form>
                </Modal>    */}
              </Sidebar>
          </>
        )}
      </React.Fragment>
    );
  }
  
  export default DetailPasien