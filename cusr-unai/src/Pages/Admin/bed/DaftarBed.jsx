import React, {useEffect, useState} from "react";
import Sidebar from "../../../components/menu/Sidebar";
import { Form, Button, Table, Breadcrumb, Modal, Row, Col } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import ConfirmModal from '../../../components/menu/ConfirmModal';
import axios from '../../../axios'
import { Dropdown } from 'primereact/dropdown';
import { Toolbar } from 'primereact/toolbar';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import "primereact/resources/themes/saga-blue/theme.css";


export default function DaftarBed() {

    const [showModal, setShowModal] = useState(false);
    const [bed, setBed] = useState([]);
    const [lantai, setLantai] = useState([]);
    const [nama_fasilitas, setNamaFasilitas] = useState([]);
    const [jenis_ruangan, setJenisRuangan] = useState([]);
    const [isEditing, setIsEditing] = useState(false);

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

    const [showDropdown, setShowDropdown] = useState(true);
    const [showOtherFacility, setShowOtherFacility] = useState(false);

    const [idBed, setIdBed] = useState(null);

    const handleCheckboxChange = (e) => {
        setShowDropdown(!e.target.checked);
        setShowOtherFacility(e.target.checked);
    };

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
                item.no_bed.toString().includes(inputValue) ||
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
        filteredBed();
        detailSedia();
        getData();
        getFasilitas();
        getRuangan();
        getLantai();
    },[inputValue])

    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);


    const getData = async (token) => {
        try {
            await axios.post(`/admin/bed`, {
                headers: { Authorization : `Bearer $(token)` },
            })
            .then((res) => {
                console.log(res)
                setBed(res?.data?.data);
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
        } catch (error) {

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


    return (
        <Sidebar>
            <div className="container">
                <h2>Daftar Kamar</h2>
                <Breadcrumb>
                <Breadcrumb.Item active>Daftar Kamar</Breadcrumb.Item>
                <Breadcrumb.Item href="/admin/bed/tambah">
                    Tambah
                </Breadcrumb.Item>
                </Breadcrumb>
            </div>

            <div className="container pt-5">
                <Toolbar
                    start={startContent}
                    end={endContent}>
                </Toolbar>

                <DataTable value={inputValue ? filterBed : bed} paginator rows={20} tableStyle={{ minWidth: '50rem' }} stripedRows show showGridlines className="mt-3">
                    <Column field="nama_fasilitas" header="Fasilitas Kesehatan"/>
                    <Column field="lantai" header="Lantai"/>
                    <Column field="no_bed" header="No Kamar"/>
                    <Column field="jenis_ruangan" header="Jenis Ruangan"/>
                    <Column field="status" header="Status"/>
                    <Column header='' body={(rowData) => (
                        <Link
                            className="link-theme"
                            onClick={() => editClick(rowData.id, rowData.nama_fasilitas, rowData.lantai, rowData.no_bed, rowData.jenis_ruangan, rowData.status)}
                            >
                                Edit
                        </Link>
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
                                    <Col>
                                        <Form.Group>
                                            <Form.Label id="form-label">No Kamar</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="e.g. 205"
                                                value={newBed}
                                                onChange={(e) => setNewBed(e.target.value)}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label id="form-label">Lantai</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="e.g. Lantai 1"
                                                value={newLantai}
                                                onChange={(e) => setNewLantai(e.target.value)}
                                                />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="pt-1">
                                    <Col md={8}>
                                        <Form.Group>
                                            <Form.Label id="form-label">Fasilitas Kesehatan</Form.Label>
                                            {showDropdown && (
                                                <Form.Select
                                                    value={newFasilitas}
                                                    onChange={(e) => setNewFasilitas(e.target.value)}
                                                >
                                                <option 
                                                    value="">-</option>
                                                {nama_fasilitas.map(item=>(
                                                    <option value={item.nama_fasilitas}>{item.nama_fasilitas}</option>
                                                ))}
                                                </Form.Select>
                                            )}

                                            <div>
                                                <input className="form-check-input" type="checkbox" onChange={handleCheckboxChange}/>
                                                <Form.Label className="px-2" id="form-label">Fasilitas lainnya</Form.Label>

                                                {showOtherFacility && (
                                                    <Form.Control
                                                    type="text"
                                                    placeholder="Fasilitas Lain"
                                                    value={newFasilitas}
                                                    onChange={(e) => setNewFasilitas(e.target.value)}
                                                    />
                                                )}
                                            </div>
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Label id="form-label">Jenis Ruangan</Form.Label>
                                        <Form.Select
                                            value={newRuangan}
                                            onChange={(e) => setNewRuangan(e.target.value)}
                                                >
                                                <option value="">-</option>
                                                {jenis_ruangan.map(item=>(
                                                    <option value={item.jenis_ruangan}>{item.jenis_ruangan}</option>
                                                ))}
                                        </Form.Select>

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
    )
}