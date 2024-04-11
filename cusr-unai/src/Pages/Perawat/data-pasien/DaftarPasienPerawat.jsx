import React, {useEffect, useState} from "react";
import Sidebar from "../../../components/menu/Sidebar";
import { Form, Container, Row, Col } from "react-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "../../../axios";
import AuthorizationRoute from "../../../AuthorizationRoute";
import "primereact/resources/themes/saga-blue/theme.css";
import { Toolbar } from 'primereact/toolbar';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ScrollPanel } from 'primereact/scrollpanel';



export default function DaftarPasien() {

    // Autocomplete

    const [pasien, setPasien] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [filterPasien, setFilterPasien] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);

    // INFO PASIEN

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



    const {id, perawatan_id} = useParams();
    const navigate = useNavigate();


    const isMobile = window.innerWidth <=600;

    


    useEffect(()=>{
       getdataPasien()
       getDataById()
    },[])

    useEffect(()=>{
      filteredPasien()
    },[inputValue]);

    const filteredPasien = () => {
      const filteredDiagnosa = pasien.filter((item) => {
        return (
          item.id.toString().includes(inputValue) ||
          item.nama_lengkap
            .toString()
            .toLowerCase()
            .includes(inputValue.toLowerCase()) ||
          item.no_medical_record
            .toString()
            .toLowerCase()
            .includes(inputValue.toLowerCase())
        );
      });
      setFilterPasien(filteredDiagnosa);
    }

    const endContent = (
      <React.Fragment>
        <input
            className="form-control"
            id="form-width"
            type="text"
            placeholder="Search"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
      </React.Fragment>
    );

    const token = localStorage.getItem('token')

    const handleViewProfile = (patient) => {
      setSelectedPatient(patient);
      console.log(patient)
    }

    // Table

    const getdataPasien = async () =>{
        try{
            const res = await axios.post("/perawat/daftarpasien/rawat-inap",{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            console.log(res.data.data)
            setPasien(res.data.data)
        }catch(error){
            // AuthorizationRoute(error.response.status)
        }
    }

    const getDataById = async () => {
      try {
        const res = await axios.post(`/perawat/daftarpasien/detail/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNamaLengkap(res.data.data.nama_lengkap);
        setTanggalLahir(res.data.data.tanggal_lahir);
        console.log()
        setJenisKelamin(res.data.data.jenis_kelamin);
        setNoTelepon(res.data.data.no_telepon);
        setAlamat(res.data.data.alamat);
        setStatusPernikahan(res.data.data.status_pernikahan);
        setNik(res.data.data.nik);
        setAlergi(res.data.data.alergi);
        setNamaAsuransi(res.data.data.nama_asuransi);
        setNomorAsuransi(res.data.data.no_asuransi);
        setMedicalRecord(res.data.data.no_medical_record);
      } catch (error) {}
    };

    

  return (
    <React.Fragment>
      {isMobile ? (
        <React.Fragment>
          <Sidebar
            title='DAFTAR PASIEN'>
            {/* Title */}

            <div className="container container-mobile">
              <span id='form-label' className="text-alert-search">Ketik untuk mencari nama pasien</span>
                <input
                  className="form-control custom-search"
                  id="form-width"
                  type="text"
                  placeholder="Search"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />

              <DataTable value={inputValue ? filterPasien : pasien} paginator rows={5}  stripedRows show showGridlines>
                <Column field="nama_lengkap" header='Nama'/>
                <Column 
                  header=''
                  body={(item) => (
                    <Link
                      to={`/perawat/profilpasien/${item.id}/${item.perawatan_id}`}
                      className="btn d-flex justify-content-center align-items-center simple-button">Lihat Profil</Link>
                  )}/>
              </DataTable>
            </div>           
          </Sidebar>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Sidebar>
            {/* Title */}
            <div className="container">
              <h2>Daftar Pasien</h2>
            </div>

            

            <div className="container">

              <span id='form-label' className="text-alert-search">Ketik untuk mencari nama pasien</span>
              <input
                  className="form-control custom-search"
                  id="form-width"
                  type="text"
                  placeholder="Search"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />            
            </div>  

            <div className="container">
                  <Row>
                    <Col xs={6}>
                        <DataTable value={inputValue ? filterPasien : pasien} paginator rows={10} stripedRows show showGridlines>
                            <Column field="nama_lengkap" header='Nama' />
                            <Column
                                header=''
                                body={(item) => (
                                    <button
                                        onClick={() => handleViewProfile(item)}
                                        className="btn d-flex justify-content-center align-items-center simple-button">Lihat Profil</button>
                                )} />
                        </DataTable>
                    </Col>
                    <Col xs={4} className="scroll-panel-box">
                     
                          <ScrollPanel style={{ width: '100%', height: '580px', backgroundColor: '#f6fafd' }}>
                            {selectedPatient && (
                                  <>
                                      <div className="alert-pasien">
                                        <div className='space-label'>
                                          <Row>
                                            <Col>
                                            <Row>
                                                <span className='shift-label'>Pasien</span>
                                            </Row>
                                              <Row>
                                                <span id='form-label' className="alert-info">{selectedPatient.nama_lengkap}</span>
                                              </Row>
                                            </Col>
                                            <Col>
                                              <Row>
                                                <div className="mt-2" style={{marginRight:'0.5rem'}} >
                                                  <Link to={`/perawat/askep/${selectedPatient.perawatan_id}`} className="btn blue-button-left-align">
                                                    Lihat Pencatatan
                                                  </Link>
                                                </div>
                                              </Row>
                                            </Col>
                                          </Row>
                                        </div>
                                      </div>
          
                              

                              <div className="container" style={{marginTop:'2rem'}}>
                                <p id='form-label'>INFO PASIEN</p>
                                <div>
                                  {/* Nama */}
                                  <div className="content-profile">
                                    <span id='form-label' className="title-profile">NAMA</span>
                                    <span>{selectedPatient.nama_lengkap}</span>
                                  </div>
                                  <hr className="hr-custom"></hr>

                                  {/* Tanggal Lahir */}
                                  <div className="content-profile mt-3">
                                    <span id='form-label' className="title-profile">TANGGAL LAHIR</span>
                                    <span>{selectedPatient.tanggal_lahir}</span>
                                  </div>
                                  <hr className="hr-custom"></hr>

                                  {/* Jenis Kelamin */}
                                  <div className="content-profile mt-3">
                                    <span id='form-label' className="title-profile">JENIS KELAMIN</span>
                                    <span>{selectedPatient.jenis_kelamin === 1 ? 'Laki-laki' : 'Perempuan'}</span>
                                  </div>
                                  <hr className="hr-custom"></hr>

                                  {/* Status Pernikahan */}
                                  <div className="content-profile mt-3">
                                    <span id='form-label' className="title-profile">STATUS PERNIKAHAN</span>
                                    <span>{selectedPatient.status_pernikahan === 0 ? 'Belum Menikah' : 'Sudah Menikah'}</span>
                                  </div>
                                  <hr className="hr-custom"></hr>

                                  {/* NIK */}
                                  <div className="content-profile mt-3">
                                    <span id='form-label' className="title-profile">NIK</span>
                                    <span>{selectedPatient.nik}</span>
                                  </div>
                                  <hr className="hr-custom"></hr>


                                </div>

                                <p id='form-label' className="mt-4">INFO KONTAK PASIEN</p>
                                <div>
                                  {/* Nomor Telepon */}
                                  <div className="content-profile mt-3">
                                      <span id='form-label' className="title-profile">NO TELEPON</span>
                                      <span>{selectedPatient.no_telepon}</span>
                                  </div>
                                  <hr className="hr-custom"></hr>

                                  {/* Alamat */}
                                  <div className="content-profile mt-3">
                                      <span id='form-label' className="title-profile">ALAMAT</span>
                                      <span>{selectedPatient.alamat}</span>
                                  </div>
                                  <hr className="hr-custom"></hr>
                                </div>

                                <p id='form-label' className="mt-4">INFO MEDIS PASIEN</p>
                                <div>
                                  {/* No Rekam Medis */}
                                  <div className="content-profile mt-3">
                                      <span id='form-label' className="title-profile">NO REKAM MEDIS</span>
                                      <span>{selectedPatient.no_medical_record}</span>
                                  </div>
                                  <hr className="hr-custom"></hr>

                                  {/* Alergi */}
                                  <div className="content-profile mt-3">
                                      <span id='form-label' className="title-profile">ALERGI</span>
                                      <span>{selectedPatient.alergi}</span>
                                  </div>
                                  <hr className="hr-custom"></hr>
                                </div>

                                <p id='form-label' className="mt-4">INFO ASURANSI PASIEN</p>
                                <div>
                                  {/* Nama Asuransi */}
                                  <div className="content-profile mt-3">
                                      <span id='form-label' className="title-profile">NAMA ASURANSI</span>
                                      <span>{selectedPatient.nama_asuransi}</span>
                                  </div>
                                  <hr className="hr-custom"></hr>

                                  {/* Nomor Asuransi */}
                                  <div className="content-profile mt-3">
                                      <span id='form-label' className="title-profile">NO ASURANSI</span>
                                      <span>{selectedPatient.no_asuransi}</span>
                                  </div>
                                  <hr className="hr-custom"></hr>
                                </div>
                              </div>
                            </>
                            )}
                          </ScrollPanel>
                      
                    </Col>
                </Row>
            </div>
          </Sidebar>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
