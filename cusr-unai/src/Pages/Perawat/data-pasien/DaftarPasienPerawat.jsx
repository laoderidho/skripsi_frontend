import React, {useEffect, useState} from "react";
import Sidebar from "../../../components/menu/Sidebar";
import { Form, Container, Row, Col } from "react-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "../../../axios";
import AuthorizationRoute from "../../../AuthorizationRoute";
import "primereact/resources/themes/saga-blue/theme.css";
import { Toolbar } from 'primereact/toolbar';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ScrollPanel } from 'primereact/scrollpanel';
import ProfilPasienDesktop from "./ProfilPasienDesktop";


export default function DaftarPasien() {

    // Autocomplete

    const [pasien, setPasien] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [filterPasien, setFilterPasien] = useState([]);
    const [selectedPasien, setSelectedPasien] = useState(null);
    const id = useParams();
    const navigate = useNavigate();


    const isMobile = window.innerWidth <=600;

    


    useEffect(()=>{
       getdataPasien()
    },[])

    useEffect(()=>{
      filteredPasien()
    },[inputValue]);

    const filteredPasien = () => {
      const filteredDiagnosa = pasien.filter((item) => {
        return (
          item.id.toString().includes(inputValue) ||
          item.nama_lengkap
            .toString()
            .toLowerCase()
            .includes(inputValue.toLowerCase()) ||
          item.no_medical_record
            .toString()
            .toLowerCase()
            .includes(inputValue.toLowerCase())
        );
      });
      setFilterPasien(filteredDiagnosa);
    }

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
    );

    const token = localStorage.getItem('token')

    const handleViewProfile = (item) => {
      // Navigasi ke halaman profil pasien
      navigate(`/perawat/profilpasien/${item.id}/${item.perawatan_id}`);
    }

    // Table

    const getdataPasien = async () =>{
        try{
            const res = await axios.post("/perawat/daftarpasien/rawat-inap",{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            console.log(res.data.data)
            setPasien(res.data.data)
        }catch(error){
            // AuthorizationRoute(error.response.status)
        }
    }

    const itemPath = [
      {label: 'Daftar Pasien', path: '/perawat/daftarpasien'},
      {label: 'Info Pasien', path: '/perawat/profilpasien/:id/:perawatan_id'},
      

    ]

  return (
    <React.Fragment>
      {isMobile ? (
        <React.Fragment>
          <Sidebar
            title='DAFTAR PASIEN'>
            {/* Title */}

            <div className="container container-mobile">
              <span id='form-label' className="text-alert-search">Ketik untuk mencari nama pasien</span>
                <input
                  className="form-control custom-search"
                  id="form-width"
                  type="text"
                  placeholder="Search"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />

              <DataTable value={inputValue ? filterPasien : pasien} paginator rows={5}  stripedRows show showGridlines>
                <Column field="nama_lengkap" header='Nama'/>
                <Column 
                  header=''
                  body={(item) => (
                    <Link
                      to={`/perawat/profilpasien/${item.id}/${item.perawatan_id}`}
                      className="btn d-flex justify-content-center align-items-center simple-button">Lihat Profil</Link>
                  )}/>
              </DataTable>
            </div>           
          </Sidebar>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Sidebar>
            {/* Title */}
            <div className="container">
              <h2>Daftar Pasien</h2>
            </div>

            

            <div className="container">

              <span id='form-label' className="text-alert-search">Ketik untuk mencari nama pasien</span>
              <input
                  className="form-control custom-search"
                  id="form-width"
                  type="text"
                  placeholder="Search"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />            
            </div>  

            <div className="container">
                  <Row>
                    <Col xs={6}>
                        <DataTable value={inputValue ? filterPasien : pasien} paginator rows={5} stripedRows show showGridlines>
                            <Column field="nama_lengkap" header='Nama' />
                            <Column
                                header=''
                                body={(item) => (
                                    <button
                                        onClick={() => handleViewProfile(item)}
                                        className="btn d-flex justify-content-center align-items-center simple-button">Lihat Profil</button>
                                )} />
                        </DataTable>
                    </Col>
                    <Col xs={4} className="pt-4">
                        <ScrollPanel style={{ width: '100%', height: '600px', backgroundColor: '#f6fafd' }}>
                          <ProfilPasienDesktop selectedPasien={selectedPasien}/>
                        </ScrollPanel>
                    </Col>
                </Row>
            </div>
          </Sidebar>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
