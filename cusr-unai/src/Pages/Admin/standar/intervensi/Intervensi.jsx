import React, {useEffect, useState} from "react";
import Sidebar from "../../../../components/menu/Sidebar";
import { Form, Button, Table, Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from '../../../../axios';

export default function Intervensi() {

    const [inputValue, setInputValue] = useState('');
    const [intervensi, setIntervensi] = useState([]);
    const [filterIntervensi, setFilterIntervensi] = useState([]);

    const filteredIntervensi = (value) => {
          const filteredIntervensi = intervensi.filter((item) => {
            return (
              item.id.toString().includes(inputValue) ||
              item.kode_intervensi
                .toString()
                .toLowerCase()
                .includes(inputValue.toLowerCase()) ||
              item.nama_intervensi
                .toString()
                .toLowerCase()
                .includes(inputValue.toLowerCase())
            );
          });
          setFilterIntervensi(filteredIntervensi);
    };

    useEffect(()=>{
        filteredIntervensi()
    },[inputValue])


   
    const getIntervensi = async (token) => {
        try {
            await axios.post("/admin/intervensi", {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then((res) => {
                console.log(res)
                setIntervensi(res?.data?.data);
            })
        } catch (error) {
            
        }
    };

    useEffect(() => {
        getIntervensi(localStorage.getItem('token'))
    },[])

    console.log(intervensi)

    return (
      <Sidebar>
        {/* Title */}
        <div className="container">
          <h2>Data Standar Intervensi Keperawatan Indonesia</h2>
          <Breadcrumb>
            <Breadcrumb.Item active>Intervensi</Breadcrumb.Item>
            <Breadcrumb.Item href="/admin/intervensi/tambah">
              Tambah
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>

        {/* Search */}

        <Form className="container">
          <div className="search-container">
            <input
              className="form-control"
              type="text"
              placeholder="Search"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />

            <Link
              to="/admin/intervensi/tambah"
              className="btn d-flex justify-content-center align-items-center blue-button"
            >
              Tambah
            </Link>
          </div>

          <Table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>No</th>
                <th>Kode Intervensi</th>
                <th>Nama Intervensi</th>
                <th className="button-space"></th>
              </tr>
            </thead>
            <tbody>
              {inputValue
                ? filterIntervensi.map((item, index) => (
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>{item.kode_intervensi}</td>
                      <td>{item.nama_intervensi}</td>
                      <td>
                        <Link
                          to={`/admin/standarkeperawatan/intervensi/${item.id}`}
                          class="btn d-flex justify-content-center align-items-center simple-button"
                        >
                          Lihat
                        </Link>
                      </td>
                    </tr>
                  ))
                : intervensi.map((item, index) => (
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>{item.kode_intervensi}</td>
                      <td>{item.nama_intervensi}</td>
                      <td>
                        <Link
                          to={`/admin/standarkeperawatan/intervensi/${item.id}`}
                          class="btn d-flex justify-content-center align-items-center simple-button"
                        >
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