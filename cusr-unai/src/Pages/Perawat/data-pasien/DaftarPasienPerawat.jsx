import React, {useEffect, useState} from "react";
import Sidebar from "../../../components/menu/Sidebar";
import { Form, Button, Table, Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "../../../axios";
import AuthorizationRoute from "../../../AuthorizationRoute";

export default function DaftarPasien() {

    // Autocomplete

    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const [pasien, setPasien] = useState([]);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);

        const fetchedSuggestions = getSuggestions(value);
        setSuggestions(fetchedSuggestions);
    };

    useEffect(()=>{
       getdataPasien()
    },[])

    const getSuggestions = (value) => {
        return [
            'Suggestion 1',
            'Suggestion 2',
            'Suggestion 3',
        ];
    };

    const token = localStorage.getItem('token')

    // Table

    const getdataPasien = async () =>{
        try{
            const res = await axios.post("/perawat/daftarpasien",{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            setPasien(res.data.data)
        }catch(error){
            // AuthorizationRoute(error.response.status)
        }
    }


    

    console.log(pasien)
    

  return (
    <Sidebar>
      {/* Title */}
      <div className="container">
        <h2>Daftar Pasien</h2>
      </div>

      {/* Search */}

      <Form className="container">
        <div className="search-container">
          <input
            className="form-control"
            type="text"
            placeholder="Search"
            value={inputValue}
            onChange={handleInputChange}
          />

          {/* <Link to="/admin/daftarpasien/tambah" className="btn d-flex justify-content-center align-items-center blue-button">
                        Tambah
                    </Link> */}
          <ul className="suggestions">
            {suggestions.map((suggestion, index) => (
              <li key={index}>{suggestion}</li>
            ))}
          </ul>
        </div>

        <Table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Nama</th>
              <th className="button-space"></th>
            </tr>
          </thead>
          <tbody>
            {pasien.map((item, index) => (
              <tr key={index}>
                <td>{item.nama_lengkap}</td>
                <td>
                  <Link
                    to={`/perawat/profilpasien/${item.id}`}
                    class="d-flex justify-content-center align-items-center"
                  >
                    Lihat Profil
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Form>
    </Sidebar>
  );
}
