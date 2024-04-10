import React, {useEffect, useState} from 'react'
import axios from '../../axios'
import AuthorizationRoute from '../../AuthorizationRoute'
import Sidebar from '../../components/menu/Sidebar'
import { Container } from 'react-bootstrap'
import "primereact/resources/themes/saga-blue/theme.css";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Link } from "react-router-dom";


export default function PerawatDashboard() {

    const [token, setToken] = useState(localStorage.getItem('token'))
    const [hello, setHello] = useState([])
    const [username, setUsername] = useState(localStorage.getItem('username'))
    const [pasien, setPasien] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [filterPasien, setFilterPasien] = useState([]);
    const [nama_lengkap, setNamaLengkap] = useState('');

    const isMobile = window.innerWidth <=600;




    useEffect(()=>{
        setToken(localStorage.getItem('token'))
        setUsername(localStorage.getItem('username'))
    },[localStorage])

    useEffect(()=>{    
        getHello()
        console.log(hello)
    },[])

    const getHello = async () => {
        try {
            const res = await axios.get('/perawat',{
                headers: {
                 Authorization: `Bearer ${token}`
                }
            })
            setHello(res.data)
            console.log(res.data)
        } catch (error) {
        
        }
    }

    const getPasienId = async () => {
        try {
            const res = await axios.post(`/perawat/my-pasien`, {
                headers: { Authorization: `Bearer ${token}`}
            })
            setPasien(res.data.listPasien);
            console.log(res.data.listPasien)
        } catch (error) {

        }
    }

    useEffect(() => {
        getPasienId();
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
              .includes(inputValue.toLowerCase()) 
          );
        });
        setFilterPasien(filteredDiagnosa);
      }

  return (
    <React.Fragment>
        {isMobile ? ( 
            <React.Fragment>
                <Sidebar
                    title='DASHBOARD'>

                    <div className='container pt-3'>
                        <p style={{color:'#0859b3', fontWeight:'500', fontSize:'15px'}}>Selamat datang, {username}</p>
                    </div>

                    <div className='container'>
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


                    <div className='container pt-3'>
                        <span id='form-label'>PASIEN YANG SEDANG DIRAWAT</span>
                        <DataTable value={pasien} paginator rows={5}  stripedRows show showGridlines>
                            <Column field="nama_lengkap" header='Nama'/>
                            <Column 
                            header=''
                            body={(item) => (
                                <Link
                                to={`/perawat/askep/${item.id}`}
                                className="btn d-flex justify-content-center align-items-center simple-button">Lihat Profil</Link>
                            )}/>
                        </DataTable>
                    </div>
                </Sidebar>
            </React.Fragment>
        ) : (
            <React.Fragment>
                <Sidebar>

                    <div className='container pt-3'>
                        <p style={{color:'#0859b3', fontWeight:'500', fontSize:'15px'}}>Selamat datang, {username}</p>
                    </div>

                    <div className='container'>
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

                    <div className='container pt-3'>
                        <span id='form-label'>PASIEN YANG SEDANG DIRAWAT</span>
                        <DataTable value={pasien} paginator rows={5}  stripedRows show showGridlines>
                            <Column field="nama_lengkap" header='Nama'/>
                            <Column 
                            header=''
                            body={(item) => (
                                <Link
                                to={`/perawat/askep/${item.id}`}
                                className="btn d-flex justify-content-center align-items-center simple-button">Lihat Profil</Link>
                            )}/>
                        </DataTable>
                    </div>
                </Sidebar>
            </React.Fragment>
        )}
    </React.Fragment>
  )
}
