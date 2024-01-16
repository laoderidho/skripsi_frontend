import React, {useEffect, useState} from "react";
import Sidebar from "../../../components/menu/Sidebar";
import { Form, Button, Table, Container, Row, Col, Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "../../../axios";
import AuthorizationRoute from "../../../AuthorizationRoute";

export default function ProfilPemeriksaan() {

    // Autocomplete

    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [boxes, setBoxes] = useState([]);

    const handleAddBox = () => {
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
        setBoxes([...boxes, formattedDate]);
    }

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


  return (
      <Sidebar>
        {/* Title */}
        <div className="container">
            <h2>Data Diagnostik</h2>
        </div>

        {/* Search */}

        <Form className="container">

            {/* <div>
                <Link to="/admin/daftarpasien/tambah" className="btn d-flex justify-content-center align-items-center blue-button-lg">
                        Lihat Pencatatan
                </Link>      
            </div> */}

            <Table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Nama</th>
                        <th>
                            <a href="#">Timbul Mahendra</a>
                        </th>
                    </tr>
                </thead>
            </Table>
        </Form>

        <Container>
            <Row>
                <Col>
                    <Button onClick={handleAddBox} className="btn d-flex justify-content-center align-items-center blue-button-lg mt-1">Tambah</Button>
                </Col>
            </Row>
            {boxes.map((date,index) => (
                <Row key={index}>
                    <Col>
                        <div className="btn box">
                            <span className="">{date}</span>
                            <span className=""><a href="#">Edit</a></span>
                        </div>
                    </Col>
                </Row>
            ))}


        </Container>
      </Sidebar>
      
  );
}