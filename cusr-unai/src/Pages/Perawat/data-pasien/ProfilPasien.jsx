import React, {useEffect, useState} from "react";
import Sidebar from "../../../components/menu/Sidebar";
import { Form, Button, Table, Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "../../../axios";
import AuthorizationRoute from "../../../AuthorizationRoute";

export default function ProfilPasien() {

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

    const [pasien, setPasien] = useState([])

    const getPasien = async (token) => {
        try {
            await axios
            .post("/admin/daftarpasien", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                console.log(res)
                setPasien(res?.data?.data);
            });
        } catch (error) {
            // AuthorizationRoute(error.response.status);
        }
    };

    useEffect(()=>{
        getPasien(localStorage.getItem('token'))
    }, [])

    console.log(pasien)
    

  return (
      <Sidebar>
        {/* Title */}
        <div className="container">
            <h2>Profil Pasien</h2>
        </div>

        {/* Search */}

        <Form className="container">
            <div>
                <Link to="/perawat/keteranganaskep" className="btn d-flex justify-content-center align-items-center blue-button-lg">
                        Lihat Pencatatan
                </Link>      
            </div>

            
        </Form>
      </Sidebar>
      
  );
}
