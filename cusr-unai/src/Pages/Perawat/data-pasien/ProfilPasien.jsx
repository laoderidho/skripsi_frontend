import React, {useEffect, useState} from "react";
import Sidebar from "../../../components/menu/Sidebar";
import { Form, Button, Table, Breadcrumb } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import axios from "../../../axios";
import AuthorizationRoute from "../../../AuthorizationRoute";

export default function ProfilPasien() {

    const [nama, setNama] = useState("");
    const [tanggal_lahir, setTanggalLahir] = useState("");
    const [gender, setGender] = useState("");
    const [alamat, setAlamat] = useState("");
    const [isMaried, setIsMaried] = useState("");
    const [nohp, setNohp] = useState("");
    const [alergi, setAlergi] = useState("");
    const [asuransi, setAsuransi] = useState("");

  
    const {id} = useParams();

    const getPasien = async (token) => {
        try {
            await axios
            .post(`/perawat/pasien/detail/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                console.log(res)
                setNama(res.data.data.nama_lengkap);
                setTanggalLahir(res.data.data.tanggal_lahir);
                setGender(res.data.data.jenis_kelamin);
                setAlamat(res.data.data.alamat);
                setNohp(res.data.data.no_telepon);
                setAlergi(res.data.data.alergi);
                setAsuransi(res.data.data.no_asuransi);
            });
        } catch (error) {
            // AuthorizationRoute(error.response.status);
        }
    };

    useEffect(()=>{
        getPasien(localStorage.getItem('token'))
    }, [])

  return (
    <Sidebar>
      {/* Title */}
      <div className="container">
        <h2>Profil Pasien</h2>
      </div>

      {/* Search */}

      <Form className="container">
        <div>
          <Link
            to="/admin/daftarpasien/tambah"
            className="btn d-flex justify-content-center align-items-center blue-button-lg"
          >
            Lihat Pencatatan
          </Link>
        </div>

        <Table className="table table-striped table-hover">
          <thead>
            <tr>
              <th></th>
              <th className="button-space"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Nama lengkap</td>
              <td>{nama}</td>
            </tr>
            <tr>
              <td>tanggal Lahir</td>
              <td>{tanggal_lahir}</td>
            </tr>
            <tr>
              <td>Jenis Kelamin</td>
              <td>{gender == 1 ? "Laki-Laki" : "Perempuan"}</td>
            </tr>
            <tr>
              <td>Alamat</td>
              <td>{alamat}</td>
            </tr>
            <tr>
              <td>Status Pernikahan</td>
              <td>{isMaried == 1 ? "Sudah Menikah" : "Belum Menikah"}</td>
            </tr>
            <tr>
              <td>No Telepon</td>
              <td>{nohp}</td>
            </tr>
            <tr>
              <td>alergi</td>
              <td>{alergi ? alergi : "-"}</td>
            </tr>
            <tr>
              <td>Nomor Asuransi</td>
              <td>{asuransi ? asuransi : "-"}</td>
            </tr>
          </tbody>
        </Table>
      </Form>
    </Sidebar>
  );
}
