import React, {useEffect, useState} from 'react';
import Sidebar from '../../../components/menu/Sidebar';
import axios from '../../../axios'
import { useNavigate, useParams } from 'react-router-dom'
import { Form } from 'react-bootstrap';



export default function FormImplementasi() {

    const [kode_intervensi, setKodeIntervensi] = useState("");
    const [nama_intervensi, setNamaIntervensi] = useState("");
    const [observasi, setObservasi] = useState("");
    const [terapeutik, setTerapeutik] = useState("");
    const [edukasi, setEdukasi] = useState("");
    const [kolaborasi, setKolaborasi] = useState("");

    const {id} = useParams();
    const navigate = useNavigate();
    const token=localStorage.getItem("token");

    const getDataById = async () => {
        try {
            const res = await axios.post(`/perawat/implementasi/${id}`, {
                headers: { Authorization : `Bearer ${token}` }
            })
            setKodeIntervensi(res.data.data.kode_intervensi)
            setNamaIntervensi(res.data.data.nama_intervensi)
            setObservasi(res.data.observasi)
            setTerapeutik(res.data.terapeutik)
            setEdukasi(res.data.edukasi)
        } catch (error) {

        }
    };

    useEffect(() => {
        getDataById();
    },[]);

    return (
        <Sidebar>
            <div className='container'>
                <h2>Form Implementasi</h2>
            </div>

            <div className='container pt-5'>
                <Form className='container'>
                    <Form.Group>
                        <Form.Label>Intervensi</Form.Label>
                        <p>{nama_intervensi}</p>
                    </Form.Group>

                    <Form.Group>
                        <h5 className="mt-3">Tindakan</h5>
                        <Form.Label className='mt-2'>Observasi</Form.Label>
                        <ul>
                            {observasi && observasi.map((item, index) => 
                            <li key={index}>
                                <input className='form-check-input'type='checkbox' value="" id="" />
                                <label className='form-check-label' for="">{item}</label>
                            </li>)}
                        </ul>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label className='mt-2'>Terapeutik</Form.Label>
                        <ul>
                            {terapeutik && terapeutik.map((item, index) => 
                            <li key={index}>
                                <input className='form-check-input'type='checkbox' value="" id="" />
                                <label className='form-check-label' for="">{item}</label>
                            </li>)}
                        </ul>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label className='mt-2'>Edukasi</Form.Label>
                        <ul>
                            {edukasi && edukasi.map((item, index) => 
                            <li key={index}>
                                <input className='form-check-input'type='checkbox' value="" id="" />
                                <label className='form-check-label' for="">{item}</label>
                            </li>)}
                        </ul>
                    </Form.Group>
                </Form>
            </div>
        </Sidebar>


    )
}