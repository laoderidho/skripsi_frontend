import React, {useEffect, useState} from 'react';
import Sidebar from '../../../components/menu/Sidebar';
import axios from '../../../axios'
import { Form } from 'react-bootstrap';
import { Dropdown }  from 'primereact/dropdown'
import { MultiSelect } from 'primereact/multiselect';
import "primereact/resources/themes/saga-blue/theme.css";
import ConfirmModal from '../../../components/menu/ConfirmModal';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

export default function FormEvaluasi() {

    const [luaran, setLuaran] = useState([]);
    const [catatan, setCatatan] = useState('');

    const [selectedLuaran, setSelectedLuaran] = useState('');
    const [selectedKriteriaLuaran, setSelectedKriteriaLuaran] = useState([]);

    // VALUE
    const [nama_luaran, setNamaLuaran] = useState(null);
    const [nama_kriteria_luaran, setNamaKriteriaLuaran] = useState(null);

    const createLuaranOptions = () => {
        if (!luaran || luaran.length === 0) {
            return [
                { value: '', label: 'Pilih Luaran'}
            ];
        } else {
            const options = [
                { value: '', label: '-'}
            ];

            luaran.forEach((item, index) => {
                options.push({
                    value: item.id,
                    label: `${item.kode_luaran} - ${item.nama_luaran}`
                });
            });
            return options;
        }
    };

    const token = localStorage.getItem('token');

    const handleLuaranChange = async () => {
        try {
            const res = await axios.post(
                `perawat/luaran/detail/${selectedLuaran}`,
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem(token)}`,
                },
                }
            );

            const selectedLuaranData = res.data;

            setSelectedKriteriaLuaran(selectedLuaranData.nama_kriteria_luaran);
        } catch (error) {

        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                await handleLuaranChange(selectedLuaran);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    },[selectedLuaran])


    return (
        <Sidebar>
            <div className='container'>
                <h2>Form Luaran</h2>
            </div>

            <div className='container'>
                <Form className='container'>
                    <Form.Group className='mt-4'>
                        <Form.Label>Luaran</Form.Label>
                        <Dropdown
                            value={selectedLuaran}
                            onChange={(e) => setSelectedLuaran(e.target.value)}
                            options={createLuaranOptions()}
                            placeholder='Pilih Luaran'
                            filter
                            required
                            className='pt-1'>
                        </Dropdown>

                        <Form.Group className='mt-5'>
                            <Form.Label>Kriteria</Form.Label>
                            <MultiSelect
                                value={nama_kriteria_luaran}
                                onChange={(e) => setNamaKriteriaLuaran(e.target)}
                                options={selectedKriteriaLuaran}
                                disabled={!selectedLuaran}
                                placeholder='Pilih Kriteria'
                                optionlLabel='nama'>

                            </MultiSelect>
                        </Form.Group>
                    </Form.Group>
                </Form>
            </div>
        </Sidebar>
    )
}