import React, {useEffect, useState} from 'react';
import { Accordion, Button, Card, Form} from 'react-bootstrap';
import axios from '../../../axios'
import "../../../../src/style/accordion.css";
import { Combobox } from '@headlessui/react';

export default function FormDiagnosa() {

    const [diagnosa, setDiagnosa] = useState([])

    const [selectedDiagnosa, setSelectedDiagnosa] = useState("");
    const [selectedFaktorRisiko, setSelectedFaktorRisiko] = useState([]);
    const [selectedPenyebabFisiologis, setSelectedPenyebabFisiologis] = useState([]);
    const [selectedPenyebabSituasional, setSelectedPenyebabSituasional] = useState([]);
    const [selectedPenyebabPsikologis, setSelectedPenyebabPsikologis] = useState([]);

    const token=localStorage.getItem("token");
    

    const handleDiagnosaChange = async (e) => {
        setSelectedDiagnosa(e.target.value);

        try {
            const res = await axios.post(`/perawat/diagnosa/detail/${e.target.value}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem(token)}`}
            });

            const selectedDiagnosaData = res.data;
            
            setSelectedFaktorRisiko(selectedDiagnosaData.selectedFaktorRisiko)
            // setSelectedPenyebabFisiologis(selectedDiagnosaData.penyebab_fisiologis)
            console.log(selectedDiagnosaData.penyebab_fisiologis)

            // if (selectedDiagnosaData) {
                // setSelectedFaktorRisiko(selectedDiagnosaData.faktor_risiko);
               // setSelectedPenyebabFisiologis(selectedDiagnosaData.penyebab_fisiologis);
               // setSelectedPenyebabSituasional(selectedDiagnosaData.penyebab_situasional);
                
            // } 
        } catch (error) {
            
        }
    }

    

    const getDiagnosa = async (token) => {
        try {
            await axios.post("/perawat/diagnosa", {
                headers: { Authorization: `Bearer $(token)`}
            })
            .then((res) => {
                console.log(res)
                setDiagnosa(res?.data?.data);
            });
        } catch (error) {
            
        }
    };

    useEffect(() => {
        getDiagnosa(localStorage.getItem('token'))
    }, [])

    // console.log(diagnosa)

    return (
        <div>
            <Accordion defaultActiveKey="0">
                <Accordion.Item>
                    <Accordion.Header>Diagnosa</Accordion.Header>
                        <Accordion.Body className='accordion-form'>
                            <Card>
                                <Card.Body>
                                    <Form className='container'>
                                        <Form.Group className='mt-4'>
                                            <Form.Label>Diagnosa</Form.Label>

                                            {/* <Combobox value={selectedDiagnosa} onChange={handleDiagnosaChange}>
                                                <Combobox.Input onChange={(event) => setQuery(event.target.value)} />
                                                



                                        
                                            </Combobox> */}
                                            {/* <Form.Select
                                                id="form-control-input"
                                                onChange={handleDiagnosaChange}
                                                value={selectedDiagnosa}
                                                required
                                            >
                                            {diagnosa.map((item, index) => (
                                                <option key={index} value={item.id}>
                                                    <span>{item.kode_diagnosa}</span> - <span>{item.nama_diagnosa}</span>
                                                </option>
                                            ))}
                                            </Form.Select> */}
                                        </Form.Group>

                                        <Form.Group className='mt-3'>
                                            <Form.Label>Faktor Risiko</Form.Label>
                                            <Form.Select
                                                id="form-control-input"
                                                value={selectedFaktorRisiko}
                                                disabled={!selectedDiagnosa}
                                            >
                                            <option value={selectedFaktorRisiko}>{selectedFaktorRisiko}</option>
                                            </Form.Select>
                                        </Form.Group>

                                        <Form.Group className='mt-5'>
                                            <h6>Penyebab</h6>
                                            <Form.Label>Penyebab Fisiologis</Form.Label>
                                            <Form.Select
                                                id="form-control-input"
                                                value={selectedPenyebabFisiologis}
                                                disabled={!selectedDiagnosa}
                                            >
                                            <option value={selectedPenyebabFisiologis}>{selectedPenyebabFisiologis}</option>
                                            </Form.Select>
                                        </Form.Group>

                                        <Form.Group className='mt-3'>
                                            <Form.Label>Penyebab Situasional</Form.Label>
                                            <Form.Select
                                                id="form-control-input"
                                                value={selectedPenyebabSituasional}
                                                disabled={!selectedDiagnosa}
                                            >
                                            <option value={selectedPenyebabSituasional}>{selectedPenyebabSituasional}</option>
                                            </Form.Select>
                                        </Form.Group>
                                        
                                        
                                            
                                            
                                        
                                    </Form>
                                        
                                </Card.Body>
                            </Card>
                        </Accordion.Body>
                </Accordion.Item>
                
            </Accordion> 

            
        </div>
    );
}