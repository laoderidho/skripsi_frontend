import React, { useEffect, useState } from "react";
import Sidebar from "../../../../components/menu/Sidebar";
import { Breadcrumb, Form, Col, Row, Button, Modal} from "react-bootstrap";
import { useNavigate, useParams, Link } from 'react-router-dom'
import AuthorizationRoute from '../../../../AuthorizationRoute'
import axios from '../../../../axios'

const AddIntervensi = () => {

  const [kode_intervensi, setKodeIntervensi] = useState("");
  const [nama_intervensi, setNamaIntervensi] = useState("");
  const [observasi, setObservasi] = useState("");
  const [terapeutik, setTerapeutik] = useState("");
  const [edukasi, setEdukasi] = useState("");
  const {id} = useParams();
  const navigate = useNavigate();
  const token=localStorage.getItem("token");
  const [submitted, setSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [array, setArray] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const [intervensi, setIntervensi] = useState([]);

  const getIntervensi = async (token) => {
    try {
      await axios.post(`/admin/intervensi`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => {
        console.log(res)
        setIntervensi(res?.data?.data);
      }) 
    } catch (error) {
      
    }
  }


  useEffect(() => {
    getDataById();
    getIntervensi(localStorage.getItem('token'))
  },[]);

  const getDataById = async () => {
    try {
        const res = await axios.post(`/admin/intervensi/detail/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        setKodeIntervensi(res.data.data.kode_intervensi)
        setNamaIntervensi(res.data.data.nama_intervensi)
        setObservasi(res.data.data.observasi)
        setTerapeutik(res.data.data.terapeutik)
        setEdukasi(res.data.data.edukasi)
    } catch (error) {
        
    }
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim() !== '') {
        const lines = inputValue.split('\n');
        const filteredLines = lines.filter((line) => line.trim() !== '');
        setArray((prevArray) => [...prevArray, ...filteredLines]);
        setInputValue('');
    }
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  }

  const deleteIntervensi = async () => {
    try {
        await axios.post(`/admin/intervensi/delete/${id}`, {
            headers: { Authorization: `Bearer ${token}`}
        })
    } catch (error) {
        
    }
  };

  
  
  return (
    <Sidebar>
      <div className="container">
        <h2>Tambah Intervensi</h2>
        <Breadcrumb>
          <Breadcrumb.Item href="/admin/standarkeperawatan/intervensi">Intervensi</Breadcrumb.Item>
          <Breadcrumb.Item active>
            Tambah
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>

    


    </Sidebar>
  );
};

export default AddIntervensi;
