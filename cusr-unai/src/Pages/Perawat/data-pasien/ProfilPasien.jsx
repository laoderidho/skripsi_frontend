import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/menu/Sidebar";
import { Form, Button, Table, Breadcrumb,Row, Col } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "../../../axios";
import AuthorizationRoute from "../../../AuthorizationRoute";

export default function ProfilPasien() {
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
  const { id, perawatan_id } = useParams();
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const isMobile = window.innerWidth <=600;

  useEffect(() => {
    getDataById();
  }, []);

  const token = localStorage.getItem("token");

  const getDataById = async () => {
    try {
      const res = await axios.post(`/perawat/daftarpasien/detail/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNamaLengkap(res.data.data.nama_lengkap);
      setTanggalLahir(res.data.data.tanggal_lahir);
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

  const [pasien, setPasien] = useState([]);

  useEffect(() => {
    // getPasien(localStorage.getItem('token'))
  }, []);

  return (
    <React.Fragment>
      {isMobile ? (
        <Sidebar
        title='PROFIL'>

            <div className="container">
              <div className="container-fluid container">
                <div className="container mt-2">
                  <div className="alert-pasien">
                    <div className='space-label'>
                      <Row>
                        <Col>
                        <Row>
                            <span className='shift-label'>Pasien</span>
                        </Row>
                          <Row>
                            <span id='form-label' className="alert-info">{nama_lengkap}</span>
                          </Row>
                        </Col>
                        <Col>
                          <Row>
                            <div className="mt-2" style={{marginRight:'0.5rem'}} >
                              <Link to={`/perawat/askep/${perawatan_id}`} className="btn blue-button-left-align">
                                Lihat Pencatatan
                              </Link>
                            </div>
                          </Row>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          

          <div className="container" style={{marginTop:'5rem'}}>
            <p id='form-label'>INFO PASIEN</p>
            <div>
              {/* Nama */}
              <div className="content-profile">
                <span id='form-label' className="title-profile">NAMA</span>
                <span>{nama_lengkap}</span>
              </div>
              <hr className="hr-custom"></hr>

              {/* Tanggal Lahir */}
              <div className="content-profile mt-3">
                <span id='form-label' className="title-profile">TANGGAL LAHIR</span>
                <span>{tanggal_lahir}</span>
              </div>
              <hr className="hr-custom"></hr>

              {/* Jenis Kelamin */}
              <div className="content-profile mt-3">
                <span id='form-label' className="title-profile">JENIS KELAMIN</span>
                <span>{jenis_kelamin === 1 ? 'Laki-laki' : 'Perempuan'}</span>
              </div>
              <hr className="hr-custom"></hr>

              {/* Status Pernikahan */}
              <div className="content-profile mt-3">
                <span id='form-label' className="title-profile">STATUS PERNIKAHAN</span>
                <span>{status_pernikahan === 0 ? 'Belum Menikah' : 'Sudah Menikah'}</span>
              </div>
              <hr className="hr-custom"></hr>

              {/* NIK */}
              <div className="content-profile mt-3">
                <span id='form-label' className="title-profile">NIK</span>
                <span>{nik}</span>
              </div>
              <hr className="hr-custom"></hr>


            </div>

            <p id='form-label' className="mt-4">INFO KONTAK PASIEN</p>
            <div>
              {/* Nomor Telepon */}
              <div className="content-profile mt-3">
                  <span id='form-label' className="title-profile">NO TELEPON</span>
                  <span>{no_telepon}</span>
              </div>
              <hr className="hr-custom"></hr>

              {/* Alamat */}
              <div className="content-profile mt-3">
                  <span id='form-label' className="title-profile">ALAMAT</span>
                  <span>{alamat}</span>
              </div>
              <hr className="hr-custom"></hr>
            </div>

            <p id='form-label' className="mt-4">INFO MEDIS PASIEN</p>
            <div>
              {/* No Rekam Medis */}
              <div className="content-profile mt-3">
                  <span id='form-label' className="title-profile">NO REKAM MEDIS</span>
                  <span>{no_medical_record}</span>
              </div>
              <hr className="hr-custom"></hr>

              {/* Alergi */}
              <div className="content-profile mt-3">
                  <span id='form-label' className="title-profile">ALERGI</span>
                  <span>{alergi}</span>
              </div>
              <hr className="hr-custom"></hr>
            </div>

            <p id='form-label' className="mt-4">INFO ASURANSI PASIEN</p>
            <div>
              {/* Nama Asuransi */}
              <div className="content-profile mt-3">
                  <span id='form-label' className="title-profile">NAMA ASURANSI</span>
                  <span>{nama_asuransi}</span>
              </div>
              <hr className="hr-custom"></hr>

              {/* Nomor Asuransi */}
              <div className="content-profile mt-3">
                  <span id='form-label' className="title-profile">NO ASURANSI</span>
                  <span>{no_asuransi}</span>
              </div>
              <hr className="hr-custom"></hr>
            </div>
          </div>
        </Sidebar>
      ) : (
        <React.Fragment>
          <Sidebar>
            {/* Title */}
            <div className="container">
              <h2>Profil Pasien</h2>
            </div>

            {/* Search */}

            <div className="container">
              <Link
                to={`/perawat/askep/${perawatan_id}`}
                className="btn blue-button-left-align"
              >
                Lihat Pencatatan
              </Link>

              <div className="default">
                {/* Nama Lengkap */}
                
                <div className="content-profile">
                  <span>Nama Lengkap</span>
                  <span>{nama_lengkap}</span>
                </div>
                <hr className="hr-custom"></hr>
      {/* 
                <div className="content-profile mt-3">
                  <span>Tanggal Lahir</span>
                  <span>{tanggal_lahir}</span>
                </div>
                <hr className="hr-custom"></hr> */}

                {/* Tanggal Lahir */}
                <b className="hr-style mt-2">Tanggal Lahir</b>
                <p className="mt-2">{tanggal_lahir}</p>

                {/* Jenis Kelamin */}
                <b className="hr-style">Jenis Kelamin</b>
                <p className="mt-2">{jenis_kelamin}</p>

                {/* No Telepon */}
                <b className="hr-style">Nomor Telepon</b>
                <p className="mt-2">{no_telepon}</p>

                {/* Alamat */}
                <b className="hr-style">Alamat</b>
                <p className="mt-2">{alamat}</p>

                {/* Status Pernikahan */}
                <b className="hr-style">Status Pernikahan</b>
                <p className="mt-2">{status_pernikahan}</p>

                {/* NIK */}
                <b className="hr-style">NIK</b>
                <p className="mt-2">{nik}</p>

                {/* Alergi */}
                <b className="hr-style">Alergi</b>
                <p className="mt-2">{alergi}</p>

                {/* Nama Asuransi */}
                <b className="hr-style">Nama Asuransi</b>
                <p className="mt-2">{nama_asuransi}</p>

                {/* Nomor Asuransi */}
                <b className="hr-style">Nomor Asuransi</b>
                <p className="mt-2">{no_asuransi}</p>

                {/* No Medical Record */}
                <b className="hr-style">No Medical Record</b>
                <p className="mt-2">{no_medical_record}</p>
              </div>
            </div>
          </Sidebar>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
