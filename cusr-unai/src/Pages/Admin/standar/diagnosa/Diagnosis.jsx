import React, { useEffect, useState } from "react";
import Sidebar from "../../../../components/menu/Sidebar";
import { Form, Button, Table, Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "../../../../axios";

export default function Intervensi() {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    const fetchedSuggestions = getSuggestions(value);
    setSuggestions(fetchedSuggestions);
  };

  const filteredIntervensi = (value) => {
    return intervensi.filter((item) => {
      for (let key in item) {
        if (item[key] && typeof item[key] === "string") {
          if (item[key].toLowerCase().includes(value.toLowerCase())) {
            return true;
          }
        }
      }
      return false;
    });
  };

  const getSuggestions = (value) => {
    const filteredIntervensi = filteredIntervensi(value);
    setSuggestions(filteredIntervensi);
  };

  const [intervensi, setIntervensi] = useState([]);

  const getIntervensi = async (token) => {
    try {
      await axios
        .post("/admin/intervensi", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log(res);
          setIntervensi(res?.data?.data);
        });
    } catch (error) {}
  };

  useEffect(() => {
    getIntervensi(localStorage.getItem("token"));
  }, []);

  console.log(intervensi);

  return (
    <Sidebar>
      {/* Title */}
      <div className="container">
    <h2>Data Standar Diagnosa Keperawatan Indonesia</h2>
        <Breadcrumb>
          <Breadcrumb.Item active>Intervensi</Breadcrumb.Item>
          <Breadcrumb.Item href="/admin/diagnosa/tambah">
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
            onChange={handleInputChange}
          />

          <Link
            to="/admin/diagnosa/tambah"
            className="btn d-flex justify-content-center align-items-center blue-button"
          >
            Tambah
          </Link>
          <ul className="suggestions">
            {suggestions.length > 0 ? (
              suggestions.map((item, index) => (
                <li key={index}>
                  {`ID: ${item.id}, Kode Intervensi: ${item.kode_intervensi}, Nama Intervensi: ${item.nama_intervensi}`}
                </li>
              ))
            ) : (
              <li>No suggestions found</li>
            )}
          </ul>
        </div>

        <Table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>No</th>
              <th>Kode Diagnosa</th>
              <th>Nama Diagnosa</th>
              <th className="button-space"></th>
            </tr>
          </thead>
          <tbody>
            {intervensi.map((item, index) => (
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
