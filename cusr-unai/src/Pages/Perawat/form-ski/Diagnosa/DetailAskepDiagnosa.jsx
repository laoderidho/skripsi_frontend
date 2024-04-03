import React, { useState, useEffect } from 'react';
import Sidebar from '../../../../../src/components/menu/Sidebar';
import { useNavigate, useParams, Link } from "react-router-dom";
import { Form } from 'react-bootstrap';
import axios from '../../../../axios';

export default function DetailAskepDiagnosa() {

    const [kode_diagnosa, setKodeDiagnosa] = useState("");
    const [nama_diagnosa, setNamaDiagnosa] = useState("");
    const [faktor_risiko, setFaktorRisiko] = useState("");
    const [penyebab_fisiologis, setPenyebabFisiologis] = useState("");
    const [penyebab_situasional, setPenyebabSituasional] = useState("");
    const [penyebab_psikologis, setPenyebabPsikologis] = useState("");
    const [penyebab_umum, setPenyebabUmum] = useState("");
    const [gejala_tanda_mayor_objektif, setGejalaTandaMayorObjektif] = useState("");
    const [gejala_tanda_mayor_subjektif, setGejalaTandaMayorSubjektif] = useState("");
    const [gejala_tanda_minor_objektif, setGejalaTandaMinorObjektif] = useState("");
    const [gejala_tanda_minor_subjektif, setGejalaTandaMinorSubjektif] = useState("");
    const [catatan, setCatatan] = useState("");

    const {id} = useParams();
    const navigate = useNavigate();
    const token=localStorage.getItem("token");

    const getDataById = async () => {
        try {
            const res = await axios.post(`/perawat/diagnosa/detail-askep-pasien/${id}`, {
                headers : { Authorization: `Bearer ${token}`}
            })

            setKodeDiagnosa(res.data.data.kode_diagnosa)
            setNamaDiagnosa(res.data.nama_diagnosa)
            setFaktorRisiko(res.data.data.faktor_risiko ? res.data.data.faktor_risiko.split(",") : ["-"]);
            setPenyebabFisiologis(res.data.penyebab_fisiologis ? res.data.penyebab_fisiologis : ["-"]);
            setPenyebabSituasional(res.data.penyebab_situasional ? res.data.penyebab_situasional : ["-"]);
            setPenyebabPsikologis(res.data.penyebab_psikologis ? res.data.penyebab_psikologis : ["-"]);
            setPenyebabUmum(res.data.penyebab_umum ? res.data.penyebab_umum : ["-"]);
            setGejalaTandaMayorObjektif(res.data.gejala_tanda_major_objektif ? res.data.gejala_tanda_major_objektif : ["-"]);
            setGejalaTandaMayorSubjektif(res.data.gejala_tanda_major_subjektif ? res.data.gejala_tanda_major_subjektif : ["-"]);
            setGejalaTandaMinorObjektif(res.data.gejala_tanda_minor_objektif ? res.data.gejala_tanda_minor_objektif : ["-"]);
            setGejalaTandaMinorSubjektif(res.data.gejala_tanda_minor_subjektif ? res.data.gejala_tanda_minor_subjektif : ["-"]);
        } catch (error) {

        }
    };

    useEffect(() => {
        getDataById();
        console.log(penyebab_fisiologis)
    },[])
    

    return (
        <Sidebar
            title='DIAGNOSA'>
            <div className="container">
                <h2>Form Diagnosa</h2>
            </div>

            <div className='container'>
                <Form.Group className='mt-4'>
                    <Form.Label  className="label mt-4">Nama Diagnosa</Form.Label>
                    <p>{nama_diagnosa}</p>
                </Form.Group>

                <Form.Group className='mt-4'>
                    <Form.Label className="label mt-4">Faktor Risiko</Form.Label>
                    <ul>
                        {faktor_risiko &&
                            faktor_risiko.map((item, index) => <li key={index}>{item}</li>)}
                    </ul>
                </Form.Group>

                <Form.Group className='mt-4'>
                    <h4 className='pt-3'>Penyebab</h4>
                    <Form.Label  className="label mt-4">Penyebab Fisiologis</Form.Label>
                    <ul>
                        {penyebab_fisiologis &&
                            penyebab_fisiologis.map((item, index) => (
                            <li key={index}>{item}</li>
                            ))}
                    </ul>
                </Form.Group>

                <Form.Group className='mt-4'>
                    <Form.Label  className="label mt-4">Penyebab Situasional</Form.Label>
                    <ul>
                        {penyebab_situasional &&
                            penyebab_situasional.map((item, index) => (
                            <li key={index}>{item}</li>
                            ))}
                    </ul>
                </Form.Group>

                <Form.Group className='mt-4'>
                    <Form.Label  className="label mt-4">Penyebab Psikologis</Form.Label>
                    <ul>
                        {penyebab_psikologis &&
                            penyebab_psikologis.map((item, index) => (
                            <li key={index}>{item}</li>
                            ))}
                    </ul>
                </Form.Group>

                <Form.Group className='mt-4'>
                    <Form.Label  className="label mt-4">Penyebab Umum</Form.Label>
                    <ul>
                        {penyebab_umum &&
                            penyebab_umum.map((item, index) => (
                            <li key={index}>{item}</li>
                            ))}
                    </ul>
                </Form.Group>

                <Form.Group className='mt-4'>
                    <h4 className='mt-3'>Gejala dan Tanda Mayor</h4>
                    <Form.Label  className="label mt-4">Subjektif</Form.Label>
                    <ul>
                        {gejala_tanda_mayor_subjektif &&
                            gejala_tanda_mayor_subjektif.map((item, index) => (
                            <li key={index}>{item}</li>
                            ))}
                    </ul>
                </Form.Group>

                <Form.Group className='mt-4'>
                    <Form.Label  className="label mt-4">Objektif</Form.Label>
                    <ul>
                        {gejala_tanda_mayor_objektif &&
                            gejala_tanda_mayor_objektif.map((item, index) => (
                            <li key={index}>{item}</li>
                            ))}
                    </ul>
                </Form.Group>

                <Form.Group className='mt-4'>
                    <h4 className='mt-3'>Gejala dan Tanda Minor</h4>
                    <Form.Label  className="label mt-4">Subjektif</Form.Label>
                    <ul>
                        {gejala_tanda_minor_subjektif &&
                            gejala_tanda_minor_subjektif.map((item, index) => (
                            <li key={index}>{item}</li>
                            ))}
                    </ul>
                </Form.Group>

                <Form.Group className='mt-4'>
                    <Form.Label  className="label mt-4">Objektif</Form.Label>
                    <ul>
                        {gejala_tanda_minor_objektif &&
                            gejala_tanda_minor_objektif.map((item, index) => (
                            <li key={index}>{item}</li>
                            ))}
                    </ul>
                </Form.Group>

                

                

                







            </div>









        </Sidebar>
    )
}