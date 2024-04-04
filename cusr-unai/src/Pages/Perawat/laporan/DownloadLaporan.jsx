import React, { useState, useEffect } from 'react';
import Sidebar from '../../../components/menu/Sidebar';
import { Form } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import axios from '../../../axios';

const DownloadLaporan = () => {

  const [nama_lengkap, setNamaLengkap] = useState('');
  const [getRow, setGetRow] = useState([]);

  const {id, nama} = useParams();
  const token = localStorage.getItem('token');

  const getList = async () => {
    try {
      const res = await axios.post(`/perawat/laporan/date-perawatan/${id}`,
      {
        headers: { Authorization: `Bearer ${token}`}
      });
      setGetRow(res.data)
    } catch (error) {
      
    }
  }

  useEffect(() => {
    getList();
  })

  return (
    <Sidebar
      title="LAPORAN">
        <div className="container">
            <Form.Group>
              <Form.Label id="form-label" className='label-form'>Nama</Form.Label>
              <p>{nama}</p>
            </Form.Group>

            <input className="form-control my-3" type="text" placeholder="Search" />

            <table className='bordered' id='border'>
              <thead className='table-head'>
                <tr>
                  <th>Tanggal</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {getRow && getRow.map(item => (
                  <tr>
                    <td>{item.tanggal_masuk} - {item.tanggal_keluar ? item.tanggal_keluar : "sekarang" }</td>
                    <td>
                      <Link
                        to={`/perawat/pdf/${item.id}`} target='_blank'>
                          Download
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>




        </div>
        
    </Sidebar>
      
    
  );
}

export default DownloadLaporan;
