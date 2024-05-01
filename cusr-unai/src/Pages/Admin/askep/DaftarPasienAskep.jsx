import React, {useEffect, useState} from 'react';
import Sidebar from '../../../components/menu/SidebarAdmin';
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
import { BreadCrumb } from 'primereact/breadcrumb';


export default function DaftarPasienAskep() {

    const [inputValue, setInputValue] = useState('');
    const [filterPasien, setFilterPasien] = useState();
    const [pasien, setPasien] = useState([]);
    const [idPasien, setIdPasien] = useState(null);
    const token = localStorage.getItem("token");
    const {id} = useParams();
    const [loading, setLoading] = useState(true);
    const isMobile = window.innerWidth <=600;

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

      const items = [{label: 'Admin'}, {label: 'Pasien'}, {label: ''}]


    return (
        <React.Fragment>
            {isMobile ? (
                <>
                    <Sidebar>
                        <div className="container d-flex align-items-center form-margin container-breadcrumb">
                              <span>
                              <Link to={`/admin/pasien/catatan`}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width='17' height='17' fill='#fff' viewBox="0 0 24 24" stroke-width="1.5" stroke="#085b93" class="w-6 h-6 mb-3">
                                  <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                  </svg>
                              </Link>
                              </span>
                              <BreadCrumb model={items} />

                              <span>
                              <p className='title-breadcrumb'>ASKEP</p>
                              </span>
                        </div>
                        <div className='container'>
                            <h3>Laporan ASKEP</h3>
                        </div>

                        <div className="container mt-3">
                            <input
                                className="form-control custom-search mt-2"
                                id="form-width"
                                type="text"
                                placeholder="Search"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                />  
                        </div> 
                        
                        <div className='container'>
                            <DataTable value={loading ? dummyData : (inputValue ? filterPasien : pasien) }  showGridlines tableStyle={{ minWidth: '2rem' }} paginator rows={20} className='mt-1'>
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
                                            
                                            <Link id="form-label" className='btn dashboard-button d-flex justify-content-center align-items-center' to={`/admin/pasien/catatan/${rowData.id}`}>
                                                <span style={{color: '#085b93', marginTop: '0.1rem'}}>Lihat</span>
                                                <span>
                                                    <svg xmlns="http://www.w3.org/2000/svg" style={{marginLeft: '0.4rem', marginBottom: '0.1rem'}} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke-width="1.5" stroke="#085b93">
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
                </>
            ) : (
                <>
                    <Sidebar>
                        <div className="container d-flex align-items-center container-breadcrumb">
                                <span>
                                <Link to={`/admin/pasien/catatan`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width='17' height='17' fill='#fff' viewBox="0 0 24 24" stroke-width="1.5" stroke="#085b93" class="w-6 h-6 mb-3">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                    </svg>
                                </Link>
                                </span>
                                <BreadCrumb model={items} />

                                <span>
                                <p className='title-breadcrumb'>ASKEP</p>
                                </span>
                            </div>
                            <div className='container'>
                                <h3>Laporan Asuhan Keperawatan</h3>
                        </div>
                        
                        <div className='container pt-5'>
                            <Toolbar
                                end={endContent}>
                            </Toolbar>

                            <DataTable value={loading ? dummyData : (inputValue ? filterPasien : pasien) }  showGridlines tableStyle={{ minWidth: '2rem' }} paginator rows={20} className='mt-3'>
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
                                            
                                            <Link id="form-label" className='btn dashboard-button d-flex justify-content-center align-items-center' to={`/admin/pasien/askep/${rowData.id}`}>
                                                <span style={{color: '#085b93', marginTop: '0.2rem'}}>Lihat</span>
                                                <span>
                                                    <svg xmlns="http://www.w3.org/2000/svg" style={{marginLeft: '0.4rem', marginBottom: '0.1rem'}} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke-width="1.5" stroke="#085b93">
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
                </>
            )}
        </React.Fragment>
    )
}