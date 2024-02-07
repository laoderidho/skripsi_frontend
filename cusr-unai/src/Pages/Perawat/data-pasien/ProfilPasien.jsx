import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/menu/Sidebar";
import { Form, Button, Table, Breadcrumb } from "react-bootstrap";
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
          <b className="hr-style">Nama Lengkap</b>
          <p className="mt-2">{nama_lengkap}</p>

          {/* Tanggal Lahir */}
          <b className="hr-style">Tanggal Lahir</b>
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
  );
}
