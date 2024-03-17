import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  Modal,
  Form,
  Row,
  Col,
  Container,
} from "react-bootstrap";
import Sidebar from "../../../components/menu/Sidebar";
import { Link } from "react-router-dom";
import ListGroup from 'react-bootstrap/ListGroup';
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../../axios";

const HariAskep = () => {
  const [nama_lengkap, setNamaLengkap] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [row, setRow] = useState([]);

  const getDataById = async () => {
    try {
      const res = await axios.post(
        `/perawat/listaskep/setname/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setNamaLengkap(res.data.name);
    } catch (error) {}
  };

  const handleAddRow = async () => {
    try {
      const res = await axios.post(
        `/perawat/listaskep/list-pemeriksaan/${id} `,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setRow(res.data);
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    getDataById();
    handleAddRow();
    console.log(id);
  }, []);

  return (
    <Sidebar>
      <div className="container">
        <h2>Daftar ASKEP</h2>
      </div>

      <div className="container">
        <Table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Nama</th>
              <th>
                <Link to={`/perawat/profilpasien/${id}`}>
                  {nama_lengkap}
                </Link>
              </th>
            </tr>
          </thead>
        </Table>

        <Link
          to={`/perawat/askep/form-diagnosa/${id}`}
          className="btn d-flex justify-content-center align-items-center blue-button-lg mt-1"
        >
          Tambah
        </Link>

        <input className="form-control" type="text" placeholder="Search" />

        <Row>
          <Col>
            <ListGroup className="pt-4">
              {row && row.map(item => (
                <ListGroup.Item>
                  <Row>
                    <Col xs={8}>
                      <Form.Label id='form-label'>
                        <Row>
                          <Col>
                            <Row>
                              <Link
                                to={`/perawat/askep/shift/${id}/${item.tanggal_pemeriksaan}`}>{item.tanggal_pemeriksaan}</Link>
                            </Row>
                          </Col>
                        </Row>
                      </Form.Label>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
      </div>
    </Sidebar>
  );
};

export default HariAskep;
