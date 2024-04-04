import React, {useState, useEffect} from 'react';
import LogoUnai from './LogoUnai.png';
import LogoUnaiSVG from './LogoUnaiSVG.svg';
import { Row, Col } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import axios from '../../axios';

export default function Askep() {

  const {id, name} = useParams();
  const token = localStorage.getItem('token');

  const [pasien, setPasien] = useState([])

  const getAskep = async () => {
    try {
      const res = await axios.post(`/perawat/laporan/askep/${id}`, {
        headers: { Authorization: `Bearer ${token}`}
      });
    
      setPasien(res.data.pasien)
      console.log(res.data)
    } catch (error) {
    }
  }


  useEffect(()=>{
    getAskep()
  },[])

  return (
    <div className='container'>
      <div className='header-pdf'>
        <div className='container-pdf'>
          <img className='logo-pdf' src={LogoUnai} alt='Logo Unai' />
          <div className='title-pdf'>
            <h3>KLINIK UNIVERSITAS ADVENT INDONESIA</h3>
            <h6 style={{fontWeight:'400'}}>Jl. Kolonel Masturi No. 288 Parompong-Bandung Barat</h6>
            <p style={{fontSize:'20px'}}>CATATAN ASUHAN KEPERAWATAN (ASKEP)</p>
          </div>
        </div>
      </div>

      <div>
        <div className='container-svg'>
          <img className='watermark-pdf' src={LogoUnaiSVG}/>
        </div>

        <div className='table-pdf'>
          {pasien.map(item => 
              <Row>
              <Col xs={10}>Nama: {item.nama_lengkap}</Col>
              <Col xs={2}>Bed: {item.no_bed}</Col>
            </Row>
            )}
        </div>
        <table id="table-pdf">
          <thead>
            <tr>
              <th id="tanggal-pdf">Tanggal/Jam</th>
              <th id="askep-pdf">Dx Keperawatan</th>
              <th id="askep-pdf">Intervensi</th>
              <th id="askep-pdf">Implementasi</th>
              <th id="askep-pdf">Luaran</th>
              <th id="askep-pdf">Evaluasi</th>
            </tr>
          </thead>
          <tbody>
            {/* Shift Pagi */}
            <tr>
              <td id="pdf-td">19/04/24/ - 07.00</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            {/* Shift Siang */}
            <tr>
              <td id="pdf-td">19/04/24 - 13.00</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            {/* Shift Malam */}
            <tr>
              <td id="pdf-td">19/04/24 - 21.00</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
