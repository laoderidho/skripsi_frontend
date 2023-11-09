import React, {useEffect, useState} from "react";
import Sidebar from "../../../../components/menu/Sidebar";
import { Form, Button, Table, Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from '../../../../axios'




export default function Diagnosis() {

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

    const [diagnosa, setDiagnosa] = useState([])

    const getDiagnosa = async (token) => {
        try {
            await axios.post("/admin/diagnosa", {
                headers: { Authorization : `Bearer $(token)`,
                },
            })
            .then((res) => {
                console.log(res)
                setDiagnosa(res?.data?.data);
            });
        } catch (error) {
            
        }
    };

    useEffect(()=>{
        getDiagnosa(localStorage.getItem('token'))
    }, [])

    console.log(diagnosa)

    return (
        <Sidebar>
        {/* Title */}
        <div className="container">
            <h2>Data Standar Diagnosis Keperawatan Indonesia</h2>
            <Breadcrumb>
                <Breadcrumb.Item active>
                    Diagnosis
                </Breadcrumb.Item>
                <Breadcrumb.Item href="/admin/diagnosa/tambah">Tambah</Breadcrumb.Item>
            </Breadcrumb>
        </div>

        {/* Search */}

        <Form className="container">
            <div className="search-container">
                    <input className="form-control" type="text" placeholder="Search" value={inputValue} onChange={handleInputChange} />

                    <Link to="/admin/diagnosa/tambah" className="btn d-flex justify-content-center align-items-center blue-button">
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
                        <th>Kode Diagnosis</th>
                        <th>Nama Diagnosis</th>
                        <th className="button-space"></th>
                    </tr>
                </thead>
                <tbody>
                    {diagnosa.map((item, index) => (
                        <tr key={index}>
                        <td>{item.id}</td>
                        <td>{item.kode_diagnosa}</td>
                        <td>{item.nama_diagnosa}</td>
                        <td>
                            <Link 
                                to={`/admin/standarkeperawatan/diagnosis/${item.id}`}
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