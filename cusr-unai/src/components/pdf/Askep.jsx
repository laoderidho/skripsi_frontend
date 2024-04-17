import React, {useState, useEffect} from 'react';
import LogoUnai from './LogoUnai.png';
import LogoUnaiSVG from './LogoUnaiSVG.svg';
import { Row, Col } from 'react-bootstrap';

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
          <span style={{marginLeft: '0.5rem', marginBottom: '1rem'}}>
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
        {/* <div className='container-svg'>
          <img className='watermark-pdf' src={LogoUnaiSVG}/>
        </div> */}

        <div className='table-pdf'>
           <Row>
              <Col xs={10}>Nama: {pasienData.nama_lengkap}</Col>
              <Col xs={2}>Bed: {pasienData.no_bed}</Col>
            </Row>
        </div>
        <table id="table-pdf">
          <thead>
            <tr>
              <th id="tanggal-pdf" className='thead-pdf'>Tgl/Jam</th>
              <th id="askep-pdf" className='thead-pdf'>Dx Keperawatan</th>
              <th id="askep-pdf" className='thead-pdf'>Intervensi</th>
              <th id="askep-pdf" className='thead-pdf'>Implementasi</th>
              <th id="askep-pdf" className='thead-pdf'>Luaran</th>
              <th id="askep-pdf" className='thead-pdf'>Evaluasi</th>
            </tr>
          </thead>
          <tbody>
            <tr>
                  <td className="pdf-td">{item.tanggal_pemeriksaan}/{item.jam_pemeriksaan}</td>
                   <td className='pdf-diagnosa p-2'>
                      {/* NAMA DIAGNOSA */}
                      <p style={{fontSize: '11px', fontWeight: '500'}}>Diagnosa: </p>
                      <p style={{fontSize: '11px'}}>{item.diagnosa ? item.diagnosa.nama_diagnosa : "-" }</p>

              
                      <div className='mt-3'>
                        {item.faktor_risiko && item.faktor_risiko.length !== 0 && <p style={{fontSize: '11px'}}>Faktor Risiko:</p>}
                          <ul className='ul-pdf'>
                            {item.faktor_risiko && item.faktor_risiko.length !== 0 ? (
                                item.faktor_risiko.map((item, index) => (
                                  <li key={index} className='li-pdf'>
                                    <p style={{fontSize: '11px'}}>{item}</p>
                                  </li>
                                ))
                              ) : (
                              " "
                              )}
                          </ul>
                      </div>


            
                 
                        <div className='mt-3'>
                          {item.diagnosa.penyebab_fisiologis.length !==0 && <p style={{fontSize: '11px'}}>Penyebab Fisiologis:</p>}
                        <ul className='ul-pdf'>
                          {item.diagnosa.penyebab_fisiologis.length ? item.diagnosa.penyebab_fisiologis.map(item=>(
                            <li className='li-pdf'>
                              <p style={{fontSize: '11px'}}>{item}</p>
                            </li>
                          )) : ""}
                        </ul>
                      </div>
   

              
                        <div className='mt-3'>
                          {item.diagnosa.penyebab_situasional.length !==0 && <p style={{fontSize: '11px'}}>Penyebab Situasional:</p>}
                          <ul className='ul-pdf'>
                            {item.diagnosa.penyebab_situasional.length ? item.diagnosa.penyebab_situasional.map(item => (
                              <li className='li-pdf'>
                                <p style={{fontSize: '11px'}}>{item}</p>
                              </li>
                            )) : ""}
                          </ul>
                        </div>
         
                    <div className='mt-3'>
                      {item.diagnosa.penyebab_psikologis.length !==0 &&   <p style={{fontSize: '11px'}}>Penyebab Psikologis:</p>}                 
                      <ul className='ul-pdf'>
                        {item.diagnosa.penyebab_psikologis.length ? item.diagnosa.penyebab_psikologis.map(item=>(
                          <li className='li-pdf'>
                            <p style={{fontSize: '13px'}}>{item}</p>
                          </li>
                        )) : ""}
                      </ul>
                    </div>

                    <div className='mt-3'>
                      {item.diagnosa.penyebab_umum.length !==0 &&  <p style={{fontSize: '11px'}}>Penyebub Umum:</p> }
                      <ul className='ul-pdf'>
                        {item.diagnosa.penyebab_umum.length ? item.diagnosa.penyebab_umum.map(item=>(
                          <li className='li-pdf'>
                            <p style={{fontSize: '11px'}}>{item}</p>
                          </li>
                        )) : ""}
                      </ul>
                    </div>


                    <p style={{fontSize: '11px', fontWeight: '500'}}>Gejala Tanda Mayor</p>

                    <div className='mt-3'>
                      {item.diagnosa.gejala_tanda_mayor_subjektif.length !==0 && <p style={{fontSize: '11px'}}>Subjektif:</p>}
                      <ul className='ul-pdf'>
                        {item.diagnosa.gejala_tanda_mayor_subjektif.length ? item.diagnosa.gejala_tanda_mayor_subjektif.map(item=>(
                          <li className='li-pdf'>
                            <p style={{fontSize: '11px'}}>{item}</p>
                          </li>
                        )) : ""}
                      </ul>
                    </div>

                    <div className='mt-3'>
                      {item.diagnosa.gejala_tanda_mayor_objektif.length !==0 && <p style={{fontSize: '11px'}}>Objektif:</p>}
                      <ul className='ul-pdf'>
                        {item.diagnosa.gejala_tanda_mayor_objektif.length ? item.diagnosa.gejala_tanda_mayor_objektif.map(item=>(
                          <li className='li-pdf'>
                            <p style={{fontSize: '11px'}}>{item}</p>
                          </li>
                        )) : ""}
                      </ul>
                    </div>

                    

                    <p style={{fontSize: '11px', fontWeight: '500'}}>Gejala Tanda Minor</p>

                    <div className='mt-3'>
                      {item.diagnosa.gejala_tanda_minor_subjektif.length !==0 && <p style={{fontSize: '11px'}}>Subjektif:</p>}
                      <ul className='ul-pdf'>
                        {item.diagnosa.gejala_tanda_minor_subjektif.length ? item.diagnosa.gejala_tanda_minor_subjektif.map(item=>(
                          <li className='li-pdf'>
                            <p style={{fontSize: '11px'}}>{item}</p>
                          </li>
                        )) : ""}
                      </ul>
                    </div>

                    <div className='mt-3'>
                      {item.diagnosa.gejala_tanda_minor_objektif.length !==0 && <p style={{fontSize: '11px'}}>Objektif:</p>}
                      <ul className='ul-pdf'>
                        {item.diagnosa.gejala_tanda_minor_objektif.length ? item.diagnosa.gejala_tanda_minor_objektif.map(item=>(
                          <li className='li-pdf'>
                            <p style={{fontSize: '11px'}}>{item}</p>
                          </li>
                        )) : ""}
                      </ul>
                    </div>

                    
                  </td>
                   <td className='pdf-intevensi p-2'>
                    <p style={{fontSize: '11px',fontWeight: '500'}}>Intervensi:</p> 
                    <p style={{fontSize: '11px'}}>{item.intervensi ? item.intervensi.nama_intervensi : "-"}</p>
                    <p style={{fontSize: '11px', fontWeight: '500'}} className='pt-1'>Tindakan</p>
                    <div className='mt-3'>
                      <ul className='ul-pdf'>
                        {item.intervensi.message == "Success" ? item.intervensi.tindakan_intervensi.map(item=>(
                          <li className='li-pdf'>
                            <p style={{fontSize: '11px'}} className='mt-1'>{item.nama_tindakan_intervensi}</p>
                          </li>
                        )) : ""}
                      </ul>
                    </div>
                  </td>
                  
                  <td className='pdf-intervensi p-2'>
                    <div>
                      <ul className='ul-pdf'>
                        {item.implementasi.length ? item.implementasi.map(item=>(
                          <li className='li-pdf'>
                            <p style={{fontSize: '11px'}}>{item.nama_implementasi}</p>
                          </li>
                        )) : ""}
                      </ul>
                    </div>
                  </td>

                  <td className='pdf-diagnosa p-2'>
                    {/* Nama Luaran: <br></br>{item.luaran.message == "Success" ? item.luaran.data : "-"} */}
                    <ul className='ul-pdf'>
                      {item.luaran.message == "Success" ? item.luaran.data.map(item=>(
                        <li className='li-pdf'>{item.nama_luaran}</li>
                      )) : ""}
                    </ul>
                  </td>
                  <td className=''>
                    
                  </td>
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
