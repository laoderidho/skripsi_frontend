import React, {useState, useEffect} from 'react';
import LogoUnai from './LogoUnai.png';
import LogoUnaiSVG from './LogoUnaiSVG.svg';
import { Row, Col } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import axios from '../../axios';

export default function Askep({data, pasien}) {

  const item = data;

  const pasienData = pasien[0];

  return (
    <div className=''>
      <div className=''>
        <div className='container-pdf'>
          <span>
            <img className='logo-pdf' src={LogoUnai} alt='Logo Unai' />
          </span>
          <span style={{marginLeft: '0.5rem'}}>
            <p>KLINIK UNIVERSITAS ADVENT INDONESIA</p>
          </span>
        </div>
        <div className='container-pdf-heading'>
          <p style={{fontWeight:'400', fontSize: '11px', marginLeft: '1.7rem'}}>Jl. Kolonel Masturi No. 288 Parompong-Bandung Barat</p>
        </div>
      </div>

        {/* <div className=''>
        
            <h6 style={{fontWeight:'400'}}>Jl. Kolonel Masturi No. 288 Parompong-Bandung Barat</h6>
            <p style={{fontSize:'20px'}}>CATATAN ASUHAN KEPERAWATAN (ASKEP)</p>
          </div> */}

      <div>
        <div className='container-svg'>
          <img className='watermark-pdf' src={LogoUnaiSVG}/>
        </div>

        <div className='table-pdf'>
           <Row>
              <Col xs={10}>Nama: {pasienData.nama_lengkap}</Col>
              <Col xs={2}>Bed: {pasienData.no_bed}</Col>
            </Row>
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
            <tr>
                  <td className="pdf-td">{item.tanggal_pemeriksaan}/{item.jam_pemeriksaan}</td>
                   <td className='pdf-diagnosa p-2'>
                     Nama diagnosa: <br></br>{item.diagnosa ? item.diagnosa.nama_diagnosa : "-" }
                    <div className='mt-3'>
                      Faktor Risiko: <br></br>
                      <ul>
                        
                      </ul>
                    </div>

                    <h4 className='pt-3'>Penyebab</h4>
                    <div className='mt-3'>
                      Penyebab Fisiologis: <br></br>
                      <ul>
                        {item.diagnosa.penyebab_fisiologis.length ? item.diagnosa.penyebab_fisiologis.map(item=>(
                          <li>{item}</li>
                        )) : "-"}
                      </ul>
                    </div>

                    <div className='mt-3'>
                      Penyebab Situasional: <br></br>
                      <ul>
                        {item.diagnosa.penyebab_situasional.length ? item.diagnosa.penyebab_situasional.map(item=>(
                          <li>{item}</li>
                        )) : "-"}
                      </ul>
                    </div>

                    <div className='mt-3'>
                      Penyebab Psikologis: <br></br>
                      <ul>
                        {item.diagnosa.penyebab_psikologis.length ? item.diagnosa.penyebab_psikologis.map(item=>(
                          <li>{item}</li>
                        )) : "-"}
                      </ul>
                    </div>

                    <div className='mt-3'>
                      Penyebab Umum: <br></br>
                      <ul>
                        {item.diagnosa.penyebab_umum.length ? item.diagnosa.penyebab_umum.map(item=>(
                          <li>{item}</li>
                        )) : "-"}
                      </ul>
                    </div>


                    <h3>Gejala Tanda Mayor</h3>

                    <div className='mt-3'>
                      Objektif: <br></br>
                      <ul>
                        {item.diagnosa.gejala_tanda_mayor_objektif.length ? item.diagnosa.gejala_tanda_mayor_objektif.map(item=>(
                          <li>{item}</li>
                        )) : "-"}
                      </ul>
                    </div>

                    <div className='mt-3'>
                      Subjektif: <br></br>
                      <ul>
                        {item.diagnosa.gejala_tanda_mayor_subjektif.length ? item.diagnosa.gejala_tanda_mayor_subjektif.map(item=>(
                          <li>{item}</li>
                        )) : "-"}
                      </ul>
                    </div>

                    <h3>Gejala Tanda Minor</h3>

                    <div className='mt-3'>
                      Objektif: <br></br>
                      <ul>
                        {item.diagnosa.gejala_tanda_minor_objektif.length ? item.diagnosa.gejala_tanda_minor_objektif.map(item=>(
                          <li>{item}</li>
                        )) : "-"}
                      </ul>
                    </div>

                    <div className='mt-3'>
                      Subjektif: <br></br>
                      <ul>
                        {item.diagnosa.gejala_tanda_minor_subjektif.length ? item.diagnosa.gejala_tanda_minor_subjektif.map(item=>(
                          <li>{item}</li>
                        )) : "-"}
                      </ul>
                    </div>
                  </td>
                   <td className='pdf-intevensi p-2'>
                    Nama Intervensi: <br></br>{item.intervensi ? item.intervensi.nama_intervensi : "-"}
                    <h3 className='pt-3'>Tindakan</h3>
                    <div className='mt-3'>
                      <ul>
                        {item.intervensi.message == "Success" ? item.intervensi.tindakan_intervensi.map(item=>(
                          <li>{item.nama_tindakan_intervensi}</li>
                        )) : "-"}
                      </ul>
                    </div>
                  </td>
                  
                  <td className='pdf-intervensi p-2'>
                    <div className='mt-3'>
                      <ul>
                        {item.implementasi.length ? item.implementasi.map(item=>(
                          <li>{item.nama_implementasi}</li>
                        )) : "-"}
                      </ul>
                    </div>
                  </td>

                  <td className='pdf-diagnosa p-2'>
                    {/* Nama Luaran: <br></br>{item.luaran.message == "Success" ? item.luaran.data : "-"} */}
                    <ul>
                      {item.luaran.message == "Success" ? item.luaran.data.map(item=>(
                        <li>{item.nama_luaran}</li>
                      )) : "-"}
                    </ul>
                  </td>
                  <td></td>
                </tr>
            {/* Shift Pagi */}
          
            {/* Shift Siang */}
            {/* <tr>
              <td id="pdf-td">19/04/24 - 13.00</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr> */}
            {/* Shift Malam */}
            {/* <tr>
              <td id="pdf-td">19/04/24 - 21.00</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr> */}
          </tbody>
        </table>
      </div>
    </div>
  );
}
