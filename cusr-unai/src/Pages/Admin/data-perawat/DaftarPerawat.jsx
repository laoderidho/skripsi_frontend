import React, {useEffect, useState} from "react";
import Sidebar from "../../../components/menu/Sidebar";
import { Form, Button, Table, Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "../../../axios";
import AuthorizationRoute from "../../../AuthorizationRoute";

export default function DaftarPerawat() {

    // Autocomplete

    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);

        const fetchedSuggestions = getSuggestions(value);
        setSuggestions(fetchedSuggestions);
    };

    const getSuggestions = (value) => {
        return [
            'Suggestion 1',
            'Suggestion 2',
            'Suggestion 3',
        ];
    };

    // Table

    const [perawat, setPerawat] = useState([])

    const getPasien = async (token) => {
        try {
            await axios
            .post(`/admin/users`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                console.log(res)
                setPerawat(res?.data?.data);
            });
        } catch (error) {
            // AuthorizationRoute(error.response.status);
        }
    };

    useEffect(()=>{
        getPasien(localStorage.getItem('token'))
    }, [])

    console.log(perawat)
    

  return (
      <Sidebar>
        {/* Title */}
        <div className="container">
            <h2>Daftar Perawat</h2>
            <Breadcrumb>
                <Breadcrumb.Item active>
                    Daftar Perawat
                </Breadcrumb.Item>
                <Breadcrumb.Item href="/admin/daftarperawat/tambah">Tambah</Breadcrumb.Item>
            </Breadcrumb>
        </div>

        {/* Search */}

        <Form className="container">
            <div className="search-container">
                    <input className="form-control" type="text" placeholder="Search" value={inputValue} onChange={handleInputChange} />

                    <Link to="/admin/daftarperawat/tambah" className="btn d-flex justify-content-center align-items-center blue-button">
                        Tambah
                    </Link>
                    <ul className="suggestions">
                        {suggestions.map((suggestion, index) => (
                            <li key={index}>{suggestion}</li>
                        ))}
                    </ul>
            </div>

            <Table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Nama</th>
                        <th>Status</th>
                        <th className="button-space"></th>
                    </tr>
                </thead>
                <tbody>
                    {perawat.map((item, index) => (
                    <tr key={index} className="table-height">
                        <td>{item.id}</td>
                        <td>{item.nama_lengkap}</td>
                        <td>
                            {item.status === 'aktif' ? (
                                <button className="btn green-active-button">{item.status}</button>
                            ) : item.status === 'nonaktif' ? (
                                <button className="btn red-active-button">{item.status}</button>
                            ) : (
                                <span>{item.status}</span>
                            )}
                        </td> 
                        <td>
                            <Link 
                                to={`/admin/daftarperawat/${item.id}`}
                                class="btn d-flex justify-content-center align-items-center simple-button">
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
