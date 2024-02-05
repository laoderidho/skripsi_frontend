import React, {useEffect, useState} from "react";
import Sidebar from "../../../components/menu/Sidebar";
import { Form, Button, Table, Container, Row, Col, Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from 'react-router-dom'
import axios from "../../../axios";
import AuthorizationRoute from "../../../AuthorizationRoute";

export default function ProfilPemeriksaan() {

    // Autocomplete

    const [inputValue, setInputValue] = useState('');
    const [boxes, setBoxes] = useState([]);
    const [tanggal, setTanggal] = useState([]);
    const [filterTanggal, setFilterTanggal] = useState([]);
    const [pasien, setPasien] = useState([]);
    const [nama_lengkap, setNamaLengkap] = useState("");
    const {id} = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        getDataById();
        handleAddBox();
    },[]);

    const getDataById = async () => {
        try {
            const res = await axios.post(`/perawat/daftarpasien/detail/${id}`, {}, {
                headers: { Authorization: `Bearer ${token}`}
            });
            setNamaLengkap(res.data.data.nama_lengkap)
        } catch (error) {

        }
    };

    const handleAddBox = async () => {
        try {
            const res = await axios.post(`/perawat/diagnostic/getlist/${id}`, {
                headers: { Authorization: `Bearer ${token}`}
            }); 
            setBoxes(res.data.data)
            console.log(res.data.data)
        } catch (error) {

        }
    };


    // const handleAddBox = () => {
    //     const currentDate = new Date();
    //     const formattedDate = currentDate.toLocaleDateString('id-ID', {
    //         year: 'numeric',
    //         month: 'long',
    //         day: 'numeric',
    //     });
    //     setBoxes([...boxes, formattedDate]);
    // }

    const filteredTanggal = () => {
        const filteredTanggal = tanggal.filter((item) => {
            return (
                item.date
                .toString()
                .toLowerCase()
                .includes(inputValue.toLowerCase())
            );
        });
        setFilterTanggal(filteredTanggal);
    }

    useEffect(() => {
        filteredTanggal()
    },[inputValue])
    
    

  return (
      <Sidebar>
        {/* Title */}
        <div className="container">
            <h2>Data Diagnostik</h2>
        </div>

        {/* Search */}

        <div className="container">
            <Table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Nama</th>
                            <th>
                                <Link
                                to={`/perawat/profilpasien/${id}`}>{nama_lengkap}</Link>
                            </th>
                    </tr>
                </thead>
            </Table>

            <input
                className="form-control"
                type="text"
                placeholder="Search"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)} />

        </div>

        <Container>
            <Row>
                <Col>
                    <Link 
                        to={`/perawat/diagnostik/tambah/${id}`}
                        className="btn d-flex justify-content-center align-items-center blue-button-lg mt-1">Tambah</Link>
                </Col>
            </Row>
            {boxes && boxes.map((date,index) => (
                <Row key={index}>
                    <Col>
                        <Link 
                            to={`/perawat/diagnostik/${date.id}`}
                            className="btn box">
                            <span className="">{date.updated_at}</span>
                            <span className=""></span>
                        </Link>
                    </Col>
                </Row>
            ))}


        </Container>
      </Sidebar>
      
  );
}