import React, {useEffect, useState} from "react";
import Sidebar from "../../../components/menu/SidebarAdmin";
import { Form, Button, Table, Breadcrumb, Modal, Row, Col } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import ConfirmModal from '../../../components/menu/ConfirmModal';
import axios from '../../../axios'
import { Dropdown } from 'primereact/dropdown';
import { Toolbar } from 'primereact/toolbar';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import "primereact/resources/themes/saga-blue/theme.css";
import { Skeleton } from 'primereact/skeleton';
import { BreadCrumb } from 'primereact/breadcrumb';
const isMobile = window.innerWidth <=600;


export default function DaftarBed() {

    const [showModal, setShowModal] = useState(false);
    const [bed, setBed] = useState([]);
    const [lantai, setLantai] = useState([]);
    const [nama_fasilitas, setNamaFasilitas] = useState([]);
    const [jenis_ruangan, setJenisRuangan] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    

    const [newLantai, setNewLantai] = useState('');
    const [newRuangan, setNewRuangan] = useState('');
    const [newFasilitas, setNewFasilitas]= useState('');
    const [newBed, setNewBed] = useState("");
    const {id} = useParams();
    const [showModalStatus, setShowModalStatus] = useState(false);

    const [inputValue, setInputValue] = useState("");
    const [filterBed, setFilterBed] = useState("");

    const [kesediaan, setKesediaan] = useState('');
    const [dataStatus,  setDataStatus] = useState('');

    const [showDropdownFacility, setShowDropdownFacility] = useState(true);
    const [showDropdownLantai, setShowDropdownLantai] = useState(true);
    const [showDropdownRuangan, setShowDropdownRuangan] = useState(true);
    const [showOtherFacility, setShowOtherFacility] = useState(false);
    const [showOtherFloor, setShowOtherFloor] = useState(false);
    const [showOtherRoom, setShowOtherRoom] = useState(false);

    const [idBed, setIdBed] = useState(null);

    const handleCheckboxChange = (e, dropdownType) => {
        if (dropdownType === 'nama_fasilitas') {
            setShowDropdownFacility(!e.target.checked);
            setShowOtherFacility(e.target.checked);
        } else if (dropdownType === 'lantai') {
            setShowDropdownLantai(!e.target.checked);
            setShowOtherFloor(e.target.checked);
        } else if (dropdownType === 'jenis_ruangan') {
            setShowDropdownRuangan(!e.target.checked);
            setShowOtherRoom(e.target.checked);
        };
        
    };

    const deleteForm = async (id) => {
        try {
            const res = await axios.post(`/admin/bed/delete/${id}`, {
                headers: { Authorization: `Bearer ${token}`}
            });

            getData();
        } catch (error) {
            
        }
    }
 

    const editForm = async () => {
        try {
            const res = await axios.post(`/admin/bed/edit/${idBed}`, {
                no_bed: newBed,
                lantai: newLantai,
                nama_fasilitas: newFasilitas,
                jenis_ruangan: newRuangan
            }, 
            {
                headers: { Authorization: `Bearer ${token}`}
            })
            setShowModal(false);
            getData();
            navigate("/admin/bed");
        } catch (error) {

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

    const handleShowEdit = () => {
        editForm();
    }


    const handleCLoseEdit = () => setShowModal(false);

    const sedia = [
        { name: 'Tersedia', code: 'T' },
        { name: 'Tidak Tersedia', code: 'TS' }
    ];

    const addBed = async () => {
        try {
            const res = await axios.post(`/pasien/add-bed/${id}`, {
                kesediaan: kesediaan,
                status: 1
            },
            {
                headers: { Authorization: `Bearer ${token}` }
            });
        } catch (error) {

        }
    };

    const filteredBed = () => {
        const filteredRoom = bed.filter((item) => {
            return (
                item.nama_fasilitas
                    .toString()
                    .toLowerCase()
                    .includes(inputValue.toLowerCase()) ||
                item.lantai
                    .toString()
                    .toLowerCase()
                    .includes(inputValue.toLowerCase()) ||
                item.no_bed
                    .toString()
                    .toLowerCase()
                    .includes(inputValue.toLowerCase()) ||
                item.jenis_ruangan
                    .toString()
                    .toLowerCase()
                    .includes(inputValue.toLowerCase()) ||
                item.status.toString().toLowerCase().includes(inputValue.toLowerCase()) 
            );
        });
        setFilterBed(filteredRoom);
    }

    const detailSedia = async () => {
        try{
            const res = await axios.post(`/pasien/bed/status/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setDataStatus(res.data.data.message)
        } catch (error) {

        }
    };

    useEffect(() => {
        getData();
        filteredBed();
    }, [inputValue]);

    useEffect(() => {
        
        if (showModal) {
            detailSedia();
            getFasilitas();
            getRuangan();
            getLantai();
        }
    },[showModal]);

    useEffect(() => {
        if (!showModal) {

        }
    }, [showModal]);

    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const handleShow = () => setShowModal(true);
    
    const handleClose = () => {
        setShowModal(false);
        setNewBed("");
        setNewLantai("");
        setNewFasilitas("");
        setNewRuangan("");
    };

    const getData = async (token) => {
        try {
            await axios.post(`/admin/bed`, {
                headers: { Authorization : `Bearer $(token)` }
            })
            .then((res) => {
                console.log(res)
                setBed(res?.data?.data);
                setLoading(false);
            });
        } catch (error) {
        } 
    };

    const getFasilitas = async (token) => {
        try {
            await axios.post(`/admin/ruangan/nama-fasilitas`, {
                headers: { Authorization: `Bearer ${token}`},
            })
            .then((res) => {
                console.log(res)
                setNamaFasilitas(res?.data?.data)
            });
        } catch (error) {

        }
    }

    const getRuangan = async (token) => {
        try {
            await axios.post(`/admin/ruangan/jenis-ruangan`, {
                headers : { Authorization : `Bearer ${token}`},
            })
            .then((res) => {
                console.log(res)
                setJenisRuangan(res?.data?.data)
            })
        } catch (error) {

        }
    }

    const getLantai = async (token) => {
        try {
            await axios.post(`/admin/ruangan/lantai`, {
                headers: { Authorization: `Bearer ${token}`},
            })
            .then((res) => {
                console.log(res)
                setLantai(res?.data?.data)
            })
        } catch (error) {

        }
    }

    const submitForm = async () => {
        try {
            await axios.post(`/admin/bed/tambah`, {
                no_bed: newBed,
                lantai: newLantai,
                nama_fasilitas: newFasilitas,
                jenis_ruangan: newRuangan
            },
            {
                headers: { Authorization: `Bearer ${token}`}
            });
            setShowModal(false);
            getData();
            navigate("/admin/bed");
            setNewBed("");
            setNewLantai("");
            setNewFasilitas("");
            setNewRuangan("");

        } catch (error) {

        }
    };

    const handleNewFasilitasChange = (e) => {
        const selectedFasilitas = e.target.value;
        setNewFasilitas(selectedFasilitas);
        // Kosongkan nilai lantai, no_bed, dan jenis_ruangan saat edit
        if (isEditing) {
            setNewLantai("");
            setNewBed("");
            setNewRuangan("");
        }
    };

    
    

    // const fasilitas_options = [
    //     { label: '-', value: ''},
    //     { label: 'Klinik Pratama Advent Taman Sari', value: 'klinik_pratama_advent'},
    //     { label: 'Klinik Universitas Advent Indonesia', value: 'klinik_unai'},
    //     { label: 'Rumah Sakit Advent Bandung', value: 'rs_advent_bandung'}
    // ];

    const createFasilitasOptions = () => {
        if (!bed || bed.length === 0) {
            return [{ value: "", label: "-"}];
        } else {
            const options = [{ value: "", label:"-"}];

            bed.forEach((item, index) => {
                options.push({
                    value: item.id,
                    label: `${item.nama_fasilitas} - ${item.nama_fasilitas}`,
                });
            });
            return options;
        }
      };
    

    // const  ruangan_options = [
    //     { label: '-', value: ''},
    //     { label: 'VIP', value: 'vip'},
    //     { label: 'Premium', value: 'premium'},
    //     { label: 'Standard', value: 'standard'}
    // ];

    const endContent = (
        <React.Fragment>
            <input 
                className="form-control"
                id="form_width"
                type="text"
                placeholder="Search"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
        </React.Fragment>
    );

    const startContent = (
        <React.Fragment>
            <Link
                onClick={handleShow}
                className="btn blue-button-table">Tambah</Link>
        </React.Fragment>
    )

    const editClick = (id, nama_fasilitas, lantai, no_bed, jenis_ruangan) => {
        console.log(id, nama_fasilitas, lantai, no_bed, jenis_ruangan)  
        
        setNewFasilitas(nama_fasilitas);
        setNewLantai(lantai);
        setNewBed(no_bed);
        setNewRuangan(jenis_ruangan);
        setIdBed(id);
        setIsEditing(true);
        setShowModal(true);
    }

    // const deleteClick = (id) => {
    //     deleteForm(id);

    //     setNewFasilitas('');
    //     setNewLantai('');
    //     setNewBed('');
    //     setNewRuangan('');
    //     setIdBed('');
    // }

    const items = [{label: 'Rawat Inap'}, {label: ''}]


    return (
        <React.Fragment>
            {isMobile ? (
                <>
                    <Sidebar>
                        <div className="container d-flex align-items-center form-margin container-breadcrumb">
                            <span>
                                <Link to={`/admin/bed`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width='17' height='17' fill='#fff' viewBox="0 0 24 24" stroke-width="1.5" stroke="#085b93" class="w-6 h-6 mb-3">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                    </svg>
                                </Link>
                            </span>
                                <BreadCrumb model={items} />

                                <span>
                                    <p className='title-breadcrumb'>Daftar Kamar</p>
                                </span>
                        </div>
                        <div className='container'>
                            <h3>Daftar Kamar</h3>
                        </div>

                        <div className="container mt-3">
                            <Link
                            onClick={handleShow}
                            className="btn blue-button-table">Tambah</Link>
                            <input
                                className="form-control custom-search mt-2"
                                id="form-width"
                                type="text"
                                placeholder="Search"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                />  
                        </div> 

                        <div className="container">

                            <DataTable value={loading ? dummyData : (inputValue ? filterBed : bed)}  showGridlines tableStyle={{ minWidth: '2rem' }} paginator rows={20} className='mt-1'>
                                <Column 
                                    field="" 
                                    header={loading ? <Skeleton width="120px" /> : 'Fasilitas Kesehatan'}
                                    body={(rowData) => (
                                        loading ? rowData.data : rowData.nama_fasilitas
                                    )}/>
                                <Column 
                                    field="" 
                                    header={loading ? <Skeleton width="50px" /> : 'Lantai'}
                                    body={(rowData) => (
                                        loading ? rowData.data : rowData.lantai
                                    )}/>
                                <Column 
                                    field="" 
                                    header={loading ? <Skeleton width="60px" /> : 'No Kamar'}
                                    body={(rowData) => (
                                        loading ? rowData.data : rowData.no_bed
                                    )}/>
                                {/* <Column 
                                    field="" 
                                    header={loading ? <Skeleton width="80px" /> : 'Jenis Ruangan'}
                                    body={(rowData) => (
                                        loading ? rowData.data : rowData.jenis_ruangan
                                    )}/> */}
                                <Column 
                                    field="" 
                                    header={loading ? <Skeleton width="50px" /> : 'Status'}
                                    body={(rowData) => (
                                        <>
                                            <div>
                                                {loading ? <Skeleton width="50px"/> : (rowData.status === 0 ? "Kosong" : "Terisi") }
                                            </div>
                                        </>
                                    )}/>
                                {/* <Column header='' body={(rowData) => (
                                    <Link
                                        className="link-theme"
                                        onClick={() => editClick(rowData.id, rowData.nama_fasilitas, rowData.lantai, rowData.no_bed, rowData.jenis_ruangan, rowData.status)}
                                        >
                                            Edit
                                    </Link>
                                )} />  */}
                                {/* <Column header='' body={(rowData) => (
                                    <ConfirmModal 
                                        onConfirm={()=> deleteForm(rowData.id)}
                                        successMessage={"Data berhasil dihapus"}
                                        cancelMessage= {"Data gagal dihapus"}
                                        buttonText={"Delete"}       
                                        className='link-theme'
                                    />
                                )} /> */}

                            </DataTable>
                        </div>



                                {/* Modal Bed */}

                                <Modal  
                                    show={showModal} 
                                    onHide={handleClose} centered>

                                    <Modal.Header>
                                        <p>Tambah Kamar</p>
                                    </Modal.Header>
                                    <Form onSubmit={addBed}>
                                        <Modal.Body>
                                            <Row className="pt-1">
                                                <Col md={8}>
                                                    <Form.Group>
                                                        <Form.Label id="form-label">Fasilitas Kesehatan</Form.Label>
                                                        {showDropdownFacility && (
                                                            <Form.Select
                                                                value={newFasilitas}
                                                                onChange={(e) => handleNewFasilitasChange(e, 'nama_fasilitas')}
                                                            >
                                                            <option 
                                                                value="">-</option>
                                                            {nama_fasilitas.map(item=>(
                                                                <option value={item.nama_fasilitas}>{item.nama_fasilitas}</option>
                                                            ))}
                                                            </Form.Select>
                                                        )}

                                                        <div>
                                                            {showOtherFacility && (
                                                                <Form.Control
                                                                    type="text"
                                                                    placeholder="e.g. Fasilitas Lain"
                                                                    value={newFasilitas}
                                                                    onChange={(e) => setNewFasilitas(e.target.value)}
                                                                    />
                                                            )}
                                                            <input className="form-check-input" type="checkbox" onChange={(e) => handleCheckboxChange(e, 'nama_fasilitas')}/>
                                                            <Form.Label className="px-2" id="form-label">Fasilitas lainnya</Form.Label>
                                                        </div>
                                                    </Form.Group>
                                                </Col>
                                                <Col>
                                                    <Form.Group>
                                                        <Form.Label id="form-label">Lantai</Form.Label>
                                                        {showDropdownLantai && (
                                                            <Form.Select
                                                                value={newLantai}
                                                                onChange={(e) => setNewLantai(e.target.value)}
                                                                >
                                                                    <option value="">-</option>
                                                                    {lantai.map(item=>(
                                                                        <option value={item.lantai}>{item.lantai}</option>
                                                                    ))}
                                                            </Form.Select>
                                                        )}

                                                        <div>
                                                            {showOtherFloor && (
                                                                <Form.Control
                                                                type="text"
                                                                placeholder="e.g. Lantai 1"
                                                                value={newLantai}
                                                                onChange={(e) => setNewLantai(e.target.value)}
                                                                />
                                                            )}
                                                            <input className="form-check-input" type="checkbox" onChange={(e) => handleCheckboxChange(e, 'lantai')}/>
                                                            <Form.Label className="px-2" id="form-label">Lantai lainnya</Form.Label>
                                                        </div>

                                                        
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row className="pt-1">
                                                <Col md={8}>
                                                    <Form.Label id="form-label">Jenis Ruangan</Form.Label>
                                                    {showDropdownRuangan && (
                                                        <Form.Select
                                                            value={newRuangan}
                                                            onChange={(e) => setNewRuangan(e.target.value)}
                                                                >
                                                                <option value="">-</option>
                                                                {jenis_ruangan.map(item=>(
                                                                    <option value={item.jenis_ruangan}>{item.jenis_ruangan}</option>
                                                                ))}
                                                        </Form.Select>
                                                    )}

                                                    <div>
                                                        {showOtherRoom && (
                                                            <Form.Control
                                                                type="text"
                                                                placeholder="e.g. Ruangan Lain"
                                                                value={newRuangan}
                                                                onChange={(e) => setNewRuangan(e.target.value)}
                                                                />
                                                        )}
                                                        <input className="form-check-input" type="checkbox" onChange={(e) => handleCheckboxChange(e, 'jenis_ruangan')}/>
                                                        <Form.Label className="px-2" id="form-label">Ruangan lainnya</Form.Label>
                                                    </div>
                                                </Col>
                                                <Col md={4}>
                                                    <Form.Group>
                                                        <Form.Label id="form-label">No Kamar</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="e.g. 205"
                                                            value={newBed}
                                                            onChange={(e) => setNewBed(e.target.value)}
                                                        />
                                                    </Form.Group>
                                                    

                                                    {/* <Dropdown
                                                        value={newRuangan}
                                                        onChange={(e) => setNewRuangan(e.target.value)}
                                                        options={ruangan_options}
                                                        className="pt-1"
                                                        >
                                                    </Dropdown> */}

                                                </Col>
                                            </Row>

                                    </Modal.Body>
                                    <Modal.Footer>

                                        <Button 
                                            onClick={() => setShowModal(false)}
                                            variant="secondary">               
                                            Cancel
                                        </Button>
                                        <ConfirmModal 
                                            onConfirm={ isEditing ? editForm : submitForm }
                                            successMessage={isEditing ? "Data berhasil diubah" : "Data berhasil ditambahkan"}
                                            cancelMessage= {isEditing ?  "Data gagal diubah" : "Data gagal ditambahkan"}
                                            buttonText={isEditing ? "Edit" : "Simpan"}       
                                        />
                                    </Modal.Footer>
                                    </Form>
                                </Modal>

                                {/* Modal Status */}

                                <Modal  
                                    show={showModalStatus} 
                                    onHide={() => setShowModalStatus(!showModalStatus)} centered>
                                    <Modal.Header>
                                        <Modal.Title>Tambah Bed Baru</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form>
                                            <Form.Group>
                                                <Form.Label>Tambah</Form.Label>
                                                <Dropdown
                                                    value={kesediaan}
                                                    options={sedia}
                                                    onChange={(e)=>setKesediaan(e.target.value)}
                                                    className="pt-1"
                                                    placeholder="Pilih"
                                                >
                                                </Dropdown>

                                                    <ConfirmModal 
                                                        onConfirm={submitForm}
                                                        successMessage="Data berhasil Diubah"
                                                        cancelMessage="Data gagal Diubah"
                                                        buttonText="Simpan"
                                                        
                                                    />

                                                    <button 
                                                        onClick={() => setShowModal(false)}
                                                        className="btn d-flex justify-content-center align-items-center red-button"
                                                        style={{ marginRight: '10px'}}
                                                        >Cancel
                                                    </button>
                                            
                                            </Form.Group>
                                        </Form>
                                    </Modal.Body>
                                </Modal>
                    </Sidebar>
                </>
            ) : (
                <>
                    <Sidebar>
                        <div className="container d-flex align-items-center form-margin container-breadcrumb">
                                <span>
                                    <Link to={`/admin/pasien/rawat-inap`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width='17' height='17' fill='#fff' viewBox="0 0 24 24" stroke-width="1.5" stroke="#085b93" class="w-6 h-6 mb-3">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                        </svg>
                                    </Link>
                                </span>
                                    <BreadCrumb model={items} />

                                    <span>
                                        <p className='title-breadcrumb'>Kamar</p>
                                    </span>
                            </div>
                            <div className='container'>
                                <h3>Daftar Kamar</h3>
                            </div>

                        <div className="container pt-5">
                            <Toolbar
                                start={startContent}
                                end={endContent}>
                            </Toolbar>

                            <DataTable value={loading ? dummyData : (inputValue ? filterBed : bed)}  showGridlines tableStyle={{ minWidth: '50rem' }} paginator rows={20} className='mt-3'>
                                <Column 
                                    field="" 
                                    header={loading ? <Skeleton width="120px" /> : 'Fasilitas Kesehatan'}
                                    body={(rowData) => (
                                        loading ? rowData.data : rowData.nama_fasilitas
                                    )}/>
                                <Column 
                                    field="" 
                                    header={loading ? <Skeleton width="50px" /> : 'Lantai'}
                                    body={(rowData) => (
                                        loading ? rowData.data : rowData.lantai
                                    )}/>
                                <Column 
                                    field="" 
                                    header={loading ? <Skeleton width="60px" /> : 'No Kamar'}
                                    body={(rowData) => (
                                        loading ? rowData.data : rowData.no_bed
                                    )}/>
                                <Column 
                                    field="" 
                                    header={loading ? <Skeleton width="80px" /> : 'Jenis Ruangan'}
                                    body={(rowData) => (
                                        loading ? rowData.data : rowData.jenis_ruangan
                                    )}/>
                                <Column 
                                    field="" 
                                    header={loading ? <Skeleton width="50px" /> : 'Status'}
                                    body={(rowData) => (
                                        <>
                                            <div>
                                                {loading ? <Skeleton width="50px"/> : (rowData.status === 0 ? "Kosong" : "Terisi") }
                                            </div>
                                        </>
                                    )}/>
                                <Column header='' body={(rowData) => (
                                    <Link
                                        className="link-theme"
                                        onClick={() => editClick(rowData.id, rowData.nama_fasilitas, rowData.lantai, rowData.no_bed, rowData.jenis_ruangan, rowData.status)}
                                        >
                                            Edit
                                    </Link>
                                )} /> 
                                <Column header='' body={(rowData) => (
                                    <ConfirmModal 
                                        onConfirm={()=> deleteForm(rowData.id)}
                                        successMessage={"Data berhasil dihapus"}
                                        cancelMessage= {"Data gagal dihapus"}
                                        buttonText={"Delete"}       
                                        className='link-theme'
                                    />
                                )} />

                            </DataTable>
                        </div>



                                {/* Modal Bed */}

                                <Modal  
                                    show={showModal} 
                                    onHide={handleClose} centered>

                                    <Modal.Header>
                                        <p>Tambah Kamar</p>
                                    </Modal.Header>
                                    <Form onSubmit={addBed}>
                                        <Modal.Body>
                                            <Row className="pt-1">
                                                <Col md={8}>
                                                    <Form.Group>
                                                        <Form.Label id="form-label">Fasilitas Kesehatan</Form.Label>
                                                        {showDropdownFacility && (
                                                            <Form.Select
                                                                value={newFasilitas}
                                                                onChange={(e) => handleNewFasilitasChange(e, 'nama_fasilitas')}
                                                            >
                                                            <option 
                                                                value="">-</option>
                                                            {nama_fasilitas.map(item=>(
                                                                <option value={item.nama_fasilitas}>{item.nama_fasilitas}</option>
                                                            ))}
                                                            </Form.Select>
                                                        )}

                                                        <div>
                                                            {showOtherFacility && (
                                                                <Form.Control
                                                                    type="text"
                                                                    placeholder="e.g. Fasilitas Lain"
                                                                    value={newFasilitas}
                                                                    onChange={(e) => setNewFasilitas(e.target.value)}
                                                                    />
                                                            )}
                                                            <input className="form-check-input" type="checkbox" onChange={(e) => handleCheckboxChange(e, 'nama_fasilitas')}/>
                                                            <Form.Label className="px-2" id="form-label">Fasilitas lainnya</Form.Label>
                                                        </div>
                                                    </Form.Group>
                                                </Col>
                                                <Col>
                                                    <Form.Group>
                                                        <Form.Label id="form-label">Lantai</Form.Label>
                                                        {showDropdownLantai && (
                                                            <Form.Select
                                                                value={newLantai}
                                                                onChange={(e) => setNewLantai(e.target.value)}
                                                                >
                                                                    <option value="">-</option>
                                                                    {lantai.map(item=>(
                                                                        <option value={item.lantai}>{item.lantai}</option>
                                                                    ))}
                                                            </Form.Select>
                                                        )}

                                                        <div>
                                                            {showOtherFloor && (
                                                                <Form.Control
                                                                type="text"
                                                                placeholder="e.g. Lantai 1"
                                                                value={newLantai}
                                                                onChange={(e) => setNewLantai(e.target.value)}
                                                                />
                                                            )}
                                                            <input className="form-check-input" type="checkbox" onChange={(e) => handleCheckboxChange(e, 'lantai')}/>
                                                            <Form.Label className="px-2" id="form-label">Lantai lainnya</Form.Label>
                                                        </div>

                                                        
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row className="pt-1">
                                                <Col md={8}>
                                                    <Form.Label id="form-label">Jenis Ruangan</Form.Label>
                                                    {showDropdownRuangan && (
                                                        <Form.Select
                                                            value={newRuangan}
                                                            onChange={(e) => setNewRuangan(e.target.value)}
                                                                >
                                                                <option value="">-</option>
                                                                {jenis_ruangan.map(item=>(
                                                                    <option value={item.jenis_ruangan}>{item.jenis_ruangan}</option>
                                                                ))}
                                                        </Form.Select>
                                                    )}

                                                    <div>
                                                        {showOtherRoom && (
                                                            <Form.Control
                                                                type="text"
                                                                placeholder="e.g. Ruangan Lain"
                                                                value={newRuangan}
                                                                onChange={(e) => setNewRuangan(e.target.value)}
                                                                />
                                                        )}
                                                        <input className="form-check-input" type="checkbox" onChange={(e) => handleCheckboxChange(e, 'jenis_ruangan')}/>
                                                        <Form.Label className="px-2" id="form-label">Ruangan lainnya</Form.Label>
                                                    </div>
                                                </Col>
                                                <Col md={4}>
                                                    <Form.Group>
                                                        <Form.Label id="form-label">No Kamar</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="e.g. 205"
                                                            value={newBed}
                                                            onChange={(e) => setNewBed(e.target.value)}
                                                        />
                                                    </Form.Group>
                                                    

                                                    {/* <Dropdown
                                                        value={newRuangan}
                                                        onChange={(e) => setNewRuangan(e.target.value)}
                                                        options={ruangan_options}
                                                        className="pt-1"
                                                        >
                                                    </Dropdown> */}

                                                </Col>
                                            </Row>

                                    </Modal.Body>
                                    <Modal.Footer>

                                        <Button 
                                            onClick={() => setShowModal(false)}
                                            variant="secondary">               
                                            Cancel
                                        </Button>
                                        <ConfirmModal 
                                            onConfirm={ isEditing ? editForm : submitForm }
                                            successMessage={isEditing ? "Data berhasil diubah" : "Data berhasil ditambahkan"}
                                            cancelMessage= {isEditing ?  "Data gagal diubah" : "Data gagal ditambahkan"}
                                            buttonText={isEditing ? "Edit" : "Simpan"}       
                                        />
                                    </Modal.Footer>
                                    </Form>
                                </Modal>

                                {/* Modal Status */}

                                <Modal  
                                    show={showModalStatus} 
                                    onHide={() => setShowModalStatus(!showModalStatus)} centered>
                                    <Modal.Header>
                                        <Modal.Title>Tambah Bed Baru</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form>
                                            <Form.Group>
                                                <Form.Label>Tambah</Form.Label>
                                                <Dropdown
                                                    value={kesediaan}
                                                    options={sedia}
                                                    onChange={(e)=>setKesediaan(e.target.value)}
                                                    className="pt-1"
                                                    placeholder="Pilih"
                                                >
                                                </Dropdown>

                                                    <ConfirmModal 
                                                        onConfirm={submitForm}
                                                        successMessage="Data berhasil Diubah"
                                                        cancelMessage="Data gagal Diubah"
                                                        buttonText="Simpan"
                                                        
                                                    />

                                                    <button 
                                                        onClick={() => setShowModal(false)}
                                                        className="btn d-flex justify-content-center align-items-center red-button"
                                                        style={{ marginRight: '10px'}}
                                                        >Cancel
                                                    </button>
                                            
                                            </Form.Group>
                                        </Form>
                                    </Modal.Body>
                                </Modal>
                    </Sidebar>
                </>
            )}
        </React.Fragment>
    )
}