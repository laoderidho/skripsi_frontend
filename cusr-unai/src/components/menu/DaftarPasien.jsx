import React from 'react'
import Sidebar from './Sidebar';
// import {Form, Table} from 'react-bootstrap'



export default function DaftarPasien() {
  return (
    <div>
        <Sidebar/>
        <div className="content">

            {/* Title */}
            <div className="d-flex justify-content-between">
              <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="backbutton">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                </div>
               
                <div>
                    <h3>Daftar Pasien</h3>
                </div>

                <p></p>
          
            </div>

            {/* Search */}

            <div class="autocomplete">
                <input class="search-input" type="text" placeholder="Search"/>
                <ul class="suggestions">
                    
                </ul>

                
            </div>
                
            <div class="table-container">
                <table class="custom-table">
                    <thead>
                        <tr>
                            <th>Nama</th>
                            <th>Lihat Laporan</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Timbul Mahendra</td>
                            <td>
                                <a>Lihat Laporan</a>
                            </td>
                        </tr>
                        <tr>
                            <td>Sharon Venicia</td>
                            <td>
                                <a>Lihat Laporan</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        
    </div>
  )
}
