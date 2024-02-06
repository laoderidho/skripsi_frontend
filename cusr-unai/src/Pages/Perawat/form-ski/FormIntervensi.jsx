import React, {useEffect, useState} from 'react';
import Sidebar from '../../../components/menu/Sidebar';
import axios from '../../../axios'
import { Form } from 'react-bootstrap';
import { Dropdown }  from 'primereact/dropdown'
import { MultiSelect } from 'primereact/multiselect';
import "primereact/resources/themes/saga-blue/theme.css";
import ConfirmModal from '../../../components/menu/ConfirmModal';

export default function FormIntervensi() {

    const [intervensi, setIntervensi] = useState([]);

    const [selectedIntervensi, setSelectedIntervensi] = useState('');
    const [selectedObservasi, setSelectedObservasi] = useState([]);
    const [selectedTerapeutik, setSelectedTerapeutik] = useState([]);
    const [selectedEdukasi, setSelectedEdukasi] = useState([]);

    const token = localStorage.getItem('token');

    // VALUE

    const [observasi, setObservasi] = useState(null);
    const [terapeutik, setTerapeutik] = useState(null);
    const [edukasi, setEdukasi] = useState(null);

    const createIntervensiOptions = () => {
        if (!intervensi || intervensi.length === 0) {
            return [
                { value: '', label: 'Pilih Intervensi'}
            ];
        } else {
            const options = [
                { value: '', label: '-'}
            ];

            intervensi.forEach((item, index) => {
                options.push({
                    value: item.id,
                    label: `${item.kode_intervensi} - ${item.nama_intervensi}`
                });
            });
            return options;
        }
    };

    const handleIntervensiChange = async () => {
        try {
            const res = await axios.post(
                `/perawat/intervensi/detail/${selectedIntervensi}`,
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem(token)}`,
                },
                }
            );

            const selectedIntervensiData = res.data;


            setSelectedObservasi(selectedIntervensiData.tindakan_observasi);
            setSelectedTerapeutik(selectedIntervensiData.tindakan_teraupetik);
            setSelectedEdukasi(selectedIntervensiData.tindakan_edukasi);

        } catch (error) {

        }
    };

    useEffect(()=> {
        const fetchData = async () => {
            try {
                await handleIntervensiChange(selectedIntervensi);
                console.log(selectedIntervensi);
                console.log(selectedObservasi);
                console.log(selectedTerapeutik);
                console.log(selectedEdukasi);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [selectedIntervensi]);

    const getIntervensi = async (token) => {
        try {
            await axios.post(`/perawat/intervensi`, {
                headers: { Authorization: `Bearer ${token}`}
            })
            .then((res) => {
                console.log(res)
                setIntervensi(res?.data?.data);
            });
        } catch (error) {

        }
    };

    useEffect(() => {
        getIntervensi(localStorage.getItem('token'))
    }, []);

    

    return (
        <Sidebar>
            <div className='container'>
                <h2>Form Intervensi</h2>
            </div>

            <div className='container'>
                <Form className='container'>
                    <Form.Group className='mt-4'>
                        <Form.Label>Intervensi</Form.Label>
                        <Dropdown
                            value={selectedIntervensi}
                            onChange={(e) => setSelectedIntervensi(e.target.value)}
                            options={createIntervensiOptions()}
                            placeholder='Pilih Intervensi'
                            filter
                            required
                            classname='pt-1'>
                        </Dropdown>

                        <Form.Group className='mt-5'>
                            <h6>Tindakan</h6>
                            <Form.Label>Observasi</Form.Label>
                            <MultiSelect
                                value={observasi}
                                onChange={(e) => setObservasi(e.target)}
                                options={selectedObservasi}
                                disabled={!selectedIntervensi}
                                placeholder='Pilih Tindakan Observasi'
                                optionLabel='nama_tindakan_intervensi'
                                className='pt-1'
                                filter>
                            </MultiSelect>
                        </Form.Group>

                        <Form.Group className='mt-3'>
                            <Form.Label>Terapeutik</Form.Label>
                            <MultiSelect
                                value={terapeutik}
                                onChange={(e) => setTerapeutik(e.target)}
                                options={selectedTerapeutik}
                                disabled={!selectedIntervensi}
                                placeholder='Pilih Tindakan Terapeutik'
                                optionLabel='nama_tindakan_intervensi'
                                className='pt-1'
                                filter>
                            </MultiSelect>
                        </Form.Group>

                        <Form.Group className='mt-3'>
                            <Form.Label>Edukasi</Form.Label>
                            <MultiSelect
                                value={edukasi}
                                onChange={(e) => setEdukasi(e.target)}
                                options={selectedEdukasi}
                                disabled={!selectedIntervensi}
                                placeholder='Pilih Tindakan Edukasi'
                                optionLabel='nama_tindakan_intervensi'
                                className='pt-1'
                                filter>
                            </MultiSelect>
                        </Form.Group>
                    </Form.Group>

                    <div className='d-flex justify-content-end mt-3'>
                        <ConfirmModal
                            // onConfirm={}
                            successMessage={"Data berhasil ditambahkan"}
                            cancelMessage={"Data gagal ditambahkan"}
                            buttonText={"Simpan"}
                            />
                    </div>
                </Form>
            </div>
        </Sidebar>
    )
}