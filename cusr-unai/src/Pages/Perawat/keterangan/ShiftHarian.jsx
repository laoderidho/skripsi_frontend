import React, { useEffect, useState } from 'react';
import { Button, Table, Modal, Form, Row, Col, Container} from "react-bootstrap";
import Sidebar from '../../../components/menu/Sidebar'
import { Link } from "react-router-dom";
import { useNavigate, useParams } from 'react-router-dom'
import axios from "../../../axios";

const ShiftHarian = () => {
  const [nama_lengkap, setNamaLengkap] = useState('');

  const {id} = useParams();
  const navigate =  useNavigate();
  const token = localStorage.getItem("token");
  const [row, setRow] = useState([]);
  


//   const getDataById = async () => {
//     try {
//         const res = await axios.post(`/perawat/daftarpasien/detail/${id}`, {
//             headers: { Authorization: `Bearer ${token}` }
//         });
//         setNamaLengkap(res.data.data.nama_lengkap)
//     } catch (error) {

//     }
//   };

//   const handleAddRow = async () => {
//     try {
//         const res = await axios.post(`/perawat/daftaraskep/getlist/${id}`, {
//             headers: { Authorization : `Bearer ${token}` }
//         });
//         setRow(res.data.data)
//     } catch (error) {

//     }
//   };

  


//   useEffect(() => {
//     getDataById();
//     handleAddRow();
//   },[]);

  return (
    <Sidebar>
      <div className='container'>
        <h2>Shift</h2>
      </div>

      <div className='container mt-5'>
        <Row>
            <Col>
                <Link
                    className='btn box'
                    to={`/perawat/askep/shift/keterangan/${id}`}>
                    Shift 1
                </Link>
            </Col>
        </Row>

        <Row>
            <Col>
                <Link
                    className='btn box'
                    disabled
                    >
                    Shift 2
                </Link>
            </Col>
        </Row>

        <Row>
            <Col>
                <Link
                    className='btn box'
                    disabled>
                    Shift 3
                </Link>
            </Col>
        </Row>

      </div>
        
    </Sidebar>
  );
};

export default ShiftHarian;