import React, { useState, useEffect } from 'react';
import Sidebar from '../../../../../src/components/menu/Sidebar';
import { useNavigate, useParams, Link } from "react-router-dom";
import { Form } from 'react-bootstrap';
import axios from '../../../../axios';
import { filter } from '@chakra-ui/react';

export default function DetailAskepIntervensi() {
    const [nama_intervensi, setNamaIntervensi] = useState("");
    const [observasi, setObservasi] = useState([]);
    const [teraputik, setTerapeutik] = useState("");
    const [edukasi, setEdukasi] = useState("");
    const [catatan, setCatatan] = useState("");

    const {id} = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const getDataById = async () => {
        try {
            const res = await axios.post(`/perawat/intervensi/detail-pasien-intervensi/${id}`, {
                headers: { Authorization: `Bearer ${token}`}
            })

           const data =res.data.tindakan_intervensi

            const filterObservasi = data.filter(item=>item.nama_kategori_tindakan == "Observasi");
            const filterTeraupeutik = data.filter(item=> item.nama_kategori_tindakan == "Terapeutik")
            const filterEdukasi = data.filter(item => item.nama_kategori_tindakan == "Edukasi")
            console.log(filterObservasi)

            // setNamaIntervensi(res.data.data.nama_intervensi)
            setObservasi(filterObservasi);
            setTerapeutik(filterTeraupeutik);
            setEdukasi(filterEdukasi);
        } catch (error) {

        }
    };

    useEffect(() => {
        getDataById();
    },[])

    useEffect(() => {
        console.log(observasi);
    },[observasi])





    return (
        <Sidebar
            title='INTERVENSI'>
                <div className='container'>
                    <h2>Form Intervensi</h2>
                </div>

                <div className='container'>
                    <Form.Group className='mt-4'>
                        <p>{nama_intervensi}</p>
                    </Form.Group>

                    <Form.Group className='mt-4'>
                        <Form.Label className='label mt-4'>Observasi</Form.Label>
                        <ul>
                            {observasi && 
                                observasi.map((item, index) => <li key={index}>{item.nama_tindakan_intervensi}</li>)}
                        </ul>
                    </Form.Group>

                    <Form.Group className='mt-4'>
                        <Form.Label className='label mt-4'>Terapeutik</Form.Label>
                        <ul>
                            {teraputik &&
                                teraputik.map((item, index) => <li key={index}>{item.nama_tindakan_intervensi}</li>)}
                        </ul>
                    </Form.Group>

                    <Form.Group className='mt-4'>
                        <Form.Label className='label mt-4'>Edukasi</Form.Label>
                        <ul>
                            {edukasi &&
                                edukasi.map((item, index) => <li key={index}>{item.nama_tindakan_intervensi}</li>)}
                        </ul>
                    </Form.Group>


                </div>

        </Sidebar>
    )

}