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
    const [subjektif, setSubjektif] = useState('');
    const [objektif, setObjektif] = useState('');
    

    const pencapaian = [
        {label: 'Tercapai', value:'tercapai'},
        {label: 'Tercapai Sebagian', value:'tercapai_sebagian'},
        {label: 'Tidak Tercapai', value:'tidak_tercapai'}
    ];

    const perencanaan = [
        {label: 'Lanjutkan Intervensi', value: 'lanjutkan_intervensi'},
        {label: 'Hentikan Intervensi', value: 'hentikan_intervensi'},
        {label: 'Kaji Ulang', value: 'kaji_ulang'}
    ];

    const {id} = useParams();

    
    const [selectedLuaran, setSelectedLuaran] = useState('');
    const [selectedKriteriaLuaran, setSelectedKriteriaLuaran] = useState([]);


    // VALUE
    const [nama_luaran, setNamaLuaran] = useState(null);
    const [kriteria_luaran, setKriteriaLuaran] = useState(null);

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

            console.log(selectedLuaranData.kriteria_luaran);
            
            setNamaLuaran(selectedLuaranData.luaran.nama_luaran);
            setSelectedKriteriaLuaran(selectedLuaranData.kriteria_luaran);
        } catch (error) {

        }
    };

    const getPropValues = (array, prop) => {
        return array.map((item) => item[prop]);
      };

    const handleData = (dataArray, propName) => {
        const propValues = getPropValues(dataArray, propName);
        const convertedValues = propValues.join(",");
        return convertedValues;
      };

    const addLuaran = async () => {
        const handleKriteria = kriteria_luaran ? handleData(kriteria_luaran, "kriteria_luaran") : null;

        try {
            await axios.post(`perawat/luaran/add/${id}`,
            {
                nama_luaran,
                kriteria_luaran: handleKriteria,
                subjektif: subjektif,
                objektif: objektif
            },
            {
                headers: { Authorization: `Bearer ${token}`},
            });
        } catch (error) {
            console.log(addLuaran);
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
    },[selectedLuaran]);

    useEffect(()=>{
        getLuaran();
    },[])

    const getLuaran = async () => {
        try {
            await axios.post(`/perawat/luaran`,
            {
                headers: { Authorization: `Bearer $(token)`},
            })
            .then((res) => {
                setLuaran(res?.data?.data);
            });
        } catch (error) {

        }
    };


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
                            className='pt-1'
                            >
                        </Dropdown>

                        <Form.Group className='mt-5'>
                            <Form.Label>Kriteria</Form.Label>
                            <MultiSelect
                             value={kriteria_luaran}
                             disabled={!selectedLuaran}
                             options={selectedKriteriaLuaran}
                             optionLabel="nama_kriteria_luaran"
                             placeholder='pilih kriteria'
                             filter
                             className='pt-1'
                             onChange={(e)=>setKriteriaLuaran(e.value)} 
                             maxSelectedLabels={3}
                                >
                            </MultiSelect>
                        </Form.Group>

                        <Form.Group className="mt-3">
                            <h6>Subjektif</h6>
                            <Form.Control
                                as="textarea"
                                value={subjektif}
                                disabled={!selectedLuaran}
                                placeholder="Subjektif"
                                onChange={(e) => setSubjektif(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group className="mt-3">
                            <h6>Objektif</h6>
                            <Form.Control
                                as="textarea"
                                value={objektif}
                                disabled={!selectedLuaran}
                                placeholder="Objektif"
                                onChange={(e) => setObjektif(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group className='mt-3'>
                            <Form.Label>Pencapaian</Form.Label>
                            <Dropdown
                                value={selectedLuaran}
                                onChange={(e) => setSelectedLuaran(e.target.value)}
                                options={pencapaian}
                                placeholder='Pilih Pencapaian'
                                required
                                disabled={!selectedLuaran}
                                className='pt-1'>
                            </Dropdown>
                        </Form.Group>

                        <Form.Group className='mt-3'>
                            <Form.Label>Perencanaan</Form.Label>
                            <Dropdown
                                value={selectedLuaran}
                                onChange={(e) => setSelectedLuaran(e.target.value)}
                                options={perencanaan}
                                placeholder='Pilih Perencanaan'
                                required
                                disabled={!selectedLuaran}
                                className='pt-1'>
                            </Dropdown>
                        </Form.Group>

                        <Form.Group className="mt-3">
                            <h6>Catatan</h6>
                            <Form.Control
                                as="textarea"
                                value={catatan}
                                disabled={!selectedLuaran}
                                placeholder="Catatan"
                                onChange={(e) => setCatatan(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        


                    </Form.Group>
                </Form>

                <div className="d-flex justify-content-end mt-3">
                    <ConfirmModal
                    onConfirm={addLuaran}
                    successMessage={"Data berhasil ditambahkan"}
                    cancelMessage={"Data gagal ditambahkan"}
                    buttonText={"Simpan"}
                    />
                </div>
            </div>
        </Sidebar>
    )
}