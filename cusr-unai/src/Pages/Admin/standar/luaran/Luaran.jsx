import React, {useEffect, useState} from "react";
import Sidebar from "../../../../components/menu/Sidebar";
import { Form, Button, Table, Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from '../../../../axios';

export default function Luaran() {

    const [inputValue, setInputValue] = useState('');
    const [filterLuaran, setFilterLuaran] = useState([]);
    const [luaran, setLuaran] = useState([]);


   useEffect(()=>{
    FilterSearchValue();
   }, [inputValue])

      const FilterSearchValue = () => {
        const filteredDiagnosa = luaran.filter((item) => {
          return (
            item.id.toString().includes(inputValue) ||
            item.kode_luaran.toString().toLowerCase().includes(inputValue.toLowerCase()) ||
            item.nama_luaran.toString().toLowerCase().includes(inputValue.toLowerCase())
          );
        });
        setFilterLuaran(filteredDiagnosa);
      };

    
    const getLuaran = async (token) => {
        try {
            await axios.post("/admin/luaran", {
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

    return (
      <Sidebar>
        {/* Title */}
        <div className="container">
          <h2>Data Standar Luaran Keperawatan Indonesia</h2>
          <Breadcrumb>
            <Breadcrumb.Item active>Luaran</Breadcrumb.Item>
            <Breadcrumb.Item href="/admin/luaran/tambah">
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
              to="/admin/luaran/tambah"
              className="btn d-flex justify-content-center align-items-center blue-button"
            >
              Tambah
            </Link>
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
              {inputValue
                ? filterLuaran.map((item, index) => (
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>{item.kode_luaran}</td>
                      <td>{item.nama_luaran}</td>
                      <td>
                        <Link
                          to={`/admin/standarkeperawatan/luaran/${item.id}`}
                          class="btn d-flex justify-content-center align-items-center simple-button"
                        >
                          Lihat
                        </Link>
                      </td>
                    </tr>
                  ))
                : luaran.map((item, index) => (
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>{item.kode_luaran}</td>
                      <td>{item.nama_luaran}</td>
                      <td>
                        <Link
                          to={`/admin/standarkeperawatan/luaran/${item.id}`}
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