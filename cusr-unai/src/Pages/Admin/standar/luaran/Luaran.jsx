import React, {useEffect, useState} from "react";
import Sidebar from "../../../../components/menu/Sidebar";
import { Form, Button, Table, Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from '../../../../axios';

export default function Luaran() {

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

    const [luaran, setLuaran] = useState([])

    const getLuaran = async (token) => {
        try {
            await axios.post("/admin/diagnosa", {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then((res) => {
                console.log(res)
                setLuaran(res?.data?.data);
            })
        } catch (error) {
            
        }
    };

    useEffect(() => {
        getLuaran(localStorage.getItem('token'))
    },[])

    console.log(luaran)

    return (
        <Sidebar>
        {/* Title */}
        <div className="container">
            <h2>Data Standar Luaran Keperawatan Indonesia</h2>
            <Breadcrumb>
                <Breadcrumb.Item active>
                    Luaran
                </Breadcrumb.Item>
                <Breadcrumb.Item href="/admin/luaran/tambah">Tambah</Breadcrumb.Item>
            </Breadcrumb>
        </div>

        {/* Search */}

        <Form className="container">
            <div className="search-container">
                    <input className="form-control" type="text" placeholder="Search" value={inputValue} onChange={handleInputChange} />

                    <Link to="/admin/luaran/tambah" className="btn d-flex justify-content-center align-items-center blue-button">
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
                        <th>Kode Luaran</th>
                        <th>Nama Luaran</th>
                        <th className="button-space"></th>
                    </tr>
                </thead>
                <tbody>
                    {luaran.map((item, index) => (
                        <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.kode_luaran}</td>
                            <td>{item.nama_luaran}</td>
                            <td>
                                <Link 
                                    to={`/admin/standarkeperawatan/luaran/${item.id}`}
                                    class="btn d-flex justify-content-center align-items-center simple-button">
                                    Lihat 
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