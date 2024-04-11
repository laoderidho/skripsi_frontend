import React, {useEffect, useState} from 'react';
import Sidebar from '../../../components/menu/Sidebar';
import "primereact/resources/themes/saga-blue/theme.css";
import { Form, Button, Modal, Container, Col, Row} from "react-bootstrap";
import { Toolbar } from 'primereact/toolbar';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import axios from '../../../axios';
import { Link, useParams } from "react-router-dom";
import ConfirmModal from '../../../components/menu/ConfirmModal';
import { Skeleton } from 'primereact/skeleton';


export default function DaftarCatatan() {

    const [inputValue, setInputValue] = useState('');
    const [filterPasien, setFilterPasien] = useState();
    const [pasien, setPasien] = useState([]);
    const [idPasien, setIdPasien] = useState(null);
    const token = localStorage.getItem("token");
    const {id} = useParams();
    const [loading, setLoading] = useState(true);

    // Modal Rawat Inap

    const [showModalRawatInap, setShowModalRawatInap] = useState(false);
    const [dataRawatInap, setDataRawatInap] = useState('');
    const [triase, setTriase] = useState('');
    const [pasienBed, setPasienBed] = useState('');
    const [bed, setBed] = useState([]);

    const jenis_triase = [
        { label: '-', value: ''},
        { label: 'Hijau', value: 'hijau'},
        { label: 'Kuning', value: 'kuning'},
        { label: 'Merah', value: 'merah'},
        { label: 'Hitam', value: 'hitam'}
    ];

    const createBedOptions = () => {
        if (!bed || bed.length === 0) {
            return [{ value: "", label: "Pilih"}];
        } else {
            const options = [{ value: "", label:"-"}];

            bed.forEach((item, index) => {
                options.push({
                    value: item.no_bed,
                    label: item.no_bed
                });
            });
            return options;
        }
    };

    const dummyData = []

    for(let i=0; i<5; i++){
      dummyData.push(
        {
          data: <Skeleton />
        }
      )
    }

    const getBedData = async () => {
        try {
            const res = await axios.post('/admin/bed/filter', {
                headers: { Authorization: `Bearer ${token}`}
            })
            setBed(res.data.data)
        } catch (error) {

        }
    }

    const detailStatus = async () => {

        try {
            const res = await axios.post(`/pasien/rawat-inap/detailStatus/`, {
                headers: { Authorization: `Bearer ${token}`},
            });
            setDataRawatInap(res.data.message)
        } catch (error) {

        }
    }

    useEffect(()=>{
        console.log(dataRawatInap)
    },[dataRawatInap])

    const addRawatInap = async () => {
        console.log(triase, pasienBed)

        try {
            await axios.post(`/admin/perawatan/add/${idPasien}`, {
                triase: triase,
                bed: pasienBed
            },
            {
                headers: { Authorization: `Bearer ${token}`}
            });
            setShowModalRawatInap(!showModalRawatInap)
            await detailStatus();
            await setTriase("");
            await setPasienBed("")
            await getBedData();
        } catch (error) {

        }
    }

    const filteredPasien = () => {
        const filteredDiagnosa = pasien.filter((item) => {
            return (
                item.id.toString().includes(inputValue) ||
                item.nama_lengkap
                    .toString()
                    .toLowerCase()
                    .includes(inputValue.toLowerCase()) ||
                (item.triase && item.triase.toString().toLowerCase().includes(inputValue.toLowerCase()))            
            );
        });
        setFilterPasien(filteredDiagnosa);
    }
    

    useEffect(()=>{
        filteredPasien()
    },[inputValue])

    const getPasien = async (token) => {
        try {
            await axios.post("/admin/daftarpasien", {
                headers: { Authorization: `Bearer ${token}`, 
            },
            })
            .then((res) => {
                console.log(res)
                setPasien(res?.data?.data);
                setLoading(false);
            });
        } catch (error) {

        }
    };

    useEffect(()=>{
        getPasien(localStorage.getItem('token'));
        detailStatus();
        getBedData();
    }, []);

    const endContent = (
        <React.Fragment>
          <input
              className="form-control"
              id="form-width"
              type="text"
              placeholder="Search"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
        </React.Fragment>
      )

      const editClick = (id)=>{
        
        setShowModalRawatInap(!showModalRawatInap)
        setIdPasien(id)
      }


    return (
        <Sidebar>
            <div className='container'>
                <h2>Catatan Rawat Inap</h2>
            </div>
            
            <div className='container pt-5'>
                <Toolbar
                    end={endContent}>
                </Toolbar>

                <DataTable value={loading ? dummyData : (inputValue ? filterPasien : pasien) }  showGridlines tableStyle={{ minWidth: '50rem' }} paginator rows={20} className='mt-3'>
                    <Column 
                        field="" 
                        header={loading ? <Skeleton width="50px" /> : 'No'}
                        body={(rowData) => (
                            loading ? rowData.data : rowData.id
                        )}/>
                    <Column 
                        field="" 
                        header={loading ? <Skeleton width="100px" /> : 'Nama'}
                        body={(rowData) => (
                            loading ? rowData.data : rowData.nama_lengkap
                            )}/>
                    <Column 
                        header=''
                        body={(rowData) => (
                            <>
                                
                                <Link id="form-label" to={`/admin/pasien/catatan/${rowData.id}`}>
                                    <span style={{color: '#085b93'}}>Lihat Detail</span>
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="mx-1 my-2" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke-width="1.5" stroke="#085b93">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                        </svg>
                                    </span>
                                </Link>
                                
                            </>
                        )}
                    />
                    {/* <Column 
                        header=''
                        body={(rowData) => (
                            <Link 
                                className='link-theme'
                                onClick={() => editClick(rowData.id)}>
                                    Edit
                            </Link>
                        )}
                    /> */}

                </DataTable>

                {/* Modal Status */}

                <Modal
                    show={showModalRawatInap}
                    onHide={() => setShowModalRawatInap(!showModalRawatInap)} centered>
                    
                    <Modal.Header>
                        <p>Klik untuk mengubah status pasien</p>
                    </Modal.Header>
                    <Form onSubmit={addRawatInap}>
                        <Modal.Body>
                        <Form.Group className='pt-1'>
                                <Form.Label id='form-label'>Pilih Status</Form.Label>
                                <Dropdown 
                                    value={triase}
                                    onChange={(e) => setTriase(e.target.value)}
                                    options={jenis_triase}
                                    placeholder='Pilih'
                                    className='pt-1'>
                                </Dropdown>
                            </Form.Group>
                            <Form.Group className='pt-3'>
                                <Form.Label id='form-label'>Pilih Bed</Form.Label>
                                <Dropdown
                                    value={pasienBed}
                                    onChange={(e) => setPasienBed(e.target.value)}
                                    options={createBedOptions()}
                                    placeholder="Pilih"
                                    filter
                                    className='pt-1'
                                    id='dropdown-modal'>
                                </Dropdown>
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                variant="secondary"
                                onClick={() => setShowModalRawatInap(!showModalRawatInap)}>
                                    Close
                            </Button>
                            {pasienBed && triase ? (
                                <ConfirmModal
                                    onConfirm={addRawatInap}
                                    successMessage={"Data berhasil di ubah"}
                                    cancelMessage={"Data gagal di ubah"}
                                    buttonText={"Simpan"}/>
                            ) : (
                                <Button variant='primary' disabled>Simpan</Button>
                            )}
                        </Modal.Footer>
                    </Form>
                </Modal>
            </div>
            
        </Sidebar>
    )
}