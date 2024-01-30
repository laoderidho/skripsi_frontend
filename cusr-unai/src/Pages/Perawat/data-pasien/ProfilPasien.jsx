import React, {useEffect, useState} from "react";
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
    const {id} = useParams();
    const navigate = useNavigate();

    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        getDataById();
    },[]);

    const getDataById = async () => {
        try {
            const res = await axios.post(`/perawat/daftarpasien/detail/${id}`, {
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
        } catch (error) {

        }
    };

    // Table

    const [pasien, setPasien] = useState([])

    // const getPasien = async (token) => {
    //     try {
    //         await axios
    //         .post("/admin/daftarpasien", {
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //             },
    //         })
    //         .then((res) => {
    //             console.log(res)
    //             setPasien(res?.data?.data);
    //         });
    //     } catch (error) {
    //         // AuthorizationRoute(error.response.status);
    //     }
    // };

    useEffect(()=>{
        getPasien(localStorage.getItem('token'))
    }, [])

    console.log(pasien)
    

  return (
      <Sidebar>
        {/* Title */}
        <div className="container">
            <h2>Profil Pasien</h2>
        </div>

        {/* Search */}

        <Form className="container">
            <div>
                <Link to="/perawat/keteranganaskep" className="btn d-flex justify-content-center align-items-center blue-button-lg">
                        Lihat Pencatatan
                </Link> 

                <p>Nama Lengkap</p>
                <hr />

            </div>

            
            
        </Form>
      </Sidebar>
      
  );
}
